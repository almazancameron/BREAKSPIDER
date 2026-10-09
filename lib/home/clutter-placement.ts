import type { AuthoredPlacement, ClutterViewport, PlacementPose } from "./clutter-types";

export function resolveClutterPose(
    placement: AuthoredPlacement,
    viewport: ClutterViewport,
): PlacementPose {
    return { ...placement, ...(viewport === "desktop" ? {} : placement[viewport]) };
}
