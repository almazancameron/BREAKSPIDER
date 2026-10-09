# Authored homepage clutter placement plan

> **Revision 02 is the current placement recommendation.** See [the revised comp and plan](revision-02/README.md). The dense proposal below is retained as history; its placement decisions are superseded. The original visual asset inspection remains useful.

## What we are building, and why

The homepage already has a convincing structural composition: a large Spotlight on the left, your portrait and open biography above the right-hand Projects window, then a lower field of current work, Sketchbook, a Familiar, updates, and inspectable files. Its remaining weakness is that the surrounding field often feels unoccupied. The new material should make that field feel personally collected, rather than decorate each section with one interchangeable icon.

The recommended composition is an **uneven grunge perimeter with three interior concentrations**: the Familiar/toy pocket on the left, the Sketchbook-to-map group in the middle, and development sediment behind the files. About gets a smaller, distinct collection of keepsakes. The Spotlight's interior remains deliberately quiet.

This follows the [design philosophy](../../breakspider_design_philosophy.md), [Prototype 04 inventory](../../breakspider_prototype_04_design_inventory.md), and the [Breakspider design skill](../../../.agents/skills/breakspider-design/SKILL.md). The current production homepage takes precedence over prototype coordinates and superseded details: Sketchbook is now a framed feed, Working On no longer has a second Familiar, and the Random Familiar stays directly beneath it. Preserve those accepted choices.

**Target: approximately 6/10 chaos on desktop.** Clutter comes close to important surfaces, varies dramatically in size, and sometimes overlaps other clutter. It does not obscure what those surfaces say or how they work. A full-width empty seam is preferable to a procession of equally spaced stickers.

## Reading the placement instructions

All dimensions below are CSS pixels at desktop scale. **Width means the entire image box**, including transparent padding, with height preserving the source aspect ratio. Angles are clockwise when positive. Positions refer to image centers, not their upper-left corners.

The [placement reference](placement-reference.md) supplies exact preview poses and compact compositions. Use those as starting values for later implementation, then verify against the rendered result. They are not finished production content records. In particular, the preview's numerical `layer` values refer to its temporary global overlay; production needs local ordering around the owning section.

Use three ordering relationships, rather than one global stack of arbitrarily high numbers:

1. Background field and quiet rear decoration.
2. Content surfaces, text, project media, and real controls.
3. Only the small, deliberately attached pins that cross a safe border.

Pixel-art pickups can be substantially enlarged. Keep crisp scaling for the handheld, tiny game items, crystals, Starforce sprite, strawberry, Lancer, sword, and ukulele. The illustrated cutouts and clean-outline Noise emblems should retain smooth rendering. Do not recolor the supplied images or add a white sticker outline to everything. Their inconsistent materials are part of the point.

## A. Left perimeter: warm, torn edge

**Job:** make the left margin feel occupied immediately, then connect the upper work surface to the lower collection without becoming a continuous decorative border.

**Files:** `noise_01_orange.png`, `noise_02_lavender.png`, `noise_04_red.png`, `noise_05_lavender.png`, `noise_06_red.png`, `noise_07_blue.png`, `noise_08_lavender.png`, `noise_12_orange.png`, `noise_13_blue.png`, `noise_14_red.png`, `noise_15_orange.png`.

The orange longhorn skull is the opening statement: roughly **92px wide**, center about **18px from the field's left edge**, near Spotlight's upper corner. Let one horn leave the page. Follow it with a small lavender axe/mask, a larger cropped red animal face, and a narrow blue fang-like emblem. The next lavender skull and tiny red grin form a closer pair. Leave a break before an orange skull and blue oval near the Spotlight's lower edge.

Below this, use only a few instances alongside the Familiar: a red skull before that section begins, a small lavender mark, a warmer orange emblem at its lower edge, and a blue shard beneath. The broad lavender ram appears much farther down beside the file introduction, partially cropped at the edge. Its width is **120px on wide desktop, 96px on narrower desktop**. Keep its visible right edge clear of the introduction's text. A tiny red grin ends the bank, rather than another large object.

Most small pieces are **24–60px**, with rotations around **±2–8 degrees**. The large opening skull and broad ram give the bank shape; the little marks supply texture. Do not place a Noise emblem at every section boundary or interpolate the gaps into equal intervals. Crop the perimeter, never the copy.

These black-centered emblems merge with the navy ground while their orange/red outlines pick up ONFF and the Working On title. Occasional blue/lavender interruptions keep the bank from becoming a single orange stripe. This is the grungiest part of the design, and deliberately denser than the corresponding right edge.

## B. Right perimeter: cooler, interrupted echoes

**Job:** answer the left margin without mirroring it, and keep the far-right field connected to the rest of the page.

**Files:** `noise_02_lavender.png`, `noise_04_red.png`, `noise_05_lavender.png`, `noise_06_red.png`, `noise_07_blue.png`, `noise_08_lavender.png`, `noise_10_blue.png`, `noise_13_blue.png`, `noise_14_red.png`, `noise_15_orange.png`.

Use a blue hollow emblem beyond About, with a much smaller red grin lower down. A lavender fang/skull approaches Projects' upper-right corner. Separate that from a blue winged silhouette at mid-height, a cropped red skull lower down, and a broader lavender ram around the window's bottom-right corner. The ram sits **behind the window**, so the frame cleanly interrupts it.

The Changelog and archive receive fewer, more widely separated echoes: one red face, a little lavender axe, then an orange emblem and blue fang near the archive's right edge. Sizes range **26–68px**, except the **112px** ram. Centers sit roughly **7–39px inside the field edge**. Vary the inset as well as the vertical spacing.

The cool outlines connect the portrait's lavender, the cyan capture border, and the pale functional frames. Red/orange appear as exceptions. Preserve the broad dark gap between Projects and Changelog; the megaphone belongs near updates, but that gap does not need a complete sprite ladder.

## C. Spotlight pins and About keepsakes

**Job:** make the top of the page feel like a customized profile, while making your own portrait decisively more important than the borrowed references.

**Files:** `rainbow_badge.png`, `relic_badge.png`, `jojo-giorno-pin.png`, `avatar-sokka-boomerang.png`, `jojo-killer-queen.png`, `LoL_item_locket.png`, `noise_02_lavender.png`.

Attach the rainbow badge (**32px, −12°**) and pale relic badge (**28px, +9°**) to the Spotlight's upper-left border at unequal heights. Their centers sit approximately **3px/39px to the right of that corner, 10px/19px above it**. They read as collected profile pins, not credentials. Do not alter the PINNED TO PROFILE text or its dot.

Place the blue-and-gold Giorno brooch (**62px, −14°**) at the lower-right edge of the portrait. The comp anchors it to About's top-left corner at **−43px, +101px**; it should visually attach to the portrait's clothing, with the face and its tiny companion unobstructed. This is the one small foreground overlap in the About group.

The boomerang's hooked silhouette works as a large corner accent: **118px, +28°**, near About's upper-right edge, partly entering the outer margin. Its actual visible drawing is considerably smaller than its 326px source canvas. Keep it above the biography's first line, outside the main heading's word shapes, and below the header.

The lower About gap gets a loose three-object grouping: the pink Killer Queen mask (**66px, −9°**), a tiny gold locket (**36px, +8°**), and a lavender axe/mask (**29px, −7°**). Their centers, measured from About's bottom-right, are roughly **−163/+10**, **−112/+19**, and **−219/+11**. This fills some of the space above Projects without touching the email, Profile + contact link, `[ mostly human ]` label, or roaming Familiar. Let Projects tuck in front of the mask's lowest tip at narrower desktop widths.

The grouping works because the gold/blue brooch, pale pink mask, and lavender corner weapon belong to different visual materials but share the portrait's palette. The gold locket is an unexpectedly warm punctuation mark. Keep the mask small: enlarging it into another character portrait would weaken the creator's identity. No frame, new label, tooltip, or interaction is needed.

## D. Small gear bridge above Working On

**Job:** bridge the end of Spotlight to current activity with a handful of crunchy pixels, while keeping the large orange title open.

**Files:** `LoL_item_rabadon.png`, `LoL_item_lichbane.png`, `LoL_item_jaksho.png`, `noise_06_red.png`.

Use the curled hat (**34px, −8°**), crossed blade motif (**34px, +8°**), and purple armor/gem (**26px, unrotated**) in the narrow gap above Working On's right side. From Current's top-right, the centers are approximately **−124/−21**, **−69/−17**, and **−18/−23**. The small red grin is a rear accent higher in the seam and may be largely interrupted by the Spotlight shadow. It is not important that this particular repeated grin is fully visible.

These are taste references, **not ONFF inventory or interactive pickups**. Keep them outside the combat capture, outside the project's text, and too irregularly placed to read as a functioning equipment bar. The modest two-times scaling exposes their attractive low-resolution shapes without turning them into headline competitors.

## E. Familiar and the lower-left toy pocket

**Job:** extend the Familiar's playful territory into a darker, messier collection beneath it. This is the densest interior pocket, with a clear break from the professional Spotlight above.

**Files:** `Strawberry_flap.gif`, `StS2_RingOfTheSnake.png`, `StS2_SneckoSkull.png`, `noise_07_blue.png`, `color-pixels-old-games-pink-handheld.png`, `lancer-deltarune.gif`.

The strawberry (**76px, −8°**) belongs below and left of the existing heart crystal, not on top of the cycleable Familiar. Anchor it to the Familiar's bottom-right at approximately **−140/+34**. Protect the real sprite's full button, its cycle arrow, and the heart's button plus glow envelope. Keep the strawberry visually separate from the heart rather than making a row of new controls.

Below the Familiar's left side, overlap the green snake ring (**70px, −15°**) and ivory skull (**94px, +9°**) by about **15–25px**. The ring sits slightly lower; the skull angles back toward the center. Add one **30px blue Noise** off their lower-right edge. The cream skull echoes heading colors, the green ring recalls lime accents, and the blue mark prevents the group from becoming a uniformly pale blob.

Place the pink handheld at **160px, −12°**, farther down and left of that group. It is the pocket's larger statement, not another tiny pickup. Its mint details connect to the slime elsewhere while its hot pink connects to the headline. Offset Lancer to the right and higher, **152px wide**, with no added rotation: the moving smoke/exhaust already gives this little object direction. The staggered chain is ring/skull → Lancer → handheld, not a straight shelf.

Do not add a second ONFF Familiar beside Working On. The foreign sprites here remain background keepsakes, and the existing Familiar retains its name, description, cycling behavior, and clear catalogue links. Allow some of this pocket to overlap itself on narrower desktop; never compress it upward into those links.

## F. Sketchbook broadcast

**Job:** give the framed Sketchbook feed a distinctive attached object and pull the eye toward the discoveries below it.

**Files:** `miku_tv_static.png`, `rising_badge.png`.

Miku leaning over the television is the strongest new interior cutout. Set it **210px wide on wide desktop, 186px on ordinary desktop**, with a gentle **+5°** rotation. Center it just beyond Sketchbook's lower-right corner, **63px/56px right and 40px above the bottom**. A little of its left edge tucks behind the card; its television remains recognizable in the open gap. The supplied picture is a **static PNG**, despite the filename: do not invent animated TV static.

The black-and-red rising badge is a small second attachment: **34px, −12°**, center **23px left and 16px below** the same card corner. Keep it at the card edge. An earlier location put it on the found map; that was rejected because it interfered with a real inspectable object.

Miku's turquoise hair joins the cyan feed label and map group, while the irreverent TV colors resist an overly matched site palette. Its scale makes the middle of the page feel genuinely collected. Keep the area above it, between Projects and Changelog, mostly dark. Do not ring the entire Sketchbook frame with more stickers or decorate the scroll track.

## G. Changelog announcement

**Job:** revive one of the prototype's clearest object-to-function relationships.

**Files:** `acnh_megaphone.png`, `noise_06_red.png`.

Put the red-and-white megaphone left of UPDATE.TXT, aimed toward the page interior: **140px image-box width, −12°**, center roughly **44px left and 35px down** from Changelog's top-left. Because most of its 128px canvas is transparent, the visible object is only about **70px across** at this scale. Add a tiny red grin beneath it (**28px, +5°**, around **−39/+106**).

The rendered, softly shaded megaphone contrasts usefully with the flat Noise and crisp monospace window. The joke is functional and immediate: this is the place making announcements. Leave the summary control and all expanded update copy clear. These two decorations follow the top of Changelog when its height changes; they never determine the Familiar's position.

## H. Found-map discoveries

**Job:** create a cyan navigation-shaped pocket around the existing inspectable diagram without making the map a new giant destination card.

**Files:** `slimerancher_glitch.png`, `Aqua's_Wayfinder.webp`, `FF4_PSP_Light_Crystal.webp`, `FF4_PSP_Dark_Crystal.webp`, `noise_10_blue.png`.

The smiling glitch slime sits to the left of the found map, **130px, −8°**, centered approximately **86px left and 77px down** from the map section's top-left. Its bright white cutout edge is intentionally a different material from the black-outlined emblems. Put a **43px blue Noise, −9°**, higher and farther left rather than directly on the slime's outline.

The Wayfinder hangs to the map's upper-right: **86px, +12°**, center **35px right and 40px down** from that section's top-right. Its cord creates a believable hanging object and its star shape quietly reinforces the idea of finding a route. Do not flip or crop off its cord.

The crystals are an unequal pair: violet-blue Light Crystal **22px, −8°** farther right; orange Dark Crystal **20px, +9°** lower-left. The source names are counterintuitive: **Dark is orange, Light is blue-violet**. Place according to the inspected pictures, not the names. Their tall silhouettes punctuate the wider slime and map.

Keep the diagram, HOME/PROJECTS/ABOUT nodes, `found: MAP.EXE`, and Inspect label wholly visible. The new objects are quiet decoration, not additional collectible controls. Protect the map's focus outline and leave enough distance that a visitor is not encouraged to click the crystals instead. This cyan pocket should remain distinct from the warmer file pocket below it.

## I. Archive sediment and closing keepsake

**Job:** make the file pile look accumulated, and give the lower page a last personal note without turning the footer into another content section.

**Files:** `starforce_omega_1.png`, `Terra_Blade.webp`, `noise_12_orange.png`, `sanrio-nyanmi-pack.png`, `noise_05_lavender.png`, `Ukulele.webp`. Also use the existing **`assets/work-screenshots/onff-godot-panel.PNG`** as a separate creator-owned reference.

The process screenshot is **180px wide, 173px high, +7°**, with a restrained pale frame and dark offset shadow. Center it approximately **430px right and 20px down** from the pile's top-left, behind the ONFF file. Show enough upper content to recognize the Godot toolbar and scene tree. It provides original process evidence, rather than another borrowed icon; its magenta test blocks can remain partially buried.

The upright green-blue Starforce sprite (**72px, no rotation**) peeks beside the left side of that screenshot, at about **+292/−25** relative to the pile's top-left. The Terra Blade (**92px, +9°**) emerges behind the file on its other side, near **+579/0**. A small orange Noise (**46px, −8°**) sits higher and farther right. Neither sprite becomes a fake ONFF character or an extra inspectable file.

At the far opposite side, the black Sanrio cat (**130px, +9°**) perches behind the found-map file, center about **69px left and 15px above** the pile's top-right. A **44px lavender skull, −6°**, sits just beyond it. The functional file must remain in front of the cat's lower portion; do not let its feet land on the file label.

The brown ukulele closes the collection beneath the pile's left introduction: **124px, −12°**, approximately **+223/+34** from the pile's bottom-left. Keep it right of Replay intro, clear of Shuffle focus, and above the footer. Its brown/olive pixels add a quieter, warmer ending after the cyan middle. It is not a second audio control.

The archive group has the most consequential layering. Later implementation must check all three file focus orders and hover/focus lifts. Decoration stays behind those functional surfaces regardless of which file is raised. Do not move the accepted file arrangement to accommodate this proposal.

## Deliberate calm

Keep these areas mostly unoccupied:

- The Spotlight headline, availability signal, introduction, CTAs, and interior left body.
- The gap around the portrait's face and the About contact routes.
- The Projects heading and actual screenshot surfaces.
- Working On's large orange word shapes and the direct link below them.
- The Sketchbook reading area and scroll track.
- The central dark seam immediately below Projects and above the Miku/megaphone pair.
- The last stretch around Replay intro and the footer links.

The desktop margins should be alive, but the navigation strip remains untouched. The main field does not need another background texture, paper layer, dashed divider, tape treatment, decorative label, or color filter.

## Responsive composition

### Desktop above 1220px

Use the full authored field. Review ordinary desktop at 1440/1600 and wide desktop at 1920, plus **1221px**, where the desktop grid has its least spare room. Keep the larger Miku and opening ram only when actual content width allows them. The comp already uses smaller Miku/ram values in narrower desktop captures.

Perimeter x positions refer to the **canvas edge**, while their y positions follow nearby Spotlight, Familiar, Changelog, or pile edges. Implement that relationship with small page-owned anchor wrappers or explicit breakpoint offsets. Do not freeze the 1920 screenshot's global y positions into production. The numerical reference includes multiple widths precisely because a single desktop pose is insufficient near the breakpoint.

### Tablet: 761–1220px

Retain about **15 objects**: the two Spotlight pins, portrait brooch, four isolated perimeter Noise, strawberry, handheld, Miku, megaphone, slime, Wayfinder, archive cat, and lower ram. Hide the full banks, About's mask/locket/boomerang, gear bridge, skull/ring, crystals, Starforce, sword, ukulele, and process screenshot.

Move Miku to the **left side of Sketchbook's lower half**, approximately **54px left and 71px above its bottom-left corner**, at **112px wide**. In the initial exploration it was placed above Sketchbook and mostly disappeared behind Projects. This new position uses the empty lower part of the left column without covering Working On.

Move the brooch with the portrait, not with the `[ mostly human ]` sticker. Compact map decoration stays around the diagram. Some overlap between the handheld and slime at 768px is acceptable: this is a deliberate little cyan/pink pocket, with no text or control involved. The cat becomes a floating keeper above the file strip, rather than forcing desktop overlap onto the stacked introduction.

### Mobile at 760px and below

Keep **10 objects**: relic badge, portrait brooch, one lavender Noise before Projects, a tiny hat below Working On, Miku above Sketchbook, strawberry beneath the Familiar, megaphone at Changelog's upper-right, Wayfinder and slime beside the found map, and one ram near the pile's lower-right.

Use the explicit compact poses in the reference. Miku is **88px**, the brooch **42px**, strawberry **50px**, Wayfinder **64px**, slime **66px**, and megaphone **90px image-box width**. Most of these visible drawings are smaller than their boxes. The larger desktop clusters disappear rather than shrink into unreadable confetti.

Keep the accepted reading order: Spotlight → About → Projects → Working On → Sketchbook → Familiar → Changelog → Map → files → Replay. Edge cropping must be contained inside the main canvas so it never produces page-wide horizontal scrolling. Preserve the purposeful horizontal file strip and its swipe hint. At 320px the slime may graze the left edge; its face and the map remain visible.

## Motion and interaction boundaries

This plan adds **static decorative objects**, not new interactions. Even when a source is animated, the object is not a button or collectible. Use empty alt text, no tab stop, and no pointer interception. Preserve every existing inspection control, cycle action, crystal glow, audio response, intro replay, and profile behavior.

The GIFs are optional small motion accents at their supplied timing; add no CSS bobbing, parallax, walking, or pulsing to this layer. Under reduced motion, use alpha-preserving stills from those same sources. Lancer's approximately 0.54-second exhaust loop is the most likely candidate to keep static if a live review feels too restless. Strawberry has a roughly 2.88-second cycle. The screenshots freeze both and cannot establish whether the combined motion feels calm enough.

## Recommended implementation sequence, when requested

There is **no application edit step in this deliverable**. The following order is a handoff for subsequent implementation:

1. Establish the narrow authored-clutter types, anchors, and renderer from Part 4. Use only the Spotlight pins, About brooch, and megaphone to prove attachment and protected zones.
2. Add the remaining large relationships first: Miku, Familiar relics/handheld, map pocket, and process screenshot behind files. Their silhouettes determine how much perimeter density is appropriate.
3. Build the dev-only placement editor from Part 5 once these anchors and a few real records work. Use it to tune the full art-directed composition rather than manually encoding every final offset first.
4. Add and tune the unequal Noise banks, then the smaller keepsakes. Keep this proposal as the density reference; do not let the editor encourage filling every gap.
5. Compose tablet and mobile separately. Finish browser checks before accepting Part 4. The later random layer remains supplemental and must respect the space already claimed by these clusters.

This resolves the earlier authored-clutter/editor ordering question: **a small authored foundation before the editor; full placement tuning with the editor afterward**. The accepted art direction can be implemented without treating the editor as an interactive-object builder.

The preview calls the existing found-map section `map`. The tutorial's current anchor union has no map-specific entry. At implementation time, explicitly bind a `found-map` anchor to that existing section, or name that same region `lower-field`; do not guess its location from nearby grid coordinates. This is one concrete static anchor, not a general page-building system.

## Browser review checkpoints

- First look: Spotlight headline → portrait/About → Projects. A borrowed character must not become the page's leading identity.
- Confirm every headline, paragraph, link, window label, focus outline, and scrollbar stays legible at 1920, 1600, 1440, 1221, 1220, 1024, 768, 760, 390, and 320.
- Cycle both Familiars. The strawberry and relic pocket must not overlap either sprite button, its arrow, its labels, or the heart glow.
- Open Changelog. The Familiar remains fixed beneath Working On; the map, archive, and their decoration follow their actual flow anchors. Repeat at narrower widths.
- Scroll the Sketchbook feed and tab through its links. Miku and the badge remain outside the reading and focus regions.
- Inspect all three files and the found map; shuffle file focus; hover and keyboard-focus every file. Rear decoration never covers the labels or blocks a control.
- Check initial image load and reduced motion. Reserve aspect ratios, preserve GIF transparency in stills, and avoid shifting content when decorative images decode.
- Confirm that mobile page width is unchanged and the only horizontal scrolling remains the intended file strip.

Use screenshots and browser interaction first. Useful automated checks later are deterministic placement/override merging and editor export validation; broad component tests would add little to this art-direction work.

## Critical review and final judgment

**The strongest moment is the lower-middle transition.** Miku crosses the visual boundary of Sketchbook, the slime and Wayfinder gather around the map, and the process screenshot emerges behind files. Their turquoise, cream, and lime accents link three different object types without making them a matched kit. The site's own work still supplies the large surfaces and the original scene-tree evidence.

**About now has personality without becoming a second collage centerpiece.** The brooch is attached, the boomerang activates the outer corner, and the small mask/locket group occupies the space above Projects. The creator portrait remains larger and more complex than those ornaments. Keep the mask at its proposed scale; it is the first item to shrink if that balance weakens.

**The lower-left pocket is deliberately the messiest interior area.** Dark skull, bright ring, pink handheld, and little motorcycle are visually inconsistent in a productive way. This could tip toward a fandom shelf if future additions are arranged beside them in a row. Keep the diagonal staggering and overlapping relics; do not add nameplates or box them together.

**The right side is still quieter than the left.** That is intentional. The Projects screenshots and Changelog already contribute strong rectangles there, while the left lower region has more open background. Do not try to equalize the number of objects on each side. Preserve the gap above the megaphone and the open stretch around the footer.

**The main remaining risks are scale and motion, not insufficient density.** Miku's TV bars are the most saturated object, the slime's white edge is unusually bright, and Lancer loops quickly. They sit in the discovery field, below the leading professional content. If the live page feels too loud, first freeze Lancer, then reduce the slime by about 10%; keep the larger silhouette relationships rather than deleting the whole collage.

The foreign references express tastes, but they do not replace Breakspider's logo, portrait, Familiars, work, or navigation. This keeps the composition from drifting into a generic sticker-collage template. A naked version of the page would still have the accepted Breakspider spatial grammar; the new material deepens it.

### Corrections made before this recommendation

| Initial problem | Final correction |
| --- | --- |
| About was still too bare. | Added the boomerang, small mask/locket/Noise pocket, and retained the portrait brooch. |
| Gear bridge came too close to the orange heading. | Reduced those image widths and moved their centers into the seam above the label. |
| Strawberry touched the cycleable Familiar at narrower desktop. | Moved it below the section, left of the heart, away from the sprite button. |
| A rising badge landed on the map graphic. | Reattached it to Sketchbook's bottom-right border. |
| Tablet Miku was hidden behind Projects. | Moved it into the left side of Sketchbook's lower half. |
| Tablet brooch crossed `[ mostly human ]`. | Reattached it to the portrait region. |
| Starforce sprite disappeared behind the process screenshot. | Moved it to the screenshot's left side so its silhouette survives. |
| Archive ornaments could sit on file headers. | Raised the functional file group in the preview; rear clutter and the process screenshot stay beneath it. |
| Lower-left ram approached file-introduction copy. | Adjusted its vertical position and reduced its narrower-desktop width. |

The final comp is a strong starting composition, not a promise that every offset will survive all future content edits. The fixed relationships, density contrast, and protected zones are the durable decisions. Use the placement editor for fine adjustments after the real renderer exists, and review the two GIFs live before final acceptance.
