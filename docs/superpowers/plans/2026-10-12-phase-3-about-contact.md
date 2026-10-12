# Phase 3 About + Contact Implementation Plan — Reading Guide

> **For agentic workers:** Use `superpowers:executing-plans` only when the owner requests implementation. This reading guide and its four tutorials authorize no implementation, delegation, commit, or deployment.

**Status:** Planned, not implemented or accepted. Phase 2 remains complete and owner-accepted on October 10, 2026.

**Goal:** Translate the approved About prototype into a distinct production profile and contact room, preserving accepted homepage and shared-shell behavior.

**Architecture:** Keep `/about` server-rendered with typed authored content read through the existing repository. Reuse the root shell, identity values, media primitives, and project records; keep About composition and deterministic decoration in page-owned JSX/CSS. Do not expand the homepage editor or refactor unrelated architecture.

**Tech Stack:** Installed Next.js 16.3.6, React 19.2.8, TypeScript, CSS Modules, existing Vitest and browser verification. No new dependencies.

**Spec:** [Phase 3 and production engineering principles](../../breakspider_master_implementation_roadmap_v2.md), [About prototype summary](../../breakspider_prototypes_final_summary.md#about--contact--about), [About architecture guidance](../../breakspider_site_architecture.md#15-about--contact), [reuse map](../../breakspider_prototype_reuse_map.md), and the owner decisions below.

## Recommended order

Complete each part's checkpoint before advancing. Intermediate progress does not constitute Phase 3 acceptance.

| Part | Tutorial | Reviewable result |
| --- | --- | --- |
| 1 | [Content and media](2026-10-12-phase-3-content-and-media.md) | Typed content contract, copy draft, confirmed destinations, and explicit reviewed/pending media and résumé states. |
| 2 | [Profile and contact](2026-10-12-phase-3-profile-and-contact.md) | Identity, portrait, CONTACT.TXT panel, skills, metadata, and working professional paths. |
| 3 | [Evidence and decoration](2026-10-12-phase-3-evidence-and-decoration.md) | Distinct project captures, Familiar satellite, sparse authored accents, and complete mobile recomposition. |
| 4 | [Verification and review](2026-10-12-phase-3-verification-and-review.md) | Responsive/accessibility/interaction evidence, Phase 2 regressions, and an honest owner-review handoff. |

The first production edit belongs to Part 1, Task 1. Reading this guide and preparing plans require no application changes.

## Decisions settled with the owner

- Carry forward the accepted homepage identity: Cameron Almazan, `almazancameron@gmail.com`, `OPEN TO WORK`, and the illustrated creator portrait.
- GitHub: `https://github.com/almazancameron`.
- LinkedIn: `https://www.linkedin.com/in/almazancameron`.
- Draft concise About introduction and skills/practice copy from existing records for owner review. Do not invent employment history, years of experience, technologies, or job preferences.
- Use the Viscap storyboard capture, following the prototype, after privacy review.
- The owner will add the résumé PDF. Recommended location is `public/resume.pdf`, served at `/resume.pdf`; this path is a recommendation, not an owner-supplied file.
- No contact form for v0.1.

## Read first and inspect visually

1. Repository `AGENTS.md`, `README.md`, roadmap section 2.5 and Phase 3.
2. [Breakspider design skill](../../../.agents/skills/breakspider-design/SKILL.md) and all three references: visual language, responsive/clutter, sources/assets.
3. Design philosophy, site architecture About section, final prototype summary, and reuse map linked above.
4. `prototype/breakspider-nextjs-prototype/components/AboutPage.tsx` and `AboutPage.module.css`.
5. About [desktop viewport](../../../screenshots/about-desktop-1440x900.png), [desktop full page](../../../screenshots/about-desktop-1440x900-full.png), [mobile viewport](../../../screenshots/about-mobile-390x844.png), and [mobile full page](../../../screenshots/about-mobile-390x844-full.png).
6. [Inspiration manifest](../../breakspider_inspiration_manifest.md), [reference analysis](../../reference-analysis.md), and actual images `docs/inspo_screenshots/cloudland/desktop-about-window.jpg` and `docs/inspo_screenshots/ralts/desktop-ralts-about.PNG`.
7. [Accepted authored-homepage record](../../design/home-clutter-reassessment-2026-10-10/implementation-notes.md), [direct-save editor record](../../design/home-clutter-reassessment-2026-10-10/editor-save-implementation-notes.md), and [current clutter guide](../../CLUTTER_POSITIONING.md).

Cloudland informs the contact window and Ralts informs illustrated personal identity. The approved About composition takes precedence over historical inspiration. Prototype 05's About CSS is identical to the preserved prototype's; its TSX differs only in the imported homepage shell. It establishes no separate About direction.

## Installed Next.js documentation

Before implementation, read the relevant installed files under `node_modules/next/dist/docs/`:

- `01-app/01-getting-started/03-layouts-and-pages.md`: preserve root layout ownership and route-local composition.
- `01-app/01-getting-started/05-server-and-client-components.md` and `01-app/02-guides/server-and-client-boundary.md`: server content reads; small client boundaries only when browser behavior requires them.
- `01-app/01-getting-started/11-css.md`: locally scoped CSS Modules; avoid route styling that leaks globally.
- `01-app/01-getting-started/12-images.md` and `01-app/03-api-reference/02-components/image.md`: intrinsic dimensions, truthful `sizes`, and appropriate lazy/eager loading. `priority` is deprecated; do not add preload machinery without evidence.
- `01-app/01-getting-started/04-linking-and-navigating.md`: internal `Link` navigation and client transitions.
- `01-app/01-getting-started/14-metadata-and-og-images.md`, `01-app/03-api-reference/03-file-conventions/public-folder.md`, and `03-architecture/accessibility.md`: route title, public PDF/media paths, and route announcements.

## Current implementation and planned ownership

`app/about/page.tsx` is a `RoutePlaceholder`. `app/layout.tsx` already owns the single `main#main-content`, skip link, header/footer, visitor and intro providers, and route tracking. Primary navigation recognizes About. Native `Dialog`, `useUISound`, global focus/reduced-motion rules, and `ContentImage` already exist.

| File | Planned responsibility |
| --- | --- |
| `lib/content/models.ts` | Add `AboutContent` and `AboutProjectEvidence` types only. |
| `content/about.ts` | New authored About copy, professional destinations, optional résumé, selected evidence and Familiar slug. |
| `lib/content/repository.ts` | Add `getAboutContent(): Promise<AboutContent>`. |
| `app/about/page.tsx` | Server reads, metadata, semantic profile/contact/evidence composition. |
| `app/about/page.module.css` | New route-owned materials, overlap, responsive layout and decoration. |
| `public/media/about/viscap-storyboard.png` | Reviewed production derivative; source stays in `assets/`. |
| `public/resume.pdf` | Owner-supplied PDF when available. |
| `tests/content-repository.test.mjs` | Small meaningful About-content boundary check if needed; no broad component suite. |
| `docs/design/phase-3-about-contact/implementation-notes.md` | Future implementation/verification record, with pending items explicit. |

Identity remains owned by `content/homepage.ts` and read through `getHomepageContent()` initially. This avoids duplicating accepted values or migrating homepage ownership in this phase. Read project/Familiar records through existing repository APIs; About owns its selected presentation media.

## Global constraints

- Use four-space indentation for changed code and code examples. Do not reformat unrelated files.
- Preserve accepted Phase 2 copy, layout, authored placements, folder palette, interactions, and direct-save Done behavior. Procedural clutter stays retired.
- Preserve root shell, intro bypass for direct interior visits, navigation, profile, audio, visitor state, and storage ownership.
- Treat About as its own room: frameless identity, bridging portrait, distinct contact file, concise skills, staggered evidence, and quieter margins than Home.
- No nested main/header/footer, prototype storage/audio/modal code, fake online status, universal page/card renderer, new backend, collectible implementation, or homepage editor extension.
- Keep professional information visible without hover or discovery. Decorative window controls are inert spans, not dead buttons.
- Missing résumé and unreviewed Viscap media may remain explicitly pending during development; they cannot be presented as working downloads or approved media.
- Part completion and successful tests do not imply owner acceptance, deployment, or Phase 3 completion.

## Review focus

| Condition | Required behavior and owning checkpoint |
| --- | --- |
| Real email, long copy, 320px width, 200% zoom | Wrap without clipping or covering controls; Parts 2 and 4. |
| Missing résumé or unreviewed storyboard | No broken/fake download or unreviewed image; Parts 1, 2 and 4. |
| Overlapping project links and decorations | Labels and complete focus outlines remain exposed; Parts 3 and 4. |
| Reduced motion with GIF accents | Still alternatives or static choices; CSS alone cannot stop GIF playback; Parts 3 and 4. |
| Home/About navigation and development/production differences | Preserve intro/profile/audio and home authoring; production authoring endpoint stays 404; Part 4. |

## Remaining decisions and acceptance

Owner review of the copy draft, résumé file delivery/path confirmation, and storyboard privacy treatment remain open. Exact accents and portrait caption are visual-review choices; do not retain `GITHUB AVATAR` or `still editing this profile` merely because the prototype used them.

Phase 3 acceptance requires obvious contact paths, a viewable/downloadable real résumé, a customized profile composition, less clutter than Home, clear mobile reading order, reviewed evidence, and owner approval. No checkbox in these plans is pre-completed.
