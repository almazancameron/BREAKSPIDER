import { expect, test } from "vitest";
import { HOME_AUTHORED_PLACEMENTS } from "../content/home-clutter";
import {
    ANCHOR_ORDER, ANCHOR_POINTS, anchorPointPosition, clonePlacements,
    distanceToRect, exportPlacements, findNearestAnchor, findNearestAnchorPoint,
    patchPlacementPose, resetPlacementOverride, toAnchorOffset, validateNumber,
} from "../lib/home/clutter-authoring";
import { resolveClutterPose } from "../lib/home/clutter-placement";

const rect = { left: 100, top: 200, width: 300, height: 150 };

test("rectangle distance uses the nearest edge, including interiors and corners", () => {
    expect(distanceToRect({ x: 110, y: 220 }, rect)).toBe(0);
    expect(distanceToRect({ x: 97, y: 196 }, rect)).toBe(5);
    expect(findNearestAnchor({ x: 99, y: 201 }, [
        { id: "about", rect: { left: 70, top: 180, width: 10, height: 10 } },
        { id: "spotlight", rect },
    ])?.id).toBe("spotlight");
    expect(findNearestAnchor({ x: 0, y: 0 }, [])).toBeNull();
});

test("ties use the explicit nine-anchor order regardless of DOM order", () => {
    const anchors = [...ANCHOR_ORDER].reverse().map((id) => ({ id, rect }));
    expect(ANCHOR_ORDER).toEqual(["spotlight", "about", "projects", "current", "sketchbook", "familiar", "changelog", "map", "pile"]);
    expect(findNearestAnchor({ x: 100, y: 200 }, anchors)?.id).toBe("spotlight");
    expect(findNearestAnchor({ x: 100, y: 200 }, anchors.slice(0, 2))?.id).toBe("map");
});

test("all five point offsets round-trip at nonzero client origins", () => {
    for (const point of ANCHOR_POINTS) {
        const center = { x: 412.5, y: 342.25 };
        const origin = anchorPointPosition(rect, point);
        const offset = toAnchorOffset(center, rect, point);
        expect({ x: origin.x + offset.x, y: origin.y + offset.y }).toEqual(center);
        expect(findNearestAnchorPoint(origin, rect)).toBe(point);
    }
    expect(toAnchorOffset({ x: 412, y: 342 }, rect, "bottom-right")).toEqual({ x: 12, y: -8 });
});

test("drafts clone every override without adding absent properties", () => {
    const draft = clonePlacements(HOME_AUTHORED_PLACEMENTS);
    expect(draft).toEqual(HOME_AUTHORED_PLACEMENTS);
    draft.forEach((record, index) => {
        expect(record).not.toBe(HOME_AUTHORED_PLACEMENTS[index]);
        for (const mode of ["wide", "narrow", "tablet", "mobile"] as const) {
            if (record[mode]) expect(record[mode]).not.toBe(HOME_AUTHORED_PLACEMENTS[index][mode]);
        }
    });
});

test("mode edits preserve other records and overrides, and null clears inherited edge positioning", () => {
    const source = HOME_AUTHORED_PLACEMENTS.find((item) => item.id === "margin-miku")!;
    for (const mode of ["wide", "narrow", "tablet", "mobile"] as const) {
        const changed = patchPlacementPose(HOME_AUTHORED_PLACEMENTS, source.id, mode, { x: 12.3, edgeOffset: null });
        const record = changed.find((item) => item.id === source.id)!;
        expect(record).toEqual({ ...source, [mode]: { ...source[mode], x: 12.3, edgeOffset: null } });
        expect(resolveClutterPose(record, mode).edgeOffset).toBeNull();
        expect(changed.filter((item) => item.id !== source.id)).toEqual(HOME_AUTHORED_PLACEMENTS.filter((item) => item.id !== source.id));
        expect(resetPlacementOverride(changed, source.id, mode).find((item) => item.id === source.id)?.[mode]).toBeUndefined();
    }
    const base = patchPlacementPose(HOME_AUTHORED_PLACEMENTS, source.id, "desktop", { width: 600 });
    expect(base.find((item) => item.id === source.id)).toEqual({ ...source, width: 600 });
});

test("complete exports round-trip all records and never clamp stored values", () => {
    const draft = clonePlacements(HOME_AUTHORED_PLACEMENTS);
    draft[0].width = 3000;
    draft[0].wide = { x: 12.345, edgeOffset: null };
    const output = exportPlacements(draft);
    expect(output).toContain('import type { AuthoredPlacement } from "../lib/home/clutter-types";');
    expect(output).toContain('\n    {\n        "id":');
    expect(JSON.parse(output.slice(output.indexOf("["), output.indexOf(" satisfies")))).toEqual(draft);
    expect(output).toContain("satisfies AuthoredPlacement[];");
    expect(output).not.toContain("HOME_CLUTTER_ASSETS");
});

test("numeric edits reject blanks, nonfinite values, and values outside explicit limits", () => {
    for (const value of ["", " ", "Infinity", "NaN", "1e999", "-1", "2049"]) {
        expect(validateNumber(value, 8, 2048)).toBeNull();
    }
    expect(validateNumber("600", 8, 2048)).toBe(600);
    expect(validateNumber("-12.5")).toBe(-12.5);
});
