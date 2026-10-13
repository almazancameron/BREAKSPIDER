import { expect, test } from "vitest";
import { getClutterPage, CLUTTER_PAGES } from "../lib/clutter/pages";
import { findNearestAnchor } from "../lib/home/clutter-authoring";
import { validatePlacements, readPlacementFile, savePlacementFile } from "../lib/home/clutter-save";
import { HOME_AUTHORED_PLACEMENTS } from "../content/home-clutter";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("registered pages have separate fixed targets and reject unknown IDs", () => {
    expect(getClutterPage("home")?.file).toBe("content/home-clutter.ts");
    expect(getClutterPage("about")?.anchors).toContain("portrait");
    expect(new Set(CLUTTER_PAGES.map((page) => page.file)).size).toBe(CLUTTER_PAGES.length);
    for (const id of ["../home", "__proto__", "missing", "/about"]) expect(getClutterPage(id)).toBeNull();
    expect(getClutterPage("familiar-ashwing")?.file).not.toBe(getClutterPage("familiar-pebbloq")?.file);
});

test("anchor ties and validation use the selected page's anchors", () => {
    const rect = { left: 0, top: 0, width: 10, height: 10 };
    expect(findNearestAnchor({ x: 0, y: 0 }, [
        { id: "canvas", rect }, { id: "portrait", rect },
    ], ["portrait", "canvas"])?.id).toBe("portrait");
    const record = { ...HOME_AUTHORED_PLACEMENTS[0], anchor: "portrait" };
    expect(validatePlacements([record], [record.assetId], ["canvas", "portrait"])).toEqual([record]);
    expect(() => validatePlacements([record], [record.assetId], ["canvas"])).toThrow();
});

test("About's broad canvas does not win ties against a specific portrait anchor", () => {
    const rect = { left: 0, top: 0, width: 100, height: 100 };
    expect(findNearestAnchor({ x: 20, y: 20 }, [
        { id: "canvas", rect }, { id: "portrait", rect },
    ], getClutterPage("about")!.anchors)?.id).toBe("portrait");
});

test("saving a registered non-Home export preserves Home and surrounding source", async () => {
    const directory = await mkdtemp(join(tmpdir(), "clutter-pages-"));
    try {
        const homePath = join(directory, "home.ts");
        const aboutPath = join(directory, "about.ts");
        const home = await readFile("content/home-clutter.ts", "utf8");
        const source = "// Keep this caption\r\nexport const ABOUT_AUTHORED_PLACEMENTS = [];\r\n// Keep this footer\r\n";
        await writeFile(homePath, home);
        await writeFile(aboutPath, source);
        const initial = await readPlacementFile(aboutPath, "ABOUT_AUTHORED_PLACEMENTS");
        const placements = [{ ...HOME_AUTHORED_PLACEMENTS[0], anchor: "portrait", mobile: { hidden: true } }];
        await savePlacementFile(aboutPath, initial.revision, placements, "ABOUT_AUTHORED_PLACEMENTS");
        expect((await readPlacementFile(aboutPath, "ABOUT_AUTHORED_PLACEMENTS")).placements).toEqual(placements);
        expect(await readFile(homePath, "utf8")).toBe(home);
        const saved = await readFile(aboutPath, "utf8");
        expect(saved.startsWith("// Keep this caption\r\n")).toBe(true);
        expect(saved.endsWith(";\r\n// Keep this footer\r\n")).toBe(true);
        expect(saved).toContain('\r\n    {\r\n        "id":');
        await expect(savePlacementFile(aboutPath, initial.revision, [], "ABOUT_AUTHORED_PLACEMENTS")).rejects.toThrow("changed");
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});
