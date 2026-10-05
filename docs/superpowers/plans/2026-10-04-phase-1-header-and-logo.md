# Phase 1 Header and Logo Animation Implementation Plan

**Status: Complete and accepted by the owner (2026-10-04).** Includes the later shorter-header adjustment and independent logo-half animation. [Audio](2026-10-04-phase-1-audio.md) was subsequently completed and accepted on 2026-10-05, completing Phase 1. The next roadmap phase is the production homepage. Task checkboxes below remain tutorial checkpoints; the completion checklist records the delivered work.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans if the owner later requests implementation. Steps use checkbox syntax for tracking. The current execution method is **manual implementation by the owner**; this document does not request agent implementation or delegation.

**Goal:** Finish the shared header using the approved prototype's desktop/mobile arrangement, add accurate current-section navigation, and give the logo a short hover/focus/click reaction.

**Architecture:** Keep `SiteHeader` as a Server Component that arranges the existing visitor controls, a small client navigation component, and a server-rendered logo link. CSS owns layout and logo motion. Existing visitor state, profile dialog, sound preference, and splash remain with their current owners.

**Tech Stack:** Installed Next.js 16.3.6, React 19.2.8, TypeScript, CSS Modules, existing Vitest configuration. No new dependencies.

**Spec:** [Master roadmap, Phase 1](../../breakspider_master_implementation_roadmap_v2.md#7-phase-1--splash-global-shell-and-shared-ui), [prototype reuse map](../../breakspider_prototype_reuse_map.md), [vector handoff](../../breakspider_vector_graphics_handoff.md). Visual references: `prototype/breakspider-nextjs-prototype/components/HomePrototype04.tsx` and `HomePrototype04.module.css`, plus `screenshots/prototype-04-desktop-1440x900.png`, `prototype-04-middle-768x900.png`, and `prototype-04-mobile-390x844.png`.

**Learning format:** Each task explains the idea before the edits. Read a task first, then start changing files at its **Step 1**. Code blocks labeled **worked example** can be used directly; explanations and behavior tables are instructions, not missing function implementations. All new exported components can use your preferred arrow-function style. Existing unrelated components do not need a style rewrite.

**Implementation update (2026-10-04):** The owner implemented the navigation component and connected it to the header. At the owner's request, Codex completed the remaining layout, control styling, logo animation, and browser verification in the existing workspace. The tutorial steps below remain available for learning; the implementation record at the end describes what was verified.

**Verification approach:** Browser verification is required. Use the existing Vitest suite as a regression check; this plan requires no new unit tests, snapshots, component testing setup, or coverage target. Most of the new behavior is CSS, browser focus, and route presentation, which you can verify directly.

## Global Constraints

- The header includes Home, Projects, About, visitor avatar/profile, persistent sound toggle, and Breakspider identity/logo.
- “The static Breakspider logo should have a smaller hover/click animation related to the splash animation.”
- “header behaves correctly on desktop and mobile” and “keyboard/focus behavior is reasonable at low implementation cost”.
- Keep primary navigation obvious; all three links stay visible on mobile.
- Use `/projects/one-night-familiar-fight` as the canonical ONFF project URL.
- Keep the completed splash behavior, persistence, loading protections, and Replay intro intact.
- Audio event mapping and new sound effects remain separate work. Reuse the existing sound toggle and its persistence.
- Read the installed Next.js guides before writing code: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `01-app/03-api-reference/04-functions/use-pathname.md`.

## What You Are Building

| Area | Decision |
| --- | --- |
| Wide desktop | Profile and sound on the left; sticker navigation centered; status text and logo on the right. |
| Narrow desktop/tablet | Controls and identity on row one; navigation centered on row two. |
| Mobile | Same two-row arrangement, smaller logo and spacing, three equally sized navigation links. |
| Header position | Normal document flow, matching the final Prototype 04 overrides. No sticky toolbar. |
| Active navigation | Home matches `/` exactly; Projects matches `/projects` and its descendants; About matches `/about` and its descendants. Other sections have no primary link selected. |
| Status copy | `PERSONAL INTERNET SPACE`. Omit the prototype's `currently online` claim; there is no real presence system. |
| Logo hover/focus | One 450 ms tension-and-settle movement per interaction, followed by the normal static logo. |
| Logo press/click | A small immediate pressed pose; releasing settles it. The link navigates Home immediately. |
| Reduced motion | Static logo and navigation, with visible focus/active styling retained. |

The logo reaction is a restrained visual echo of the splash's recoil: a small rigid nudge and rotation of the final lockup. It does not reproduce the web's four-second loading/snap sequence or independently animate the spider. That keeps this first implementation small and avoids changing the approved artwork or adding more loading coordination.

## Translate the Prototype Deliberately

| Kind | What to use |
| --- | --- |
| Reusable behavior | Existing profile dialog/focus handling, sound toggle, visitor persistence, Next.js links. |
| Reusable visual infrastructure | Shared color/focus tokens, header layout, navigation sticker silhouettes. |
| Content/data | Existing `PRIMARY_NAVIGATION`; fixed status copy and logo label. |
| Configuration | Named Home/Projects/About CSS classes and explicit layout breakpoints. |
| Composition | Only the global header arrangement. Homepage content and clutter stay in Phase 2. |
| Prototype scaffolding to discard | Hard-coded Home active state, fake online status, duplicate historical CSS rules, preview-only profile state, old mobile menu code, direct prototype audio calls. |

The prototype CSS contains multiple generations of header rules. The later overrides around the comment `The logo strip is the navigation surface` define the approved arrangement. Read those; do not paste the entire stylesheet.

## File Responsibilities

| File | Action and responsibility |
| --- | --- |
| `components/site/site-header.tsx` | Modify: compose left controls, navigation, and right identity. |
| `components/site/site-header.module.css` | Modify: header grid, spacing, status, responsive layout. |
| `components/site/site-navigation.tsx` | Create: read pathname and render current-section links. |
| `components/site/site-navigation.module.css` | Create: sticker backgrounds, link sizes, focus/current states. |
| `components/site/header-logo.tsx` | Create: semantic Home link with the existing final SVG. |
| `components/site/header-logo.module.css` | Create: reserved logo dimensions and CSS micro-animation. |
| `components/site/sound-toggle.module.css` | Modify: compact header presentation without changing sound behavior. |
| `components/site/visitor-profile.module.css` | Modify only the profile trigger if needed; preserve dialog styles. |
| `lib/site/navigation.ts` | Modify: remove the obsolete Pixel Pugilists entry; preserve canonical ONFF and primary links. |
| `public/media/navigation/` | Create directory containing three approved navigation SVGs. |

You should not need to edit `app/layout.tsx`: it already renders `SiteHeader` globally. Do not edit the splash files or logo generator for this plan.

## Review Focus

1. Direct loads, client navigation, and Back/Forward must update the current section correctly. Check in Task 1 and Task 4.
2. At 320 px and intermediate widths, every navigation link, profile button, and sound button remains accessible without horizontal page overflow. Check in Task 2 and Task 4.
3. Touch, keyboard focus, and reduced motion preserve navigation without waiting for animation. Check in Task 3 and Task 4.
4. Profile opening/closing, focus restoration, and sound preference survive the layout changes. Check in Task 2 and Task 4.
5. Cold first visits, replay, and no-JavaScript navigation preserve the completed splash and usable static header. Check in Task 4.

## Task 1: Build the Navigation Links

**Files:** Create `components/site/site-navigation.tsx`, `components/site/site-navigation.module.css`, and the navigation asset directory; modify `lib/site/navigation.ts` and `components/site/site-header.tsx`.

### Learn First: A Small Client Component

The header is currently a Server Component. It can render Client Components such as the existing profile and sound buttons without becoming a Client Component itself.

Current-section styling needs `usePathname()`, a Next.js client hook. Put that hook in `SiteNavigation`, beginning the file with `"use client"`. This keeps the browser-specific responsibility in one small component. Client Components still have initial server-rendered HTML; this directive does not make your links disappear until JavaScript loads.

`usePathname()` returns the path without the query string or hash. `/projects?filter=games` still produces `/projects`. The root needs an exact match because every path starts with `/`. Descendants need a slash boundary so `/projects-old` does not incorrectly select Projects.

- [ ] **Step 1: Copy the three approved sticker assets.** This is the first file-changing step.

Run in the repository root with PowerShell:

```powershell
New-Item -ItemType Directory -Force public/media/navigation
Copy-Item prototype/breakspider-nextjs-prototype/public/media/p03-nav-home.svg public/media/navigation/home.svg
Copy-Item prototype/breakspider-nextjs-prototype/public/media/p03-nav-projects.svg public/media/navigation/projects.svg
Copy-Item prototype/breakspider-nextjs-prototype/public/media/p03-nav-about.svg public/media/navigation/about.svg
```

These are decoration behind real link text, so CSS backgrounds are appropriate. The background does not need alt text; the link itself says Home, Projects, or About.

- [ ] **Step 2: Remove the obsolete project entry from `lib/site/navigation.ts`.**

Delete the `SITE_LINKS` entry labeled `Pixel Pugilists` whose href is `/projects/pixel-pugilists`. Keep the existing `One Night Familiar Fight` entry at `/projects/one-night-familiar-fight`. Keep Home, Projects, and About marked `primary: true`. This fixes an existing stale shared-navigation entry without introducing aliases or changing routes.

- [ ] **Step 3: Create `SiteNavigation` with the route matching rule.**

**Worked example — complete component:**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PRIMARY_NAVIGATION } from "../../lib/site/navigation"
import styles from "./site-navigation.module.css"

const linkStyles: Record<string, string> = {
    "/": styles.home,
    "/projects": styles.projects,
    "/about": styles.about,
}

export const SiteNavigation = () => {
    const pathname = usePathname()

    return (
        <nav className={styles.navigation} aria-label="Primary navigation">
            {PRIMARY_NAVIGATION.map((link) => {
                const current = link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`)

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.link} ${linkStyles[link.href]}`}
                        aria-current={current ? (pathname === link.href ? "page" : "location") : undefined}
                    >
                        {link.label}
                    </Link>
                )
            })}
        </nav>
    )
}
```

`Record<string, string>` describes a mapping from paths to CSS class names. It is a TypeScript type, not a function you need to implement. `key` lets React identify each link across renders. `aria-current="page"` identifies the exact destination; `"location"` identifies the containing section on a project detail page. `undefined` omits the attribute from inactive links.

- [ ] **Step 4: Give the links their sticker appearance.**

In `site-navigation.module.css`, define `.navigation`, `.link`, `.home`, `.projects`, and `.about`. Start with these concrete values, then compare with the reference:

| Property | Starting value |
| --- | --- |
| Navigation layout | `display: flex; align-items: center; gap: 4px` |
| Desktop link size | `width: 148px; min-height: 54px` |
| Label alignment | `display: grid; place-items: center` |
| Link font | `900 15px/1 Verdana, Arial, sans-serif` |
| Background | `center / 100% 100% no-repeat`, using `/media/navigation/home.svg`, `projects.svg`, or `about.svg` |
| Text colors | Home `#211a1d`, Projects `#142630`, About `#342520` |
| Drop shadows | Home `3px 4px 0 #996183`, Projects `3px 4px 0 #427f79`, About `3px 4px 0 #a76545` |
| Current section | Underline label with `text-underline-offset: 4px`, for both `[aria-current="page"]` and `[aria-current="location"]` |
| Hover | Small `translateY(-3px)` inside a fine-pointer hover media query |
| Focus | Keep the global visible outline; add the same small lift for `:focus-visible` |

Keep the link's background color transparent so a rectangle does not fill the space around the sticker silhouette. Avoid clipping the link with `clip-path`: that can clip its keyboard outline too. The SVGs are small local production assets; confirm that all three load during browser verification.

Give `.link` `text-decoration: none` initially, then add the current underline rule afterward. Use `transition: transform var(--motion-fast)` and explicitly remove transforms/transitions under reduced motion. Keep transforms on hover separate from the permanent current-section indication.

- [ ] **Step 5: Replace the old `<nav>` in `SiteHeader` with `<SiteNavigation />`.**

Import the new component. Remove `PRIMARY_NAVIGATION` and `Link` imports from the header only if no remaining header markup uses them. Keep its current brand and controls for now; Task 2 changes the arrangement.

- [ ] **Step 6: Verify before continuing.**

Run `npm run dev`, open the site, and skip the intro if needed. Visit Home → Projects → ONFF detail → About → Sketchbook, then use Back and Forward. Home is selected only on Home, Projects stays selected on its detail pages, About selects on About, and Sketchbook selects none. The sticker backgrounds should load without 404s. The mobile layout is completed next.

**Learning checkpoint:** Explain why `pathname.startsWith("/")` would select Home on every route, and why this hook belongs in the navigation component rather than the whole header.

## Task 2: Arrange the Header at Desktop and Mobile Sizes

**Files:** Modify `site-header.tsx`, `site-header.module.css`, `sound-toggle.module.css`, and, if needed, the profile trigger rule in `visitor-profile.module.css`.

### Learn First: Structure Versus Appearance

JSX describes the groups; CSS Grid places those groups. You do not need different React markup for mobile. The same controls and links can move from one row to two rows using media queries. This avoids duplicate buttons, duplicate profile state, and hidden navigation variants.

Use three header groups in DOM order: **controls → navigation → identity**. On mobile, CSS places identity beside controls and navigation below them. Keyboard order stays controls → links → logo; CSS placement does not change DOM order. Do not try to rearrange Tab order with positive `tabIndex` values.

- [ ] **Step 1: Rearrange `SiteHeader` into three groups.**

Keep the exported `SiteHeader` component; it may remain a function declaration or become an arrow function if you prefer. Its returned structure should be:

```text
header.header
  div.controls
    VisitorProfile
    SoundToggle
  SiteNavigation
  div.identity
    span.status: PERSONAL INTERNET SPACE
    existing Home logo link
```

Move the existing logo link into `.identity`, remove its old status child, and put that copy in the sibling `.status` span. Keep its image dimensions and accessible Home label. Task 3 extracts that link. Keep `VisitorProfile` and `SoundToggle` as their existing components; do not move their state or storage logic into the header.

- [ ] **Step 2: Replace the header's old layout rules.**

Use `display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr)` on `.header`, with `align-items: center`, `gap: 16px`, `min-height: 100px`, and `padding: 4px 24px`. Use the existing surface/text tokens and a dashed bottom border. Give the header `position: relative`; do not retain or introduce sticky positioning.

`minmax(0, 1fr)` allows side columns to shrink rather than letting their contents force page overflow. Set `min-width: 0` on `.identity`; make controls and identity flex rows. Start with a 22 px gap between controls, a 14 px identity gap, and `.identity { justify-self: end }`. Style `.status` with the mono font, muted color, 9 px text, and modest letter spacing.

Remove old `.navigation` rules from this file; the navigation component now owns them. Remove obsolete `.brand` rules when Task 3 replaces the brand link.

- [ ] **Step 3: Add a two-row layout at `max-width: 76.25rem` (1220 px).**

This is a header-specific early layout change, matching the prototype's need for more room. Keep the repository's 47.5rem threshold for the compact mobile adjustments in the next step.

Use two columns, `minmax(0, 1fr) auto`. Place `.controls` in column 1, row 1; `.identity` in column 2, row 1. In the navigation's own stylesheet, give `.navigation` `grid-column: 1 / -1`, `grid-row: 2`, and `justify-self: center` at this same threshold. Set links to 126 px wide and at least 44 px high. Use flexible rows, a minimum header height around 108 px, and 18 px horizontal padding.

Do not set a rigid maximum height: text zoom should be able to increase the header's height.

- [ ] **Step 4: Add compact rules at `max-width: 47.5rem` (760 px).**

Use 8–10 px horizontal header padding, smaller group gaps, and a 128 px wide logo. Hide `.status` at this width to reserve room for actual controls. In the navigation stylesheet, set `.navigation` to `width: 100%`, links to `flex: 1; min-width: 0; width: auto`, and font size to 12 px. Keep each link at least 44 px tall.

The prototype includes tiny status text on mobile; this plan omits it for readable controls at 320 px. Do not hide Home, Projects, About, sound, or profile.

- [ ] **Step 5: Make the existing controls fit the new header.**

In `sound-toggle.module.css`, use a transparent background, compact padding, no heavy box border, and `min-height: 44px; min-width: 44px`. Keep the disabled and focus styles. At compact widths, hide only the text span with `.toggle span:last-child { display: none }`. The icon remains visible and the existing `aria-label` still announces both state and action. Check that the file contains the intended `◌` / `♫` glyphs if your editor displays garbled characters.

For the profile trigger, use a minimum 44 × 44 px target and centered content. The existing avatar is 46 px by default and can remain that size; avoid changing `VisitorAvatar` globally just to fit the header. Keep the badge clear of neighboring controls. Do not modify profile-dialog layout or logic here.

- [ ] **Step 6: Verify the layout and existing behavior.**

Check 1440, 1920, 1220, 1000, 768, 760, 390, and 320 px widths. Around the two thresholds, resize slowly and look for collisions. The wider header has one row; the narrower header has two. Labels remain centered on stickers, and controls do not overlap the logo.

Open the profile, close with Escape, and confirm focus returns to its button. Toggle sound on, navigate, and reload: its preference remains. Toggle it off again. In the browser console, check horizontal overflow with:

```js
document.documentElement.scrollWidth > document.documentElement.clientWidth
```

Expected: `false` on each reviewed route/width. If true, find the overflowing element rather than adding `overflow-x: hidden` to conceal it.

**Learning checkpoint:** Explain what each of the three header groups owns, and why repositioning those groups should not require new visitor or audio state.

## Task 3: Add the Logo's Small Animation

**Files:** Create `header-logo.tsx` and `header-logo.module.css`; modify `site-header.tsx` and remove its old brand styles.

### Learn First: CSS Can Own an Interaction

Not every interaction requires React state. CSS knows when a link is hovered, focused through the keyboard, or being pressed. These states are `:hover`, `:focus-visible`, and `:active`.

A CSS keyframe animation describes poses over time. A transition eases a property from its previous value to its next value. Here, keyframes handle the brief hover/focus wobble; a transition handles the pressed pose and release. There are no timers, animation messages, or completion handlers to implement.

Only the image moves. The surrounding link stays still, keeping the pointer target and focus outline stable. Keep the final SVG intact; do not stretch individual lettering paths, rebuild assets, or put the splash iframe into the header.

- [ ] **Step 1: Extract the logo link into `HeaderLogo`.**

**Worked example — complete component:**

```tsx
import Image from "next/image"
import Link from "next/link"
import styles from "./header-logo.module.css"

export const HeaderLogo = () => {
    return (
        <Link className={styles.logo} href="/" aria-label="Breakspider home">
            <Image
                src="/media/branding/breakspider-logo.svg"
                alt=""
                width={1600}
                height={820}
                className={styles.artwork}
            />
        </Link>
    )
}
```

The link supplies its accessible label; the image's empty alt avoids repeating it. The dimensions reserve the image's aspect ratio before it loads. This component has no hooks or JavaScript event handlers, so it does not need `"use client"`. Keep normal image loading; this small header mark does not need to compete with future homepage hero media for preload priority.

- [ ] **Step 2: Replace the old logo link with `<HeaderLogo />`.**

Import it into `SiteHeader`. Remove the header's now-unused `Image` and `Link` imports and obsolete brand rules. Keep the sibling status span in `.identity`.

- [ ] **Step 3: Reserve the logo's display space.**

In `header-logo.module.css`, use `.logo { display: flex; align-items: center; width: 210px; min-height: 44px; flex: none }`. Give `.artwork` `display: block; width: 100%; height: auto; transform-origin: 50% 65%`. Set logo width to 172 px below 76.25rem, then 128 px below 47.5rem. Leave space around the SVG for the motion and web strokes. Do not clip the image or focus outline.

- [ ] **Step 4: Define the tension-and-settle keyframes.**

**Worked example — keyframes only, ready to add to the stylesheet:**

```css
@keyframes logoSettle {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-2px) rotate(-1.5deg); }
    55% { transform: translateY(1px) rotate(1deg); }
    80% { transform: translateY(-0.5px) rotate(-0.4deg); }
}
```

Percentages are positions within the 450 ms timeline, not delays in seconds. The final pose matches the first, so there is no stuck tilted logo. Start with these values; reduce them if the thin web becomes distracting at header size.

- [ ] **Step 5: Connect hover and keyboard focus to those keyframes.**

Use `.logo:hover .artwork { animation: logoSettle 450ms ease-out }` inside `@media (hover: hover) and (pointer: fine)` so touch devices do not acquire a lingering hover reaction. Outside that query, apply the same animation to `.logo:focus-visible .artwork`.

The default animation count is one. It will finish while the pointer remains over the link; leaving and entering again starts another run. Focusing with Tab also starts one run. Do not use `infinite` or a permanently tilted `forwards` ending.

- [ ] **Step 6: Add the pressed pose without delaying navigation.**

Give `.artwork` `transition: transform 120ms ease-out`. After the hover/focus rules, add `.logo:active .artwork` with `animation: none` and `transform: translateY(1px) rotate(0.5deg)`.

The later rule overrides a currently running hover animation while the link is pressed. On release, its ordinary pose/hover styling takes over. Hover or focus may start a fresh settle run after release; that is fine. Normal clicks, taps, Enter, Ctrl/Cmd-click, and middle-click must retain normal link behavior. Do not add `preventDefault`, a timeout, or a click handler that waits for motion.

- [ ] **Step 7: Explicitly disable decorative motion for reduced motion.**

At the end of this stylesheet, under `@media (prefers-reduced-motion: reduce)`, target `.artwork`, `.logo:hover .artwork`, `.logo:focus-visible .artwork`, and `.logo:active .artwork`; set `animation: none; transition: none; transform: none`.

Keep the visible focus outline on the link. Add the equivalent no-transform/no-transition override for navigation link hover/focus rules in its stylesheet. The global stylesheet already shortens animations, but these explicit overrides eliminate the decorative movement entirely.

- [ ] **Step 8: Verify the actual interactions.**

Hover the logo, let it finish, leave, and hover again. It should run once per entry, remain legible, and settle. Tab to it and confirm both the outline and small reaction. Click or tap from About: Home should open immediately. On Home, press/release to see the brief pressed reaction. Enable reduced motion in your browser's rendering tools or OS settings: the logo stays still while clicks and focus continue working.

**Learning checkpoint:** Explain why the logo can stay a Server Component even though it moves on hover, and why the image animates instead of its link container.

## Task 4: Verify and Finish Your Implementation

**Files:** No new files required. Fix only issues found in the preceding tasks.

- [ ] **Step 1: Run the existing project checks.**

```powershell
npm test
npm run lint
npm run build
npx tsc --noEmit
```

Expected: the existing Vitest suite passes, lint succeeds, the production build succeeds, and TypeScript reports no errors. Run the build before the standalone typecheck so generated Next.js route types are current. Do not add superficial tests that merely assert your JSX or CSS text.

- [ ] **Step 2: Repeat the browser checks against the production build.**

Stop the dev server, then run `npm run start`. Check desktop and mobile arrangements again. Review at 1440 × 900, 1920 × 1080, 768 × 900, 390 × 844, and 320 × 568, including 200% zoom on desktop. Browser verification should cover the behavior table below, not just a screenshot of Home.

| Scenario | Expected result |
| --- | --- |
| Home → project detail → About → Back/Forward | Current-section indication follows the actual route. |
| `/projects/one-night-familiar-fight?source=header` | Projects selected; no old Pixel Pugilists link remains in shared navigation. |
| Sketchbook, Familiars, Collection, Map, playable route | Header renders; no unrelated primary link is marked current. |
| Tab/Shift+Tab through header | Every action is reachable, focus visible, no positive tabindex or trap. |
| Profile open → Escape | Dialog closes and focus returns to the profile button. |
| Sound on → navigate → reload → off | Preference persists; no new audio or autoplay behavior. |
| Logo hover, Tab focus, click, touch | Short reaction, immediate Home navigation, stable pointer target. |
| Reduced motion, including toggling it while hovering | Decorative movement stops; controls and selection remain understandable. |
| 320 px width and 200% zoom | Controls and labels remain usable; no horizontal page overflow. |
| Fresh incognito visit with cache disabled | Black first frame → intro; no homepage or final-splash flash reintroduced. |
| Skip, Enter, Replay intro | Existing behavior and focus restoration remain intact. |
| JavaScript disabled, direct visit to About | Header links and static identity render and navigate; CSS motion works unless reduced motion is requested. Dynamic profile/audio controls are outside this fallback check. |
| Slow logo image load | Reserved image dimensions keep the header stable; the labeled Home link is still present. |

Use DevTools Network/Console to check that the three sticker assets and final logo load, there are no hydration warnings, and hovering the header never requests `/intro/logo-animation/index.html`. That document belongs to the splash only.

- [ ] **Step 3: Compare with the approved screenshots.**

Compare the desktop header and mobile two-row composition with the referenced captures. Look for sticker silhouette, center alignment, clear visitor controls, logo scale, and the dashed divider. It is expected that mobile status text is omitted and online status is absent. Preserve those explicit plan decisions unless you intentionally revise them.

- [ ] **Step 4: Save a checkpoint when satisfied.**

Review your diff and ensure only planned files changed. Commit your work if that is your normal workflow. Do not stage unrelated edits accidentally. UI sound selection/mapping is covered by the separate, now-complete audio plan; full collectible/profile equipment remains Phase 9.

## Completion Checklist

- [x] Approved header arrangement is implemented on desktop and mobile.
- [x] Home, Projects, and About links work and identify the current page/section.
- [x] Existing profile and sound controls still work and retain persistence/focus behavior.
- [x] Logo has a brief hover/focus reaction and a press reaction with immediate Home navigation.
- [x] Reduced motion removes decorative movement.
- [x] Completed splash behavior passes regression browser checks.
- [x] Existing tests, lint, build, and typecheck pass.
- [x] No new dependencies, animation iframe in the header, or duplicate visitor/audio state were introduced.

This completes the header and logo portion of Phase 1. With splash and audio also accepted, all of Phase 1 is complete. Homepage, profile equipment, and Collection implementation belong to later phases.

## Implementation Record — 2026-10-04

- Preserved the owner's navigation sticker assets, custom shadow colors, route matching, and current-link underline. Added responsive sizing to that stylesheet.
- Completed the three-group header with visitor controls on the left and identity on the right. Navigation moves to a second row at 1220 px; compact rules apply at 760 px. Status copy disappears on mobile to reserve control space.
- Added `HeaderLogo` as a small Server Component with CSS hover/focus settle motion, a pressed pose, and explicit reduced-motion overrides. The link navigates immediately.
- Browser verification uncovered the Projects page prefetching `/projects/pixel-pugilists`, a retired public route. `content/projects.ts` had two records for the same game. Consolidated them into the richer existing record, retaining its internal ID, media, and relationships, with canonical slug/title `one-night-familiar-fight` / `One Night Familiar Fight`. Updated the existing repository test to expect the two real projects and reject the retired slug.
- Final checks: all 18 Vitest tests passed; lint, production build, and standalone TypeScript check passed.
- Verified in production with headless Edge at 1920, 1440, 1221, 1220, 1000, 768, 761, 760, 390, and 320 px: no horizontal overflow, usable control targets, and the intended one/two-row layout.
- Verified route selection through client navigation, direct project detail entry, and Back/Forward; no primary link selected on Sketchbook, Familiars, Collection, Map, or the playable route.
- Verified profile Escape/focus restoration, sound persistence across reload, keyboard logo focus/outline, hover/settle, desktop press, mobile touch navigation without lingering hover, and reduced motion.
- Verified no-JavaScript primary navigation on an interior route and no splash iframe downloads during normal header navigation.
- Re-ran the splash's cache-disabled asset-delay check: it stayed black while SVG decoding was blocked, then played the full animation for approximately 3981 ms. Cached playback, split entry, and failed-artwork recovery also passed.
- Screenshots were reviewed at desktop and mobile sizes. Other browser engines, physical devices, and actual 200% browser zoom were not exercised in this verification; include them in the later responsive/browser pass.
- No commit or deployment was performed. UI sound mapping was subsequently completed under the separate audio plan and accepted on 2026-10-05.

### Follow-up: Shorter Header

At the owner's request, reduced vertical padding and row gaps, lowered the header's minimum heights, and resized the logo from 210/172/128 px to 176/144/112 px at desktop/tablet/mobile. Control targets remain at least 44 px. The production build and the browser checks across all ten widths passed again, including focus, navigation, persistence, and reduced motion.

### Follow-up: Independently Moving Logo Halves

At the owner's request, replaced the whole-logo wobble with opposite 500 ms pull/recoil/settle animations for BREAK and SPIDER. This supersedes Task 3's original single-image motion example.

`HeaderLogo` now places two copies of the existing final SVG in a reserved 1600:820 stage. Each copy is clipped to one side of the original x = 750 split: `750 / 1600 = 46.875%`. The left clip removes the right 53.125%; the right clip removes the left 46.875%. Both images retain the full canvas dimensions, so they stay aligned rather than being squeezed into half-width images. Transforming each clipped group keeps its wordmark, web, and any attached spider together. The SVG URL is shared, so this adds no new asset downloads or splash iframe.

The link and focus outline stay stationary; only the clipped artwork moves. Hover and keyboard focus run the animation once, press gives each half an opposite pose, and navigation remains immediate. Reduced motion removes both halves' animation and transforms. Header dimensions remain unchanged.

Production build and lint passed. Browser checks passed for independent transforms, settling, keyboard focus, reduced motion, desktop press, and mobile tap navigation. Resting screenshots at 1440, 768, 390, and 320 px matched the original lockup within minor raster antialiasing: only a handful of pixels differed, with a maximum RGB channel difference of 3/255. No browser runtime errors were observed.
