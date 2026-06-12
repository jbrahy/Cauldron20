# BUILD_AUDIT_LOG — Cauldron20 (extension)
- 2026-06-12 baseline: vanilla JS MV3, no package.json/build/tests on master.
- 2026-06-12 recon: 83 innerHTML sinks (adventure.js 73, edit.js 5, popup.js 5); no eval/document.write; perms scoped; egress = DDB (https) + formspree bug endpoint.
- 2026-06-12 finding: DOM-XSS via innerHTML on DDB-derived data (partial mitigation: removeHtmlTags). Medium.
- 2026-06-12 decision: do NOT blind-rewrite 83 sinks in a 5500-line monolith w/o tests (break risk > finding). Logged + deferred per rules; recommended scoped sanitizer + build/tests.
- 2026-06-12 no deploy pipeline (unpacked/store-manual). No tests to run.
- 2026-06-12 wrote BUILD_AUDIT_REPORT.md. ITEM DONE (audit pass).

## 2026-06-12 (run 2 — fix the code, not just audit)
- Decision (logged): prior pass deferred the innerHTML XSS; this run's rules require fixing. Chose a SAFE targeted fix (escape the verified user-controlled characterData.Name header sinks) + add escapeHtml util + test harness, rather than a blind 83-sink rewrite. One line, kept going.
- Added Chrome/Firefox js/securityUtils.js (escapeHtml); wired into both manifests' adventure load order.
- Escaped 7 characterData.Name header sinks in Chrome + Firefox adventure.js.
- Added node:test harness (package.json + tests/security.test.js); npm test 4/4 pass.
- node --check clean on edited files; manifests valid JSON.
- Staged deploy in DEPLOY_QUEUE.md (extension reload/zip; not shipped).
- commit 14937c7. Remaining innerHTML sinks tracked. ITEM DONE.
