import { describe, expect, it } from "vitest";
import { resolveClutterPose } from "../lib/home/clutter-placement";
import type { AuthoredPlacement } from "../lib/home/clutter-types";

const placement: AuthoredPlacement = {
    id: "test-scrap",
    assetId: "test-image",
    anchor: "sketchbook",
    anchorPoint: "top-left",
    x: 44,
    y: 32,
    width: 172,
    rotation: 7,
    scale: 1,
    zIndex: 1,
    hidden: false,
    flip: false,
    exclusionPadding: 12,
    wide: { x: -8 },
    tablet: { anchor: "current", x: -113, y: 210 },
    mobile: { hidden: true },
};

describe("authored clutter breakpoint poses", () => {
    it("keeps the desktop pose intact when an override changes it", () => {
        expect(resolveClutterPose(placement, "wide").x).toBe(-8);
        expect(resolveClutterPose(placement, "desktop").x).toBe(44);
        expect(placement.x).toBe(44);
    });

    it("moves to a compact anchor without losing unmodified dimensions", () => {
        expect(resolveClutterPose(placement, "tablet")).toMatchObject({
            anchor: "current", x: -113, y: 210, width: 172, rotation: 7,
        });
    });

    it("keeps mobile overrides independent from tablet and wide changes", () => {
        expect(resolveClutterPose(placement, "mobile")).toMatchObject({
            anchor: "sketchbook", x: 44, hidden: true,
        });
    });

    it("inherits the desktop pose when a breakpoint has no override", () => {
        expect(resolveClutterPose(placement, "narrow")).toEqual(resolveClutterPose(placement, "desktop"));
    });
});
