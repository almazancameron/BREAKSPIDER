# Breakspider homepage prototypes

Next.js and TypeScript visual prototypes of the Breakspider homepage. Prototype 02 is the current homepage; Prototype 01 remains available for comparison.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` for Prototype 02 or `http://localhost:3000/prototype-01` for Prototype 01. The shared splash runs on first entry, waits for **Enter**, then splits open to reveal the homepage. The browser remembers entry across visits; use **Replay intro** in the footer to watch it again. `?preview=1` opens either homepage directly for visual review.

Prototype 02 has its own canvas, styling, and interactions. The Spotlight, project windows, visitor profile, mute control, Familiar shuffle, found Map, and inspectable files are interactive. Mobile turns the file pile into a swipeable strip. Secondary routes are deliberately small local stubs so the homepage can be evaluated without building the full site. No account, CMS, analytics, or backend is included.

The selected art lives in `public/media/`. The original source files are in `assets/`, and the reused logo animation source is in `prototype/logo-animation/`. The supplied asset curation document describes many additional candidates; this prototype uses only the few needed for its composition.

Run `node tools/capture-prototype-02.mjs` while the site is serving on port 3000 to save Prototype 02 desktop and mobile screenshots in `screenshots/`. The script also checks the splash, key interactions, and the Prototype 01 route. `tools/capture-prototype.mjs` is the original Prototype 01 capture script. Both use an installed local Chrome and need no extra npm package.
