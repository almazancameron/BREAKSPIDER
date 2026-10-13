# Phase 3 Part 4 — Verification and Review Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` only if implementation is later requested. This tutorial authorizes no implementation, delegation, commit, or deployment.

**Status:** Verification and focused code review performed October 13, 2026; see [actual results and limits](../../design/phase-3-about-contact/implementation-notes.md). Owner content review, résumé, storyboard and clutter remain pending; Phase 3 is not accepted.

**Goal:** Verify the complete About/contact flow and preservation of accepted Phase 2 before requesting owner acceptance.

**Architecture:** Validate the assembled route and existing shared behaviors; fix only defects attributable to Phase 3. Capture evidence without creating a permanent broad browser-testing subsystem.

**Tech Stack:** Existing npm checks, browser tooling available at execution time, local development and production builds.

**Spec and global constraints:** [Reading guide](2026-10-12-phase-3-about-contact.md) and Parts 1–3. Acceptance criteria come from the roadmap; this plan cannot grant owner acceptance.

**Review focus:** Responsive extremes, real destination/PDF behavior, motion/accessibility, development/production authoring separation and honest unresolved-content reporting.

## Task 1: Verify the finished route

**Files:** Review all Phase 3 files. Create `docs/design/phase-3-about-contact/implementation-notes.md` and screenshot/check artifacts during implementation verification.

**Consumes:** Assembled About route, confirmed content, accepted homepage baseline and shared shell.

**Produces:** Reproducible verification evidence with dates, viewport sizes, commands, results and remaining prerequisites.

- [ ] Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`. Expect passing tests, no type/lint errors and a successful production build. Build/predev invoke the existing palette generator; inspect resulting diffs and preserve accepted generated assets/configuration.
- [ ] Review actual rendered development and production About pages at 320, 390, approximately 760, 1024, 1440 and 1920px, including either side of any composition breakpoint. Capture viewport and full-page desktop/mobile evidence.
- [ ] Exercise longer introduction/practice text, real email wrapping, longer captions and 200% zoom/reflow. No content/focus clipping, overlap collisions, layout shifts or horizontal page overflow. Label reduced-viewport simulations accurately.
- [ ] Verify Home → About → project → About transitions, back navigation, direct `/about` entry, `#contact`, mailto address, GitHub and LinkedIn destinations. External automation restrictions are reported honestly rather than mistaken for broken links.
- [ ] If the résumé exists, verify its request succeeds and both view/download affordances work with a readable PDF. If absent, confirm pending text has no broken link and leave résumé acceptance unchecked.
- [ ] Inspect keyboard order, skip-link/main focus, headings, active About navigation, image alt text, decorative silence, visible focus and touch targets. Verify profile dialog Escape/close/focus return and persistent sound toggle through the existing shell.
- [ ] Enable reduced motion and confirm transitions/lifts are suppressed appropriately and GIFs select still alternatives. All content/actions remain available.
- [ ] Inspect browser console/network for missing visible media, hydration/runtime errors and unnecessary archive downloads. Offscreen evidence can lazy-load; only About's selected assets should be requested for its visual composition.

## Task 2: Check accepted-work regressions and hand off

**Files:** Existing homepage/editor and shell are read-only regression targets. Record results in the implementation notes.

- [ ] Compare Home at 1440/1920 and 390/320 against the accepted authored baseline. Confirm identity, layout, saved placements and folder palette are unchanged; decoration stays deterministic.
- [ ] Exercise homepage Familiar cycling, file focus/shuffle/inspection, crystal interaction and found Map navigation; confirm existing audio/profile/intro behavior. About must not introduce new storage keys, audio calls or modal owners.
- [ ] In development, verify editor availability on every registered current content route, including individual Familiar/long Sketchbook pages. Check named/default canvas anchors, empty-set asset additions, drag/numeric edits, responsive overrides, Copy export, Reset and direct-save Done. Back up and restore trial files byte-for-byte; preserve About's intentionally reviewed placements.
- [ ] Save distinct trials on Home and About and two detail entries, then reload and navigate between them. Confirm isolated files/revisions and no cross-page draft leakage. Exercise route changes during load/drag/save, failed writes and external conflicts; the originating registered target cannot change and failures retain the correct draft while its editor is mounted.
- [ ] In production, confirm no editor UI, full-palette downloads, handles or authoring listeners on every route, and GET/POST `/api/dev/clutter` return 404 for default, About, detail and unknown page IDs. In development, unknown/traversal-like IDs and invalid page anchors must fail without writing files. Server registration alone chooses targets.
- [ ] Review the diff for unrelated changes, duplicated identity/state, scattered asset paths, global CSS leakage, unnecessary client boundaries and new abstractions. Run checks again only if fixes or unresolved failures warrant them.
- [ ] Stop every server/browser process started for verification. Record the rendered evidence and technical limitations separately from owner review or live-deployment claims.
- [ ] Present owner review with copy, storyboard derivative, desktop/mobile captures, confirmed links and any pending résumé item. Do not mark Phase 3 accepted/complete without all required content and explicit owner acceptance. Commit/deploy only under separate applicable authorization.

## Acceptance checklist — leave unchecked until actually satisfied

- [ ] Identity, current availability and concise skills framing are accurate and owner-reviewed.
- [ ] Contact paths are obvious and work without discovery or hover.
- [ ] Real résumé PDF is viewable/downloadable.
- [ ] Storyboard evidence has completed privacy review; canonical project links work.
- [ ] About feels like a customized profile, distinct from Home and less cluttered.
- [ ] Mobile reading order is clear; primary widths and accessibility/motion checks pass.
- [ ] Accepted Phase 2 and shared-shell behavior remain intact.
- [ ] Shared development editor is available on every current content route; per-page/detail placements save independently and production contains no authoring behavior.
- [ ] Technical evidence and remaining limitations are recorded accurately.
- [ ] Owner explicitly accepts Phase 3.

Return to the [Phase 3 reading guide](2026-10-12-phase-3-about-contact.md) for scope and source precedence. Technical verification alone does not close this phase.
