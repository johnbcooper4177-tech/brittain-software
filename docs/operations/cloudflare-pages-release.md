# Cloudflare Pages production release

Project: `brittain-software`, account `1d83da6b1ee3479cb2e2ee87fda6d89d`.
Production domains: https://brittainsoftware.com/ and
https://www.brittainsoftware.com/. The project uses direct uploads with no Git
connection. GitHub Pages is a separate secondary copy.

1. Use git-worktree-release-jbc for source isolation, Save, checks and PR squash
   integration. Source integration alone does not authorize production deployment.
2. With deployment authorization, select an exact accepted main SHA. Validate
   static pages and review desktop/mobile layouts. Record the current Cloudflare
   deployment ID as rollback evidence.
3. Export public files from that exact Git SHA into a ZIP: all HTML pages,
   `styles.css`, `script.js`, and `assets/`, preserving relative paths with
   index.html at the archive root. Exclude .git, operational docs, scripts,
   workflows, credentials, local artifacts and unrelated files. Record SHA256s.
4. In Cloudflare Workers & Pages, open brittain-software, Create deployment,
   select Production and upload the ZIP. Confirm every intended file uploaded,
   then Save and deploy once.
5. Confirm the success screen and the new production deployment ID. Fetch both
   public domains over HTTPS and compare released HTML/CSS with accepted source.
   Verify live desktop/mobile design and exact destination links.
6. Record source SHA, source PR, Cloudflare deployment ID, asset hashes,
   verification and rollback ID. Issue the Deployment Acceptance Notice.

Rollback only when authorized: select the preserved prior production deployment
in this same project and use Cloudflare's rollback action. Alternatively upload
its exact preserved public source bundle. Verify both domains afterward. Never
reset Git main or change DNS, authentication, or unrelated services for rollback.

The generic Git helper has no Cloudflare Pages deployment lane. The policy's
none lane intentionally refuses generic deploy operations; use this proven path.
Routine CLI login may be expired even when the browser dashboard is signed in.
