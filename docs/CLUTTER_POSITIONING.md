# Authored clutter positioning

The preferred curated homepage is the source of truth. Procedural decoration was removed in the October 10 reassessment. [Current implementation, asset audit, editing guide, screenshots, and verification](design/home-clutter-reassessment-2026-10-10/implementation-notes.md).

Each decorative placement in `content/home-clutter.ts` names a static semantic anchor: `spotlight`, `about`, `projects`, `current`, `sketchbook`, `familiar`, `changelog`, `map`, or `pile`. It saves a corner/center and pixel offsets locating the image center relative to the anchor padding box. Runtime uses ordinary CSS; it does not measure content, choose another anchor, or admit/reject decorations.

```ts
{
    id: "my-keepsake",
    assetId: "my-image-filename",
    anchor: "projects",
    anchorPoint: "top-right",
    x: -24,
    y: -16,
    width: 80,
    rotation: -8,
    scale: 1,
    zIndex: 3,
    hidden: false,
    flip: false,
    edgeOffset: null,
    mobile: { hidden: true },
}
```

Base pose is desktop. Independent `wide`, `narrow`, `tablet`, and `mobile` partial overrides can change placement, anchor, size, layer, or visibility. They inherit directly from the base rather than from one another. Ranges are >110rem, 90–110rem, 76.25–90rem, 47.5–76.25rem, and <=47.5rem respectively, with the lower boundary excluded for each non-mobile range. `edgeOffset` replaces X with gutter minus offset; set it to `null` to use ordinary X again.

In development, click **Edit clutter** to select/drag decorations, correct their anchors, adjust numeric properties, add or swap an asset, and export complete four-space records. The editor chooses a nearest eligible anchor on drop; it never recalculates that choice in production. Reanchoring preserves the visual center. Dragging, reanchoring, or explicitly editing X clears edge positioning in the edited mode.

Folder assets in `public/media/home/random-clutter/` form a manual palette. Run `npm run clutter:generate` after swapping images, then choose them in the editor. Adding a file alone does not place it. Export all records and replace only `HOME_AUTHORED_PLACEMENTS` to save durably. Done retains an in-memory preview; reload discards unsaved changes. Production resolves saved folder IDs but receives only placed assets. [Palette formats, naming, and generation](../public/media/home/random-clutter/README.md).

Review responsive widths and actual screenshots after authoring. Keep meaningful text, controls, media, and focus clear; local layers and natural panel/file occlusion support selective overlap. Decoration is pointer-inert and does not enter the tab order. The editor remains development-only and inactive until enabled. There is no runtime collision engine or general page builder.