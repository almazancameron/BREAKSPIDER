# Numerical placement reference

> **Revision 02 is the current placement recommendation.** See [the revised comp and plan](revision-02/README.md). The dense proposal below is retained as history; its placement decisions are superseded. The original visual asset inspection remains useful.

**Design reference only; not a production schema or implementation.** These are the exact center-relative poses used for the PNG comps. Read [the art direction](placement-plan.md) first.

Width includes transparent padding. Height preserves source ratio. Offsets are pixels; angle is clockwise degrees. Anchor points refer to the current rendered section. The preview's `map` alias means the existing Found site map section. Layer 1 is rear decoration; layer 4 is a safe attached foreground pin. These numbers are local to the temporary preview, not production z-index instructions.

There are 56 supplied-asset placements on desktop, 15 on tablet, and 10 on mobile. A separate process screenshot adds one rear object on desktop. Repeated Noise is intentional. The machine-readable [preview-placements.json](preview-placements.json) also records 1600, 1440, 1221, 768, and 320 samples. Absolute centerX/centerY values in that file are diagnostic screenshot coordinates; do not use them as production positioning.

## Edge anchoring

For clusters A/B, preserve horizontal attachment to the canvas edge and vertical attachment to the named section edge. Their x offsets below were measured at the wide-desktop capture and must be rebased when canvas padding changes. The intended centers are explicit in the placement plan and preview: typically 0–38px from the left edge and 7–39px from the right edge. Use page-owned wrappers or compact breakpoint corrections; do not shift the Spotlight or copy to make these numbers fit.

Other clusters use ordinary section-relative offsets. The proposal does not depend on global viewport y coordinates. On content changes, follow the current section rectangle and preserve the described protected zones.

## 1920px requested viewport

### A. Left perimeter

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `noise_01_orange.png` | spotlight / top-left | -46, 26 | 92 | -5° | 1 |
| `noise_02_lavender.png` | spotlight / top-left | -29, 118 | 35 | 7° | 1 |
| `noise_04_red.png` | spotlight / top-left | -58, 207 | 56 | -8° | 1 |
| `noise_07_blue.png` | spotlight / top-left | -34, 266 | 34 | 2° | 1 |
| `noise_05_lavender.png` | spotlight / top-left | -55, 347 | 52 | 6° | 1 |
| `noise_06_red.png` | spotlight / top-left | -26, 393 | 24 | -6° | 1 |
| `noise_12_orange.png` | spotlight / bottom-left | -50, -35 | 58 | -6° | 1 |
| `noise_13_blue.png` | spotlight / bottom-left | -33, 28 | 42 | 8° | 1 |
| `noise_14_red.png` | familiar / top-left | -56, -60 | 48 | -4° | 1 |
| `noise_02_lavender.png` | familiar / top-left | -35, 78 | 34 | 3° | 1 |
| `noise_15_orange.png` | familiar / bottom-left | -54, -10 | 60 | -7° | 1 |
| `noise_07_blue.png` | familiar / bottom-left | -30, 82 | 34 | 5° | 1 |
| `noise_08_lavender.png` | pile / top-left | -64, 123 | 120 | 8° | 1 |
| `noise_06_red.png` | pile / bottom-left | -32, -48 | 26 | -5° | 1 |

### B. Right perimeter

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `noise_13_blue.png` | about / top-right | 63, 116 | 50 | 5° | 1 |
| `noise_06_red.png` | about / top-right | 40, 154 | 26 | -5° | 1 |
| `noise_05_lavender.png` | projects / top-right | 69, -61 | 68 | -7° | 1 |
| `noise_10_blue.png` | projects / top-right | 55, 106 | 55 | 8° | 1 |
| `noise_14_red.png` | projects / top-right | 72, 233 | 44 | -4° | 1 |
| `noise_08_lavender.png` | projects / bottom-right | 72, -6 | 112 | -9° | 1 |
| `noise_04_red.png` | changelog / top-right | 67, 92 | 51 | 5° | 1 |
| `noise_02_lavender.png` | changelog / bottom-right | 45, -17 | 38 | -5° | 1 |
| `noise_15_orange.png` | pile / top-right | 62, 37 | 56 | -5° | 1 |
| `noise_07_blue.png` | pile / bottom-right | 49, -30 | 42 | 5° | 1 |

### C. Profile keepsakes

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `rainbow_badge.png` | spotlight / top-left | 3, -10 | 32 | -12° | 4 |
| `relic_badge.png` | spotlight / top-left | 39, -19 | 28 | 9° | 4 |
| `jojo-giorno-pin.png` | about / top-left | -43, 101 | 62 | -14° | 4 |
| `avatar-sokka-boomerang.png` | about / top-right | 12, 10 | 118 | 28° | 1 |
| `jojo-killer-queen.png` | about / bottom-right | -163, 10 | 66 | -9° | 1 |
| `LoL_item_locket.png` | about / bottom-right | -112, 19 | 36 | 8° | 1 |
| `noise_02_lavender.png` | about / bottom-right | -219, 11 | 29 | -7° | 1 |

### D. Gear bridge

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `LoL_item_rabadon.png` | current / top-right | -124, -21 | 34 | -8° | 1 |
| `LoL_item_lichbane.png` | current / top-right | -69, -17 | 34 | 8° | 1 |
| `LoL_item_jaksho.png` | current / top-right | -18, -23 | 26 | 0° | 1 |
| `noise_06_red.png` | current / top-right | -50, -54 | 24 | -6° | 1 |

### E. Familiar / toy pocket

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `Strawberry_flap.gif` | familiar / bottom-right | -140, 34 | 76 | -8° | 1 |
| `StS2_RingOfTheSnake.png` | familiar / bottom-left | 96, 74 | 70 | -15° | 1 |
| `StS2_SneckoSkull.png` | familiar / bottom-left | 165, 65 | 94 | 9° | 1 |
| `noise_07_blue.png` | familiar / bottom-left | 218, 100 | 30 | -4° | 1 |
| `color-pixels-old-games-pink-handheld.png` | familiar / bottom-left | 88, 187 | 160 | -12° | 1 |
| `lancer-deltarune.gif` | familiar / bottom-left | 306, 120 | 152 | 0° | 1 |

### F. Sketchbook broadcast

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `miku_tv_static.png` | sketchbook / bottom-right | 63, -40 | 210 | 5° | 1 |
| `rising_badge.png` | sketchbook / bottom-right | -23, 16 | 34 | -12° | 1 |

### G. Update announcement

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `acnh_megaphone.png` | changelog / top-left | -44, 35 | 140 | -12° | 1 |
| `noise_06_red.png` | changelog / top-left | -39, 106 | 28 | 5° | 1 |

### H. Found-map discoveries

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `slimerancher_glitch.png` | map / top-left | -86, 77 | 130 | -8° | 1 |
| `Aqua's_Wayfinder.webp` | map / top-right | 35, 40 | 86 | 12° | 1 |
| `FF4_PSP_Light_Crystal.webp` | map / top-right | 105, 101 | 22 | -8° | 1 |
| `FF4_PSP_Dark_Crystal.webp` | map / top-left | -35, 160 | 20 | 9° | 1 |
| `noise_10_blue.png` | map / top-left | -176, 27 | 43 | -9° | 1 |

### I. Archive sediment

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `starforce_omega_1.png` | pile / top-left | 292, -25 | 72 | 0° | 1 |
| `Terra_Blade.webp` | pile / top-left | 579, 0 | 92 | 9° | 1 |
| `noise_12_orange.png` | pile / top-left | 652, -36 | 46 | -8° | 1 |
| `sanrio-nyanmi-pack.png` | pile / top-right | -69, -15 | 130 | 9° | 1 |
| `noise_05_lavender.png` | pile / top-right | -20, -37 | 44 | -6° | 1 |
| `Ukulele.webp` | pile / bottom-left | 223, 34 | 124 | -12° | 1 |

Additional rear reference: `assets/work-screenshots/onff-godot-panel.PNG`, pile / top-left, center offset **430, 20**, **180×173px**, **+7°**. The real file group covers its lower part. It is not a fourth inspectable file.

## 1024px requested viewport

### A. Left perimeter

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `noise_01_orange.png` | spotlight / top-left | -28.86, 38 | 78 | -5° | 1 |
| `noise_05_lavender.png` | spotlight / bottom-left | -24.86, -90 | 48 | 6° | 1 |

### B. Right perimeter

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `noise_10_blue.png` | projects / top-right | 36.86, 63 | 48 | 8° | 1 |
| `noise_14_red.png` | changelog / bottom-right | 39.86, -25 | 43 | -4° | 1 |

### C. Profile keepsakes

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `rainbow_badge.png` | spotlight / top-left | 4, -10 | 30 | -12° | 4 |
| `relic_badge.png` | spotlight / top-left | 40, -18 | 28 | 9° | 4 |
| `jojo-giorno-pin.png` | about / top-left | 80, 125 | 50 | -12° | 4 |

### E. Familiar / toy pocket

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `Strawberry_flap.gif` | familiar / bottom-left | 60, 18 | 62 | -8° | 1 |
| `color-pixels-old-games-pink-handheld.png` | familiar / bottom-left | 148, 91 | 114 | -12° | 1 |

### F. Sketchbook broadcast

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `miku_tv_static.png` | sketchbook / bottom-left | -54, -71 | 112 | 8° | 1 |

### G. Update announcement

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `acnh_megaphone.png` | changelog / top-left | -25, 31 | 110 | -12° | 1 |

### H. Found-map discoveries

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `slimerancher_glitch.png` | map / top-left | -72, 78 | 105 | -8° | 1 |
| `Aqua's_Wayfinder.webp` | map / top-right | 30, 40 | 80 | 12° | 1 |

### I. Archive sediment

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `sanrio-nyanmi-pack.png` | pile / top-right | -66, -18 | 104 | 9° | 1 |
| `noise_08_lavender.png` | pile / bottom-left | 12, 60 | 106 | 8° | 1 |

## 390px requested viewport

### A. Left perimeter

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `noise_02_lavender.png` | projects / top-left | -2, -19 | 30 | -9° | 1 |

### C. Profile keepsakes

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `relic_badge.png` | spotlight / top-left | 16, -7 | 24 | 7° | 4 |
| `jojo-giorno-pin.png` | about / bottom-right | -28, -2 | 42 | -12° | 4 |

### D. Gear bridge

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `LoL_item_rabadon.png` | current / bottom-right | -20, 15 | 33 | -8° | 1 |

### E. Familiar / toy pocket

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `Strawberry_flap.gif` | familiar / bottom-left | 52, 10 | 50 | -7° | 1 |

### F. Sketchbook broadcast

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `miku_tv_static.png` | sketchbook / top-right | -41, -39 | 88 | 8° | 1 |

### G. Update announcement

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `acnh_megaphone.png` | changelog / top-right | -35, -9 | 90 | 10° | 1 |

### H. Found-map discoveries

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `Aqua's_Wayfinder.webp` | map / top-right | 38, 50 | 64 | 10° | 1 |
| `slimerancher_glitch.png` | map / top-left | -44, 128 | 66 | -5° | 1 |

### I. Archive sediment

| File | Anchor / point | Center offset x, y | Width | Angle | Preview layer |
| --- | --- | --- | --- | --- | --- |
| `noise_08_lavender.png` | pile / bottom-right | -51, 57 | 88 | -6° | 1 |

## Preview limitations

The overlay attaches its artwork to measured section rectangles for each capture. It is not a live placement editor, saved production configuration, or accessibility implementation. The file group is temporarily raised only inside the screenshot browser to demonstrate rear layering. The PNGs freeze GIF frames. Review the future renderer with changing Familiar state, expanded updates, file focus, image load, and reduced motion before accepting implementation.
