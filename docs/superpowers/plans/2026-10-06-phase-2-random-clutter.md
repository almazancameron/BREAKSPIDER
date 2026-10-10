# Phase 2 Supplemental Random Clutter and Acceptance Implementation Plan

**Historical tutorial, superseded October 10, 2026.** Current owner direction selects fully authored decoration and removes the procedural runtime. The folder collection is now an editor palette, with no automatic placement. See [the current implementation and asset-curation report](../../design/home-clutter-reassessment-2026-10-10/implementation-notes.md). This tutorial no longer describes active code or requirements.

> **For agentic workers:** Use `superpowers:executing-plans` if later requested. The owner intends manual implementation; no implementation or delegation is requested now.

**Goal:** Add dense, varied collage pockets that vary with a new document, stay stable in the loaded SPA, and preserve readable content, controls, media, and authored objects.

**Implementation status (2026-10-09):** Revised after the owner rejected the first pass as too sparse. The current library contains 16 Noise designs, 16 badges, and 103 miscellaneous cutouts across nine pockets. Stratified centers and small upper-margin pieces spread the collage through the page; reduced footer allocation and shorter desktop/tablet trailing spacing address the later bottom-heavy composition feedback. Visible text, controls, media, focus perimeters, scrollbars, and authored visuals are protected; empty section interiors and edges remain eligible. Random pieces can overlap up to 65% of the smaller bounding box, with at most two visible copies of an asset. This supersedes the conservative starter density, whole-section exclusions, and blanket random-to-random rejection below. See [implementation and verification notes](../../design/home-clutter-2026-10-09/part-6-implementation-notes.md). Owner local/live review and final Phase 2 acceptance remain pending. The authored five-mode schema is unchanged; random choices use a desktop/tablet sequence and an explicit reduced mobile sequence, measured against the active authored mode.

**Architecture:** Seeded pure functions choose symbolic candidates once per document/configuration. A homepage client layer measures named pockets and actual visible content, then admits candidates into the remaining space. It renders decorative collage independently of structural sections and the dev editor.

**Collection authoring update (2026-10-10):** The hand-maintained asset array is replaced by a generated catalogue. Add/remove/replace static images in `public/media/home/random-clutter/{noise,badges,sprites,pixel-sprites}/`, then run `npm run clutter:generate`; it also runs before dev/build. Folder defaults and optional exceptions live in `content/home-random-clutter.settings.json`. Dimensions are detected automatically. Pocket/density settings remain in `content/home-random-clutter.ts`. See [the collection guide](../../../public/media/home/random-clutter/README.md) for supported formats, filenames, overrides, and check mode. The original types/tutorial below describe runtime contracts, not a requirement to maintain asset records manually. The migration preserved all 135 image bytes and metadata settings; 56 tests, normal checks, and eight-width production browser verification passed. Owner acceptance remains pending.

**Tech Stack:** Existing TypeScript/React, native `ResizeObserver`, CSS Modules, small Vitest logic tests, and build-time Sharp metadata reading. No physics/collision library, canvas renderer, or storage.

**Spec:** [Phase 2 roadmap](../../breakspider_master_implementation_roadmap_v2.md#8-phase-2--homepage-production-implementation), [reading guide](2026-10-06-phase-2-homepage.md), and [authored placement contract](2026-10-06-phase-2-authored-clutter.md).

**Global constraints:** Four spaces. “clutter differs after hard refresh”; “clutter remains stable during the loaded session”; “no random artifact obscures essential content”. Fixed composition wins, safety wins over target density, and mobile uses fewer objects. Preserve every Phase 1 behavior.

**Review focus:** Seed lifetime, hydration, rotated collision bounds, insufficient safe space, and media/responsive measurements have focused tests and browser checks below.

## Learn first: randomness chooses decoration, not layout

This layer supplements a finished authored composition. A seed is a number from which the same pseudo-random choices can be reproduced. Chunk 2 already stores one browser-memory seed per loaded document. Read it after hydration; don't put it in storage, React render, server module state, or a page-mount initializer.

Separate **choices** (asset, normalized position, size, rotation) from **geometry** (where the safe zone currently lies). Resize can move a zone with its anchor, but it does not choose another asset or reroll the cluster. Changes to exclusions can hide unsafe decoration. They must never move essential content to make room.

Named safe zones are approved pockets, not a uniform scatter field. Left/right rails, below-Spotlight gaps, Familiar periphery, lower field, and footer-adjacent pockets are candidates. Begin with a few zones and deliberate unused gaps; the roadmap's suggested names are not a requirement to populate all eight.

Finish chunks 1–5 and save authored placement data. Read the installed client-boundary/image guides, seed module, and fixed exclusion markers before editing.

| File | Responsibility |
| --- | --- |
| `lib/home/random-clutter.ts` | Typed zone/candidate/rectangle definitions; pure seeded selection and collision filtering. |
| `content/home-random-clutter.ts` | Pocket configurations, compact overrides, and the generated asset import. |
| `content/home-random-clutter.generated.ts` | Generated typed assets; do not edit manually. |
| `content/home-random-clutter.settings.json` | Folder defaults and optional asset settings. |
| `scripts/generate-random-clutter.mjs` | Scan the deployable collection and derive dimensions/catalogue. |
| `lib/home/random-clutter-dom.ts` | Visible text, control, media, focus, scrollbar, and authored exclusion measurement. |
| `components/home/home-random-clutter.tsx` / `.module.css` | Hydration-safe measurement and decorative overlay. |
| `tests/random-clutter.test.ts` | Seed, bounds, collision, count, and stable-candidate logic. |
| `app/page.tsx` / `app/page.module.css` | Add named zones and mount layer within the homepage canvas. |

**Consumes:** `getHomeSessionSeed`, `createSeededRandom`, `HOME_CLUTTER_ASSETS`, fixed placements/exclusion markers, and page-owned safe-zone wrappers.

**Produces:** `generateClutterCandidates(seed, zones)`, `placeClutterCandidates(candidates, measuredZones, exclusions, assets)`, and `HomeRandomClutter`. No production dependency on authoring geometry or editor code.

## Task 1: Define small zones and collision contracts

- [ ] **Step 1 — FIRST EDIT: Define types in `lib/home/random-clutter.ts` and curated zones in `content/home-random-clutter.ts`.**

**Interface only — core data shapes, not generation implementations:**

```ts
export type Rect = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export type RandomZone = {
    id: string;
    seedOffset: number;
    assetIds: string[];
    minCount: number;
    maxCount: number;
    minWidth: number;
    maxWidth: number;
    minRotation: number;
    maxRotation: number;
    zIndex: number;
    edgeClipping: boolean;
    mobile?: {
        enabled: boolean;
        minCount: number;
        maxCount: number;
        minWidth: number;
        maxWidth: number;
    };
};

export type ClutterCandidate = {
    id: string;
    zoneId: string;
    assetId: string;
    x: number;
    y: number;
    width: number;
    rotation: number;
    zIndex: number;
    edgeClipping: boolean;
};

export type MeasuredZone = {
    id: string;
    bounds: Rect;
};

export type PlacedClutter = ClutterCandidate & {
    centerX: number;
    centerY: number;
    height: number;
    bounds: Rect;
};
```

Candidate `x/y` are normalized fractions of zone width/height; width is pixels. No runtime anchor selection. `seedOffset` is a fixed unique small integer per zone; combine with the document seed using unsigned XOR, so changing one zone does not advance another zone's generator.

Begin with zones `leftRail`, `rightRail`, `aboutPeriphery`, `familiarPeriphery`, `lowerField`, and `footerEdge` only where browser-reviewed empty space exists. Provide `data-home-random-zone` wrappers for them; wrappers' positioning/bounds stay in the page CSS. They can be empty/invisible structural regions behind the content. Do not confuse these regions with eligible decorative anchors: they describe random safe space, not where functional content goes.

Initial tuning values: desktop target 1–3 supplemental pieces per zone, widths 24–48px, rotations −12° to 12°, local layer 1. Set compact disabled for interior zones, rail zones 0–1 with widths 14–22px. These are conservative implementation starting values, not a newly approved asset roster or final density target. Use a small subset of chunk 4's curated catalogue for each pool, with varied silhouettes. Every pool must resolve to real asset IDs. No new production asset is required merely to support randomness.

## Task 2: Write meaningful pure-logic tests, then generation

- [ ] **Step 1: Add focused tests in `tests/random-clutter.test.ts`.**

Use synthetic rectangles/assets, not DOM/component mocks. Implement these named cases:

| Test | Exact invariant |
| --- | --- |
| Same seed and config | `generateClutterCandidates(123, zones)` deeply equals another call with 123. All fractions are in `[0, 1]`; widths/rotations obey configured ranges. |
| Different fixed seeds | Fixtures using seeds 123 and 456 produce different candidate arrays. A refresh may still repeat individual assets, so do not assert every object must differ. |
| Zone independence | Adding a second zone leaves the first zone's candidate records unchanged. |
| Browser seed guard/lifetime | Two browser calls return the same seed; server call throws. Use a minimal fake `window.crypto.getRandomValues`, reset modules before importing the seed utility for each fixture, and restore globals after the test. No React/DOM harness. |
| Exact collision boundary | Two rectangles touching an edge are non-overlapping; a one-pixel intersection is overlapping. Exclusion padding makes near misses forbidden. |
| Rotated asset | A 40×20 candidate rotated 90° has a 20×40 conservative bound and is rejected when that bound hits a protected rectangle. Also cover 45°. |
| Occupied/empty zone | Full-zone exclusion produces no admitted objects; empty pool and absent/zero-sized measured zone produce none without error. |
| Stable candidates on resize | Changing zone rectangles preserves candidate IDs/assets/fractions; only absolute positions/safety change. |
| Compact density | Disabled zone generates none; enabled compact count/size obey compact bounds. |
| Edge safety | Non-edge zones reject out-of-bounds rotated items; edge zones permit at most one-quarter clipping per axis, never complete disappearance. |

**Complete implementation — rectangle overlap predicate, one pure function:**

```ts
export const rectanglesOverlap = (left: Rect, right: Rect): boolean => {
    return left.left < right.left + right.width
        && left.left + left.width > right.left
        && left.top < right.top + right.height
        && left.top + left.height > right.top;
};
```

- [ ] **Step 2: Implement `generateClutterCandidates(seed: number, zones: RandomZone[]): ClutterCandidate[]`.**

For each valid zone, create its own seeded generator. Choose a target integer between min/max inclusive; empty pool or maxCount zero gives no candidates. Choose one cluster center in normalized `[0.25, 0.75]` for each axis. For each target item, add a small offset using the sum of two random numbers minus one (more values near the center), scaled by 0.3, then clamp to `[0, 1]`. Sample asset/width/rotation from that zone's ranges. Use ID `${zone.id}-${index}`. Keep the selection count bounded by maxCount; no retry loop or infinite search for space.

This produces small pockets rather than evenly filled fields. Deliberate gaps come primarily from named zone placement and sparse authored pools. If you want another cluster, author another narrow zone rather than building a distribution framework.

- [ ] **Step 3: Implement `placeClutterCandidates(candidates, measuredZones, exclusions, assets): PlacedClutter[]`.**

Take readonly arrays plus the typed catalogue. Convert each fraction to a center in its measured zone; derive height from the asset's true aspect ratio. For angle θ, conservative rotated width is `abs(w cos θ) + abs(h sin θ)`; height is `abs(w sin θ) + abs(h cos θ)`. Build a center-based axis-aligned rectangle and reject any overlap with padded fixed exclusions.

Use this exact interface: `placeClutterCandidates(candidates: readonly ClutterCandidate[], measuredZones: readonly MeasuredZone[], exclusions: readonly Rect[], assets: readonly ClutterAsset[]): PlacedClutter[]`, importing `ClutterAsset` from `./clutter-types`. Angles convert degrees to radians. Use approximate numeric assertions for rotated floating-point dimensions. The browser caller supplies already-padded exclusions; do not pad them twice.

Reject out-of-zone bounds unless `edgeClipping` permits a small partial crop: at least 75% of the rotated bound's width and height must remain within that zone. Never permit arbitrary clipping merely because something is decorative. Avoid random-to-random overlap in this first implementation by checking previously admitted bounds; authored decoration already supplies selective layering. Omit unsafe candidates rather than resampling or relocating them. Configured minCount is a desired count, never permission to violate safety.

If an item becomes unsafe after resize/content change, omit it. Do not choose a new item to fill that gap. This preserves the session's symbolic composition even when geometry changes. Fixed content and authored objects always win.

- [ ] **Step 4: Run `npm run test -- tests/random-clutter.test.ts`.**

Resolve failures before connecting browser measurement. Keep these pure tests small; no broad page snapshots.

**Learning checkpoint:** Explain how two different window sizes can share a seed and candidate identity while producing different safe absolute coordinates.

## Task 3: Measure and render after hydration

- [ ] **Step 1: Implement the client layer with empty initial output.**

`HomeRandomClutter` gets a ref to its own overlay and finds its closest `[data-home-canvas]`. On the server and first client render it outputs an empty noninteractive layer. In an effect, read the document seed and generate desktop and compact candidate lists from their effective zone configurations. Cache choices in module memory keyed by seed plus authored configuration if needed; simply regenerating a pure list with the same inputs also gives the same choices. Never call `Math.random()` in JSX, render, or import scope.

Measure only inside this homepage canvas. Convert client rectangles to canvas-local coordinates by subtracting the canvas rectangle's left/top. Measure zone wrappers, `[data-home-exclusion]`, and **visible transformed visual wrappers** inside `[data-clutter-placement]`. Use actual visual bounds, not only the unscaled outer box, and add each placement's recorded exclusionPadding. Include crystal, portrait, all file controls, Replay intro, and project media. Filter hidden/zero-sized nodes. Expand structural exclusions by 12px to protect focus outlines/readability.

Section-sized exclusions may leave a zone empty; that is acceptable. Header/footer/splash live outside the canvas; clip the random overlay itself to canvas bounds and keep its local layers behind content. Do not add global decorations above the accepted header.

- [ ] **Step 2: Update geometry deliberately, without rerolling.**

Schedule measurements with one `requestAnimationFrame` at a time. Observe the canvas, eligible anchors, zone wrappers, and protected blocks with `ResizeObserver`. Handle image load inside the canvas and `document.fonts.ready` for late dimensions. Subscribe to compact breakpoint changes with `matchMedia`. Clean up observers/listeners/animation frames when the homepage unmounts; observe no random objects, to avoid render/measure loops.

The candidate list stays fixed. Re-measure only geometry, switching to the saved compact candidate list when the breakpoint changes. Clicking Familiar, toggling sound, opening/closing inspection, and route tracking must not trigger random selection. A geometry-changing disclosure may hide unsafe items or move them with their zone; it must not reroll assets. When the dev editor is active, suspend the random layer so authored positions can be judged without random interference; resume from the same candidates after editing stops. In development, find the editor wrapper's `data-home-clutter-editing` flag and observe only that attribute with `MutationObserver`; production has no editor wrapper or mutation observer. Do not import editor code into the random layer. Clean up this observer with the other subscriptions.

- [ ] **Step 3: Render admitted objects in an absolute, pointer-inert overlay.**

Use fixed dimensions, center coordinates, rotation, local layer, empty alt text, and the same pixel/static-image treatment as the catalogue. Keep `aria-hidden="true"`, no buttons/tooltips/tab stops. Overlay `overflow: clip` prevents decorative edge overflow; content/focus stays outside that clipped layer. Do not resize the canvas based on admitted objects, or the geometry can feed back into itself.

**Worked fragment — overlay safety rules only:**

```css
.layer {
    position: absolute;
    inset: 0;
    overflow: clip;
    pointer-events: none;
}

.object {
    position: absolute;
    transform-origin: center;
    pointer-events: none;
}
```

Keep `data-random-clutter-id`, asset ID, and seed on dev-inspectable nodes for verification. Debug rectangles are an optional development aid, never a permanent user-facing feature.

## Task 4: Browser checkpoint — verify random behavior

- [ ] **Step 1: Compare fixed and random layers separately.**

At 1440/1920, inspect with random layer temporarily hidden, then enabled. Authored hierarchy/clusters remain dominant; random pieces enrich existing pockets, not every blank pixel. Review several hard refreshes for collisions, not just one pleasing arrangement. A different seed need not guarantee every visible object differs, especially in small pools.

- [ ] **Step 2: Confirm document lifetime.**

Record dev seed and candidate IDs/asset IDs. Open/close dialogs, cycle Familiar, shuffle files, toggle sound, navigate to Projects and back via `Link`, then use browser Back/Forward. With unchanged geometry the same random objects remain in the same positions. A hard refresh creates a new seed/candidate arrangement. Visiting an interior route first and then Home also initializes the seed once in that document.

- [ ] **Step 3: Confirm safety under changing geometry.**

Resize through 1920/1440/1220/1024/768/760/390/320, expand changelog, try longer identity copy and 200% zoom, and simulate slow image loads. No candidate crosses measured content/authored exclusions. Narrow layouts can omit all unsafe random objects. Compare compact density/retained personality with the mobile references; it must not be a shrunken desktop scatter.

- [ ] **Step 4: Check hydration and fallback.**

No hydration warnings or early sprite flashes. If measurements are unavailable, render no random objects and retain the usable authored homepage. Route unmount/remount leaves no observer/listener errors or duplicates. Reduced motion uses still assets and removes nonessential motion.

## Task 5: Final Phase 2 acceptance

- [ ] **Step 1: Run normal project checks after final edits.**

Run commands separately from the repository root:

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

Expected: successful exits, existing Phase 1 logic tests still passing, focused geometry/random tests passing. Do not broaden test infrastructure after these pass without a new unresolved concern.

- [ ] **Step 2: Inspect the production build.**

Run `npm run start` with the dev server stopped or on a separate port. Check viewport and full-page screenshots at 1440×900, 1920×1080, 1024×900, 768×900, 390×844, and 320×740. Compare to Prototype 04; record intentional Viscap pending media, draft identity, and production header size. Reject a uniform card grid, centered editorial layout, symmetrical scatter, or decoration-only personality.

Professional paths are obvious, native project media recognizable, optional interaction targets reachable, no horizontal page overflow, no focus clipping. The mobile sequence is exactly the reading guide's sequence. Verify the placement editor is absent and saved authored placements work independently.

- [ ] **Step 3: Run the accepted Phase 1 regression matrix.**

| Scenario | Expected |
| --- | --- |
| Fresh browser state enters `/` | Accepted splash, always-reachable skip/entry; homepage cannot interfere. |
| Fresh direct interior visit | No splash blockade or redirect. |
| Return visitor to `/` | Intro skipped automatically. |
| Replay intro near homepage end | Accepted replay behavior, focus/exit path, then intact homepage. |
| Desktop/mobile header | Existing Home/Projects/About, visitor profile, sound control, accepted size and layout. |
| Logo hover/focus/press | Accepted independent animation and immediate Home navigation; reduced motion preserved. |
| Sound initially/persisted | Default muted; explicit enabling works; reload with sound on is silent until interaction. |
| Mute during pending/active click | Accepted cancellation; no delayed playback or duplicate event sounds. |
| Visitor profile then artifact dialog | Correct native focus behavior and return for each, no duplicate IDs or stale inert content. |

No homepage effect resets intro/visitor state, constructs audio, reruns the splash, or changes the shell's existing persistence keys.

- [ ] **Step 4: Record acceptance in the reading guide.**

Check its completion record only after actual verification. Include the browser sizes, commands that passed, and any intentional remaining content follow-ups. No deployment or production publication is required merely to finish this tutorial; use the existing deployment workflow when the owner chooses to ship.

**Learning checkpoint:** Explain why seed stability, safe geometry, and visual density need different kinds of evidence: pure tests, browser behavior, and reference comparison.

**Finish:** Commit the completed Phase 2 homepage once accepted. Subsequent roadmap phases implement deeper pages and visitor progression; they do not require rewriting this page into a universal system.
