import type { ClutterAsset } from "./clutter-types";

export function getClutterCatalogue(authored: readonly ClutterAsset[], library: readonly ClutterAsset[]): ClutterAsset[] {
    const catalogue = [...authored, ...library];
    const ids = new Set<string>();
    for (const asset of catalogue) {
        const id = asset.id.toLowerCase();
        if (ids.has(id)) throw new Error(`Duplicate clutter asset ID: ${asset.id}`);
        ids.add(id);
    }
    return catalogue;
}

export function getPlacedClutterAssets(placements: readonly { assetId: string }[], catalogue: readonly ClutterAsset[]): ClutterAsset[] {
    const ids = new Set(placements.map((placement) => placement.assetId));
    for (const id of ids) {
        if (!catalogue.some((asset) => asset.id === id)) {
            throw new Error(`Missing placed clutter asset: ${id}. Restore its image or update HOME_AUTHORED_PLACEMENTS.`);
        }
    }
    return catalogue.filter((asset) => ids.has(asset.id));
}
