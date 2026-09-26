# Breakspider asset curation and homepage coverage

**Scope.** I inspected every item in `artifacts.rar`: 187 visual files and two development support files. The accompanying CSV has one row per archive item. Contact-sheet IDs match the CSV `index` column. The comparison uses `breakspider_wireframes(3)(1).html` (spatial revision 04) alongside the design philosophy, site architecture, and inspiration manifest. Per the creator's clarification, a Breakspider logo/animation, Viscap screenshots and demos, and game screenshots and demos **already exist outside this archive**. Their availability is assumed here; their exact formats, dimensions, and visual fit were not inspected.

## Curation read

The archive is strongest as a **supply of small, inspectable objects and optional collection material**. It is not a complete homepage media pack. The final wireframe's dominant Spotlight can be text-led; the two primary paths are About and Projects, while the Familiar, Sketchbook, status, changelog and found scraps orbit them. A process scrap touches the Spotlight media edge, and the artifact pile sits below the first primary paths. On mobile, Spotlight → About → Projects precedes secondary discoveries. This hierarchy argues for using only a handful of conspicuous images at once, with plenty of reserve.

The asset families are 54 distinct small pixel badges, 65 Noise-style emblems (16 silhouettes in four colors plus one green bonus), 15 square survivor portraits, 14 vector source references, 18 SVG interpretations/variants, and 21 other images including two original Familiar sprites and four GIFs. The RAR also includes `vectors/README.md` and `vectors/dev-gallery.html`, which are support files. No byte-identical visual files were found; many files are deliberate visual variants or reference/vector pairs.

**Source distinction:** Ashwing and Pebbloq are identifiable Pixel Pugilists material. Most other named motifs and portraits are recognizable game-derived references or interpretations. The unidentified white/orange/neon-green winged character appears in a bust and a pose sheet, but authorship is unverified from the archive. Treat the third-party families as exploratory candidates, and choose or adapt them deliberately before public use. Vectorizing a game emblem changes its format, not its underlying design provenance.

**Display distinction:** the two Familiar files are **64 × 64**, although the homepage placeholder says **96 × 96**. They can display at 96 × 96 with nearest-neighbor scaling. The 15 survivor avatar crops are opaque squares with dark painted backgrounds; the default avatar is a transparent 64 × 64 icon. GIF inspection includes multiple frames; the two strawberry loops briefly switch to a pale/white state, so their loop behavior needs checking in context.

## Homepage coverage matrix

“Covered” describes whether a plausible visual exists, including the creator's three assumed external media groups. It does not mean the final presentation or license decision is complete. The CSV separately identifies the strongest archive use for every file.

| Homepage need in final wireframe | Classification | Best evidence / fit | Production call |
|---|---|---|---|
| Logo / identity in sticky header and splash | **covered well** (external, assumed) | Existing Breakspider logo and animation, outside archive | Bring the canonical logo and animation into the build; no substitute in this RAR. |
| Home / Projects / About navigation sticker graphics | **covered, but weakly** | Three TWEWY-style speech-burst SVGs offer sticker-like shapes, but none is a labeled Breakspider nav set | Draw three related, distinct sticker backplates around legible labels; keep the whole sticker shifted, per wireframe. |
| Persistent audio control | **covered, but weakly** | `Megaphone_(Switch_2)_NH_Icon.png`; `Ukulele.webp` is an alternate motif | Megaphone can anchor the control; make a clear off/on treatment and keep a visible label/state. |
| Default visitor avatar | **covered well** | `avatars/defaultavatar.png` at 64 × 64 | Use as-is, after a small contrast check at 36 px in the header. |
| Collectible / profile cosmetics | **multiple good candidates** | 15 survivor portraits, 54 badges, pins, crystals, strawberry GIFs, Mr. Saturn, Noise emblems | Seed a small selection; keep many in reserve. Decide which become original Breakspider rewards. |
| Current professional Spotlight visual | **covered, but weakly** | External media may help, but the wireframe's job-search Spotlight permits an optional personal/current-work visual | Text-led Spotlight can ship without a decorative image. If adding one, use authored work or a purposeful composite. |
| Game-release Spotlight visual | **multiple good candidates** (external, assumed) | Existing game screenshots and demos plus two Familiar sprites | Select one authored gameplay frame or short demo for the image/video mode. |
| Projects homepage visual / archive teaser | **multiple good candidates** (external, assumed) | Existing Viscap and game screenshots/demos; Ashwing/Pebbloq as smaller overlays | Pair genuine evidence from each project instead of a generic icon collage. |
| Pixel Pugilists material | **multiple good candidates** (external, assumed) | Game screenshots/demos, `ashwing1.png`, `pebbloq1.png` | Use a game frame for the project/Spotlight; sprites for Familiar and cross-link details. |
| Viscap material | **covered well** (external, assumed) | Existing screenshots and demos | Select a representative workflow or system view; the wireframe's connected-platform map remains a separate explanatory graphic. |
| Random Familiar widget | **multiple good candidates** | Two distinct 64 × 64 sprites: Ashwing and Pebbloq | Both can rotate; add correct name, role/tags and destination for each. |
| Latest Sketchbook entry visual | **covered, but weakly** | TV SVG, speech burst or small game sprite can decorate a post | Use a thumbnail from the actual newest entry. The icon should not masquerade as its content. |
| Changelog / status visual | **covered, but weakly** | Speech-burst exclamation/question SVGs and tiny object sprites | One small accent can support the text; date/version/status still need clear typography. |
| Map / discovery object | **covered well** | `vectors/isaac-treasure-map.svg`, with original JPEG reference | Strong placeholder for a found Map. Adapt markings and route identity so it becomes Breakspider's own object. |
| Inspectable artifact pile below the main paths | **multiple good candidates** | Map, blue cube, pin, Wayfinder charm, crystals, pickaxe, sword | Pick three objects with different silhouettes and destinations; show the enlarged readable state on selection. |
| Contextual process scrap touching Spotlight media edge | **covered, but weakly** | External game footage could yield a crop; no battle-plan/UI study or decision artifact appears in the RAR | Create one actual PP process piece: annotated early/current UI, priority-rule sketch, or small diagram. |
| Small decorative/profile-era scraps | **multiple good candidates** | Crystals, pickaxe, TV, pins, GIFs, emblems, winged character artwork | Use sparingly around clear text paths; the manifest targets roughly 6/10 chaos. |
| Badges | **multiple good candidates** | 54 distinct pixel badges; winged badge SVG; pins | Curate a few meaningful unlocks rather than exposing the whole sprite set at once. |
| Cursor / follower candidates | **multiple good candidates** | Strawberry flap/idle GIFs, Mr. Saturn, tiny crystals/pickaxe, compact Noise emblems | Follower is the stronger use; design an actual pointer/hotspot and reduced-motion behavior separately. |
| About / creator-specific profile art | **covered, but weakly** | Winged character bust and sheet might qualify if authored/representative | Confirm what they depict; otherwise a text-led About remains valid in the wireframe. |

### Placement notes

- **Homepage candidates:** default avatar; Ashwing/Pebbloq; a small map/found object; one speech accent; a selected artifact pile; the external logo and project footage. The current professional Spotlight does not require a large visual.
- **Deeper-page candidates:** selected vector motifs on an inspiration or collection page; larger wayfinder items; the winged character sheet if it belongs to the creator's practice; the actual project screenshots/demos.
- **Collectible candidates:** badges, selected avatars, pins, small animated pickups and follower choices.
- **Decorative reserve:** most color-swapped Noise emblems and unselected recognizable franchise props. They need no permanent destination.
- **Probably unused in production UI:** the development gallery and README; source images when the corresponding derivative is the chosen asset.

## First implementation shortlist (22 archive items)

These are **selection candidates**, not a demand to place 22 images on the homepage. The external logo, Viscap media and game media are additional implementation inputs. IDs refer to the contact sheet and CSV.

| ID | Asset | First job / decision |
|---:|---|---|
| 003 | `avatars/defaultavatar.png` | Default profile and sticky-header avatar; use as-is. |
| 075 | `familiar sprites/ashwing1.png` | Random Familiar seed; nearest-neighbor to 96 px. |
| 076 | `familiar sprites/pebbloq1.png` | Second Random Familiar seed; same treatment. |
| 168 | `vectors/isaac-treasure-map.svg` | Found Map object; revise markings to belong to Breakspider. |
| 174 | `vectors/ror-drifter-cube.svg` | Distinct cube object in the artifact pile; use cutout at medium scale. |
| 176 | `vectors/twewy-pin-lightning-rage.svg` | Round pin candidate for pile or collection; test lettering at display size. |
| 177 | `vectors/twewy-speech-bubble-exclamation.svg` | Tiny “new”/changelog accent; recolor. |
| 178 | `vectors/twewy-speech-bubble-question.svg` | Found-object/discovery cue; recolor. |
| 179 | `vectors/twewy-speech-bubble.svg` | General callout scrap; reserve for a meaningful action. |
| 080 | `Megaphone_(Switch_2)_NH_Icon.png` | Audio-control pictogram; produce mute and active states. |
| 170 | `vectors/p4g-tv-icon.svg` | Sketchbook/media scrap; only if relevant to the chosen post. |
| 158 | `vector inspo/PlayerPinSwitch.webp` | Round pin source for evaluation; prefer its SVG (#172) if selected. |
| 172 | `vectors/player-pin-switch.svg` | Small collectible pin; choose one pin for initial inventory. |
| 078 | `Life_Crystal_(placed).gif` | Red pickup/follower candidate; inspect motion in context. |
| 079 | `Mana_Crystal_(placed).gif` | Blue counterpart; optional second unlock. |
| 147 | `Strawberry_flap.gif` | Playful follower candidate; check full loop and motion setting. |
| 148 | `Strawberry_idle.gif` | Idle partner to #147, not a separate unlock. |
| 019 | `badge sprites/badge_01_r01_c01.png` | Restrained gray first badge candidate. |
| 023 | `badge sprites/badge_05_r01_c05.png` | Bright heart badge alternative; choose based on unlock theme. |
| 033 | `badge sprites/badge_15_r02_c07.png` | Cool blue snowflake badge alternative. |
| 083 | `noise sprites/blue/noise_02_blue.png` | Compact emblem scale test, likely decorative reserve. |
| 154 | `vector inspo/isaactreasuremap.jpg` | Comparison/reference for map adaptation; do not separately place alongside #168. |

The shortlist includes two reference/derivative pairs intentionally so implementation can compare the underlying silhouette and vector result. If the final design uses the SVG, the source file remains a reference rather than a second homepage object. **Actual initial on-page count:** roughly the external logo, one chosen Spotlight/project image, default avatar, 1–2 Familiar sprites, one audio icon, one map/scrap, 1–3 artifacts, and perhaps one small update accent.

## Gaps worth sourcing or creating

1. **Site-specific navigation sticker set:** three readable Home / Projects / About backplates with coherent colors and whole-sticker offsets. The existing burst graphics are concept references, not finished labels.
2. **A real PP process scrap:** a cropped Battle Plans sketch, annotated combat UI before/after, status interaction diagram, or similar artifact that opens the PP notebook. This makes the wireframe's overlapping note substantive.
3. **Audio state pair:** active/muted treatment, including a legible compact mobile state. The megaphone alone does not express both states.
4. **Authored collection identity:** decide the first 1–3 rewards and make them meaningful site discoveries; adapt or replace franchise badges/avatars as the site grows.
5. **Entry-specific Sketchbook thumbnail:** only after choosing the actual latest entry. A placeholder icon can be used temporarily, but should not imply a false post topic.
6. **A connected Viscap system diagram:** existing screenshots/demos are assumed, yet the wireframe calls for a visual showing one platform and linked systems. Build this from accurate project facts rather than decorative assets.
7. **A creator-specific Spotlight/portrait visual, only if wanted:** the current text-led professional Spotlight and About already work without one. Clarify whether the winged character art is representative before using it.
8. **Bring the known external media into the implementation bundle:** canonical Breakspider logo/animation, selected Viscap evidence, and selected gameplay evidence. This is packaging/selection work, not new asset sourcing.

## Index and inspection notes

- `breakspider_asset_inventory.csv`: all **189 archive entries**; fields cover filename, type, dimensions/aspect, visual description, likely source/category, background, duplicate/variant, strongest use, alternatives, treatment, and placement.
- `breakspider_contact_sheet.pdf`: seven labeled pages. Pages 1–6 cover **all 187 visuals** by matching index ID; page 7 shows five frames from each animated GIF. Checkerboard indicates transparency in the contact sheets, not an embedded background.
- All SVGs were rasterized for inspection and compared against their reference images. The vector folder's README claims a multi-badge SVG that is not actually present in the RAR; the inventory reflects the files present.
- Approximate source labels are visual/provenance inferences from filenames and artwork, not a verified rights ledger. No exact file hash duplicates were detected.
