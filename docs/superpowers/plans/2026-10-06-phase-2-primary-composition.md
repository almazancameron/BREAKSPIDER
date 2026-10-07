# Phase 2 Primary Homepage Composition Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` if implementation is later requested. The owner intends to implement this tutorial manually; no agent implementation or delegation is requested.

**Goal:** Replace the homepage placeholder with the approved Spotlight, About/portrait, and Projects hierarchy.

**Status:** Complete and accepted (2026-10-07). The owner confirmed verification through local testing and live deployment.

**Architecture:** An async Server Component reads authored homepage settings and project records through the repository. Page-owned JSX and CSS establish the responsive composition. Small interactive controls arrive in later chunks.

**Tech Stack:** Installed Next.js/React/TypeScript, CSS Modules, existing `ContentImage` and `Link`. No dependencies.

**Spec:** [Phase 2 reading guide](2026-10-06-phase-2-homepage.md), [Prototype 04 inventory](../../breakspider_prototype_04_design_inventory.md), and [roadmap](../../breakspider_master_implementation_roadmap_v2.md#8-phase-2--homepage-production-implementation).

**Global constraints:** Follow the reading guide. Use four-space indentation. Preserve all Phase 1 files/behavior, the root main, and shared tokens. Use explicit draft identity copy and a media-pending Viscap treatment, as the owner requested.

**Review focus:** Browser checks below own title wrapping, media cropping, keyboard reachability, mobile order, and separation from the shorter accepted header.

## Implementation record — 2026-10-07

The owner approved the Phase 2 plans and subsequently requested agent implementation of this first chunk. Part 1 is complete and accepted after owner verification through local testing and live deployment. The remaining tutorial chunks have not been implemented.

The homepage now reads authored settings from `content/homepage.ts` through `getHomepageContent()`. Spotlight, About/portrait, and the overlapping project previews follow Prototype 04's hierarchy. Mobile uses the explicit Spotlight → About → Projects order. Identity and availability remain draft copy; Viscap uses the approved media-pending treatment. The creator portrait was copied unchanged from the approved prototype.

Owner-requested layout refinements keep the portrait beside the bio at tablet widths and reduce the desktop About footprint around 1600px. The bio widens gradually on larger screens, bringing the group closer to Spotlight while retaining space for future clutter.

One small implementation adjustment: `ContentImage` gained an optional `loading` prop so the immediately visible combat capture can load eagerly. Its default remains `lazy`, preserving all existing callers. No new dependencies or client components were added. The accepted splash, header, logo, profile, audio, root layout, and global tokens were not edited.

Production browser verification passed at 320, 390, 720, 760, 768, 1024, 1220, 1221, 1440, and 1920 CSS pixels: no horizontal overflow, missing visible images, or browser errors. The 720px check exercises the available width of a 1440px desktop at 200% zoom; it is a reflow check, not a claim that native browser zoom was exercised. Longer About copy remained clear of Projects. Canonical navigation, sequential keyboard focus, exposed focus outlines, reduced-motion preview stacking, profile Escape/focus return, sound toggle state, fresh/seen intro behavior, and replay/skip were checked. Automated audio checks cover toggle state; owner verification through local testing and live deployment is recorded above.

An independent review found a desktop caption focus outline obscured by Projects. The caption link now uses its content width, and the complete outline was verified in the browser. Responsive range queries also avoid overlapping rules at the compact and wide boundaries. The reviewer confirmed both corrections and reported no outstanding findings.

`npm run lint`, `npm run typecheck`, `npm run test` (20 existing tests across four files), and `npm run build` passed. No broad component tests were added. The tutorial instructions below remain available as the implementation and learning reference.

## Learn first: content, composition, and decoration

The Spotlight is the largest application-like work surface, with a combat capture crossing its right edge. About is an open profile fragment, not another card. Projects stages two overlapping pieces of work with distinct native colors. Those relationships should already read correctly before sprites are added.

A Server Component can await the content repository without shipping the repository itself to the browser. Keep `app/page.tsx` server-rendered. A CSS Module gives each class a local name, so homepage rules cannot accidentally resize the accepted header or an interior route. Read the installed server/client, CSS, images, and linking guides listed in the reading guide before editing.

**Files involved:**

| File | Responsibility |
| --- | --- |
| `lib/content/models.ts` | Add a small `HomepageContent` type, without changing existing types. |
| `content/homepage.ts` | Create: draft identity/Spotlight settings, current project slug, optional featured Familiar override, and homepage combat media. |
| `lib/content/repository.ts` | Add `getHomepageContent(): Promise<HomepageContent>`. |
| `app/page.tsx` | Replace the route placeholder with server composition. |
| `app/page.module.css` | Replace placeholder link-grid rules with homepage structure and local visual treatments. |
| `public/media/home/creator-portrait.png` | Copy the approved creator portrait for the About relationship. |

Read but do not change `app/layout.tsx`, `styles/tokens.css`, `components/ui/content-image.tsx`, and Phase 1 components. The current production combat and priority-builder files are already available. Inspect the approved portrait at `prototype/breakspider-nextjs-prototype/public/media/p04-creator-oc.png`; use that creator-owned portrait, rather than substituting a visitor avatar.

**Produces:** `getHomepageContent`, named layout classes `canvas`, `spotlight`, `about`, `projects`, `current`, `sketchbook`, `familiar`, `changelog`, `foundMap`, and `pile`. The last six classes are reserved for the following chunks. Create only the regions you render; do not add empty boxes.

## Task 1: Author the homepage settings

- [x] **Step 1 — FIRST EDIT: Add the homepage type to `lib/content/models.ts`.**

**Interface only — a complete type definition, not a component implementation:**

```ts
export type HomepageContent = {
    displayName: string;
    availability: string;
    email: string | null;
    introduction: string;
    aboutSummary: string;
    currentProjectSlug: string;
    featuredFamiliarSlug: string | null;
    spotlightCapture: ImageMedia;
    portrait: ImageMedia;
};
```

Use ordinary strings for the current text-led Spotlight. Its stable section and isolated body can be changed later; a multi-mode renderer for hypothetical videos/toys is unnecessary now.

- [x] **Step 2: Create `content/homepage.ts`, exporting `homepageContent` with `satisfies HomepageContent`.**

Set `displayName` to `[Your Name]`, `availability` to `[Availability]`, `email` to `null`, `currentProjectSlug` to `one-night-familiar-fight`, and `featuredFamiliarSlug` to `null`. Use the prototype introduction: `I build connected applications, game systems, and interfaces with a few things worth poking at.` Use a short draft About summary based on the prototype. Availability is visibly draft; do not claim the visitor/creator is currently online.

Reference `/media/projects/pixel-pugilists/combat.png` for `spotlightCapture` with ONFF alt text. Read its actual dimensions before filling `width`/`height`; do not guess them. Open the image URL in the dev browser and read `document.querySelector("img").naturalWidth` and `.naturalHeight` in DevTools. Reference the copied portrait destination and likewise record its actual dimensions. Keep draft copy in this one authored record so replacing identity does not require layout edits. Null email means omit the email row; no fake `mailto:` link.

- [x] **Step 3: Copy the portrait and add the repository read.**

**Complete copy commands — run from the repository root:**

```powershell
New-Item -ItemType Directory -Force public/media/home
Copy-Item -LiteralPath 'prototype/breakspider-nextjs-prototype/public/media/p04-creator-oc.png' -Destination 'public/media/home/creator-portrait.png'
```

Import the authored record/type into `lib/content/repository.ts`, then append:

**Complete implementation — this one repository function:**

```ts
export const getHomepageContent = async (): Promise<HomepageContent> => {
    return { ...homepageContent };
};
```

Do not copy unreviewed Viscap screenshots. The existing Viscap mark may accompany its pending-media slot; it cannot masquerade as a product screenshot.

**Learning checkpoint:** Explain why `currentProjectSlug` is public routing configuration while `Project.id` may still be `pixel-pugilists`.

## Task 2: Build the professional spine

- [x] **Step 1: Replace `RoutePlaceholder` and its all-routes list in `app/page.tsx`.**

Keep `ReplayIntroButton` near the end. Change `Home` to an async component. Read homepage settings and projects together:

**Worked fragment — replace the function's data-reading portion, not the whole file:**

```tsx
const [home, projects] = await Promise.all([
    getHomepageContent(),
    getProjects(),
]);
const currentProject = projects.find(
    (project) => project.slug === home.currentProjectSlug,
) ?? null;
```

Import those functions from `../lib/content/repository`. Render one `div` with `styles.canvas`, one `h1`, and sibling named sections. The root layout already supplies the main landmark. DOM order is Spotlight, About, Projects; keep the portrait inside About so its mobile reading relationship is natural. Later chunks append the remaining sections in the reading guide's order.

- [x] **Step 2: Build the Spotlight.**

Give it `aria-labelledby="home-spotlight-title"`. Include a small window bar, draft availability/name, `Full-stack software engineer.` and `Game developer.` in the single h1, authored introduction, `See projects` → `/projects`, and `About + contact` → `/about`. Highlight the game-developer line in pink, and use mono labels for `WEB APPS`, `GAME SYSTEMS`, `INTERACTIONS`.

Render the combat capture in a separate positioned figure inside Spotlight, retaining its native colors. Start with an `Open ONFF project` link below it, using the selected `currentProject.slug` for its href, or `/projects` with `Open projects` if the configured project is missing. Chunk 3 replaces that control with inspection; every intermediate state has a working destination. Title bar imitation minimize/close glyphs are decorative spans, not dead buttons.

- [x] **Step 3: Build About and Projects.**

About contains heading, name/summary, optional real email, and a direct `/about` path. Use `Profile + contact` until a résumé actually exists; do not promise a download from a nonexistent path. The linked portrait goes to `/about` and visually bridges the Spotlight/About boundary on wide desktop.

Projects has its own framed work surface and explicit `All projects` link. Inside it, render the Viscap and ONFF preview links separately, using `project.slug` for each href. ONFF uses its actual `heroMedia` (the priority builder). Viscap uses a blue/dark surface labelled `Viscap / platform` and `Media pending review`, retaining its summary and working link. Maintain the two distinct angled/overlapping preview silhouettes. Guard absent project records with a direct `/projects` link and clear pending text; never dereference missing data.

Use `ContentImage` for available media, with meaningful alt text and display-specific `sizes`. Do not nest links or put an inspection button inside a project link.

## Task 3: Compose the field in local CSS

- [x] **Step 1: Establish normal flow first, then wide desktop relationships.**

Use a mobile-first grid with `min-width: 0` on children, local dark radial washes and low-contrast grid, and sufficient room for focus outlines. On wide desktop, use twelve columns: Spotlight spans columns 1–8; About sits in 10–12; Projects occupies the right field around columns 8–12 below About, overlapping the Spotlight's lower-right edge selectively. Keep About/portrait outside Spotlight's readable text area. Use page-owned grid rows/gaps and modest overlap margins, rather than the prototype's fixed 1469px canvas height.

**Worked fragment — starting structure only; it does not implement the desktop composition:**

```css
.canvas {
    position: relative;
    isolation: isolate;
    display: grid;
    gap: 2rem;
    padding: 2.5rem clamp(1rem, 3.6vw, 4rem) 3rem;
    min-width: 0;
}

.canvas > section {
    min-width: 0;
}

@media (min-width: 76.25rem) {
    .canvas {
        grid-template-columns: repeat(12, minmax(0, 1fr));
        column-gap: 1.25rem;
    }
}
```

The values are a tuning starting point, not new approved coordinates. Match silhouettes and hierarchy against the captures. At 1440, the reference Spotlight is about 62% of the canvas, with the Projects surface around 37%. At 1920 use the field width intentionally; do not cap the whole page at the placeholder's 72rem. Let content determine row height and adjust overlap if real copy grows.

- [x] **Step 2: Implement each material treatment.**

Spotlight has cream headline, cyan capture frame and offset pink shadow. About remains frameless. Projects is a work-evidence window; previews retain ONFF orange/cyan and Viscap blue. Position the capture against Spotlight, not the viewport. Include enough Spotlight body padding/width to keep text out of its overlapping media. On narrow desktop/tablet, reduce or remove overlap before it causes collisions.

Raise each overlapping project preview on both `:hover` and `:focus-visible`, keeping its label and outline exposed above the other preview. Apply reduced-motion rules to any lift/transition while retaining the stacking change. The full project destination must remain clear without either interaction.

- [x] **Step 3: Recompose compact widths.**

Use the shared `47.5rem` compact threshold and an earlier wide-layout threshold around `76.25rem`. Below the wide threshold, use a simpler content-flow arrangement; below `47.5rem`, a single explicit column. Put the capture in flow below Spotlight copy, the portrait beside/below About, and Projects next. Remove desktop translate/negative margins where they no longer fit. Use type clamps and wrap the longer ONFF title; don't force the old two-line game name.

Only game sprites receive `image-rendering: pixelated`. Product captures and the illustrated portrait stay crisp. Inspect the full frame with `object-fit: contain` in later dialogs; preview crops are acceptable only while recognizably showing the work. Do not solve horizontal overflow by hiding the entire interactive canvas.

## Browser checkpoint before chunk 2

- [x] Run `npm run dev`. After entering/skipping the accepted intro, inspect `/` at 1440×900, 1920×1080, 1024×900, 768×900, 390×844, and 320×740.
- [x] Spotlight dominates; About/contact and both project paths are apparent without hovering. Compare viewport captures. Viscap pending media is the intentional exception.
- [x] Tab through every link: outlines remain visible despite overlap. Both project links reach canonical routes. Replay intro works and returns to the homepage with these regions intact.
- [x] At mobile width, confirm Spotlight → About → Projects, legible capture, no clipped ONFF title, and no horizontal page scrollbar. Repeat at 200% zoom with longer draft copy.
- [x] Navigate to an interior route and back. Header/logo/profile/audio remain the accepted implementation; homepage CSS does not leak.
- [x] Run `npm run typecheck` and `npm run lint`. Resolve errors caused by this chunk. No new automated test is needed for these static layout changes.

**Learning checkpoint:** Identify which offsets express structural media overlap and which future offsets will belong in decorative placement data. Confirm that changing identity copy does not require changing the page's data access.

**Finish:** Save your own small commit when the browser checkpoint passes. The next tutorial adds current activity to this established field.
