# Breakspider — Final Prototype Summary

This document summarizes the current visual and interactive prototype set. It is a review guide for the implemented routes, not a production architecture specification.

## Prototype status

Prototype 04 is the canonical homepage direction. Prototype 01–03 homepage implementations have been retired. The About, Projects, and Pixel Pugilists pages were migrated into the Prototype 04 visual world first; seven further page prototypes complete the current route set. The work is a set of related rooms, not one layout repeated with different content.

The prototype labels the game **Pixel Pugilists**, its early development name. The current game name is **One Night Familiar Fight (ONFF)**; production uses `/projects/one-night-familiar-fight` for its project page and `/projects/viscap-ai` for Viscap. Prototype route names below describe the preserved prototype as built.

The shared design premise is:

> **Same person. Same internet space. Different room.**

The home page is the most accumulated customized profile. Deeper pages retain its dark digital foundation, strong typography, profile and game influences, real project imagery, and occasional edge artifacts, while using compositions suited to their content.

## Page guide

### Home — `/`

**Room:** A customized personal internet profile with a clear professional spine.

The desktop canvas centers on the Spotlight, with About and Projects immediately available. Current work, Sketchbook, Familiar, Changelog, found Map, and inspectable project files occupy the surrounding field. Real PP and Viscap imagery carry the project story; the creator’s OC, Familiar sprites, badges, pickups, and Noise sprites make the page feel personally accumulated. Some lower sprites sit behind the inspection files by design.

The intro appears on a first visit through the homepage and remembers completion locally; direct visits to interior routes bypass it. Header controls provide navigation, sound, and a visitor profile. Visitors can inspect project artifacts, cycle the Familiar, open the map, and shuffle the featured file. At mobile widths the canvas becomes a vertical reading sequence with reduced clutter.

Review: [desktop](../screenshots/prototype-04-desktop-1440x900.png) · [mobile](../screenshots/prototype-04-mobile-390x844.png)

### About + Contact — `/about`

**Room:** A personal profile and contact area.

It keeps the global identity and header while giving the biography and contact path their own profile-oriented composition. Identity imagery and short, direct copy lead to professional links; content remains easy to read without depending on decorative interaction. Mobile stacks identity, biography, and contact paths into a simple reading order.

Review: [desktop](../screenshots/about-desktop-1440x900.png) · [mobile](../screenshots/about-mobile-390x844.png)

### Projects / Things I’ve Made — `/projects`

**Room:** A visual work archive.

Project previews pair real screenshots with concise descriptions and direct routes into Pixel Pugilists and Viscap. Each project keeps its own visual language rather than being flattened into identical cards. The mobile version turns the archive into a clear vertical sequence.

Review: [desktop](../screenshots/projects-desktop-1440x900.png) · [mobile](../screenshots/projects-mobile-390x844.png)

### Pixel Pugilists — `/projects/pixel-pugilists`

**Room:** A game-development workbench.

The page foregrounds creator-owned PP gameplay and development imagery, with supporting process details and inspectable build material. Its orange/cyan game visuals retain their native character. Mobile preserves the work evidence and project reading order.

Review: [desktop](../screenshots/pixel-pugilists-desktop-1440x900.png) · [mobile](../screenshots/pixel-pugilists-mobile-390x844.png)

### Viscap — `/projects/viscap`

**Room:** A connected professional-software system.

Eight real Viscap captures support a system map that explains how the product’s related areas fit together. Selecting a subsystem updates the preview; captures can be opened for closer inspection. On mobile, the map becomes a more linear system guide. Current screenshots may contain real people or data and need review/redaction before public production use.

Review: [desktop](../screenshots/projects-viscap-desktop-1440x900.png) · [mobile](../screenshots/projects-viscap-mobile-390x844.png)

### Sketchbook feed — `/sketchbook`

**Room:** A personal development microblog.

Chronological posts vary in density and form: short entries live in the feed, while a longer development note links to its own route. A tag filter narrows the feed. Mobile makes the chronology a single readable column. Dates and some copy are sample content pending an author pass.

Review: [desktop](../screenshots/sketchbook-desktop-1440x900.png) · [mobile](../screenshots/sketchbook-mobile-390x844.png)

### Sketchbook entry — `/sketchbook/battle-plans-first-pass`

**Room:** A long development note opened inside the site.

The battle-plan entry combines a readable article column with a real PP screenshot, rule annotations, side notes, and links to related work. Mobile puts the article and media in a straightforward reading sequence. The current entry is a representative prototype and its text needs creator review.

Review: [desktop](../screenshots/sketchbook-battle-plans-first-pass-desktop-1440x900.png) · [mobile](../screenshots/sketchbook-battle-plans-first-pass-mobile-390x844.png)

### Familiars catalogue — `/familiars`

**Room:** A scannable game roster.

Ashwing is featured above a roster treatment built to accommodate more entries. Known Familiar sprites and tags provide the content; unknown roster slots are presented as future entries rather than fabricated character details. Mobile prioritizes the featured Familiar and a compact list/grid.

Review: [desktop](../screenshots/familiars-desktop-1440x900.png) · [mobile](../screenshots/familiars-mobile-390x844.png)

### Familiar detail — `/familiars/ashwing` and `/familiars/pebbloq`

**Room:** A character profile with bestiary and development-note elements.

Ashwing and Pebbloq each get a sprite-led profile, confirmed tags, field notes, and links to related work. The pixel-grid toggle provides a small inspection interaction. Mobile gives the sprite and core profile information first. Mechanics beyond the confirmed tags are intentionally left for later content rather than invented.

Review: [Ashwing desktop](../screenshots/familiars-ashwing-desktop-1440x900.png) · [Ashwing mobile](../screenshots/familiars-ashwing-mobile-390x844.png)

### Collection — `/collection`

**Room:** A visitor profile and cosmetic inventory.

The visitor avatar anchors categories for profile cosmetics and future features. The page distinguishes selected/showcased items from other inventory and includes category selection and local pinning interactions. Mobile presents the profile before the inventory. These interactions are a visual preview only; the prototype has no unlock, account, or persistent equipment system. The production roadmap intentionally adds browser-persisted collectible unlocks and cosmetic equipment, using this page as the presentation reference rather than treating its preview state as implemented behavior.

Review: [desktop](../screenshots/collection-desktop-1440x900.png) · [mobile](../screenshots/collection-mobile-390x844.png)

### Map — `/map`

**Room:** A discovered route graph that also works as a site directory.

The connected map nodes link public destinations, with a direct directory of links for visitors who prefer ordinary navigation. Selecting a node highlights it. Mobile translates the graph into a touch-friendly reading and navigation layout. The playable ONFF destination is not linked until a public build URL is available.

Review: [desktop](../screenshots/map-desktop-1440x900.png) · [mobile](../screenshots/map-mobile-390x844.png)

## Shared design rules

- Keep the homepage’s professional hierarchy obvious: Spotlight first, About and Projects close behind, secondary activity after that, optional discoveries last.
- Let each route express its purpose. Use the homepage as a family reference, not as a template.
- Mix real project interfaces, profile objects, game sprites, plain links, screenshots, and occasional containers. Frame an object only when the frame helps explain its function.
- Preserve the native colors and visual origins of creator-owned work and selected collected artifacts.
- Place decorative objects in purposeful clusters and keep them away from essential copy and controls. Decrease clutter on mobile and translate interactions to tap or keyboard where needed.
- Keep copy direct and functional. Do not use poetic filler to stand in for missing content.

## Prototype-wide open content

The prototypes still need the creator’s final name, contact details, résumé destination, and reviewed copy. Viscap screenshots need a privacy pass. Sketchbook dates and text need replacement or approval. Familiar roster size and detailed mechanics need confirmed source content. Real Collection ownership, unlocks, persistent equipment, and the ONFF public route are production follow-ups; they are intentionally not implemented by the visual prototype. These are content/product follow-ups; the current pages are reviewable visual prototypes.

## Review captures

The linked viewport captures are approximately 1440×900 desktop and 390×844 mobile. Full-page captures are also available in `screenshots/` when reviewing content below the initial viewport.
