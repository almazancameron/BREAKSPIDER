# Phase 2 Part 5 — static clutter placement editor

**Implemented and verified by the agent: October 9, 2026. Owner acceptance is pending local and live verification.** Parts 1–4 retain their accepted status. Part 6 remains planned. No commit or deployment was performed.

## Implementation

- [HomeClutterEditor](../../../components/home/home-clutter-editor.tsx) wraps the existing server-composed homepage only inside the development branch in [app/page.tsx](../../../app/page.tsx). It starts inactive. Clicking **Edit clutter** mounts the authoring controls and listeners; **Done** removes them. The tiny existing draft context supplies in-memory records to the unchanged deterministic renderer.
- [Pure authoring functions](../../../lib/home/clutter-authoring.ts) handle nearest-rectangle distance, the five anchor points, offsets, draft cloning, independent override patches/resets, numeric validation, and complete exports. [Focused tests](../../../tests/clutter-authoring.test.ts) cover these rules without a simulated component/geometry suite.
- Selection uses development-only fixed overlay buttons measured from visible `data-clutter-visual` instances. The placement list also selects covered or hidden objects, including the Godot scrap behind Sketchbook and perches behind files. The real production DOM layering and decorative pointer behavior are preserved.
- Native Pointer Events retain the pointer-to-center grab offset, show a fixed preview, and measure eligible anchors afresh during movement/drop. The source draft remains unchanged until drop. Escape, pointer/touch cancellation, lost capture, resize, scrolling, window blur, and unmount release temporary listeners/capture. There is no drag auto-scroll; scroll to the region before dragging.
- Numeric fields support X/Y, width, rotation, scale, local layer, visibility, and flip. Anchor and anchor-point corrections preserve the current visual center. Asset, exclusion padding, deletion, and creation affect a whole record, as the controls explain. IDs remain stable after creation.
- The catalogue selector supports keyboard **Add** and pointer **Drag new asset**. Add places a complete record at the selected anchor's center, defaulting to Spotlight. An added record has a base pose; an override-mode palette drop patches that mode's position. Cancelled palette drags add nothing.
- Export supplies every placement, all untouched fields, and every partial responsive override as four-space TypeScript source. A selectable read-only textarea and explicit **Copy export** button support clipboard denial. Replace only the placement declaration in `content/home-clutter.ts`; retain the catalogue and existing type import. The included import is a reference, not an instruction to duplicate the existing import.

No dependencies, drag library, persistence, filesystem-writing endpoint, randomized clutter, or functional-object dragging were added. The accepted placement source and asset catalogue are unchanged. The functional crystal, Map, file pile, Familiar, portrait, and homepage links remain owned by their existing components.

## Reconciled contract and decisions

The October 9 [handoff](../../superpowers/plans/2026-10-09-phase-2-part-5-handoff.md) and accepted production schema supersede the older tutorial's Desktop/Compact assumptions.

| Mode | Renderer/editor media range | Edited data |
| --- | --- | --- |
| wide | width > 110rem | `wide` partial override |
| desktop | 90rem < width <= 110rem | Base pose |
| narrow | 76.25rem < width <= 90rem | `narrow` partial override |
| tablet | 47.5rem < width <= 76.25rem | `tablet` partial override |
| mobile | width <= 47.5rem | `mobile` partial override |

Every override is cloned when creating a draft. Editing one mode preserves other overrides and untouched records. **Reset [mode] override** deliberately removes the entire current override and restores base inheritance. Base edits naturally affect fields inherited by other modes.

Anchor ties use explicit order: Spotlight, About, Projects, Current, Sketchbook, Familiar, Changelog, Map, Pile. No rail/background anchors were introduced. Nearest-anchor distance uses the section's border rectangle; saved offsets use its padding rectangle because that is the CSS absolute-positioning containing block. This avoids border-sized shifts after drop or manual correction.

An existing `edgeOffset` replaces ordinary X with gutter minus offset. Dragging, reanchoring, disabling edge positioning, or explicitly committing X writes `edgeOffset: null` in the edited pose. Untouched records retain their edge positioning. Explicitly committing the same stored X still clears an active edge offset; merely focusing and leaving the field does not. The editor explains the distinction and provides an edge-offset control.

Editing limits are width 8–2048px, scale 0.25–8, rotation −180–180°, integer local layer 0–9, and exclusion padding 0–512px. Offsets and edge offsets accept signed finite numbers. Blank/nonfinite/out-of-range edits revert to the previous value. Loading, selection, and export never clamp saved values, including values beyond the editing limits. Changed X/Y offsets round to one decimal; untouched numbers retain their precision. Fields apply on Enter or blur, and Escape abandons a numeric edit.

The active wrapper exposes `data-home-clutter-editing="true"` as the future random-layer suspension hook. No Part 6 consumer exists yet. Done keeps the draft visible in memory; reload discards it unless the owner has pasted the export into source. Neither operation claims to save repository data.

## Verification

Final `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build` passed: **35 tests across seven files**, including seven authoring tests and the four existing pose-resolution tests. The authoring test file initially failed because its implementation module did not exist; the implemented geometry/data rules then passed.

Development browser verification used the existing local server and Chrome DevTools Protocol because the Browser plugin and Playwright were unavailable. Temporary harnesses and evidence are outside the repository at `%TEMP%/breakspider-part5-checks/`.

- `dev-checks.json`: 38 checks, including unchanged initial export, off-center and rotated/scaled/flipped drags, unchanged source during preview, drop center accuracy, Map/manual reanchoring, edge-offset clearing, numeric limits, hidden/covered selection, padding, Add/delete, palette drop/cancel, complete exports, clipboard fallback, override reset, inactive/Done cleanup, and inspection regression checks.
- Five-mode boundaries were inspected at 1920, 1761, 1760, 1441, 1440, 1221, 1220, 761, 760, 390, and 320px. Visible renderer instances matched the editor mode at every boundary; no duplicate responsive instances or added horizontal overflow were observed.
- A mobile edit retained the base pose and every other record. The full exported declaration was temporarily pasted into the content file, reloaded inactive, and checked at desktop/mobile. Both geometry and complete responsive data round-tripped. The original source was restored afterward.
- Independent review caught the explicit unchanged-X/edge-offset case. A real keyboard regression check failed first, then passed after the fix; untouched X blur also retained the original edge offset. Review otherwise found no correctness blocker. The redundant proposed Map positioning rule was removed because the existing CSS already supplies it.
- `additional-checks.json`: real keyboard Enter activation, keyboard Add, numeric Enter commit, unmount during an active drag, native mobile touch drag/drop, touch cancellation, and listener cleanup passed. Console warnings/errors and runtime exceptions were absent in the final development pass.
- `editor-1600.png` and `editor-390.png` document the active controls. The panel can collapse to free the working viewport and scrolls internally on mobile.

Production verification used a separately started `next start` server at port 3017 and a separate Chrome profile. `production/browser-checks.json` and captures cover 1920, 1600, 1440, 1221, 1024, 768, 390, and 320px. At every width, the editor toggle, controls, handles, preview, editing marker, and authoring listeners were absent; saved decoration remained pointer-inert and unfocusable. Visible clutter counts remained 19 desktop, 17 tablet, and 12 mobile. No broken images, duplicate responsive instances, extra page overflow, or masks appeared. Terra Blade remained fully visible. All three animated assets selected their stills under reduced motion.

Artifact inspection/Escape, Familiar cycling, reversible crystal glow, file focus shuffle, Sketchbook scrolling, and Familiar stability while updates expand passed in production. Console warnings/errors and runtime exceptions were absent. Scanning `.next/static`, the generated homepage HTML, and its server module found none of the editor control strings, editor module name, or authoring module name. The editor is excluded from the production client build rather than merely hidden.

Every test browser and the temporary production/failed dev server process trees were stopped by the harness cleanup. The dev server that was already running on port 3000 was reused and left untouched. No test process was left running. Testing was Chromium-based; owner local/live acceptance and other browser engines remain pending.

## Owner checkpoint

- [ ] Verify the development editor locally, paste a reviewed export if desired, and confirm responsive fidelity.
- [ ] Verify the deployed production homepage preserves the accepted composition and has no editor.
- [ ] Accept Part 5. Part 6 remains unstarted.
