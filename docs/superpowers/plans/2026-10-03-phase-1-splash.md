# Phase 1 Splash Implementation Plan

**Execution owner:** You will edit the files and implement this plan yourself. The checkpoints below are suitable for manual implementation; no agent execution or delegation is requested.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This instruction applies only if the owner later requests agent implementation.

**Goal:** Deliver the approved Breakspider intro on a first homepage entry, with reliable skip, persistence, replay, and accessible entry into the existing production site.

**Architecture:** A small client-side intro provider in the persistent root layout owns eligibility and replay. A fullscreen native dialog owns the splash presentation and lifecycle; a same-origin iframe preserves the approved logo animation. Homepage content remains server-rendered and independent of the intro.

**Tech Stack:** Installed Next.js 16.3.6, React 19.2.8, TypeScript, CSS Modules, native `<dialog>`, Web Animations API, localStorage, configured Vitest runner with a Node environment. The splash implementation needs no additional dependencies.

**Verification approach:** Prioritize real browser verification for the splash, navigation, focus, motion, and responsive behavior. Keep a small Vitest suite for persistence and initial-entry eligibility. Automated component tests, snapshots, coverage targets, and a new browser automation framework are not required for this launch phase. `npm test` runs once; `npm run test:watch` is available while implementing logic.

**Spec:** [Master roadmap, Phase 1](../../breakspider_master_implementation_roadmap_v2.md#7-phase-1--splash-global-shell-and-shared-ui). Supporting references: [prototype reuse map](../../breakspider_prototype_reuse_map.md), [vector handoff](../../breakspider_vector_graphics_handoff.md), `prototype/splash-entry/index.html`, `prototype/logo-animation/index.html`, and `screenshots/breakspider-splash-ready-1440x900.png` / `screenshots/breakspider-splash-opening-1440x900.png`.

## Global Constraints

- “show the splash only when a first-time visitor enters through the homepage (`/`)”
- “direct visits to interior routes do not redirect through or block on the splash”
- “store `breakspider_intro_seen_v1 = true` in `localStorage`”
- “provide a persistent `Replay intro` affordance on the homepage”
- “splash always has a skip path”
- Preserve the finished four-second animation, rigid wordmarks, flexible web, spider tether, and final logo alignment.
- Shared infrastructure for shared behavior; bespoke composition for bespoke pages.
- Read relevant guides in `node_modules/next/dist/docs/` before implementation. Start with `01-app/01-getting-started/03-layouts-and-pages.md` and `05-server-and-client-components.md`; consult the installed `use-pathname` API guide for route observation.
- Keep audio preference and visitor state with their existing owners. This plan adds no sound effects, header redesign, logo micro-animation, collectibles, or Phase 2 homepage composition.

## Behavior Decisions

These are concrete proposed defaults for implementation, including details the roadmap leaves open. You can revise them before coding.

| Situation | Behavior |
| --- | --- |
| Fresh document enters `/`, key absent | Show intro after the client checks storage. |
| Fresh document enters `/`, key is exactly `"true"` | Show homepage immediately; do not mount/download the animation iframe. |
| Fresh document enters an interior route | Never show an automatic intro in that document, including a later client navigation to Home. Replay remains available on Home. |
| Enter clicked after animation | Open the two panels, then dismiss; record seen immediately when Enter is accepted. |
| Skip clicked or Escape pressed | Dismiss immediately, including during playback/opening; record seen. |
| Replay clicked | Start a fresh animation without reloading, clearing the seen flag, or resetting visitor state. |
| Storage read unavailable/throws | Fail open to homepage. Replay still works in memory. |
| Storage write unavailable/throws | Dismiss normally; do not repeat automatically in the same document. A later document may show the intro again. |
| Malformed seen value, e.g. `"false"` | Treat as unseen. Do not adopt prototype keys. |
| Reduced motion | Show the final logo with Enter immediately; omit the animated iframe and panel movement. |
| Animation fails or never signals completion | Enable Enter by 4,800 ms after splash mount and show the static final logo. Skip is available throughout. |
| Route changes away from `/` while open | Immediately remove splash, cancel work, unlock scrolling, and do not mark seen solely because of navigation. |

The intro is silent. It never requests autoplay permission or changes the persisted sound preference.

Automatic completion moves focus to `#main-content` without scrolling. Replay completion restores focus to the replay button. A route change must not restore focus to an element from the departed route. The Enter control does not steal focus when it becomes available.

Server markup and the first hydration render contain the normal site, without a blocking splash. The storage decision happens after hydration. A brief glimpse of the homepage for a fresh visitor is an accepted tradeoff: no server can know a localStorage flag, and the homepage stays usable without JavaScript. Do not add a global blank/loading screen to conceal that check.

## File Responsibilities

| File | Responsibility |
| --- | --- |
| `lib/intro/intro-state.ts` (new) | Storage key, guarded read/write, pure initial eligibility decision. |
| `components/intro/intro-provider.tsx` (new) | One initial-entry decision per document; replay context; pathname cancellation; show/hide orchestration. |
| `components/intro/splash-entry.tsx` (new) | Dialog, local playback/opening state, iframe message, skip/Enter, motion preference, lifecycle cleanup. |
| `components/intro/splash-entry.module.css` (new) | Fullscreen black presentation, logo placement, controls, split panels, responsive/reduced-motion styling. |
| `components/intro/replay-intro-button.tsx` (new) | Homepage replay control consuming context. |
| `public/intro/logo-animation/index.html` (new) | Audited production derivative of the approved motion document. |
| `public/intro/logo-animation/assets/` (new) | Only SVGs actually referenced by that document, from the animation prototype. |
| `app/layout.tsx` (modify) | Add persistent provider and make main programmatically focusable. |
| `app/page.tsx` (modify) | Add permanent homepage Replay intro control. |
| `tests/intro-state.test.mjs` (new) | Persistence and eligibility tests using the existing runner. |

Keep full-logo panel artwork at `/media/branding/breakspider-logo.svg`. During plan review its SHA-256 matched `prototype/logo-animation/assets/logo-full.svg` exactly. Recheck if artwork changes before implementation; do not alter generated vector geometry.

## Review Focus

1. Interior entry followed by SPA navigation Home must not unexpectedly gate the visitor. Exercise the full route sequence in Task 3.
2. Blocked storage must never trap the visitor or break replay. Cover guarded reads/writes in Task 1 and browser behavior in Task 3.
3. Missing iframe completion or image decode must never prevent Enter/Skip. Exercise failure fallbacks in Task 2.
4. Rapid replay, Escape, route changes, and Strict Mode must leave no stale callback, dialog, focus restoration, or scroll lock. Exercise lifecycle paths in Tasks 2–3.
5. Reduced motion, short mobile viewports, and resize during opening must preserve controls and the final artwork handoff. Exercise these cases in Tasks 2–4.

## Task 1: Define Intro Persistence and Eligibility

**Files:** Create `lib/intro/intro-state.ts` and `tests/intro-state.test.mjs`.

**Interfaces produced:**

```ts
export const INTRO_SEEN_STORAGE_KEY = "breakspider_intro_seen_v1";
export type IntroStorage = Pick<Storage, "getItem" | "setItem">;
export type IntroSeenStatus = "seen" | "unseen" | "unavailable";
export function readIntroSeen(storage?: IntroStorage | null): IntroSeenStatus;
export function markIntroSeen(storage?: IntroStorage | null): boolean;
export function shouldShowInitialIntro(initialPathname: string, status: IntroSeenStatus): boolean;
```

Use explicit Vitest imports and assertions like these in the eligibility test, alongside the storage tests described below:

```js
import { expect, test } from "vitest";

test("automatic intro is limited to an unseen homepage entry", () => {
  expect(shouldShowInitialIntro("/", "unseen")).toBe(true);
  expect(shouldShowInitialIntro("/", "seen")).toBe(false);
  expect(shouldShowInitialIntro("/", "unavailable")).toBe(false);
  for (const path of ["/about", "/projects/one-night-familiar-fight", "/play/onff"]) {
    for (const status of ["seen", "unseen", "unavailable"]) {
      expect(shouldShowInitialIntro(path, status)).toBe(false);
    }
  }
});
```

- [ ] **Step 1: Write focused persistence tests.** Use the existing Vitest `test` / `expect` pattern and an injected fake storage. Group related cases into a few meaningful tests: missing value → `"unseen"`; exact `"true"` → `"seen"`; malformed values → `"unseen"`; null or throwing storage → `"unavailable"`. Assert a successful write uses exactly `breakspider_intro_seen_v1` and `"true"`, returns true, and does not touch visitor/audio/prototype keys. A throwing write returns false. Do not add tests for incidental implementation details.
- [ ] **Step 2: Add an exhaustive eligibility table.** `shouldShowInitialIntro("/", "unseen")` is true. `/` with seen/unavailable is false. `/about`, `/projects/one-night-familiar-fight`, and `/play/onff` are false for all three statuses. In a Node process, calling default read/write must safely return unavailable/false.
- [ ] **Step 3: Run the focused tests before implementation.** `npm test -- tests/intro-state.test.mjs` should fail because the new module does not exist. This small logic suite is the automated testing scope for the splash; subsequent tasks use browser checks.
- [ ] **Step 4: Implement the interfaces.** Resolve optional browser storage inside a guarded function; guard access to `window.localStorage` as well as get/set calls. Keep the explicit intro key separate from the versioned visitor-state envelope. Add no visitor-state schema migration.
- [ ] **Step 5: Rerun the test command.** All new tests pass; `npm test` continues to pass existing tests.
- [ ] **Step 6: Optional checkpoint commit.** Stage only these two files: `git add lib/intro/intro-state.ts tests/intro-state.test.mjs`, then `git commit -m "feat: define intro persistence and entry policy"`.

## Task 2: Implement the Approved Splash Presentation

**Files:** Create splash component/CSS and production animation document/assets from the file table.

**Interface produced:**

```ts
type SplashEntryProps = {
  onCommitSeen: () => void;
  onDismiss: () => void;
};
export function SplashEntry(props: SplashEntryProps): React.ReactElement;
```

Mounting starts one run. Unmounting cancels it. The parent decides when to mount it; this component performs no localStorage or route access. `onCommitSeen` is called once per run when Enter/Skip/Escape is accepted; `onDismiss` is called once when the overlay is actually finished.

- [ ] **Step 1: Prepare the motion derivative.** Copy `prototype/logo-animation/index.html` into `public/intro/logo-animation/index.html`. Copy these nine files from its `assets/` directory into `public/intro/logo-animation/assets/`: `web-taut.svg`, `web-loaded.svg`, `web-left.svg`, `web-right.svg`, `web-frays.svg`, `web-broken.svg`, `break.svg`, `spider-wordmark.svg`, and `logo-full.svg`. Preserve keyframes, modified pre-load/loaded web assets, inline spider, and live tether math. Do not substitute the GIF or regenerate the early web poses from the general logo library: the animation copies intentionally omit the early right tether.
- [ ] **Step 2: Audit the embedded document.** Use `/intro/logo-animation/index.html?embed=1`. Keep existing embed styling; ensure controls/readouts stay hidden and the iframe cannot receive pointer or keyboard interaction. Change completion `postMessage` target from `"*"` to `window.location.origin`. Keep debug/export helpers confined to the iframe; none should become site-wide shortcuts. Retain only referenced production assets, not render scripts or exports.
- [ ] **Step 3: Build a fullscreen native dialog.** Use a ref and guarded `showModal()`; give it an accessible name such as `Breakspider intro`. Remove native max-width/max-height/margins in its CSS. Keep a visible `Skip intro` button with `autoFocus` throughout playing, ready, and opening states. Handle native cancel as Skip with `preventDefault()`. Native modal behavior makes the shell inert and traps focus; do not implement a second manual focus trap.
- [ ] **Step 4: Define local lifecycle states.** `playing → ready → opening → dismissed`; Skip/Escape can go directly to dismissed from any visible state. Enter only works from ready. Use an immediate ref guard as well as React state to make repeated events idempotent. Register the message listener before the iframe can complete. Accept completion only when `event.origin === window.location.origin`, `event.source === iframeRef.current?.contentWindow`, and the data is an object whose `type` is `"breakspider:intro-finished"`.
- [ ] **Step 5: Add failure and motion handling.** Start a 4,800 ms readiness timeout on mount, not on iframe load. On completion or timeout, reveal the static final logo and enable Enter. A failed image decode must not postpone readiness. For reduced motion, render the static logo immediately, do not mount the iframe, and dismiss immediately on Enter. Subscribe to media-query changes; enabling reduced motion mid-run should stop animated playback and immediately settle into a usable static ready state (or finish an opening state).
- [ ] **Step 6: Translate the split transition.** Use the approved seam at x=750 of the 1600-unit artboard, placing the stage with `translate(-46.875%, -50%)` so that seam reaches viewport center. Each half contains a clipped copy of the final lockup at matching viewport coordinates. Measure the stage once at Enter and maintain alignment on resize; hide the iframe before panels move. Let matching artwork paint using the prototype's two animation-frame handoff, then animate halves out over 1,050 ms. Accept only the left panel's own transform transition-end; provide a 1,250 ms opening fallback after starting movement.
- [ ] **Step 7: Implement cleanup.** Cancel readiness/opening timers, scheduled animation frames, resize/media-query/message listeners, and active iframe playback by unmounting it. Close the dialog if open. Save/restore the previous inline body overflow value when applying scroll lock. Cleanup must be safe under development Strict Mode's setup/cleanup cycle. Parent handles final focus after dismissal so route cancellation cannot focus a departed page.
- [ ] **Step 8: Verify using a temporary homepage mount.** Run `npm run dev`; temporarily render `SplashEntry` from a small client harness on Home with callbacks and a replay/remount button. Verify the four-second animation against the prototype, immediate Skip/Escape, ready Enter, and split opening. Simulate a bad iframe URL and confirm static readiness by 4,800 ms. Send a completion-shaped message from another window/source and confirm it is ignored. Emulate reduced motion and confirm no animation iframe request. Remove the temporary harness when Task 3 integrates the provider.
- [ ] **Step 9: Optional checkpoint commit.** Stage only splash files and `public/intro/logo-animation/`; commit as `feat: add approved splash presentation`.

Use a dedicated native dialog here rather than broadening `components/ui/dialog.tsx`: the splash needs fullscreen presentation, animation staging, and immediate skip semantics; the existing inspector/profile dialog remains unchanged. Ordinary buttons may use scoped styles within the splash module. Do not add a generic animation or modal framework.

## Task 3: Connect Entry Policy and Homepage Replay

**Files:** Create provider/replay control. Modify `app/layout.tsx` and `app/page.tsx`. Remove the temporary Task 2 harness.

**Interfaces consumed:** Task 1 persistence/policy functions and Task 2 `SplashEntry` callbacks.

**Interfaces produced:**

```ts
export function IntroProvider({ children }: { children: React.ReactNode }): React.ReactElement;
export function useIntro(): { ready: boolean; replayIntro: () => void };
export function ReplayIntroButton(): React.ReactElement;
```

- [ ] **Step 1: Add the persistent provider.** Place `IntroProvider` inside `VisitorStateProvider` around the existing skip link, header, main, footer, and tracker. Pass server-rendered children through it; keep layout and homepage as Server Components. Provider renders children unconditionally and mounts the dialog as a sibling only when showing an intro. Do not move page content into client-side fetching/rendering.
- [ ] **Step 2: Decide eligibility once.** On initial client setup, capture the entry pathname and call `readIntroSeen` / `shouldShowInitialIntro`. Guard initialization so Strict Mode effect replay cannot reset the document decision. Expose `ready` after the check, including on interior routes and unavailable storage. Observe current pathname with `usePathname` for cancellation, without reevaluating automatic eligibility on every route transition. Wait if pathname is unavailable; treat a resolved non-home entry as ineligible.
- [ ] **Step 3: Wire completion and replay.** `onCommitSeen` calls guarded `markIntroSeen` once; success is not required to dismiss. `onDismiss` hides the splash. `replayIntro()` is a no-op unless initialized, on `/`, and no splash is active. Capture the active replay button before opening; remount a fresh splash run without clearing storage or reloading the page. Prefer no extra persisted replay counter or timestamp.
- [ ] **Step 4: Add focus completion.** Add `tabIndex={-1}` to the existing `<main id="main-content">`. After automatic dismissal focus main with `{ preventScroll: true }`; after replay focus its still-connected trigger. On navigation away, unmount splash and skip this focus restoration. Verify native dialog closing does not overwrite the intended final focus; perform focus after closing/unmounting, using a cancellable animation frame if needed.
- [ ] **Step 5: Add the homepage control.** Render `ReplayIntroButton` in the existing homepage placeholder children, visibly after its route links. Label it `Replay intro`; use `type="button"`, visible focus styling, and disable only while provider initialization is pending. Preserve this separate control when Phase 2 replaces the placeholder. It must remain available for seen/unseen/unavailable storage states. Do not put it on every route's global footer.
- [ ] **Step 6: Exercise document-entry sequences.** Clear only the intro key and enter `/`: intro appears; Enter/Skip writes `"true"`; reload skips. Clear it, enter `/about`, then navigate Home without reloading: no automatic intro. Replay works; a subsequent homepage reload skips after replay dismissal. Repeat from a direct deep route and with a Home URL containing query/hash. Interior routes must not request intro animation assets.
- [ ] **Step 7: Exercise error and lifecycle sequences.** Simulate blocked get/set operations in browser tools: blocked reads fail open; blocked writes still dismiss. During playback/opening navigate away via browser history and confirm scrolling and normal focus recover. Repeat replay/Skip several times; press Escape during the opening transition. Confirm a stale timeout/message cannot reopen the splash or dismiss a newer run. Visitor ID, sound preference, equipped cosmetics, and route tracking remain intact.
- [ ] **Step 8: Run checks.** `npm test`, `npm run typecheck`, and `npm run lint` must pass. Use real browser navigation for the route/focus assertions: the Vitest Node environment cannot prove dialog or App Router behavior. No automated React component suite or new browser-test dependency is required for this phase.
- [ ] **Step 9: Optional checkpoint commit.** Stage only provider/replay files, layout, and homepage; commit as `feat: connect homepage intro persistence and replay`.

## Task 4: Review Responsive Behavior and Stabilize

**Files:** Refine splash CSS/component as necessary. Update the Phase 1 splash verification record in this plan; do not mark all of Phase 1 complete.

- [ ] **Step 1: Compare visuals at 1440×900 and 1920×1080.** Check animation final pose, warm off-white artwork on black, Enter placement, seam alignment, and opening panels against the approved captures. Resize before/during opening: panel artwork must not jump away from its seam.
- [ ] **Step 2: Review 768×900, 390×844, 320px width, and a short landscape viewport.** Logo may become smaller so Enter and Skip remain visible. Use dynamic viewport sizing and safe-area padding where useful. Avoid page-wide horizontal overflow and controls clipped by mobile browser chrome. The prototype's logo sizing is a reference, not permission to let it collide with controls at short heights.
- [ ] **Step 3: Review keyboard and reduced motion.** Tab stays inside the splash; Skip is usable immediately; Escape dismisses in every state; Enter can be keyboard-activated; background navigation cannot be focused while modal. Verify final focus for automatic entry versus replay. Toggle reduced motion while playing and opening, and verify static dismissal plus timer cleanup.
- [ ] **Step 4: Review loading/failure behavior.** Confirm the animation only downloads on an eligible intro or replay, not on returning visitors or direct interior entry. Break the iframe URL and final-logo URL separately; navigation still works through Skip/Enter. Disable JavaScript and confirm homepage navigation remains usable.
- [ ] **Step 5: Run final automated checks.** `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` all pass. Run `npm run start` for a production-build browser check; repeat fresh Home, returning Home, direct interior → Home, and replay. Check console/network for missing intro assets and hydration errors.
- [ ] **Step 6: Record actual results.** Add commands/results and browser/viewport checks below. Leave unchecked cases explicit. Header parity, logo micro-animation, and audio mapping remain separate Phase 1 plans.
- [ ] **Step 7: Optional final commit.** Stage only your final splash refinements and this verification record; commit as `feat: stabilize splash entry and replay`.

## Implementation Verification Record

Not implemented yet. The checkboxes above are the owner's work checklist; this document does not assert any future code or checks pass.

## Practical Starting Point

Start with Task 1. It is small, testable with the repository's existing tools, and pins the exact storage behavior before animation and routing enter the picture. Then make the approved animation render through Task 2 before connecting persistence in Task 3. Keep each optional commit limited to your own files: the repository already has unrelated documentation and prototype changes.
