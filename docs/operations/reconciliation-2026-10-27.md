# Baseline reconciliation — October 27, 2026

User explicitly authorized one-time baseline reconciliation, publishing the
Guest360 button change, and live verification. This first policy/baseline and
its dependent website change are one reviewed bootstrap release.

Accepted pre-change remote main and successful Pages build 1230838754:
`3ee506b9a4408ab289e5169f8131fd7de83a8975`. GitHub reports build status `built`.
The live HTTPS files exactly matched that source via curl byte comparisons:

- index.html SHA256: 5f7fbf9a4525804ce487785cb0d722fba285fc2bf8aa4a345b90d44ea64f381b
- styles.css SHA256: ef96a3e1421ca13bbb21e19ad9d4faf9ec7047bfd22740594619f0cb987c6aa7
- script.js SHA256: 9f1e417a3c4f4e6d87ef2fdd7cd16708b3955b357373d60ed16da44e513cfc5f

The original main checkout remains at 8fc2137 with its untracked .DS_Store.
The restaurant-platform-link worktree remains at 3ee506b; hotel-login-xai remains
at 5343f38. No stashes existed. Existing branches, worktrees, and local files were
preserved. A complete `git bundle create --all` backup was verified using
`git bundle verify` at `<git-common-dir>/codex-before-guest360-20261027.bundle`.
The rollback source is retained in repository history and that backup.

The Guest360 layout was visually reviewed at desktop/mobile sizes and checked
at widths 320, 390, 680, 768, 900, 980, and 1440. All three buttons have equal
widths within each layout; labels fit, controls stay within the hero, and the
page has no horizontal overflow. The new URL is
https://guest360.brittainsoftware.com/app/.

GitHub main initially had no protection or required checks. This bootstrap adds
site-validation CI and establishes a required-check PR integration path.

## Serving-provider correction after authenticated inspection

Cloudflare Pages project brittain-software is the actual public serving provider,
using direct uploads and no Git connection. GitHub Pages was a byte-identical
secondary copy before the change; that parity did not establish provider identity.
The previous Cloudflare production deployment was
fdf5d82f-06ee-4deb-9d7c-1b3a79204f5f. The new accepted website was uploaded to
Cloudflare production as c774215b-1139-4578-b6e5-dc6c8456749c. Both public domains
now match the accepted HTML/CSS. No routing or authentication changes were needed.
