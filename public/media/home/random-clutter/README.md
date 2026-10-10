# Clutter authoring library

This folder is now a **manual editor palette**. Its historical `random-clutter` path is retained so image URLs remain stable. Adding an image here never places it on the homepage automatically.

Add, replace, or remove images, then run:

```powershell
npm run clutter:generate
```

Generation also runs before `npm run dev` and `npm run build`. Regenerate and refresh Home when swapping files while a dev server is already running.

| Folder | Rendering | Suggested initial width range |
| --- | --- | --- |
| `noise/` | Smooth cutouts | 32–74px |
| `badges/` | Pixel art | 20–38px |
| `sprites/` | Smooth illustrations | 44–110px |
| `pixel-sprites/` | Pixel art | 44–110px |

Subfolders inherit their top-level settings. Static PNG, JPEG, WebP, and AVIF are supported. Transparency is preserved; the generator does not remove backgrounds. GIF/SVG and animations require an explicit curated catalogue record and, where applicable, a reduced-motion still. Export rotated JPEGs without EXIF orientation.

Filenames without extensions become asset IDs. Names must be unique across this palette and the curated catalogue, including case variants. Replacing the same filename preserves its ID and updates measured dimensions. Deleting or renaming a **placed** image requires updating its saved placement; the homepage/build reports a missing ID rather than silently dropping it. Originals in `assets/` remain untouched.

Optional folder defaults and per-image exceptions live in [home-clutter-library.settings.json](../../../../content/home-clutter-library.settings.json). `pixelArt` controls rendering, `family` describes the asset, and `widthRange` suggests its initial editor size. Saved placement width controls the actual composition; there are no runtime size caps or selection pools.

Open Home in development and click **Edit clutter → Add from catalogue**. Select an image, inspect its preview, then Add or Drag new asset. Adjust its semantic anchor, position, width, scale, rotation, local layer, and responsive overrides. Use the whole-record Asset selector to swap an existing object. Export all placements and replace only `HOME_AUTHORED_PLACEMENTS` in [home-clutter.ts](../../../../content/home-clutter.ts). Folder IDs resolve automatically in production; no second manual asset record is needed.

The generated [home-clutter-library.generated.ts](../../../../content/home-clutter-library.generated.ts) is repository output; do not edit it by hand. Only placed assets reach the production renderer. The palette does not add downloads or decoration to the public homepage.

Check generated output without changing it:

```powershell
npm run clutter:generate -- --check
```

Errors identify unsupported files, corrupt images, animations, duplicate IDs, or invalid settings. Failed generation leaves the previous catalogue intact. See [the current authored composition and editing guide](../../../../docs/design/home-clutter-reassessment-2026-10-10/implementation-notes.md).