# Phase 2 Authored Homepage Clutter Implementation Plan

**Status: Complete and accepted (2026-10-09).** Implemented from the approved revision-02 comp with the final full-sword adjustment. The owner verified everything locally and on the live deployment. [Implementation notes, current contracts, and browser captures](../../design/home-clutter-2026-10-09/revision-02/implementation-notes.md). The dev-only editor and randomized layer remain separate later chunks. The original worked examples below are teaching material, not the current asset roster.

> **For agentic workers:** Use `superpowers:executing-plans` if later requested. The owner implements this tutorial manually; no implementation or delegation is requested now.

**Goal:** Add curated, fixed decorative clusters with easy-to-edit semantic placements, preserving Prototype 04's object relationships.

**Approved art direction (October 9, 2026), revision 02:** [Visual review, placement plan, and all-44 asset coverage](../../design/home-clutter-2026-10-09/revision-02/README.md). The implemented composition uses 18 supplied assets plus one existing ONFF process image, with Noise and most small pickups reserved for the later randomized layer. It supersedes the earlier dense comp. The dev-only editor is the next chunk for tuning saved placements.

**Architecture:** Structural regions remain page CSS. A small asset catalogue and placement array describe quiet decoration attached to named, positioned wrappers. The renderer consumes those records deterministically; a narrow optional context will allow the next chunk's dev editor to preview drafts.

**Tech Stack:** Existing React/TypeScript/CSS Modules and image primitive. No layout engine or packages.

**Spec:** [Reading guide](2026-10-06-phase-2-homepage.md), [clutter positioning](../../CLUTTER_POSITIONING.md), [design inventory](../../breakspider_prototype_04_design_inventory.md#accumulation-field-and-object-placement), and [asset curation](../../breakspider_asset_curation.md).

**Global constraints:** Four spaces; authored composition dominates; decorations do not cover essential content. Full `assets/` library is eligible; prototype asset roster/counts are provisional. Keep reserved Lightning Rage/player pins out of filler.

**Review focus:** Anchor-relative movement, breakpoint merge behavior, real asset dimensions, reduced motion, and safe focus/text regions have explicit checks below.

## Learn first: anchors preserve relationships

An **anchor** is an intentional static region such as Spotlight, About, or the archive pile. A placement says “this object belongs near Spotlight's top-left corner,” then supplies a small offset. When Spotlight moves in responsive layout, its decoration moves with it. This is different from a global `top: 939px` coordinate.

The DOM wrapper for each anchor supplies `position: relative`. Quiet decorative children are positioned inside it. Decorative data does not choose where the section itself lives. A portrait link, screenshot, found Map, Familiar cycle button, and crystal are functional content; keep them in their owning components rather than turning them into draggable decoration.

Read the installed CSS/image/client-boundary docs before editing. Finish chunks 1–3 and review desktop/mobile screenshots before choosing assets.

| File | Responsibility |
| --- | --- |
| `lib/home/clutter-types.ts` | Small shared asset/placement types for renderer, editor, and random layer. |
| `content/home-clutter.ts` | Curated asset catalogue and fixed placement records. |
| `components/home/home-clutter-state.tsx` | Optional draft context; no editor or persistence. |
| `components/home/home-authored-clutter.tsx` / `.module.css` | Render placements for one anchor; desktop/compact CSS variables. |
| `app/page.tsx` / `app/page.module.css` | Mark intentional anchors and protected content; attach renderer instances. |
| `public/media/home/clutter/` | Only selected deployed assets, not the full archive. |

**Consumes:** existing semantic sections and fixed interactive objects.

**Produces:** `HOME_CLUTTER_ASSETS`, `HOME_AUTHORED_PLACEMENTS`, `ClutterDraftContext`, and `HomeAuthoredClutter({ anchor, assets, placements })`. The next chunk imports the same schema; randomization measures these rendered objects without altering them.

## Task 1: Define a narrow placement vocabulary

- [x] **Step 1 — FIRST EDIT: Create `lib/home/clutter-types.ts`.**

**Interface only — complete type definitions; no renderer/editor implementation:**

```ts
import type { ImageMedia } from "../content/models";

export type HomeAnchorId =
    | "spotlight" | "about" | "projects" | "current"
    | "sketchbook" | "familiar" | "changelog" | "pile"
    | "left-rail" | "right-rail" | "lower-field";

export type AnchorPoint =
    | "top-left" | "top-right" | "bottom-left"
    | "bottom-right" | "center";

export type ClutterAsset = {
    id: string;
    media: ImageMedia;
    pixelArt: boolean;
    reducedMotionMedia?: ImageMedia;
};

export type PlacementPose = {
    anchor: HomeAnchorId;
    anchorPoint: AnchorPoint;
    x: number;
    y: number;
    width: number;
    rotation: number;
    scale: number;
    zIndex: number;
    hidden: boolean;
};

export type AuthoredPlacement = PlacementPose & {
    id: string;
    assetId: string;
    exclusionPadding: number;
    mobile?: Partial<PlacementPose>;
};
```

Units: offsets/width/exclusion padding are CSS pixels; rotation is degrees; scale is unitless. `x/y` describe the object's **center** relative to the chosen anchor point. Base pose covers widths above `47.5rem`; `mobile` overrides apply at or below it. This one compact override matches the current breakpoint vocabulary; add another only if intermediate-width browser checks demonstrate a need.

Anchor IDs are explicit, not arbitrary selectors. Fixed decorations start behind primary controls in local layers 1–3; deliberately attached objects may be higher when safe. `exclusionPadding` protects a little room around them from future random clutter.

- [x] **Step 2: Curate an initial authored roster in `content/home-clutter.ts`.**

Inspect candidates at their intended sizes alongside the captures. Select a small set of silhouette/color variants for uneven rail banks, an interior bridge below Spotlight, an archive pocket behind files, and one or two attached keepsakes. Preserve dark gaps and asymmetry. Increase authored density deliberately if the composition is too sparse; do not expect random objects to supply the canonical clutter.

Catalogue entries record one deployed path and actual dimensions per asset. Use creator-made material for identity, selected external references as texture, and the inventory's provenance guidance when selecting public-use material. Prototype 04's 79 Noise instances demonstrate density/cluster grammar, not a production quota. Do not copy every sprite or choose only the files already in `public/`.

Copy selected sources into `public/media/home/clutter/` with legible names; leave source files intact. For moving GIFs either choose a static alternative or provide a still from the same source in `reducedMotionMedia`. Do not apply pixel rendering to vectors/portraits/screenshots.

Include one real ONFF process keepsake using `assets/work-screenshots/onff-godot-panel.PNG`. The approved art-direction revision moves it beside Working on, tucked behind Sketchbook rather than the archive. Put its deployed copy in the catalogue with `pixelArt: false`; attach it to `sketchbook` on desktop and `current` on tablet. This quiet keepsake does not become another inspection file.

**Worked fragment — placement shape with a symbolic chosen catalogue ID; adjust these tuning values:**

```ts
{
    id: "spotlight-upper-keepsake",
    assetId: "chosen-badge",
    anchor: "spotlight",
    anchorPoint: "top-left",
    x: -12,
    y: -8,
    width: 32,
    rotation: -8,
    scale: 1,
    zIndex: 3,
    hidden: false,
    exclusionPadding: 12,
    mobile: { x: 2, y: -4, width: 20 },
}
```

This is not a complete roster and `chosen-badge` is not an existing asset ID. Supply real catalogue IDs. Keep the saved array flat and readable; no per-page builder schema.

**Learning checkpoint:** Explain why a Familiar button remains structural even when it looks like a sprite, and why an offset refers to an anchor point rather than the page origin.

## Task 2: Build the deterministic renderer

- [x] **Step 1: Define the optional draft context and renderer.**

`home-clutter-state.tsx` is a Client Component module exporting `ClutterDraftContext = createContext<AuthoredPlacement[] | null>(null)`. The next tutorial provides its value in development; production consumers use the passed placements. Context carries only records, not editor functions or DOM refs.

`HomeAuthoredClutter` is a small Client Component so it can read this context. It uses `useContext(ClutterDraftContext) ?? placements` and renders a decorative layer for the requested anchor. No effects, measurements, randomness, storage, or browser access are necessary. Its server and first browser markup agree.

For each record, merge `mobile` over the base pose for compact values. Compute anchor-point percentages (`top-left` is 0/0, `bottom-right` 100/100, `center` 50/50). Emit base/compact CSS custom properties; CSS media queries choose which pose applies, not a render-time `window.innerWidth` test. If an override moves the item to another anchor, emit an instance at each involved anchor and use CSS visibility to show only the appropriate one. This prevents a mobile hidden/moved item flashing at the wrong spot during hydration.

Use `data-clutter-placement` containing the record ID and `data-clutter-viewport="desktop"` or `"mobile"` where separate anchor instances are necessary. The editor only selects visible instances. Validate catalogue lookup; a missing asset is omitted with a useful development diagnostic, not a broken image over the page.

- [x] **Step 2: Implement center-based placement and native asset treatment.**

Position the outer object center using anchor percentage plus offset, with `transform: translate(-50%, -50%)`. Put rotation/scale on its inner image wrapper, using center transform origin. Set width from pose and preserve the image aspect ratio. This lets editor math use the visible object's center consistently.

**Worked fragment — base positioning rule only:**

```css
.object {
    position: absolute;
    left: calc(var(--point-x) + var(--offset-x));
    top: calc(var(--point-y) + var(--offset-y));
    width: var(--object-width);
    z-index: var(--object-layer);
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.visual {
    transform: rotate(var(--object-rotation)) scale(var(--object-scale));
    transform-origin: center;
}
```

Type the custom-property style object using `CSSProperties & Record<\`--${string}\`, string | number>`. Set pixel/degree units explicitly. Define compact property substitutions in `@media (max-width: 47.5rem)` and a pixel-art class. Decorative images have empty alt text, the layer is `aria-hidden`, and no item enters the tab order. Reduced-motion CSS chooses the still when supplied.

Do not use a renderer position for an interactive object; its owning component supplies its meaningful controls and focus treatment.

## Task 3: Attach decoration and mark safe regions

- [x] **Step 1: Mark eligible wrappers with `data-home-anchor`.**

Set `position: relative` on each named structural region. Add left/right rail and lower-field wrappers as absolute, noninteractive named regions owned by the canvas. Their dimensions belong in `app/page.module.css`; use content-relative heights/insets, not the prototype's fixed canvas height. Do not transform eligible anchor wrappers: editor offsets assume unscaled CSS pixels.

Attach `HomeAuthoredClutter` for the applicable IDs. Render decorations after structural content inside wrappers, but select explicit local z-index values. Keep an isolated canvas stacking context beneath root-level modal/splash presentation. Decorative layers can clip at their outer rail edge; clipping must not cut interactive content or focus outlines.

- [x] **Step 2: Mark `data-home-exclusion` on protected content.**

Protect Spotlight, About text/portrait link, Projects evidence/links, roaming Familiar link, current work, Sketchbook, Familiar, changelog, found Map, pile file strip, replay, and crystal. Use section-sized rectangles initially; this conservative rule is easier to reason about than text-by-text measurement. Pure decorative rail wrappers are not exclusions. Each rendered authored decoration is also an exclusion with its recorded padding, measured later in chunk 6.

These markers describe safety; they do not change structural layout. Random clutter will use gaps/rails around them. Keep the archive-background cluster behind legible file objects intentionally; random objects cannot claim those occupied spaces.

- [x] **Step 3: Tune the authored composition with randomness absent.**

At 1440/1920, vary the perimeter banks and interior cluster silhouettes, sizes, layering, and gaps. Include some meaningful edge cropping, not complete disappearance. On compact screens hide dense interior banks, reduce edge groups, and move retained identity-bearing scraps next to their actual anchors. Check 768/1024 so desktop placement does not create collisions before the compact breakpoint.

## Browser checkpoint before the editor

- [x] Compare full-page captures at all established widths. Authored clutter alone carries the approved density/relationships. Temporarily hide decoration: the primary composition still has character and hierarchy.
- [x] Resize continuously; decorations travel with anchors. Expand changelog and alter draft copy length; lower regions/decoration move together.
- [x] Tab through Home and inspect artifacts. No decorative item receives focus or covers controls/outlines. Header/logo/splash/profile remain unobstructed.
- [x] Check image loading and reduced motion. No layout shift from unknown dimensions; retained moving assets have static alternatives where needed.
- [x] Change one placement record and reload. Only that authored relationship changes. A mobile override does not overwrite its desktop pose. Missing catalogue records fail safely.
- [x] Run lint/typecheck. No automated DOM/collision suite is needed for authored CSS; browser evidence decides visual acceptance.

**Learning checkpoint:** Demonstrate the distinction between page CSS deciding a section's placement, a saved decoration pose, and a measured random exclusion.

**Finish:** Commit fixed placements before adding the editor. The renderer already works without an editor and remains the production source of truth.
