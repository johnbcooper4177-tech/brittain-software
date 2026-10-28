# GitHub Pages secondary deployment

GitHub Pages publishes `main:/` automatically, but it does not serve the public
custom domain. Cloudflare Pages direct uploads are the production release path.
See [Cloudflare Pages release](cloudflare-pages-release.md).

The initial baseline inspection verified live-file equality with GitHub source,
but incorrectly inferred that GitHub Pages was the public serving provider.
The authenticated Cloudflare dashboard confirmed the independent production
project and deployment history. No DNS or hosting settings were changed.
