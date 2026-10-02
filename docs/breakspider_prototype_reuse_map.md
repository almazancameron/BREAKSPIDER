# Breakspider Prototype Reuse Map

This document records how the approved prototypes should translate into the production codebase. Prototypes are visual and interaction references, not production architecture to copy wholesale.

The governing rule is:

> Shared infrastructure for shared behavior; bespoke composition for bespoke pages.

## Project naming

**Pixel Pugilists and One Night Familiar Fight (ONFF) are the same project.** Pixel Pugilists is an earlier name used in prototype material. All Pixel Pugilists content, screenshots, Familiars, and development artifacts in the prototypes should be treated as material for the ONFF project, not as a separate project entry. Use `/projects/one-night-familiar-fight` for the project page and `/play/onff` for the playable-build route.

## Prototype translation table

| Prototype or area | Reusable behavior or UI candidates | Composition that stays page-specific | Content or configuration |
|---|---|---|---|
| **Global shell and splash** | Navigation links; visitor profile/avatar; persistent sound toggle; intro seen/replay/skip behavior; shared focus and reduced-motion support. Share controls and behavior while allowing each page to arrange them differently. | Splash animation and presentation; each page’s relationship between its header and content. | Navigation destinations and labels; intro state key; logo assets and animation settings. |
| **Home — Prototype 04** | Artifact inspection dialog and media viewer; Familiar preview; project media; visitor profile; navigation and audio behavior. Reuse concepts that also appear elsewhere. | Spotlight arrangement; About and Projects paths; object clusters, overlaps, density, negative space, authored decorative placements, and mobile reading order. | Home content and decorative-object placement data. Keep placements separate from JSX and attach them to named regions where practical. |
| **About + Contact** | Shared site shell and link/focus behavior; shared portrait or media rendering if the same concept appears elsewhere. | Profile hierarchy, portrait placement, biography, and contact composition. | Biography, contact destinations, résumé link, and identity media. |
| **Projects archive** | Project preview data such as title, summary, status, and media; responsive media handling. Reuse a preview only where it fits; do not force every project into the same visual treatment. | Archive arrangement and the distinct visual language of each project preview. | Typed project records and their links/media. ONFF and Viscap AI are the canonical project routes. |
| **One Night Familiar Fight project page** | Shared project media and inspection behavior; shared links and visitor state. | Game-development workbench and battle-plan presentation. Keep it distinct from Viscap AI and from the playable-game wrapper. | ONFF project content, captures, Familiar references, and related Sketchbook posts. All prototype material labeled Pixel Pugilists belongs to this project. |
| **Viscap AI project page** | Shared media viewer/dialog, image rendering, captions, and link behavior. | Connected-system visualization, subsystem selection, and its mobile linear guide. | Typed subsystem list with labels, descriptions, capture references, and relationships. Review/redact captures before public use. |
| **Sketchbook feed** | Post previews, media rendering, and links to detail routes. Keep tag filtering local unless another page develops the same filtering need. | Feed chronology, density, and arrangement of short versus long entries. | Typed post records, tags, dates, excerpts, and media references. |
| **Sketchbook long entry** | Typed body-block rendering and shared content media; related-content links. | Article layout, annotations, side notes, and reading order. | Body blocks, captions, tags, publication dates, and related content. |
| **Familiars catalogue** | Familiar preview, sprite/media rendering, tags, and links—concepts that also appear on Home and detail pages. | Featured Familiar treatment and roster arrangement, including how unknown slots are presented. | Familiar records, featured selection, roster ordering, and confirmed tags. Familiars in prototype material are ONFF content. |
| **Familiar detail** | Familiar identity data, sprite/media display, tags, and related-content links. A shared dialog may support media inspection if used on this page. | Sprite-led profile, field notes, and page-specific mobile order. Keep the pixel-grid toggle local unless it becomes a repeated interaction. | Individual Familiar details and related projects/posts; do not invent unconfirmed mechanics. |
| **Collection** | Visitor-state access; avatar and badge rendering; collectible icon/media primitives; shared dialog and focus behavior. | Inventory/profile arrangement, selected-item treatment, and category presentation. | Collectible definitions and unlock/equipment state. The prototype’s local pinning is a visual reference, not an implemented production behavior. |
| **Map** | Standard navigation links and accessible selected/active states. | Route graph, node layout, and touch-friendly mobile directory. | Route nodes and their labels, destinations, and descriptions. |
| **Playable ONFF route** | Shared site shell, media sizing, return navigation, and sound coordination. | Game wrapper, loading/unsupported states, and gameplay-specific controls. | Godot Web build assets and wrapper settings. The playable build is a roadmap implementation, not a finished composition in the prototype summary. |

## Layout and placement conventions

Use different conventions for decorative objects, ordinary page structure, and authored diagrams. This keeps special positioning clear without turning every page into layout data or a general page builder.

### Decorative clutter

Follow [`CLUTTER_POSITIONING.md`](CLUTTER_POSITIONING.md) for decorative clutter. It defines the proposed authoring flow and stored placement data: select a static semantic anchor, save relative offsets and visual properties, and allow breakpoint-specific overrides. The positioning editor and renderer are future implementation work; this document is the intended convention, not a claim that they already exist.

### Ordinary page composition

Keep each page’s functional structure and visual arrangement in its page-specific composition and CSS Module. Use normal CSS layout tools such as grid and flexbox, plus page-owned responsive rules. Do not create a universal page schema or move ordinary section relationships into a coordinate configuration. Content order and relationships belong in typed content or the page composition, not in clutter placement data.

### Authored diagrams

The site Map and Viscap system visualization are the likely cases where authored node positions and links should be data rather than scattered through JSX. Give each visualization a small, page-owned typed model for its own nodes, connections, labels, and diagram-local positions. Keep its visual composition and selection behavior page-specific. Share a behavior primitive only if the same interaction is genuinely reused; do not create a universal diagram engine.

### Responsive conventions

Use the shared breakpoint tokens as the common threshold vocabulary, then let each page decide how its composition changes at those thresholds. Ordinary layout changes belong in that page’s CSS; clutter can use the breakpoint overrides from `CLUTTER_POSITIONING.md`; diagram coordinates remain local to that diagram’s coordinate space. Review at the project’s target widths: approximately 1440px and 1920px desktop, an intermediate tablet/narrow desktop, and 390px mobile.

## Extraction rules

- Put repeated state, persistence, audio, dialog lifecycle, and other shared behavior in shared modules or primitives.
- Share an interaction or domain concept without sharing the entire page layout.
- Keep page composition and its styles with the page that owns the design.
- Keep authored content in typed records and page-specific placement in clearly named configuration.
- Extract a component when it represents a real repeated concept, such as a Familiar preview or media inspector. Do not create a universal card or page renderer merely because pages share colors or typography.

## Source references

- [Master implementation roadmap](breakspider_master_implementation_roadmap_v2.md)
- [Final prototype summary](breakspider_prototypes_final_summary.md)
- [Prototype 04 design inventory](breakspider_prototype_04_design_inventory.md)
- [Phase 0 implementation plan](breakspider_phase_0_implementation_plan.md)
