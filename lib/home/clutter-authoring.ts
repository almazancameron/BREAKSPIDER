import type { AnchorPoint, AuthoredPlacement, ClutterViewport, HomeAnchorId, PlacementPose } from "./clutter-types";

export type Point = { x: number; y: number };
export type Rect = { left: number; top: number; width: number; height: number };
export type MeasuredAnchor = { id: HomeAnchorId; rect: Rect };

export const ANCHOR_ORDER: HomeAnchorId[] = [
    "spotlight", "about", "projects", "current", "sketchbook",
    "familiar", "changelog", "map", "pile",
];
export const ANCHOR_POINTS: AnchorPoint[] = [
    "top-left", "top-right", "bottom-left", "bottom-right", "center",
];
export const OVERRIDE_MODES = ["wide", "narrow", "tablet", "mobile"] as const;

// Keep these ranges identical to home-authored-clutter.module.css, including equality.
export const VIEWPORT_QUERIES: [ClutterViewport, string][] = [
    ["wide", "(width > 110rem)"],
    ["desktop", "(90rem < width <= 110rem)"],
    ["narrow", "(76.25rem < width <= 90rem)"],
    ["tablet", "(47.5rem < width <= 76.25rem)"],
    ["mobile", "(width <= 47.5rem)"],
];

export const distanceToRect = (point: Point, rect: Rect): number => Math.hypot(
    Math.max(rect.left - point.x, 0, point.x - rect.left - rect.width),
    Math.max(rect.top - point.y, 0, point.y - rect.top - rect.height),
);

export function findNearestAnchor(point: Point, anchors: MeasuredAnchor[]): MeasuredAnchor | null {
    let nearest: MeasuredAnchor | null = null;
    let distance = Infinity;
    for (const id of ANCHOR_ORDER) {
        const anchor = anchors.find((candidate) => candidate.id === id);
        if (!anchor) continue;
        const next = distanceToRect(point, anchor.rect);
        if (next < distance) {
            nearest = anchor;
            distance = next;
        }
    }
    return nearest;
}

export const anchorPointPosition = (rect: Rect, point: AnchorPoint): Point => ({
    x: rect.left + rect.width * (point.includes("right") ? 1 : point === "center" ? 0.5 : 0),
    y: rect.top + rect.height * (point.includes("bottom") ? 1 : point === "center" ? 0.5 : 0),
});

export function findNearestAnchorPoint(point: Point, rect: Rect): AnchorPoint {
    return ANCHOR_POINTS.reduce((nearest, candidate) => {
        const a = anchorPointPosition(rect, nearest);
        const b = anchorPointPosition(rect, candidate);
        return Math.hypot(point.x - b.x, point.y - b.y) < Math.hypot(point.x - a.x, point.y - a.y)
            ? candidate : nearest;
    });
}

export const toAnchorOffset = (point: Point, rect: Rect, anchorPoint: AnchorPoint): Point => {
    const origin = anchorPointPosition(rect, anchorPoint);
    return { x: point.x - origin.x, y: point.y - origin.y };
};

export const roundOffset = (value: number): number => Math.round(value * 10) / 10;

export function clonePlacements(placements: AuthoredPlacement[]): AuthoredPlacement[] {
    return placements.map((placement) => {
        const copy = { ...placement };
        for (const mode of OVERRIDE_MODES) {
            if (placement[mode]) copy[mode] = { ...placement[mode] };
        }
        return copy;
    });
}

export function patchPlacementPose(
    placements: AuthoredPlacement[], id: string, mode: ClutterViewport, patch: Partial<PlacementPose>,
): AuthoredPlacement[] {
    return placements.map((placement) => placement.id !== id ? placement : mode === "desktop"
        ? { ...placement, ...patch }
        : { ...placement, [mode]: { ...placement[mode], ...patch } });
}

export function resetPlacementOverride(
    placements: AuthoredPlacement[], id: string, mode: Exclude<ClutterViewport, "desktop">,
): AuthoredPlacement[] {
    return placements.map((placement) => {
        if (placement.id !== id) return placement;
        const copy = { ...placement };
        delete copy[mode];
        return copy;
    });
}

export function validateNumber(value: string, min = -Infinity, max = Infinity): number | null {
    const number = Number(value);
    return value.trim() !== "" && Number.isFinite(number) && number >= min && number <= max ? number : null;
}

export const exportPlacements = (placements: AuthoredPlacement[]): string =>
    'import type { AuthoredPlacement } from "../lib/home/clutter-types";\n\n'
    + `export const HOME_AUTHORED_PLACEMENTS = ${JSON.stringify(placements, null, 4)} satisfies AuthoredPlacement[];\n`;
