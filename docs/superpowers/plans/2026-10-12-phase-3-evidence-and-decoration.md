# Phase 3 Part 3 — Evidence, Authored Decoration and Shared Editor Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` only if implementation is later requested. This tutorial authorizes no implementation, delegation, commit, or deployment.

**Status:** Project evidence, Familiar satellite and shared development editor implemented October 13, 2026. New clutter curation/placements are deferred until the owner supplies images; all new-page arrays are empty. Home's accepted placements remain unchanged. See [implementation record](../../design/phase-3-about-contact/implementation-notes.md). Phase 3 is not accepted.

**Goal:** Complete About's lower room and authored accents, and make the accepted development-only placement editor available across the app with isolated per-page saving.

**Architecture:** Read shared domain records; keep About evidence and functional layout in route JSX/CSS. Extract accepted clutter behavior into shared primitives parameterized by registered page ID, eligible anchors, assets and placement records. Every content route gets a thin shared boundary; production uses deterministic saved records while development loads the editor and full palette.

**Tech Stack:** Existing repository, `Link`, `ContentImage`, local CSS and optional native `picture` for reduced-motion stills.

**Spec and global constraints:** [Reading guide](2026-10-12-phase-3-about-contact.md), Parts [1](2026-10-12-phase-3-content-and-media.md) and [2](2026-10-12-phase-3-profile-and-contact.md).

**Review focus:** Missing project data, overlap/focus, readable captures, sparse mobile personality, motion preferences, page isolation and preservation of Home's accepted editor.

## Learn first

About offers selected receipts, not the full archive. Reuse project data without importing the generic `ProjectPreview` arrangement. The prototype has direct project links and hover lifts; it does not require a new inspection modal or collectible interaction.

Review the full `assets/` candidate library and curation indexes. Existing public paths are reusable assets, not permission to copy the homepage's object relationships into About.

## Task 1: Add the selected evidence and Familiar satellite

**Files:** Modify `app/about/page.tsx` and `app/about/page.module.css`; update `content/about.ts` only if owner-reviewed captions/media change.

**Consumes:** Part 1 `AboutContent.evidence`; `getProjects(): Promise<Project[]>`; `getFamiliar(slug: string): Promise<Familiar | null>`.

**Produces:** `workTrail` and `satellite` regions after practice, linking to canonical production destinations.

- [ ] Read projects and the configured Familiar through repository functions. Match evidence by public `projectSlug`, not legacy internal IDs. Guard absent records with a clear pending state and `/projects` fallback rather than dereferencing them.
- [ ] Render Viscap storyboard and ONFF priority-builder previews with distinct native blue/dark and orange/cyan evidence treatments. Use `/projects/viscap-ai` and `/projects/one-night-familiar-fight`; do not rename existing legacy media directories.
- [ ] For pending Viscap media, preserve the evidence slot with `Media pending review` and a working project link. Do not silently substitute the media-library capture against the owner's storyboard choice.
- [ ] On desktop, stagger the evidence surfaces beside skills with modest angle/overlap. Raise the focused surface as well as the hovered one; captions and the entire focus outline stay exposed. Use one link per evidence object, without nested controls.
- [ ] Render the static Ashwing satellite and direct `/familiars` link. Read its sprite from the Familiar record; omit the sprite gracefully if absent. Do not add cycling, roaming, persistence or unlocks.
- [ ] On mobile, render evidence after skills in a clear Viscap → ONFF sequence, with slight asymmetry but no obstructive overlap; place the Familiar link last. Keep screenshot content recognizable and preserve intrinsic aspect ratios.

## Task 2: Extract the shared clutter contract and server-owned registrations

**Files:** Create shared modules under `lib/clutter/` and `components/clutter/`; modify existing home clutter modules only to delegate/adapt; modify `app/api/dev/clutter/route.ts`; add About and other-route placement files. Preserve `content/home-clutter.ts` and `HOME_AUTHORED_PLACEMENTS` as Home's file/export.

**Consumes:** Accepted `ClutterAsset`, placement pose fields, viewport queries, authoring math, catalogue filtering, native editor interactions and save safeguards.

**Produces:** `getPageClutter(pageId)` server read returning `{ pageId, anchors, placements, assets }`; shared `ClutterLayer({ anchor, assets, placements })`; development-only `ClutterEditor({ pageId, anchors, placements, assets, children })`. Anchors are page-local registered strings, not a union of every site's section names. File targets remain server-only.

- [ ] Record the accepted Home baseline, saved placement file hash and existing test results before extraction. Review all existing clutter tests and preserve their meaningful behavior assertions.
- [ ] Define shared placement/asset types without changing accepted pose semantics. Parameterize anchor order, validation and measurement by the current page's eligible anchors; preserve padding-box math, hidden-item numeric editing, nearest-anchor tie order and independent five-mode overrides.
- [ ] Add explicit trusted server registrations with page ID, canonical pathname, allowed anchor IDs, placement file path and export name. Home maps to its existing file/export/anchor order. About maps to `content/about-clutter.ts`, export `ABOUT_AUTHORED_PLACEMENTS`, anchors `canvas`, `identity`, `portrait`, `contact`, `practice`, `workTrail`, `satellite`. Other pages start with `canvas`; each file under `content/clutter/` exports `AUTHORED_PLACEMENTS` initialized to an empty JSON array.
- [ ] Keep browser-visible registration data limited to page ID and anchors; do not serialize filesystem targets. Register each valid Familiar and long Sketchbook entry independently. Use a finite map of approved IDs to literal paths, never a request-supplied path or an unchecked slug concatenated into a path.
- [ ] Parameterize the existing parser/save helper by registered export name and allowed anchor IDs. Preserve four-space serialization, surrounding source/newlines, atomic replacement, revision checks, serialized saves, request validation and failed-save draft retention. Keep Home's endpoint usable with omitted page ID as an explicit Home default for compatibility; unknown supplied IDs must fail rather than fall back to Home.
- [ ] Add meaningful tests in `tests/clutter-page-registry.test.ts` and extend save/authoring tests: same anchor/object IDs on two pages stay isolated, page-specific invalid anchors are rejected, unknown/traversal-like IDs cannot resolve a target, saving About leaves Home byte-for-byte unchanged, and competing edits still return conflict errors. Run those focused tests before and after the corresponding implementation changes.

## Task 3: Make the editor and saved renderer available on every content route

**Files:** Shared editor/renderer CSS and components; thin integration in every current `app/**/page.tsx`, including both dynamic detail route files. Existing accepted homepage JSX/CSS stays structurally intact.

- [ ] Extract the editor's existing controls instead of duplicating them. Replace direct Home imports and `data-home-anchor` lookup with supplied page data/scoped anchors; Home may retain compatibility attributes during migration. Retain drag/reanchor, folder assets, numeric fields, flipping/rotation/layers, independent responsive overrides, reset, Copy export and Done saving. Label the current page and target placement file in development.
- [ ] Add a shared server boundary/helper that supplies saved records and placed assets, wraps a page-local `canvas` anchor, and loads the shared editor/full palette only inside the existing development environment guard. Route code may render `ClutterLayer` inside additional named anchors. Do not invent a universal page layout/schema or move content into decoration data.
- [ ] Integrate Home without adding a wrapper that changes grid geometry, padding/gutter resolution or occlusion. Keep its saved records, palette IDs, viewport ranges and production visual output unchanged; use a compatibility adapter if that avoids a risky composition rewrite.
- [ ] Integrate About's named regions and the default canvas anchor on all other current routes listed in the reading guide. Empty saved arrays must still allow opening the editor and adding the first asset; handle an empty palette without `assets[0]` crashes. Do not decorate unfinished routes merely to prove coverage.
- [ ] Key the editing boundary by registered page ID. Opening requests that page's current snapshot/revision; Reset uses that opening snapshot and Done posts its explicit ID. Cancel drags, remove listeners/portals and discard unsaved drafts on route unmount; display that drafts are saved only by Done. A late request must never replace another page's draft or save to its target. Keep editing disabled while saving and preserve failure feedback next to Done.
- [ ] Production receives only assets referenced by the current page's saved placements, no editor/palette listeners or authoring code. Keep runtime decoration independent of DOM measurement and random selection. GET and POST authoring requests remain 404 in production before filesystem authoring imports.
- [ ] Test Home → About → two detail entries with repeated anchor/object IDs, editor open/close/navigation, pending requests, empty compositions, save failure and external-edit conflict. Expected result: independent files, no draft leakage, no leftover handles/listeners, no lost responsive records. Document the registration workflow for future pages/details.

## Task 4: Curate and save About's small authored decoration set

**Files:** `content/about-clutter.ts`, About asset references, `app/about/page.tsx` and `app/about/page.module.css` anchor geometry; selected derivatives under `public/media/about/` only when needed. Use the shared editor to author/save placement records.

- [ ] Compare a few candidates from `assets/` around the portrait, contact boundary and outer edges. Use the prototype's clustering grammar rather than copying its roster. Show the owner the resulting composition at intended scale; exact accents remain a review choice.
- [ ] Attach each object to a meaningful About anchor through the shared editor and save its records with Done. Reserve canvas/edge placement for genuine edge accents. Keep decoration deterministic, pointer-inert, empty-alt/aria-hidden and outside the tab order in ordinary viewing.
- [ ] Use a static set initially. If reusing animated crystal/strawberry assets, pair them with available stills through `picture` under `prefers-reduced-motion`, or select static assets instead. CSS animation suppression does not freeze a GIF.
- [ ] Define independent desktop/wide/narrow/tablet/mobile pose overrides in About's records. Reduce mobile clutter substantially while retaining identity-bearing accents. No runtime measuring, collision engine, random selection or edits to Home's placement records.
- [ ] Check any newly selected external material's documented provenance before shipping; keep creator portrait, original work and Familiars as the main identity evidence.

## Checkpoint before Part 4

- [ ] Compare actual viewport and full-page captures against the approved About references at 1440/1920, 1024 and 390/320px.
- [ ] Confirm a visually distinct room, less clutter than Home, intentional open space and meaningful project evidence. Avoid a hero followed by uniform cards or a literal scrapbook.
- [ ] Tab/hover both evidence links: complete focus outlines and captions remain exposed. All actions work on touch without hover.
- [ ] Verify image dimensions/loading and reduced-motion still selection; no horizontal page overflow or covered text/controls.
- [ ] Temporarily inspect missing evidence/Familiar records and longer captions without saving the trial edits. Expected behavior is readable fallbacks, working navigation and no crash.
- [ ] Run focused clutter tests, `npm run lint` and `npm run typecheck`. Verify Home's saved placement values/output and accepted editor behavior survive the related shared extraction; all other-route empty files remain empty unless the owner intentionally authored them.
- [ ] On every current content route, open the editor, confirm the displayed page/anchors and independent save destination, and exercise first-object creation using a restored trial. Verify at least two distinct detail entries have independent persistence. Temporary trial saves must be restored byte-for-byte; About's final reviewed placements are intentionally saved.

Next: [Part 4 — Verification and review](2026-10-12-phase-3-verification-and-review.md).
