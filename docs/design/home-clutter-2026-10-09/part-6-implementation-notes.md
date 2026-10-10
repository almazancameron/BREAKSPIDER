# Phase 2 Part 6 — supplemental randomized clutter

**Superseded October 10, 2026.** The current implementation is fully authored, with the folder library retained for manual editor selection. See [the current reassessment and verification](../home-clutter-reassessment-2026-10-10/implementation-notes.md). Earlier scatter/cluster material below is historical, not active configuration. Owner acceptance of the reassessment remains pending.

Implemented and composition-verified on October 9, 2026; folder-based collection authoring added and verified on October 10. **Owner acceptance remains pending**, including local and live review. Parts 1–5 remain accepted. No commit or deployment was performed.

## Current composition overhaul — October 10

The authored cluster model in [the current implementation guide](../home-collage-2026-10-10/implementation-notes.md) supersedes the scatter regions, candidate generation, budgets, distribution rules and pairwise admission described below. Existing authored keepsakes are the dominant objects; seven typed compositions supply folder-driven companions. The collection generator and dev-only static placement editor remain in use. Owner acceptance remains pending.

## Previous scatter implementation — historical record

## Composition and scope

The owner rejected the first pass as too sparse in both variety and density. The current direction is maximum coverage through dense mixed collage pockets, using [profile-collage.png](../../inspo_screenshots/foundational-gaia/profile-collage.png) as the foundational reference. Empty section edges and interiors are eligible; readable text, controls, media, and authored objects remain clear. The original fourteen-asset, six-small-pocket implementation is superseded by this revision.

Nine zero-flow regions describe possible pockets: left/right rails, the upper field beside Spotlight, About periphery, Familiar periphery, Changelog periphery, the lower field beside Map, footer edge, and below Spotlight. Rails and selected peripheries distribute cluster centers across vertical bands; the upper field, Spotlight seam, and footer use horizontal bands. Small pieces fit upper margins, while broader pockets retain medium cutouts and larger accents. Tablet retains interior pockets. Mobile has separate smaller sizes and budgets, including the gaps between content sections; the extra upper-field and Changelog regions are disabled there. Counts are candidate budgets rather than guaranteed visible counts; candidates that cannot fit are omitted without retries or replacement.

The [generated random catalogue](../../../content/home-random-clutter.generated.ts) currently contains **135 static PNGs** curated from the source `assets/` library:

- **16 Noise designs:** three blue, four lavender, four orange, four red, and the unique green design. They render as their original transparent cutouts, with no added background, border, padding, or container shadow.
- **16 Pokémon badges:** a selection across the supplied sheet, rendered small and with pixel filtering.
- **103 miscellaneous cutouts:** characters, props, pins, game pickups, creatures, and six Omega-Xis poses. Per-asset size ranges and pixel-art flags preserve different scales and rendering styles.

Deployed copies live in `public/media/home/random-clutter/`. The preceding cleanup of unused `public/media/home/clutter/` files remains intact; source files in `assets/` were preserved. No generated artwork or animated random asset was added. Collection membership is now authored through image folders; pocket settings remain separate.

## Folder-based collection authoring — October 10

The owner requested a collection that can be changed by adding/removing files instead of maintaining a large TypeScript array. [The collection README](../../../public/media/home/random-clutter/README.md) is the day-to-day guide.

- Add, replace, or remove images in `public/media/home/random-clutter/noise/`, `badges/`, `sprites/`, or `pixel-sprites/`. Nested folders inherit their top-level defaults. Every supported image participates; the generator does not scan the full source library or copy every Noise/badge variant.
- Run `npm run clutter:generate` and refresh Home. The same command runs before `npm run dev` and `npm run build`. A running dev server needs manual regeneration after collection changes; no watcher was added.
- [The generator](../../../scripts/generate-random-clutter.mjs) detects dimensions from static PNG, JPEG, WebP, and AVIF files and writes a sorted typed catalogue. It only writes changed output. `npm run clutter:generate -- --check` detects stale output without modifying it.
- [Settings](../../../content/home-random-clutter.settings.json) hold four folder defaults and twelve optional size exceptions. No dimensions or membership lists are maintained by hand. Unused overrides are harmless when an image is removed. Filenames without extensions remain IDs and must be unique across the collection, including case/format variants.
- Misplaced/unsupported files, corrupt metadata, animated images, duplicate IDs, invalid settings, and unapplied EXIF rotation fail generation with a file-specific/actionable error. Validation finishes before writing output. PNG animation chunks are checked as well as metadata frame counts. Images are neither edited nor re-encoded.
- [Pocket configuration](../../../content/home-random-clutter.ts) imports/re-exports the generated assets and retains the same nine regions. The generator and filesystem/image-reader code are outside the browser bundle. Sharp, already installed by Next.js, is now declared explicitly as a pinned development dependency for metadata reading; no image-reader version was changed.

All 135 migrated images were compared to a temporary pre-migration record: hashes, IDs, dimensions, families, pixel-art flags, and size ranges match. Only deployable paths and catalogue ordering changed. Sorting can change a seed's arrangement after a catalogue edit; interaction/resize/session rules are unchanged. Authored placement records, source-library images, density configuration, and page CSS were not edited for this authoring change.

Verification passed: lint, type checking, the full **56-test/nine-file suite**, production build (including its generation hook), the dev generation hook, and read-only catalogue consistency checking. Eight new filesystem tests cover folder defaults, nested/encoded filenames, overrides, add/remove/replace behavior, repeatable generation, stale/empty output, duplicate IDs, invalid inputs, real animation rejection, JPEG/AVIF dimensions, and unsupported content disguised under a supported extension. Initial workflow tests and format/settings regressions demonstrated failures before their corresponding fixes. Independent review confirmed the migration comparison and identified format/container validation gaps; both were resolved with regression tests. Production browser checks passed again at 1920, 1600, 1440, 1221, 1024, 768, 390, and 320px, including actual content/authored exclusions, no added overflow, no broken visible images, interactions, reduced-motion stills, and no console/runtime errors. Desktop/mobile screenshots were reviewed. All 135 generated URLs separately served byte-identical files. Production scans found no editor controls/authoring modules or filesystem/image-reader code in client chunks. The final validation fixes regenerated no asset output, and the production build passed again.

Browser evidence is at `%TEMP%/breakspider-folder-catalogue-checks/`; the migration comparison record is `%TEMP%/breakspider-folder-catalogue-baseline.json`. Temporary browsers and production servers were stopped. Owner Part 6 acceptance remains pending.

## Runtime contract

- The existing browser-memory `getHomeSessionSeed()` is read after hydration. Hard refresh creates a new seed; SPA navigation, interactions, and returning Home retain it. Nothing is stored persistently or randomized during server rendering.
- Pure generation chooses IDs, assets, normalized pocket coordinates, widths, and rotations. Each pocket has its own seeded sequence and a shuffled asset bag, using the pool before repeating. Mobile has an explicit smaller composition. Geometry never rerolls these choices.
- Placement uses actual aspect ratios and rotated bounding boxes. Expanded pockets are clipped to the homepage canvas before normalized coordinates are mapped, avoiding fully off-canvas objects. Edge clipping requires at least 75% visibility along both axes.
- [DOM measurement](../../../lib/home/random-clutter-dom.ts) protects visible text line fragments with 4px padding, links/buttons/native summaries with 6px padding, and media with 3px padding. Scrolled-out and truncated text is clipped to its visible container. Focus perimeters and native scrollbar strips are protected without reserving an entire blank surface.
- Authored visuals retain their transformed bounds and configured `exclusionPadding`. Existing whole-section `data-home-exclusion` rectangles are no longer blanket random exclusion areas. Empty backgrounds and section margins can receive decoration without changing section geometry or authored placements.
- Random-to-random overlap is allowed up to 65% of the smaller rotated bounding-box area; near-total coverage is rejected. At most two visible copies of an asset can be admitted across the page. Rejected candidates do not consume that allowance. These rules supersede the older tutorial's blanket pairwise rejection and the first pass's 30% limit.
- The overlay starts empty for server rendering and hydration. Its foreground stacking lets decoration cross blank card surfaces and edges. It remains inaccessible, unfocusable, pointer-inert, clipped to the canvas, and independent of the content grid. All random assets are static.
- Animation-frame measurement responds to content, anchor, pocket, and authored resizing; font readiness; media loads; text mutations; scrolling; details toggles; focus; and interactions. Transform transitions are measured while moving. Random output mutations and image loads are ignored, and unchanged layouts retain their React state. All observers, listeners, and pending frames are cleaned up on unmount.
- Geometry changes can hide or readmit candidates. Returning through SPA navigation can reset Familiar/file-pile state, so the admitted subset may differ while the seed and symbolic choices remain stable.
- Development editing suspends the layer through the existing editing marker. Done resumes the same seed and choices against the current draft. The editor observer is development-only; production imports no authoring code.

The replay exclusion marker is on the actual button rather than its full-width empty row. Its appearance, focus behavior, and replay implementation remain unchanged. The owner's requested spacing revision removes excess padding and button margin above Replay on desktop/tablet and reduces the desktop action-row gap. No authored placement records or five-mode overrides were edited. Section content, accepted interactions, and the mobile structural layout remain intact.

## Verification

Browser checks were primary, using temporary Chromium DevTools Protocol harnesses because the browser plugin and Playwright were unavailable. The initial dense revision's screenshots and JSON evidence are outside the repository at `%TEMP%/breakspider-part6-revision-checks/`. The following table records that revision before the distribution/spacing adjustment documented below.

| Viewport width | Development pieces / distinct assets | Production pieces / distinct assets |
| --- | --- | --- |
| 1920 | 65 / 50 | 67 / 50 |
| 1600 | 50 / 42 | 56 / 48 |
| 1440 | 47 / 39 | 51 / 47 |
| 1221 | 39 / 31 | 38 / 34 |
| 1024 | 64 / 49 | 53 / 43 |
| 768 | 44 / 37 | 55 / 41 |
| 390 | 22 / 21 | 27 / 25 |
| 320 | 13 / 13 | 19 / 18 |

These are measured samples, not density guarantees. Production samples used a new document at each width. Three additional desktop refresh samples admitted 56, 45, and 44 pieces with 49, 38, and 41 distinct assets; they contained 46, 38, and 40 overlapping random pairs. Noise and badges remained a minority of the catalogue and miscellaneous sprites appeared throughout these samples.

- At all eight widths, independent browser measurements found no random intersections with actual visible text, controls, media, focus perimeters, scrollbar strips, or authored visuals. Pieces did intersect blank section surfaces and edges as intended. Hiding the layer left section geometry identical and added no horizontal overflow. The existing 320px root minimum remains unchanged, including its 305px content viewport with a classic 15px scrollbar.
- `lifetime-checks.json` records **42 checks** covering editor suspension/identical resumption, interaction and expansion, responsive return, SPA Back/Forward and Home links, hard-refresh variation, interior-first entry, longer copy, 200% text sizing, slow media, reduced motion, focused/scrolled Sketchbook, file hover during and after movement, catalogue repetition limits, and missing-pocket fallback. No runtime exceptions were observed.
- Production checks passed at the same eight widths. Authored counts remained 19 desktop, 17 tablet, and 12 mobile. No visible broken images, duplicate authored instances, extra overflow, or Sketchbook masks appeared; Terra Blade remained fully visible. Artifact inspection/Escape, Familiar cycling, reversible crystal glow, file shuffle, Sketchbook scrolling, and Familiar stability during updates expansion passed. All three authored animations selected their stills under reduced motion. Console warnings/errors and runtime exceptions were absent.
- The accepted Phase 1 shell regression matrix passed all 21 checks against production: splash/Skip, return visitor, replay/focus return, visitor and artifact dialogs, navigation, logo behavior, default mute, gesture activation, pending audio cancellation, persisted sound with silent reload, and fresh interior entry. Existing focused audio tests also cover active playback cancellation.
- Independent review checked the asset catalogue, dimensions, generation, collision rules, responsive regions, and measurement lifecycle. Its findings about native summary controls, focus/scrollbar affordances, clipped text fragments, and four-space formatting were resolved before these checks.

Final `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` passed. **48 tests across eight files** include thirteen focused random geometry/data tests. They cover deterministic independent pockets, stratified cluster distribution on both axes across multiple seeds, mobile bounds, collision padding, rotated aspect ratios, missing geometry, stable choices on resize, clipping, dense overlap limits, large budgets, shuffled variety, per-asset sizes, and a maximum of two visible copies. New behavioral tests demonstrated failures against the previous implementation before the corresponding fixes.

Production contained no editor toggle, controls, handles, preview, editing marker, or authoring listeners. Scans of `.next/static`, generated homepage HTML, and the homepage server module found no editor control strings or editor/authoring module names. Server-rendered random output remained empty until client measurement.

The subsequent rendering correction removed all added Noise container treatments and their configuration/type fields. Browser checks at the same eight widths passed again, including computed-style verification of transparent backgrounds, zero borders/padding, and no container shadows. Evidence is at `%TEMP%/breakspider-part6-plain-cutout-checks/`. Lint, type checking, and the production build passed after this correction.

Six source images had opaque backgrounds despite their filenames or baked-in transparency checkerboards: Annoying Dog, Leafeon, the Skyrim emblem, Primeape, and both Jotaro hats. With the owner's explicit approval, exact pixel masking removed those backgrounds in both `assets/artifacts/` and `public/media/home/random-clutter/`. Original dimensions and all retained foreground RGB values are unchanged; the dog's white body, eye whites, and hat highlights are preserved. Internal checkerboard gaps were cleared as well. The AI-generated alternatives were discarded because they changed dimensions and artwork. Dark/magenta preview review, per-pixel comparisons, matching source/public hashes, and served-image alpha checks verified the correction. Evidence and temporary original backups are at `%TEMP%/breakspider-clean-cutouts/`. No application logic or placement data changed.

## Distribution and trailing-space revision

The owner requested more clutter in upper/middle margins and less empty space between “More stuff” and the footer. There was no explicit bottom weighting: the large unobstructed footer pocket admitted more candidates, while upper margins lacked suitable small pockets. Rails could also choose all their centers near one end of the page.

The current nine-region configuration distributes rail/selected periphery centers across height, adds small upper-margin and Changelog pockets, and places the Spotlight pocket directly along its lower seam. Narrow margins cap widths at 36–42px. The footer candidate budget is reduced from 64–88 to 16–24 and its desktop/tablet region from 11rem to 4.5rem. The same 135-asset library, session lifetime, content exclusions, overlap rule, and repetition limit remain in use. These changes redistribute the existing collage rather than reserving layout space for it.

Desktop trailing canvas space below the file pile is now 124px instead of 180px; tablet is 132px instead of 180px. Replay starts 32px below the pile on desktop and 40px on tablet, instead of 88px. The owner's authored ukulele and its shadow still fit. Mobile spacing is unchanged. Hiding every random piece leaves identical section geometry.

Fixed-seed before/after browser measurements used the same current authored placement data. “Upper” means centers above Spotlight's lower edge; “bottom” means centers below the file pile. These samples describe distribution, not fixed visible-count targets.

| Width | Total before → after | Upper before → after | Bottom before → after |
| --- | --- | --- | --- |
| 1920 | 53 → 67 | 5 → 17 | 19 → 5 |
| 1600 | 37 → 47 | 1 → 14 | 15 → 5 |
| 1024 | 58 → 65 | 1 → 18 | 12 → 5 |
| 390 | 17 → 17 | 1 → 3 | 3 → 4 |

Fresh browser checks at 1920, 1600, 1440, 1221, 1024, 768, 390, and 320px found no intersections with protected content/authored visuals and no added horizontal overflow. Three additional 1600px seeds admitted 53, 62, and 57 pieces, including 19, 16, and 18 in the upper band and 7, 7, and 9 below the pile. Desktop and mobile screenshots were reviewed. All 42 lifecycle/geometry stress checks passed again, including editor suspension/resumption, responsive return, SPA seed stability, hard-refresh variation, changing text/media, and moving/focused content. Evidence is at `%TEMP%/breakspider-part6-spread-before/` and `%TEMP%/breakspider-part6-spread-after/`.

The production build passed after this revision. Production browser checks passed at all eight widths again, including authored visibility, random content exclusions, inert rendering, reduced-motion stills, artifact dialogs, Familiar/crystal/file interactions, and Sketchbook scrolling, with no runtime or console errors. All 21 Phase 1 shell checks passed again, including Replay near the shortened page end and focus restoration. Production scans found no editor controls or authoring modules, and server-rendered random output was empty. Fresh lint, type checking, and all 48 tests also passed. An independent review found no blockers in region configuration, responsive behavior, seeded distribution, or spacing cascade.

Temporary browsers and production servers were stopped in harness cleanup. The owner's pre-existing development server on port 3000 was preserved. Verification used Chromium; other engines were not tested. Viscap's media-pending treatment and existing identity/content follow-ups remain unchanged.

## Owner checkpoint

- [ ] Owner verifies the revised Part 6 composition locally.
- [ ] Owner verifies Part 6 live when ready to publish.
- [ ] Owner accepts Part 6 and the final Phase 2 composition.
