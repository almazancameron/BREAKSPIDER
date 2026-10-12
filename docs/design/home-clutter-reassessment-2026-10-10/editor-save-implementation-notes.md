# Development clutter editor saving — October 10, 2026

**Complete and owner-accepted as part of Phase 2 (October 10, 2026).** The owner confirmed completion after the authored reassessment and direct-save editor follow-up. No new commit or deployment; the authored composition and asset bytes are unchanged.

**Done saves all records and every responsive override directly into `content/home-clutter.ts`, then closes only after success.** Manual paste is no longer required. Copy export remains an optional backup. Changes are drafts until Done; reloading beforehand discards them.

Opening the editor explicitly requests the current file snapshot and SHA-256 revision from `GET /api/dev/clutter`. It does not rely on an older imported snapshot. Reset entire draft returns to this opening snapshot. Done posts the complete draft and revision. Editing controls and drag handles are disabled during the save. A failed request keeps the editor and draft open with an explanation. If the file changed externally, copy the export and reload before retrying; the editor will not overwrite those changes.

The Node route checks development mode before loading filesystem authoring code. Both GET and POST return 404 in production. Writes require a same-origin JSON request and always target the fixed repository file; the browser cannot supply a path. Server validation checks unique IDs, existing catalogue assets, anchors, pose fields, finite numbers, authoring ranges, and independent overrides. It accepts empty compositions and existing compatibility metadata.

The save helper locates the `HOME_AUTHORED_PLACEMENTS` array with the TypeScript parser, replaces only the array literal with four-space JSON, preserves the file's newline convention and all surrounding source, and writes via a temporary sibling file plus rename. A serialized save queue and revision checks reject stale writes, including competing editor saves. No source text is evaluated. The current editor-exported JSON literal format is required; expressions or comments inside the array must be converted with Copy export before automatic loading works.

This endpoint is local development authoring infrastructure. It adds no production editor, listeners, asset downloads, or active file-writing endpoint. Familiar randomness and all existing site interactions remain unchanged.

## Verification

- `npm test`: **51 tests / 10 files passed**. Five new persistence tests cover complete records/overrides, preserving surrounding source, external edits, competing saves, and input validation.
- `npm run lint`, `npm run typecheck`, and `npm run build`: passed. The production build retains static homepage rendering; the authoring endpoint is guarded and returns 404.
- [Development regression evidence](editor-save-checks/development-checks.json): **57 checks passed**, across nine widths from 320 to 1920px. Preserved dragging, asset additions/swaps, independent responsive edits, complete export, real file writes, reload persistence, unchanged saves, external-file conflicts, failed requests, listener cleanup, and existing interactions.
- [Production evidence](editor-save-checks/production-checks.json): **39 checks passed**, including GET/POST 404, no editor UI or authoring listeners, no unplaced palette downloads, nine responsive widths, and existing interactions. Production client chunks contain no editor/save code or endpoint reference.
- [Final focused evidence](editor-save-checks/final-focused-checks.json): **45 checks passed** after moving status feedback next to Done. Native clicking Done commits a focused numeric input, a held save disables controls and drag handles, failures keep the draft open, the error is visible without scrolling, and a real save survives reload. [Deliberately injected error screenshot](editor-save-checks/editor-save-error.png) shows the retained trial draft; it is not the authored homepage composition.
- Independent focused code review identified the pending-save drag race. Disabling handles and guarding drag start resolved it; follow-up review found no remaining material concerns.
- One browser-harness assertion used an ellipsis damaged by shell encoding; it was corrected to match the ASCII label prefix. A broad mock also intercepted Next.js internal POSTs; limiting the mock to the save endpoint resolved the test interference. Neither required a product workaround.

Browser trials intentionally edit and save a temporary 20-record draft, then restore the original repository file byte-for-byte. Testing servers and Chrome processes are stopped after each run. The owner subsequently accepted Phase 2 on October 10, 2026; this records acceptance, not a new deployment or test run.
