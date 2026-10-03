---
name: breakspider-design
description: Use when working on Breakspider visual design, frontend implementation, responsive layout, UI review, art direction, decorative clutter, or asset selection, especially when generic frontend guidance could flatten the site's established visual language.
---

# Breakspider Design

Preserve Breakspider as a personal internet space first and a portfolio second: cozy, chaotic, playful, and visibly professional underneath the mess. Use this project overlay alongside generic implementation skills; those govern code quality, while this skill governs art direction.

## Load the relevant guidance

- Always read [references/visual-language.md](references/visual-language.md).
- For layout, breakpoints, overlap, or decorative clutter, also read [references/responsive-and-clutter.md](references/responsive-and-clutter.md).
- For asset selection, prototype reuse, or conflicting sources, also read [references/sources-and-assets.md](references/sources-and-assets.md).
- Inspect the target route, its desktop/mobile screenshots, and its prototype implementation before changing it. For production Next.js work, also follow the repository `AGENTS.md` and the applicable guides in `node_modules/next/dist/docs/`.

## Core contract

- Preserve the visual hierarchy and spatial grammar, not literal prototype coordinates or decoration choices.
- Give desktop an authored, edge-aware field with a clear primary anchor or focal hierarchy, irregular clusters, varied scale and density, selective overlap, and real open space.
- Keep each interior route a distinct room. Share behavior and domain primitives; do not normalize pages into one card grid, section shell, or universal renderer.
- Recompose mobile into an explicit reading order. Reduce clutter and overlap, preserve personality, prevent horizontal overflow, and never gate content behind hover.
- Treat the entire repository `assets/` tree as the curated candidate library. `public/` is only the currently deployed subset.
- Treat Prototype 04 clutter assets and positions as provisional examples of clustering and layering, not a final roster or placement map. Re-curate intentionally from `assets/` for the page and task.
- Keep professional identity, projects, contact, and navigation obvious without discovery. Let optional interactions reward deeper attention.
- Use frames when they explain an object's function or provenance; allow meaningful content to remain frameless.
- Do not interpret polish as simplification. Do not remove asymmetry, density, decorative clutter, unconventional framing, or lively margins merely because a cleaner modern portfolio pattern would be easier to implement.
- Judge clutter by hierarchy, legibility, composition, and responsiveness—not by density alone.

Before handing off, compare the result at relevant desktop and mobile sizes against the screenshots and the rejection checks in the visual-language reference.
