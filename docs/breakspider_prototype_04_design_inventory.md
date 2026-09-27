# Breakspider Prototype 04: Layout and Design Inventory

This document records the canonical Breakspider homepage: Prototype 04. The Prototype 01–03 implementations and comparison routes have been retired. It describes the current page at the desktop canvas size used for review (about 1440 px wide) and its mobile reading order at about 390 px wide. Prototype 04 is a visual prototype: the creator name, email, résumé path, and some destination pages still use placeholder or stub content.

## Design premise

Breakspider is a personal internet profile that happens to contain a professional portfolio. The visitor should meet a recognizable person and a lived-in collection of interests, while still finding the creator's work and contact path quickly.

Prototype 04 builds on Prototype 03's composition and increases the feeling of accumulated material. The page is a continuous spatial field, not a conventional portfolio grid. It mixes creator-made work, professional product evidence, profile controls, game sprites, internet detritus, plain links, and a few functional windows. These objects should appear to have different origins and histories. They belong together because the owner put them there, not because they all share one component kit.

The desired result is a page that feels personally collected and a little overfull, with a clear professional spine still running through it.

## Priority order

When adding or changing material, preserve this hierarchy:

1. **Spotlight:** who the creator is, what they do, availability, and direct work/about links.
2. **About and Projects:** profile and contact path, plus immediate evidence of real work.
3. **Current Project, Sketchbook, Familiar, and Changelog:** signs of current activity and personality.
4. **Optional discoveries:** the found map, archive pile, little collectibles, and peripheral objects.

Clutter can come close to content and cross the normal grid. It must not hide the Spotlight's title or calls to action, the About and Projects destinations, or the work evidence. Interaction and hover may add focus; they must not be required to understand the page.

## Desktop layout inventory

The header is about 100 px tall and ends in a dashed divider. The main canvas is pulled upward 28 px, leaving a roughly 40 px gap from the divider to the Spotlight. This makes the header and content feel connected without allowing the content to collide with the navigation.

| Region | Approximate placement at 1440 px | Treatment and role |
| --- | --- | --- |
| **Header** | Full width, y 0–100 | One horizontal profile/navigation strip. Left: visitor avatar with attached heart badge, then sound control. Center: three illustrated sticker links (Home, Projects, About), each with its own colored shadow. Right: “personal internet space / currently online” status, then the Breakspider logo. |
| **Spotlight** | x 3.6%, y about 68 px into the canvas; about 62% wide; 534 px tall | The dominant application/window surface. Window bar and availability status frame the headline, short introduction, and two direct routes. A real Pixel Pugilists combat screenshot overlaps its right edge. Two small creator-associated badges attach to its upper-left edge. |
| **About** | Upper right, y about 93 px into the canvas | An open profile fragment rather than a box. It contains a short bio, placeholder email, and profile/contact/résumé link. A small “[ mostly human ]” label behaves like an attached profile sticker. |
| **Creator portrait** | Between Spotlight and About, slightly left of the bio | The creator's OC/GitHub avatar is a prominent independent link to About. It connects the personal identity of the page to the professional profile. |
| **Projects** | Right side, y about 385 px into the canvas; about 37% wide; 359 px tall | The strongest secondary work destination. It is a framed project window with overlapping, clickable Viscap and Pixel Pugilists screenshots, each retaining its own colors and label. “All projects” remains explicit. |
| **Current Project** | Lower left, y about 653 px into the canvas | Containerless “Working on” fragment: Pixel Pugilists title, short functional description, direct project link, and Pebbloq sprite. Its orange language is allowed to differ from the site's cyan/pink/lime accents. |
| **Sketchbook** | Middle, y about 772 px into the canvas | A compact latest-post fragment. It uses restrained, forum-like typography and a single lower rule instead of a full panel. Title, summary, post link, and topic/status tags are visible. |
| **Random Familiar** | Lower left, y about 939 px into the canvas | A sprite-led destination. Ashwing (or Pebbloq after cycling) sits beside its name, type tags, and catalogue link. Strawberry and vial pickups float around the content. The illustration and plain text carry the identity; there is no card frame. |
| **Site Changelog** | Lower right, y about 839 px into the canvas | A compact `UPDATE.TXT` window with version label, one short update, and a link. The megaphone protrudes beyond the left edge. This is one of the few secondary regions that benefits from a readable container. |
| **Found Map** | Lower middle-right, y about 1006 px into the canvas | A small, tilted route diagram that behaves like a found object. Clicking opens its inspection view. It supplements the main navigation rather than replacing it. |
| **Artifact pile** | Near the bottom, y about 1147 px into the canvas | An open archive area with a “Stuff you can inspect” introduction and three overlapping file objects: Pixel Pugilists build, Viscap system, and found map. A process screenshot and a small game object tuck behind the files. |
| **Footer** | Beneath the canvas | Prototype/version marker and links to comparison versions, replay intro, and map. It closes the long canvas without turning discoveries into primary navigation. |

The values above are canvas-relative where stated. The desktop composition uses absolute placement so objects can sit beside, behind, or partly across neighboring regions. These are authored positions, not a general-purpose layout system to apply to every page.

## Accumulation field and object placement

The background is a dark navy-purple field with a low-contrast grid. It gives the mixed material a shared ground while leaving large regions of dark color visible. The grid fades across the width instead of filling the canvas uniformly.

The seven dedicated Noise banks currently hold **79 Noise sprite instances** (with additional Noise objects elsewhere on the page):

- Upper-left edge cluster: 15 sprites.
- Upper-right edge cluster: 13 sprites.
- Lower-left edge cluster: 12 sprites.
- Lower-right edge cluster: 13 sprites.
- Bridge below the Spotlight: 9 sprites.
- Pocket between Sketchbook, Changelog, and Map: 8 sprites.
- Lower pocket near the Familiar and inspection pile: 9 sprites, with some sprites intentionally tucked behind the files.

The four edge banks make the viewport perimeter active. The three interior banks place clutter in the page's negative spaces too; they keep those gaps from reading as accidental dead zones. Sizes and silhouettes vary, and some pieces touch the viewport edge. Partial cropping is acceptable; fully losing a sprite or burying every instance in an overlap is not the intent.

Noise sprites make up most of the filler, but they are not the only material. Other small pieces include colored badges, crystals, a pickaxe, a cracked core, a skull, an ice cream, a Mr. Saturn figure, the map graphic, and the Familiar pickups. The OC portrait, Familiar, PP screenshots, and Viscap evidence remain the larger identity-bearing objects. Some peripheral pieces have a title or hover response; others are quiet decoration. They do not all need explanations.

The lower Noise cluster deliberately sits behind the inspection files. That overlap makes the archive feel accumulated. Use this sort of occlusion where the foreground object is clearly legible and the covered sprite still reads as part of a layer behind it. The portrait beside About and the roaming Familiar above Projects are other deliberate object-to-content relationships.

The **Lightning Rage pin and player pin are excluded** from the Prototype 04 page. Keep those source assets reserved for their intended future uses; do not reintroduce them as filler.

## Visual language and material rules

### Shared ground, varied provenance

- Keep the dark digital foundation, low-contrast grid, and limited use of UI framing.
- Allow original project material to keep its own colors: PP's orange/cyan game language, Viscap's blue/dark product interface, Familiar sprite colors, and badge colors.
- Let ordinary web typography and links sit beside monospace file labels and game interface details.
- Use cream for major headings, with pink, cyan, lime, and orange as recognizable accents. Avoid recoloring every asset to fit those accents.
- Preserve a mix of crisp product screenshots, pixel-art sprites, vector/profile badges, and plain text. Their differences provide personality.

### Use a frame only when it explains the object

The Spotlight is an application-like window because it is the homepage's central work surface. Projects has a frame because it stages two pieces of project evidence. Changelog reads as an update file, and the artifact pile contains inspectable files. About and Current Project remain open fragments; Sketchbook is mostly type and a rule; the Familiar is sprite plus text. Do not wrap each new asset in another outlined panel.

### Clutter should have placement logic

Place objects in clusters, attach small pieces to meaningful anchors, and allow some overlap. Vary density: a busy edge or archive cluster can sit next to quiet dark space. Avoid distributing sprites at regular intervals, mirroring the left and right edges, or adding material solely to fill every visible pixel. When an object is moved, preserve or improve its relationship to nearby content and keep key text clear.

### Copy stays direct

Use short labels and practical descriptions: “Working on,” “Projects,” “Latest Sketchbook Post,” “Open project,” and “See updates.” The playful language is reserved for objects that earn it, such as “WILD ENCOUNTER” above the roaming Familiar. Avoid poetic exploration copy and avoid making every module sound like a game system.

## Interaction inventory

- **Intro:** the animated splash appears on a first visit, then the Enter action stores the completed state in local storage. The footer's Replay intro action clears that state.
- **Sound:** the header control toggles the interface sound and remembers its state locally. Audio is off by default.
- **Visitor avatar:** opens a compact visitor-profile popover with a local save-slot identity and collection link. Escape or clicking outside closes it.
- **Spotlight capture:** its “Inspect build artifact” action opens the Pixel Pugilists build detail.
- **Projects previews:** Viscap and Pixel Pugilists screenshots link to their respective project routes. Hover temporarily raises a preview for focus.
- **Familiar:** clicking the sprite cycles between Ashwing and Pebbloq. The direct Familiar link remains available without clicking the sprite.
- **Found Map:** clicking the map opens its inspection dialog.
- **Artifact pile:** three project/process objects open inspection dialogs. Hover or keyboard focus raises a file; “Shuffle focus” changes which file is featured.
- **Small reactive objects:** the little life crystal can be touched and restored. The roaming Familiar shifts on hover and links to the Familiar directory. Several other objects have small native `title` tooltips.
- **Dialogs:** inspection and profile dialogs use the light text palette for readable contrast and can be dismissed with Escape or their close control; clicking the backdrop also closes them.

Decorative sprites are hidden from assistive technology where appropriate. Functional objects use buttons or links, meaningful accessible labels, and a visible focus outline.

## Mobile translation

At around 390 px wide, the page becomes a vertical reading flow rather than a scaled miniature of the desktop canvas. The header compresses to two rows: avatar and sound at the left, status and logo at the right, then the three sticker links below. The three desktop interior Noise banks are hidden; the four edge banks shrink and move to selected points in the scroll. A few other small objects also remain in the mobile flow.

The content order is:

1. Spotlight, including the Pixel Pugilists capture.
2. About with the creator portrait.
3. Projects.
4. Current Project.
5. Sketchbook.
6. Random Familiar.
7. Changelog.
8. Found Map.
9. Artifact pile.

The project and file screenshots remain visible at mobile scale. The inspection pile becomes a horizontal swipe strip with snap points and tap-to-inspect. Keep the vertical sequence obvious, preserve recruiter paths, and avoid horizontal page overflow. Desktop-only overlaps and margin density should not be forced into the mobile flow.

## Continuity checklist for future edits

- Keep Spotlight visually dominant and recruiter paths obvious before hover or discovery.
- Keep About and Projects near the top and visually stronger than secondary items.
- Preserve the original visual character of project screenshots and selected archive objects.
- Let a meaningful share of secondary content remain frameless.
- Add clutter to negative space as well as edges, grouped into authored clusters.
- Keep the lower sprites-behind-files overlap; it gives the archive depth.
- Let some things remain unexplained, but make functional information and navigation explicit.
- Retain the page's uneven density and personal object relationships; do not turn the composition into a uniform grid or a theme-park game interface.
- At mobile width, use the defined reading order and keep the screen free of horizontal overflow.
- Keep the Lightning Rage and player pins out of this prototype.

## Current prototype limitations

The creator name, email, résumé destination, and portions of the site beyond the homepage are placeholders or stubs. Viscap and Pixel Pugilists detail destinations are linked, but the homepage is the implemented focus. The density, object positions, and selected decorative assets are intentional prototype choices that may be tuned later; the hierarchy, native asset colors, and mix of visual origins are the more durable rules.
