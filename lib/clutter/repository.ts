import { HOME_CLUTTER_ASSETS } from "../../content/home-clutter";
import { HOME_CLUTTER_LIBRARY } from "../../content/home-clutter-library.generated";
import { getClutterCatalogue, getPlacedClutterAssets } from "../home/clutter-catalogue";
import { getClutterPage } from "./pages";

export function getPageClutter(pageId: string) {
    const page = getClutterPage(pageId);
    if (!page) throw new Error(`Unregistered clutter page: ${pageId}`);
    const catalogue = getClutterCatalogue(HOME_CLUTTER_ASSETS, HOME_CLUTTER_LIBRARY);
    return {
        pageId: page.id,
        anchors: page.anchors,
        placements: page.placements,
        assets: process.env.NODE_ENV === "development" ? catalogue : getPlacedClutterAssets(page.placements, catalogue),
        fileLabel: page.file,
        exportName: page.exportName,
    };
}
