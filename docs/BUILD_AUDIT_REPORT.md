# BUILD_AUDIT_REPORT — Cauldron20 (browser extension)

**Date:** 2026-06-12 · **Stack:** vanilla JS, Manifest V3 (Chrome) + Firefox · **Tests:** `npm test` (node:test, no deps) · License: AGPLv3 · Branch: `security/audit-2026-06-12`

## Baseline
- No package.json / build / tests existed (monolithic `adventure.js`). Added a dependency-free `node:test` harness this run.

## Features added (with tests)
| Feature | Where | Tests |
|---|---|---|
| **`escapeHtml` security utility** | `Chrome/js/securityUtils.js`, `Firefox/js/securityUtils.js`; wired into the adventure content-script load order in both manifests | `tests/security.test.js` (4 tests: angle-bracket neutralization, `&`/quote escaping, script-tag injection, null/undefined) — `npm test` 4/4 |
| **Minimal test harness** | `package.json` (`test: node --test tests/*.test.js`), `tests/` | self |

## Security issues found & fixed (commit 14937c7)
1. **DOM-XSS via `characterData.Name`** rendered raw into section headers (Bio/Actions/Features/Inventory/Spells/Extras). A crafted homebrew character name (`<img src=x onerror=…>`) would execute in the Cauldron VTT page context. **Fixed:** escaped with `escapeHtml()` at **7 sinks per platform** — `Chrome/js/adventure.js` and `Firefox/js/adventure.js` header assignments (the `${characterData.Name} -` interpolations). Verified by `node --check` (syntax) + the escape unit tests.

## Audit coverage results
- **XSS (remaining, tracked):** ~76 other `innerHTML` sinks remain. Many interpolate non-user data (computed numbers, fixed structure); some render DDB **descriptions that may legitimately contain HTML** and need a *sanitizer* (not blind escaping) to avoid breaking display. `escapeHtml` is now available for the plain-text ones; a full per-sink sweep is the tracked follow-up (it requires per-field judgment + the new test harness, which now exists).
- **Injection (other):** no `eval`, `new Function`, `document.write`.
- **Secrets/crypto:** none in client; DDB import over HTTPS; no auth handled.
- **Permissions/CORS/headers:** `tabs`,`scripting`,`storage`; host perms scoped to the DDB endpoint + `cauldron-vtt.net` paths. No cookies set by the extension.
- **Egress:** DDB character API (HTTPS) + `formspree.io` bug reports (user-submitted text).
- **Storage:** `chrome.storage.local` (profile-local).

## Skipped / deferred (logged)
- Full `innerHTML` sweep across the remaining sinks — deferred to avoid blind, untested rewrites of a 5,500-line monolith and because description fields need a sanitizer decision. The escape utility + test harness added this run are the foundation for it.

## Final status
- **Tests:** `npm test` → **4/4 pass**; `node --check` clean on all edited files; both manifests valid JSON.
- **Deploy:** **staged, not shipped** — see `DEPLOY_QUEUE.md` (manual extension reload / store-zip command recorded; nothing auto-installed or pushed to a store).
- **Audit pass:** the highest-risk, user-controlled XSS vector (character name) is fixed and tested; remaining sinks documented and tracked. No other new issues found.
