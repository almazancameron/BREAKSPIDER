# Breakspider artifact vectors

This folder holds hand-drawn SVG interpretations of every image in [`../vector inspo`](../vector%20inspo/). The originals remain untouched. Open [dev-gallery.html](dev-gallery.html) to review every SVG on dark and light backgrounds at two sizes. The gallery is development only and has no site navigation link.

The SVGs contain vector shapes only and have transparent backgrounds. The monochrome speech bubble, lotus, and Yevon sigil use `currentColor`; inline those SVGs to inherit CSS `color`. If used through an `<img>` element, a CSS mask or filter is needed to recolor them because external SVG documents do not inherit the parent page's `color`.

`rescue-team-badges.svg` preserves all four badges as one vertical composition because the source image presents them as a set. `rescue-team-badge-basic.svg` is the separate single-badge reference.
