# Homepage authored collage compositions

**Historical implementation, superseded October 10, 2026.** Procedural compositions and their runtime were removed after the owner requested the preferred curated baseline. The folder collection now serves the development editor palette. See [the current authored implementation, asset audit, comparisons, and verification](../home-clutter-reassessment-2026-10-10/implementation-notes.md). The remainder records the earlier unaccepted exploration; source links may refer to removed files.

Implemented October 10, 2026. **Owner visual acceptance is pending.** No commit or deployment. Parts 1–5 remain accepted.

## Art direction and implementation approach

The [Gaia profile](../../inspo_screenshots/foundational-gaia/profile-collage.png) establishes the central relationship: substantial personal objects gather smaller, disparate material around them. Scale, occlusion and irregular silhouettes matter more than scattering density. [Prototype 04](../../../screenshots/prototype-04-desktop-full.png) contributes panel-edge attachments and archive pockets; its roster and coordinates are provisional.

The previous implementation randomized individual candidates throughout nine broad regions. Collision rejection removed parts of those mathematical clusters, leaving isolated pieces and similar visual weight. This revision removes those regions and the scatter generator. It preserves the content grid, typography, section geometry, authored placements, folder-based library and session lifetime.

The owner's clarification makes existing authored keepsakes the dominant objects. Seven supporting compositions use their actual displayed placements:

| Composition | Authored lead | Intended relationship |
| --- | --- | --- |
| Narwhal pins | `spotlight-narwhal` | Restrained, crooked row on the Spotlight's upper seam |
| Profile charms | `about-kris` | Mixed cutout and badge companions with an occasional clipped edge fragment |
| Sword loot | `terra-blade` | Diagonal game pickups gathering below the Projects corner |
| Handheld hoard | `pink-handheld` | Denser perimeter collection, edge pins and a larger supporting creature |
| Update transmission | `megaphone` | Narrow arrangement of a crest, small pin and listener by Changelog/Sketchbook |
| Map discoveries | `glitch-slime` | Irregular mixed bank hugging the slime, with tiny material below |
| Ukulele encore | `ukulele` | Short horizontal gathering near the lower page edge |

Each has two authored variants. Some existing keepsakes remain standalone, including Miku, Kuromi and the map's crystals. Open areas between the major groups are intentional. No extra dominant character roster, generated imagery, sticker backing, recoloring, layout space, or animated random assets was added.

## Architecture and positioning contract

- [home-collage.ts](../../../content/home-collage.ts) owns the seven typed compositions, variant slots and eligible asset-family predicates. Contents remain derived from the image folders; this is not another manual collection-membership array.
- [collage.ts](../../../lib/home/collage.ts) separates seeded asset/variant selection from pure geometry and content admission. A cluster selects one variant; named slots choose compatible folder assets without repeating within that cluster. Per-slot seeded decisions supply ±2px default jitter, ±4% size variation and ±3° rotation. `chance` supports optional pieces; `assetId` pins a slot to a particular asset. Missing pinned assets or empty pools omit the affected slot.
- [HomeRandomClutter](../../../components/home/home-random-clutter.tsx) measures the actual visible authored leads and content, then renders pointer-inert back/front layers. Their common canvas allows a decoration to sit behind a panel from another section. Named section anchors remain owned by the existing authored placement schema; no independent absolute page layout is saved.
- The browser-memory seed initializes after hydration. Hard refresh creates a fresh arrangement; rerenders, SPA navigation, responsive changes and editor drafts preserve symbolic choices. Geometry never searches for new locations or resamples rejected pieces. SSR renders no procedural objects.
- A cluster follows its lead's transformed center and scales relative to the lead's displayed width divided by `referenceWidth`. The lead retains its saved five-mode placement, semantic anchor, flip and `edgeOffset`. A hidden/missing lead hides its group. Group overrides are base plus the active `wide`, `narrow`, `tablet` or `mobile` pose, matching the existing media-query boundaries.
- Slot `x/y` are center offsets in pixels at `referenceWidth`; positive values go right/down. Group pose `x/y` moves the complete variant. Group `scale` scales both distances and pieces. Slot width is capped by the asset's existing library `widthRange` maximum before responsive scale and modest size variation. The range minimum does not force deliberately tiny accents to become large.
- `back` pieces may tuck behind their own lead and the explicitly marked opaque Spotlight, Projects, Sketchbook and Changelog surfaces. `front` pieces protect all authored keepsakes. Other authored objects retain their configured exclusion padding. Within-group overlaps are authored; different groups reject conflicting bounds rather than moving individual pieces around.
- Only confirmed opaque, untransformed section panels mask protected-content checks. Transparent lead rectangles estimate protrusion, **never opacity**. Rotated file-card bounding boxes are not opaque masks. Back pieces still undergo full content protection wherever an opaque section panel does not cover them.
- Visible text fragments, media, links, buttons, native summaries, focus borders and scrollbars retain their existing protection. A rejected piece disappears in its original slot; it does not wander into a new gap. At least 30% of its conservative bounding area must protrude beyond canvas clipping/panel/lead coverage. This is an admission heuristic, not an alpha-pixel measurement.
- Resize, media/font readiness, text mutations, details expansion, scroll, focus and transform transitions trigger geometry updates. Output mutations do not trigger feedback loops. All observers/listeners/pending frames clean up on unmount.

Tablet retains a smaller subset. Mobile deliberately retains only the narwhal pins and a repositioned ukulele companion pair; desktop arrangements are not universally shrunk onto the reading column.

## Editing or adding a composition

Edit [content/home-collage.ts](../../../content/home-collage.ts). The `slot` helper's arguments are `id, pool, x, y, width, rotation, layer, mobile`; mobile defaults to hidden. Pools are `badge`, `noise`, `pixel` and `cutout`, filtered from the generated folder library by family, rendering style and aspect ratio.

For a complete group, change `pose.x/y/scale`; for a particular relationship, change the variant's slot offsets and widths. Choose a stable authored placement ID as `attachment`, and use the lead's desktop bounding width as `referenceWidth`. Add breakpoint overrides when a group's relationship needs recomposition. An override can select a different authored lead with `attachment`. Hidden leads naturally suppress their groups.

Example of a pinned optional companion inside a variant:

```ts
{
    ...slot("favorite-pin", "badge", 105, -24, 28, -9, "back"),
    assetId: "badge_15_r02_c07",
    chance: 0.8,
}
```

Use stable, distinct cluster, variant and slot IDs. Changing IDs changes their seeded decisions. Keep supporting objects smaller than their authored lead; compose overlaps deliberately rather than adding a large arbitrary candidate budget. New pool filters can narrow a role without duplicating filenames in configuration.

To change eligible content, add/remove/replace images in [the random collection](../../../public/media/home/random-clutter/README.md), run `npm run clutter:generate`, and refresh Home. The generator still runs before dev/build. Asset flags and size ceilings remain in the existing settings file; composition widths and density live in cluster slots. No directory watcher or backend was added.

**Edit clutter is preserved.** It still drags/numerically edits static authored placements and exports complete four-space records with untouched responsive overrides preserved. Groups are suspended while editing. Done restores the same selected contents around the draft leads. This gives indirect group movement through the lead; independent group/slot/variant editing is manual configuration. No cluster visual-editor or configuration-export UI was added.

## Visual critique and refinement

First pass: groups were more recognizable than scatter, but too many essential companions were rejected at the lead's padded edge. The handheld arrangement remained thin, the megaphone usually stood alone, and mobile retained only one random pin. These screenshots were inspected at three seeds and both desktop sizes.

Refinement moved the handheld's perimeter collection, repositioned its supporting creature, tightened the megaphone's vertical arrangement, explicitly tucked selected pins behind their leads, restored the narwhal's crest, and moved the mobile ukulele companions beside it. A further material pass replaced several repeated Noise roles with native game sprites, badges or smooth cutouts. Screenshots were rendered and inspected again.

Final critique across all three desktop seeds: recognizable seam, corner, perimeter, vertical and horizontal compositions; more supporting weight in the handheld/map pockets than at the Spotlight; large authored silhouettes stay dominant; native media/colors stay disparate. The diagonals by Projects and the cutout/badge pockets visibly gather around keepsakes. Some slots overlap, others intentionally leave small gaps. Clear information and quiet transitions remain.

- Layout A has the strongest supporting creature beside the handheld and a compact, layered bank against the slime. The turquoise profile companion supplies medium weight while the narwhal seam stays light.
- Layout B swaps in a small ghost/profile badge pairing and Frisk by the sword. The lower green creature/cutout pair changes the material balance while retaining the ukulele's short horizontal silhouette.
- Layout C makes the profile group more playful through a heart and character scrap, with warmer pins around the handheld. At 1440px the megaphone's larger emblem is rejected, leaving its two smaller companions; 1920px retains the emblem. This is a visible limitation of conservative admission, not a rerolled location.

Remaining weaknesses: family/aspect filters cannot infer gaze, dominant color or actual alpha silhouette. Some selections feel more conversational than others; pinning or further pool curation can improve a specific pairing. Conservative bounds occasionally omit supporting pieces, especially at tablet widths. The upper page remains restrained and the overall density is less extreme than Gaia's reference; no claim of exact visual equivalence. Chromium was tested; other browser engines were not. Owner aesthetic acceptance remains essential.

## Verification and evidence

Final production captures, three seeds at each desktop width:

| Seed | 1440px | 1920px |
| --- | --- | --- |
| 123456 | [Layout A](home-1440-123456.png) | [Layout A](home-1920-123456.png) |
| 890123 | [Layout B](home-1440-890123.png) | [Layout B](home-1920-890123.png) |
| 314159 | [Layout C](home-1440-314159.png) | [Layout C](home-1920-314159.png) |

[390px mobile](home-390-123456.png). [Projects regression](projects-regression.png). These evidence seeds were injected only by the test browser; production has no test seed query handling.

Final automated checks: lint, TypeScript, **56 tests across ten files**, and production build. Ten focused composition tests cover stable/variable seeds, independent groups, pinned/missing assets, lead movement/scale, mobile overrides/anchor changes, size ceilings, rejection without relocation, intentional within-group overlap, other-authored priority, true opaque masking and transparent-cutout protection. Regression tests failed before their fixes. Three geometry tests retain clipping, padded/touching rectangles and transformed aspect-ratio protection. Filesystem catalogue/audio/authored-editor tests remain intact.

Browser verification is primary, using temporary Chromium DevTools Protocol harnesses. Development and production checks covered three fresh arrangements at 1440/1920 plus 390 mobile, and additional 1600, 1221, 1024, 768, 760 and 320 widths. Independent visible-content measurements found no protected text/control/media/other-authored intersections and no horizontal overflow. The reviewed desktop samples retained 26–29 supporting objects, tablet 8–9, mobile 3–4; counts are samples, not targets.

Checks also passed for idle stability, Familiar rerenders, artifact focus changes, inspector open/Escape close, Sketchbook scroll, expanded Changelog, responsive return, SPA return, zero effect on section geometry, static/reduced-motion media and visible image loading. Editor suspension/export/resumption passed in development. A separate real-keyboard test moved the ukulele by 20px and verified that every retained companion followed by 20px without rerolling; the exported mobile override stayed untouched, and reload discarded the unsaved draft. Production passed 46 browser checks and had no editor UI/editing marker or active authoring listeners; client/server output scans confirmed authoring code is absent. An independent review found and verified the transparent/rotated-mask correction, then reported no residual important issue.

All temporary browsers and production servers were stopped. The owner's pre-existing port-3000 dev server was preserved. Detailed temporary harnesses and earlier critique images are under `%TEMP%/breakspider-collage-overhaul/`. No repository placement record or original image was changed by this overhaul.

Three additional native hard refreshes, without test-seed injection, produced three distinct browser-memory seeds and three different supporting collections. Saved browser measurements are [production checks](production-checks.json), [development checks](development-checks.json) and [editor/native-refresh checks](editor-follow-checks.json).

- [ ] Owner verifies and accepts the composition locally.
- [ ] Owner verifies live when ready to publish.
- [ ] Owner accepts Phase 2 Part 6/final composition.
