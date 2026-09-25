# Breakspider vector graphics handoff

Use this document before changing the Breakspider logo artwork or its motion assets.

## Source of truth

`tools/build_logo.py` is the editable source for the SVG logo system. It defines the custom lettering, web geometry, center bridge and frays, spider, shared ink color, and each asset's crop. Running it regenerates the files in `assets/breakspider-logo/` and rewrites `manifest.json`.

```powershell
python tools/build_logo.py
```

The SVGs are generated deliverables. Avoid hand-editing them unless making a small, temporary experiment. Put lasting geometry changes in `build_logo.py`, rebuild, then copy changed assets into `prototype/logo-animation/assets/` when the motion prototype needs them.

`assets/logo-concept-draft.png` is reference material only. It is not part of the vector build.

## Coordinate system and placement

The master composition is **1600 × 820** units with a transparent background and warm off-white ink: `#f4f0e5`.

Most individual SVGs have a tight `viewBox` around their content. They are not positioned at `(0, 0)` in the master composition. Read `assets/breakspider-logo/manifest.json` for each file's `x`, `y`, `width`, and `height`, then place it at those master coordinates. This preserves the assembled logo and prevents gaps at the center junction.

Use `logo-full.svg` for a single final-lockup image. Use `logo-assembled.svg` for inspecting the grouped final composition. Use the separated assets when the parts need to move independently.

## Asset roles

| Purpose | Asset |
|---|---|
| Rigid left wordmark | `break.svg` |
| Rigid right wordmark | `spider-wordmark.svg` |
| Lightly tensioned web | `web-taut.svg` |
| Loaded but connected web | `web-loaded.svg` |
| Final broken web | `web-broken.svg` |
| Broken center silk ends | `web-frays.svg` |
| Final-state web halves | `web-left.svg`, `web-right.svg` |
| Independent spider | `spider.svg` |

The web poses deliberately share the same outer anchors, six spoke indices per side, four capture rings, and four center bridge attachment points. Preserve those correspondences when modifying a pose so pre-load, loaded, and broken states still read as the same web over time.

## Animation constraints

- Treat `break.svg` and `spider-wordmark.svg` as rigid objects. Translate and rotate them; do not warp their paths.
- Treat the web as the flexible object. Animate from `web-taut.svg` to `web-loaded.svg`, then hand off to the split `web-left.svg`, `web-right.svg`, and `web-frays.svg` for the snap.
- At the broken handoff, keep the two halves related to their former shared center. The loose strands must originate from the matching bridge points.
- The far-right spider connection is precise: `manifest.json` contains `spider_tether_join` (`1524.119, 580.785`). Any live tether should end at that point on the spider and start at the animated right-web attachment. If the right web recoils, move the tether's web endpoint with it.

The current proof of concept is `prototype/logo-animation/index.html`. It includes the additional live tether and its recoil tracking logic. The splash proof of concept reuses that animation through an iframe.

## Visual rules

Keep the artwork off-white on transparent or black presentation backgrounds. Maintain thin, round-capped web strokes, curved capture arcs, irregular spacing, and tapered cells. The lettering has intentionally uneven custom contours and restrained print-wear cutouts; preserve its legibility and avoid adding random distress that obscures counters or joins.

Do not use regular grid cells for the web. Its structure should read as support strands, radial spokes, and curved capture silk.

## After making a change

1. Run `python tools/build_logo.py` from the project root.
2. Open `assets/breakspider-logo/preview.html` to inspect all assets, all web states, and the final assembly.
3. Check the three web states in order for matching outer anchors, spoke order, bridge attachment points, and a clear broken center.
4. If animation assets changed, copy the relevant SVGs to `prototype/logo-animation/assets/`, open `prototype/logo-animation/index.html`, and review the loaded-to-broken handoff.
5. If the motion export changed, regenerate it from `prototype/logo-animation/` with `node render-gif.js`.

