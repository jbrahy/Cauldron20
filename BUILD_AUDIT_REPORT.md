# BUILD_AUDIT_REPORT — Cauldron20 (browser extension)

**Date:** 2026-06-12 · **Stack:** vanilla JS, Manifest V3 (Chrome) + Firefox · **Build/tests:** none (loaded unpacked / store-published manually) · License: AGPLv3.

## Baseline
- No package.json, no build step, no test framework on `master` (monolithic `adventure.js`). Nothing to compile or run as a baseline.

## Audit coverage results
- **XSS / output encoding (HEADLINE FINDING):** Extensive `innerHTML` use renders D&D Beyond–derived data into the Cauldron VTT page context — **83 sinks**: `Chrome/js/adventure.js` (73), `Chrome/js/edit.js` (5), `Chrome/js/popup.js` (5). A crafted homebrew character (name/description/notes) could inject markup/script (DOM-based XSS) into the VTT page when the sheet renders. **Partial mitigation already present:** `removeHtmlTags()` is applied to some description fields. **Risk:** medium — requires importing attacker-crafted character data; runs in the VTT page origin.
- **Injection (other):** no `eval`, `new Function`, or `document.write`.
- **Secrets/credentials:** none in the client. DDB import uses the public character API over HTTPS (no auth handled).
- **Permissions:** `tabs`, `scripting`, `storage`; host permissions scoped to the DDB character endpoint and `cauldron-vtt.net` paths. Reasonable for the design (it injects into the VTT via `executeScript {world:'MAIN'}`).
- **External egress:** DDB character API (HTTPS); `formspree.io/f/mkgrpgwb` for user-submitted bug reports (verify it does not include character PII beyond what the user types).
- **Storage:** `chrome.storage.local` (character data) — local to the browser profile; acceptable.

## Features added
- None. Item processed as an **audit-only** pass (see decision below).

## Security issues — disposition
1. **innerHTML DOM-XSS surface (83 sinks).** *Not auto-fixed.* A correct fix is a **scoped refactor**: route all DDB-derived strings through a single escaping/sanitization helper before `innerHTML`, or build DOM with `textContent`/`createElement`, and extend `removeHtmlTags` coverage to every untrusted field. Doing this blind across a 5,500-line monolith **without a test harness or build** would risk breaking a working extension — higher risk than the finding. **Logged and deferred** per the operating rules. Recommended next step: introduce a build + unit tests (the abandoned Phase 5/6 modularization already attempted this) and apply the sanitizer centrally.

## Deploy
- **N/A** — the extension has no deploy pipeline; it is loaded unpacked or published to the web stores manually. No redeploy performed.

## Final status
- **Tests:** none exist; none run.
- **Audit:** complete; one medium finding documented with remediation.
- **Item status:** DONE (audit pass; remediation logged/deferred with full detail).
