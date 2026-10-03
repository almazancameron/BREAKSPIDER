# Breakspider Prototype 05

A separate proof of concept built from Prototype 04. It keeps the same personal internet space, native project imagery, sticker navigation, edge clutter, and route-specific rooms while testing a more direct path into the work.

## The visible difference from 04

| Page | Prototype 04 | Prototype 05 |
| --- | --- | --- |
| Home, desktop | A large game capture overlaps the profile window; Projects sits lower to the right; About sits high. | Projects moves up beside the profile and its two real captures become the second anchor. The game capture becomes a small attached artifact; About moves below the work window. |
| Home, mobile | Profile, game capture, About, then Projects. | Profile, Projects, then About. The duplicate game capture leaves the hero so the project evidence appears sooner. |
| Projects | A very large introduction delays the first project. | A smaller introduction brings the Viscap work surface higher. |
| Sketchbook | The title dominates much of the first screen. | The feed starts higher while the title remains oversized and expressive. |

The remaining route changes below test smaller, local fixes. This is one alternate composition for review, not a proposed production layout.

See the [04 → 05 visual comparison](review/README.md) for matching desktop and mobile captures.

## Run

From this directory:

```powershell
npm run dev -- --port 3005
```

Open `http://localhost:3005`. The first-visit splash can be skipped, and `?preview=1` opens the homepage directly. Interior routes also open directly.

## What this version tests

- The home Sketchbook link opens its actual entry, mobile inspection files get more room, and the changelog marks the iteration.
- Viscap shows the selected system beside its desktop directory; the full capture remains below.
- Sketchbook gives mobile posts more reading width and brings entry navigation above the article.
- The Familiar roster gives real creatures priority over unknown slots.
- Collection explains showcase pinning separately from the avatar and reveals mobile item details after selection.
- Mobile Map uses a direct route manifest; desktop keeps the connected graph.
- The ONFF gallery starts with a different build screen so the hero and gallery show distinct evidence.

This prototype intentionally retains sample copy, placeholder identity/contact details, the earlier **Pixel Pugilists** label for ONFF, and unreviewed Viscap captures. It is a visual and interaction study, not final public content or production architecture. Prototype 04 remains in its original directory for comparison.
