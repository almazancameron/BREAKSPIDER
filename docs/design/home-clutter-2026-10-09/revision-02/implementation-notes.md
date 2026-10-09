# Authored clutter implementation — October 9, 2026

The owner approved revision 02 and authorized implementation with one final adjustment: show the whole Terra Blade. **Phase 2 Part 4 is complete and accepted (2026-10-09).** The owner verified everything locally and on the live deployment. The development-only editor and randomized layer remain later chunks.

## What is now in production code

- [The editable catalogue and placements](../../../../content/home-clutter.ts) hold 18 supplied images plus the existing Godot process photo. Noise and random pickups remain absent from this layer. Offsets describe image centers relative to named section corners.
- [Clutter types](../../../../lib/home/clutter-types.ts) and [pose merging](../../../../lib/home/clutter-placement.ts) support the approved desktop, wide, narrow-desktop, tablet, and mobile arrangements. Independent partial overrides never mutate desktop records.
- [The renderer](../../../../components/home/home-authored-clutter.tsx) emits deterministic CSS-selected instances and exposes the optional draft context for the future editor. It does not measure the page, select anchors at runtime, persist data, or choose random positions.
- [The homepage](../../../../app/page.tsx) marks semantic anchors and protected content. The portrait, roaming Familiar, and crystal have their own exclusion markers because they extend outside their section rectangles. Future random measurements should measure each `[data-clutter-visual]` rectangle to include rotation and scale, and read its parent placement's exclusion padding.
- The animated Kris, strawberry, and Lancer have still derivatives under `public/media/home/clutter/stills/`. Native picture sources select those stills under reduced motion. Dimensions remain reserved, decorative images have empty alternatives, and no decoration is focusable or receives pointer events.

## Real overlap rather than preview masking

Sketchbook's positioned outer wrapper owns its layout and Godot scrap. The opaque inner frame sits at local layer 2 and the scrap at layer 1. Its background, border, and two shadows cover the scrap naturally, without a mask or padded clipping rectangle. The file strip similarly sits above Kuromi and Starforce, preserving the perches during file hover/focus/shuffle.

The canvas clips only horizontal edge decoration. Original section order, grid placement, readable copy, and existing interaction owners remain in place. No Phase 1 splash, header, logo animation, profile, or audio implementation was changed. The shared image primitive gains an optional `unoptimized` prop that defaults to its previous behavior; clutter uses original pixels/GIFs.

## Decisions and final tuning

**Ruling:** the approved revision and owner corrections supersede the tutorial's older Noise-bank roster and archive-photo suggestion. The Godot photo belongs beside Working on. Cost if wrong: retune those placement records; no structural content migration is involved.

**Ruling:** retain explicit wide/narrow/tablet/mobile overrides because the approved captures demonstrate distinct arrangements at those widths. The original tutorial's single mobile override is insufficient. Breakpoints are 47.5rem, 76.25rem, 90rem, and 110rem. Cost if wrong: adjust the record overrides and corresponding CSS ranges before adding the editor.

Terra Blade uses an 84px edge inset so its full rotated canvas stays onscreen. Miku remains lower, below the changelog. The handheld stays up/right, and Kris stays inward from the margin. In the narrow-desktop range, Kris is smaller and raised to avoid About's heading, the relic pair is moved left to clear See updates, and Starforce is shifted left to separate it from the slime. On mobile, the megaphone is smaller and raised to clear the changelog's label. These corrections preserve the approved clusters rather than add new objects.

## Implementation ledger

Task 1: complete — catalogue, poses, dimensions, Godot deployed copy, and three reduced-motion stills.

Task 2: complete — deterministic renderer, optional draft context, CSS ranges, original pixel treatment, and independent pose merging. The focused test file failed before its implementation module existed; all four logic tests then passed with the implementation.

Task 3: complete — page anchors, protected content, real card/file stacking, and responsive browser tuning. No editor or random placement code was added.

Final independent review found no blocker. Its protected-control marker suggestion was addressed. No deferred review findings remain.

## Verification and captures

Build, lint, TypeScript, and the existing test suite passed: 6 test files, 28 tests. Broad component snapshots were not introduced. Browser evidence is in [browser-checks.json](implementation-checks/browser-checks.json).

- [1920 desktop](implementation-checks/homepage-1920.png)
- [1600 desktop](implementation-checks/homepage-1600.png)
- [1440 desktop](implementation-checks/homepage-1440.png)
- [1221 desktop breakpoint](implementation-checks/homepage-1221.png)
- [1024 tablet](implementation-checks/homepage-1024.png)
- [768 tablet](implementation-checks/homepage-768.png)
- [390 mobile](implementation-checks/homepage-390.png)
- [320 minimum](implementation-checks/homepage-320.png)

The page renders 19, 17, and 12 decorative objects in desktop, tablet, and mobile layouts respectively, with no duplicate visible breakpoint instances or broken visible images. Terra Blade is fully inside the viewport wherever shown. All three GIFs select their real still sources under reduced motion. Artifact inspection opens and closes with Escape; the Familiar remains in place when updates expand.

The repository's existing root minimum width is 320px. A 320px emulated viewport with a 15px classic scrollbar has only 305px of content width, so its pre-existing 320px root exceeds that by 15px; the check verifies clutter adds no overflow beyond that minimum. No global minimum-width change was made.

Full-page capture temporarily changes Chromium's viewport. Layout checks run before screenshots to avoid reporting that capture behavior as a real section shift. The harness explicitly loads visible images before capturing; it does not change the application's lazy-loading policy.

Temporary preview-server and browser processes were stopped after testing. The agent performed no commit or deployment. The owner subsequently verified the implementation locally and on the live deployment and accepted Part 4.

## Later authoring tool

Phase 2 Part 5 is implemented and agent-verified. See the [editor implementation and verification notes](../part-5-implementation-notes.md). The accepted Part 4 catalogue, placements, renderer, and layering are preserved. Part 5 owner acceptance remains pending local/live verification; randomized clutter remains planned.
