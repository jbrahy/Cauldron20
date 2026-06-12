const test = require("node:test");
const assert = require("node:assert");
const { escapeHtml } = require("../Chrome/js/securityUtils.js");

test("escapes angle brackets so markup cannot form", () => {
  const out = escapeHtml("<img src=x onerror=alert(1)>");
  assert.ok(!out.includes("<") && !out.includes(">"));
  assert.strictEqual(out, "&lt;img src=x onerror=alert(1)&gt;");
});

test("escapes &, quotes", () => {
  assert.strictEqual(escapeHtml("a & b \"c\" 'd'"), "a &amp; b &quot;c&quot; &#39;d&#39;");
});

test("neutralizes a script tag injection", () => {
  const out = escapeHtml("<script>alert(document.cookie)</script>");
  assert.ok(!out.toLowerCase().includes("<script>"));
});

test("null/undefined -> empty string", () => {
  assert.strictEqual(escapeHtml(null), "");
  assert.strictEqual(escapeHtml(undefined), "");
});
