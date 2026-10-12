# Phase 3 Part 3 — Evidence and Decoration Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` only if implementation is later requested. This tutorial authorizes no implementation, delegation, commit, or deployment.

**Status:** Planned; not implemented or accepted.

**Goal:** Complete About's lower room with distinct work evidence, a Familiar satellite, limited authored accents and responsive recomposition.

**Architecture:** Read shared domain records; render About-specific evidence and relationships in route JSX/CSS. A handful of static anchored decorations needs neither a new renderer nor an editor extension.

**Tech Stack:** Existing repository, `Link`, `ContentImage`, local CSS and optional native `picture` for reduced-motion stills.

**Spec and global constraints:** [Reading guide](2026-10-12-phase-3-about-contact.md), Parts [1](2026-10-12-phase-3-content-and-media.md) and [2](2026-10-12-phase-3-profile-and-contact.md).

**Review focus:** Missing project data, overlap/focus, readable captures, sparse mobile personality and animated-media motion preferences.

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

## Task 2: Curate and anchor a small decoration set

**Files:** `app/about/page.tsx`, `app/about/page.module.css`; selected derivatives under `public/media/about/` only when existing deployed media is unsuitable.

- [ ] Compare a few candidates from `assets/` around the portrait, contact boundary and outer edges. Use the prototype's clustering grammar rather than copying its roster. Show the owner the resulting composition at intended scale; exact accents remain a review choice.
- [ ] Attach each object to a meaningful route region using local CSS, reserving page-edge placement for genuine edge accents. Keep all decoration deterministic, pointer-inert, empty-alt/aria-hidden and outside the tab order.
- [ ] Use a static set initially. If reusing animated crystal/strawberry assets, pair them with available stills through `picture` under `prefers-reduced-motion`, or select static assets instead. CSS animation suppression does not freeze a GIF.
- [ ] Define local desktop/mobile size, layer and visibility rules. Reduce mobile clutter substantially while retaining a few identity-bearing accents. No runtime measuring, collision engine, random selection or homepage placement records.
- [ ] Check any newly selected external material's documented provenance before shipping; keep creator portrait, original work and Familiars as the main identity evidence.

## Checkpoint before Part 4

- [ ] Compare actual viewport and full-page captures against the approved About references at 1440/1920, 1024 and 390/320px.
- [ ] Confirm a visually distinct room, less clutter than Home, intentional open space and meaningful project evidence. Avoid a hero followed by uniform cards or a literal scrapbook.
- [ ] Tab/hover both evidence links: complete focus outlines and captions remain exposed. All actions work on touch without hover.
- [ ] Verify image dimensions/loading and reduced-motion still selection; no horizontal page overflow or covered text/controls.
- [ ] Temporarily inspect missing evidence/Familiar records and longer captions without saving the trial edits. Expected behavior is readable fallbacks, working navigation and no crash.
- [ ] Run `npm run lint` and `npm run typecheck`. Verify homepage files, saved placements and editor remain unchanged.

Next: [Part 4 — Verification and review](2026-10-12-phase-3-verification-and-review.md).
