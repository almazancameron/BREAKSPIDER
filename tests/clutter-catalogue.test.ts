import { expect, test } from "vitest";
import { getClutterCatalogue, getPlacedClutterAssets } from "../lib/home/clutter-catalogue";
import type { ClutterAsset } from "../lib/home/clutter-types";

const asset = (id: string): ClutterAsset => ({
    id, pixelArt: true,
    media: { kind: "image", src: `/test/${id}.png`, alt: "", width: 32, height: 32 },
});

test("saved folder assets resolve without sending the unused palette to the renderer", () => {
    const original = [asset("narwhal")];
    const library = [asset("badge"), asset("unused")];
    const catalogue = getClutterCatalogue(original, library);
    expect(getPlacedClutterAssets([{ assetId: "badge" }, { assetId: "badge" }], catalogue))
        .toEqual([library[0]]);
    expect(original).toEqual([asset("narwhal")]);
    expect(library).toEqual([asset("badge"), asset("unused")]);
});

test("deleting or renaming a placed image fails with its missing ID", () => {
    expect(() => getPlacedClutterAssets([{ assetId: "missing" }], [asset("other")]))
        .toThrow(/missing/i);
});

test("ambiguous IDs across the curated catalogue and folder palette fail early", () => {
    expect(() => getClutterCatalogue([asset("narwhal")], [asset("NARWHAL")]))
        .toThrow(/duplicate.*narwhal/i);
});
