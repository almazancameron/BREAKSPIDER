import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function handle(request: Request, saving: boolean) {
    if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
    if (saving && (request.headers.get("origin") !== new URL(request.url).origin || request.headers.get("content-type")?.split(";")[0] !== "application/json")) {
        return reply({ error: "Saving requires a same-origin editor request." }, 403);
    }
    const { readPlacementFile, savePlacementFile, validatePlacements, ClutterSaveError } = await import("../../../../lib/home/clutter-save");
    const path = join(process.cwd(), "content", "home-clutter.ts");
    try {
        if (!saving) return reply(await readPlacementFile(path));
        const text = await request.text();
        if (text.length > 1_000_000) return reply({ error: "Placement data is too large." }, 413);
        let body;
        try { body = JSON.parse(text); } catch { return reply({ error: "Invalid save request." }, 400); }
        if (!body || typeof body.revision !== "string") return reply({ error: "Missing file revision. Reload the editor." }, 400);
        const [{ HOME_CLUTTER_ASSETS }, { HOME_CLUTTER_LIBRARY }] = await Promise.all([
            import("../../../../content/home-clutter"), import("../../../../content/home-clutter-library.generated"),
        ]);
        const placements = validatePlacements(body.placements, [...HOME_CLUTTER_ASSETS, ...HOME_CLUTTER_LIBRARY].map((asset) => asset.id));
        const revision = await savePlacementFile(path, body.revision, placements);
        return reply({ revision });
    } catch (error) {
        return reply({ error: error instanceof ClutterSaveError ? error.message : "Could not save placements. Check the dev server and file permissions; your draft is still available." }, error instanceof ClutterSaveError ? error.status : 500);
    }
}

export async function GET(request: Request) { return handle(request, false); }
export async function POST(request: Request) { return handle(request, true); }
