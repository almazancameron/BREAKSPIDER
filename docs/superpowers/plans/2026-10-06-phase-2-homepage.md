# Phase 2 Homepage Implementation Plan — Reading Guide

> **For agentic workers:** Use `superpowers:executing-plans` only if the owner later requests implementation. These are tutorials for manual implementation by the owner. They authorize no implementation or delegation.

**Status:** Part 1 (primary composition) is complete and accepted (2026-10-07). The owner verified it through local testing and live deployment. Part 2 (activity modules) is implemented, awaiting owner verification and acceptance. Parts 3–6 remain planned. Phase 1 remains complete and accepted.

**Goal:** Translate the approved Prototype 04 homepage into production, including its optional interactions, editable authored decoration, and restrained session-stable random clutter.

**Architecture:** Keep the homepage's composition in its own CSS and JSX. Read static content through the existing repository, reuse the image/dialog/audio/visitor infrastructure, and introduce small client components only for interaction and browser measurements. Structural layout, decorative placement, and dev-only authoring have separate responsibilities.

**Tech Stack:** Installed Next.js 16.3.6, React 19.2.8, TypeScript, CSS Modules, native browser APIs, existing Vitest runner. No new packages.

**Spec:** [Phase 2 roadmap](../../breakspider_master_implementation_roadmap_v2.md#8-phase-2--homepage-production-implementation), [Prototype 04 inventory](../../breakspider_prototype_04_design_inventory.md), [reuse map](../../breakspider_prototype_reuse_map.md), [clutter positioning](../../CLUTTER_POSITIONING.md), [design philosophy](../../breakspider_design_philosophy.md), [site architecture](../../breakspider_site_architecture.md), and [prototype summary](../../breakspider_prototypes_final_summary.md).

## Recommended order

Finish each tutorial's browser checkpoint before starting the next. Each chunk yields something visible and independently reviewable.

| Order | Tutorial | Result and dependency |
| --- | --- | --- |
| 1 | [Primary composition](2026-10-06-phase-2-primary-composition.md) — complete and accepted | Spotlight, About/portrait, and overlapping project evidence replace the homepage placeholder. Verified locally and in live deployment by the owner. |
| 2 | [Activity modules](2026-10-06-phase-2-activity-modules.md) — implemented, awaiting acceptance | Current project, recent Sketchbook feed, Familiar cycling, and changelog complete the structural field. Depends on chunk 1's data and layout ownership. |
| 3 | [Artifact interactions](2026-10-06-phase-2-artifact-interactions.md) | Shared homepage inspection, found Map, archive focus/shuffle, mobile file strip, and reversible crystal. Depends on actual content from chunks 1–2. |
| 4 | [Authored clutter](2026-10-06-phase-2-authored-clutter.md) | Curated clusters attach to semantic anchors through readable placement records. Depends on finished structural regions and interactive-object footprints. |
| 5 | [Dev-only placement editor](2026-10-06-phase-2-placement-editor.md) | Drag, nearest-anchor selection, manual correction, breakpoint adjustments, and export. Depends on chunk 4's schema and renderer; explicitly requested by the owner. |
| 6 | [Random clutter and acceptance](2026-10-06-phase-2-random-clutter.md) | Seeded supplemental clusters avoid measured exclusions; final visual and Phase 1 regression review. Depends on stable authored placements, not the editor at runtime. |

Chunks 2 and 3 deliberately precede decoration: the actual content determines safe space. The editor is its own chunk because authoring convenience can be reviewed separately from the runtime renderer. Randomization comes last so it cannot become a substitute for the approved composition.

The first application edit is **Primary composition, Task 1, Step 1**. Read its explanation and source material first. This guide itself requires no application changes.

## Decisions settled with the owner

- Keep identity, email, and availability as explicit draft placeholders. The owner will replace them later; do not make content collection a prerequisite for learning or implementation.
- Keep Viscap media pending initially. Preserve its distinct blue/dark work-evidence slot and working project link; do not publish unreviewed captures. This is an accepted temporary visual difference from the prototype.
- Include a separate dev-only drag-and-drop placement-editor tutorial in Phase 2.

## What the current production code actually provides

`app/page.tsx` renders `RoutePlaceholder`, an all-routes list, and `ReplayIntroButton`. It has no production Spotlight, archive pile, clutter renderer, editor, or random layout system.

`app/layout.tsx` already owns the single `main#main-content`, `SiteHeader`, `SiteFooter`, `VisitorStateProvider`, `IntroProvider`, and route tracking. Keep those owners intact. Homepage markup belongs inside that main; do not add another main or copy the prototype shell.

The repository supplies async project, Familiar, Sketchbook, collectible, and changelog reads. Sketchbook/changelog reads are newest-first. ONFF's public slug is `one-night-familiar-fight`, but its internal ID and existing asset directory still use `pixel-pugilists`. Preserve those relationships; use public slugs for links. Viscap's `heroMedia` is deliberately `null`.

`ContentImage` renders `next/image`; `Dialog` uses native `showModal()` and handles Escape/backdrop closure. `useUISound()` requests the accepted named sounds while honoring visitor readiness and mute. Existing preview components are useful domain examples but their layouts are not the homepage's visual target. Reuse their data and image primitive without forcing them into the homepage's bespoke composition.

## Approved references and how to use them

Read `prototype/breakspider-nextjs-prototype/components/HomePrototype04.tsx` and `HomePrototype04.module.css`. The CSS has historical overrides; its final rules and the captures determine the final appearance. Prototype 05 is not the homepage authority. Do not copy prototype storage keys, fake presence, shell markup, direct audio calls, or handwritten modal lifecycle.

Compare both viewport and full-page captures:

- [Desktop viewport](../../../screenshots/prototype-04-desktop-1440x900.png) and [full page](../../../screenshots/prototype-04-desktop-full.png).
- [Mobile viewport](../../../screenshots/prototype-04-mobile-390x844.png) and [full page](../../../screenshots/prototype-04-mobile-full.png).
- [Intermediate width](../../../screenshots/prototype-04-middle-768x900.png), [mobile inspection](../../../screenshots/prototype-04-mobile-inspection.png), and project hover/detail captures in `screenshots/`.

The accepted production header is shorter than the prototype header. Keep it and adjust the homepage's own spacing to it. Do not copy the old negative top margin without checking the resulting gap.

The enduring target is the dominant left Spotlight, open About fragment and bridging portrait, strong overlapping Projects surface on the right, varied secondary fragments, found objects, irregular perimeter/interior clusters, and dark open space. Prototype sprite choices/counts are not a final roster. The full `assets/` tree is the candidate library; `public/` is only the deployed subset. Use [asset curation](../../breakspider_asset_curation.md) and the inventory CSV as indexes, including provenance and reserved assets.

## Installed Next.js documentation

These installed guides were reviewed for this plan. Read the relevant ones again before implementation, as `AGENTS.md` requires:

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `01-app/02-guides/server-and-client-boundary.md`: server content reads; small client boundaries; serializable data; browser APIs after hydration or in event handlers. Client Components still contribute server-rendered HTML.
- `01-app/01-getting-started/11-css.md`: CSS Modules keep homepage styles scoped; global styles can persist across navigation.
- `01-app/01-getting-started/12-images.md` and `01-app/03-api-reference/02-components/image.md`: reserve intrinsic dimensions, supply truthful `sizes`, and preserve native media character. `priority` is deprecated in this installed version. Existing `ContentImage` is sufficient initially; don't add preload machinery without evidence.
- `01-app/01-getting-started/04-linking-and-navigating.md`: `Link` preserves the loaded SPA document during route transitions. Random decoration's lifetime must outlive an individual homepage mount.

## Global constraints

- Use four spaces per indentation level in every edited file and code example. Do not reformat unrelated files.
- Preserve the accepted splash, intro key `breakspider_intro_seen_v1`, replay/skip, header, logo animation, visitor state, and audio behavior. No new storage key for seed, Familiar, shuffle, or crystal state.
- “authored placements and object relationships remain the dominant composition” and “structural homepage content remains independent from decorative placement logic”.
- “fixed hand-placed content always wins”; random decoration cannot obscure copy, controls, focus outlines, or project evidence.
- Mobile order: Spotlight → About → Projects → current project → Sketchbook → Familiar → changelog → Map → artifact pile. Replay stays near the end; visitor profile remains available in the accepted header.
- Keep professional paths explicit. Functional objects are links/buttons; quiet decoration has empty alt text and no tab stop.
- No universal card/page/diagram framework, backend, animation library, drag library, or broad component-testing setup.
- Full catalogue/detail pages, Map redesign, persistent collectible awards/equipment, and playable-game integration remain later roadmap phases.

## Review focus and verification policy

| Risk | Owning checkpoint |
| --- | --- |
| Longer ONFF title, real copy, 320px width, and 200% zoom cause collisions | Chunks 1–2 browser checks; chunk 6 final matrix. |
| Inspection hides navigation or loses keyboard focus | Chunk 3 native-dialog checks, including reopen and every close path. |
| Editor saves viewport coordinates or loses untouched entries | Chunk 5 offset round-trip and export checks. |
| Randomization changes during interaction/navigation or causes hydration mismatch | Chunk 6 seed tests and production browser checks. |
| Clutter appears over delayed media, responsive content, or Phase 1 controls | Chunks 4/6 exclusions, resize/image checks, and Phase 1 regression matrix. |

Browser checks are the main evidence. Use existing Vitest selectively for pure nearest-anchor/offset math and random generation/collision rules. Do not add component snapshots, fake DOM geometry tests, or a coverage target. At final acceptance run the existing suite and normal lint/type/build commands once, then inspect the production build in the browser. Each plan labels code as a **complete implementation**, **worked fragment**, or **interface only**; fragments and types are not complete components.

## Completion record to fill in during manual implementation

- [ ] Each chunk's learning and browser checkpoints passed.
- [ ] Desktop at 1440/1920, intermediate widths, and mobile at 390/320 reviewed against the approved captures.
- [ ] Authored placements remain dominant; random clutter varies on refresh and stays stable in the loaded SPA.
- [ ] Dev editor export survives reload; production has no editor controls or authoring listeners.
- [ ] Phase 1 behavior remains accepted after integration.
- [ ] Identity placeholders and media-pending Viscap are recorded as intentional content follow-ups.

These documents describe future edits. No application implementation was performed to produce them.
