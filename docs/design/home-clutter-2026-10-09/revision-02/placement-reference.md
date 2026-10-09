# Numerical preview reference: revision 02

**Production adjustment:** Terra Blade now uses `edgeOffset: 84` in `content/home-clutter.ts`, rather than the earlier comp's 39px inset, so its entire silhouette is visible. Narrow-desktop safety tuning and real stacking are documented in [implementation notes](implementation-notes.md). The tables below describe the historical screenshot comp; the saved production records are the current source of truth.

These are **design preview records**, not production interfaces or an implemented placement renderer. Dimensions describe the entire image canvas including transparent padding. Every image retains its source aspect ratio. An offset locates the image center relative to the named anchor corner; positive x moves right and positive y moves down. Rotation is clockwise for positive values.

The preview uses frozen section geometry from the unchanged homepage and crops only at the outside page boundary. “Behind” identifies frames hidden by compositing masks. Production should use appropriate stacking relationships and positioned wrappers rather than copy those masks or absolute page coordinates. Keep text, controls, and focus outlines above decoration. The exact sample records are in [placements.json](placements.json); centerX/centerY are diagnostic screenshot coordinates, not recommended production anchors.

The found-map anchor below refers to the actual fixed map artifact. If the implementation tutorial uses a lower-field wrapper instead, preserve this relationship without changing the map's own interaction or treating it as decoration.

## Requested width 1920

Capture: 1905 × 1927; 19 objects.

| Group | Exact asset | Anchor corner | Center offset x, y (px) | Canvas width (px) | Rotation | Flip X | Behind |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `pixel-art-purple-narwhal-purple-narwhal-left.png` | spotlight top-left | -15.0, -15.0 | 84 | -5° | No | None |
| B | `miku_tv_static.png` | changelog bottom-right | 41.0, 116.0 | 220 | 0° | No | None |
| C | `action-acting.gif` | about top-right | -29.0, 16.0 | 160 | 0° | Yes | None |
| C | `jojo-killer-queen.png` | about bottom-right | -163.0, 10.0 | 66 | -9° | No | projects |
| D | `onff-godot-panel.PNG` | sketchbook top-left | -8.0, 32.0 | 172 | 7° | No | sketchbook |
| E | `Strawberry_flap.gif` | familiar bottom-right | -140.0, 34.0 | 76 | -8° | No | None |
| E | `color-pixels-old-games-pink-handheld.png` | familiar bottom-left | 112.0, 163.0 | 160 | -12° | No | None |
| E | `lancer-deltarune.gif` | familiar bottom-left | 306.0, 120.0 | 152 | 0° | No | None |
| F | `StS2_RingOfTheSnake.png` | sketchbook bottom-right | 55.0, -86.0 | 78 | -15° | No | sketchbook, changelog |
| F | `StS2_SneckoSkull.png` | sketchbook bottom-right | 112.0, -14.0 | 104 | 9° | No | sketchbook, changelog |
| G | `acnh_megaphone.png` | changelog top-left | -44.0, 35.0 | 140 | -12° | No | None |
| H | `slimerancher_glitch.png` | map top-left | -105.0, 77.0 | 130 | -8° | No | None |
| H | `Aqua's_Wayfinder.webp` | map top-right | 35.0, 40.0 | 86 | 12° | No | None |
| H | `FF4_PSP_Light_Crystal.webp` | map top-right | 105.0, 101.0 | 22 | -8° | No | None |
| H | `FF4_PSP_Dark_Crystal.webp` | map top-left | -35.0, 160.0 | 20 | 9° | No | None |
| I | `starforce_omega_1.png` | artifacts top-left | 430.0, -29.0 | 100 | 0° | No | files |
| B | `Terra_Blade.webp` | projects bottom-right | 25.0, 8.0 | 106 | 9° | No | projects |
| I | `sanrio-nyanmi-pack.png` | artifacts top-right | -69.0, -15.0 | 130 | 9° | No | files |
| I | `Ukulele.webp` | artifacts bottom-left | 223.0, 34.0 | 124 | -12° | No | None |

## Requested width 1600

Capture: 1585 × 1944; 19 objects.

| Group | Exact asset | Anchor corner | Center offset x, y (px) | Canvas width (px) | Rotation | Flip X | Behind |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `pixel-art-purple-narwhal-purple-narwhal-left.png` | spotlight top-left | -15.0, -15.0 | 84 | -5° | No | None |
| B | `miku_tv_static.png` | changelog bottom-right | 34.6, 116.0 | 220 | 0° | No | None |
| C | `action-acting.gif` | about top-right | -35.4, 16.0 | 160 | 0° | Yes | None |
| C | `jojo-killer-queen.png` | about bottom-right | -163.0, 10.0 | 66 | -9° | No | projects |
| D | `onff-godot-panel.PNG` | sketchbook top-left | 44.0, 32.0 | 172 | 7° | No | sketchbook |
| E | `Strawberry_flap.gif` | familiar bottom-right | -140.0, 34.0 | 76 | -8° | No | None |
| E | `color-pixels-old-games-pink-handheld.png` | familiar bottom-left | 112.0, 163.0 | 160 | -12° | No | None |
| E | `lancer-deltarune.gif` | familiar bottom-left | 306.0, 120.0 | 152 | 0° | No | None |
| F | `StS2_RingOfTheSnake.png` | sketchbook bottom-right | 55.0, -86.0 | 78 | -15° | No | sketchbook, changelog |
| F | `StS2_SneckoSkull.png` | sketchbook bottom-right | 112.0, -14.0 | 104 | 9° | No | sketchbook, changelog |
| G | `acnh_megaphone.png` | changelog top-left | -44.0, 35.0 | 140 | -12° | No | None |
| H | `slimerancher_glitch.png` | map top-left | -105.0, 77.0 | 130 | -8° | No | None |
| H | `Aqua's_Wayfinder.webp` | map top-right | 35.0, 40.0 | 86 | 12° | No | None |
| H | `FF4_PSP_Light_Crystal.webp` | map top-right | 105.0, 101.0 | 22 | -8° | No | None |
| H | `FF4_PSP_Dark_Crystal.webp` | map top-left | -35.0, 160.0 | 20 | 9° | No | None |
| I | `starforce_omega_1.png` | artifacts top-left | 430.0, -29.0 | 100 | 0° | No | files |
| B | `Terra_Blade.webp` | projects bottom-right | 18.6, 8.0 | 106 | 9° | No | projects |
| I | `sanrio-nyanmi-pack.png` | artifacts top-right | -69.0, -15.0 | 130 | 9° | No | files |
| I | `Ukulele.webp` | artifacts bottom-left | 223.0, 34.0 | 124 | -12° | No | None |

## Requested width 1440

Capture: 1425 × 1957; 19 objects.

| Group | Exact asset | Anchor corner | Center offset x, y (px) | Canvas width (px) | Rotation | Flip X | Behind |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `pixel-art-purple-narwhal-purple-narwhal-left.png` | spotlight top-left | -15.0, -15.0 | 84 | -5° | No | None |
| B | `miku_tv_static.png` | changelog bottom-right | 28.8, 116.0 | 190 | 0° | No | None |
| C | `action-acting.gif` | about top-right | -41.2, 16.0 | 160 | 0° | Yes | None |
| C | `jojo-killer-queen.png` | about bottom-right | -163.0, 10.0 | 66 | -9° | No | projects |
| D | `onff-godot-panel.PNG` | sketchbook top-left | 44.0, 32.0 | 152 | 7° | No | sketchbook |
| E | `Strawberry_flap.gif` | familiar bottom-right | -140.0, 34.0 | 76 | -8° | No | None |
| E | `color-pixels-old-games-pink-handheld.png` | familiar bottom-left | 112.0, 163.0 | 160 | -12° | No | None |
| E | `lancer-deltarune.gif` | familiar bottom-left | 306.0, 120.0 | 152 | 0° | No | None |
| F | `StS2_RingOfTheSnake.png` | sketchbook bottom-right | 55.0, -86.0 | 78 | -15° | No | sketchbook, changelog |
| F | `StS2_SneckoSkull.png` | sketchbook bottom-right | 112.0, -14.0 | 104 | 9° | No | sketchbook, changelog |
| G | `acnh_megaphone.png` | changelog top-left | -44.0, 35.0 | 140 | -12° | No | None |
| H | `slimerancher_glitch.png` | map top-left | -105.0, 77.0 | 130 | -8° | No | None |
| H | `Aqua's_Wayfinder.webp` | map top-right | 35.0, 40.0 | 86 | 12° | No | None |
| H | `FF4_PSP_Light_Crystal.webp` | map top-right | 105.0, 101.0 | 22 | -8° | No | None |
| H | `FF4_PSP_Dark_Crystal.webp` | map top-left | -35.0, 160.0 | 20 | 9° | No | None |
| I | `starforce_omega_1.png` | artifacts top-left | 430.0, -29.0 | 100 | 0° | No | files |
| B | `Terra_Blade.webp` | projects bottom-right | 12.8, 8.0 | 106 | 9° | No | projects |
| I | `sanrio-nyanmi-pack.png` | artifacts top-right | -69.0, -15.0 | 130 | 9° | No | files |
| I | `Ukulele.webp` | artifacts bottom-left | 223.0, 34.0 | 124 | -12° | No | None |

## Requested width 1024

Capture: 1009 × 2736; 17 objects.

| Group | Exact asset | Anchor corner | Center offset x, y (px) | Canvas width (px) | Rotation | Flip X | Behind |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `pixel-art-purple-narwhal-purple-narwhal-left.png` | spotlight top-left | -5.0, -19.0 | 60 | -5° | No | None |
| B | `miku_tv_static.png` | changelog bottom-right | 17.9, 92.0 | 150 | 0° | No | None |
| C | `action-acting.gif` | about bottom-right | -51.0, 62.0 | 140 | 0° | Yes | None |
| C | `jojo-killer-queen.png` | about bottom-left | 165.0, 30.0 | 60 | -9° | No | None |
| D | `onff-godot-panel.PNG` | current top-right | -113.0, 210.0 | 150 | 7° | No | None |
| E | `Strawberry_flap.gif` | familiar bottom-left | 60.0, 18.0 | 62 | -8° | No | None |
| E | `color-pixels-old-games-pink-handheld.png` | familiar bottom-left | 162.0, 77.0 | 114 | -12° | No | None |
| F | `StS2_RingOfTheSnake.png` | sketchbook bottom-left | -50.0, -69.0 | 48 | -15° | No | None |
| F | `StS2_SneckoSkull.png` | sketchbook bottom-left | -76.0, -8.0 | 62 | 9° | No | None |
| G | `acnh_megaphone.png` | changelog top-left | -25.0, 31.0 | 110 | -12° | No | None |
| H | `slimerancher_glitch.png` | map top-left | -90.0, 78.0 | 105 | -8° | No | None |
| H | `Aqua's_Wayfinder.webp` | map top-right | 30.0, 40.0 | 80 | 12° | No | None |
| H | `FF4_PSP_Light_Crystal.webp` | map top-right | 96.0, 111.0 | 18 | -8° | No | None |
| H | `FF4_PSP_Dark_Crystal.webp` | map top-left | -28.0, 168.0 | 18 | 9° | No | None |
| I | `starforce_omega_1.png` | artifacts top-left | 470.0, 34.0 | 80 | 0° | No | None |
| I | `sanrio-nyanmi-pack.png` | artifacts top-right | -66.0, -18.0 | 104 | 9° | No | None |
| I | `Ukulele.webp` | artifacts bottom-left | 170.0, 42.0 | 100 | -12° | No | None |

## Requested width 390

Capture: 375 × 3922; 12 objects.

| Group | Exact asset | Anchor corner | Center offset x, y (px) | Canvas width (px) | Rotation | Flip X | Behind |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `pixel-art-purple-narwhal-purple-narwhal-left.png` | spotlight top-left | 1.0, -12.0 | 44 | -5° | No | None |
| B | `miku_tv_static.png` | sketchbook top-right | -41.0, -39.0 | 88 | 0° | No | None |
| C | `action-acting.gif` | about bottom-left | 61.0, -91.0 | 104 | 0° | No | None |
| E | `Strawberry_flap.gif` | familiar bottom-left | 52.0, 10.0 | 50 | -7° | No | None |
| E | `color-pixels-old-games-pink-handheld.png` | familiar bottom-left | 45.0, -74.0 | 72 | -12° | No | None |
| G | `acnh_megaphone.png` | changelog top-right | -35.0, -9.0 | 90 | 10° | No | None |
| H | `Aqua's_Wayfinder.webp` | map top-right | 38.0, 50.0 | 64 | 10° | No | None |
| H | `slimerancher_glitch.png` | map top-left | -55.0, 128.0 | 66 | -5° | No | None |
| H | `FF4_PSP_Light_Crystal.webp` | map top-right | 21.0, 117.0 | 15 | -8° | No | None |
| H | `FF4_PSP_Dark_Crystal.webp` | map top-left | -29.0, 169.0 | 14 | 9° | No | None |
| I | `sanrio-nyanmi-pack.png` | artifacts top-right | -36.0, -10.0 | 72 | 9° | No | None |
| I | `Ukulele.webp` | artifacts bottom-right | -50.0, 60.0 | 78 | -12° | No | None |

## Optional rainbow replacement

At 1920, replace A with `rainbow_badge.png`: Spotlight top-left, center offset +3px/−10px, width 32px, rotation −12°, no mirror. This is shown only in the separate fallback PNG; the main records retain the recommended narwhal. Do not render both.

## Rendering notes

Use pixelated interpolation for the narwhal, Kris, FF4 crystals, sword, ukulele, Starforce, Lancer, strawberry, and handheld. Use normal interpolation for the painted/illustrated pieces and process screenshot. Upscaling is allowed; preserve silhouette quality rather than force native-size thumbnails. The process screenshot alone receives a 2px muted border and short dark shadow. Other keepsakes remain unboxed. Source GIFs still animate in the direct preview HTML; PNG captures sample one frame.
