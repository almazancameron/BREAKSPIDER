# Phase 1 Splash Implementation Plan

**Execution owner:** You will edit the files and implement this plan yourself. The checkpoints below are suitable for manual implementation; no agent execution or delegation is requested.

**Implementation update (2026-10-04):** At the owner's subsequent request, Codex completed the splash portion in the existing workspace, preserving the owner's arrow-function style. This tutorial remains as the explanation of the implementation. Header styling, logo micro-animation, and audio mapping are still separate work.

**Learning format:** This is a guided implementation tutorial. Read the explanation for a step, make its edit, and check the result before moving on. Interface blocks describe the eventual shape of your code; they are explicitly labeled and are not complete implementations. Worked examples teach the unfamiliar pieces; you can try writing them yourself before consulting the example. Future Breakspider plans should use this same teaching format.

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

Server markup and the first hydration render contain the normal site underneath a homepage-only black cover. The storage decision happens after hydration. Returning visitors or unavailable storage remove the cover immediately; eligible visitors hand off to the splash. The dialog opens in a layout effect before the browser paints that handoff. A noscript rule hides the cover when JavaScript is disabled, and a ten-second CSS fallback reveals the site if hydration never completes. Interior routes do not render the cover.

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

### What you are learning

This task separates a browser detail (reading a saved value) from a product decision (whether to show the intro). That makes the policy easy to understand and lets us check it without launching the whole website.

`localStorage` is a browser key/value store that survives page reloads. Its values are strings, so we save `"true"`, not the boolean `true`. It is unavailable on the server and can also be blocked in a browser. Those cases should let someone reach the site normally.

An **export** makes a value or function available for another file to import. It does not implement the function. A **type** describes which values TypeScript allows; it does not create a runtime value or execute any behavior.

**Interface reference only — these are the names and types we want at the end, not a complete file:**

```ts
export const INTRO_SEEN_STORAGE_KEY = "breakspider_intro_seen_v1";
export type IntroStorage = Pick<Storage, "getItem" | "setItem">;
export type IntroSeenStatus = "seen" | "unseen" | "unavailable";
export function readIntroSeen(storage?: IntroStorage | null): IntroSeenStatus;
export function markIntroSeen(storage?: IntroStorage | null): boolean;
export function shouldShowInitialIntro(initialPathname: string, status: IntroSeenStatus): boolean;
```

Read the unfamiliar syntax this way:

| Syntax | Meaning here |
| --- | --- |
| `Pick<Storage, "getItem" \| "setItem">` | Accept an object with these two storage methods. We do not need the rest of the browser Storage API. |
| `"seen" \| "unseen" \| "unavailable"` | The result must be one of these exact strings. This is a union type. |
| `storage?` | The caller may omit this argument. An omitted argument is `undefined`. |
| `IntroStorage \| null` | The caller may explicitly provide no storage with `null`. |
| `): boolean` | The function returns a boolean. The code inside `{ ... }` must produce it. |

`export function name(...): Result;` ends in a semicolon and describes a signature. In this ordinary `.ts` module, write a body inside braces instead. Do not use `declare` to make TypeScript accept the missing body: that would promise a runtime implementation we have not provided.

### Step 1: Start with the smallest runnable function

- [ ] Add the exported constant and the two exported types from the interface reference to `lib/intro/intro-state.ts`.
- [ ] Implement `shouldShowInitialIntro` with a body. It should return true only when both conditions are true:

```ts
export function shouldShowInitialIntro(
  initialPathname: string,
  status: IntroSeenStatus,
): boolean {
  return initialPathname === "/" && status === "unseen";
}
```

`===` compares values without converting their types. `&&` requires both comparisons to pass. This is a **pure function**: it depends only on its inputs and does not read storage, update React, or change anything elsewhere.

**Checkpoint:** You now have a real exported function, not just its declaration. It can be imported and called. The remaining functions are still work to do; do not paste their bodyless signatures into the file.

### Step 2: Check the policy with a small Vitest test

- [ ] Create `tests/intro-state.test.mjs`. This is JavaScript, so do not put TypeScript parameter/type annotations in this file. The existing Vitest configuration can import the TypeScript module from it.
- [ ] Add this runnable test:

```js
import { expect, test } from "vitest";
import { shouldShowInitialIntro } from "../lib/intro/intro-state.ts";

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

`test` names a behavior and runs the callback. `expect(actual).toBe(expected)` compares the returned value with what we want. The loops cover the same rule for several interior paths and saved states; they are not testing React navigation.

- [ ] Run `npm test -- tests/intro-state.test.mjs`. Expect one passing test. The `--` forwards the file argument through npm to Vitest. Use `npm run test:watch -- tests/intro-state.test.mjs` if you prefer feedback after each save.

**Checkpoint:** If the test cannot find an export, check the import path and the `export` keyword. If an assertion fails, compare its actual/expected values with the two comparisons in the function.

### Step 3: Resolve browser storage safely

We want two ways to call the storage functions. Website code can omit the argument and use browser storage. Tests can pass a tiny fake object. This is **dependency injection**: supply the dependency instead of forcing every caller to use the real browser.

- [ ] Add this private helper to `intro-state.ts`:

```ts
function getBrowserStorage(): IntroStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}
```

It is private because other files do not need to import it. `typeof window` safely checks whether we are in a browser; referencing `window` directly on the server would throw. Even accessing the `localStorage` property can throw, so that access belongs inside `try`. `catch` gives us a usable fallback.

**Checkpoint:** This helper does not run when the module is imported. It runs when a function requests storage. Avoid a top-level `const storage = window.localStorage`: Next.js may import this module while rendering on the server.

### Step 4: Read the saved flag

- [ ] Implement `readIntroSeen`. Try it yourself using these rules: no storage means unavailable; exactly `"true"` means seen; anything else means unseen; a read error means unavailable.

**Worked implementation — valid code to put in the module:**

```ts
export function readIntroSeen(
  storage: IntroStorage | null = getBrowserStorage(),
): IntroSeenStatus {
  if (!storage) return "unavailable";

  try {
    return storage.getItem(INTRO_SEEN_STORAGE_KEY) === "true"
      ? "seen"
      : "unseen";
  } catch {
    return "unavailable";
  }
}
```

The default argument runs when the caller omits storage or passes `undefined`. Explicit `null` stays null, allowing a test to simulate unavailable storage. The ternary expression `condition ? a : b` selects one of two results.

### Step 5: Save completion without trapping the visitor

- [ ] Implement `markIntroSeen`: if there is no storage return false; otherwise write the key/value in a try block and return true; catch a write failure and return false.

```ts
export function markIntroSeen(
  storage: IntroStorage | null = getBrowserStorage(),
): boolean {
  if (!storage) return false;

  try {
    storage.setItem(INTRO_SEEN_STORAGE_KEY, "true");
    return true;
  } catch {
    return false;
  }
}
```

The return value says whether saving worked. It must not decide whether someone is allowed to dismiss the intro. Later React code should dismiss even when this returns false.

### Step 6: Check persistence with fake storage

- [ ] Expand the test import to include `INTRO_SEEN_STORAGE_KEY`, `readIntroSeen`, and `markIntroSeen`.
- [ ] Add this runnable example:

```js
test("intro completion round-trips using only the intro key", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };

  expect(readIntroSeen(storage)).toBe("unseen");
  expect(markIntroSeen(storage)).toBe(true);
  expect([...values.entries()]).toEqual([[INTRO_SEEN_STORAGE_KEY, "true"]]);
  expect(readIntroSeen(storage)).toBe("seen");
});
```

`Map` stores the values in memory for this test. `?? null` returns null only when the lookup is missing/null, matching the browser API. The fake implements just the two methods our code needs; it does not need a browser or a mocking framework.

- [ ] Add one grouped test for malformed strings (`"false"`, `"invalid"`, `""`) returning unseen. Reuse a fake whose `getItem` returns each string.
- [ ] Add one grouped test for unavailable storage: explicit null, and a fake whose `getItem`/`setItem` throw `new Error("storage blocked")`. Expect read unavailable and write false. In this Node test environment, calls with no argument should also return unavailable/false.
- [ ] Run the focused test command, then `npm test`. Expect your new tests and the 13 existing tests to pass. Broad coverage targets and component tests are not required.
- [ ] Optionally commit only these two files with `git add lib/intro/intro-state.ts tests/intro-state.test.mjs` and `git commit -m "feat: define intro persistence and entry policy"`.

**Task 1 checkpoint:** Explain these three things in your own words before continuing: why storage holds a string, why the browser lookup happens inside a function, and why unavailable is different from unseen. Those are the main lessons; memorizing the TypeScript syntax is not the goal.

## Task 2: Implement the Approved Splash Presentation

**Files:** Create splash component/CSS and production animation document/assets from the file table.

### What you are learning

React describes what should be on the screen, but an animation also needs to communicate with browser APIs over time. This task introduces three tools:

- **State** (`useState`) remembers a value and causes React to render again when it changes. Use it for the phase that affects visible controls.
- **Refs** (`useRef`) hold DOM elements or mutable values without causing a render. Use them to access a dialog/iframe and to immediately guard repeated events.
- **Effects** (`useEffect`) connect a mounted component to something outside React, such as a browser event or timer. The function an effect returns disconnects it.

Put `"use client"` at the top of `splash-entry.tsx` because it uses React hooks and browser events. This does not make `window` safe during rendering: Next.js also renders initial Client Component HTML on the server. Access browser APIs in effects or event handlers.

**Interface reference only — add a component body that returns JSX:**

```ts
type SplashEntryProps = {
  onCommitSeen: () => void;
  onDismiss: () => void;
};
export function SplashEntry(props: SplashEntryProps): React.ReactElement;
```

Mounting starts one run. Unmounting cancels it. The parent decides when to mount it; this component performs no localStorage or route access. `onCommitSeen` is called once per run when Enter/Skip/Escape is accepted; `onDismiss` is called once when the overlay is actually finished.

Props are inputs supplied by the parent. `() => void` means a callback with no arguments and no useful return value. Calling `onCommitSeen()` asks the parent to save progress; calling `onDismiss()` asks it to remove the splash. Passing a callback does not call it: use `onClick={skip}`, not `onClick={skip()}`.

### Build in layers, with a browser checkpoint after each

Follow the numbered steps below in order. Do not implement the message handling, motion settings, and split panels before you have a static dialog that opens and skips correctly.

**Before Steps 1–2: understand the iframe boundary.** An iframe is a separate document inside the page. Our existing animation can keep its own HTML, styling, and timeline without being rewritten as React. Files in `public/intro/...` are served at `/intro/...`; the URL does not include `public`. Open the animation URL directly in a browser and verify the assets load before embedding it. In the iframe JSX, use `title="Breakspider logo animation"`, `tabIndex={-1}`, `aria-hidden="true"`, and CSS `pointer-events: none`; the outer dialog provides the accessible name and all controls.

**Before Step 3: understand native dialogs.** Rendering `<dialog>` does not automatically open it as a modal. `showModal()` does that, placing it in the browser's top layer and making the page behind it unavailable to keyboard interaction. A DOM ref lets you call that method. The setup/cleanup pattern looks like this; it is an illustration inside your component, not a complete file:

```tsx
const dialogRef = useRef<HTMLDialogElement>(null);

useEffect(() => {
  const dialog = dialogRef.current;
  if (!dialog) return;
  if (!dialog.open) dialog.showModal();
  return () => {
    if (dialog.open) dialog.close();
  };
}, []);
```

`[]` means this effect has no reactive dependencies to watch. Development Strict Mode still runs an extra setup/cleanup cycle to expose incomplete cleanup. Do not disable Strict Mode to hide problems. After implementing a static black dialog, verify Skip and Escape remove it before adding animation. Native Escape produces a cancel event; prevent its default close so your Skip handler also records completion and dismisses through React.

**Before Step 4: understand the phases.** Use a string union for `playing`, `ready`, `opening`, and `dismissed`. This prevents contradictory boolean combinations such as “opening and still playing.” Enter is disabled in playing, enabled in ready, and starts opening. Skip is always enabled. React updates may be batched, so an immediate ref guard protects against two callbacks firing before the next render. Keep the ref and state synchronized through one phase-changing helper.

The iframe announces completion using `postMessage`. The parent hears a `message` event. Check origin (the sender's site), source (this iframe window), and payload type before changing phase. A correctly spelled message alone is not enough. Remove the listener in the effect cleanup. At this checkpoint, let Enter dismiss immediately; add the panel transition only after playback → ready works.

**Before Step 5: understand fallbacks and reduced motion.** A timeout is a backup, not the animation clock: `window.setTimeout(makeReady, 4800)` eventually enables entry even if completion is missing. Clear that timer when it is no longer needed. `window.matchMedia("(prefers-reduced-motion: reduce)")` tells you whether the visitor requests less motion. Determine that preference in an effect before mounting the iframe; initially render only static artwork until the preference is known, so reduced-motion visitors do not briefly start an animation.

**Before Step 6: understand the coordinate math.** The logo's broken seam is 750 units from its left edge, on a 1600-unit artboard: `750 / 1600 = 0.46875`. CSS `left: 50%` places the stage origin at viewport center; `translateX(-46.875%)` moves its seam onto that center. `getBoundingClientRect()` gives the displayed stage's viewport coordinates. CSS custom properties carry those measurements to both clipped panel copies. Their artwork matches before they slide apart. First check this with motion disabled; then enable the 1,050 ms transition.

**Before Step 7: understand cleanup ownership.** Every added listener needs a matching removal; every timeout/frame needs cancellation. Saving the old body overflow before assigning `"hidden"` lets you restore the original value, rather than guessing it was empty. Keep the latest callbacks available to your handlers without repeatedly restarting animation effects when the parent renders. Either stabilize parent callbacks or hold the latest callbacks in refs; avoid suppressing dependency warnings without understanding them.

**Step 8 harness example — a complete temporary client component:** Create `components/intro/splash-preview.tsx` to try the splash before building the provider:

```tsx
"use client";

import { useState } from "react";
import { SplashEntry } from "./splash-entry";

export function SplashPreview() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setShow(true)}>Preview intro</button>
      {show && (
        <SplashEntry
          onCommitSeen={() => { /* No storage in this preview. */ }}
          onDismiss={() => setShow(false)}
        />
      )}
    </>
  );
}
```

Import/render `<SplashPreview />` in `app/page.tsx` alongside the existing homepage links. The homepage can remain a Server Component: it may render a Client Component. Clicking the button mounts the splash, and dismissal removes it. Delete the harness and its import after Task 3. It is a temporary local development tool, not a production route.

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

### What you are learning

The homepage replay button and fullscreen splash need to share a little state. A **React context** lets a provider expose that state to descendants without threading props through the header, page, and every component between them. The existing `lib/visitor/visitor-state-provider.tsx` shows this pattern in this repository.

The intro provider goes in the root layout because Next.js preserves that layout during client navigation. If you put the provider only inside the homepage, leaving and returning Home would mount it again and could repeat the entry decision. A **document entry** is a full browser load/refresh; a **client navigation** changes routes inside the already-running application. We only automatically check eligibility on document entry.

**Interface reference only — each function needs its own body:**

```ts
export function IntroProvider({ children }: { children: React.ReactNode }): React.ReactElement;
export function useIntro(): { ready: boolean; replayIntro: () => void };
export function ReplayIntroButton(): React.ReactElement;
```

### How the pieces connect

Read this sequence before implementing the checklist:

1. Server render and first client render: provider displays `children` underneath a homepage-only black cover, marks `ready` false, and shows no splash yet. Matching initial HTML avoids hydration errors.
2. Effect after hydration: provider checks the initial pathname and saved flag once, then sets `ready` true and opens the splash only if eligible.
3. Visitor accepts Enter/Skip: splash calls `onCommitSeen`; provider saves the flag. Dismissal proceeds even if saving fails.
4. Splash finishes opening or is skipped: `onDismiss` hides it and restores the appropriate focus.
5. Homepage Replay: context callback mounts a new splash run. It does not repeat the automatic entry check or clear the flag.
6. Route leaves Home: remove the splash and cancel focus restoration to the old page.

**Before Step 1: build the context contract.** Start with `createContext` and a nullable default, then implement `useIntro` using `useContext`. If the context is null, throw a clear error that the hook must be used inside `IntroProvider`. This reveals an incorrectly placed replay button instead of failing silently. Keep the provider's `children` visible even when `ready` is false.

**Before Step 2: separate the two route questions.** The captured initial pathname answers “Did this document enter through Home?” The current `usePathname()` answers “Are we still on Home?” Only the first drives automatic eligibility. A ref can remember whether you already initialized; React state controls visible UI. Do not include a changing pathname in an effect that blindly reopens the intro on every Home visit. If an effect sets state while initializing from storage, use the existing visitor provider as the local pattern and explain any narrow lint exception; do not disable the rule across the file.

**Before Step 3: distinguish saving from dismissal.** Enter records seen before the opening transition, while `onDismiss` runs after it. Skip does both immediately. Keeping the callbacks separate is why a visitor can safely leave during the transition without losing the accepted entry. Use an immediate guard for repeated Replay clicks and reset per-run completion guards when a new splash mounts.

**Before Step 4: understand programmatic focus.** A `<main>` is not normally focusable. `tabIndex={-1}` permits JavaScript `.focus()` without putting main into the normal Tab sequence. `{ preventScroll: true }` avoids a jump when focus moves. Store the replay trigger using `document.activeElement` when replay begins, check that it is an `HTMLElement`, and confirm it is still connected before restoring focus. Native dialog close can restore focus too; verify the final result after it has closed.

**Before Step 5: make a small consumer component.** The following is a complete implementation for `replay-intro-button.tsx` once the provider exists:

```tsx
"use client";

import { useIntro } from "./intro-provider";

export function ReplayIntroButton() {
  const { ready, replayIntro } = useIntro();
  return (
    <button type="button" disabled={!ready} onClick={replayIntro}>
      Replay intro
    </button>
  );
}
```

Notice the callback is passed to `onClick` without parentheses. Keep the existing global focus outline; add page-owned visual styling if needed. Render it only on the homepage.

**Before Steps 6–7: use browser tools to check persistence.** In the browser's console, `localStorage.removeItem("breakspider_intro_seen_v1")` clears only this flag. Reload to simulate a fresh document. Use the site's links to simulate client navigation. In the Application/Storage panel, inspect the saved value after Enter or Skip. Do not clear all browser storage for every case: that would also reset visitor state and conceal accidental coupling.

**Task 3 checkpoint:** Enter through `/about`, use a site link to go Home, and confirm no automatic intro appears. Then click Replay and verify it still works. This proves the provider distinguishes document entry from route navigation.

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

### What you are learning

A unit test can prove a storage decision while missing a clipped Skip button or a focus jump. This task uses the real browser to check the things the test environment cannot show. Use DevTools responsive mode to set width/height, its Rendering panel to emulate reduced motion, and Network/Console panels to inspect asset failures and runtime errors.

For each numbered check below, write down what you tried and what you saw. If something fails, fix that behavior and repeat the affected check; you do not need to invent an automated test for every visual issue. A successful production build checks a different path from the development server, so finish by running `npm run build` and `npm run start` and repeating the core flows there.

`100dvh` follows the current visible viewport as mobile browser chrome changes; safe-area insets reserve space around cutouts and home indicators. Those tools help layout, but the real checkpoint is that Enter and Skip remain reachable in short and narrow viewports.

- [ ] **Step 1: Compare visuals at 1440×900 and 1920×1080.** Check animation final pose, warm off-white artwork on black, Enter placement, seam alignment, and opening panels against the approved captures. Resize before/during opening: panel artwork must not jump away from its seam.
- [ ] **Step 2: Review 768×900, 390×844, 320px width, and a short landscape viewport.** Logo may become smaller so Enter and Skip remain visible. Use dynamic viewport sizing and safe-area padding where useful. Avoid page-wide horizontal overflow and controls clipped by mobile browser chrome. The prototype's logo sizing is a reference, not permission to let it collide with controls at short heights.
- [ ] **Step 3: Review keyboard and reduced motion.** Tab stays inside the splash; Skip is usable immediately; Escape dismisses in every state; Enter can be keyboard-activated; background navigation cannot be focused while modal. Verify final focus for automatic entry versus replay. Toggle reduced motion while playing and opening, and verify static dismissal plus timer cleanup.
- [ ] **Step 4: Review loading/failure behavior.** Confirm the animation only downloads on an eligible intro or replay, not on returning visitors or direct interior entry. Break the iframe URL and final-logo URL separately; navigation still works through Skip/Enter. Disable JavaScript and confirm homepage navigation remains usable.
- [ ] **Step 5: Run final automated checks.** `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` all pass. Run `npm run start` for a production-build browser check; repeat fresh Home, returning Home, direct interior → Home, and replay. Check console/network for missing intro assets and hydration errors.
- [ ] **Step 6: Record actual results.** Add commands/results and browser/viewport checks below. Leave unchecked cases explicit. Header parity, logo micro-animation, and audio mapping remain separate Phase 1 plans.
- [ ] **Step 7: Optional final commit.** Stage only your final splash refinements and this verification record; commit as `feat: stabilize splash entry and replay`.

## Implementation Verification Record

Implemented and verified on 2026-10-04:

- `npm test`: 18 tests pass, including the owner's four intro tests and one focused regression test for the production key and unavailable writes.
- `npm run typecheck`, `npm run lint`, and `npm run build`: pass.
- Headless Microsoft Edge verification against the production build: normal four-second playback, split opening, first-entry persistence, automatic dismissal focus, returning visits, replay/Escape, and replay focus restoration pass.
- Direct `/about` entry followed by client navigation Home bypasses the intro. Leaving Home during replay removes the splash, restores scrolling, and does not accidentally mark it seen.
- Reduced motion displays the static logo and downloads no animation document. Enter/Skip fit at 1920×1080, 768×900, 390×844, 320×568, and 844×390, with no horizontal page overflow. Keyboard movement between the dialog controls passes.
- Blocked reads fail open; blocked writes do not prevent replay or Skip. Missing animation completion enables Enter through the fallback. A broken final-logo image also does not block entry.
- Query/hash entry, motion changes during playback/opening, repeated replay/Skip, Escape during opening, and resizing during playback/opening pass. The seam remains centered after resize; stale timers do not reopen a dismissed splash.
- Returning visitors do not download the animation. Navigation without JavaScript works. No browser runtime errors were observed in these checks.
- Desktop, opening-transition, and mobile screenshots were inspected. Physical mobile devices and other browser engines have not been verified.

The motion document was copied from the approved prototype with its completion message restricted to the same origin. The temporary preview component was unnecessary: the finished provider supplied the browser preview. Browser verification tooling and screenshots live in the system temporary directory; no browser-testing dependency was added to the app. No commits or deployment were performed. The checklist remains available as a learning reference rather than being marked as work performed by the owner.

Follow-up: Enter and its hint remain hidden during playback, then fade in over 350 ms when ready, matching the prototype. The hint is `Or click anywhere`; clicks on it or the logo/background also enter. Skip remains available throughout. Reduced motion removes the visible fade.

Follow-up: A server-rendered black cover prevents the homepage flashing before hydration checks intro eligibility. It hands off to the dialog before paint, clears promptly for returning visitors/blocked storage, and includes no-JavaScript and stalled-hydration fallbacks.

Follow-up: The splash's initial unknown motion-preference state renders no logo. Normal playback uses only the animation iframe on a black background; the final static logo appears after completion/fallback, or immediately for reduced motion. Browser checks confirmed no early final-logo render on first entry or replay, including a delayed animation document. Lint and the production build pass.

## Practical Starting Point

Start with Task 1. It is small, testable with the repository's existing tools, and pins the exact storage behavior before animation and routing enter the picture. Then make the approved animation render through Task 2 before connecting persistence in Task 3. Keep each optional commit limited to your own files: the repository already has unrelated documentation and prototype changes.
