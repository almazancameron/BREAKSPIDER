# Drag-and-Drop Clutter Positioning

Breakspider uses a small visual authoring system for decorative "clutter" assets so their placement does not need to be hand-coded in page components.

## Core behavior

- Clutter items are dragged directly into place on the rendered page.
- On drop, the editor automatically chooses the nearest eligible **static anchor element** on the page.
- The chosen anchor is saved with the clutter item; anchors are **not** recomputed at runtime.
- Position is stored as an offset from that anchor, ideally from the nearest anchor point/edge rather than raw viewport coordinates.
- The rendered clutter should therefore move naturally when its anchor moves during responsive layout changes.

## Authoring workflow

1. Drag an asset into place.
2. Automatically detect and highlight the nearest eligible anchor.
3. Save the anchor + relative offset + visual properties.
4. Resize/test the page responsively.
5. If needed, adjust the item at a breakpoint and save a breakpoint-specific offset or visibility override.

Manual anchor selection should exist only as a fallback if automatic selection chooses poorly.

## Data model

Clutter should be stored as normal repo-authored data rather than embedded layout code, e.g.:

```ts
{
    id: "hero-decoration",
        asset: "/artifacts/example.png",
            anchor: "hero",
                anchorPoint: "bottom-right",
                    x: 24,
                        y: -16,
                            rotation: -8,
                                scale: 0.9,
                                    zIndex: 3,
}
```

Optional responsive overrides can adjust position, scale, or visibility.

## Implementation constraints

- Only intentional page-level/static elements should be eligible anchors (sections, cards, headings, images, widgets, etc.), not every DOM node.
- Prefer distance to an element's bounding rectangle/nearest edge over center-to-center distance.
- Keep the renderer deterministic and independent from the editor.
- The editor is a dev-only authoring convenience; if it disappears, the saved clutter data should still render normally.
- Keep this narrow: it is a clutter placement tool, not a general page builder.
