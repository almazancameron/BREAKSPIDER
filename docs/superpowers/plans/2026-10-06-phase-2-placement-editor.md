# Phase 2 Dev-only Clutter Placement Editor Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` if later requested. This tutorial is for manual implementation by the owner; no implementation or delegation is requested now.

**Goal:** Author quiet homepage decoration by dragging it on the real page, then save normal placement records with automatic semantic anchoring.

**Architecture:** A development-only wrapper supplies draft records to chunk 4's context. Native Pointer Events move a preview and choose the nearest eligible anchor on drop. Exported four-space TypeScript data is copied into the existing authored content file; production remains a deterministic renderer.

**Tech Stack:** Existing React context, native Pointer Events/DOM geometry, CSS Modules, existing Vitest for pure geometry. No drag library, editor backend, filesystem endpoint, or new dependency.

**Spec:** Owner explicitly requested this separate tutorial; [clutter authoring workflow](../../CLUTTER_POSITIONING.md), [authored clutter contract](2026-10-06-phase-2-authored-clutter.md), and [reading guide](2026-10-06-phase-2-homepage.md).

**Global constraints:** Four spaces; editor exists only in development and only after explicit Edit clutter activation. No production authoring UI/listeners. Only quiet decorative catalogue items are draggable. Runtime does not choose anchors again.

**Review focus:** Grab offset, nearest edge rather than center, responsive round trip, preserving untouched records, and production absence are covered below.

## Learn first: draft placement is not persistence

Dragging changes an in-memory draft. Export creates text you review and paste into `content/home-clutter.ts`; after that, reload reads the authored data normally. A browser cannot silently write repository source files. An export workflow gives you a concrete saved result without introducing an authenticated server editor or a dev filesystem-writing endpoint.

Distance to an anchor rectangle means distance to its nearest edge (zero when the point is inside it). Center-to-center distance would select a small nearby widget over the large region you actually dropped onto. The editor automatically selects an eligible anchor, then the nearest of its five supported points, and saves center offsets in CSS pixels. Production simply renders the saved choice.

Finish chunk 4. Read the installed server/client guide and `CLUTTER_POSITIONING.md` before edits.

| File | Responsibility |
| --- | --- |
| `lib/home/clutter-authoring.ts` | Pure nearest-anchor, anchor-point, and coordinate conversion functions. |
| `tests/clutter-authoring.test.ts` | Small Vitest tests for that geometry. |
| `components/home/home-clutter-editor.tsx` / `.module.css` | Dev wrapper, toolbar/palette, pointer preview, selection, numeric corrections, export. |
| `app/page.tsx` | Conditional development import/wrapper only. |
| `content/home-clutter.ts` | Destination for reviewed exports, not automatic writes. |

Read/reuse `clutter-types.ts`, `ClutterDraftContext`, and `HomeAuthoredClutter`. No root-layout or Phase 1 changes.

**Consumes:** `HomeAnchorId`, `AnchorPoint`, `PlacementPose`, `AuthoredPlacement`, catalogue, `data-home-anchor`, `data-clutter-placement`, and visible desktop/mobile instances.

**Produces:** `HomeClutterEditor({ children })`, a complete exported authored placement array, and geometry functions below. The random renderer does not depend on this component.

## Task 1: Prove the small geometry rules

- [ ] **Step 1 — FIRST EDIT: Create the geometry test file with rectangle fixtures.**

Define `Rect = { left: number; top: number; width: number; height: number }`, `Point = { x: number; y: number }`, and `MeasuredAnchor = { id: HomeAnchorId; rect: Rect }` in the geometry module as you add its implementation. Browser client coordinates are the shared coordinate space for measurement and pointer positions; scroll does not require page-coordinate conversion.

**Interface only — implement these exports with real bodies:**

```ts
export declare const distanceToRect: (point: Point, rect: Rect) => number;
export declare const findNearestAnchor: (
    point: Point,
    anchors: MeasuredAnchor[],
) => MeasuredAnchor | null;
export declare const anchorPointPosition: (
    rect: Rect,
    anchorPoint: AnchorPoint,
) => Point;
export declare const findNearestAnchorPoint: (
    point: Point,
    rect: Rect,
) => AnchorPoint;
export declare const toAnchorOffset: (
    point: Point,
    rect: Rect,
    anchorPoint: AnchorPoint,
) => Point;
```

These `declare` signatures describe interfaces and provide **no runtime implementation**; write real arrow-function exports with bodies in the module. Tests should cover a point inside a rectangle (zero distance), outside a corner, a large anchor whose edge is nearest despite a distant center, no anchors, stable tie order, and offset round trips for all five points with nonzero viewport origins. Stable ties choose first in the declared anchor list; no random choice.

**Complete implementation — one focused test in `tests/clutter-authoring.test.ts`, not the whole test file:**

```ts
import { expect, test } from "vitest";
import { anchorPointPosition, toAnchorOffset } from "../lib/home/clutter-authoring";

test("bottom-right offsets round-trip with a nonzero viewport origin", () => {
    const rect = { left: 100, top: 200, width: 300, height: 150 };
    const center = { x: 412, y: 342 };
    const offset = toAnchorOffset(center, rect, "bottom-right");
    const anchor = anchorPointPosition(rect, "bottom-right");

    expect(offset).toEqual({ x: 12, y: -8 });
    expect({ x: anchor.x + offset.x, y: anchor.y + offset.y }).toEqual(center);
});
```

Add the other fixture cases from the paragraph above. Run the focused command before implementing the functions; it should fail because the module/exports are not implemented yet, then pass after Step 2.

- [ ] **Step 2: Implement just those geometry functions.**

Compute `dx = Math.max(rect.left - point.x, 0, point.x - (rect.left + rect.width))`, likewise `dy`, then `Math.hypot(dx, dy)`. Choose minimum distance; anchor-point position comes from rectangle corners/center; offset is point minus that position. Keep functions free of DOM/global state.

- [ ] **Step 3: Run `npm run test -- tests/clutter-authoring.test.ts`.**

All fixtures pass. This is meaningful automated logic; pointer feel and DOM geometry still need browser checks. Do not add a simulated browser component suite.

## Task 2: Put the editor around the actual homepage

- [ ] **Step 1: Implement the dev wrapper with an inactive default.**

Initialize draft records from `HOME_AUTHORED_PLACEMENTS` with copied `mobile` objects. Render children inside `ClutterDraftContext.Provider`, plus a compact `Edit clutter` toggle. Outside edit mode, the actual homepage works normally and decorative pointer behavior remains inert. Edit mode gives only visible `[data-clutter-placement]` nodes a selectable outline/hit surface; it must not turn every image into a draggable item.

Provide an asset palette from the curated catalogue, selected record ID, delete, reset draft, numeric x/y/width/rotation/scale/layer controls, visibility, anchor/anchor-point correction, and `Desktop` / `Compact` editing indication based on the actual viewport. Changing a pose on compact edits merges into `mobile`, preserving desktop values. Changing ID/asset/deleting affects the full record; label that behavior clearly.

Reject nonfinite numeric input and preserve the previous value while a field is blank. Clamp width to 8–256px, scale to 0.25–3, rotation to −180–180°, and local layer to 0–9; offsets may be signed. Round saved offsets to one decimal place for readable exports. IDs stay stable after creation. Mark the wrapper `data-home-clutter-editing="true"` only while edit mode is active; chunk 6 uses that flag to suspend random decoration.

The toolbar is itself usable by keyboard. An `Add` button creates an item near the selected eligible anchor, defaulting to Spotlight if none is selected; numeric fields permit placement without dragging. Use no decorative/UI sound mapping for editor controls. A dev-only interface should not change accepted production sound behavior.

- [ ] **Step 2: Load the wrapper only in development.**

In `app/page.tsx`, assemble the existing server-composed homepage as `content`. Wrap the complete homepage, including inspection provider and all anchors, only in this branch:

**Worked fragment — end of the server page, not a complete replacement file:**

```tsx
if (process.env.NODE_ENV === "development") {
    const { HomeClutterEditor } = await import(
        "../components/home/home-clutter-editor"
    );
    return <HomeClutterEditor>{content}</HomeClutterEditor>;
}
return content;
```

The editor imports the chunk 4 catalogue/config and draft context. `HomeAuthoredClutter` imports only that tiny context, not editor code. Production receives the static passed array without mounting the editor. Confirm absence in a production build instead of assuming that hiding controls is sufficient.

## Task 3: Implement drag and anchor selection

- [ ] **Step 1: Start a drag from a placement or palette item.**

Use native Pointer Events. On pointerdown, record the item's current center and pointer-to-center offset, selected ID, and original draft; capture the pointer. Render a fixed, pointer-inert preview in a dev overlay. Prevent the original browser image drag. For palette additions use a stable new ID and zero grab offset. Set `touch-action: none` only on editor drag handles, never the page.

Keep the source draft unchanged while moving so its node cannot disappear as the preview crosses anchors. The preview center is `pointer client position - grab offset`; this prevents the item jumping when grabbed off-center. Pointer cancel or Escape discards the preview/draft addition. Disable page auto-scroll in this first version; scroll to a region before dragging, and measure eligible anchors afresh during movement/drop.

- [ ] **Step 2: Highlight the nearest eligible anchor during movement and save on drop.**

Read only the declared visible `[data-home-anchor]` wrappers. Build rectangles with `getBoundingClientRect()`. Choose nearest rectangle to the preview center, and nearest supported point within it. Show the selected anchor ID visibly. Exclude toolbar, arbitrary DOM nodes, dialogs, and the decorative instances themselves.

Use the fixed tie order Spotlight, About, Projects, Current Project, Sketchbook, Familiar, Changelog, Pile, then left rail, right rail, lower field. A drop inside both a meaningful section and a broad background region therefore prefers the section. Skip zero-sized or CSS-hidden wrappers; do not depend on accidental DOM query order for ties.

At drop, recompute using current rectangles, then save `anchor`, `anchorPoint`, and `x/y = toAnchorOffset(previewCenter, rect, anchorPoint)`. Preserve asset/width/scale/rotation/layer/exclusion settings. If no eligible anchor exists, cancel. Update the matching placement by ID; do not replace the entire array with only the selected item. Release pointer capture and remove temporary listeners in all completion/cancellation/unmount paths.

- [ ] **Step 3: Implement manual correction and compact overrides.**

When changing anchor or anchor point manually, convert the current visual center into offsets for the new selection, preserving screen position. The transform-free anchor wrappers established in chunk 4 make pixel offsets legible. On compact drops, patch `mobile` with the new pose instead of rewriting desktop. Ensure the renderer's separate-anchor instances still render only one visible object.

Responsive editing should relocate/reduce/hide decoration while preserving content order; it must not change section CSS. The authoring system is not a page builder.

## Task 4: Export reviewed records

- [ ] **Step 1: Produce complete four-space export text.**

Use `JSON.stringify(draft, null, 4)` inside TypeScript source text headed by `import type { AuthoredPlacement } from "../lib/home/clutter-types";` and `export const HOME_AUTHORED_PLACEMENTS = ... satisfies AuthoredPlacement[];`. Export every record including unchanged entries and compact overrides. Keep the existing asset catalogue in `content/home-clutter.ts` when replacing its placement declaration; the generated text is a replacement for that declaration, not the whole file/catalogue.

Offer a selectable textarea and explicit Copy button. Clipboard access can fail, so the textarea is the fallback. State `Draft not saved to repository` until the owner pastes the export; don't claim automatic saving. No localStorage seed/draft/persistence is necessary.

- [ ] **Step 2: Paste the exported declaration into `content/home-clutter.ts`, reload, and turn off Edit clutter.**

Saved items should appear identically with the dev draft reset. Inspect desktop and compact viewport after reload. An export from compact mode must retain all desktop poses and untouched items.

## Browser checkpoint before random clutter

- [ ] Grab one decoration at its edge: it follows without jumping. Drop beside a large section: nearest-edge anchoring selects correctly. Its saved ID/point/offsets are understandable.
- [ ] Move, resize, rotate, hide, delete, add, cancel with Escape/pointer cancellation, and manually correct an anchor. No lost unrelated entries or orphan previews/listeners.
- [ ] At 390px, move an item to a different anchor and save compact overrides. Return to 1440: desktop placement is unchanged. Export/paste/reload reproduces both.
- [ ] Keyboard-only authoring works via selection/Add/numeric fields and copy fallback. Production homepage controls remain usable when editing is off.
- [ ] Run the focused geometry tests and lint/typecheck. Then `npm run build` and `npm run start`; inspect `/` and confirm no Edit clutter control, palette, overlay, or authoring listeners. The app renders saved positions without the editor.

**Learning checkpoint:** Explain which operation changes a draft, which saves source data, and why nearest-anchor selection occurs at authoring time only.

**Finish:** Commit the editor and reviewed placements separately if useful. The next tutorial adds optional random decoration using the saved composition as protected input.

## Implementation record — October 9, 2026

Part 5 is complete and accepted (2026-10-09). The owner verified the development-only editor locally and confirmed that live verification is not required. The [October 9 handoff](2026-10-09-phase-2-part-5-handoff.md) supplied the current five-mode schema, nine-anchor tie order, and edge-offset contract. The [implementation notes](../../design/home-clutter-2026-10-09/part-5-implementation-notes.md) record the resulting behavior, editing limits, browser checks, focused tests, production absence, and process cleanup. These supersede historical Desktop/Compact, rail-anchor, and 256px-cap assumptions in this tutorial. No source placements were changed during implementation, no commit/deployment was performed by the agent, and Part 6 was not started.
