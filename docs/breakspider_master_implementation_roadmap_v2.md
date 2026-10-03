# Breakspider — Master Implementation Roadmap

## Purpose

This roadmap is the implementation source of truth for Breakspider v0.1.

It sits downstream of the existing design documents, wireframes, inspiration library, asset curation, and Prototype 04. Codex should use this roadmap to generate **detailed phase plans one phase at a time**, rather than inventing development order independently.

Prototype 04 is the current homepage visual source of truth. The migrated About and Projects prototypes establish the rule for deeper pages:

> **Same person. Same internet space. Different room.**

Use **One Night Familiar Fight (ONFF)** as the current game name. **Pixel Pugilists** was its early development name and may still appear in Prototype 04, screenshots, and archived design notes; those references describe the same game, not a separate project. Production URLs are `/projects/one-night-familiar-fight` for the project page and `/projects/viscap-ai` for Viscap, with the playable build at `/play/onff`.

For the real implementation, the prototypes define **visual and interaction intent**, not code architecture.

The production codebase should be optimized first for **developer friendliness, maintainability, and future expansion**, while preserving those approved designs.

## 1. v0.1 Product Definition

Breakspider v0.1 is a public, evolving personal website / professional portfolio / game-dev profile with:

- a distinctive, highly personalized homepage
- clear professional identity and contact paths
- a unified Projects archive
- full One Night Familiar Fight and Viscap project pages
- Sketchbook feed + long entries
- Familiar catalogue + detail pages
- Collection / visitor profile system
- site Map
- lightweight collectible scavenger hunt
- randomized + hand-placed homepage clutter
- persistent visitor cosmetics/progress
- UI audio
- finished Breakspider splash intro
- a playable Godot web build of One Night Familiar Fight
- responsive desktop/mobile behavior
- Vercel deployment on the Breakspider domain

The site should be safe to launch while visibly unfinished and capable of accumulating more content over time.

## 2. v0.1 Technical Stack

### Production stack

- **Next.js**
- **TypeScript**
- **React**
- **Vercel**
- local/static content for v0.1
- `localStorage` for persistent visitor state
- browser-memory page-load seed for a supplemental randomized clutter layer around authored placements
- static production assets in the repo/public bundle

### Future stack direction

The intended post-v0.1 backend is:

- **Supabase**
  - Postgres database
  - Storage
  - Auth for private authoring
- Vercel remains the primary frontend host
- Next.js route handlers / server functions can mediate server-only behavior where useful

Firebase is not currently the preferred long-term direction.


## 2.5 Production Engineering Principles

For the **real production implementation**, the primary engineering goals are:

1. **developer friendliness**
2. **maintainability**
3. **ease of future expansion**
4. **preserving the approved visual/interaction intent**

The approved prototypes are **visual specifications**, not architectural templates.

Do not copy prototype markup, CSS structure, absolute positioning, duplicated JSX, or one-off hacks directly into production unless they remain the clearest and most maintainable solution.

Breakspider intentionally contains bespoke page compositions, but the codebase itself should not become bespoke in ways that make ordinary maintenance difficult.

The governing rule is:

> **shared infrastructure for shared behavior; bespoke composition for bespoke pages.**

### Prefer

- clear and predictable directory structure
- obvious naming
- typed content models
- typed configuration objects
- thin repository/data-access interfaces
- declarative content rather than content strings scattered through JSX
- shared infrastructure for genuinely shared behavior
- page-specific components for genuinely page-specific composition
- centralized visitor-state logic
- centralized collectible/unlock logic
- centralized audio handling
- centralized modal/inspection behavior
- centralized responsive/layout tokens where useful
- CSS variables/design tokens for shared visual language
- isolated layout/config files for authored clutter and special positioning
- small, understandable components
- code that is easy to delete, replace, or visually iterate on
- adding new content primarily through structured data/assets instead of unrelated code changes

### Avoid

- copying prototype code wholesale into production
- seven unrelated pages each reimplementing the same behavior
- a giant universal `BreakspiderPage` abstraction
- a universal card/window system that erases page-specific identity
- excessive inheritance or abstraction for visual elements that only appear once
- magic numbers scattered throughout JSX
- hard-coded asset paths repeated across components
- direct `localStorage` calls scattered throughout presentation code
- direct audio calls scattered throughout presentation code
- duplicate mobile fixes in many unrelated files
- complex architecture whose main benefit is elegance rather than practical maintainability
- premature Supabase/backend abstractions
- premature generalization of prototype-only concepts

### Prototype-to-production translation rule

Before implementing an approved prototype, explicitly identify:

1. **reusable behavior**
2. **reusable visual infrastructure**
3. **content/data**
4. **configuration**
5. **page-specific composition**
6. **prototype scaffolding that should be discarded**

For example:

#### Likely shared infrastructure

- global header/navigation
- audio control and sound registry
- visitor avatar/profile
- modal/inspection shell
- screenshot/media viewer
- collectible unlock feedback
- visitor-state store
- Familiar preview primitives
- project/media labels
- responsive image/media handling
- clutter renderer / safe-zone logic
- page metadata/layout utilities

#### Likely page-specific composition

- homepage Spotlight arrangement
- homepage authored clutter positions
- Viscap connected-system visualization
- One Night Familiar Fight battle-plan presentation
- About profile composition
- Projects archive arrangement
- Familiar-detail hero treatment
- Map visualization

### Bespoke positioning

Hard-coded coordinates are acceptable where an approved composition genuinely depends on them, but:

- isolate them into clearly named layout/config objects or page-specific styles
- do not bury them across many JSX nodes
- document what the coordinates belong to
- define breakpoint-specific behavior deliberately
- keep structural content separate from decorative placement data

### Content growth rule

Future content growth should not require significant unrelated code changes.

Adding a new:

- Familiar
- Sketchbook post
- collectible
- changelog entry
- project
- avatar
- badge
- cursor cosmetic

should primarily involve adding structured content/assets and, where necessary, page-specific presentation data.

This principle is especially important because post-v0.1 Supabase authoring is expected to replace repo-authored Familiar and Sketchbook content.

### Decision rule

When forced to choose between:

- a visually identical but brittle implementation, and
- a slightly more structured implementation that remains faithful to the approved design and is substantially easier to understand or extend,

prefer the maintainable implementation.

Do not sacrifice the distinctive Breakspider compositions merely to make every page conform to one component system.

## 3. Architectural Rule: Make Static v0.1 Easy to Replace With Supabase

Do not couple page components directly to hard-coded files.

Define typed content models and a thin repository/data-access layer now.

Example conceptual APIs:

```ts
getFamiliars()
getFamiliar(slug)
getSketchbookPosts()
getSketchbookPost(slug)
getProjects()
getChangelogEntries()
getCollectibles()
```

For v0.1 these functions read local content.

Later, their implementation can switch to Supabase without requiring the presentation layer to be rewritten.

### Suggested local content models

#### Familiar

- id
- slug
- name
- sprite
- shortDescription
- description
- playstyle
- tags
- stats/mechanics where appropriate
- game/project associations
- relatedSketchbookPosts
- featured
- publishedAt

#### Sketchbook post

- id
- slug
- title
- excerpt
- body
- tags
- media
- relatedProject
- relatedFamiliars
- publishedAt
- updatedAt
- isLongform

#### Project

- id
- slug
- title
- type
- status
- summary
- heroMedia
- sections
- relatedSketchbookPosts
- relatedFamiliars
- links

#### Collectible

- id
- name
- type
- icon/media
- description
- unlockRule
- cosmeticConfig
- rarity/display metadata if useful

A formal CMS is explicitly **not** a v0.1 requirement.

## 4. Site Routes for v0.1

Target routes:

```text
/
├── /about
├── /projects
│   ├── /projects/one-night-familiar-fight
│   └── /projects/viscap-ai
├── /sketchbook
│   └── /sketchbook/[slug]
├── /familiars
│   └── /familiars/[slug]
├── /collection
├── /map
└── /play/onff
```

Optional aliases or nested playable routes can be added later, but avoid unnecessary routing complexity for v0.1.

The canonical public project detail URLs are `/projects/one-night-familiar-fight` and `/projects/viscap-ai`. Keep links and explicit route files aligned with these public slugs; internal project IDs do not define public routes.

## 5. Visual Sources of Truth

Codex should interpret sources in this order:

1. finalized page prototype for the route, when one exists
2. Prototype 04 homepage
3. final wireframe
4. Breakspider visual-direction document
5. design philosophy
6. site architecture
7. inspiration manifest / screenshot library
8. asset curation
9. agent judgment

Do not revert implemented pages toward Prototype 01's literal notebook/editorial styling.

Do not make all deeper pages copies of Prototype 04.

## 6. Phase 0 — Repository and Implementation Foundation

**Status: Complete (2026-10-02).** The foundation is deployed to Vercel. The owner confirmed accessible control checks and responsive shell review. See the [Phase 0 implementation record](breakspider_phase_0_implementation_plan.md).

### Goal

Create the production codebase structure without prematurely building backend infrastructure.

### Work

- [x] establish production Next.js + TypeScript app
- [x] define route structure
- [x] establish global layout/header foundation
- [x] configure asset directories
- [x] implement global typography/color tokens
- [x] establish shared responsive breakpoints
- [x] establish content models
- [x] establish local content repository layer
- [x] establish visitor-state model
- [x] establish sound manager
- [x] establish modal/focus infrastructure
- [x] establish reduced-motion utility
- [x] configure and verify the Vercel deployment
- [x] audit prototype code before reuse; prototypes are visual specs, not production architecture
- [x] identify reusable behavior vs page-specific composition for the already-approved prototypes
- [x] establish a clear convention for authored layout/config data so bespoke positioning does not leak throughout JSX; for decorative clutter, see [CLUTTER_POSITIONING.md](CLUTTER_POSITIONING.md)
- [x] keep prototypes available for visual reference rather than mixing prototype code blindly into production

### Acceptance criteria

- [x] all v0.1 routes resolve, even if deeper routes are temporary shells
- [x] global header/nav works
- [x] local content can be read through typed repository functions
- [x] no Firebase/Supabase dependency yet
- [x] production code is easy to iterate visually
- [x] mobile breakpoint foundation exists
- [x] preview deployment succeeds on Vercel
- [x] a developer can trace content, visitor state, audio, modal, and layout responsibilities without hunting through page-specific hacks
- [x] approved prototype code has been audited rather than copied wholesale
- [x] shared systems have clear ownership and page-specific composition remains intentionally isolated
- [x] adding a simple new content entry does not require editing unrelated presentation components

## 7. Phase 1 — Splash, Global Shell, and Shared UI

### Splash behavior

Use the finished Breakspider logo animation.

Behavior:

- show the splash only when a first-time visitor enters through the homepage (`/`)
- direct visits to interior routes do not redirect through or block on the splash
- store `breakspider_intro_seen_v1 = true` in `localStorage`
- subsequent visits: skip automatically
- browser data cleared: splash can appear again
- provide a persistent `Replay intro` affordance on the homepage
- splash always has a skip path

### Header

Global header includes:

- Home
- Projects
- About
- visitor avatar/profile affordance
- persistent sound toggle
- Breakspider identity/logo

The static Breakspider logo should have a smaller hover/click animation related to the splash animation.

### Audio

- default muted
- persist audio preference in `localStorage`
- use an explicit sound registry
- do not scatter direct audio calls throughout components
- map UI events to chosen sound effects deliberately
- many archived sounds can remain unused until a funny/appropriate purpose exists

### Acceptance criteria

- intro persistence works
- replay works
- logo micro-animation works
- sound defaults muted and remembers preference
- header behaves correctly on desktop and mobile
- keyboard/focus behavior is reasonable at low implementation cost

## 8. Phase 2 — Homepage Production Implementation

### Goal

Translate Prototype 04 into production while preserving room for manual hand-tuning.

### Fixed structural content

These are hand-authored and deterministic:

- Spotlight
- About path
- Projects path
- Current Project
- Latest Sketchbook
- Random Familiar data choice
- Changelog
- Visitor profile entry
- core artifact interactions
- major hand-placed decorative objects

The authored composition is the primary clutter layer and carries Prototype 04's specific object relationships, clusters, overlaps, and negative space. Randomized clutter is an additional, curated layer around it; it must enhance the authored composition rather than replace or rearrange it.

For the authoring workflow and stored anchor-relative placement data for decorative clutter, see [CLUTTER_POSITIONING.md](CLUTTER_POSITIONING.md). That convention applies to decorative assets; structural page layout remains page-specific.

### Prototype interaction baseline

Preserve the small, optional interactions that give Prototype 04 its personality. The production interaction pass should account for:

- inspectable Spotlight/project artifacts and the found Map object
- Familiar cycling with a direct catalogue link that remains available without cycling
- artifact-file focus on hover and keyboard focus, plus the explicit shuffle control
- tap-to-inspect behavior and the swipeable artifact strip on mobile
- small reversible reactions such as touching and restoring the homepage crystal

These interactions remain secondary to the visible professional paths. Production collectibles may build on them, but should not make them mandatory for understanding or navigating the site.

### Homepage clutter system

Use a hybrid model.

#### Layer A — fixed/priority artifacts

Hand-placed authored objects with known coordinates/regions.

Each can declare:

- placement
- bounding/exclusion region
- z-index
- priority
- breakpoint behavior

Random clutter must never overcrowd or cover these.

#### Layer B — randomized clutter

Add a restrained set of randomized decorative objects around the authored composition. On every full page load / refresh:

- generate a new in-memory layout seed
- keep that seed stable while the SPA remains loaded
- route transitions/interactions must not cause clutter to jump
- a hard refresh can produce a new arrangement

Use curated safe zones such as:

```text
leftRail
rightRail
topEdge
aboutPeriphery
familiarPeriphery
midField
lowerField
footerEdge
```

Each zone has:

- eligible asset pool
- min/max object count
- size range
- position bounds
- optional rotation bounds
- allowed z-index range
- collision/exclusion rules
- mobile enable/disable rules

Avoid uniform random scatter.

Generate clusters and deliberate gaps.

#### Priority/collision rules

- fixed hand-placed content always wins
- randomized clutter must avoid important text, CTAs and project media
- maintain exclusion rectangles around structural anchors
- allow decorative-to-decorative overlap selectively
- allow some objects to be partially clipped by viewport edges
- mobile uses much lower clutter density

#### Semantic anchoring for authored artifacts

Use the anchor and relative-offset convention in [CLUTTER_POSITIONING.md](CLUTTER_POSITIONING.md) for the decorative-artifact placements described here.

Hand-placed decorative artifacts should generally be positioned relative to a meaningful page element or named layout region rather than by global page coordinates.
Examples of semantic anchors include Spotlight, About, Projects, Current Project, Familiar, Visitor Profile, and named edge/field regions.
This allows decorative relationships to survive responsive layout changes and reduces brittle viewport-specific positioning.
Each authored artifact may define:
- anchor ID
- relative placement/side
- x/y offset
- size
- z-index
- breakpoint-specific overrides
- mobile visibility
- optional random-clutter exclusion radius
Prefer local position: relative / position: absolute composition inside or around anchor wrappers over page-wide magic coordinates.
Global/viewport positioning should be reserved for decorations whose meaning genuinely depends on the viewport itself.
Randomized clutter should respect exclusion zones created by anchored structural content and authored artifacts.

### Acceptance criteria

- homepage matches Prototype 04's composition closely
- clutter differs after hard refresh
- clutter remains stable during the loaded session
- authored placements and object relationships remain the dominant composition
- no random artifact obscures essential content
- page remains readable at primary desktop widths
- mobile translates rather than shrinks desktop
- manual artifact positions remain easy to adjust
- fixed and randomized clutter are driven by readable configuration rather than scattered DOM/CSS hacks
- structural homepage content remains independent from decorative placement logic

## 9. Phase 3 — About + Contact

Use the approved About prototype as the layout source of truth.

### Required content

- concise professional/personal introduction
- software engineer + game developer identity
- current availability
- email
- GitHub
- LinkedIn
- résumé PDF
- strong visual/avatar/profile element
- concise skills/system framing
- selected project evidence
- limited page-specific clutter

No contact form for v0.1.

### Acceptance criteria

- contact paths are obvious
- résumé is downloadable/viewable
- page feels like a customized profile, not a résumé template
- page remains less cluttered than the homepage
- mobile reading order is clear

## 10. Phase 4 — Projects Archive

Use the approved Projects prototype.

### Core principle

Viscap and One Night Familiar Fight must not be presented as matching portfolio cards.

#### Viscap should read as

- professional
- interconnected
- product/system oriented
- broad application scope

#### One Night Familiar Fight should read as

- game development
- systems design
- active experimentation
- visual/gameplay oriented

### Acceptance criteria

- two projects are visually distinct
- both project routes are obvious
- archive can grow naturally when more projects become substantial
- page remains visually tied to Breakspider without copying homepage density

## 11. Phase 5 — One Night Familiar Fight Project Page

### Content goals

Explain design/development process rather than sell the game like a commercial storefront.

Use real media:

- Next Bout
- Priority Builder
- Priority tooltips/mock state
- combat
- reward screen
- bracket
- Godot process screenshot
- Familiar sprites

Likely narrative structure:

- what ONFF is
- design goals
- priority/battle-plan system
- deterministic battle resolution
- Familiar/build system
- reward/run structure
- bracket structure
- development/process
- related Familiars
- related Sketchbook posts
- playable ONFF CTA

### Acceptance criteria

- project page demonstrates both design and engineering
- Priority Builder receives meaningful visual emphasis
- project media is real rather than decorative filler
- links into Familiars, Sketchbook and playable build work
- page-specific clutter derives primarily from ONFF/game-dev material

## 12. Phase 6 — Viscap Project Page

### Pre-launch privacy requirement

Before production use:

- redact names where needed
- redact email addresses
- blur/replace sensitive faces when appropriate
- remove internal/client information that should not be public
- use mock/anonymized data if the screenshot cannot safely be published

### Content goals

Communicate that Viscap was one interconnected platform rather than unrelated feature work.

Potential systems:

- Creatives
- Media Library
- Storyboards
- Actor Hub
- Phases & Sprints
- Brand Intranet
- Education
- Reports
- team/admin infrastructure

Create a connected-system graphic based on accurate product relationships.

Use roughly 6–9 carefully selected screenshots rather than the entire capture set.

### Acceptance criteria

- visitor understands this was substantial full-stack application work
- relationships between systems are visible
- screenshots are privacy-safe
- user contribution/role is described accurately
- visual treatment is cleaner than ONFF while still unmistakably Breakspider

## 13. Phase 7 — Sketchbook

### Launch content target

- approximately 3–5 short posts
- approximately 1 substantial long-form entry

More content can be added continuously after launch.

### Feed

- chronological
- short posts can live entirely in feed
- long posts link to `/sketchbook/[slug]`
- tags can filter/browse later if time allows
- attachments/media are supported
- related project/Familiar links supported

### Long entry

Reading-oriented but not generic blog styling.

Allow:

- screenshots
- diagrams
- marginal artifacts
- related links
- backlinks to project/Familiar pages

### Acceptance criteria

- feed works with both short and long entries
- first long-form route works
- content model can migrate to future Supabase CMS
- page feels like an internet microblog/sketchbook, not a corporate blog

## 14. Phase 8 — Familiars

### Launch scope

2–4 real Familiars is acceptable for v0.1.

The catalogue is explicitly designed to grow after launch, especially when One Night Familiar Fight development returns to the foreground.

### Catalogue

- featured Familiar treatment
- scannable sprite + name roster
- simple filters/tags only if genuinely useful
- click/tap opens or routes to details

### Detail

Potential content:

- sprite/art
- name
- description
- playstyle
- role/tags
- techniques/mechanics
- game associations
- development notes
- related Sketchbook posts

### Acceptance criteria

- small roster does not look broken/unfinished
- catalogue can scale to 16+ Familiars naturally
- Familiar routes have stable URLs
- content access layer is compatible with future Supabase CMS

## 15. Phase 9 — Visitor Profile + Collection

The production visitor system is a deliberate expansion beyond the visual prototype. Prototype profile and Collection controls demonstrate the intended presentation, but their selection/pinning state is preview-only: the prototype does not implement real unlocks, persistent ownership, or cosmetic equipment. Phase 9 and Phase 10 must implement those behaviors as working product functionality.

### Visitor state

Persist indefinitely in `localStorage` for v0.1.

Suggested state:

```ts
visitorId
unlockedCollectibleIds
equippedAvatarId
equippedBadgeIds
cursorStyleId
cursorFollowerId
cursorTrailId
visitedPages
pageVisitCounts
unlockFlags
```

No account system and no reset control are required for initial v0.1 unless implementation needs one for development/debugging.

### Collection UI

Support:

- avatars
- badges
- cursor styles
- cursor followers/trails
- Map
- future toy/feature unlocks

Badges can attach around the visitor avatar/profile.

Equipped vs owned should be distinct.

### v0.1 collectible count

Target approximately **7–10 real collectibles**.

The set should be enough to form a small site-wide scavenger hunt.

## 16. Phase 10 — v0.1 Scavenger-Hunt Design

### Principle

Collectibles should quietly guide curious visitors through the currently available pages.

They must never gate essential navigation or professional information.

A visitor ignoring collectibles should still experience the complete portfolio.

This scavenger hunt is new production functionality, not a port of existing prototype unlock logic. Use the prototype's inspectable objects and interactions as inspiration and entry points, then define explicit, testable unlock conditions and persistent rewards for the production visitor state.

### Recommended launch path

#### 1. Home — Map
Unlock the Map through a visible-but-curious homepage interaction.

Purpose:
- introduces collectible feedback
- introduces the Map
- teaches that the site contains discoverable systems

#### 2. About — Avatar or profile badge
Unlock by inspecting/interacting with the personal profile area.

Purpose:
- sends explorer to About
- immediately demonstrates profile customization

#### 3. Projects Archive — Badge
Unlock after meaningfully interacting with both public project entries or opening the archive interaction.

Purpose:
- introduces both major bodies of work

#### 4. One Night Familiar Fight — Cursor follower/trail
Unlock through an ONFF-specific interaction such as inspecting the Priority Builder, Familiar/system artifact, or playable-build path.

Purpose:
- rewards deep project exploration
- thematic game-related cosmetic

#### 5. Viscap — Cursor style or badge
Unlock by interacting with the connected-system diagram or exploring multiple subsystem fragments.

Purpose:
- encourages visitors to understand the project's breadth

#### 6. Sketchbook — Badge
Unlock by opening a long-form post or finding a small inline object.

Purpose:
- introduces ongoing writing/process content

#### 7. Familiars — Avatar
Unlock after inspecting several Familiar entries or a featured Familiar.

Purpose:
- encourages catalogue exploration
- gives a high-value profile reward

#### 8. Collection — Meta badge
Unlock after equipping a cosmetic or reaching a collectible-count threshold.

Purpose:
- teaches Collection functionality

#### 9. Map — Exploration badge
Unlock after using the Map to visit several destinations.

Purpose:
- closes the navigation/scavenger loop

#### Optional 10th — ONFF playable build
Unlock a special badge/cursor/follower after launching or completing a lightweight in-game condition that can be detected from the web wrapper where practical.

If integration is too expensive for v0.1, use a simpler "launch the playable build" unlock.

### Scavenger-hunt acceptance criteria

- 7–10 rewards exist
- rewards are distributed across the available routes
- at least two are profile-visible cosmetics
- at least one is an avatar
- at least one is a cursor style
- at least one is a cursor follower/trail
- Map is part of the loop
- badges visibly decorate visitor profile/avatar
- every major page has a reason for an explorer to visit
- no collectible is required to access core content

## 17. Phase 11 — Map

The Map is both:

- a functional human-readable site index
- a collectible/discovered object

Once unlocked, it remains available through Collection/profile and its route.

The Map should:

- show major public routes
- help visitors reorient
- not reveal true secrets
- not replace conventional navigation
- feel like a special interface/object rather than a sitemap generated by a framework

## 18. Phase 12 — Playable One Night Familiar Fight

### Route

Use `/play/onff` or a clearly linked equivalent.

### Delivery

Export a Godot Web build.

Prefer the simplest compatible export mode.

If the build requires cross-origin isolation / SharedArrayBuffer due to thread settings:

- either configure required Vercel/Next headers
- or use a non-threaded export if performance is acceptable

### Wrapper responsibilities

- clear game loading state
- fullscreen option if useful
- keyboard focus behavior
- obvious return-to-Breakspider affordance
- responsive sizing
- audio interaction that does not fight site audio
- graceful unsupported-browser message if needed

### Acceptance criteria

- build loads reliably from production Vercel deployment
- game input works
- page can return to ONFF project
- mobile handling is deliberate, even if gameplay is desktop-first
- build assets are cached appropriately
- no surprise autoplay/audio behavior

## 19. Phase 13 — Responsive Pass

Primary test widths:

- approximately 1440px desktop
- approximately 1920px wide desktop
- approximately 390px mobile
- one intermediate tablet/narrow-desktop width

Rules:

- desktop remains expressive
- mobile prioritizes reading order
- clutter density falls substantially
- essential actions never depend on hover
- random clutter pools/zones can differ by breakpoint
- project screenshots remain readable
- modals fit viewport
- header/nav remains usable

## 20. Phase 14 — Low-Cost Accessibility + Robustness

Accessibility is not intended to delay v0.1, but inexpensive fundamentals should be implemented while building rather than retrofitted later.

Baseline:

- semantic buttons/links
- visible keyboard focus
- keyboard-closable modals
- useful alt text for content images
- decorative images ignored by assistive technology
- `prefers-reduced-motion` support
- no essential hover-only information
- persistent obvious mute control
- sane heading structure
- adequate text contrast where practical

This is a baseline, not a full formal WCAG audit.

## 21. Phase 15 — Performance

Because the site intentionally contains many assets:

- lazy-load offscreen screenshots/media
- use responsive image sizing
- do not preload the entire collectible/artifact archive
- only load GIF/animated assets used on the current page
- keep random clutter asset pools page-specific
- optimize oversized raster assets
- avoid rendering dozens of invisible collectible candidates
- test splash/video assets carefully
- load playable ONFF only on its route

The goal is for the site to feel excessive without actually downloading the entire archive on first paint.

## 22. Phase 16 — Pre-Launch Content and Privacy Pass

Before public v0.1:

- replace placeholder name/contact values
- add real email
- add GitHub
- add LinkedIn
- add résumé PDF
- redact/anonymize Viscap media
- verify ONFF screenshots
- choose final initial Familiars
- write 3–5 short Sketchbook posts
- write 1 long Sketchbook post
- populate real changelog
- configure 7–10 collectibles
- verify every collectible unlock
- verify mobile routes
- verify external links
- ensure copyright-derived assets are intentionally placed rather than accidentally used as core site identity

The site may still visibly say v0.1 / evolving / WIP where appropriate.

## 23. Phase 17 — Vercel Launch

### Deployment

- production Vercel project
- custom domain
- preview deploys for branches/PRs
- environment configuration minimal for static v0.1
- verify caching and Godot build delivery
- verify 404/error handling

### Browser target

Modern:

- Chromium-based browsers
- Firefox
- Safari
- current mobile browsers

No legacy browser target.

## 24. v0.1 Definition of Done

Breakspider v0.1 is launch-ready when:

### Identity / shell
- splash works and persists
- header/nav works
- audio control works
- visitor avatar/profile works

### Homepage
- Prototype 04 production composition is implemented
- authored clutter remains primary and the supplemental randomized layer works around it
- no random clutter covers priority content
- prototype-inspired inspection, Familiar cycling, file focus/shuffle, and mobile swipe interactions work
- major CTAs are obvious

### Core content
- About works
- Projects archive works
- ONFF project page works
- Viscap project page works
- Sketchbook feed works
- at least one long Sketchbook entry works
- Familiar catalogue/detail works
- Collection works
- Map works
- ONFF playable build works

### Content minimums
- 2–4 Familiars
- 3–5 short Sketchbook posts
- 1 long Sketchbook post
- 7–10 collectibles

### Professional readiness
- real contact links
- résumé
- safe/redacted Viscap media
- real project copy/media

### Quality
- responsive at primary sizes
- no major broken links
- no severe console/runtime errors
- low-cost accessibility baseline
- reasonable initial load despite asset richness
- Vercel production deployment works

### Production maintainability
- approved prototypes have been translated into production architecture rather than copied wholesale
- shared behavior has one clear implementation rather than route-specific duplication
- bespoke page composition is isolated and understandable
- content and asset references are not unnecessarily scattered through presentation code
- visitor state, collectible logic, audio, and inspection/modal behavior have clear centralized ownership
- collectible unlocks and equipped cosmetics are real browser-persisted production features, not prototype-only preview state
- homepage clutter configuration is readable and easy to hand-tune
- local content repositories can later be replaced by Supabase implementations without rewriting page components
- a developer can add ordinary Familiar, Sketchbook, collectible, and changelog content without modifying unrelated systems
- no broad abstraction exists solely to force visually different pages into one template

The site does **not** need to feel complete forever.

It needs to feel intentionally alive and worth revisiting.

## 25. Post-v0.1 — Supabase / Authoring Phase

This is the strongest planned backend use case.

### Supabase

Add:

- Postgres
- Storage
- private author auth
- row-level security as needed

### Familiar CMS

Private authoring UI should support:

- create Familiar
- edit Familiar
- upload sprite/art
- set descriptions/tags/playstyle
- associate projects/posts
- publish/unpublish
- feature/unfeature

The creator should not need to manually create files for new Familiar entries.

### Sketchbook CMS

Private authoring UI should support:

- create/edit post
- short vs long format
- tags
- uploads/attachments
- project/Familiar relations
- draft/publish
- publication date

The creator should not need to manually create source files for normal posting.

### Migration strategy

Preserve the same repository/data-access interfaces used by v0.1.

Replace local implementations with Supabase implementations behind those interfaces.

The presentation layer should not need to know whether content comes from local files or Supabase.

Avoid rewriting route components during the migration unless a real product requirement changes.

## 26. Post-v0.1 — Weird API / Backend Toys

Add backend/API features only when they are genuinely fun or useful.

Good category:

- gaming data
- nerdy public APIs
- current-playing/status widgets
- strange rotating data displays
- game-development related feeds
- visitor-interaction toys
- external data transformed into a Breakspider-specific object

Avoid adding an API solely to claim the site has a backend.

A useful API feature should either:

1. reveal something interesting,
2. power a real site system,
3. create a fun interaction,
4. or demonstrate an engineering capability in a way visitors can actually experience.

Implement through Next.js route handlers and/or Supabase Edge Functions depending on the feature.

## 27. Post-v0.1 — Expansion Backlog

Likely directions:

- finish all 16 initial ONFF Familiar entries
- more Sketchbook content
- more project pages
- more collectibles
- more avatars
- additional cursor styles/followers
- collectible toys/minigames
- email backup/restore for visitor profile
- optional mailing-list integration
- more playable game builds
- richer Map
- mobile-specific discoveries
- carefully constrained visitor/guestbook feature
- public source link if desired
- more original assets replacing third-party cultural scraps over time

## 28. How to Use This Roadmap With Codex

Do not ask Codex to implement the entire roadmap at once.

For each phase:

1. provide this roadmap
2. identify the exact phase
3. ask Codex to inspect the current repository and relevant approved prototype(s)
4. require Codex to identify what is reusable behavior, reusable infrastructure, content/data, configuration, page-specific composition, and prototype-only scaffolding
   - explicitly distinguish implemented prototype interactions from production features that the roadmap intentionally adds, especially persistent collectible unlocks and cosmetic equipment
5. ask for a detailed implementation plan for that phase only
6. review the plan specifically for maintainability, unnecessary abstraction, duplication, and future content ergonomics
7. implement that phase
8. test it
9. visually review it
10. review the resulting code organization before considering the phase complete
11. commit/stabilize it
12. move to the next phase

For substantial phases, Codex should call out:

- dependencies
- data-model changes
- shared-system changes
- page-specific code
- prototype code it intends to reuse vs discard
- tests/verification
- likely implementation risks
- future Supabase implications where relevant
- developer-experience tradeoffs

Codex should not optimize for minimizing file count or maximizing abstraction.

Optimize for a codebase that is **obvious to navigate, easy to change, and pleasant to extend**.

The roadmap defines **what and in what order**.

The phase implementation plan defines **how**, subject to the production engineering principles above.
