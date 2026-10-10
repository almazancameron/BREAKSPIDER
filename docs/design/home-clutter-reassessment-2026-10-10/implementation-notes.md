# Authored clutter reassessment — October 10, 2026

**Implemented and locally agent-verified. Owner visual acceptance remains pending.** Parts 1–5 retain their accepted status. No commit or deployment. This supersedes the procedural scatter pass and subsequent seven-group composition overhaul.

## Selected direction

**Fully authored composition.** The owner's two curated screenshots are the preferred baseline. Removing the supplemental objects restores its strongest relationships: the narwhal's Spotlight perch, the About cast, the screenshot/process overlaps, the relic pair beside Sketchbook, the found-object field, and the sprites emerging from the files. All 19 saved owner placement records and their responsive overrides are preserved. Homepage structural CSS, section hierarchy, copy, and interaction owners were not redesigned.

The old groups were more composed than unrestricted scattering, but still picked companions mainly by family and aspect ratio. A generic sprite could occupy a nominally correct slot without its gaze, pose, silhouette, or visual weight fitting the lead. Admission rules then removed supporting pieces depending on the measured page. The resulting shapes varied without being authored as complete relationships. The editor also could not select those companions. More machinery did not resolve the art-direction problem.

No decorative randomness remains. Existing Random Familiar selection/cycling remains a content interaction, with its original browser session seed. GIF animation and file focus/shuffle are also preserved; neither changes saved decorative placement.

## Reference and asset audit

Read the Breakspider design skill and its visual-language, responsive/clutter, and source/asset references; repository instructions; installed Next.js server/client and CSS documentation; asset curation/inventory; Prototype 04 inventory and implementation; accepted Part 4 and Part 5 documentation; and the current production implementation. Visually examined the supplied curated screenshots, Gaia reference, Prototype 04 desktop capture, current homepage, and authored-only captures at 1440, 1920, 1024, and 390px.

The targeted archive audit renders **246 images** across Vriska poses, pixel/non-pixel sprites, miscellaneous imagery, vectors, original Familiars, and Starforce poses. This is a targeted candidate audit, not a claim that every repository image was reviewed. The existing 135-image folder palette was also examined visually. Contact-sheet numbers map to [archive.json](asset-audit/archive.json): [1](asset-audit/archive-1.png), [2](asset-audit/archive-2.png), [3](asset-audit/archive-3.png), [4](asset-audit/archive-4.png), [5](asset-audit/archive-5.png), [6](asset-audit/archive-6.png), [folder palette](asset-audit/folder-palette.png).

**Curation gate: Path A — existing assets are sufficient.** The selected subset is the preferred curated roster, rather than another set of interchangeable companions. No asset gap blocks this composition, and no ambiguous new character choice was finalized. Vriska dialogue busts, Davepeta poses, tall FFX renders, vector weapons, and the additional handheld remain candidates; they were not inserted merely because they exist.

| Composition | Selected assets and visual role |
| --- | --- |
| Spotlight | Purple narwhal: compact corner perch with a readable silhouette. The real ONFF capture supplies the larger diagonal attachment. |
| About / Projects boundary | Existing creator portrait, Kris, Killer Queen, roaming Ashwing: mixed illustrated/pixel origins, different scales, a character pointing inward, and a small mask interrupting the boundary. Creator-owned work remains prominent. |
| Current / Sketchbook | Real Godot process crop partly behind the feed: contextual evidence and a rectangular material contrasting with the cutouts. |
| Familiar / handheld field | Winged strawberry and life crystal as small accents; pink handheld as the large prop; Lancer's sideways motion; Starforce's larger creature silhouette emerging behind the file. |
| Sketchbook / Changelog | Snake ring and skull form a vertically uneven relic pair. Megaphone protrudes from the update file; these are distinct object silhouettes rather than another character pile. |
| Found Map | Glitch slime supplies rounded visual weight, Wayfinder a hanging shape, two tiny crystals punctuate the route object. |
| File and outer edge | Kuromi perches behind a file, Miku's TV breaks the page edge, ukulele remains an isolated lower discovery. Native palettes and intentional gaps remain. |

No sticker backplates, filters, recoloring, background removal, or asset-byte edits were introduced. Earlier approved transparency repairs remain intact.

## Visual alternatives and refinement

Browser-only experiments preceded runtime changes. They did not alter saved placements or source images.

| Alternative | Screenshot evidence | Critique / decision |
| --- | --- | --- |
| Existing procedural companions | [1440](comparisons/current-procedural-1440.png), [1920](comparisons/current-procedural-1920.png) | Small attachments create competing centers near the handheld, Map, and About. Their selection does not consistently establish a relationship. Remove the supplemental layer. |
| Preserved curated baseline | [1440](comparisons/authored-baseline-1440.png), [1920](comparisons/authored-baseline-1920.png) | Stronger uneven rhythm, recognizable objects and quieter transitions. Select this direction. |
| Reserved slime substitution | [1440](comparisons/substitution-1440.png), [1920](comparisons/substitution-1920.png) | Pink slime is compatible in shape, but changes color more than composition and repeats pink emphasis from the handheld/crystal. No benefit justifying a randomized substitution. Keep the blue glitch slime. |
| Authored tucked handheld pair | [1440](comparisons/handheld-pair-1440.png), [1920](comparisons/handheld-pair-1920.png) | Deliberate overlap creates a plausible collection, but repeats the same kind of prop and narrows the gap toward Lancer. Reject the addition and restore the single handheld. |

This is the critique/refinement cycle: remove generic companions, test a specific authored overlap and reserved substitution, then discard additions that do not improve the baseline. Multiple runtime composition variants were not retained because these viable small alternatives did not outperform the static arrangement. Screenshot GIF frames differ; saved layout does not.

## Implementation and semantic anchoring

- [home-clutter.ts](../../../content/home-clutter.ts) remains the source of curated assets and complete placement records. [Clutter types](../../../lib/home/clutter-types.ts) retain the five-mode contract.
- [The authored renderer](../../../components/home/home-authored-clutter.tsx) uses ordinary anchored CSS. Named anchors remain `spotlight`, `about`, `projects`, `current`, `sketchbook`, `familiar`, `changelog`, `map`, and `pile`. Each record chooses an anchor and corner/center; pixel offsets locate its image center relative to that anchor's padding box. The anchor is not recalculated during runtime.
- `wide`, `narrow`, `tablet`, and `mobile` independently override the base desktop pose. They may change anchor, point, offset, width, scale, rotation, local layer, flip, or visibility. There is no override cascade. `edgeOffset` still replaces X with canvas gutter minus edge offset; explicit `null` restores normal X positioning.
- Existing local stacking preserves Godot behind Sketchbook and Starforce/Kuromi behind inspectable files. Edge clipping remains page CSS. Decorative elements are pointer-inert and hidden from assistive technology.
- Removed procedural cluster/slot configuration, selection, jitter, rotated collision helpers, exclusion measurement, admission/occlusion code, observer/listener ownership, rendering layers, and their obsolete tests. Removed unused exclusion/surface markers. Old `exclusionPadding` fields survive exports as optional compatibility metadata; no runtime uses them and the editor no longer offers that control.
- [clutter-catalogue.ts](../../../lib/home/clutter-catalogue.ts) merges the curated catalogue with the folder library, rejects ambiguous IDs, and resolves saved asset references. Production passes only referenced assets to the renderer. Missing placed assets fail with an actionable message.
- [generate-clutter-library.mjs](../../../scripts/generate-clutter-library.mjs) retains validated dimension detection and deterministic folder generation. The existing image URLs remain under `public/media/home/random-clutter/`; that historical name now describes a manual palette, not a runtime random system. Settings/output were renamed to `home-clutter-library.settings.json` and `home-clutter-library.generated.ts`.

## Editing or adding a decoration

1. Drop a static image into the appropriate [palette folder](../../../public/media/home/random-clutter/README.md), then run `npm run clutter:generate`. It also runs before dev/build. An already-running dev server needs manual regeneration and refresh.
2. Open Home in development and explicitly click **Edit clutter**. The editor starts inactive and mounts authoring listeners only while open.
3. Use **Add from catalogue** to choose a curated or folder asset. The new preview shows the actual selected image. Add creates a complete record; Drag new asset places it directly. Whole-record Asset swaps an existing decoration. Folder assets require no second hand-maintained asset entry.
4. Drag, correct the semantic anchor/point, and adjust numbers, scale, rotation, flip, visibility, or local layer. Resize to author responsive overrides. Base edits affect inherited values; override edits preserve all other modes and untouched records.
5. **Export all placements** copies complete four-space records. Replace only `HOME_AUTHORED_PLACEMENTS` in `content/home-clutter.ts`, retaining its catalogue and existing type import. This repository edit makes the result durable. Done keeps the in-memory preview; reload discards an unsaved draft. No backend, autosave, local-storage authoring, or group editor was added.

| Mode | CSS/editor range |
| --- | --- |
| wide | width > 110rem |
| desktop (base) | 90rem < width <= 110rem |
| narrow | 76.25rem < width <= 90rem |
| tablet | 47.5rem < width <= 76.25rem |
| mobile | width <= 47.5rem |

Direct source editing uses the same records; no JSX coordinates or procedural configuration are required. To extend a composition, add a record with the appropriate semantic anchor, choose its relation to existing objects, and explicitly hide/reposition it at smaller modes. Current visible decoration counts remain 19 desktop, 17 tablet, and 12 mobile.

## Verification

- `npm test`: **46 tests / 9 files passed**. New catalogue tests were observed failing before selection/validation implementation, then passing. They cover saved folder references, omission of unused palette assets, missing placed IDs, and cross-catalogue duplicates. Existing meaningful anchor geometry, override preservation/export, generator, Familiar seed, audio, and content tests remain.
- `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run clutter:generate -- --check`: passed. Build generated all 17 routes.
- [Development browser evidence](implementation-checks/development-checks.json): **45 checks passed**. Native dragging, adding/swapping a folder image, image preview, numeric narrow-only edits, independent mobile visibility, untouched complete exports, Done preview/listener cleanup, and reload reset passed.
- [Production browser evidence](implementation-checks/production-checks.json): **37 checks passed**. Nine widths (1920, 1600, 1440, 1221, 1024, 768, 760, 390, 320) retain unique active instances, loaded media, inert decoration, and no additional horizontal overflow. The existing 320px root minimum is retained.
- Familiar cycling, reversible crystal, file focus/shuffle, Map inspection/Escape, visitor profile/Escape, Spotlight CTA pointer access, Sketchbook scrolling, Changelog expansion, SPA return, and refresh passed. Miku follows the Changelog bottom as it expands. Reduced motion selects all three authored GIF stills.
- Production has no editor UI/marker, active authoring/procedural listeners, or automatic decoration layer. Its client chunks and HTML omit unused library records; the browser downloads no unplaced palette images. The folder catalogue is server/build-time data, not a client placement engine.
- Focused read-only code review found no important implementation issue. Its stale palette README finding was corrected. Final screenshots were visually inspected for hierarchy, readable content, perches/occlusion, distinct material, preserved gaps, mobile reading order, and the preferred baseline's relationships.
- A strict scroll snapshot initially failed because Chromium transformed bounding rectangles differed by less than 0.001px after scrolling. Diagnosis confirmed subpixel rounding; the harness uses 0.1px precision. No product positioning fix was needed.

Final production captures: [1440 desktop](implementation-checks/home-1440.png), [1920 desktop](implementation-checks/home-1920.png), [1024 intermediate](implementation-checks/home-1024.png), [390 mobile](implementation-checks/home-390.png), [Projects regression](implementation-checks/projects-regression.png). [Editor trial export](implementation-checks/editor-trial-export.txt) records an intentionally unsaved verification draft, not the accepted composition.

All temporary browser/server processes were stopped. The agent did not commit or deploy. Local production-build verification does not constitute owner or live-deployment acceptance.

## Remaining art-direction opportunities

The lower handheld/Lancer field still reads more as a loose collection than an interacting character scene, and wide desktop intentionally leaves considerable breathing room around the profile. These strengths/limitations belong to the preserved curated baseline; they were not filled with weaker substitutes. New placements require visual review because there is deliberately no collision/admission engine.

No additional asset is required. If a later revision targets stronger edge interaction, the highest-impact optional addition would be **one original Familiar perch pose** for the outer Projects/file boundary: a transparent, asymmetric seated or leaning creature at roughly 80–120px, looking inward with a limb/tail crossing the border. Existing original 64px combat sprites do not depict that physical relationship. Source/create an ONFF side-view idle/perch; pose research terms: `seated pixel creature sprite`, `RPG mascot leaning on ledge`, `Gaia avatar sitting pose`. Prefer an original Familiar over another unrelated major character.

A lower-priority material addition would be **one real short ONFF debugging/process fragment** near Current/Sketchbook or behind a file: an authentic priority-rule annotation or compact combat-state capture with a distinctive ragged/irregular crop, readable around 120–180px. The existing Godot image already serves the rectangular UI role; most reserve assets are cutouts or emblems, so they do not add that authored process material. Source it from actual old ONFF notes/screenshots, rather than fabricating a generic forum or game interface. These are optional future directions requiring owner taste/input, not missing assets blocking this result.
