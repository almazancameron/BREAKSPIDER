# Shared authored clutter

Production renders saved placements only. Development adds the existing drag/numeric editor and folder palette. No random decoration or runtime collision engine exists.

- `pages.ts` is the explicit server-owned page/target/anchor registry.
- `repository.ts` supplies the current page's placements and assets. Production gets only placed assets; development gets the complete existing palette.
- `types.ts` owns shared pose/asset types; `lib/home/clutter-types.ts` is a compatibility export plus Home's anchor union.
- `components/clutter/` owns the shared renderer, draft context, editor and server boundary.
- Existing pure math, catalogue and atomic save helpers under `lib/home/` remain reused with page parameters. Home adapters preserve its accepted file/export and geometry.

## Adding a future room or detail entry

1. Add an empty typed JSON-literal placement array to a fixed file under `content/clutter/`. Use `AUTHORED_PLACEMENTS` as the export; Home and About retain their existing exports.
2. Import that array in `pages.ts` and add a unique ID, canonical pathname, literal repository-relative file path, export name, eligible anchors and placement array. Each Familiar or long Sketchbook entry needs its own registration/file, even though route components are shared.
3. Wrap a simple route in `ClutterPage` with its registered ID. It supplies the `canvas` anchor. For a bespoke room, use `getPageClutter`, `ClutterBoundary`, named `data-clutter-anchor` elements and `ClutterLayer` within each anchor, as About does.
4. Anchor elements need `position: relative` and stable layout geometry. Register specific nested anchors before broader enclosing ones so they win nearest-anchor ties. Functional page content remains ordinary JSX/CSS.
5. Check development opening, Add, drag/manual positioning, Done and reload on the new route. Check production has no authoring UI/downloads and the save endpoint returns 404.

Do not derive paths from request IDs or slugs. New valid content entries require their explicit registration before their page is rendered. Unknown IDs cannot write files. Keeping this finite registry avoids a browser-controlled filesystem API.

## Saving and navigation

GET `/api/dev/clutter?pageId=about` loads the current file/revision; POST carries `pageId`, `revision` and the complete placement set. Omitted IDs retain Home compatibility. Unknown supplied IDs never fall back to Home. The server registry chooses the file and validates the page's allowed anchors.

Done saves four-space records with independent responsive overrides and closes only after success. Copy export names the current page's export/file. Drafts are discarded on reload or route departure; drag listeners and pending requests are cleaned up. A request already accepted by the server can finish writing its originating registered file, never the next route's file. Revision conflicts leave the mounted draft available.

Home's edge offset continues to use its canvas gutter. Other rooms use zero as the edge-offset origin; ordinary anchored X/Y offsets are recommended. Hidden-pose authoring uses the same origin as rendering.
