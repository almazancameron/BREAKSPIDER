# Breakspider Site Architecture

## Purpose of This Document

This document translates the Breakspider design philosophy into a practical site architecture.

The philosophy document answers:

> **Why should Breakspider feel and behave this way?**

This document answers:

> **What pages, systems, routes, content relationships, and homepage structures should exist?**

The architecture should support two simultaneous goals:

1. Make the site immediately useful as a professional portfolio.
2. Let the site become a long-term personal internet profile full of interconnected systems, hidden interactions, game-development material, and discoverable content.

The architecture should stay expandable without requiring the first release to contain every future idea.

The current game name is **One Night Familiar Fight (ONFF)**. **Pixel Pugilists** was its early development name and remains in historical prototype material. Treat those names as the same project; use `/projects/one-night-familiar-fight` for the production project page and `/projects/viscap-ai` for Viscap.

---

# 1. High-Level Architecture

Breakspider should not have a giant exposed navigation tree.

The site should have:

- a **small persistent navigation layer** for essential pages,
- a **larger internal sitemap** for first-class content,
- a **discoverable layer** for secondary systems,
- and a **secret layer** for true Easter eggs and hidden pages.

The visible navbar should intentionally expose less than the full site.

A visitor should be able to understand the creator professionally without exploring deeply, while deeper exploration should reveal more personal and playful systems.

---

# 2. Primary Routes

Proposed first-class routes:

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
└── /map                 # human-readable sitemap / site map
```

Additional discoverable or secret routes may exist outside this structure.

Examples:

```text
/???
/toy/[slug]
/secret/[slug]
/room/[slug]
/archive/[slug]
```

Exact naming is intentionally flexible.

---

# 3. Persistent Navigation

The persistent navigation should be small and easy to understand.

Recommended initial navigation:

```text
Home
Projects
About
```

Potentially:

```text
Home
Projects
About
Sketchbook
```

The preferred initial approach is to keep **Sketchbook** slightly less prominent than the three primary destinations unless it becomes a major publishing area quickly.

The navigation should:

- remain visible or easily accessible,
- be visually minimal,
- never become a mega-menu,
- preserve the site's custom/profile-like visual identity,
- and work cleanly on mobile.

The following should **not** initially need permanent top-level navigation:

- Familiars
- Collection
- Site Map
- Secret pages
- Minigames
- Toys
- Experimental spaces

These should be reached through widgets, project relationships, visitor-profile UI, or exploration.

---

# 4. Homepage Role

The homepage is not a conventional marketing landing page.

It should behave more like a **custom internet profile dashboard** with one dominant centerpiece and a constellation of smaller modules around it.

The page should communicate:

- who the creator is,
- what matters right now,
- what is currently being built,
- what the visitor can explore,
- and enough strange detail to tempt wandering.

The homepage should support both:

- fast professional scanning,
- and playful visual exploration.

---

# 5. Homepage Hierarchy

The homepage should have three rough levels of visual importance.

## Level 1 — The Spotlight

The Spotlight is the dominant centerpiece.

It should be visually unmistakable and flexible enough to promote different things over time.

Current likely use:

- professional identity,
- availability,
- software/game-development positioning,
- résumé/contact links.

Future use:

- current game release,
- interactive site toy,
- major dev update,
- new demo,
- important creative announcement.

The Spotlight should support multiple content modes without changing the entire homepage structure.

Suggested modes:

### Text-led
Useful for:
- job-search state,
- announcements,
- short manifesto or update.

### Image-led
Useful for:
- game promotion,
- new familiar,
- visual milestone.

### Video / animation-led
Useful for:
- gameplay clip,
- interactive toy preview,
- animated art,
- demo reel.

### Mixed
Useful for:
- media + short blurb + CTA.

The Spotlight should use a stable shell or footprint with flexible internal content.

It should not require a radically different homepage composition every time its content changes.

---

## Level 2 — Primary Path Widgets

The largest secondary modules should point toward the two most important first-class areas:

- **About**
- **Projects / Things I've Made**

These should be visually substantial enough that a recruiter or hiring manager naturally notices them after the Spotlight.

They should feel more straightforward than some of the surrounding playful widgets.

The About module should quickly communicate:

- who the creator is,
- what they do,
- professional positioning,
- and that contact/resume information is available.

The Projects module should quickly communicate:

- current and past work,
- game development,
- professional software work,
- and that deeper project pages exist.

---

## Level 3 — Secondary / Wandering Widgets

Smaller modules should tempt the eye to wander.

Initial candidates:

- Newest Sketchbook entry
- Random Familiar
- Current Project
- Site Changelog
- Newest / Featured Collectible
- Visitor Profile / Avatar
- Most Visited Page
- Featured Interaction / Toy
- Random old Sketchbook scrap
- Recently added site content

These should generally follow a compact format:

> **strong visual + short title + minimal supporting text**

Examples:

### Familiar
- sprite
- name
- one-line blurb
- basic tags

### Sketchbook
- thumbnail or icon
- title
- 1–2 sentence excerpt
- “read more” only when needed

### Current Project
- image / sprite / screenshot
- project name
- short current-state label

### Changelog
- version/date
- 1–3 concise updates

---

# 6. Homepage Randomization and Rotation

Some homepage widgets should change over time.

This gives the site personality and makes repeat visits feel slightly different.

Prototype 04's homepage clutter is authored and spatially composed. In production, keep those authored objects and their relationships as the primary visual layer; randomized scraps are a supplemental layer placed around them. Randomization should add variation without replacing the designed composition, shifting priority content, or turning the page into uniform scatter.

The production authoring convention for positioning those decorative objects is documented in [CLUTTER_POSITIONING.md](CLUTTER_POSITIONING.md). It covers anchor-relative clutter placement; structural page layout remains page-specific.

Suitable candidates for randomization or scheduled rotation:

- Random Familiar
- Random old Sketchbook entry
- Featured collectible
- Featured toy
- Random project artifact
- Rotating visual scrap
- Daily or weekly “spotlight scrap”

Important professional information should **not** randomize.

The Spotlight should only change intentionally through authoring/admin controls.

Rotation should feel curated rather than chaotic.

---

# 7. Visitor Profile System

The site should have a lightweight local visitor profile.

This is not a social account.

It is a local persistent identity layer that supports the collectible system and site personalization.

## Initial Profile UI

A small avatar/profile-picture element should exist somewhere persistently or semi-persistently.

Initial default:

- classic generic gray silhouette,
- potentially with a question mark for deliberate cliché.

Clicking the avatar should open a small popover or panel.

Potential contents:

- current avatar,
- number of collectibles found,
- equipped cosmetics,
- badge count,
- most visited page,
- quick link to Collection.

The profile should remain compact and optional.

---

# 8. Avatar Collectibles

Avatars/profile pictures should be a collectible category.

The default profile image starts generic.

Unlockable avatars may come from:

- hidden interactions,
- project milestones,
- minigames,
- puzzles,
- Familiar discoveries,
- site events,
- references to media and internet culture,
- or completion goals.

Equipping an avatar should update the persistent visitor-profile display.

This reinforces the customized-profile inspiration without requiring user accounts.

---

# 9. Most Visited Page

The homepage may include a **Most Visited Page** widget.

This can be generated entirely from local browser data.

Purpose:

- quickly return visitors to the area they use most,
- make the site feel increasingly personalized,
- demonstrate local state and interconnected systems.

It should only track Breakspider routes.

Potential behavior:

- do not show until enough browsing history exists,
- avoid listing secret routes if doing so would spoil discovery,
- update locally,
- allow clear handling of ties.

---

# 10. Projects / “Things I've Made”

The site should use one unified project/archive section rather than splitting “Work” and “Projects.”

Working concept:

> **Things I've Made**

The exact public label can be refined later.

The section should contain:

- professional work,
- games,
- tools,
- experiments,
- future creative projects.

This avoids artificially separating “serious” software from personal creative work.

---

# 11. Projects Landing Page

Initial structure:

```text
/projects
├── Viscap
├── One Night Familiar Fight
└── future experiments/projects
```

The projects page should initially behave like a **visual archive / timeline** rather than being heavily categorized.

Projects of different types can coexist.

Possible metadata:

- title
- year / active dates
- project type
- role
- tech / medium
- current state
- short summary
- key visual
- optional status tag

As the archive grows, filtering may be introduced later.

Filtering is not required for v0.1.

---

# 12. One Night Familiar Fight Project Page

Route:

```text
/projects/one-night-familiar-fight
```

The ONFF page should primarily function as a **design and development notebook**, not a player-facing marketing page.

Primary emphasis:

- design thinking,
- system architecture,
- mechanics,
- simulation work,
- battle systems,
- content design,
- UI iteration,
- technical experimentation,
- development process.

Likely sections:

- project overview
- current state
- design goals
- combat / priority system
- system architecture
- Familiar integration
- visual development
- simulation / balancing
- development timeline
- selected Sketchbook posts
- related Familiar entries
- current build or demo status
- source/dev links where appropriate

The page should cross-link heavily to:

- Familiar pages
- relevant Sketchbook posts
- any available demo
- future technical writeups

The ONFF page should remain clearly understandable as a project page even if its presentation is expressive.

---

# 13. Future FFC Project Page

FFC is not required for v0.1, but the architecture should anticipate it.

Unlike ONFF, an eventual FFC page may be more **player-facing** because FFC is intended as a fuller game experience.

This means project pages should not all be forced into one identical template.

The projects system should support:

- portfolio-heavy project pages,
- dev-notebook project pages,
- and player-facing game pages.

---

# 14. Viscap Project Page

Route:

```text
/projects/viscap-ai
```

The page should make it explicit that Viscap was **one interconnected application containing many systems**, not a collection of unrelated mini-projects.

Recommended structure:

## Platform Overview
Explain:

- what the product was,
- intended users,
- overall platform purpose,
- creator's responsibilities,
- technical stack,
- level of ownership and collaboration.

## Interconnected Systems
Potential modules:

- Media Library
- Storyboards
- Actor Hub
- Contact Management
- Generative AI Assistance
- Internal workflows
- Content management systems
- Integrations
- QA / production support
- Architecture / deployment areas

Each module can include:

- screenshots,
- short description,
- role,
- interesting implementation problem,
- interaction/system relationship,
- technical notes.

The first version can keep these as sections on one page.

If one subsystem later warrants a deeper writeup, the architecture may support linkable child routes such as:

```text
/projects/viscap-ai/media-library
/projects/viscap-ai/storyboards
```

Child routes should only be created if the content is substantial enough to justify bookmarking.

---

# 15. About + Contact

Route:

```text
/about
```

About and Contact should be combined.

However, contact information must remain visually distinct and easy to locate.

The page should balance:

- personal identity,
- professional background,
- working style,
- skills,
- game-development ambitions,
- creative interests,
- contact methods.

Suggested structure:

## Identity
- name
- short professional summary
- current status

## Professional Snapshot
- full-stack engineering background
- strengths
- relevant tools/technologies
- high-level experience

## Creative / Working Philosophy
- systems thinking
- discovery-driven interaction
- game-development interests
- design instincts

## Contact Block
Visually distinct section containing:
- email
- LinkedIn
- GitHub
- résumé link/download
- availability status if active

Contact information should be:
- easy to scan,
- never hidden behind interaction,
- never visually buried under personal text.

---

# 16. Status / Availability

Status should appear only where it is useful.

Primary locations:

- Homepage Spotlight or homepage status widget
- About page

Examples:

- Available for work
- Currently employed
- Open to game-industry opportunities
- Currently building One Night Familiar Fight

The status does not need to become a global persistent header element.

---

# 17. Sketchbook

Route:

```text
/sketchbook
```

The Sketchbook should be a chronological feed with tags.

It should support two entry types.

## Short Entry

Lives entirely in the feed.

Example:

```text
Finished a new Ashwing idle animation today.

[image]

#pixel-art #pixel-pugilists
```

No standalone route required.

## Long Entry

Appears in the feed with an excerpt and links to a dedicated page.

Example:

```text
Why I'm simplifying priority rules with Battle Plans

[excerpt]

Read more →
```

Route:

```text
/sketchbook/[slug]
```

This hybrid reduces posting friction while allowing substantial essays when needed.

---

# 18. Sketchbook Tags

Sketchbook entries should support tags.

Possible examples:

- pixel-pugilists
- game-design
- programming
- web
- pixel-art
- ui
- tools
- design
- devlog

Tags should help people rediscover known content.

The Sketchbook should support:

- chronological browsing,
- tag filtering,
- search if useful,
- stable standalone URLs for substantial entries.

Tags do **not** need to become a universal taxonomy for the entire site.

---

# 19. Familiar Catalogue

Route:

```text
/familiars
```

The Familiar catalogue is a real first-class system but should not dominate the initial homepage or navigation while the catalogue is small.

Initial homepage exposure:

- Random Familiar widget
- ONFF project links
- contextual references

Catalogue entries:

```text
/familiars/[slug]
```

Each Familiar should be bookmarkable when enough information exists to justify a standalone profile.

Potential Familiar data:

- name
- sprite
- alternate sprite/animation
- short description
- fighting style
- role
- mechanical tags
- status associations
- project/game appearances
- design notes
- related Sketchbook posts

The catalogue should cross-link to ONFF.

ONFF should cross-link back to relevant Familiars.

---

# 20. Familiar Tagging

Familiars may use their own structured tags based on ONFF's game taxonomy.

Examples may include:

- offense
- defense
- sustain
- control
- tempo
- status themes
- mechanical roles
- element/aspect tags

These should remain separate from Sketchbook tags.

No universal site-wide tagging system is required.

---

# 21. Collection

Route:

```text
/collection
```

The Collection page should exist as infrastructure even if the first release contains only a few collectibles.

Early versions may be sparse.

Initial collectible categories may include:

- badges
- avatars
- cursor styles
- cursor followers
- profile decorations
- themes
- interactive toys

The Collection page should show:

- unlocked items,
- locked/unknown slots where appropriate,
- equipped items,
- descriptions,
- source/hint information only when desirable.

The site should avoid revealing every secret collectible's acquisition method by default.

The visual prototype previews profile selection and item pinning, but does not implement collectible ownership, unlock conditions, persistent equipment, or cross-page profile updates. Those are real v0.1 production features: discovery should award an item to browser-local visitor state, and equipping an owned cosmetic should update the visitor profile across the site. This is a planned product expansion, not behavior to assume already exists in the prototype.

---

# 22. Collection Visibility

The Collection should use **progressive disclosure**.

Before the visitor earns anything:

- no persistent collectible counter is shown,
- the Collection page may exist but does not need heavy promotion.

After the first unlock:

- a persistent or semi-persistent collectible indicator appears,
- visitor-profile popover becomes more meaningful,
- Collection becomes an obvious destination.

This makes the system itself feel discovered.

---

# 23. Collectible Counter

After the first unlock, a small UI element may show something like:

```text
3 / ??
```

or:

```text
★ 3
```

The exact visual language should be developed later.

It should:

- remain subtle,
- link to the visitor profile or Collection,
- persist across pages,
- avoid distracting from professional navigation.

Unknown totals may preserve mystery.

---

# 24. Human-Readable Site Map

The site should eventually contain a human-readable map/index.

Route:

```text
/map
```

This is not the XML sitemap.

It is a visual or textual directory of meaningful public areas.

The site map should itself be treated as a collectible discovery.

Concept:

> The visitor finds a **Map** item.

After obtaining it:

- `/map` becomes easily accessible through Collection/profile UI,
- the visitor gets a clear overview of public site areas,
- secret areas can remain omitted.

The map should be reasonably easy to obtain.

Its purpose is playful discovery, not deliberate obstruction.

The site should never depend on the map for essential navigation.

---

# 25. Content Visibility Tiers

Breakspider should distinguish between three kinds of content.

## Tier 1 — Public / Essential

Immediately accessible and professionally important.

Examples:

- Home
- About
- Projects
- contact info
- résumé
- One Night Familiar Fight
- Viscap

## Tier 2 — Discoverable

Real systems that are not necessarily in the navbar.

Examples:

- Sketchbook
- Familiar catalogue
- Collection
- Site Map
- interactive toys

These should be easy enough to find through normal exploration.

## Tier 3 — Secret

Optional hidden content.

Examples:

- gag pages
- secret rooms
- puzzle routes
- rare collectibles
- strange one-off interactions
- hidden minigames

Nothing professionally essential should ever exist only in Tier 3.

---

# 26. Cross-Linking Philosophy

Cross-linking is a core architectural principle.

The site should intentionally reinforce relationships between systems.

Key relationships:

```text
One Night Familiar Fight ↔ Familiars
One Night Familiar Fight ↔ Sketchbook
Familiars ↔ Sketchbook
Projects ↔ Sketchbook
About ↔ Projects
Collectibles ↔ Unlocking Page / Interaction
Viscap ↔ Viscap Subsystems
```

Examples:

A Familiar page may link to:
- ONFF
- posts discussing its design
- related mechanics

An ONFF page may surface:
- featured Familiars
- relevant Sketchbook posts

A Sketchbook post may link to:
- the Familiar being discussed
- the relevant project
- a demo or code sample

A collectible may record:
- where it was discovered
- what system it belongs to

Cross-links should be explicit and purposeful.

---

# 27. Backlinks

Where helpful, the site should support backlinks.

Example:

A Sketchbook entry about Ashwing links to:

```text
/familiars/ashwing
```

Ashwing's profile may then display:

```text
Related Sketchbook Entries
- Designing Ashwing's Burn Loop
- Reworking Ashwing's Idle Animation
```

This supports interconnected exploration without requiring a site-wide tag graph.

---

# 28. Linkability / URL Depth

Deep URLs are acceptable and encouraged for content worth saving.

Examples:

```text
/projects/one-night-familiar-fight
/projects/viscap-ai
/sketchbook/battle-plans
/familiars/ashwing
```

Potential future examples:

```text
/projects/viscap-ai/media-library
/projects/one-night-familiar-fight/simulation
```

Rule:

> **If a piece of content is noteworthy enough that someone might want to send, bookmark, cite, or return directly to it, it deserves a stable URL.**

Small transient UI states do not need routes.

---

# 29. Visitor Paths

The site should support multiple natural paths rather than one marketing funnel.

## Recruiter / Hiring Manager

Desired path:

```text
Home
→ About
→ Projects
→ Viscap / One Night Familiar Fight
→ Contact / Resume
```

They should quickly learn:

- professional identity,
- full-stack background,
- unusual design instincts,
- key projects,
- contact information.

---

## Game-Dev Peer

Desired path:

```text
Home
→ Projects
→ One Night Familiar Fight
→ Familiar Catalogue / Sketchbook
→ gets distracted by interactive systems
```

The site should show both:

- serious design/engineering thinking,
- and playful personal systems.

---

## Random Visitor

Possible path:

```text
Home
→ random widget
→ minigame / Familiar / Sketchbook / toy
→ collectible unlock
→ visitor profile
→ Collection
→ Site Map
```

They should be able to learn what the site is about even without professional intent.

---

## Existing One Night Familiar Fight Visitor

Desired path:

```text
One Night Familiar Fight
↔ Familiar Catalogue
↔ related Sketchbook posts
```

They should be able to move cleanly between:

- project overview,
- individual creature profiles,
- development notes.

---

# 30. Initial Data Entities

A practical first implementation will likely need structured data for the following.

## Spotlight

Fields may include:

- id
- title
- subtitle
- body
- content mode
- image/video/animation
- CTA label
- CTA destination
- active state
- publish date

---

## Project

Potential fields:

- slug
- title
- summary
- type
- role
- date range
- status
- hero image
- technologies
- sections
- related Sketchbook posts
- related Familiars
- external links

---

## Sketchbook Entry

Potential fields:

- id
- slug, optional
- title
- body
- excerpt
- type: short | long
- tags
- images/media
- published date
- related project
- related familiar
- public state

---

## Familiar

Potential fields:

- slug
- name
- sprite
- alternate media
- short blurb
- full description
- fighting style
- tags
- mechanics
- project appearances
- related Sketchbook entries
- publish state

---

## Collectible

Potential fields:

- id
- name
- category
- icon
- description
- rarity/presentation metadata if desired
- hidden state
- unlock condition identifier
- cosmetic configuration
- related route
- equipped state handled locally

---

## Changelog Entry

Potential fields:

- version/date
- title
- short notes
- related links

---

# 31. Authored Content vs Programmed Experiences

Architecture should preserve the rule:

> **Content gets authored. Experiences get programmed.**

Authored systems:

- Spotlight
- Projects
- Familiar catalogue
- Sketchbook
- Changelog

Programmed systems:

- puzzles
- minigames
- hidden interactions
- collectible unlock logic
- unusual animations
- secret routes
- dynamic toys

This separation should influence both admin tooling and project structure.

---

# 32. Homepage Authoring Requirements

The homepage should be editable without rewriting layout code.

At minimum, the author should eventually be able to update:

- Spotlight
- current project
- availability/status
- highlighted Sketchbook entry
- featured Familiar override
- site changelog

Random widgets may pull automatically from published content.

The layout remains stable while content changes.

---

# 33. Admin / Authoring Infrastructure

Not required for the first visual prototype, but the architecture should support a private authoring interface.

Potential routes:

```text
/admin
/admin/spotlight
/admin/projects
/admin/familiars
/admin/sketchbook
/admin/changelog
```

Possible workflow:

### Add Familiar
1. Upload sprite.
2. Enter name.
3. Add short blurb.
4. Add description.
5. Select fighting style / role / tags.
6. Link project.
7. Publish.

### Add Sketchbook Entry
1. Choose short or long format.
2. Add text.
3. Add optional media.
4. Add tags.
5. Link project/familiar if relevant.
6. Publish.

---

# 34. Desktop Composition

Desktop is the canonical expressive layout.

The homepage should support:

- overlapping modules,
- asymmetry,
- visual hierarchy,
- wandering eye movement,
- playful spatial relationships.

However, the layout should not be hardcoded so rigidly that content changes break it.

Likely implementation direction:

- structured layout zones,
- controlled overlaps,
- carefully constrained absolute positioning where appropriate,
- responsive breakpoints,
- widget-specific size variants.

The architecture should permit intentional mess without becoming brittle.

---

# 35. Mobile Composition

Mobile should simplify rather than merely shrink.

Likely transformation:

Desktop:
```text
        widget
   ABOUT     widget

      SPOTLIGHT

 widget     PROJECTS
       widget
```

Mobile:
```text
SPOTLIGHT

ABOUT

PROJECTS

secondary widget row

secondary widget row

profile / collection
```

The same systems remain represented, but overlap and spatial play can be reduced.

Future mobile-only secrets are welcome but out of initial scope.

---

# 36. v0.1 Route Scope

Recommended first public route set:

```text
/
├── /about
├── /projects
│   ├── /projects/one-night-familiar-fight
│   └── /projects/viscap-ai
├── /sketchbook
├── /familiars
├── /familiars/[slug]
├── /collection
└── /map
```

Not every route needs equal content depth on day one.

Priority:

## Must feel complete
- `/`
- `/about`
- `/projects`
- `/projects/one-night-familiar-fight`
- `/projects/viscap-ai`

## Can begin small but functional
- `/sketchbook`
- `/familiars`
- `/collection`
- `/map`

---

# 37. v0.1 Homepage Widget Set

A reasonable first homepage might include:

1. Spotlight
2. About
3. Things I've Made
4. Current Project
5. Latest Sketchbook Entry
6. Random Familiar
7. Site Changelog
8. Visitor Avatar/Profile
9. Most Visited Page, once enough local history exists
10. Collectible indicator, once first collectible is found

This is already enough to create the intended constellation without overloading the initial implementation.

---

# 38. v0.1 Cross-Link Requirements

At minimum:

### One Night Familiar Fight
Must link to:
- Familiars
- relevant Sketchbook content when available

### Familiar Entries
Must link to:
- One Night Familiar Fight

### Viscap
Must show:
- its major internal systems as interconnected parts of one platform

### About
Must link to:
- Projects
- résumé
- LinkedIn
- GitHub
- contact

### Homepage
Must provide:
- clear About path
- clear Projects path
- at least one playful secondary path

---

# 39. Architecture Anti-Goals

Avoid:

- turning every content type into a top-level navbar item,
- building a mega-menu,
- hiding professional information,
- creating standalone pages for content too small to justify them,
- universal tagging simply because it is technically possible,
- forcing every project into one template,
- requiring accounts for local collectibles,
- making Collection central before enough collectibles exist,
- creating secret pages that contain essential professional content,
- overcomplicating the admin system before content volume warrants it,
- building every future route before the first public launch.

---

# 40. Questions to Resolve During Wireframing

The architecture is stable enough to move into composition, but some visual decisions remain intentionally unresolved.

These should be answered through wireframes rather than more abstract planning:

1. Where exactly does persistent navigation sit?
2. What visual shape does the Spotlight take?
3. Where do About and Projects sit relative to Spotlight?
4. Which widgets overlap?
5. Which widgets resemble profile modules versus sketchbook scraps?
6. Where does the visitor avatar/profile control live?
7. How much of the homepage is visible above the fold?
8. How does the composition collapse on mobile?
9. What element carries the Breakspider site identity most prominently?
10. How does the page guide the eye without looking like a conventional dashboard?

---

# 41. Next Step

The next design phase should be a **homepage wireframe / composition study**.

The goal is no longer to determine what systems exist.

The goal is to determine:

- where they live,
- their relative visual weight,
- how the eye moves through the page,
- how the Spotlight anchors the composition,
- and how the site's “chaos with a purpose” principle becomes visible.

The first wireframe should focus on hierarchy and spatial relationships rather than final typography, colors, textures, or pixel art.

Once that composition works, a visual design comp can layer in the Breakspider aesthetic.
