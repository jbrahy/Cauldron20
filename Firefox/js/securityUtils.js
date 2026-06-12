// securityUtils.js — helpers for safely interpolating untrusted data into the DOM.
//
// Character data comes from D&D Beyond (including user-authored homebrew names,
// notes and descriptions), so any value placed into innerHTML must be escaped to
// prevent DOM-based XSS in the Cauldron VTT page context.
//
// Loaded as a content script before the feature scripts, so escapeHtml() is a
// global. Also exported via module.exports so it can be unit-tested under Node.

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (typeof globalThis !== "undefined") {
  globalThis.escapeHtml = escapeHtml;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { escapeHtml };
}
