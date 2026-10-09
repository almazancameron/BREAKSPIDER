# Phase 2 Homepage Artifact Interactions Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` only if later requested. Manual implementation by the owner is intended; no implementation or delegation is requested now.

**Goal:** Restore Prototype 04's inspectable files, found Map, focus/shuffle behavior, mobile swipe strip, and reversible crystal reaction.

**Status:** Complete and accepted (2026-10-07). The owner verified Part 3 locally and in live deployment, including the file pile and crystal glow refinements, and confirmed completion. Parts 1-2 remain accepted; Parts 4-6 remain planned.

**Task 1 implementation record:** Added the three authored records in `content/home-artifacts.ts`, the shallow-copy `getHomeArtifacts()` reader, and the static `HomeMapGlyph` component. ONFF uses the existing priority-builder capture; Viscap remains media-pending; Map retains the prototype routes and colors with `PROJECTS` replacing `WORK`. The glyph is decorative and nonfocusable, so its eventual surrounding control must supply the Map label.

**Ruling:** Preserve the owner's existing `HomeArtifact` type rather than replacing it with the earlier planned interface. The records use `kind: "image"` for ONFF, `kind: "vector"` for Map, and `kind: "other"` for pending Viscap. All three populate `href` and `linkLabel`, although those remain optional in the owner's type. Later renderers must handle optional destinations and use the stable `found-map` / `viscap-system` IDs to distinguish their vector and pending treatments if necessary. No homepage controls or inspection behavior were added in Task 1. Verification: TypeScript checking, focused ESLint, and all four existing content repository tests passed. The glyph was rendered and inspected in a standalone Chrome preview; the browser tree was stopped afterward. A fresh read-only review found no concrete correctness issues. No dev server was started.

**Architecture:** One homepage-scoped client provider owns the selected artifact and renders the existing native `Dialog`. Separate triggers in Spotlight, Map, and pile share that state. Page structure remains server composition; temporary interaction state stays local.

**Tech Stack:** Existing React context/state, native dialog, CSS Modules, `ContentImage`, `useUISound`, and `Link`. No modal/carousel library.

**Spec:** [Reading guide](2026-10-06-phase-2-homepage.md), [interaction inventory](../../breakspider_prototype_04_design_inventory.md#interaction-inventory), and [mobile inspection capture](../../../screenshots/prototype-04-mobile-inspection.png).

**Global constraints:** Four spaces; preserve accepted Phase 1 behavior. Optional inspection never gates Projects/About/catalogue/Map navigation. No collectible awards or storage writes in this chunk.

**Review focus:** Keyboard focus return, complete inspectable media, pending Viscap, mobile scrolling, and repeated reversible actions are checked below.

## Tasks 2-4 implementation record - 2026-10-07

`HomeInspection` owns one selected record and one existing native `Dialog`; its synchronous selection ref prevents duplicate events from playing repeated clicks. `InspectArtifactButton` validates IDs through that provider and names its dialog behavior. `HomeArtifactVisual` keeps Map, complete ONFF media, and pending Viscap consistent between inspector and pile. Optional destinations render only when both href and link label exist. The inspector centers locally, scrolls within the shared viewport bounds, and keeps its close bar sticky. Shared Dialog, visitor profile, intro, and audio infrastructure remain unchanged.

The server homepage reads artifacts alongside its existing content and passes server-authored children through the client provider. Spotlight's capture caption now inspects ONFF; its professional destination links remain direct. Found Map, the authored-order focus/shuffle pile, and Replay occupy subsequent flow rows. The accepted primary and activity positions, owner CSS offsets, and flexible lower activity row remain intact. Familiar does not move when changelog expands.

The supplied 32x32, 11-frame Life Crystal GIF was copied unchanged to `public/media/home/crystal.gif`; its first frame was exported to `crystal-still.png`. Native `picture` selects that still under reduced motion. The >=44px button remains present in both poses, changes its pressed state and accessible label, and requests only the accepted UI click. No collectible awards, persistence, or new dependencies were added.

**Rulings:** Keep the owner's content schema and optional destination fields; use IDs for the Map and pending treatments. Keep this work in the shared checkout and preserve the owner's uncommitted CSS changes. Use the approved browser-first verification strategy and existing regression suite rather than broad component tests or tests mirroring authored data. Execute only Part 3; decoration/editor/randomization remain later chunks. No commit or deployment was requested.

Production browser checks covered 320, 390, 720 (reflow proxy), 760, 768, 1024, 1220, 1221, 1440, 1600, and 1920px with no horizontal page overflow, broken images, console errors, or Familiar movement on changelog expansion. Pointer, Enter, Space, Escape, backdrop, close button, native modal focus, focus restoration, all three records, shuffle, crystal touch/restore, reduced-motion still selection, visitor profile, and Map destination navigation passed. Mobile focus scrolls a file into view within its strip, and dialogs fit 320px. Enabled inspection open/close, shuffle, and crystal actions each produced exactly one audio start; muted actions produced none. Native browser zoom and physical-device touch remain useful owner checks.

Lint, production build/type checking, and all 24 existing tests passed. A fresh read-only review reported no important findings. Temporary browser captures remain outside the repository. Task 1's earlier no-server record above describes that earlier pass; all servers and browser processes started for this pass were stopped before handoff.

Owner-requested visual refinements remove the file pile's dashed divider, reduce its desktop top margin from 2.5rem to 1rem, remove its 1.5rem top padding, and rename its label to `MORE STUFF`. Shuffle now includes the prototype's arrow, smaller mono text, and lime hover/focus fill while retaining a 44px target. The crystal now toggles the prototype's pink 8px glow, preserving brightness and orientation; reduced motion keeps the still and removes the filter transition. The owner's newly supplied Viscap screenshot is preserved, with both content references corrected to its actual uppercase `.PNG` extension after browser checks exposed 404s from lowercase paths.

## Learn first: one dialog, several entry points

An artifact record describes the file; a trigger requests inspection; the dialog shows the selected record. Sharing this small behavior prevents Spotlight, Map, and pile from developing different close/focus rules. Context is useful here because those triggers sit in different server-authored regions. It is scoped to Home, not another global application provider.

The production `Dialog` already uses `showModal()`. That makes the surrounding document inert and provides native keyboard confinement. It also has Escape/backdrop callbacks. Reuse it and verify browser focus return. Do not copy the prototype's overlay divs or document Escape listener. Read the installed server/client guide before editing.

Complete chunks 1–2. Read `components/ui/dialog.tsx`, `components/site/visitor-profile.tsx`, and the prototype interaction markup first.

| File | Responsibility |
| --- | --- |
| `lib/content/models.ts` | Add `HomeArtifact` type. |
| `content/home-artifacts.ts` | Author ONFF, Viscap, and Map artifact records. |
| `lib/content/repository.ts` | Add `getHomeArtifacts(): Promise<HomeArtifact[]>`. |
| `components/home/home-inspection.tsx` / `.module.css` | Client provider, `InspectArtifactButton`, single readable dialog. |
| `components/home/home-artifact-pile.tsx` / `.module.css` | File buttons, focused file state, shuffle, compact swipe strip. |
| `components/home/home-map-glyph.tsx` | Page-specific prototype route glyph, used by trigger/pile/dialog. |
| `components/home/home-crystal.tsx` / `.module.css` | Reversible reaction with local state. |
| `public/media/home/crystal.gif` | Curated source copy for the reaction. |
| `app/page.tsx` / `app/page.module.css` | Wire homepage provider and found-object sections in order. |

**Consumes:** existing project media, `Dialog({ open, onClose, labelledBy, children, className })`, `useUISound()`.

**Produces:** `HomeInspection({ artifacts, children })`, `InspectArtifactButton({ artifactId, children, className? })`, `HomeArtifactPile({ artifacts })`, `HomeMapGlyph()`, `HomeCrystal()`.

## Task 1: Describe real objects before making controls

- [x] **Step 1 — FIRST EDIT: Add `HomeArtifact` and author its three records.**

**Interface only — complete type, no runtime renderer:**

```ts
export type HomeArtifact = {
    id: string;
    label: string;
    title: string;
    description: string;
    media: ImageMedia | null;
    kind: "image" | "vector" | "other";
    href?: string;
    linkLabel?: string;
};
```

Use `ONFF / BUILD 01` with the existing priority-builder capture, `kind: "image"`, factual battle-plan description, and canonical ONFF href. Use `VISCAP / SYSTEM 02`, `kind: "other"`, `media: null`, clear media-pending description and `/projects/viscap-ai`. Use `FOUND / MAP 03`, `kind: "vector"`, `media: null`, and `/map`; its inline SVG comes from `HomeMapGlyph`. The map is a found navigation object, not a promise of an unlock. These are homepage artifact records, not new project entities or collectibles.

Append `getHomeArtifacts` in the repository using the same shallow-array-copy pattern as the current reads. Keep paths in content records, not repeated among controls.

- [x] **Step 2: Translate the small prototype `MapGlyph` into `HomeMapGlyph`.**

Keep its 170×130 viewBox, lime border, three colored nodes and route lines. Update visible `WORK` to `PROJECTS` if room permits. Use decorative `aria-hidden="true"` when adjacent control text supplies the meaning; the text must name the Map. Do not build the full site Map or introduce a diagram engine.

## Task 2: Wire a homepage-scoped inspector

- [x] **Step 1: Implement `HomeInspection` and `InspectArtifactButton`.**

Selected state is `HomeArtifact["id"] | null`. Look up the current artifact in the passed array. The context exposes only `inspect(id)`; throw a helpful development error if a trigger is rendered outside its provider. Opening validates the record, requests one `uiClick`, and selects it. Closing checks whether something is open, requests one `uiClick`, and sets selection to null. Use the same close handler for button, Escape, backdrop, and destination navigation. Ignore duplicate close/open requests.

The provider renders children plus one existing `Dialog`. Use a unique `home-inspection-title` heading ID and a close button with `autoFocus`. Show file label, h2, description, complete media or Map/pending visual, and the record's destination link. Set media to `object-fit: contain`, never the preview crop. Permit body scrolling inside a viewport-bounded dialog; close controls must remain reachable on 320px/zoomed screens.

**Worked fragment — dialog wiring only, within the provider's return:**

```tsx
<Dialog
    open={selectedArtifact !== null}
    onClose={closeInspection}
    labelledBy="home-inspection-title"
    className={styles.inspection}
>
    <button type="button" autoFocus onClick={closeInspection}>
        Close file
    </button>
    {selectedArtifact && (
        <>
            <h2 id="home-inspection-title">{selectedArtifact.title}</h2>
            <p>{selectedArtifact.description}</p>
        </>
    )}
</Dialog>
```

This fragment omits media, destination, context, and handlers; implement those as described. The native dialog stays mounted. Confirm focus restoration to its originating button before adding custom focus code; do not modify the shared primitive unless a demonstrated defect requires it.

- [x] **Step 2: Wrap only the homepage content and replace Spotlight's temporary media link.**

Fetch artifacts alongside existing page reads, then wrap the canvas with `HomeInspection`. Server-authored children can be passed through a client provider; this does not turn the imported content repository into client code. Spotlight uses `InspectArtifactButton` with `artifactId="onff-build"`. Its main Projects/About links stay ordinary direct links.

Append found Map after changelog: an `InspectArtifactButton` containing `HomeMapGlyph` and `found: MAP.EXE / Inspect`. A `/map` link remains in the inspector and existing footer. Keep visitor profile in the accepted header, rather than adding a second profile instance with duplicate dialog IDs.

## Task 3: Make archive focus usable on desktop and mobile

- [x] **Step 1: Implement the file pile after found Map.**

Render `Stuff you can inspect`, brief practical introduction, explicit `Shuffle focus` button, and the three artifact buttons. Each button has its file label, preview/pending/Map visual, and title. Keep stable artifact IDs as React keys. No button contains a nested link/button.

Use `focusedId` state initialized to the first record (or null). On pointer enter and keyboard focus, set it to that file. Shuffle cycles through the records in authored order, with a functional update; this reproduces the prototype's explicit focus change without unnecessarily randomizing content. Empty list means no shuffle; one record disables it. Shuffle requests `uiClick` once; hover/focus remain silent. Each file activation invokes the provider's inspect function once, not a second sound handler.

- [x] **Step 2: Add the focus and mobile presentations.**

On desktop, vary file angle/vertical position and allow selective overlap. Hover/focus/selected file raises above siblings; keep all titles and a reachable part of each button apparent. Use classes or data attributes on IDs, not fragile `nth-child` rules affected by future decorative siblings.

On mobile, the pile is a purposeful horizontal strip with a visible next-file sliver, `Swipe files` hint, scrollbar, and scroll snapping. Keep its container `min-width: 0`; overflow belongs only to the strip. File buttons are about 74–82% of strip width. Reset rotations/overlap, reserve vertical room for focus outlines, and allow Tab to bring each file into view.

**Worked fragment — compact strip rules only:**

```css
@media (max-width: 47.5rem) {
    .files {
        display: flex;
        gap: 0.75rem;
        min-width: 0;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: 0.5rem 0.5rem 1.5rem;
    }

    .file {
        flex: 0 0 78%;
        transform: none;
        scroll-snap-align: start;
    }
}
```

Reduced motion removes decorative lift/transition, while stacking/focus state remains visible. Don't add a carousel library or hide information behind hover.

## Task 4: Add the reversible crystal

- [x] **Step 1: Select the prototype crystal source from the full library and copy only that file.**

The matching candidate is `assets/artifacts/misc sprites (pixel)/Life_Crystal_(placed).gif`. Inspect its animation in context, provenance in the asset inventory, and the prototype reaction; copy to `public/media/home/crystal.gif` for this tutorial. Use the source's real dimensions. If the owner chooses an original replacement, keep the same small reaction, not a new interaction direction.

- [x] **Step 2: Implement `HomeCrystal`.**

Use a button with `aria-pressed`, local boolean state, and changing label `Touch the little crystal` / `Put the crystal back`. Toggle a small CSS pose or opacity without removing the button, keeping the return action visible and hit target usable (at least 44×44). Request `uiClick` on activation. No unlock, disappearance, storage write, or forced audio. Reserve its position near Current Project/Familiar so chunk 4 can include it as a fixed exclusion.

If the chosen GIF keeps moving under reduced motion, use a manually exported still from that same asset with a reduced-motion CSS alternative; CSS disabling transitions cannot stop GIF frames. No new image-generation direction is needed.

## Browser checkpoint before authored decoration

- [ ] Open the same ONFF artifact from Spotlight and pile; same title/media/destination. Viscap inspection is informative while media remains pending. Found Map opens the Map record and reaches `/map`.
- [ ] Test mouse, Enter, Space, Escape, close button, backdrop, and destination link. Focus enters the dialog and returns to its original trigger on dismissal. Reopen from different triggers. The header/profile remains usable after closure.
- [ ] Tab across the pile: each file raises like hover and opens on activation. Shuffle visibly changes focus without opening a dialog. Reduced motion keeps state readable.
- [ ] At 390/320, swipe files then tap to inspect. Only the strip scrolls horizontally; page width stays fixed. Dialog shows the full capture and permits vertical scrolling/closure.
- [ ] Touch/restore the crystal repeatedly by pointer and keyboard; state and label agree. Reload resets it, with no claimed collection award.
- [ ] With sound muted, all actions work silently. With sound enabled, one explicit open/close/cycle/shuffle/reaction produces one quiet click. Hover, hydration, and route load remain silent. No `AudioContext` calls appear in these components.
- [ ] Run lint/typecheck. These browser-owned interactions do not need broad automated component tests.

**Learning checkpoint:** Explain why inspection shares a provider but composition does not become one giant Client Component, and why a reversible toy differs from persistent collectible progression.

**Finish:** Commit after the interaction/browser checkpoint. The next chunk decorates the actual regions and protects all their controls.
