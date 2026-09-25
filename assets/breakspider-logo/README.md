# Breakspider logo assets

Open [preview.html](preview.html) for the contact sheet. [contact-sheet.png](contact-sheet.png) is a static export of the same view.

For source-of-truth, placement, and animation handoff guidance, read [the vector graphics handoff](../../docs/breakspider_vector_graphics_handoff.md).

## Files

| Asset | File |
|---|---|
| Refreshed complete logo | `logo-full.svg` |
| Final logo, white with transparent print-wear cutouts | `breakspider-final-white.png` |
| Final logo, white with narrow black outline on transparent | `breakspider-final-outlined.png` |
| BREAK wordmark | `break.svg` |
| SPIDER wordmark | `spider-wordmark.svg` |
| Left web section | `web-left.svg` |
| Right web section | `web-right.svg` |
| Torn center strands | `web-frays.svg` |
| Small spider | `spider.svg` |
| Pre-load intact web | `web-taut.svg` |
| Loaded intact web | `web-loaded.svg` |
| Overloaded broken web | `web-broken.svg` |
| Editable grouped final composition | `logo-assembled.svg` |

The SVGs have transparent backgrounds and use warm off-white ink (`#f4f0e5`). The letter shapes use clipped terminals, angled counters, and light print wear. Every web pose uses the same outer anchors, twelve spoke indices, and four curved capture rings. The center silk bridge is connected in the first two poses; the final pose replaces each connection with paired snapped ends. Every part uses vector paths, so no font file or raster reference is needed at runtime. Each component has cropped bounds. [manifest.json](manifest.json) gives its placement in the 1600 × 820 master composition.

For motion, move `break.svg` and `spider-wordmark.svg` as rigid layers. Use `web-taut.svg` before impact, `web-loaded.svg` after the words land, and `web-broken.svg` after the central connection fails. The center support drops from y=480 to y=544 to y=614; its hub drops from y=535 to y=622 to y=735. The center gap opens from 8 to 24 to 80 units. The first two poses retain the same four center connectors. At the snap, reveal `web-frays.svg` and let the left and right sections pivot around their outer ends. The loose ends have slightly different curls and directions, so they can recoil as silk. The spider is independent; its silk tether is drawn into the right web section and shares an exact join coordinate with the short strand on the spider. The contact sheet's final comparison assembles the logo from the six separate exported component files.

The original [concept draft](../logo-concept-draft.png) remains untouched and was used only as a visual reference. To regenerate vector files after editing their source geometry, run `python tools/build_logo.py` from the project root.

The website PNGs are tightly cropped 3120 × 1450 exports of `logo-full.svg`. The outlined version keeps dark print-wear marks; the plain white version uses those marks as transparent cutouts. Both have transparent backgrounds and clean letter counters. Run `node render-png.js` from this folder with Node 22+ and Chrome or Edge installed to regenerate them.
