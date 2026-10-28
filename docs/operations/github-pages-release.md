# GitHub Pages release

Canonical repository: johnbcooper4177-tech/brittain-software. The existing public
site uses GitHub Pages legacy publishing from `main:/` with the custom domain
https://brittainsoftware.com/ and Cloudflare in front. No package build is needed.

Source integration and deployment require separate authorization. Because this
existing Pages configuration automatically publishes main, obtain both before
merging a website change. Do not change the hosting configuration as part of a
routine content release.

1. Use git-worktree-release-jbc to sync, validate, save and reconcile the task.
2. Run `python3 scripts/validate_site.py`, review desktop/mobile rendering, and
   verify the intended external links. Require the PR `site-validation` check.
3. Record the current main SHA and successful Pages build as rollback evidence.
4. Squash-merge the reviewed PR with its exact checked head SHA. This is the
   existing deployment trigger. Do not push directly to main.
5. Wait for the Pages build to finish successfully at the new integration SHA.
   Use `gh api repos/johnbcooper4177-tech/brittain-software/pages/builds/latest`.
6. Verify HTTP 200 and compare the live changed HTML/CSS bytes with the accepted
   source. Check the live browser at desktop and mobile sizes and inspect links.
7. Record source SHA, PR, build ID, verification and rollback anchor. Issue source
   reconciliation and deployment acceptance notices separately.

Rollback, only when authorized: create a new isolated branch from current main,
revert the exact faulty integration with a new commit, validate and squash-merge
through a PR. Wait for Pages and verify the restored site. Never reset main.

The policy's `none` deployment lane and runner profile describe the generic Git
helper, which cannot operate GitHub Pages. Its generic deploy gates deliberately
refuse. They do not describe or disable Pages' existing automatic main publishing.

The first policy/baseline bootstrap is explicitly authorized reconciliation;
normal Save trailers cannot exist before policy is accepted on main. Preserve
its task branch and record historical integration with exact PR/CI evidence.
