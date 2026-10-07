# Phase 2 Homepage Activity Modules Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` if later requested. This tutorial is for manual implementation by the owner; no implementation or delegation is requested now.

**Goal:** Add current work, latest Sketchbook, a random initial Familiar with explicit cycling, and an honest site changelog.

**Architecture:** Read records in the server page and retain ordinary sections in its composition. A small Familiar client component owns cycling. A browser-only module retains one seed for the loaded document, later reused by supplemental clutter.

**Tech Stack:** Existing Next.js/React/TypeScript/CSS Modules/content repository; no packages.

**Spec:** [Reading guide](2026-10-06-phase-2-homepage.md), [Prototype 04 inventory](../../breakspider_prototype_04_design_inventory.md), [homepage rotation](../../breakspider_site_architecture.md#6-homepage-randomization-and-rotation).

**Global constraints:** Four spaces, Phase 1 preserved, repository-owned content, no invented game mechanics or online status. Keep the mobile sequence and a direct Familiar catalogue link.

**Review focus:** Empty feeds, one Familiar, stale draft labels, hydration, and overflow have explicit checks below.

## Learn first: an activity fragment is not another portfolio card

Current work is orange type plus a Familiar sprite, Sketchbook is compact text and a lower rule, Familiar is sprite plus identity, and changelog is a small `UPDATE.TXT` window. Their differing treatments make the page feel accumulated. Reusing a generic card here would lose the approved design even if the data were correct.

The repository already sorts posts and changelog newest-first. Consume the first record rather than introducing another sort. A **hydration mismatch** occurs when the first browser render differs from the server HTML. Random selection must happen after that first render, never during rendering or module import. The initial server-visible Familiar stays useful while the browser starts.

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

- [ ] **Step 1 — FIRST EDIT: Extend the page's existing `Promise.all` with Familiar, Sketchbook, and changelog reads.**

Keep reads in `app/page.tsx`, not in client effects. Name the resulting arrays `familiars`, `posts`, and `changelog`. Derive `latestPost = posts[0] ?? null` and `latestUpdate = changelog[0] ?? null`. Use existing project selection for current work; do not maintain a second project title/summary.

- [ ] **Step 2: Render Current Project after Projects.**

Use `Working on`, the ONFF title, summary, and its canonical project link. A related sprite (Pebbloq, found by slug) may sit beside the title/description as a decorative image. Omit it when missing. Keep this region containerless, with orange title language. Allow three-line wrapping for `One Night Familiar Fight` rather than copying the old game name's dimensions.

- [ ] **Step 3: Render latest Sketchbook next.**

Show title, excerpt, tags, and a real destination. For a long entry link to `/sketchbook/${latestPost.slug}`; for a short note link to `/sketchbook` with `Open Sketchbook`, because short notes live in the feed. An empty feed displays `No Sketchbook entries yet` and a directory link. Do not invent a publication date or claim sample copy is finalized.

Change visible `Pixel Pugilists` labels in `content/sketchbook.ts` to `One Night Familiar Fight` or `ONFF`, including alt/caption/tags where describing the current game. Preserve `relatedProject: "pixel-pugilists"`, IDs, slugs, and asset paths. This is a naming correction, not a content rewrite.

- [ ] **Step 4: Render the Familiar slot and changelog.**

Put Familiar before changelog. Changelog shows latest version, title, date, and the first one to three notes. Use native `details` labelled `See updates` for the remaining authored entries; include `latestUpdate.links` when available. There is no dedicated changelog route, and `/sketchbook` does not render this changelog data. Do not create a broken `See updates` link copied from the prototype. Empty changelog means `No site updates yet` without an unusable disclosure.

Style the `UPDATE.TXT` framing locally. Format dates with a fixed locale and UTC, as the current Sketchbook preview does, so server/browser dates agree. Current content is a foundation entry; changing it is the owner's later authoring choice.

**Learning checkpoint:** Explain why a long-post link and a short-note link differ, and why a public slug cannot be derived from an internal project ID.

## Task 2: Keep random selection stable and understandable

- [ ] **Step 1: Create `lib/home/home-session.ts`.**

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

- [ ] **Step 2: Implement `HomeFamiliar` as a Client Component.**

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

- [ ] **Step 3: Style sprite/text and place the new regions.**

Keep pixel rendering confined to sprites. In wide desktop CSS, Current Project occupies the lower-left area under Spotlight, Sketchbook sits nearer the middle, Familiar below current work, and changelog lower-right. Use the reference's uneven density and readable gaps, with normal-flow row sizing. On compact screens reset desktop placements and preserve DOM order. Use actual content widths before the next chunk adds found objects.

Also retain the prototype's separate roaming Familiar link above Projects on wide desktop: choose Ashwing from the authored roster, link directly to `/familiars`, and show `WILD ENCOUNTER`. Keep its little hover lift available on keyboard focus, remove motion under reduced motion, and hide this redundant extra link at compact widths. It is a functional link with a reserved footprint, not a random/decorative sprite. Mark it as a protected exclusion in chunk 4; the main cycling Familiar remains in the mobile reading sequence.

## Browser checkpoint before chunk 3

- [ ] Check all widths from chunk 1 and full-page captures. Current work and Familiar are frameless; Sketchbook is lighter than the framed changelog.
- [ ] Cycle repeatedly by click and keyboard: name, sprite, tags, and detail href remain one record. Catalogue works before cycling; mute prevents feedback. Initial selection is silent.
- [ ] Roaming Familiar links directly to the catalogue, reacts to focus as well as hover, and does not obscure Projects; compact screens retain the main Familiar module.
- [ ] Reload and watch the console: no hydration warnings. Navigate away/back with `Link`; the initial Familiar matches for the same roster/seed. Hard refresh may choose the same Familiar by chance; it is not a guaranteed alternation.
- [ ] Temporarily inspect empty feeds, one Familiar, invalid featured slug, and a short newest post using local draft data, then restore it. Every state has a useful link and no crash. Do not leave test records in content.
- [ ] Expand `See updates` on mobile and at 200% zoom. It remains in flow and does not overlap Map/pile regions when they are added.
- [ ] Run lint/typecheck. Existing repository tests already cover feed ordering; no new presentation tests are required. Chunk 6 adds meaningful seeded-layout tests.

**Learning checkpoint:** Explain why module memory survives SPA navigation but component state may not, and why two seeded consumers should not share an advancing generator.

**Finish:** Commit this readable activity layer once browser checks pass. Artifact inspection is the next independent chunk.
