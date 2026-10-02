# Breakspider Visual Reference Library

Prepared from the Breakspider design philosophy, site architecture, and inspiration manifest. This package documents the references; it does **not** propose a Breakspider design, wireframe, or visual comp.

## Research method and capture conditions

- The design philosophy was treated as the highest-level source of truth, the architecture as the structural constraint, and the manifest as the reference-specific brief.
- Desktop captures were made in a cloud Chrome viewport of **1363 × 936 px**, close to the requested 1440 px width.
- The available cloud-browser session exposed a fixed viewport and did not provide a permitted device-emulation control. A 390 px mobile shell was attempted and blocked by browser security policy. No desktop crops have been mislabeled as mobile screenshots.
- Consequently, mobile behavior is documented only where it could be observed or was explicitly defined in the manifest. Foam Talent's direct-drag mobile behavior and Cloudland's mobile composition still need a genuine 390 px follow-up capture.
- Sites that were unavailable or blocked were recorded as such. No substitute reference was introduced.
- Screenshots are viewport captures of the state that matters, not indiscriminate full-page captures.

## Capture index

| Reference | Captured states | Access notes |
|---|---|---|
| Friend's Gaia profile | supplied full collage | User-supplied foundational image |
| Cloudland Co. | entry/explore door, hub, About window | About loaded through canonical `.html` route after the extensionless URL briefly returned a gateway error |
| Tiger | default, hover/focus, clicked media detail | Live interaction captured |
| Muda | ball at rest, ball after scroll, destination after clicking ball | Live interaction captured |
| Ralts | unavailable page | Site returned “Site Unavailable” |
| Atomic Gothic | entry, main page, life-feed/cursor-follower state | Live interaction captured |
| Simon Denny | initial split panels, Enter transition result, attempted hover | Enter transition captured; dramatic hover expansion did not visibly fire in this browser |
| Yuinoid | homepage/profile layout, state after pointer movement | Trail was not persistent enough to read clearly in a still |
| Kaylee Rowena | house-centered homepage | Captured |
| Verdant Spectre | chronological feed, standalone long entry | Captured |
| Foam Talent 2021 | gallery baseline, edge-pan state | Desktop interaction captured; mobile emulation unavailable |
| Codrops case studies | both heroes, technical/process sections | Captured |
| Steam profile guide | guide overview, showcase slots, item/badge collector sections | Public guide captured; no account required |
| Monster Hunter Wilds official | access-error state | Official page returned a CloudFront 403 in this browser |
| Monster Hunter Wilds wiki | roster grid, individual detail page | Captured |
| XK Studio | active timeline project, next project selected | Captured |

---

## Foundational Visual Reference — Friend's Gaia Online Profile

**URL:** local supplied image  
**Priority:** P0  
**Role:** Personal-profile collage language / cultural reference  
**User rating:** not numerically rated  
**Primary usefulness:** aesthetic language; composition; visitor profile/collection

### Original observations

- Chaotic collage with clear underlying intentionality.
- Large anchor images are surrounded by medium clusters and tiny visual filler.
- Scale varies sharply; transparent sprites coexist with rectangular screenshots and cards.
- Overlap is heavy without fully destroying the important silhouettes.
- Personal interests are expressed through accumulated objects rather than an explicit list.
- The page unmistakably belongs to one person.

### Screenshot

- [`screenshots/foundational-gaia/profile-collage.png`](screenshots/foundational-gaia/profile-collage.png)

### Demonstrated principles

The profile works through accumulation, scale contrast, and adjacency. It is not a neat grid, yet repeated creature art, avatar cards, games, and internet artifacts produce a coherent personal world. Identity comes from what is collected and how it is arranged.

### Potential Breakspider borrowing

Borrow personal inhabitation, scale contrast, sprite/card mixing, and the idea that interests can be revealed spatially. This is a strong precedent for collectible displays, Familiar/project scraps, and profile widgets.

### Do not borrow

Do not reproduce this density. Breakspider's target is about 6/10 maximalism with stronger professional hierarchy, clearer negative space, and immediately available résumé/contact/project paths.

---

## 1. Cloudland Co. — Hub + About

**URLs:** <https://cloudlandco.com/hub>, <https://cloudlandco.com/pages/about/main>  
**Priority:** P0  
**Role:** Homepage composition, discovery, aesthetic direction, About-page treatment  
**User rating:** 10/10  
**Primary usefulness:** aesthetic language; composition; interaction

### Original observations

The graphic-heavy, animated hub is close to the desired Breakspider homepage. Large visible links lead into the rest of the site. The large door and `explore` prompt create the feeling of entering or discovering a larger place, while the About page feels like an actual desktop window.

### Screenshots

- [`desktop-entry-explore-door.jpg`](screenshots/cloudland/desktop-entry-explore-door.jpg)
- [`desktop-hub.jpg`](screenshots/cloudland/desktop-hub.jpg)
- [`desktop-about-window.jpg`](screenshots/cloudland/desktop-about-window.jpg)

### Specific design principles demonstrated

- A page can feel like a place before it behaves like a directory.
- One large invitation to explore can coexist with conventional text links.
- Major destinations can be literal illustrated objects rather than cards.
- The About page gains personality from a window shell while retaining ordinary scrollable text and top navigation.
- Illustration, typography, clouds, eyes, characters, and navigation share one authored visual system.

### Interaction behavior

The entry page uses the door and `Explore` label as the spatial invitation; activation opens the illustrated hub. The hub replaces a conventional navigation grid with large scene-linked destinations such as About, Gallery, Library, Studio, and Updates. The About route presents content inside a recognizable window frame with minimize/close affordances and its own scrollbar.

### Potential Breakspider borrowing

Borrow the feeling of crossing into a larger personal world, large navigational anchors, and a stable window/profile grammar for biography-like content. This should strongly influence homepage hierarchy and discovery language, with Breakspider-specific sprites and pixel assets replacing Cloudland's illustration language.

### Do not borrow

Do not copy the door, illustration style, rainbow palette, or exact window treatment. Essential professional destinations need to be even more immediately legible than they are here.

### Access/mobile notes

The extensionless About URL briefly produced a 502, while the canonical `.html` path loaded and redirected back to the manifest URL. A genuine 390 px capture could not be produced in the fixed cloud-browser viewport.

---

## 2. Tiger — Portfolio

**URL:** <https://tiger.exposed/>  
**Priority:** P0  
**Role:** Intentional clutter, collage behavior, focus interaction  
**User rating:** 10/10  
**Primary usefulness:** composition; interaction

### Original observations

Portfolio material forms a cluttered border around the viewport. Dense overlapping objects initially read as a visual mess, but hover slides an item outward and above its neighbors, and click reveals a more focused, detail-rich state. This is the clearest reference for Breakspider's desired rule: many things can look piled together if interaction lets the visitor pull one into focus.

### Screenshots

- [`desktop-default-clutter.jpg`](screenshots/tiger/desktop-default-clutter.jpg)
- [`desktop-hover-focus.jpg`](screenshots/tiger/desktop-hover-focus.jpg)
- [`desktop-hover-focused-item.jpg`](screenshots/tiger/desktop-hover-focused-item.jpg)
- [`desktop-clicked-detail.jpg`](screenshots/tiger/desktop-clicked-detail.jpg)

### Specific design principles demonstrated

- The center remains highly legible while imagery crowds the perimeter.
- Focus is temporal: the layout does not need to make every edge object readable at once.
- Hover can surface a label and pull an object above the pile without destroying the composition.
- Clicking promotes media into a large centered inspection state while the border and project list remain as context.

### Interaction behavior

Moving the pointer over an edge artifact raises it and reveals a small title label (the captured example reads “pure darkness”). Clicking expands the chosen artifact into a large centered media panel over the project index. The interaction turns clutter into an indexable archive through staged disclosure.

On mobile, the likely equivalent must be explicit tap-to-focus followed by tap-to-open; hover cannot remain the only route to clarity. That mobile state was not independently captured here.

### Potential Breakspider borrowing

Use this behavior for project-artifact piles, inspiration scraps, collectibles, sketchbook ephemera, or overlapping Familiar imagery. It is a stronger behavioral reference than a styling reference.

### Do not borrow

Do not place essential professional navigation inside the clutter or make hover necessary to understand the page. Dense material should support the Spotlight/About/Projects hierarchy.

---

## 3. Muda — Navigation Ball

**URL:** <https://muda.co/index/>  
**Priority:** P0  
**Role:** Playful interaction, interface-as-toy, unconventional navigation objects  
**User rating:** 10/10 for the navigation interaction  
**Primary usefulness:** interaction; composition

### Original observations

The physics-enabled navigation ball bounces in response to scrolling and is embedded in a strange physical-feeling contraption. It makes an ordinary site function funny, surprising, and mechanically responsive.

### Screenshots

- [`desktop-navigation-ball-rest.jpg`](screenshots/muda/desktop-navigation-ball-rest.jpg)
- [`desktop-navigation-ball-after-scroll.jpg`](screenshots/muda/desktop-navigation-ball-after-scroll.jpg)
- [`desktop-navigation-ball-click.jpg`](screenshots/muda/desktop-navigation-ball-click.jpg)

### Specific design principles demonstrated

- Functional UI can become a toy without ceasing to be functional.
- A simple, saturated object can persist across otherwise spare content and establish continuity.
- Scroll can be treated as a physical impulse rather than only page movement.
- The same object can serve as both state indicator and navigational affordance.

### Interaction behavior

At rest, the purple ball sits over the featured image. Scrolling moves the page to a drawn directional contraption while the ball changes position as if subject to gravity/inertia. Clicking the ball navigates to another functional section (`/playables/`), where it persists over new content.

### Potential Breakspider borrowing

Borrow the principle that one memorable functional element can have physical behavior: a profile orb, collectible container, site-map object, or mascot that also opens useful information.

### Do not borrow

Do not copy the ball or turn all navigation into physics. One mechanically distinctive object is enough; Home, Projects, About, contact, and résumé paths still need conventional clarity.

---

## 4. Ralts Neocities

**URL:** <https://ralts.neocities.org>  
**Priority:** P0  
**Role:** Homepage aesthetic, profile widgets, old-internet texture  
**User rating:** 9/10  
**Primary usefulness:** aesthetic language; composition; visitor profile/collection

### Original observations

The manifest highlights an `update.txt` homepage widget, bio information integrated into the homepage, window-like presentation, characters attached to panels while scrolling, a marquee, and a profile-like About page. It is one of the strongest references for turning the personal-profile idea into homepage modules.

### Screenshot

- [`access-unavailable.jpg`](screenshots/ralts/access-unavailable.jpg)

### Access result

The reference returned **“Site Unavailable — Unable to access this site.”** in the cloud browser. No substitute was used, and the update widget, bio, marquee, attached characters, and About route could not be independently recaptured.

### Potential Breakspider borrowing

The manifest's assigned principles remain useful: changelog/status module, small characters attached to panels, marquee-like rotating information, and an About page framed as a profile rather than a corporate biography.

### Do not borrow

Do not infer or copy unverified current styling from memory. Preserve the profile grammar only, and keep Breakspider's professional scanning hierarchy intact.

---

## 5. Atomic Gothic

**URLs:** <https://atomicgothic.neocities.org/>, <https://atomicgothic.neocities.org/atomic%20gothic%20test/AGdrafthtml>  
**Priority:** P0  
**Role:** Personal internet texture, eccentricity, status/life-feed ideas, collectible-style effects  
**User rating:** 9/10 aesthetically  
**Primary usefulness:** aesthetic language; interaction; visitor profile/collection

### Original observations

The `ENTER` transition creates immediate nostalgia. The site combines animation, art, sprites, banners, a small life-update feed, a styled cursor, a cursor-following character, and animated `NEW` markers into an eccentric page that feels alive and maintained.

### Screenshots

- [`desktop-entry.jpg`](screenshots/atomic-gothic/desktop-entry.jpg)
- [`desktop-home-after-enter.jpg`](screenshots/atomic-gothic/desktop-home-after-enter.jpg)
- [`desktop-life-feed-cursor-follower.jpg`](screenshots/atomic-gothic/desktop-life-feed-cursor-follower.jpg)

### Specific design principles demonstrated

- The threshold into a site can be part of its identity.
- A prominent update feed gives a handmade site temporal presence.
- Navigation can look like authored graphic assets while remaining readable.
- `NEW` markers, banners, and followers are most effective when attached to real information or state.

### Interaction behavior

The centered `ENTER` graphic navigates into the full site. The main page presents a dense three-column profile composition: welcome/media on the left, a bright scrollable life-update window in the center, and site navigation/status material on the right. A drawn character follows the cursor; moving the pointer changes its position. `NEW` labels visibly mark updated navigation content.

### Potential Breakspider borrowing

Borrow visible signs of life: current-status feed, changelog, collectible cursor followers, authored banners, and meaningful `NEW` indicators. This can help Breakspider feel actively inhabited rather than launched once and abandoned.

### Do not borrow

Do not copy the overall hierarchy, warning pop-up, palette, character art, or full density. Atomic Gothic is an aesthetic/personality reference, not the homepage layout blueprint.

---

## 6. Simon Denny

**URL:** <https://simondenny.net>  
**Priority:** P1  
**Role:** Motion, dramatic UI transitions, fixed-vs-scrolling hierarchy  
**User rating:** 7/10  
**Primary usefulness:** composition; interaction; project/case-study presentation

### Original observations

The manifest calls out navigation expanding dramatically into the header on hover, initial panels collapsing after entry, major items fixed on one side, less-emphasized material in a scrolling feed on the other, and strong animated state changes.

### Screenshots

- [`desktop-home-rest.jpg`](screenshots/simon-denny/desktop-home-rest.jpg)
- [`desktop-entered-split-layout.jpg`](screenshots/simon-denny/desktop-entered-split-layout.jpg)
- [`desktop-hover-no-visible-change.jpg`](screenshots/simon-denny/desktop-hover-no-visible-change.jpg)

### Specific design principles demonstrated

- The initial view can be a dramatic visual choice screen, then collapse into a more useful information state.
- A strong vertical division can separate selected/major content from a denser feed of current and secondary material.
- Animation can mark a change of mode rather than merely decorate a page.

### Interaction behavior

The initial page divides the viewport into large Press and Works panels under a narrow `enter` control. Activating `enter` collapses the dramatic panels into a legible split layout: large selected projects on the left and upcoming/ongoing/press feed modules on the right.

The manifest's hover-exploding navigation did not visibly trigger in this browser; the attempted hover state is retained as evidence rather than mislabeled as a successful expanded state.

### Potential Breakspider borrowing

Useful for transitions between a visually theatrical homepage state and a readable project/archive state, or for a project page where a fixed major artifact coexists with a scrolling development feed.

### Do not borrow

Do not let constant motion destabilize hierarchy. Breakspider transitions should explain a state change and settle quickly.

---

## 7. Yuinoid Neocities

**URL:** <https://yuinoid.neocities.org/>  
**Priority:** P1  
**Role:** Old-profile texture, collectible interaction ideas  
**User rating:** 7/10  
**Primary usefulness:** aesthetic language; interaction; visitor profile/collection

### Original observations

The manifest highlights cursor sparkles, banners, rotating/cycling imagery, strong 2000s profile energy, and decorative motion tied to the cursor. The overall layout is explicitly considered too illegible.

### Screenshots

- [`desktop-profile-layout.jpg`](screenshots/yuinoid/desktop-profile-layout.jpg)
- [`desktop-after-pointer-movement.jpg`](screenshots/yuinoid/desktop-after-pointer-movement.jpg)

### Specific design principles demonstrated

- Tiny banners, counters, archive lists, compact categories, and personal links create a strongly inhabited profile texture.
- Dense link clusters communicate depth and personal history even before individual items are opened.
- Effects can become equipable identity cosmetics rather than permanent site-wide decoration.

### Interaction behavior

Rapid pointer movement was performed to test the sparkle trail. The effect was not persistent enough to read clearly in a still capture, so the screenshot is labeled only as a post-pointer-movement state. The homepage itself visibly rotates/updates compact graphic regions and exposes a very dense archive through expandable categories.

### Potential Breakspider borrowing

Use cursor trails, sparkles, followers, and small banners as optional collectibles or equipped cosmetics. Rotating imagery can work inside bounded profile widgets.

### Do not borrow

Do not borrow the overall information hierarchy or ultra-small scale. The user explicitly considers this layout too illegible.

---

## 8. Kaylee Rowena

**URL:** <https://kayleerowena.com/>  
**Priority:** P1  
**Role:** Clear centerpiece, legibility, compositional counterweight  
**User rating:** 6/10  
**Primary usefulness:** composition

### Original observations

The house is an unmistakable centerpiece while surrounding content remains neat and navigable. It is a counterweight to the maximalist references: many elements can surround the page while one focal object still dominates.

### Screenshot

- [`desktop-house-centerpiece.jpg`](screenshots/kaylee-rowena/desktop-house-centerpiece.jpg)

### Specific design principles demonstrated

- A single central silhouette can orient the entire page.
- Symmetrical left/right link groups can clarify an otherwise illustrative composition.
- Small live modules (`upcoming events`, `currently`) add personality without competing with the main object.
- Navigation remains visibly button-like and understandable.

### Potential Breakspider borrowing

Use as a hierarchy test for the Spotlight: squinting at the page should still reveal the centerpiece first, with About and Projects as the next obvious paths.

### Do not borrow

Do not treat this as an aesthetic reference. The palette, house, symmetry, and clean spacing are not Breakspider's intended overall language.

---

## 9. Verdant Spectre — Microblog

**URL:** <https://verdantspectre.dev/microblog/>  
**Priority:** P1  
**Role:** Sketchbook information architecture  
**User rating:** 9/10 as a Sketchbook layout reference  
**Primary usefulness:** Sketchbook/content architecture

### Original observations

The reference demonstrates a simple chronological feed with short posts, optional attachments, entries that live entirely in the feed, and larger entries that link to dedicated pages. It closely matches the planned Breakspider Sketchbook model.

### Screenshots

- [`desktop-chronological-feed.jpg`](screenshots/verdant-spectre/desktop-chronological-feed.jpg)
- [`desktop-standalone-long-entry.jpg`](screenshots/verdant-spectre/desktop-standalone-long-entry.jpg)

### Specific design principles demonstrated

- Date and stable item number provide lightweight chronology.
- A very short update can be complete in-feed.
- A longer entry can include a linked preview card without changing the feed's basic rhythm.
- Standalone entries support deeper material and comments/related systems while retaining a stable URL.

### Interaction behavior

The feed's short entry (`#62`) is self-contained. Longer items expose title links and attachment cards. Activating a long-entry title opens a dedicated route with a full article/comment surface.

### Potential Breakspider borrowing

Borrow the content model directly: short entries end in the feed; long entries show an excerpt/attachment and open a linkable page. Preserve date, tags, related project/Familiar links, and low-friction posting.

### Do not borrow

Do not borrow the terminal-like aesthetic. This reference is structural, not visual.

---

## 10. Foam Talent 2021

**URL:** <https://talent2021.foam.org/>  
**Priority:** P1  
**Role:** Responsive interaction translation, large exploratory canvas  
**User rating:** 8/10 for interaction and mobile translation  
**Primary usefulness:** interaction; responsive/mobile behavior

### Original observations

On desktop, the gallery pans when the pointer approaches viewport edges. On mobile, the same conceptual space is moved by direct touch dragging. It is the primary reference for the rule that mobile should reinterpret an experience rather than merely shrink it.

### Screenshots

- [`desktop-gallery-start.jpg`](screenshots/foam-talent/desktop-gallery-start.jpg)
- [`desktop-gallery-edge-pan-right.jpg`](screenshots/foam-talent/desktop-gallery-edge-pan-right.jpg)

### Specific design principles demonstrated

- The canvas is larger than the viewport, with partial images signaling more space outside the frame.
- A centered active work receives a title card while neighboring works remain peripheral.
- Pointer position becomes navigation input; the interface avoids conventional scrollbars as the primary mental model.
- The conceptual action (“move around the gallery”) can be preserved across different input hardware.

### Interaction behavior

The baseline shows a centered photograph connected to its title by a thin vertical line, with adjacent works clipped by the viewport. Holding the pointer near an edge continuously pans the gallery; the edge-pan capture shows the composition shifted far enough that the former center has left the viewport.

The manifest specifies direct touch dragging on mobile. The fixed cloud-browser viewport did not permit a genuine 390 px emulation, so that mobile state remains a required follow-up capture rather than an unverified claim from this run.

### Potential Breakspider borrowing

Borrow the responsive-design principle: desktop hover/pointer-position interactions should receive deliberate touch gestures or tap states, not a scaled-down imitation.

### Do not borrow

Do not borrow Foam's black gallery aesthetic, photography treatment, or endless-canvas composition as a general Breakspider look.

---

## 11. Creative Process / Personal Project Platform — Codrops

**URLs:**

- <https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/>
- <https://tympanus.net/codrops/2025/09/17/the-making-of-a-personal-project-platform-a-portfolio-that-grew-out-of-process-and-play/>

**Priority:** P1  
**Role:** Project pages, case-study structure, professional legibility  
**User rating:** 7/10  
**Primary usefulness:** project/case-study presentation

### Original observations

These references combine representative animation, readable hierarchy, process screenshots, technical decisions, unfinished work, and development evolution without feeling like generic corporate case-study pages. They are structural references for One Night Familiar Fight and Viscap.

### Screenshots

- [`webgl-portfolio-hero.jpg`](screenshots/codrops/webgl-portfolio-hero.jpg)
- [`webgl-portfolio-technical-process.jpg`](screenshots/codrops/webgl-portfolio-technical-process.jpg)
- [`webgl-portfolio-result-evolution.jpg`](screenshots/codrops/webgl-portfolio-result-evolution.jpg)
- [`project-platform-hero.jpg`](screenshots/codrops/project-platform-hero.jpg)
- [`project-platform-building-process.jpg`](screenshots/codrops/project-platform-building-process.jpg)

### Specific design principles demonstrated

- The opening establishes title, premise, author/date, tags, and representative visual immediately.
- Process is divided into named technical/design problems rather than one uninterrupted essay.
- Code blocks, diagrams, videos, component screenshots, and prose are interleaved at the point where each becomes relevant.
- The platform article shows early Figma component work immediately before explaining stack decisions, making evolution legible.
- A technical section such as “MeshPortal: Rendering a Bounded Scene” explains what changed, why, and the core implementation without burying the result.

### Interaction behavior

These are primarily scroll-led articles. Embedded animation/video provides representative motion while the page preserves conventional reading behavior, stable headings, and a clear vertical narrative.

### Potential Breakspider borrowing

Use modular sections for Problem → Constraint → Solution → Why → Challenge → Result. Pair screenshots or diagrams with the decision they explain. Let abandoned ideas and unfinished states appear as evidence of process. Viscap should use the structure to show one interconnected platform; One Night Familiar Fight should use it as a design/development notebook.

### Do not borrow

Do not inherit Codrops' publication aesthetic or make Breakspider projects feel like generic blog articles. Breakspider needs more authored chaos, cross-links, side artifacts, Familiar links, and sketchbook personality while retaining this legibility.

---

## 12. Steam Community — Profile Customization Guide

**URL:** <https://steamcommunity.com/sharedfiles/filedetails/?id=2035019938>  
**Priority:** P2  
**Role:** Visitor profile, modular customization, Collection structure  
**User rating:** not supplied  
**Primary usefulness:** visitor profile/collection

### Original observations

The profile is a modular customization surface built from avatar, showcases, badges, and selectively displayed collected material. The important distinction is between everything a user owns and what they choose to equip or showcase.

### Screenshots

- [`desktop-guide-overview.jpg`](screenshots/steam/desktop-guide-overview.jpg)
- [`desktop-avatar-profile-basics.jpg`](screenshots/steam/desktop-avatar-profile-basics.jpg)
- [`desktop-item-showcase-collection.jpg`](screenshots/steam/desktop-item-showcase-collection.jpg)
- [`desktop-badge-showcase.jpg`](screenshots/steam/desktop-badge-showcase.jpg)

### Specific design principles demonstrated

- Showcase slots create scarcity and curation: a profile is not the full inventory.
- Profile basics establish identity first, then modules expose interests and achievements.
- Different showcase types share a common slot concept while presenting different data.
- Badge/Game Collector sections distinguish ownership metrics from selected display objects.

### Interaction behavior

The guide illustrates selecting a showcase from earned slots, then configuring the chosen display. This is a two-layer model: collection/ownership exists broadly, while the profile presents only a curated subset.

### Potential Breakspider borrowing

The compact visitor profile should foreground avatar, selected badge/title, equipped cursor/follower, and perhaps one favorite collectible. The Collection page can hold the full inventory, locked slots, hints, and equipment controls.

### Do not borrow

Do not borrow Steam's visual styling, leveling economy, or dense inventory framing. The subsystem should feel like a strange customized personal profile and remain lightweight/local-first.

---

## 13. Monster Hunter Wilds — Official Monster Page

**URL:** <https://www.monsterhunter.com/wilds/en-us/monster/>  
**Priority:** P2  
**Role:** Featured Familiar presentation  
**User rating:** 7/10 layout reference  
**Primary usefulness:** Familiar catalogue

### Original observations

The manifest assigns this reference to a large featured-monster hero, parallax scrolling, strong transitions, and the principle that one selected creature can receive much more visual weight than the rest of a roster.

### Screenshot

- [`access-blocked-403.jpg`](screenshots/monster-hunter-official/access-blocked-403.jpg)

### Access result

The official page returned a **CloudFront 403 / “The request could not be satisfied”** in this cloud browser. The hero and transition could not be captured, and no alternate Monster Hunter page was substituted.

### Potential Breakspider borrowing

Retain only the manifest's subsystem principle: one featured Familiar may receive large art, animation, and concise staging before the catalogue falls back to a simpler roster.

### Do not borrow

Do not turn every Familiar into a full cinematic panel, and do not infer specific current visuals from the blocked page.

---

## 14. Monster Hunter Wilds Wiki — Monster Grid

**URL:** <https://monsterhunterwilds.wiki.fextralife.com/Monsters>  
**Priority:** P2  
**Role:** Familiar catalogue grid  
**User rating:** 7/10 layout reference  
**Primary usefulness:** Familiar catalogue

### Original observations

The complete roster is presented as a straightforward, scannable grid: simple visual plus name, with selection leading to deeper information. This is close to the desired Familiar baseline of `sprite + name first; details on interaction`.

### Screenshots

- [`desktop-monster-grid.jpg`](screenshots/monster-hunter-wiki/desktop-monster-grid.jpg)
- [`desktop-individual-monster-detail.jpg`](screenshots/monster-hunter-wiki/desktop-individual-monster-detail.jpg)

### Specific design principles demonstrated

- Category tabs and species links exist above the roster but do not overload each tile.
- Repeated image/name units make the roster quick to scan.
- The detail route expands one selection into description, taxonomy, traits, and related data.
- The grid and individual profile use stable URLs.

### Interaction behavior

The roster section begins with category tabs, then shows repeated creature images and names. Selecting `Ajarakan` opens a dedicated page with a large named creature card beside descriptive text and structured attributes.

### Potential Breakspider borrowing

Use custom sprite + Familiar name as the dominant grid unit, with only minimal tags if needed. Click/tap should open a linkable profile or focused panel containing mechanics, role, personality, appearances, and related Sketchbook posts.

### Do not borrow

Do not copy the wiki styling, advertising-heavy shell, or description-heavy cards. Breakspider's roster should be visually lighter and more authored.

---

## 15. XK Studio

**URL:** <https://xk.studio/>  
**Priority:** P3  
**Role:** Future Spotlight/navigation ideas  
**User rating:** 5/10 currently  
**Primary usefulness:** composition; interaction

### Original observations

The manifest calls out timeline-style navigation, dynamic focus based on the item nearest the viewport center, and a slowly moving presentation of multiple items. It is only a future possibility if the Spotlight ever supports multiple entries.

### Screenshots

- [`desktop-timeline-focus.jpg`](screenshots/xk-studio/desktop-timeline-focus.jpg)
- [`desktop-timeline-next-focus.jpg`](screenshots/xk-studio/desktop-timeline-next-focus.jpg)

### Specific design principles demonstrated

- One large active project dominates while neighboring project previews remain partially visible in a bottom strip.
- Active titles sit directly above their associated timeline ranges.
- Moving/selecting another timeline segment replaces the central media without changing the whole site shell.

### Interaction behavior

The initial state foregrounds Shiseido Ultimune. Selecting the Beats/Jennie segment changes the central visual and project URL while preserving the bottom timeline. Custom scroll behavior timed out in this browser, so the selection state was captured via direct project activation.

### Potential Breakspider borrowing

Only consider this later if multiple Spotlight items genuinely need a timeline or slowly moving rail, with the central item gaining emphasis.

### Do not borrow

Do not complicate v0.1's single authored Spotlight to prepare for a hypothetical carousel. This reference should not influence the general homepage aesthetic.

---

# Cross-reference synthesis

## Patterns shared by multiple high-priority references

### 1. A dominant anchor surrounded by discoverable secondary material

Cloudland uses a large scene/entry invitation; Kaylee Rowena uses the house; Atomic Gothic uses its masthead and central update window; Tiger preserves a readable center while clutter accumulates at the perimeter. Together they support the architecture's three-level hierarchy: Spotlight first, About/Projects second, wandering widgets third.

### 2. Personal identity is spatial and modular

The Gaia collage, Ralts brief, Atomic Gothic, Yuinoid, and Steam guide all treat a profile as an arrangement of modules, artifacts, badges, banners, images, and current-state indicators. Personality is not confined to an About paragraph. Breakspider should reveal identity through placement, accumulation, selection, and persistence.

### 3. Clutter becomes usable through staged focus

Tiger is the clearest example, but Foam Talent and XK Studio use related focus rules: many objects exist in a larger field, while one object receives active visual weight. Breakspider's “chaos with a purpose” should depend on promotion/focus states, not on making every object equally loud.

### 4. Interaction is strongest when it performs a real job

Muda's ball navigates. Tiger's hover/click focuses portfolio work. Cloudland's door enters the site. Atomic Gothic's `NEW` markers point to updates. Steam showcases express chosen identity. None of these principles require decorative motion without consequence.

### 5. The site should visibly have a present tense

Cloudland's latest update, Atomic Gothic's life feed, Kaylee's current/upcoming boxes, Ralts' described `update.txt`, and Verdant Spectre's chronology all indicate an actively maintained place. A compact status/changelog/current-project layer is not filler; it is part of the personal-profile premise.

### 6. Deep content can remain conventionally legible

Verdant Spectre and Codrops intentionally simplify once the visitor enters reading-heavy content. Steam and the Monster Hunter wiki also separate overview from detail. This supports straightforward underlying routes and stable URLs even when the homepage is unusual.

## Intentional disagreements between references

| Design question | One side | Other side | Breakspider implication |
|---|---|---|---|
| How dense should the homepage be? | Gaia, Tiger, Atomic Gothic, Yuinoid favor density | Kaylee Rowena favors open clarity | Target 6/10 maximalism; use Kaylee as the hierarchy test, not the style target |
| Should navigation be scenic/toy-like or explicit? | Cloudland and Muda turn navigation into objects | Kaylee, Verdant, and Codrops stay obvious | Maintain small persistent Home/Projects/About navigation; add one or two playful functional paths |
| Should focus come from hover or stable layout? | Tiger and Simon use transient state changes | Steam, Verdant, and the wiki keep persistent structures | Hover may enhance, never gate; mobile receives tap/direct-manipulation equivalents |
| Should deep pages remain visually theatrical? | Simon and Monster Hunter official imply dramatic presentation | Codrops and Verdant prioritize reading | Use theatrical openings/featured sections, then settle into modular readable content |
| How much should mobile preserve? | Foam translates the interaction | Desktop collage references imply simplification | Preserve concepts and personality, not exact coordinates or hover behavior |

## References with the most influence on the eventual homepage

1. **Cloudland Co. (P0):** place-like entry, large visual destinations, window/profile treatment.
2. **Tiger (P0):** overlap becomes legible through focus; clutter belongs around the hierarchy.
3. **Muda (P0):** one functional UI element can also be a memorable toy.
4. **Gaia profile (P0):** personal inhabitation, scale variation, and identity through accumulation.
5. **Atomic Gothic (P0):** update/status life, banners, followers, and visibly handmade eccentricity.
6. **Ralts (P0, pending recapture):** profile-widget grammar, changelog/bio/marquee modules.
7. **Kaylee Rowena (P1 counterweight):** Spotlight dominance and navigational clarity.
8. **Foam Talent (P1 interaction constraint):** mobile should reinterpret desktop input.

This ordering does not mean averaging their aesthetics. Cloudland/Tiger/Muda/Gaia/Atomic Gothic define broad principles; Kaylee and Foam act as constraints on clarity and responsiveness.

## References that should influence only assigned subsystems

- **Verdant Spectre:** Sketchbook feed and short-vs-long entry architecture only.
- **Codrops:** project/case-study structure and process legibility only.
- **Steam:** visitor profile showcase vs full Collection distinction only.
- **Monster Hunter official:** featured Familiar staging only; currently blocked and pending capture.
- **Monster Hunter wiki:** scannable Familiar roster and stable detail routes only.
- **Foam Talent:** responsive input translation and exploratory-canvas behavior only.
- **XK Studio:** possible future multi-Spotlight timeline only.
- **Simon Denny:** optional state transitions and fixed-major/scrolling-minor layouts, not the overall look.
- **Yuinoid:** optional profile-era effects and collectible cosmetics, not information hierarchy.

## Important design problems still under-referenced

### 1. Genuine mobile composition for dense personal-profile homepages

Foam covers input translation, but the set still lacks a strong captured example of a layered, personal, professionally legible homepage redesigned around a real 390 px viewport. This is the most important gap, and it was not possible to fill with the fixed cloud-browser viewport in this run.

### 2. Accessible versions of playful physics and draggable UI

Muda proves the appeal of interface-as-toy, but the set lacks examples showing keyboard focus, reduced-motion behavior, screen-reader labeling, and non-pointer alternatives for the same interaction.

### 3. Professional portfolio copy inside a highly personal layout

Codrops supplies readable case-study structure and the P0 references supply personality, but there is no single reference demonstrating full-stack engineering credibility inside a chaotic-with-purpose profile composition. Breakspider will need to solve that synthesis itself rather than copy an existing pattern.

### 4. Local-first visitor progression with clear privacy/reset controls

Steam informs curation and collection, but not a no-account, browser-local visitor profile. The eventual design still needs patterns for first-unlock disclosure, persistence messaging, equipment, reset/export, and graceful storage loss.

### 5. Authoring-state and content-growth resilience

The architecture expects Spotlight, Familiar, Sketchbook, project, and changelog authoring. The visual references do not show how expressive modules behave with missing media, long titles, sparse early collections, or years of accumulated content.

## Research conclusion

The reference set is coherent because it assigns different jobs to different sources. The homepage direction is not “retro web.” It is a personally inhabited, post-2007 internet-profile space with a dominant Spotlight, obvious professional paths, controlled overlap, one or two memorable functional toys, and signs of ongoing life. Deeper systems should become calmer and more structurally conventional: Codrops for projects, Verdant Spectre for Sketchbook, Steam for visitor showcase logic, and Monster Hunter references for the featured-Familiar/roster split.

The next design pass should begin from these weighted principles—not from a visual average—and should not proceed until the missing mobile-composition question is acknowledged explicitly.
