# Authored placement plan: revision 02

## The composition we are building

The page should feel collected rather than uniformly decorated. Its first focal point remains the large pinned Spotlight and actual ONFF build. The portrait and project evidence form the next tier. The authored objects create memorable relationships at their edges; they do not compete for an equal share of attention.

The visual rhythm is intentionally uneven: a single corner attachment at the top left, a character looking inward from the opposite side, a small personal pocket around About, then a looser collection of game keepsakes around the map and file pile. Larger pastel and cyan pieces alternate with black, cream, and small pixel sprites. Clear gaps between these moments are available for the later randomized layer.

The desktop roster is 19 images: 18 supplied clutter assets and one existing Godot screenshot. Group labels A–I retain their meaning from the first review. They identify visual relationships, not mandatory components or an equal-density grid. The [numeric reference](placement-reference.md) and [preview records](placements.json) resolve approximate sizes and offsets below.

## A — The Spotlight corner attachment

**Asset:** `pixel-art-purple-narwhal-purple-narwhal-left.png`.

Place an approximately 84px narwhal canvas across the Spotlight's top-left corner, with its center about 15px left and 15px above the corner, rotated −5°. Crop its outside edge at the page boundary rather than shifting the entire Spotlight. It overlaps the corner and upper edge only; the pinned label remains readable. The scale is deliberately larger than a badge so the silhouette remains recognizable.

This makes a quirky creature appear to catch the window edge. Its lavender connects with the frame and portrait while its white belly lifts it off the dark background. It is the primary attachment in this group; do not surround it with authored Noise or badges.

**Fallback:** `rainbow_badge.png`, approximately 32px, rotated −12°, centered roughly 3px right and 10px above the same corner. Its tighter shape communicates “pinning the window” more literally. Use either the narwhal or the badge, not both. The separate [fallback comp](fallback-rainbow-1920.png) shows that replacement.

## B — A sword at Projects, Miku farther down the edge

**Assets:** `miku_tv_static.png`, `Terra_Blade.webp`.

Place the 106px Terra Blade, rotated +9°, in Miku's former right-margin pocket at Projects' lower corner. Following the final approval adjustment, its center is about **84px inward** from the right content edge and 8px below Projects' bottom edge, keeping the whole sword visible. It leaves the project link and focus outline clear. The smaller, slender pixel weapon works better here than a large illustrated character clipped by the panel. The earlier PNG comp shows the preceding, more cropped position; the implementation captures show this final adjustment.

Move Miku into the open right-edge space **below the changelog**, above the file pile. Use a 220px canvas on wide desktop, reducing to 190px at 1440. Its center sits about 23px inward from the page's right content edge and 116px below the changelog's bottom edge. Keep the source's native tilt: no added rotation or mirroring. She still peeks around the page boundary, but no content panel clips her face or TV. Preserve a little separation from Kuromi's perch farther inward and below.

Her face and loud TV color bars remain a strong right-edge interruption, now in a genuinely open pocket. The sword creates a smaller green beat higher up, while Miku's larger silhouette draws the eye toward the exploratory lower content.

Keep the right edge around her relatively clear in the future random layer. Do not recreate the former full-size Miku beside the feed.

## C — A small conversation around About

**Assets:** `action-acting.gif`, `jojo-killer-queen.png`.

Use Kris at approximately 160px canvas width, unrotated and **horizontally flipped on desktop**. Place the visible sprite in the negative space to About's right and below the logo, 28px farther left than the initial revision-02 pose so it does not hug the margin. Its leftward gesture and animation point toward the avatar. The source has asymmetrical transparent padding, so judge the visible figure across all frames rather than aligning its canvas edge to text.

Keep the avatar completely unobscured. Remove `jojo-giorno-pin.png` from this authored group and replace the boomerang with Kris. Retain the small Killer Queen head at roughly 66px, rotated −9°, beneath About and above Projects, offset toward the middle of that gap. Keep it separated from the existing roaming Familiar and “mostly human” tag. It can tuck behind Projects if those edges meet.

Kris's blue/magenta pixels echo the logo-side animation and pink accents. The pale pink head gives a quieter second beat underneath. Together they frame a personal region without putting a large sticker on the identity portrait. Do not add a third head or badge here.

## D — The workbench beside ONFF

**Asset:** `assets/work-screenshots/onff-godot-panel.PNG`; the review uses the unchanged copy `../onff-process-reference.png`.

Move this actual development screenshot out of the archive area and beside “Working on: One Night Familiar Fight.” Use a roughly 172px canvas on wide desktop or 152px at 1440, rotated +7°. Compared with the initial revision-02 pose, move it about 61px left and 69px down at 1920. Its top now falls below Spotlight, and its right portion disappears behind the Sketchbook frame. The leftward nudge is smaller at 1600 and 1440 to protect the longer ONFF heading. Give this rectangular photograph a thin muted frame and a short dark shadow, using the page's existing window palette.

This is the only additional rectangular frame in the new decorative layer. It has a reason: it is a piece of actual work material, not a generic sticker card. The Godot panels and magenta test tiles make an immediate relationship with the ONFF heading and existing build preview. No small gear items or extra League icons are needed here.

The precise preview is anchored to **Sketchbook's top-left**, center offset −8px horizontally and +32px vertically at 1920, or +44px/+32px at 1600 and 1440. That static corner determines the overlap more reliably than the variable-height heading. The semantic story belongs to Working on even though the nearest practical anchor belongs to Sketchbook. Do not turn the photo into a replacement project link or disturb the existing link beneath the copy.

The scrap must meet Sketchbook's visible border without an empty cutout at the corner. The corrected comp masks only the actual card silhouette and its two offset shadows, rather than an enlarged rectangular exclusion zone. In production, put the scrap behind the card in the stacking order and let the opaque card and shadows cover it naturally. Do not clip the scrap to the card's padded bounding box; its continuation should remain visible wherever there is open background.

## E — A toy pocket beneath the Familiar

**Assets:** `color-pixels-old-games-pink-handheld.png`, `lancer-deltarune.gif`, `Strawberry_flap.gif`.

Keep the pink handheld at about 160px, rotated −12°, lower and to the left of the Familiar block. Nudge it 24px up and 24px right from the initial revision-02 pose so it has more breathing room above “More stuff.” Lancer remains roughly 152px wide on the upper-right side of that pocket, with no added rotation. The winged strawberry is smaller, about 76px, hovering below the Familiar and above the larger toy.

These three create a loose descending triangle rather than a strip of collectibles. Pink plastic, blue pixels, and the strawberry's tiny red accent make this region playful without repeating the Familiar itself. The existing heart crystal keeps its own position and interaction; leave its glow and click target clear.

Remove both Slay the Spire relics from this group. That separation gives the handheld and Lancer room to remain recognizable. It also prevents a dense wall of small icons immediately below the Familiar links.

## F — Two relics in the former Miku pocket

**Assets:** `StS2_RingOfTheSnake.png`, `StS2_SneckoSkull.png`.

Place the ring above-left of the skull, diagonally offset beside and below Sketchbook. Use approximately 78px for the ring, rotated −15°, and 104px for the skull, rotated +9°. Their canvas centers are roughly +55/−86 and +112/−14 relative to Sketchbook's bottom-right. Keep both behind any neighboring content frame.

The lime ring picks up the map border and site action color. The cream skull links with the text palette and provides a dark-edged, horizontal silhouette. Their empty centers and irregular shapes give this gap texture without introducing another large standing character. The glitch slime farther down remains the dominant object in this broad area.

Keep enough separation that the ring reads as an object rather than the skull's eye. Their diagonal creates a path toward the map, not a rigid vertical list.

## G — The changelog's announcement

**Asset:** `acnh_megaphone.png`.

Keep its accepted first-comp placement: roughly 140px canvas width, rotated −12°, centered 44px left and 35px below the changelog's top-left corner. The visible object is smaller than its canvas because the source has generous transparency.

The red mouth points outward while the handle drops into the empty gutter. It gives the updates box a specific story—announcing changes—without touching its title or “See updates” control. Its warm red is a deliberate interruption in the cooler right-side composition. Leave expansion of the changelog entirely in normal content layout.

## H — A strange map pocket

**Assets:** `slimerancher_glitch.png`, `Aqua's_Wayfinder.webp`, `FF4_PSP_Light_Crystal.webp`, `FF4_PSP_Dark_Crystal.webp`.

Move the 130px glitch slime approximately 19px left of its first-comp position. Its center is now about 105px left and 77px below the found map's top-left. Rotate −8°. This makes it a substantial cyan focal point while leaving the map's actual Inspect target clear.

Keep the Wayfinder at about 86px, rotated +12°, beside the map's upper-right. The blue/violet Light Crystal is a slender 22px-wide accent farther right; the orange Dark Crystal is roughly 20px wide below-left. Preserve their tall source proportions. These are small glints, not three additional main focal points.

The rounded slime, angular hanging star, and narrow crystals contrast well. Their game-world associations make the found map feel surrounded by collected treasures. The orange crystal connects back to Working on and the megaphone, while blue leads into the cooler archive objects. Leave the map itself fully readable and clickable.

## I — Keepsakes on the file pile

**Assets:** `starforce_omega_1.png`, `sanrio-nyanmi-pack.png`, `Ukulele.webp`.

The process screenshot has moved to D, and the sword now belongs to B at the Projects margin. Do not fill either old footprint with another object. Keep the existing Starforce sprite at around 100px, centered near the first file's upper-left/upper-middle edge, with its feet tucked behind the file silhouette. It is enough to anchor this side of the archive while leaving room for the random layer.

Keep Kuromi at approximately 130px, rotated +9°, on the pile's far-right upper edge. Preserve the **actual perch**: hide only the portion behind the sloping file frame, not its entire lower body behind a broad rectangular clipping region. The head, body, and little feet should still read as a character sitting on the file.

Keep the ukulele at approximately 124px, rotated −12°, below-left of the pile in its existing first-comp position. It occupies a softer, separate pocket away from the green sprite. Its warm brown and irregular silhouette add personal warmth near the page bottom. Keep Replay intro and Shuffle focus clear.

This group closes the page with a loose shelf of objects. It needs no replacement photo or new asset to justify the space freed by the Godot move.

## Responsive composition

Desktop at 1920, 1600, and 1440 retains all 19 objects. Let the content anchors move with the accepted layout; change the largest canvases modestly as space tightens. Miku and the narwhal may crop at the outside edge. Interior objects must never crop important content or create horizontal page scrolling.

At 1024, the preview keeps 17 objects: Lancer and the sword are omitted. Miku still peeks at the right edge, now below the changelog in open space. Kris and Killer Queen move below About's copy and contact controls; Kris is nudged 16px inward. The process photo becomes a smaller workbench note below/right of Working on, moved another 18px left and 16px down. The handheld moves 14px up/right. The relic pair occupies a narrow diagonal gutter beside the feed. Kuromi moves above the archive area because the pile's introduction and files stack differently; this is an intentional rehome, not a floating desktop coordinate.

At 390, keep 12 smaller accents. Omit Killer Queen, the process photo, Lancer, both relics, Starforce, and the sword. Rehome Miku as a compact accent above the feed's right edge. Place Kris to the left of the lower portrait and **do not flip on mobile**, so the gesture still points inward toward the avatar on the right. Shrink the handheld and strawberry beneath the Familiar; preserve the map pocket at reduced scale. Kuromi sits above the archive region; the ukulele stays near its bottom. These are explicit arrangements, not a shrunken desktop overlay.

During implementation, test widths between these captures, especially the transition near 1220 and the 320 minimum. Hide a secondary object if it cannot fit without interference. Do not alter accepted section positions merely to preserve a decoration.

## What belongs to the random pass

There is **no authored Noise in this revision**. Noise emblems, the other Pokémon badges, most small miscellaneous objects, and several tiny gear images are candidates for weighted random placement later; see the [coverage table](asset-coverage.md). This is not approval to show every candidate simultaneously or at the large sizes from revision 01.

The random layer should fill selected remaining pockets and margins around this foundation, varying density rather than coating every opening. Reserve generous quiet space around Spotlight's copy/actions, About's identity/contact, project controls, feed links, Familiar controls, map Inspect, Shuffle focus, and Replay intro. Treat the rendered authored objects as occupied space, including all animation frames. The area directly behind Miku and the narwhal is intentionally cropped, not spare room for another cluster.

Keep the reference user's instruction clear: the 10–12 estimate is not a hard limit. Nineteen desktop objects are appropriate because several form one visual arrangement and none of the repeated Noise banks remain. The goal is a legible authored foundation beneath a richer combined composition.

## Critical review and revisions

**Strongest moments:** the narwhal catches a real corner; Kris addresses the portrait instead of covering it; the Godot note connects directly with ONFF; Miku feels like an edge intruder; Kuromi sits on an actual file. These are relationships specific to this homepage, which keeps the result from becoming a generic sticker sheet.

**Density:** the top-left and central text stay calm. The map/file region carries the largest collection, matching the optional, exploratory content below. The middle-right gap is visibly quieter after Noise removal. That is useful space for the random pass, not a reason to insert another authored statement image now.

**Hierarchy:** the typography, ONFF build, portrait, and project evidence remain larger than individual ornaments. The only bright peripheral challengers are Miku's TV bars and the cyan slime. Cropping Miku and keeping the slime below the primary panels contain that competition.

**Conflicts addressed before handoff:** the first revision overused Noise and small icons; this version removes them. The portrait brooch was removed. Tablet Kris and Killer Queen were moved below the identity controls. The 1440 Godot photo was nudged away from the ONFF heading, and tablet photo/relic spacing was separated. The file masks were revised to preserve Kuromi's body rather than leave only a floating head.

**Choices worth testing:** the narwhal is more playful but communicates “pin” less literally than the rainbow badge. Compare those two in the supplied review before implementing A. Miku's visible fraction should stay large enough to identify her face and TV, but small enough to remain a margin object. Her new pocket should preserve separation from Kuromi at tighter widths. The sword can crop at the outer boundary, but must leave Projects' link clear. The process photo must read as a meaningful development note at its reduced size; if live layout makes it illegible, a small enlargement is preferable to adding more gear icons. None of these require a new visual direction.

## Handoff and browser checks

This document requests no edits to application code. When the authored-clutter tutorial is implemented, establish a few representative anchors first, add the dev-only editor, and use it to tune the rest of these fixed placements. The editor remains for static decorative objects; GIF animation does not make an object an interactive artifact.

Before accepting the implemented composition:

1. Check the five supplied layouts, then 320 and both sides of the desktop breakpoint. Watch the corner attachments, About controls, Working on heading, and archive perches.
2. Watch every GIF through complete loops. Check Kris's extended gesture/hearts and the strawberry/Lancer silhouettes against text and neighboring objects. Provide suitable still imagery when reduced motion is enabled; do not assume a CSS animation setting pauses a GIF.
3. Expand and collapse the changelog. The Familiar and its decorations should stay beneath Working on; a longer changelog must not shove them down or collide with map objects.
4. Scroll and operate the Sketchbook feed, cycle the Familiar, open the found map, trigger the heart glow, and shuffle/open files. Preserve their accepted behavior and keep controls usable.
5. Tab through controls and check focus outlines at 200% zoom. Decorative layers should not capture pointer input or add redundant accessibility announcements.
6. Confirm there is no horizontal page overflow. Check both scrollbar-present and scrollbar-absent desktop layouts; anchors should follow the content, not a guessed browser width.

Browser inspection is the main acceptance tool for this visual work. Automated tests are useful for breakpoint/placement merging or exclusion logic later, not for broad component snapshots that cannot judge the composition.
