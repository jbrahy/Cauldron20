# Deploy — Cauldron redesign (League of Extraordinary Scumbags landing)

**Live URL:** https://cauldron.extraordinaryscumbags.com/redesign/
**What ships:** the static landing page in this folder (`index.html` + `assets/league-logo.png` + `assets/README.md`). The full-res `league-logo-source.png` is excluded from deploy.
**Strategy:** non-destructive **sub-path** deploy. The real homepage and the Banshee
PHP app are never touched — the page lives at `/redesign/` until you choose to promote it.

---

## Why a sub-path is safe (how the server routes)

The live site is the **Cauldron-VTT** Banshee/PHP app, served by **nginx** on
`root@10.30.1.42` (EC2). Relevant facts:

| Fact | Value |
|------|-------|
| Web server | nginx (`/etc/nginx/conf.d/cauldron.conf`) |
| `server_name` | `cauldron.extraordinaryscumbags.com` |
| Doc root | `/home/cauldron/cauldron/public` |
| App owner | `cauldron:cauldron` |
| Catch-all route | `location / { try_files $uri $uri/ /index.php?$query_string; }` |

Because the catch-all does `try_files $uri $uri/` **before** the PHP rewrite, a real
directory `/redesign/` with an `index.html` is served as static files directly. The
sub-path is not inside any of the locked app-dir locations
(`settings|database|controllers|models|views|templates|libraries|logfiles|extra`)
nor the asset handlers (`css|js|fonts|files|images|resources`), so it can't collide
with the application. HTTP is 301-redirected to HTTPS at the edge.

---

## Deploy procedure (exactly what was run)

From the repo root (`Cauldron20/`), with SSH access to `root@10.30.1.42`:

```bash
# 1. Push files into a NEW sub-dir of the live docroot (excludes large preview PNGs).
#    --delete keeps the remote dir an exact mirror of design/ on re-deploys.
rsync -az --delete \
  -e "ssh -o BatchMode=yes -o ConnectTimeout=15" \
  --exclude 'preview.png' --exclude 'assets/league-seal-preview.png' \
  design/ root@10.30.1.42:/home/cauldron/cauldron/public/redesign/

# 2. Match app ownership and ensure nginx can read everything.
ssh root@10.30.1.42 '
  chown -R cauldron:cauldron /home/cauldron/cauldron/public/redesign &&
  chmod -R a+rX /home/cauldron/cauldron/public/redesign'
```

No nginx reload is required — static files in an existing doc root are picked up
immediately. No PHP, config, or app file is modified.

---

## Verification (run after every deploy)

```bash
URL=https://cauldron.extraordinaryscumbags.com/redesign/

# Page returns 200 + expected content
curl -sS "$URL" -o /tmp/r.html && wc -c < /tmp/r.html
grep -c "League of Extraordinary Scumbags" /tmp/r.html   # expect 5
grep -c "Astu non vi" /tmp/r.html                        # expect 3

# Assets serve as SVG
curl -sI "${URL}assets/league-seal.svg" | grep -i content-type   # image/svg+xml

# Homepage is UNTOUCHED (still the PHP app)
curl -sI https://cauldron.extraordinaryscumbags.com/ | grep -i content-type  # text/html; charset=utf-8
```

Last verified: page 24,915 bytes, all markers present, assets `image/svg+xml`,
homepage still `text/html; charset=utf-8`.

---

## Rollback (instant, total)

The deploy is isolated to one directory. To remove it completely:

```bash
ssh root@10.30.1.42 'rm -rf /home/cauldron/cauldron/public/redesign'
```

Nothing else changes; the live site is exactly as before.

---

## Promoting to the real homepage (later, deliberate — NOT done here)

This page is a **static mockup**; the live homepage is rendered by Banshee through an
XSLT view, so promotion is a real task, not a file swap. Recommended path when ready:

1. Port `index.html` into the app's home view (`Cauldron-VTT/views/…xslt`) or serve it
   as a static `public/index.html` only if the app's routing is adjusted to allow it.
2. Commit to the VTT repo (`gitlab.com/jbrahy/cauldron`) and deploy via the same
   rsync-to-docroot method (or your normal release process).
3. **Back up first:** `cp -a /home/cauldron/cauldron/public/index.php{,.bak-$(date +%F)}`
   before changing any app entry point, and keep the `/redesign/` copy as the fallback.
