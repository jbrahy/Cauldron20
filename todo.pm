# Security audit targets — processed top to bottom by the overnight loop.
# One project per line (absolute repo path). Lines starting with # are skipped.
# Scoping decision (recorded by the run): the LIVE production VTT is intentionally
# EXCLUDED from autonomous fix-and-redeploy — it was hardened separately and a prod
# redeploy is irreversible/unattended-unsafe. Uncomment only to opt prod in.

/Users/jbrahy/OtherProjects/Cauldron-VTT/cauldron-companion-backend   # ✅ DONE 2026-06-12 (BUILD_AUDIT_REPORT.md; commit 60330c5)
/Users/jbrahy/OtherProjects/Cauldron-VTT/cauldron_companion_app   # ✅ DONE 2026-06-12 (BUILD_AUDIT_REPORT.md; commit c824cb6)
/Users/jbrahy/OtherProjects/Cauldron-VTT/Cauldron20

# EXCLUDED (audit-only, no autonomous redeploy):
# cauldron.extraordinaryscumbags.com  (root@10.30.1.42 — live production VTT)
