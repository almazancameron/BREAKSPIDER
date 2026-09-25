# Breakspider motion proof of concept

Open `index.html` in a modern browser. It runs locally with the copied SVG assets in `assets/`; no server or package install is needed. Use **Replay** or press **R** to restart.

The four-second timeline uses the existing pre-load, loaded, and broken web artwork. The two early web copies omit the right-side tether. BREAK and SPIDER move as rigid layers while the web dips, rebounds, and settles under each landing. The spider falls just after SPIDER with its short silk masked, touches the right attachment, then reveals that silk as it backs away and pulls a live path from the corner. The center bridge briefly thins and stretches under the tug, then the broken halves and loose ends recoil before settling into the exact exported final web. The wordmarks react with a small rigid tilt and drop.

For still-frame review, append `?t=1.7` (any time from 0 to 4 seconds) to the page URL.

The timing tracks and asset placement are commented in `index.html`. The animation uses the browser Web Animations API so the prototype works offline without an external GSAP download.

`breakspider-animation.gif` is a four-second, 24 fps, 1280 × 656 looping export of the stage alone. To regenerate it, run `node render-gif.js` from this folder with Node 22+ and Chrome or Edge installed. The renderer has no package dependencies.
