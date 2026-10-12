# Phase 3 Part 2 — Profile and Contact Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` only if implementation is later requested. This tutorial authorizes no implementation, delegation, commit, or deployment.

**Status:** Planned; not implemented or accepted.

**Goal:** Replace the About placeholder with its professional/personal identity, portrait, contact file and concise skills framing.

**Architecture:** Server-rendered route composition and local CSS, inside the existing root main. Ordinary links supply the required interactions; the shared shell retains profile/audio/navigation behavior.

**Tech Stack:** Existing Next.js `Link`/metadata, `ContentImage`, TypeScript and CSS Modules.

**Spec and global constraints:** [Reading guide](2026-10-12-phase-3-about-contact.md) and [Part 1](2026-10-12-phase-3-content-and-media.md).

**Review focus:** Long email/copy, missing résumé, semantic reading order, focus and contact discoverability.

## Learn first

The prototype's desktop identity is open, while the contact object has a frame because it is a contact file. The portrait bridges those regions. Reproduce those relationships with grid/flex and local positioning; do not copy the fixed-height, absolute-coordinate canvas or prototype header.

Read the installed server/client, layout, CSS, navigation and metadata guides. Reinspect the desktop/mobile captures and `app/layout.tsx` before adding markup.

## Task 1: Render the profile and professional paths

**Files:** Modify `app/about/page.tsx`; create `app/about/page.module.css`.

**Consumes:** `getHomepageContent(): Promise<HomepageContent>`, `getAboutContent(): Promise<AboutContent>`, `ContentImage({ media, className?, sizes?, loading? })`.

**Produces:** One About composition inside the existing main; sections `about-title`, `contact-title`, `practice-title`, and anchor `contact`. Page-owned classes `page`, `routeLine`, `identity`, `portrait`, `contact`, `practice` establish Part 3's attachment regions.

- [ ] Replace the placeholder with an async default `AboutPage` that reads homepage and About content together. Add server metadata with a descriptive title such as `About + Contact — Cameron Almazan | Breakspider` and a factual description.
- [ ] Render a route line/back-home link, one h1, accepted name/availability, explicit full-stack software engineer / game developer identity, drafted introduction, a `#contact` link and `/projects` link. Do not claim live online presence.
- [ ] Render the accepted portrait, 1170×1344, through `ContentImage`. Give it an appropriate responsive `sizes` value and eager loading if it is immediately visible. Keep it frameless and illustrated; do not substitute a visitor avatar or pixelate it.
- [ ] Render the CONTACT.TXT section with its own h2, visible `mailto:` address, GitHub and LinkedIn anchors. Keep imitation window glyphs decorative. Default external links to ordinary same-tab navigation; no new-window machinery is required.
- [ ] When `resumeUrl` is non-null, offer a normal view link and a download link to the same PDF. When null, render readable `Résumé pending` text with no link and label the primary jump `Contact`, avoiding a false download promise.
- [ ] Render the practice h2, paragraph and skill labels from About content. Keep markup readable without decoration or JavaScript and preserve the DOM order identity → contact → practice.

## Task 2: Compose the desktop room and compact reading order

**Files:** `app/about/page.module.css` only.

- [ ] Establish the navy background, subtle route-local grid/washes, cream/pink oversized heading, lime status/action, and restrained cyan/orange labels using existing tokens where appropriate. Avoid global body overrides and importing homepage CSS.
- [ ] Use wide desktop grid regions for identity/portrait and the right contact window; retain intentional dark gaps. Let copy determine height. Reserve below them the skills and evidence row that Part 3 fills.
- [ ] Recompose narrow desktop/tablet before portrait/contact collisions occur. Use the shared 47.5rem compact convention; the prototype's 700px threshold is historical rather than a mandatory production boundary.
- [ ] On mobile, put intro/actions first, portrait next, then the full contact panel and skills. Allow real email and labels to wrap with `min-width: 0` and appropriate wrapping rules; no forced nowrap or whole-page overflow masking.
- [ ] Keep hover enhancement optional, focus outlines fully visible, and targets usable on touch. Apply reduced-motion behavior to route-local transforms/transitions.

## Browser checkpoint before Part 3

- [ ] Inspect at 1440 and 1920 desktop, 1024 intermediate, and 390/320 mobile. Identity and contact remain obvious; copy/portrait/control safe areas do not collide.
- [ ] Check native 200% zoom where available; if testing only a reduced viewport, describe it as reflow rather than native zoom.
- [ ] Tab through the skip link, navigation and professional links; activate `#contact`, email and social destinations. Check the contact anchor is visible and target controls remain keyboard reachable.
- [ ] Check real PDF view/download if available; otherwise verify no broken résumé link and record the unresolved acceptance item.
- [ ] Confirm descriptive route title, one main landmark, one h1, sensible headings, no console/hydration errors, and direct `/about` entry without splash.
- [ ] Run `npm run lint` and `npm run typecheck`; fix route-local failures before proceeding.

Next: [Part 3 — Evidence and decoration](2026-10-12-phase-3-evidence-and-decoration.md).
