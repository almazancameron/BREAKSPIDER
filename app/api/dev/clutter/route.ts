import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function handle(request: Request, saving: boolean) {
    if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
    const { isSameOriginJson } = await import("../../../../lib/clutter/request");
    if (saving && !isSameOriginJson(request)) {
        return reply({ error: "Saving requires a same-origin editor request." }, 403);
    }
    const { readPlacementFile, savePlacementFile, validatePlacements, ClutterSaveError } = await import("../../../../lib/home/clutter-save");
    try {
        const { getClutterPage } = await import("../../../../lib/clutter/pages");
        // Only this trusted registry selects filesystem targets. No browser paths.
        if (!saving) {
            const page = getClutterPage(new URL(request.url).searchParams.get("pageId") ?? "home");
            if (!page) return reply({ error: "Unknown clutter page." }, 404);
            return reply(await readPlacementFile(join(process.cwd(), page.file), page.exportName));
        }
        const text = await request.text();
        if (text.length > 1_000_000) return reply({ error: "Placement data is too large." }, 413);
        let body;
        try { body = JSON.parse(text); } catch { return reply({ error: "Invalid save request." }, 400); }
        if (!body || typeof body.revision !== "string") return reply({ error: "Missing file revision. Reload the editor." }, 400);
        const page = getClutterPage(body.pageId === undefined ? "home" : body.pageId);
        if (!page) return reply({ error: "Unknown clutter page." }, 404);
        const [{ HOME_CLUTTER_ASSETS }, { HOME_CLUTTER_LIBRARY }] = await Promise.all([
            import("../../../../content/home-clutter"), import("../../../../content/home-clutter-library.generated"),
        ]);
        const placements = validatePlacements(body.placements, [...HOME_CLUTTER_ASSETS, ...HOME_CLUTTER_LIBRARY].map((asset) => asset.id), page.anchors);
        const revision = await savePlacementFile(join(process.cwd(), page.file), body.revision, placements, page.exportName);
        return reply({ revision });
    } catch (error) {
        return reply({ error: error instanceof ClutterSaveError ? error.message : "Could not save placements. Check the dev server and file permissions; your draft is still available." }, error instanceof ClutterSaveError ? error.status : 500);
    }
}

export async function GET(request: Request) { return handle(request, false); }
export async function POST(request: Request) { return handle(request, true); }
