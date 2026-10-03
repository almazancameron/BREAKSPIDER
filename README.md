# Breakspider

Breakspider is a personal internet space and portfolio built with Next.js, React, and TypeScript. The production app is in `app/`; the original Next.js visual prototype is preserved under `prototype/breakspider-nextjs-prototype/` for reference.

## Local development

Install the locked dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The production pages are currently foundation shells; route-specific visual compositions are implemented in later roadmap phases.

Useful checks:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

`npm test` runs the focused Vitest suite once; `npm run test:watch` reruns tests while you edit. Tests use a Node environment and cover content lookup, persistence, and other important logic. Browser verification at desktop/mobile sizes remains the main check for visual layout, navigation, focus, motion, and interactive flows. Add automated tests selectively where they protect meaningful behavior; broad component coverage is not a launch requirement.

## Project structure

- `app/` contains explicit App Router routes and the shared root layout.
- `components/` contains shared site/UI components and page-specific compositions.
- `content/` contains typed local v0.1 content records.
- `lib/content/repository.ts` is the narrow server-side content access boundary. Pages use its functions; the local implementation can later be replaced by a Supabase implementation without changing those pages.
- `lib/visitor/` owns versioned browser visitor state; components do not access `localStorage` directly.
- `lib/audio/` owns the sound registry and browser audio playback.
- `public/media/` contains only selected production media. Source archives and prototype media remain outside the production public namespace.
- `docs/`, `screenshots/`, and `prototype/` retain design guidance and visual references.

## Deployment

The Phase 0 foundation is deployed to Vercel using the **Next.js** framework preset, `npm ci` for installation, and `npm run build`. No environment variables are required for the static v0.1 foundation. Vercel project/account settings are managed in the Vercel dashboard rather than stored in this repository. Attach the production domain when the site is ready to launch.
