# DEPLOY_QUEUE — staged, not shipped

## 2026-06-12 — SHIPPED ✅ Whole-app codex reskin (Cauldron VTT site layout)
- **Scope:** reskinned `LAYOUT_SITE = cauldron` (all site chrome: home, register, account, privacy, market, manual). The play screen (`layout_adventure`, set in `controllers/adventure.php`) is intentionally untouched.
- **Changed on server `root@10.30.1.42` (app root `/home/cauldron/cauldron`):**
  - `views/banshee/layout_cauldron.xslt` — League emblem + wordmark header, dropped photo banner, footer credit.
  - `public/css/banshee/layout_cauldron.css` — full codex theme (self-hosted EB Garamond + Cormorant Garamond `@font-face`, parchment/gold palette, themed navbar/buttons/forms/tables/footer). CSP-safe (no external fonts).
  - `public/images/league-logo.png` (emblem) + `public/fonts/{eb-garamond,cormorant-garamond}-*.woff2` (7 files).
- **Source of truth:** edits live in the `Cauldron-VTT` repo (`gitlab.com/jbrahy/cauldron`), currently UNCOMMITTED.
- **Verified:** /,/register,/privacy → 200 themed; /account,/adventure → 401 (auth-gated, themed login); fonts `font/woff2` 200; zero console/CSP errors; play layout unchanged.
- **Backups (TS 20260613-051219):** `*.bak-20260613-051219` beside each edited file.
- **Rollback:** `ssh root@10.30.1.42 'cd /home/cauldron/cauldron && cp -a views/banshee/layout_cauldron.xslt.bak-20260613-051219 views/banshee/layout_cauldron.xslt && cp -a public/css/banshee/layout_cauldron.css.bak-20260613-051219 public/css/banshee/layout_cauldron.css'`  (emblem/fonts are additive, safe to leave).
- **Note:** the standalone `/redesign/` preview is now redundant.

## 2026-06-12 — SHIPPED ✅ Cauldron redesign landing (League of Extraordinary Scumbags)
- **Live:** https://cauldron.extraordinaryscumbags.com/redesign/ — non-destructive sub-path; homepage/app untouched.
- **From:** `design/` (`index.html` + `assets/*.svg`) → `root@10.30.1.42:/home/cauldron/cauldron/public/redesign/` via `rsync -az --delete`, then `chown -R cauldron:cauldron` + `chmod -R a+rX`.
- **Verified:** HTTPS 200, 24,915 bytes, League ×5 / "Astu non vi" ×3, SVGs `image/svg+xml`, homepage still `text/html`.
- **Rollback:** `ssh root@10.30.1.42 'rm -rf /home/cauldron/cauldron/public/redesign'`
- **Process doc:** `design/DEPLOY.md`. Promotion to the real homepage is deliberately NOT done (Banshee/XSLT view, separate task).

## 2026-06-12 — Cauldron20 extension: XSS hardening (escapeHtml)
- **Changed:** added `js/securityUtils.js` (escapeHtml) to Chrome + Firefox, wired into the adventure content-script load order, and escaped 7 `characterData.Name` header sinks per platform (DOM-XSS via crafted character name).
- **Tests:** `npm test` → 4/4 pass (node:test). All edited files pass `node --check`. Manifests valid JSON.
- **Deploy command (NOT executed — manual, non-production):**
  - Chrome: reload the unpacked extension at `chrome://extensions` (Developer Mode → Reload on the `Chrome/` directory).
  - Firefox: `about:debugging` → reload the temporary add-on from `Firefox/`.
  - Store packaging (when ready): `cd Chrome && zip -r ../cauldron20-chrome.zip .` then upload to the Web Store dashboard.
- **Status:** staged. Not shipped to any store / not auto-installed.
