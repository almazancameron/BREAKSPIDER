# Breakspider Phase 0 — Repository and Implementation Foundation

> **Status: Complete (2026-10-02).** The production foundation is implemented and deployed to Vercel. The owner confirmed keyboard/accessibility control checks and shell layout at the target responsive sizes.

> **Goal:** Establish a lightweight production foundation for Breakspider v0.1 while keeping it static and easy to migrate to Supabase later.

> **Scope:** Phase 0 only. This plan does not include implementing the finished page compositions or connecting a backend.

## Current repository

The repository already contains a working Next.js and TypeScript prototype:

- Next.js 16, React 19, and TypeScript 5.9 are installed. TypeScript strict mode is enabled; existing scripts are `dev`, `typecheck`, `build`, and `start`.
- The home route renders Prototype 04. At the time of inspection, a catchall route dispatched the other prototype pages by string comparisons.
- `components/` contains the home, interior pages, shared shell, header, and splash. Several pages already have desktop and mobile compositions.
- Some shared behavior is duplicated: the prototype header and interior shell each manage audio preference and visitor profile UI; pages implement their own inspection dialogs.
- `public/media/` holds selected assets used by the prototype. `assets/` contains source/archive material, including the inventoried asset set. Logo and splash proof-of-concepts are under `prototype/`.
- The repo includes screenshots at approximately 1440×900 and 390×844 for the home and deeper pages.
- There is no test runner or Vercel configuration in the inspected baseline. `package.json` is named `breakspider-home-prototype`, and the README describes earlier prototype routes and interactions.
- `docs/breakspider_prototypes_final_summary.md` was untracked at the time of inspection. Preserve it as-is while implementation work begins.

The most reusable inputs are the prototype screenshots and design inventories, selected assets in `public/media/`, existing responsive layout examples, and the logo/splash proof-of-concept assets. Treat React prototype components as behavior and visual references to audit, not as production architecture to copy wholesale.

## Proposed production structure

Keep the existing root-level `app/` location and Next configuration. Organize production code by responsibility, without adding backend infrastructure or a generic page framework.

```text
app/
  layout.tsx
  page.tsx
  about/page.tsx
  projects/page.tsx
  projects/one-night-familiar-fight/page.tsx
  projects/viscap-ai/page.tsx
  sketchbook/page.tsx
  sketchbook/[slug]/page.tsx
  familiars/page.tsx
  familiars/[slug]/page.tsx
  collection/page.tsx
  map/page.tsx
  play/onff/page.tsx
  not-found.tsx

components/
  site/        # header, footer, shared shell
  ui/          # behavior shared by genuinely shared interactions
  home/        # home-specific composition
  pages/       # page-specific compositions

content/
  projects/
  sketchbook/
  familiars/
  collectibles/
  changelog/

lib/
  content/     # content types, repository contract, local implementation
  visitor/     # schema, storage and React-facing state access
  audio/       # sound registry and playback manager

styles/
  tokens.css   # or keep tokens in app/globals.css if that remains clearer

public/
  media/
    brand/
    home/
    projects/
      pixel-pugilists/  # legacy source-media label for ONFF prototype assets
      viscap/
    familiars/
    sketchbook/
    collection/
    audio/

prototype/     # existing standalone proof-of-concepts remain reference material
assets/        # source archive; not the production URL namespace
docs/
screenshots/
```

Keep bespoke page layouts in page-specific components and styles. Shared modules should own shared behavior, not enforce a uniform visual composition.

## Routes

Create explicit route files for the v0.1 route set, including a temporary shell for `/play/onff`. Use dynamic segments only where content is naturally data-backed:

- `/sketchbook/[slug]` resolves an entry through the content repository.
- `/familiars/[slug]` resolves a Familiar through the repository.
- Project detail routes remain explicit because One Night Familiar Fight and Viscap have distinct page compositions. The canonical public URLs are `/projects/one-night-familiar-fight` and `/projects/viscap-ai`; keep local content IDs separate from these URLs unless they intentionally match the public slug.

Replace the catchall string-dispatch route with these route files. Each route can initially render a simple shell, but direct navigation and refresh must work. Unknown content slugs should use Next's `notFound()` path.

## Typed content and local repository

Store v0.1 content as typed local TypeScript data. Keep presentation components dependent on content types and repository functions, not on imported content files or scattered asset paths.

A small repository contract should expose the reads required by pages, for example:

```ts
getProjects(): Promise<Project[]>
getProject(slug: string): Promise<Project | null>
getFamiliars(): Promise<Familiar[]>
getFamiliar(slug: string): Promise<Familiar | null>
getSketchbookPosts(): Promise<SketchbookPost[]>
getSketchbookPost(slug: string): Promise<SketchbookPost | null>
getCollectibles(): Promise<Collectible[]>
getChangelogEntries(): Promise<ChangelogEntry[]>
```

The v0.1 implementation reads local content modules. Keep the contract server-side and narrow; a later Supabase adapter can implement the same read functions without changing page components. Do not add a CMS, database client, generic query framework, or service container.

Initial model set:

- **Project:** `id`, `slug`, `title`, `type`, `status`, `summary`, `heroMedia`, `sections`, related post/Familiar IDs, and external links.
- **SketchbookPost:** `id`, `slug`, `title`, `excerpt`, typed `body` blocks, `tags`, media, related project/Familiar IDs, dates, and `isLongform`.
- **Familiar:** `id`, `slug`, `name`, `sprite`, short and full descriptions, playstyle, tags, optional stats/mechanics, related project/post IDs, featured flag, and publication date.
- **Collectible:** `id`, `name`, category/type, icon or media, description, unlock-rule identifier, and optional cosmetic configuration.
- **ChangelogEntry:** version/date, title, notes, and links.
- **Media reference:** path, alt text, and optional dimensions or presentation metadata where useful.

Use discriminated unions for structured body blocks and cosmetic types only where they improve validation and rendering. Keep model fields grounded in the roadmap's actual page and content needs.

## Visitor state

Centralize browser persistence behind one visitor-state module and a small React-facing provider or hook. Components should not call `localStorage` directly.

Use a versioned state shape based on the roadmap: visitor ID, unlocked collectible IDs, equipped avatar/badges/cursor cosmetics, visited pages and visit counts, and unlock flags. Keep it local to the browser for v0.1.

The state layer should:

1. Provide safe default state for first visit and server rendering.
2. Load and validate persisted data after hydration.
3. Handle missing, malformed, or inaccessible storage without breaking page rendering.
4. Persist through a single module and provide typed updates for later interactions.
5. Leave room for a future migration function if the schema changes.

Do not implement accounts, sync, or a backend. Resolve whether to preserve or intentionally ignore existing prototype keys such as `breakspider-entered` and `breakspider-muted`; use explicit new, versioned production keys rather than silently coupling production state to prototype details.

## Audio, modals, and shared interactions

**Audio:** Add a small client-side manager with a named sound registry and a single `playSound(name)` entry point. It owns the muted-by-default preference, persistence, and browser audio resources. The prototypes' synthesized interface note is a reusable behavior candidate; route components should request named sounds rather than construct audio themselves. Defer loading audio files until there is a defined use for them.

**Modal and focus behavior:** Establish one shared modal interaction primitive for profile and media inspection. Prefer native `<dialog>` behavior for focus containment, Escape handling, and dialog semantics; add the shared close/backdrop and focus-restoration behavior the app needs. Keep dialog content and visual treatment page-specific where appropriate. The interaction foundation should also make reduced-motion preferences available, with CSS handling decorative animation defaults.

## Responsive and asset strategy

Use the prototype review widths as explicit verification targets: approximately 1440px desktop, 1920px wide desktop, 390px mobile, and an intermediate tablet or narrow-desktop width. Define shared layout/color/type tokens and a small set of documented breakpoint conventions. Let individual pages control their own responsive composition; mobile should reduce clutter and establish a readable order rather than merely scale the desktop canvas.

Organize selected production assets under descriptive `public/media/` subdirectories and reference them through content records or page configuration. Keep the larger source archive in `assets/`; do not copy the full archive into the served public bundle. Preserve prototype screenshots and proof-of-concepts for visual comparison. Audit licensing/provenance and privacy-sensitive Viscap screenshots before choosing production media.

For the authored placement convention for decorative homepage clutter, see [CLUTTER_POSITIONING.md](CLUTTER_POSITIONING.md). Ordinary page composition and diagram layout remain page-specific, as described in the [prototype reuse map](breakspider_prototype_reuse_map.md).

## Vercel

Configure the Vercel project against the repository using Next.js defaults:

- Install: `npm ci`
- Build: `npm run build`
- Output: automatic Next.js handling
- Environment variables: none for static v0.1
- Preview deployments: enabled for branches and pull requests
- Production domain: attach when the deployment is ready

Avoid adding `vercel.json` unless a concrete routing, header, or cache requirement appears. Phase 0 acceptance includes a successful preview deployment.

## Verification record

Completed for the Phase 0 foundation:

- `npm test`: 13 tests pass.
- `npm run typecheck`, `npm run lint`, and `npm run build`: pass.
- Local route smoke checks: canonical project routes and `/play/onff` respond successfully; the plan-era `/projects/viscap` path redirects to `/projects/viscap-ai`; unknown routes/slugs return 404.
- The owner confirmed keyboard/accessibility control checks and shell layout at desktop, tablet/narrow desktop, and mobile sizes.
- The owner confirmed the Vercel deployment is live.

The visual parity of the header, splash, and page compositions remains intentionally assigned to later roadmap phases.

## Completed implementation order

1. **Inventory and baseline:** recorded the starting state, confirmed route and asset references, and preserved user content.
2. **Production structure:** replaced catchall dispatch with explicit route files and temporary route shells.
3. **Global shell and tokens:** established root metadata/layout, shared header/navigation shell, visual tokens, and breakpoint conventions.
4. **Content layer:** added typed models, local content modules, repository functions, and route-level not-found behavior.
5. **Visitor state:** added versioned local state and React access with safe server defaults.
6. **Shared interactions:** added shared dialog/focus, audio registry/manager, and reduced-motion support.
7. **Assets and deployment:** organized selected production media, updated project documentation, and deployed the foundation to Vercel.
8. **Phase 0 review gate:** completed automated checks, route smoke checks, ownership review, and owner-confirmed browser/responsive checks.

## Resolved decisions and later-phase considerations

- **Prototype state compatibility:** production visitor state uses an explicit versioned key and does not silently adopt prototype keys. Audio preference is persisted through the visitor-state owner.
- **Content body format:** Sketchbook and project content use lightweight typed block/section data; page JSX stays in presentation code.
- **Routes:** `/play/onff` exists as a shell. The canonical project routes are `/projects/one-night-familiar-fight` and `/projects/viscap-ai`.
- **Visitor-state scope:** the production model includes visitor identity, route history, unlocks, and equipped cosmetics. The actual collectible unlock/equipment features remain later-phase work.
- **Audio and dialogs:** Phase 0 uses a synthesized named sound and native `<dialog>` behind shared owners.
- **Deployment:** the owner confirmed the Phase 0 foundation is deployed to Vercel.
- **Later content/privacy work:** finalize creator/contact copy and review Viscap media before those pages are publicly launched. These are later content-readiness tasks, not Phase 0 blockers.

## Phase 0 acceptance checklist

- [x] All v0.1 routes resolve, even if deeper routes are temporary shells.
- [x] Global header/navigation works.
- [x] Local content is available through typed repository functions.
- [x] No Firebase or Supabase dependency is added.
- [x] Production code is easy to iterate visually, with shared systems and page compositions clearly owned.
- [x] A mobile breakpoint foundation exists and the owner confirmed the shell at target sizes.
- [x] A Vercel deployment succeeds.
- [x] Prototype code has been audited rather than copied wholesale.
- [x] Adding a simple content entry does not require unrelated presentation changes.
