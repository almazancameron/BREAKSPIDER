# Authored clutter positioning

**Phase 2 complete and owner-accepted (October 10, 2026).** The preferred curated homepage is the source of truth; procedural decoration is retired. [Accepted implementation, asset audit, editing guide, screenshots, and verification](design/home-clutter-reassessment-2026-10-10/implementation-notes.md).

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

Folder assets in `public/media/home/random-clutter/` form a manual palette. Run `npm run clutter:generate` after swapping images, then choose them in the editor. Adding a file alone does not place it. **Done saves all placements and responsive overrides directly to `content/home-clutter.ts`, then closes the editor.** Copy export remains an optional backup. Reload before saving discards the draft. A failed save keeps the editor open; an external file change requires copying the draft and reloading before saving. Production resolves saved folder IDs but receives only placed assets. [Palette formats, naming, and generation](../public/media/home/random-clutter/README.md). [Development save implementation and verification](design/home-clutter-reassessment-2026-10-10/editor-save-implementation-notes.md).

Review responsive widths and actual screenshots after authoring. Keep meaningful text, controls, media, and focus clear; local layers and natural panel/file occlusion support selective overlap. Decoration is pointer-inert and does not enter the tab order. The editor remains development-only and inactive until enabled. There is no runtime collision engine or general page builder.

## Phase 3: shared editor across rooms

The development editor is now available on all 13 current content pages, including each Familiar detail and the long Sketchbook entry. Home keeps its accepted records, palette IDs and `content/home-clutter.ts` save target. About saves to `content/about-clutter.ts`; other rooms have independent files under `content/clutter/`. New-room arrays are empty while the owner prepares clutter images; no new artwork has been selected or placed.

The editor displays the current page and file, and Done/Copy export apply to that page only. Leaving a route or reloading discards unsaved drafts. About exposes portrait, contact, practice, work trail, satellite, identity and canvas anchors; unfinished rooms begin with canvas and gain more anchors with their future compositions. Normal page structure remains page-owned JSX/CSS.

The server-owned registry validates page-specific anchors and selects fixed file/export targets. The browser sends a registered page ID, not a path. Production authoring requests return 404 on every page and no editor/full-palette behavior ships. [Shared module ownership and future page registration](../lib/clutter/README.md). [Phase 3 content replacements](design/phase-3-about-contact/placeholder-content.md).
