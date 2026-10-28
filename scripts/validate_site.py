"""Validate tracked static pages and their local resource/link targets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
if '--unsupported-deploy-gate' in sys.argv:
    raise SystemExit('GitHub Pages releases require the documented Pages workflow; generic deployment gates are unsupported.')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
        self.errors = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.errors.append('duplicate id: ' + attrs['id'])
            self.ids.add(attrs['id'])
        for name in ('href', 'src'):
            if attrs.get(name):
                self.refs.append(attrs[name])

files = subprocess.check_output(['git', 'ls-files'], cwd=root, text=True).splitlines()
errors = []
pages = {}
for name in files:
    if name.endswith('.html'):
        page = Page()
        page.feed((root / name).read_text())
        pages[name] = page
        errors.extend(f'{name}: {e}' for e in page.errors)
for name, page in pages.items():
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        target = (root / unquote(url.path.lstrip('/'))) if url.path.startswith('/') else (root / name).parent / unquote(url.path)
        if not url.path:
            target = root / name
        if target.is_dir():
            target /= 'index.html'
        if not target.exists():
            errors.append(f'{name}: missing target {ref}')
        elif url.fragment and target.suffix == '.html':
            target_page = pages.get(str(target.relative_to(root)))
            if target_page and unquote(url.fragment) not in target_page.ids:
                errors.append(f'{name}: missing anchor {ref}')
for name in files:
    if name.endswith('.json'):
        json.loads((root / name).read_text())
subprocess.run(['node', '--check', str(root / 'script.js')], check=True)
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} static pages, local links/assets, unique IDs, JSON, and JavaScript syntax')
