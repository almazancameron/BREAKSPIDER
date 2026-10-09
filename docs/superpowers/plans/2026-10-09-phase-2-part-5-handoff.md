# Phase 2 Part 5 — New-session handoff

**Recorded:** October 9, 2026. Phase 1 and Phase 2 Parts 1–4 are complete and accepted. The owner verified Part 4 locally and on the live deployment. Part 5 (development-only placement editor) and Part 6 (randomized clutter) remain planned.

This handoff supplies implementation context; it does not authorize starting implementation. Follow the owner's new-session instruction for scope.

## Read first

1. Repository `AGENTS.md` and the relevant installed Next.js documentation before writing code. Use four-space indentation throughout.
2. [Part 5 tutorial](2026-10-06-phase-2-placement-editor.md) for the editor's intended workflow and browser checkpoints.
3. [Part 4 implementation notes](../../design/home-clutter-2026-10-09/revision-02/implementation-notes.md) for the accepted runtime contract, layering, responsive decisions, and screenshots.
4. [Clutter positioning](../../CLUTTER_POSITIONING.md), the repository's Breakspider design skill, and [Phase 2 reading guide](2026-10-06-phase-2-homepage.md).
5. Inspect the actual files below. Earlier tutorials contain historical assumptions; accepted production code and the implementation notes describe the current baseline.

## Existing implementation to extend

| File | Current responsibility |
| --- | --- |
| `content/home-clutter.ts` | Asset catalogue and 19 approved authored placement records. Preserve the catalogue when exporting the placement declaration. |
| `lib/home/clutter-types.ts` | Actual anchor, viewport, asset, pose, and override types. |
| `lib/home/clutter-placement.ts` | Independent partial-override resolution through `resolveClutterPose`. |
| `components/home/home-clutter-state.tsx` | Tiny optional `ClutterDraftContext`; no editor provider exists yet. |
| `components/home/home-authored-clutter.tsx` and `.module.css` | Deterministic renderer, CSS-selected breakpoint instances, decorative images, reduced-motion stills. |
| `app/page.tsx` and `.module.css` | Semantic anchors, protected content markers, existing composition and stacking. |
| `tests/clutter-placement.test.ts` | Focused override-resolution tests; keep them passing. |

Each decoration exposes `data-clutter-placement`, `data-clutter-viewport`, and exclusion padding. Its transformed inner visual exposes `data-clutter-visual`. Multiple breakpoint instances exist in the DOM; select and measure only the visible instance. Decorations currently have no pointer events and are hidden from accessibility APIs. Add usable editor selection controls without making the production decoration interactive.

## Reconcile the tutorial with the accepted implementation

- **Five responsive modes, not Desktop/Compact:** `wide` above 110rem; `desktop` above 90rem through 110rem; `narrow` above 76.25rem through 90rem; `tablet` above 47.5rem through 76.25rem; `mobile` at or below 47.5rem. Match the renderer's exact boundaries. Desktop edits change the base pose; other modes patch only their corresponding partial override. Preserve every untouched override and record. Clone all override objects when constructing drafts, not just `mobile`.
- **Nine actual anchors:** `spotlight`, `about`, `projects`, `current`, `sketchbook`, `familiar`, `changelog`, `map`, `pile`. The tutorial's rail/lower-field names are historical proposals, not implemented anchors. Use these nine with an explicit stable tie order, including Map; no new background anchors are needed for Part 5.
- **Edge positioning:** Some poses use `edgeOffset`, which replaces the ordinary x offset with `calc(var(--home-gutter) - edgeOffset)`. Preserve it in exports. A normal drag or manual reanchor must clear it with `edgeOffset: null` in the edited pose so the saved x takes effect; deleting an override property would expose an inherited base value again. Explain this behavior in the editor. Do not erase edge positioning from untouched records.
- **Additional pose fields:** Preserve and support `flip`, visibility, layer, scale, and exclusion padding alongside the tutorial's basic geometry controls. An override-reset action should remove that mode's override deliberately, restoring base inheritance.
- **Input limits:** Review the tutorial's proposed 8–256px width cap against existing approved records and the owner's permission to upscale assets. Loading, selecting, or exporting must never silently clamp accepted values. Use sensible validated editing limits without shrinking the saved composition.
- **Real overlapping surfaces:** Sketchbook's outer wrapper owns the Godot scrap; its inner frame sits at local layer 2 over the layer-1 scrap. Files similarly cover their decorative perches. Preserve these DOM relationships. Screenshot-preview masks were an offline-comp workaround and must not become production clipping or masking.

## Scope and settled preferences

The editor authors static decorative objects only. Do not turn the crystal, Map, file pile, random Familiar, portrait link, or other functional homepage objects into draggable clutter. The owner accepted that separation despite wanting more interactibles eventually.

Drafts live in memory. Export the complete placement declaration with four-space indentation, selectable text, and a Copy fallback; the owner pastes it into the existing content file. No filesystem-writing endpoint, persistence, new dependencies, or drag library. The wrapper starts inactive, mounts only in development, and enables authoring listeners only while editing. Production must keep the deterministic saved renderer without editor controls or listeners.

Do not implement Part 6 in this session unless separately requested. Noise, badges, and other supplemental assets are candidates for that later randomized layer, which should form around the accepted authored composition. No randomized system exists yet. Keep `data-home-clutter-editing` as the planned suspension hook for that future layer.

Preserve Phase 1 splash, header, animated logo, visitor/profile state, replay, and audio. Keep the accepted homepage content, framing, order, and clutter composition. Copy placeholders are not blockers. Do not undo user changes or assume a clean working tree: inspect Git status first. The Part 4 acceptance documentation may still be uncommitted.

## Verification and working habits

Use focused tests for nearest-rectangle/anchor-point math, offset round trips, and any meaningful override/export logic. Browser verification is primary for off-center grabs, transformed objects, overlap selection, cancel cleanup, keyboard controls, responsive editing, and export/paste/reload fidelity. Inspect a production build to establish editor absence. Avoid broad component snapshots or simulated geometry suites.

Part 4 passed build, lint, typecheck, and 28 tests across six files. Browser evidence and accepted screenshots are under `docs/design/home-clutter-2026-10-09/revision-02/implementation-checks/`. Check the fresh workspace rather than treating those historical results as verification of new changes.

The owner explicitly requires all processes started for testing to be stopped afterward. Do not leave a dev server running for them. No agent commit or deployment is implied by an implementation request.

## Suggested new-session prompt

> Implement Phase 2 Part 5, the dev-only static clutter placement editor. Start with `docs/superpowers/plans/2026-10-09-phase-2-part-5-handoff.md`, then read the linked tutorial and current code. Parts 1–4 are accepted; preserve their appearance and behavior. Reconcile the tutorial with the actual five-mode placement schema as the handoff explains. Implement and verify only Part 5, use browser checks and focused logic tests, and stop every testing process when finished. Ask about meaningful unresolved decisions while continuing independent work.
