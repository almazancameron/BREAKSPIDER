# Phase 1 Audio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans if the owner later requests implementation. The current execution method is manual implementation by the owner; this document requests no agent implementation or delegation.

**Status:** Implemented, awaiting owner listening/browser acceptance (2026-10-05). At the owner's request, Codex completed the remaining sound-manager functions and event wiring using the owner's selected clip. The tutorial below is retained as an explanation of the implementation. Splash, header, and logo animation are complete and accepted.

**Goal:** Add a restrained set of deliberate UI sounds, using the existing mute preference and centralized sound manager, with reliable cancellation and browser-safe playback.

**Architecture:** Extend the existing Web Audio manager to support its synthesized tone plus one lazily loaded audio clip. A small client hook reads the existing visitor preference and requests named sounds. Components choose when to request feedback; the manager owns loading, volume, playback, and cancellation. Keep one active UI sound at a time.

**Tech Stack:** Installed Next.js 16.3.6, React 19.2.8, TypeScript, Web Audio API, native fetch, existing Vitest runner. No new dependencies or audio framework.

**Spec:** [Master roadmap, Phase 1](../../breakspider_master_implementation_roadmap_v2.md#7-phase-1--splash-global-shell-and-shared-ui), [Prototype 04 inventory](../../breakspider_prototype_04_design_inventory.md), and the current `lib/audio/sound-manager.ts`, `components/site/sound-toggle.tsx`, and visitor-state provider.

**Learning format:** Read each task's explanation before editing. Your first file-changing step is **Task 1, Step 1**. Blocks marked **worked example** contain usable code. Blocks marked **interface only** describe the functions you will implement; they are not meant to be pasted as empty exports. Use your preferred arrow functions and keep comments limited to things that help you understand the code.

**Testing approach:** Keep the existing small Vitest audio tests and update them for the asynchronous playback API. Browser verification and actually listening are required. No component test framework, snapshots, coverage target, or large fake-audio test suite is required.

## Global Constraints

- Use four spaces per indentation level in all created/edited files and code examples, following `AGENTS.md`.
- “default muted”
- “persist audio preference in `localStorage`”
- “use an explicit sound registry”
- “do not scatter direct audio calls throughout components”
- “map UI events to chosen sound effects deliberately”
- “many archived sounds can remain unused until a funny/appropriate purpose exists”
- Keep the preference in `VisitorState.soundMuted`, saved through the existing visitor provider under `breakspider:visitor:v1`. Do not add an audio storage key or second preference store.
- Playback is optional feedback. Navigation, dialogs, and settings must work even when sound fails.
- Preserve the completed splash and header; the splash remains silent.
- Keep the header logo a Server Component with CSS motion. It does not need an audio handler in this plan.
- Before implementing, read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`. Hooks and event handlers belong in Client Components; browser audio must not be constructed while rendering or importing a module.

## What Already Works

`sound-manager.ts` has a named `interface` tone and one shared `AudioContext`. `SoundToggle` already persists the preference and requests the tone when sound is enabled. The visitor provider renders deterministic defaults, then restores storage after hydration. Preserve that sequence.

The missing pieces are selected event mappings, clip support, tracking active playback, and cancelling requests that are still loading or waiting for the audio context. Currently the manager starts work without awaiting `resume()` and returns a synchronous boolean; it cannot reliably report failed playback or stop a tone when muted.

## Decisions for This Implementation

| Interaction or condition | Result |
| --- | --- |
| Fresh visit | Sound off; no audio context or clip download. |
| Enable sound | Persist preference, request existing `interface` confirmation tone. |
| Disable sound | Immediately stop active audio and invalidate pending requests; no confirmation sound. |
| Home/Projects/About activation | Request `uiClick` once, without waiting before navigation. |
| Open profile | Request `uiClick` once, then open normally. |
| Close profile by button, Escape, backdrop, or Collection link | Request `uiClick` once through the shared close handler. |
| Hover, focus, route load, hydration, automatic intro, replay, logo animation | Silent. |
| Reload with sound preference on | Remain silent until an explicit interaction; keep the preference on. |
| Rapid repeated interactions | Newest request replaces the previous request/playback; no stacked sounds or delayed queue. |
| Missing file, failed decode, unavailable/suspended browser audio | Return a failed playback result; interaction still completes. |
| Mute while a clip is loading | Loading may finish and populate the cache, but that cancelled request must never start playing. |
| Reduced motion | No change to sound preference. Motion and sound are separate settings. |

Use **two named sounds**, not two files:

- `interface`: retain the existing synthesized tone as sound-on confirmation, with its current frequency/duration/volume.
- `uiClick`: the owner selected `assets/artifacts/audio clips/wii-ui-click.mp3`, copied to `/audio/ui-click.mp3`, at gain `0.12`. The deployed file is 9,866 bytes and matches the selected source. Listen before finalizing the gain.

Do not deploy the archive wholesale. Explosions, voice clips, jingles, unlock sounds, and page-specific jokes can wait for interactions that justify them. A single quiet click is sufficient for this phase's navigation and profile feedback.

## File Responsibilities

| File | Action and responsibility |
| --- | --- |
| `public/audio/ui-click.mp3` | Create: only the chosen short UI clip. |
| `lib/audio/sound-manager.ts` | Modify: typed registry, lazy loading/cache, asynchronous playback, one active source, cancellation. |
| `lib/audio/use-ui-sound.ts` | Create: consume visitor readiness/mute preference and request named sounds. |
| `components/site/sound-toggle.tsx` | Modify: stop audio on mute and confirm unmute using the next preference. |
| `components/site/site-navigation.tsx` | Modify: request the click sound in link activation handlers. |
| `components/site/visitor-profile.tsx` | Modify: request feedback in explicit open/close handlers. |
| `tests/audio-manager.test.mjs` | Modify: retain small registry/guard checks, await the new API, verify safe stop. |

No new provider, root-layout change, sound preference migration, global event delegation, or universal sound-button component is needed. Later features can consume the same hook without changing this architecture. Godot audio integration remains the playable-build phase's responsibility.

## Review Focus

1. Mute during loading or context resume must prevent late playback. Exercise cancellation in Tasks 2 and 5.
2. Persisted sound-on must not produce sound on hydration or route load. Check Tasks 3 and 5 in a fresh document.
3. Missing/blocked audio must not delay navigation or break dialogs. Check Tasks 2, 4, and 5.
4. One physical action must produce one sound, including keyboard activation and dialog close paths. Check Task 4.
5. Repeated clicks must not pile up sources or downloads. Check cache/source ownership in Task 2 and the browser Network panel in Task 5.

## Task 1: Choose the Clip and Define the Registry

### Learn First: Names Describe Intent

Components should request `uiClick`, not know a file path or volume. The registry connects that name to its sound definition. This lets you swap the click later without touching navigation and profile code.

A **discriminated union** is a TypeScript type with multiple shapes distinguished by one shared property. Here, `kind: "tone"` means frequency settings; `kind: "clip"` means an asset URL and volume. Checking `definition.kind` tells TypeScript which fields are available.

- [ ] **Step 1: Listen to the candidate and copy it into public assets.**

Open `assets/artifacts/audio clips/wii-ui-click.mp3` in your local media player. Listen at a modest system volume. This is the owner's selected source, already copied for this implementation. For reference, the copy command is:

```powershell
New-Item -ItemType Directory -Force public/audio
Copy-Item -LiteralPath 'assets/artifacts/audio clips/wii-ui-click.mp3' -Destination 'public/audio/ui-click.mp3'
```

Use a short, unobtrusive clip without a long tail. You may choose a different source after listening; keep the deployed destination and registry name the same. Avoid introducing a trimming/conversion toolchain just for this small task.

- [ ] **Step 2: Extend the types and registry in `sound-manager.ts`.**

Add `kind: "tone"` to the existing `ToneDefinition`, then define:

**Worked example — types and registry:**

```ts
type ClipDefinition = {
    kind: "clip"
    src: string
    volume: number
}

type SoundDefinition = ToneDefinition | ClipDefinition

export const SOUND_REGISTRY = {
    interface: {
        kind: "tone",
        startFrequency: 620,
        endFrequency: 890,
        durationSeconds: 0.14,
        peakVolume: 0.045,
    },
    uiClick: {
        kind: "clip",
        src: "/audio/ui-click.mp3",
        volume: 0.12,
    },
} satisfies Record<string, SoundDefinition>

export type SoundName = keyof typeof SOUND_REGISTRY
```

Keep the other fields of the existing `ToneDefinition`. Replace the old registry rather than declaring it twice. `SoundName` becomes `"interface" | "uiClick"` automatically, so a misspelled request becomes a TypeScript error.

- [ ] **Step 3: Check the copied asset.**

Start the dev server and visit `/audio/ui-click.mp3` directly. It should load and play when you use the media controls. This verifies the asset path; it does not prove your UI audio manager works yet. No page should request this file automatically.

**Learning checkpoint:** Explain why the archive file lives in `assets/`, while the production URL comes from `public/audio/` and starts with `/audio/`.

## Task 2: Extend Playback and Add Cancellation

### Learn First: Audio Can Finish Loading After the User Changes Their Mind

Web Audio represents the short clip as a decoded `AudioBuffer`. Loading and decoding are asynchronous; a Promise represents the result that will arrive later. Cache the decoded result so each click does not fetch/decode the same file again. [MDN: decoding audio data](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData).

Reuse the audio context and buffer, but create a fresh buffer source for each playback. A buffer source is a one-use playback object. [MDN: AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode).

Cancellation needs a small counter. Each new request or mute increments the counter. A request remembers the value when it started and checks it after waiting. If the values differ, a newer action superseded it. This prevents a delayed sound from playing after you mute.

**Interface only — implement these functions with real bodies:**

```ts
export const playSound = async (
    name: SoundName,
    muted: boolean,
): Promise<boolean> => { /* implement in the steps below */ }

export const stopAllSounds = (): void => { /* implement below */ }

const getSoundBuffer = (
    name: SoundName,
    src: string,
    context: AudioContext,
): Promise<AudioBuffer> => { /* implement below */ }
```

`true` means a source was started, not that the listener's speakers were audible or the clip finished. `false` means unavailable, failed, muted, or superseded. `playSound` must handle expected playback errors internally, so callers do not receive rejected Promises.

- [ ] **Step 1: Add manager-owned resources.**

Keep the existing `sharedContext`. Add `activeSource: AudioScheduledSourceNode | null`, `activeGain: GainNode | null`, a numeric `playbackRevision` initialized to zero, and `Map<SoundName, Promise<AudioBuffer>>` for clip loading. Initialize references to `null` and the map to an empty map; do not construct audio resources at module scope.

`AudioScheduledSourceNode` covers both the tone's oscillator and a clip's buffer source. You only need one active source/gain pair because the UI sound policy is newest-request-wins.

- [ ] **Step 2: Implement `stopAllSounds`.**

Increment `playbackRevision` even when no source is playing: this cancels pending work too. Stop and disconnect the active source, disconnect its gain, then clear the active references. Stopping a source that already finished can throw, so catch that specific cleanup failure. The function should be safe before any context exists and safe to call repeatedly.

Do not close the shared context or clear the decoded-buffer cache on mute. Those resources can be reused after the visitor enables sound again.

- [ ] **Step 3: Implement `getSoundBuffer`.**

Return an existing cached Promise if present. Otherwise, start a fetch for `src`, reject non-OK HTTP responses, read `response.arrayBuffer()`, and decode it with `context.decodeAudioData()`. Cache the Promise immediately so simultaneous requests share the same loading work.

If loading fails, remove that failed Promise from the map before propagating the error to `playSound`. This lets a later deliberate interaction retry. Use an identity check before deleting, so an older failed Promise cannot remove a replacement cache entry.

- [ ] **Step 4: Make `playSound` asynchronous and guard it first.**

Return `false` before constructing resources or fetching when muted, when `window` is unavailable, or when `window.AudioContext` is unavailable. After those guards, call `stopAllSounds()` to replace the previous request, capture the new revision, and lazily create/reuse the context. If an existing context is closed, create a new one.

Call `context.resume()` immediately from this function before its first `await`; callers will invoke it directly from an event handler. Wait for it before starting a source. Browsers may restrict sound until a user interaction, and a remembered preference does not itself authorize autoplay. [MDN: AudioContext.resume](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume), [MDN: autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

- [ ] **Step 5: Load only the selected clip, then reject stale work.**

For a clip definition, begin `getSoundBuffer` after initiating resume and await both together with `Promise.all`. For a tone, only await resume. Starting both promises together attaches error handling to both; do not leave a rejected resume Promise unattended while you wait for a fetch.

**Worked example — cancellation check after asynchronous work:**

```ts
if (requestRevision !== playbackRevision || context.state !== "running") {
    return false
}
```

Here `requestRevision` is the local value captured in Step 4. Perform this check before creating or starting any source. A cancelled fetch can still complete and cache its buffer; it must not start audio.

- [ ] **Step 6: Start the appropriate source and track its cleanup.**

For `kind === "tone"`, retain the existing oscillator frequency sweep, gain envelope, duration, and sine waveform. For `kind === "clip"`, create a buffer source, assign the decoded buffer, set `loop = false`, and set a gain node to the registry's `volume`.

Connect source → gain → context destination. Store the active source/gain before starting it. Stop the oscillator at its existing end time; a buffer source ends naturally. On `ended`, disconnect that source and gain. Only clear the global active references if they still point to this source, so an old completion cannot erase a newer playback.

Return `true` after starting. Wrap playback preparation in `try/catch` and return `false` on failure. In a failure path, stop/clear current resources only if this request still owns the current revision; an old failed fetch must not silence a newer sound. Do not create a background playback queue or retry automatically.

- [ ] **Step 7: Update the small Vitest checks.**

In `tests/audio-manager.test.mjs`, keep the existing registry test and check both entries. Make the playback guard test async and await the results for muted and unavailable-browser calls. Import `stopAllSounds` and check that calling it twice in the Node environment does not throw.

**Worked example — the important guard assertions:**

```js
test("sound playback safely declines when muted or browser audio is unavailable", async () => {
    expect(await playSound("interface", true)).toBe(false)
    expect(await playSound("uiClick", true)).toBe(false)
    expect(await playSound("interface", false)).toBe(false)
    expect(await playSound("uiClick", false)).toBe(false)
})
```

The configured Vitest environment is Node, so browser playback is unavailable here by design. Run `npm test`; expect the updated tests and the existing suite to pass. The actual loading/cancellation race is verified in the browser after wiring the controls.

**Learning checkpoint:** Explain why stopping the current source alone is insufficient when a clip is still loading, and why you reuse the buffer but not its playback source.

## Task 3: Add the UI Hook and Complete the Mute Toggle

### Learn First: Read Existing State Instead of Creating Another Store

The hook is a small adapter between visitor state and the sound manager. It does not own a mute setting; it reads the setting already used by the header. React re-renders its consumers when that preference changes.

`void playSound(...)` starts the asynchronous request without making the UI wait. It is safe here because the manager catches expected errors and resolves a boolean.

- [ ] **Step 1: Create `lib/audio/use-ui-sound.ts`.**

**Worked example — complete hook:**

```ts
"use client"

import { useVisitorState } from "../visitor/visitor-state-provider"
import { playSound, type SoundName } from "./sound-manager"

export const useUISound = () => {
    const { state, ready } = useVisitorState()

    return (name: SoundName) => {
        if (!ready || state.soundMuted) return
        void playSound(name, false)
    }
}
```

This returned function is your `playUI` helper in the next task. No `useEffect`, DOM listener, or storage access belongs here. You do not need `useCallback` because this function is only used by direct event handlers.

- [ ] **Step 2: Update `toggleSound` in `sound-toggle.tsx`.**

Import `stopAllSounds` alongside `playSound`. Keep the existing `ready` guard and `disabled={!ready}`. Calculate `nextMuted`, then:

1. If `nextMuted` is true, call `stopAllSounds()` immediately.
2. Persist `soundMuted: nextMuted` using the existing updater.
3. If `nextMuted` is false, request `void playSound("interface", false)`.

Use the next value, not the old `muted` value. Calling the hook immediately after unmuting would still read the previous render's muted setting; this toggle intentionally calls the manager directly with the known next preference.

Keep the label and `aria-pressed` behavior unchanged. Do not add an effect that plays confirmation whenever stored state changes; that would produce sound on reload.

- [ ] **Step 3: Verify the toggle before adding more events.**

In a fresh private session, confirm the initial page is silent and shows Sound off. Enable sound: one brief tone. Disable sound: silence. Reload with the preference enabled: Sound on, but no automatic tone. Check the console for hydration errors and unhandled Promise rejections.

**Learning checkpoint:** Explain why the sound-on handler uses `nextMuted` and why loading a saved sound preference should not play a sound.

## Task 4: Map Explicit UI Events

- [ ] **Step 1: Add feedback to primary navigation.**

In `site-navigation.tsx`, import `useUISound`, call `const playUI = useUISound()` inside `SiteNavigation`, and add `onClick={() => playUI("uiClick")}` to each existing Link.

Keep hrefs, current-section matching, styles, and accessible labels unchanged. Do not await playback, prevent default navigation, or add a timeout. Native keyboard link activation fires click too; do not add a separate Enter key handler that would play twice. Do not add hover/focus audio.

- [ ] **Step 2: Give the profile a named open handler.**

In `visitor-profile.tsx`, consume the same hook. Replace the trigger's inline state change with `openProfile`: when currently closed, request `uiClick` and call `setOpen(true)`. If already open, do nothing.

- [ ] **Step 3: Route every profile close path through one handler.**

Define `closeProfile`: when currently open, request `uiClick` and call `setOpen(false)`. Use it for `Dialog.onClose`, the Close button, and the existing Collection link click handler. The shared Dialog already forwards Escape and backdrop clicks through `onClose`; do not change the shared Dialog or add a second sound there.

Do not play from an effect watching `open`. Dialog state changes caused by initial render, cleanup, or future programmatic actions should not accidentally become audio events.

- [ ] **Step 4: Listen and verify event counts.**

With Sound on, activate each primary link by mouse and keyboard. Open the profile and close it through each path. Each action should produce one quiet click; interactions remain immediate. Hovering, Tab focus, logo motion, and intro replay remain silent.

Start with gain `0.12`, then adjust the one registry value after listening on desktop and mobile speakers. The click should be lower-key than the sound-on confirmation and should not obscure ordinary use. If the candidate has an unwanted tail, choose another short clip; do not compensate with louder playback.

**Learning checkpoint:** Explain why the shared profile close handler prevents duplicated sound wiring, and why the logo does not need to become a Client Component.

## Task 5: Verify Audio and Close Phase 1

- [ ] **Step 1: Run the existing checks.**

```powershell
npm test
npm run lint
npm run build
npx tsc --noEmit
```

Expected: the updated Vitest suite, lint, build, and typecheck pass. Build before the final standalone typecheck so Next.js route types are current. Then stop the dev server and run `npm run start` to verify production behavior.

- [ ] **Step 2: Check preferences and loading in a real browser.**

| Check | Expected |
| --- | --- |
| Fresh private visit, muted navigation/profile use | No sound, no `/audio/` request, no context created by those actions. |
| Enable sound | One synthesized confirmation; no clip download yet. |
| First navigation/profile activation while enabled | One request for `/audio/ui-click.mp3`, then feedback. Cold loading may delay this first click sound; it never delays the action itself. |
| Repeat interactions and client route changes | Decoded clip reused; no repeated application fetch/decode. |
| Sound on → reload | Preference restored, no automatic playback; later explicit actions may play. |
| Sound off → reload | Preference remains off; actions remain silent. |
| Blocked localStorage | Toggle works for this document; navigation works; no uncaught storage error. Persistence across reload is not expected. |
| Keyboard and touch activation | One sound per action; no dependency on hover. |
| Reduced motion | Existing motion behavior preserved; sound still follows only the audio preference. |

Listen on at least a Chromium browser and, when available, Firefox/Safari and a mobile browser. Browser automation can observe requests and errors, but someone must listen to approve volume and character. A saved preference or a successful API call is not proof that sound is audible on an actual device.

- [ ] **Step 3: Exercise failure and cancellation deliberately.**

Use DevTools request blocking to block `/audio/ui-click.mp3`, then activate navigation/profile while enabled. The action must complete and the manager must return failure internally without an unhandled rejection. Unblock, trigger another action, and confirm a retry can succeed.

For the race check, clear the document's in-memory cache by reloading, enable sound, and throttle the network. Activate a primary navigation link to start the clip request, then immediately mute. This keeps the mute button available; an open modal profile makes background header controls inert. Wait for loading to finish: there must be no late click. Unmute and try again: playback should still work. Repeat with quick sequences of open/close/navigation to verify the newest request wins rather than forming a queue.

Also test an unavailable Web Audio API or blocked playback in browser settings if practical. The UI must remain usable; do not add a warning dialog for optional sound feedback. Inspect the console for unhandled resume/decode failures.

- [ ] **Step 4: Recheck the completed shell.**

Verify fresh homepage intro, Skip, Enter, Replay, profile focus restoration, header navigation, independent logo motion, and the compact layout at 1440, 768, 390, and 320 px. Sound remains silent during intro and does not alter visitor collectibles or equipped cosmetics.

- [ ] **Step 5: Update Phase 1 status after browser/listening approval.**

Add an implementation record here naming the chosen clip, final volume, mappings, checks, and any browser limits. In the master roadmap, check the remaining audio criterion and mark Phase 1 complete only after the owner accepts the result. Review the diff and save a commit if desired; do not stage unrelated work.

## Completion Checklist

- [x] Existing muted-by-default, persistent preference remains the single source of truth.
- [x] Registry has the confirmation tone and one intentionally chosen click clip.
- [x] Playback resources and loading/cancellation stay centralized.
- [x] Muting stops active and pending playback.
- [x] Navigation and profile events each request feedback once and never wait for it.
- [x] No hover/focus, hydration, intro, or background playback was introduced.
- [x] Clip loads lazily and is reused within the document.
- [x] Failure, cold-load cancellation, rapid interaction, keyboard, and touch checks pass.
- [ ] Sound character and volume have been approved by listening.
- [x] Existing tests, lint, build, and typecheck pass.
- [ ] Owner accepts audio and Phase 1 completion is recorded.

After this, the next roadmap phase is the production homepage. Collection rewards, unlock jingles, richer profile equipment, and game audio belong to their later phases.

## Implementation Record — 2026-10-05

- Finished the owner's registry and sound-manager scaffold, preserving the selected click file and gain `0.12`. Corrected the asset URL to `/audio/ui-click.mp3` so interior routes use the same URL.
- Added lazy fetch/decode caching, a shared audio context, single-source playback, cleanup, and revision-based cancellation for loading/resume races. Failed loads are removed from the cache so a later deliberate interaction can retry.
- Added `useUISound` using the existing visitor readiness/preference. Primary navigation and explicit profile open/close handlers request the click once. Enabling sound requests the existing tone; muting stops active/pending work immediately.
- Preserved the header and splash, four-space indentation, profile focus handling, and immediate navigation. No new dependencies or preference keys were added.
- Expanded the small audio suite with repeated-stop safety and a pending-resume cancellation regression. All 20 tests passed, along with lint, production build, and standalone TypeScript checks.
- Production Edge checks used real Web Audio to verify the selected MP3 decodes, muted interactions create no context or download, first clip use loads once, subsequent use reuses the decoded buffer, and saved sound-on restores silently.
- Checked navigation/profile/keyboard/touch event counts, Escape/button/backdrop/Collection close paths, blocked storage, rejected resume, missing-file retry, and mute during delayed loading. No uncaught browser runtime errors were observed.
- Rapid profile open/close checks measured a maximum of one active source and one clip download. Muting stopped the active clip immediately.
- Cold-cache splash regression checks passed: black loading screen until artwork decoded, approximately 3978 ms of playback, cached entry, split entry, and failed-artwork recovery.
- Actual sound character/volume approval, physical devices, and Firefox/Safari verification remain for the owner. No commit or deployment was performed. Phase 1 is not yet marked accepted/complete.
