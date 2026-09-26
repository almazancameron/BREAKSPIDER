# Breakspider artifact vectors

This folder holds hand-drawn SVG interpretations of every image in [`../vector inspo`](../vector%20inspo/). The originals remain untouched. Open [dev-gallery.html](dev-gallery.html) to review every SVG on dark and light backgrounds at two sizes. The gallery is development only and has no site navigation link.

The SVGs contain vector shapes only and have transparent backgrounds. The monochrome speech bubble, lotus, and Yevon sigil use `currentColor`; inline those SVGs to inherit CSS `color`. If used through an `<img>` element, a CSS mask or filter is needed to recolor them because external SVG documents do not inherit the parent page's `color`.

The `nav-sticker-*.svg` files are original blank sticker backplates for persistent navigation. Keep link text as real HTML above the SVG so labels remain accessible, searchable, and easy to change. The gallery previews them with sample labels; no words are baked into the artwork. Ticket, fold, melt, and shard use thick outer borders; blob, thorn, comet, and moth use inset accents.

`rescue-team-badges.svg` preserves all four badges as one vertical composition because the source image presents them as a set. `rescue-team-badge-basic.svg` is the separate single-badge reference.
