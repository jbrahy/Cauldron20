# Cauldron20 Extension — Feature Backlog

100 feature ideas and upgrades scoped to **this repo**: the Cauldron20 browser
extension that bridges D&D Beyond character sheets into Cauldron VTT
(`popup.js`, `characterFetcher.js`, `cauldronNewCharacter.js`, `adventure.js`,
`securityUtils.js`, `background.js`, `edit.js`).

> The pre-existing `todo.md` is the **Cauldron Companion** product backlog (mobile
> app + Go backend) and is left untouched. This file is the *extension* backlog.

- Unchecked `[ ]` = not started. Numbers are stable IDs, not priority order.
- Each item: **what it is** — why it matters / how it works.

---

## Multiple characters & switching
- [ ] 1. **Multi-character store** — Keep more than one DDB character in `storage` keyed by ID instead of overwriting the single saved one. Closes the README's own "there are plans for multiple characters" gap.
- [ ] 2. **Character switcher in the popup** — A dropdown in `popup.html` to pick among saved characters; selecting one sets the active character used by the adventure injector.
- [ ] 3. **Per-character nicknames** — Let the user label a saved ID ("Goblin Bard") so the switcher shows names, not raw numbers.
- [ ] 4. **Per-adventure character binding** — Remember which character was last used on a given Cauldron adventure URL and auto-select it next time.
- [ ] 5. **Quick-remove a saved character** — A trash icon per entry in the switcher with a confirm step, instead of having to overwrite by typing a new ID.
- [ ] 6. **Party view** — Show all saved characters' core stats (HP/AC/passive perception) side by side for a player running multiple PCs/NPCs.
- [ ] 7. **Import multiple IDs at once** — Paste a comma-separated list of DDB IDs to bulk-add characters.
- [ ] 8. **Active-character badge** — Show the active character's name on the extension toolbar badge so the user knows which sheet will inject.

## Sync & data freshness
- [ ] 9. **Manual "refresh from DDB" button** — Re-fetch the character on demand so level-ups and gear changes pull in without re-entering the ID.
- [ ] 10. **Background refresh on a schedule** — Use `chrome.alarms` to refresh cached characters every N hours so the injected sheet isn't stale.
- [ ] 11. **Last-synced timestamp** — Display "synced 2h ago" in the popup and sheet header so users know how fresh the data is.
- [ ] 12. **Diff highlight after refresh** — Briefly highlight stats that changed since the last sync (HP max, new spell, new item).
- [ ] 13. **Stale-data warning** — If a character hasn't synced in >7 days, show a subtle "may be out of date" hint with a one-click refresh.
- [ ] 14. **Offline cache fallback** — When DDB is unreachable, render the last successfully cached character instead of an empty sheet.
- [ ] 15. **Conditional fetch with ETag/If-Modified-Since** — Avoid re-downloading unchanged character JSON to cut bandwidth and speed up loads.
- [ ] 16. **Retry with backoff on fetch failure** — Replace a single failed fetch with a few backed-off retries before surfacing an error.

## D&D Beyond import depth
- [ ] 17. **Resolve private/404 sheets gracefully** — Detect a non-public character and show a clear "set your sheet to public" message instead of a generic failure.
- [ ] 18. **Import character avatar/portrait** — Pull the DDB portrait and show it in the sheet header and switcher.
- [ ] 19. **Import background & personality** — Surface traits/ideals/bonds/flaws into the Bio tab, not just the basics.
- [ ] 20. **Import proficiency & expertise flags** — Mark skills with proficiency/expertise dots and double bonuses correctly.
- [ ] 21. **Import attunement state** — Show which magic items are attuned and enforce the 3-item attunement count.
- [ ] 22. **Import currency** — Parse and display CP/SP/EP/GP/PP with a total-in-gold conversion.
- [ ] 23. **Import racial & feat modifiers** — Fold racial bonuses and feats into derived stats so numbers match the DDB sheet exactly.
- [ ] 24. **Import multiclass spellcasting** — Compute combined slot tables for multiclassed casters rather than per-class only.
- [ ] 25. **Import conditions/exhaustion** — Reflect active conditions and exhaustion level from the sheet.
- [ ] 26. **Validate the ID format on input** — Reject obviously-bad IDs in the popup with inline feedback before firing a request.

## Character sheet UI (the injected `adventure.js` sheet)
- [ ] 27. **Collapsible/resizable sheet panel** — Let users drag-resize and collapse the injected sheet so it doesn't cover the map.
- [ ] 28. **Remember panel position & size** — Persist the sheet's position/size per user in `storage`.
- [ ] 29. **Dark/light theme toggle** — Theme the injected sheet to match the user's preference and Cauldron's look.
- [ ] 30. **Search within the sheet** — A filter box that narrows the current tab (find a spell/item/feature fast).
- [ ] 31. **Pin favorite actions** — Star frequently used actions/spells to a "Favorites" strip at the top of the sheet.
- [ ] 32. **Keyboard shortcuts** — Hotkeys to toggle the sheet, switch tabs, and roll the highlighted item.
- [ ] 33. **Tab badge counts** — Show counts on tabs (e.g., prepared spells, attuned items) for at-a-glance context.
- [ ] 34. **Sticky sheet header** — Keep name/HP/AC visible while scrolling a long tab.
- [ ] 35. **Compact vs detailed view toggle** — A density switch for small screens vs. full detail.
- [ ] 36. **Drag-to-reorder tabs** — Let users arrange the Actions/Bio/Features/Inventory/Spells/Extras tabs.

## Combat & actions
- [ ] 37. **Editable HP tracker** — +/- HP controls and current/max display directly in the sheet header.
- [ ] 38. **Temporary HP field** — Track temp HP separately so damage subtracts from it first.
- [ ] 39. **Death save tracker** — Three success/failure pips with reset on heal.
- [ ] 40. **Condition toggles** — Tap to apply/remove standard 5e conditions with tooltips for their effects.
- [ ] 41. **Concentration tracker** — Flag the active concentration spell and prompt a CON save on damage.
- [ ] 42. **Action economy hints** — Tag each action as Action/Bonus/Reaction so players don't double-spend a turn.
- [ ] 43. **Initiative roller** — One-click initiative roll that can post to the Cauldron chat.
- [ ] 44. **Short/long rest buttons** — Restore HP, slots, and limited-use features per rest rules.
- [ ] 45. **Limited-use resource counters** — Track per-rest uses (Channel Divinity, Bardic Inspiration, etc.) with reset on rest.
- [ ] 46. **Damage/heal log** — A small running log of HP changes for the current encounter.

## Dice rolling
- [ ] 47. **Roll any line item** — Click an attack/save/skill to roll it with the correct modifier.
- [ ] 48. **Advantage/disadvantage modifier** — Hold a key (or toggle) to roll 2d20 keep highest/lowest.
- [ ] 49. **Post rolls to Cauldron chat** — Send the computed result into Cauldron's `cauldrond`/chat so the table sees it (reuse the existing injection path).
- [ ] 50. **Critical-hit damage** — Auto-double damage dice on a natural 20 attack roll.
- [ ] 51. **Roll history panel** — A scrollable log of recent rolls with re-roll and copy.
- [ ] 52. **Custom dice expressions** — A small parser for ad-hoc `2d6+3`-style rolls from the sheet.
- [ ] 53. **Per-spell damage at higher levels** — When casting at a higher slot, scale damage dice automatically.
- [ ] 54. **Inline roll results** — Show the result next to the clicked item with a fade, not just in a log.

## Spells & slots
- [ ] 55. **Spell slot tracker** — Per-level slot pips that decrement on cast and restore on rest.
- [ ] 56. **Prepared/known filter** — Toggle to show only prepared (or known) spells.
- [ ] 57. **Spell detail popover** — Click a spell to see full range/components/duration/description without leaving the tab.
- [ ] 58. **Ritual tag & casting** — Mark ritual spells and offer a "cast as ritual" path that doesn't spend a slot.
- [ ] 59. **Concentration column** — Flag concentration spells in the list so players plan around them.
- [ ] 60. **Sort/group spells** — Group by level/school or sort by name; remember the choice.
- [ ] 61. **Cantrip scaling note** — Show the current cantrip damage tier based on character level.

## Inventory & equipment
- [ ] 62. **Equip/unequip toggle** — Mark items equipped and reflect AC/attack changes where derivable.
- [ ] 63. **Quantity & weight totals** — Show stack quantities and a carried-weight total with encumbrance hints.
- [ ] 64. **Container grouping** — Group items by container (backpack, pouch) matching the DDB layout.
- [ ] 65. **Quick item search/filter** — Filter the inventory tab by name or type.
- [ ] 66. **Item detail popover** — Show full item description/properties on click.
- [ ] 67. **Consumable counters** — Decrement potions/ammo/charges with a tap.
- [ ] 68. **Attunement slot indicator** — Visualize used/free attunement slots (3 max) in the inventory header.

## Cauldron VTT integration
- [ ] 69. **Robust character creation mapping** — Harden `cauldronNewCharacter.js` so all stats/skills map onto the Cauldron "new character" form even when the form markup shifts.
- [ ] 70. **Detect existing Cauldron character** — Before creating, check if the character already exists to avoid duplicates; offer update instead.
- [ ] 71. **Two-way HP sync** — Reflect HP changes between the injected sheet and the Cauldron token where the API allows.
- [ ] 72. **Token portrait sync** — Push the DDB portrait to the Cauldron token image on creation.
- [ ] 73. **Selector resilience layer** — Centralize Cauldron DOM selectors in one config so site changes are a one-file fix.
- [ ] 74. **Adventure-aware injection** — Only inject the sheet once the adventure canvas is ready, with a mutation-observer guard against re-injection.
- [ ] 75. **"Open in Cauldron" deep link** — From the popup, jump to the active character/adventure page in Cauldron.
- [ ] 76. **Graceful no-op off-site** — Ensure content scripts cleanly do nothing (no console noise) when Cauldron markup is absent.

## Settings, onboarding & UX
- [ ] 77. **First-run onboarding** — A short guided popup explaining the public-sheet requirement and the ID field, replacing trial-and-error.
- [ ] 78. **Settings/options page** — A proper options page for theme, refresh interval, default tab, and roll-to-chat toggle.
- [ ] 79. **Help/troubleshooting link** — In-popup link to the wiki and the three error-reporting channels from the README.
- [ ] 80. **Inline loading & empty states** — Spinners and friendly empty states instead of a blank sheet during fetch.
- [ ] 81. **Toast notifications** — Non-blocking toasts for success/failure (synced, roll posted, item used).
- [ ] 82. **Internationalization scaffold** — Use `chrome.i18n` and `_locales` so the UI can be translated.
- [ ] 83. **Export/import settings** — Back up and restore extension settings + saved character IDs as a JSON file.
- [ ] 84. **What's-new panel** — Show a brief changelog on version bump so users discover new features.

## Accessibility
- [ ] 85. **Full keyboard navigation** — Make the popup and injected sheet operable without a mouse (tab order, Enter/Space activation).
- [ ] 86. **ARIA roles & labels** — Label tabs, buttons, and live regions so screen readers announce rolls and HP changes.
- [ ] 87. **Color-contrast pass** — Audit `popup.css`/`characterSheet.css` against WCAG AA and fix low-contrast text.
- [ ] 88. **Respect reduced-motion** — Honor `prefers-reduced-motion` for the fades/animations.
- [ ] 89. **Scalable text** — Ensure the sheet remains usable at large browser zoom / font sizes.

## Security, privacy & reliability
- [ ] 90. **Extend `escapeHtml` coverage audit** — Sweep `adventure.js`/`edit.js` for any remaining `innerHTML` sinks that bypass `securityUtils.escapeHtml` (follow-up to the recent DOM-XSS fix).
- [ ] 91. **Replace `innerHTML` with DOM builders** — Where practical, construct nodes with `textContent`/`createElement` instead of HTML strings to remove the XSS surface entirely.
- [ ] 92. **Strict CSP in the manifest** — Add a content-security-policy for the extension pages to harden against injected script.
- [ ] 93. **Validate DDB JSON shape** — Defensively check fetched JSON before rendering so a malformed/hostile response can't break the sheet.
- [ ] 94. **Minimize host permissions** — Review `host_permissions` and narrow any broader-than-needed match patterns.
- [ ] 95. **No PII in logs** — Audit `console` calls to ensure character data isn't logged; gate any debug logging behind a flag.
- [ ] 96. **Permission rationale in store listing** — Document why each permission is requested to ease store review and user trust.
- [ ] 97. **Error telemetry (opt-in)** — Optional, anonymized error reporting so failures surface without manual user reports.

## Tooling, tests & cross-browser
- [ ] 98. **Shared source for Chrome/Firefox** — De-duplicate the near-identical `Chrome/` and `Firefox/` trees into one source with a build step per target.
- [ ] 99. **Expand the test harness** — Grow `tests/` (currently `node --test`) to cover `characterFetcher` parsing and `securityUtils` edge cases with fixtures.
- [ ] 100. **CI + lint + packaged zips** — A GitHub Action that runs tests, lints JS, and produces signed Chrome/Firefox zips on tag.
