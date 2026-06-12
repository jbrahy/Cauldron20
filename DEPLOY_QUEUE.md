# DEPLOY_QUEUE — staged, not shipped

## 2026-06-12 — Cauldron20 extension: XSS hardening (escapeHtml)
- **Changed:** added `js/securityUtils.js` (escapeHtml) to Chrome + Firefox, wired into the adventure content-script load order, and escaped 7 `characterData.Name` header sinks per platform (DOM-XSS via crafted character name).
- **Tests:** `npm test` → 4/4 pass (node:test). All edited files pass `node --check`. Manifests valid JSON.
- **Deploy command (NOT executed — manual, non-production):**
  - Chrome: reload the unpacked extension at `chrome://extensions` (Developer Mode → Reload on the `Chrome/` directory).
  - Firefox: `about:debugging` → reload the temporary add-on from `Firefox/`.
  - Store packaging (when ready): `cd Chrome && zip -r ../cauldron20-chrome.zip .` then upload to the Web Store dashboard.
- **Status:** staged. Not shipped to any store / not auto-installed.
