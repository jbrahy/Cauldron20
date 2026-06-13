# Cauldron Companion — Feature Backlog

100 new feature ideas spanning the **mobile companion app**, the **Go backend**, the **Cauldron VTT** (self-hosted), and the **ConceptHarness → playable campaign** pipeline. Each item: what it is, why it matters, and how it works.

- **New features** = capabilities that do not exist yet.
- Unchecked `[ ]` = not started. Priorities are suggestions, not commitments.

---

## Part 1 — 100 New Features

### Asynchronous turn engine & play
- [ ] 1. **Initiative-ordered async turns** — Combat is one turn at a time in initiative order, but players act whenever they're free. The server holds a single active-turn lock per encounter; submitting advances it and notifies the next player. Turns combat into something playable across a workday.
- [ ] 2. **Per-campaign turn clock** — Each campaign sets its own `turn_timeout_seconds` (default 4h). On expiry the engine auto-passes (or Dodge) so an absent player never stalls the table; a worker sweeper enforces it on a 60s tick.
- [ ] 3. **Reminder ladder** — At 50% and 90% of a turn's deadline the active player gets escalating nudges (push only, to control cost) so turns resolve before they expire without spamming SMS.
- [ ] 4. **DM turn overrides** — The DM can skip, extend, hold (delay), or hand the active slot to any participant, mirroring ready/delay actions and keeping the table moving when life happens.
- [ ] 5. **Reaction windows** — When a reaction triggers (opportunity attack, Shield, Counterspell) the DM opens a transient window letting a specific player respond without taking the active slot, keeping reactions out of the strict one-at-a-time loop.
- [ ] 6. **Turn replay & history** — Every turn and action is logged immutably, so a player returning after days can scroll the exact sequence: who rolled what, and how the board changed.
- [ ] 7. **"Catch me up" digest** — On opening the app a player sees an auto-generated summary of everything since their last visit (turns, HP changes, new locations, NPC reveals) so re-entry is frictionless.
- [ ] 8. **Pre-declared actions** — A player queues "if it's still my turn when X, do Y" so the engine resolves their turn instantly when it comes up, compressing downtime for known intentions.
- [ ] 9. **Parallel non-combat scenes** — Outside initiative the DM runs split-party scenes concurrently (rogue scouts while the party rests), each its own thread, merged when they reunite.
- [ ] 10. **Soft turn timers with grace** — Configurable "you're up" windows that respect time zones and quiet hours, pausing the clock overnight so nobody is auto-passed while asleep.
- [ ] 11. **Encounter pacing analytics** — The DM sees how long each turn/round actually took, flagging the player or mechanic creating bottlenecks so future sessions tighten up.
- [ ] 12. **Round recap cards** — At each round boundary the app posts a compact recap (positions, conditions, who's bloodied) so the next player has full context without scrolling.

### Notifications & presence
- [ ] 13. **Tiered notifications (push / email / SMS)** — Push and email are free; SMS is premium. The same turn event fans out per the user's plan and prefs with a shared idempotency key so nothing double-fires.
- [ ] 14. **"It's your turn" with board snapshot** — The notification carries a signed, short-lived link to the current board state/screenshot so a player sees where everyone is before acting, from a lock screen.
- [ ] 15. **Quiet hours & per-channel prefs** — Per-user windows and channel toggles (push always, SMS only for my turn, never overnight) so notifications respect real life.
- [ ] 16. **Delivery receipts & fallback** — If a push is undelivered (stale token) the system escalates to email/SMS (plan permitting) and records delivery state for reliability.
- [ ] 17. **Presence & "who's around"** — Lightweight presence shows which players are online so the DM can opportunistically run a live mini-scene when enough people are active.
- [ ] 18. **STOP/HELP compliance** — Full A2P 10DLC + TCPA handling: logged opt-in, inbound STOP/START/HELP, suppression, and an immutable SMS audit trail — required to send SMS at all.
- [ ] 19. **Per-plan SMS budgeting** — Hard caps per tier with graceful degradation to push when the cap is hit, plus a usage meter so the table sees remaining SMS.
- [ ] 20. **Calendar nudges for live sessions** — Scheduled live-session reminders synced to device calendars, with one-tap "join voice" when the session starts.

### Voice, video & the live table
- [ ] 21. **Per-campaign voice/video room** — One LiveKit room per campaign for when the group gathers, with push-to-join from a notification — the "around the table when away from the table" piece.
- [ ] 22. **Spotlight the active player** — During async-but-watching sessions the UI spotlights whoever's turn it is on video so spectators follow the action.
- [ ] 23. **Voice-note turns** — A player submits a turn as a short in-character recording instead of typing; it posts to the log and optionally transcribes.
- [ ] 24. **Ambient soundscapes** — DM-triggered shared audio (tavern, dungeon, battle) streamed to the room to set the scene, synced across devices.
- [ ] 25. **Push-to-talk & noise gating** — Table-friendly audio controls so a noisy player doesn't drown the room; DM can mute/manage.
- [ ] 26. **Recorded session highlights** — Opt-in recording with auto-generated highlight clips (the nat-20, the TPK near-miss) for the campaign's memory.
- [ ] 27. **Live dice on camera** — Roll real dice on camera and the app captures/logs the result, bridging tactile play and the record.
- [ ] 28. **Watch-party / spectator mode** — With DM permission, friends spectate a campaign read-only — good for community streams of homebrew adventures.

### Cauldron VTT integration & bridge
- [ ] 29. **Direct server-to-server VTT sync** — Because you own the VTT, the companion talks to it directly (DB/API) instead of via the fragile extension, syncing adventures, maps, HP, and turn state reliably.
- [ ] 30. **Companion turns mirrored to the table** — A turn taken in the app posts the resulting roll/chat into the VTT's `cauldrond` chat so the table sees it instantly, using the server-computed result (never re-rolled).
- [ ] 31. **Board screenshots without the extension** — The VTT renders the current map server-side (or via a capture you control) for the "your turn" image, removing the browser-extension dependency.
- [ ] 32. **HP/condition two-way sync** — Damage in the app reflects on VTT tokens and vice-versa; the VTT stays authoritative for board state, the engine for turn order.
- [ ] 33. **Adventure import from `vtt-import.json`** — A ConceptHarness-generated campaign imports straight into the VTT's `adventures`/`maps`/`story_*` tables as a playable adventure.
- [ ] 34. **Map thumbnails in-app** — A browsable gallery of each location's map so players reference the battlefield between turns.
- [ ] 35. **Mobile token mover** — On your turn, drag your token on a mobile map view; the move syncs to the VTT for the table — full remote play, not just chat.
- [ ] 36. **Fog-of-war aware views** — The mobile board respects each player's fog of war so players see only what their character would, matching the VTT's per-player visibility.
- [ ] 37. **Initiative pulled from the VTT `agenda`** — Where the VTT already tracks initiative, the companion reads/writes it so the two stay in lockstep instead of a parallel order.
- [ ] 38. **One-click "open at the table"** — A deep link that opens the exact adventure/map in the VTT for the DM, jumping from mobile prep to running it on the big screen.

### Characters & D&D Beyond
- [ ] 39. **D&D Beyond import** — Pull a public DDB character by ID (server-side, no auth scraping) into a clean card: stats, skills, saves, actions, spells, inventory.
- [ ] 40. **Live character sheet** — A full interactive sheet: spend slots, track HP/conditions, roll from any line item, synced to the campaign.
- [ ] 41. **Multi-character & retinue** — Manage several PCs and companions/familiars/summons, switching active control per encounter.
- [ ] 42. **Character art & token generation** — AI-assisted portrait/token creation from a description, producing the topdown/portrait tokens the VTT uses.
- [ ] 43. **Spell & ability quick-cast** — Tap a spell to roll attack/save, apply slot cost, and post the formatted result + VTT chat link in one action.
- [ ] 44. **Concentration & condition tracker** — Auto concentration checks on damage, condition timers, and start-of-turn reminders.
- [ ] 45. **Level-up assistant** — Guided level-ups respecting the rule system, with the DM gating milestone vs XP progression per campaign.
- [ ] 46. **Shared party sheet** — A DM/party overview of everyone's HP, AC, passive perception, and resources for fast adjudication.

### Dice & mechanics
- [ ] 47. **App-initiated, server-authoritative dice** — You roll from your phone; the server computes the result so it's consistent and tamper-proof, then broadcasts and mirrors it to the VTT.
- [ ] 48. **Advantage/disadvantage & modifiers UI** — One-tap adv/dis, situational modifiers, and inspiration, with a clear breakdown of every die and bonus.
- [ ] 49. **Custom dice & rule-system packs** — dnd5, Pathfinder 2e, and Cyberpunk Red mechanics, plus user-defined dice for homebrew (the VTT already has `custom_dice`).
- [ ] 50. **Signature campaign subsystem** — Per-campaign bespoke mechanics (corruption track, doom clock, bargain resource) defined by the DM and tracked for the whole table — the memorable hook.
- [ ] 51. **Roll macros** — Save named rolls ("Sneak Attack: 1d20+9 / 3d6+4d6") for one-tap repeats.
- [ ] 52. **Group & contested rolls** — The DM calls a group check (stealth) or contested roll; everyone rolls into one resolved result with a pass/fail tally.
- [ ] 53. **Roll provenance & anti-cheat** — Every roll logged with who/when/seed; optional commit-reveal verification for competitive tables.
- [ ] 54. **Probability hints** — Optional "you need 14+; ~35% to hit" hints for newer players, toggleable by the DM for tone.

### DM tools & prep
- [ ] 55. **Encounter builder with CR balancing** — Assemble encounters from a bestiary, see party-adjusted difficulty, and push them to the VTT as `story_encounters` + monsters.
- [ ] 56. **NPC grimoire** — A searchable roster (name, motivation, secret, voice, stat notes) with quick "drop into scene" and voice prompts.
- [ ] 57. **Initiative tracker (DM screen)** — A live tracker with HP, conditions, and legendary/lair actions, doubling as the source the async engine reads.
- [ ] 58. **Read-aloud & beat prompter** — Per-session story beats and boxed text on a teleprompter view so the DM narrates without losing place.
- [ ] 59. **Random tables & generators** — Loot, names, rumors, weather, and complications, rollable inline and droppable into the log.
- [ ] 60. **Session zero toolkit** — Safety tools (lines/veils, X-card), expectations survey, and a shared campaign charter captured up front.
- [ ] 61. **Secret DM notes** — Hidden notes per NPC/location/encounter, revealed to players only when the DM chooses (mirrors VTT `dm_notes`).
- [ ] 62. **Prep-to-play continuity** — Prep on mobile during the week (NPCs, maps, beats); it's all there when you sit at the table, no re-entry.
- [ ] 63. **Improvise assist** — When players go off-script, an AI drawer offers NPC reactions, plausible complications, and a relevant stat block on demand.
- [ ] 64. **Recap & "previously on…"** — Auto-generated, DM-editable session recaps that keep a serialized feel across weeks.

### Concept → Campaign pipeline (ConceptHarness)
- [ ] 65. **Gamify any story concept** — The `dnd-campaign` generator turns a concept into a full playable campaign (bible, NPCs, encounters, maps, sessions, finale).
- [ ] 66. **Signature mechanic from "special sauce"** — The concept's memorable device becomes the campaign's signature subsystem automatically, so each generated campaign plays uniquely.
- [ ] 67. **One-click concept → playable adventure** — Generate → `vtt-import.json` → import into the VTT → invite the party. Story idea to table in minutes.
- [ ] 68. **Rule-system targeting** — Choose dnd5/Pathfinder 2e/Cyberpunk Red at generation; stat blocks, CR, and mechanics are written for it.
- [ ] 69. **Cross-media canon lock** — The book is ConceptHarness's source of truth, so the campaign stays consistent with the novel/comic/TV versions of the same concept.
- [ ] 70. **Session-length tuning** — Specify arc length (e.g., 12 sessions); the generator paces acts, beats, and escalation to fit.
- [ ] 71. **Iterative regeneration** — Regenerate individual stages (just the NPCs, just session 7) without rebuilding the whole campaign.
- [ ] 72. **Campaign marketplace seeding** — Publish generated campaigns to the VTT's adventure market (with attribution), growing a library of original, non-WotC content.

### Social, community & discovery
- [ ] 73. **Invite-code joining** — Players join a campaign with a short, human-readable code (already built), no account juggling.
- [ ] 74. **Group finder / LFG** — Match players to campaigns by system, schedule, tone, and experience, with DM-approved joins.
- [ ] 75. **Campaign feed** — A shared timeline of rolls, milestones, and DM posts — the social heartbeat between sessions.
- [ ] 76. **Achievements & milestones** — Table-level milestones (first TPK survived, villain defeated) celebrated in the feed and chronicle.
- [ ] 77. **Character backstory weaving** — Players submit hooks; the DM (or AI) weaves them into upcoming beats, surfacing personal stakes.
- [ ] 78. **Shared journal & lore wiki** — A collaborative campaign wiki auto-seeded from the generated bible and editable by the table.
- [ ] 79. **Cross-campaign profile** — A player profile spanning campaigns: characters played, sessions, favorite moments — portable identity.
- [ ] 80. **Community theming** — User-shareable themes/skins (the Codex look being one) so groups dress their table to taste.

### Monetization & accounts
- [ ] 81. **Free tier (push + email)** — Full async play and notifications via push/email at no cost — the on-ramp that proves the loop.
- [ ] 82. **Premium SMS tier** — Subscription that funds SMS turn pings (play from a flip phone in line at the DMV), priced to cover carrier cost with margin.
- [ ] 83. **DM/group plans** — A DM subscribes for their table; players inherit premium within that campaign, simplifying billing to one payer.
- [ ] 84. **Stripe checkout & portal** — Hosted checkout and self-serve billing so no card data touches the backend; webhooks reconcile entitlements.
- [ ] 85. **Usage transparency** — A clear meter of SMS used vs included and what each tier unlocks, so spend never surprises.
- [ ] 86. **Marketplace revenue share** — Optional paid premium campaigns/assets in the adventure market with creator payouts.

### Accessibility & quality-of-life
- [ ] 87. **Screen-reader & dynamic type** — Full a11y: semantic labels, large-text support, high-contrast mode so the table is playable by everyone.
- [ ] 88. **Colorblind-safe board** — Token/condition coloring with shapes/patterns, not color alone, for map legibility.
- [ ] 89. **Text-to-speech read-aloud** — Boxed text and NPC dialogue spoken aloud, for accessibility and ambiance.
- [ ] 90. **Offline-tolerant client** — Cached campaign snapshot and queued, idempotent outbound actions so a brief disconnect doesn't lose your turn.
- [ ] 91. **Localization** — Multi-language UI and rule-system terms, broadening reach beyond English tables.
- [ ] 92. **One-handed mobile layout** — Reachable controls and a bottom-anchored action composer tuned for taking a turn on a phone one-handed.
- [ ] 93. **Content warnings & safety mid-game** — In-session X-card/pause any player can trigger, with the DM notified discreetly.

### Platform, security & infrastructure
- [ ] 94. **Multi-tenant isolation** — Every record is tenant-scoped with a repository guard so one group can never see another's data — productized SaaS from day one.
- [ ] 95. **Magic-link (passwordless) auth** — Email magic-link login with JWT access + rotating refresh tokens; no passwords to leak (already built).
- [ ] 96. **Device pairing for the VTT bridge** — A QR/code pairing flow links a browser to your account without pasting tokens, for any residual extension-based capture.
- [ ] 97. **Realtime gateway with reconnect** — A WebSocket gateway (Redis fan-out) pushes turn/chat/presence events; clients reconcile via REST on reconnect so no event is lost.
- [ ] 98. **Audit log & data export** — Per-campaign audit trail and a full GDPR-friendly export so groups own their stories and can leave with them.
- [ ] 99. **Self-host option** — Because the stack is yours, offer a self-hostable backend (bring your own Twilio/Stripe/LiveKit keys) alongside the hosted service.
- [ ] 100. **Native iOS/Android builds** — Beyond web: real App Store / Play builds with native push (APNs/FCM), background turn alerts, and home-screen presence — the true mobile app.

---

## Part 2 — 100 Upgrades to Existing Features

Improvements to capabilities that already exist in the **Cauldron20 extension**, the **Cauldron VTT**, and the **backend/app** we built.

### Extension — D&D Beyond import & character sheet
- [ ] 101. **Authenticated DDB import** — Support a Cobalt session token so private/homebrew characters import, not only public IDs.
- [ ] 102. **Auto-resync on change** — Poll/refresh the imported character so HP/slots/items stay current mid-session instead of going stale after import.
- [ ] 103. **Resizable, dockable overlay** — Let users drag/resize the character-sheet overlay and remember its position, instead of the fixed top-left panel.
- [ ] 104. **Overlay theming** — Parchment/dark themes for the sheet overlay matching the Codex redesign.
- [ ] 105. **Inline HP / temp HP / death saves** — Extend the HP monitor into full editable HP, temporary HP, and death-save tracking in the overlay.
- [ ] 106. **Spell-slot tracking** — Expend/restore slots with short/long-rest resets, building on the existing spell list.
- [ ] 107. **Concentration tracker** — Hook the existing spell-cast flow to track concentration and prompt saves on damage.
- [ ] 108. **In-tab search/filter** — Search within actions, inventory, and spells tabs for big characters.
- [ ] 109. **Reorder & favorite actions** — Drag-to-reorder and pin favorites in the Common Action menu.
- [ ] 110. **Crit handling** — Auto-double damage dice on a natural 20 in the roll flow.
- [ ] 111. **Multi-attack sequences** — One-click Extra Attack / multiattack chains.
- [ ] 112. **Currency & encumbrance** — Track coins and carried weight from inventory data.
- [ ] 113. **Conditions panel** — Apply conditions (poisoned, prone, etc.) that mechanically adjust rolls.
- [ ] 114. **Smarter AC calc** — Extend the AC fix to shields, cover, magic items, and unarmored-defense variants.
- [ ] 115. **Offline cache** — Cache fetched characters with a stale indicator so the sheet works without a fetch.
- [ ] 116. **Better import errors** — Distinct messages for private/not-found/rate-limited rather than a generic failure.
- [ ] 117. **Per-character notes** — A synced scratchpad per character.
- [ ] 118. **Export to PDF / share link** — Beyond JSON export, produce a printable sheet or shareable link.
- [ ] 119. **Fuller modifier coverage** — Close gaps in feat/homebrew modifier handling in the stat calc.
- [ ] 120. **Roll keyboard shortcuts** — Hotkeys for d20, saves, and skills.

### VTT — maps, fog of war, tokens & lighting
- [ ] 121. **Per-token vision** — Drive fog reveal from each token's vision range, upgrading the flat `fow_distance`.
- [ ] 122. **Richer dynamic lighting** — Light falloff, colored lights, and flicker on the `lights` system.
- [ ] 123. **Layered / multi-floor maps** — Z-levels for dungeons with stacked floors.
- [ ] 124. **Measurement & templates** — Distance tool plus cone/sphere/line spell templates.
- [ ] 125. **Token auras & reach** — Visual aura and reach indicators around tokens.
- [ ] 126. **On-map condition icons** — Show status/conditions on `map_token`s.
- [ ] 127. **Grid presets & snap toggle** — Square/hex presets and snap-vs-free movement.
- [ ] 128. **Explored-vs-hidden fog** — Dim explored areas instead of fully re-hiding them.
- [ ] 129. **Smart token upload** — Drag-drop art with auto top-down/portrait detection (`token_type`).
- [ ] 130. **Active-token highlight** — Glow the token whose turn it is, linked to the agenda.
- [ ] 131. **Zone ambience** — Per-zone audio with crossfade using the map `audio` + `zones` tables.
- [ ] 132. **Door/wall editor UX** — One-click open/close and cleaner wall drawing.
- [ ] 133. **Weather/overlay FX** — Rain/fog visual effects per map.
- [ ] 134. **Map snapshots** — Save/restore encounter setups (token layouts) for reuse.
- [ ] 135. **Ping & draw** — Player pings and temporary map drawing.
- [ ] 136. **Elevation/flying** — Indicate token elevation and flight.
- [ ] 137. **Blinders polish** — Soft edges and reveal animations on blinders/zones.
- [ ] 138. **Auto grid detection** — Detect grid size when importing a map image.

### VTT — encounters, initiative (agenda) & story
- [ ] 139. **Encounter difficulty meter** — Live CR-based difficulty when building `story_encounters`.
- [ ] 140. **Roll initiative for all** — One click populates the `agenda` for every combatant.
- [ ] 141. **Initiative tracker upgrade** — HP bars, conditions, and legendary/lair-action reminders.
- [ ] 142. **Inline stat blocks** — Show monster stat blocks by `source` for `story_encounter_monsters`.
- [ ] 143. **Reorder / delay / ready** — Manipulate turn order in the agenda mid-combat.
- [ ] 144. **Encounter → map placement** — Auto-place encounter monsters as tokens on the active map.
- [ ] 145. **Story timeline** — A `story_events` timeline with reveal-to-players toggles.
- [ ] 146. **Loot from objects** — Turn `story_objects` into droppable map loot using their `located` hints.
- [ ] 147. **NPC quick panel** — Surface `story_npcs` motivation/voice during play.
- [ ] 148. **Round/turn timer** — Round counter with elapsed time and optional auto-advance.
- [ ] 149. **Encounter library** — Save/clone encounters across adventures.
- [ ] 150. **XP/milestone tally** — Per-encounter XP feeding character level-up.
- [ ] 151. **Random encounters** — Region-seeded random encounter roller.
- [ ] 152. **Morale/bloodied prompts** — Threshold prompts as creatures take damage.

### VTT — dice & chat (cauldrond)
- [ ] 153. **Roll breakdowns** — Show per-die results and modifiers in chat, not just totals.
- [ ] 154. **Adv/dis & rerolls** — Advantage/disadvantage and reroll rules (Lucky, GWF) in `roll_dice`.
- [ ] 155. **Inline rollable links** — `[[1d20+5]]` expandable rolls, extending the `[spell]` tag idea.
- [ ] 156. **Whispers / DM channel** — Private and DM-only chat lanes.
- [ ] 157. **Roll history** — Persistent history with re-roll-last.
- [ ] 158. **Saved dice macros** — Per-user macros extending the `custom_dice` table.
- [ ] 159. **Crit/fumble flair** — Sound + animation on nat 20/1.
- [ ] 160. **Rich chat** — Markdown plus spell/item tooltips, extending `[spell]` rendering.
- [ ] 161. **Persistent chat log** — Store chat to the DB per adventure (currently transient in cauldrond).
- [ ] 162. **Typing & presence** — Typing indicators and who's-online in chat.

### VTT — characters & rule systems
- [ ] 163. **Full system parity** — Bring Pathfinder 2e and Cyberpunk Red to dnd5-level mechanical support.
- [ ] 164. **Custom rule-system builder** — Define stats/dice/fields, extending `rule_systems`.
- [ ] 165. **Shared party sheet** — One view of every PC's HP/AC/passives.
- [ ] 166. **Vision presets** — Darkvision/blindsight presets feeding token vision.
- [ ] 167. **Art → token pipeline** — Generate the right token type from character art.
- [ ] 168. **Companion mini-sheets** — Summons/companions linked to a PC.
- [ ] 169. **Inline sheet preview** — Preview `sheet` file/url embeds in place.
- [ ] 170. **Labeled custom fields** — Give `custom0..2` per-system labels.
- [ ] 171. **Bulk party import** — Import a whole party at once.
- [ ] 172. **AI portrait/token** — Integrated portrait + token generation.

### Backend — upgrades (incl. the paused audit's findings)
- [ ] 173. **Auth rate limiting** — Throttle magic-link/sessions/refresh to stop email-bombing and abuse. *(audit finding)*
- [ ] 174. **CORS allowlist** — Replace the wildcard origin with an env-driven allowlist for production. *(audit finding)*
- [ ] 175. **API security headers** — Add nosniff/frame/referrer headers on API responses. *(audit finding)*
- [ ] 176. **Tenant-scoped repo wrapper** — Enforce `tenant_id` on every query as defense-in-depth against IDOR.
- [ ] 177. **Refresh-reuse detection** — Revoke the whole token family if a rotated refresh token is replayed.
- [ ] 178. **Auth/mutation audit log** — Structured, immutable log of auth and campaign changes.
- [ ] 179. **Real email provider** — Replace the dev `LogMailer` with SMTP/SES so magic links actually send.
- [ ] 180. **Readiness + metrics** — Split health/readiness, add dependency timeouts and a metrics endpoint.
- [ ] 181. **Campaign list pagination** — Page/filter the campaigns list (the meta envelope already supports it).
- [ ] 182. **Soft-delete / archive** — Archive flows for campaigns and memberships.
- [ ] 183. **Idempotency middleware** — Enforce `Idempotency-Key` on all mutating endpoints.
- [ ] 184. **Central input validation** — A typed validation layer across all handlers.
- [ ] 185. **Security CI** — Run `govulncheck` + `go vet` + tests on every push.
- [ ] 186. **Safer migrations** — Transaction-wrapped migrations with down-migrations.
- [ ] 187. **Boot-time config validation** — Fail fast on missing/weak secrets.
- [ ] 188. **Realtime gateway** — The WebSocket gateway + Redis fan-out from the plan.

### Flutter app — upgrades
- [ ] 189. **Secure token storage** — Keychain/Keystore on native instead of `shared_preferences`.
- [ ] 190. **go_router + deep links** — Replace the simple home-switch with routed navigation and push deep links.
- [ ] 191. **Auto token refresh** — A Dio interceptor that refreshes on 401 transparently.
- [ ] 192. **Offline + queued actions** — Cache snapshots and queue idempotent actions for flaky networks.
- [ ] 193. **Push notifications** — FCM/APNs "it's your turn" alerts.
- [ ] 194. **Pull-to-refresh & optimistic UI** — On the campaigns list and beyond.
- [ ] 195. **Real magic-link deep link** — Open the app from the emailed link instead of dev auto-consume.
- [ ] 196. **State polish** — Better loading/empty/error states with retry.
- [ ] 197. **Codex theming parity** — Match the landing's fonts/illuminated initial in-app.
- [ ] 198. **Campaign detail screen** — Members, role, and an invite-share sheet.
- [ ] 199. **Accessibility pass** — Semantics, dynamic type, and contrast.
- [ ] 200. **Native build config** — iOS/Android signing and CI builds.

---

## Appendix — Security audit targets (overnight loop)

> Folded in from the former `todo.pm`. Processed top to bottom by the overnight loop;
> one project per line (absolute repo path), lines starting with `#` skipped.
> Scoping decision (recorded by the run): the LIVE production VTT is intentionally
> **excluded** from autonomous fix-and-redeploy — it was hardened separately and a prod
> redeploy is irreversible/unattended-unsafe. Uncomment only to opt prod in.

```
/Users/jbrahy/OtherProjects/Cauldron-VTT/cauldron-companion-backend   # ✅ DONE 2026-06-12 (docs/BUILD_AUDIT_REPORT.md; commit 60330c5)
/Users/jbrahy/OtherProjects/Cauldron-VTT/cauldron_companion_app       # ✅ DONE 2026-06-12 (docs/BUILD_AUDIT_REPORT.md; commit c824cb6)
/Users/jbrahy/OtherProjects/Cauldron-VTT/Cauldron20                   # ✅ DONE 2026-06-12 (docs/BUILD_AUDIT_REPORT.md; commit 5a39a4a)

# EXCLUDED (audit-only, no autonomous redeploy):
# cauldron.extraordinaryscumbags.com  (root@10.30.1.42 — live production VTT)
```
