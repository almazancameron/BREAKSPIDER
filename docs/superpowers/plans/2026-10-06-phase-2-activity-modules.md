# Phase 2 Homepage Activity Modules Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` if later requested. This tutorial is for manual implementation by the owner; no implementation or delegation is requested now.

**Goal:** Add current work, latest Sketchbook, a random initial Familiar with explicit cycling, and an honest site changelog.

**Status:** Implemented (2026-10-07), awaiting owner verification and acceptance. The owner approved this plan and requested agent implementation. Part 1 remains accepted; later chunks remain planned.

**Architecture:** Read records in the server page and retain ordinary sections in its composition. A small Familiar client component owns cycling. A browser-only module retains one seed for the loaded document, later reused by supplemental clutter.

**Tech Stack:** Existing Next.js/React/TypeScript/CSS Modules/content repository; no packages.

**Spec:** [Reading guide](2026-10-06-phase-2-homepage.md), [Prototype 04 inventory](../../breakspider_prototype_04_design_inventory.md), [homepage rotation](../../breakspider_site_architecture.md#6-homepage-randomization-and-rotation).

**Global constraints:** Four spaces, Phase 1 preserved, repository-owned content, no invented game mechanics or online status. Keep the mobile sequence and a direct Familiar catalogue link.

**Review focus:** Empty feeds, one Familiar, stale draft labels, hydration, and overflow have explicit checks below.

## Implementation record — 2026-10-07

The server page now reads the activity feeds through the existing repository. Current work uses the selected project record. The owner subsequently requested removal of its decorative sprite to avoid repeating the Familiar module beneath it. Following owner approval, Sketchbook uses a compact framed feed of up to ten newest records, with UTC dates and separate long-entry and short-note destinations. The scrollable interior supports keyboard focus; the directory link stays outside it. Public Sketchbook game labels now use ONFF without changing internal IDs, relationships, slugs, or media paths. The Familiar module exposes separate cycling, detail, and catalogue controls. The roaming Ashwing link is anchored above Projects on wide desktop and omitted on compact layouts. Changelog displays the authored foundation record and UTC date; `See updates` appears only when older entries or additional notes exist.

Owner-requested desktop refinements keep Familiar directly beneath Working on, with its identity aligned to current work and its sprite on the right. Sketchbook is offset 12px down and 12px right from its previously aligned position. Its new framed feed spans the lower grid rows so it does not push Familiar down. Browser geometry confirmed Familiar retained its exact vertical position at 1221, 1440, 1600, and 1920px. Compact layouts retain normal reading order. Final feed captures passed at ten widths from 320px to 1920px with no broken images, horizontal overflow, or production console errors. Native Chrome verified both authored post destinations and PageDown scrolling in the focused feed; lint and the final production build passed.

Further owner-requested refinements match the Sketchbook frame exactly to Projects' border, navy body/header, and layered black/pink shadow. The feed extends 32px to the right only in wide desktop layouts, allowing Projects to overlap its edge by about 12px. Working on is text-only and uses its full column width. Familiar's description reservation and desktop link heights are tighter, and its desktop width is capped to bring the sprite closer to its text; mobile links retain 44px targets. Responsive Chrome captures at ten widths from 320px to 1920px, computed frame matching, canonical links, and keyboard feed scrolling passed. Lint and the final production build passed.

After adding git-history changelog entries, opening `See updates` exposed a shared-grid sizing issue: spanning panels distributed extra height across both activity rows, moving Familiar. The wide desktop grid now gives the lower activity row a flexible `minmax(0, 1fr)` track, so current work determines the row above Familiar while expanded panels grow below it. Browser checks clicked the disclosure at ten widths from 320px to 1920px and measured zero Familiar movement at every width; Replay moved down below the expanded changelog. Production build, overflow checks, and keyboard feed scrolling passed. All test processes were stopped.

Familiar randomness is restored after deterministic markup hydrates. A browser-memory seed survives SPA navigation; no new storage keys or dependencies were added. A valid featured slug controls the initial choice, while explicit cycling remains available. The accepted identity, primary panel positions, responsive About refinements, Phase 1 components, root layout, and global styles were preserved.

Browser captures and interaction checks covered widths from 320px to 1920px, including 760/768 and 1220/1221 boundaries, 1600px, and the 720px reflow equivalent of a 1440px viewport at 200% zoom. Native browser zoom itself was not exercised. Pointer and keyboard cycling kept name, sprite, tags, and detail link together; initial selection was silent, enabled cycling used the accepted UI sound, and mute prevented playback. SPA navigation retained the browser document and seed and restored the same initial choice. Profile Escape/focus return, replay/skip, reduced motion, canonical links, and mobile reading order passed. Production console checks reported no errors or hydration warnings.

Temporary repository fixtures verified empty feeds, a missing current project, one Familiar, invalid and valid featured overrides, a newest short note, extra changelog notes, older updates, and their links. Expanded updates remained in flow on desktop, mobile, and 720px reflow. The original repository was restored exactly; no test content remains in application files.

`npm run lint`, `npm run typecheck`, `npm run test` (24 tests across five files), and `npm run build` passed. Four focused seed tests were added and observed failing before the utility existed, then passing. Ruling: these meaningful seed-lifetime/range tests complement the approved browser-first tutorial; broad component tests were not added, and seeded placement tests remain in chunk 6. Browser plugin and cached Playwright were unavailable, so verification used the repository's existing native Chrome DevTools approach without adding packages.

An independent read-only code and capture review reported no substantive findings. Development-mode navigation still emits the pre-existing Next.js warning about global `scroll-behavior: smooth` without the optional `data-scroll-behavior` attribute; the installed Next.js 16 upgrade guide documents that opt-in. The accepted root layout and scroll behavior were left unchanged. Earlier QA stream failures were traced to the test's broad deterministic crypto stub also duplicating Next.js dev request IDs; scoping it to the homepage seed resolved those failures without application changes.

All servers and browser processes started for testing were stopped before handoff. The tutorial below remains the implementation and learning reference. Owner local/live acceptance has not yet been recorded for this chunk.

## Learn first: give each activity its own treatment

Current work is orange type plus a Familiar sprite, Sketchbook is a compact framed recent-post feed (an owner-approved refinement to the prototype fragment), Familiar is sprite plus identity, and changelog is a small `UPDATE.TXT` window. Their differing treatments make the page feel accumulated. Keep current work and Familiar frameless; the owner-approved Sketchbook frame borrows the existing panel materials without making every activity identical.

The repository already sorts posts and changelog newest-first. Take the first ten posts for Sketchbook and the first changelog record rather than introducing another sort. A **hydration mismatch** occurs when the first browser render differs from the server HTML. Random selection must happen after that first render, never during rendering or module import. The initial server-visible Familiar stays useful while the browser starts.

Read the installed server/client and boundary guides before editing. Complete [primary composition](2026-10-06-phase-2-primary-composition.md) first.

| File | Action |
| --- | --- |
| `app/page.tsx` | Modify: read feeds and place new sections in DOM order. |
| `app/page.module.css` | Modify: page-owned positions and materials for these sections. |
| `components/home/home-familiar.tsx` | Create: initial choice, cycling, detail/catalogue links. |
| `components/home/home-familiar.module.css` | Create: sprite-led responsive presentation. |
| `lib/home/home-session.ts` | Create: one browser-memory seed and seeded-number function. |
| `content/sketchbook.ts` | Change only public-facing old game labels to ONFF. |

**Consumes:** `HomepageContent.currentProjectSlug`, `featuredFamiliarSlug`, current project from chunk 1, `getFamiliars`, `getSketchbookPosts`, `getChangelogEntries`.

**Produces:** `HomeFamiliar({ familiars, featuredSlug })`; `getHomeSessionSeed(): number`; `createSeededRandom(seed: number): () => number`, returning values in `[0, 1)`.

## Task 1: Complete the structural field

- [x] **Step 1 — FIRST EDIT: Extend the page's existing `Promise.all` with Familiar, Sketchbook, and changelog reads.**

Keep reads in `app/page.tsx`, not in client effects. Name the resulting arrays `familiars`, `posts`, and `changelog`. Derive `recentPosts = posts.slice(0, 10)` and `latestUpdate = changelog[0] ?? null`. Use existing project selection for current work; do not maintain a second project title/summary.

- [x] **Step 2: Render Current Project after Projects.**

Use `Working on`, the ONFF title, summary, and its canonical project link. Keep this region containerless and text-only, with orange title language. The owner requested removal of the neighboring sprite because the separate Familiar module already provides that relationship. Allow three-line wrapping for `One Night Familiar Fight` rather than copying the old game name's dimensions.

- [x] **Step 3: Render the recent Sketchbook feed next.**

Use a small framed section with a heading, scrollable interior capped at 19rem, and an always-visible directory link beneath it. Render up to ten newest posts as articles with their authored UTC date, title, excerpt, tags, and a real destination. Long entries link to their canonical detail route; short notes link to /sketchbook because they live in the directory feed. An empty feed displays `No Sketchbook entries yet`. Give the scroll area a labelled region, `tabIndex={0}`, and a visible keyboard focus outline so arrow/PageDown scrolling works. On wide desktop span rows 3 through 4 to preserve Familiar's position despite the taller frame; retain normal flow on smaller screens.

- [x] **Step 4: Render the Familiar slot and changelog.**

Put Familiar before changelog. Changelog shows latest version, title, date, and the first one to three notes. Use native `details` labelled `See updates` for the remaining authored entries; include `latestUpdate.links` when available. There is no dedicated changelog route, and `/sketchbook` does not render this changelog data. Do not create a broken `See updates` link copied from the prototype. Empty changelog means `No site updates yet` without an unusable disclosure.

Style the `UPDATE.TXT` framing locally. Format dates with a fixed locale and UTC, as the current Sketchbook preview does, so server/browser dates agree. Current content is a foundation entry; changing it is the owner's later authoring choice.

**Learning checkpoint:** Explain why a long-post link and a short-note link differ, and why a public slug cannot be derived from an internal project ID.

## Task 2: Keep random selection stable and understandable

- [x] **Step 1: Create `lib/home/home-session.ts`.**

Do not add `use client` here; the module is a utility imported only by client consumers. Keep a module-local `let seed: number | null = null`. Create it only when a mounted client calls the function, using `window.crypto.getRandomValues`. Throw a clear error if accidentally called on the server; it must never be called during rendering. Never store it in localStorage/sessionStorage. Full refresh creates a new JS document/module; SPA route navigation keeps it.

**Complete implementation — this utility file:**

```ts
let sessionSeed: number | null = null;

export const getHomeSessionSeed = (): number => {
    if (typeof window === "undefined") {
        throw new Error("Read the homepage seed after browser hydration.");
    }
    if (sessionSeed === null) {
        sessionSeed = window.crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return sessionSeed;
};

export const createSeededRandom = (seed: number): (() => number) => {
    let value = seed >>> 0;
    return () => {
        value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
        return value / 4294967296;
    };
};
```

This little generator is for decoration, not security. Its unsigned 32-bit arithmetic gives repeatable values. Each consumer creates its own generator from the saved seed; do not share one advancing generator between Familiar and clutter, or cycling could change the decoration sequence.

- [x] **Step 2: Implement `HomeFamiliar` as a Client Component.**

**Interface only — define the real component body separately:**

```tsx
type HomeFamiliarProps = {
    familiars: Familiar[];
    featuredSlug: string | null;
};
```

Import `Familiar` from `../../lib/content/models`. Initial state is the valid featured index or zero. In one mount effect, if no valid featured override exists and the list is nonempty, use a freshly constructed generator from `getHomeSessionSeed()` to select `Math.floor(random() * familiars.length)`. Reserve the sprite footprint/name area so selection does not move neighboring regions. The same content list and seed yield the same initial choice on return navigation. User cycling is local state and may reset on leaving; only the seed/layout lifetime is session-wide.

Render a sprite button labelled `Show another Familiar`, current name/tags/description, a direct detail link, and `Meet the Familiars` → `/familiars`. Use a functional state update for cycling. One Familiar disables the cycle button; zero renders a directory fallback without a sprite button. Avoid modulo by zero. A valid featured override chooses the initial entry, but cycling is still allowed.

The installed lint configuration flags synchronous state updates inside effects. Follow the existing visitor/intro restoration pattern: add one narrowly scoped `react-hooks/set-state-in-effect` suppression immediately above the post-hydration selection update, explaining that browser-only randomness is restored after deterministic server markup. Do not disable the rule globally or add an external state library just for this effect. Put all hooks before an empty-list early return, so hook order stays consistent.

Request `uiClick` through `useUISound()` only on an enabled cycle action. Hover/focus/initial random selection remain silent. The catalogue link always works independently of cycling. Existing `FamiliarPreview` is not a drop-in replacement: its linked image does not provide the prototype's separate cycle button.

**Worked fragment — cycling handler only:**

```tsx
const showNext = () => {
    if (familiars.length < 2) return;
    playUI("uiClick");
    setIndex((current) => (current + 1) % familiars.length);
};
```

- [x] **Step 3: Style sprite/text and place the new regions.**

Keep pixel rendering confined to sprites. In wide desktop CSS, Current Project occupies the lower-left area under Spotlight, Sketchbook sits nearer the middle, Familiar below current work, and changelog lower-right. Use the reference's uneven density and readable gaps, with normal-flow row sizing. On compact screens reset desktop placements and preserve DOM order. Use actual content widths before the next chunk adds found objects.

Also retain the prototype's separate roaming Familiar link above Projects on wide desktop: choose Ashwing from the authored roster, link directly to `/familiars`, and show `WILD ENCOUNTER`. Keep its little hover lift available on keyboard focus, remove motion under reduced motion, and hide this redundant extra link at compact widths. It is a functional link with a reserved footprint, not a random/decorative sprite. Mark it as a protected exclusion in chunk 4; the main cycling Familiar remains in the mobile reading sequence.

## Browser checkpoint before chunk 3

- [ ] Check all widths from chunk 1 and full-page captures. Current work and Familiar are frameless; Sketchbook is a compact framed feed with a slight desktop offset. Check keyboard scrolling, long/short destinations, the empty state, and the ten-post limit; its directory footer remains outside the scroll area.
- [ ] Cycle repeatedly by click and keyboard: name, sprite, tags, and detail href remain one record. Catalogue works before cycling; mute prevents feedback. Initial selection is silent.
- [ ] Roaming Familiar links directly to the catalogue, reacts to focus as well as hover, and does not obscure Projects; compact screens retain the main Familiar module.
- [ ] Reload and watch the console: no hydration warnings. Navigate away/back with `Link`; the initial Familiar matches for the same roster/seed. Hard refresh may choose the same Familiar by chance; it is not a guaranteed alternation.
- [ ] Temporarily inspect empty feeds, one Familiar, invalid featured slug, and a short newest post using local draft data, then restore it. Every state has a useful link and no crash. Do not leave test records in content.
- [ ] Expand `See updates` on mobile and at 200% zoom. It remains in flow and does not overlap Map/pile regions when they are added.
- [ ] Run lint/typecheck. Existing repository tests already cover feed ordering; no new presentation tests are required. Chunk 6 adds meaningful seeded-layout tests.

**Learning checkpoint:** Explain why module memory survives SPA navigation but component state may not, and why two seeded consumers should not share an advancing generator.

**Finish:** Commit this readable activity layer once browser checks pass. Artifact inspection is the next independent chunk.
