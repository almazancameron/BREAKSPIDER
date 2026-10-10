import type { ImageMedia } from "../content/models";

export type HomeAnchorId =
    | "spotlight" | "about" | "projects" | "current"
    | "sketchbook" | "familiar" | "changelog" | "map" | "pile";

export type AnchorPoint =
    | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

export type ClutterViewport = "desktop" | "wide" | "narrow" | "tablet" | "mobile";

export type ClutterAsset = {
    id: string;
    media: ImageMedia;
    pixelArt: boolean;
    reducedMotionMedia?: ImageMedia;
    framed?: boolean;
    // Folder palette metadata suggests an initial authoring size; saved poses own rendering.
    widthRange?: readonly [number, number];
    family?: "noise" | "badge" | "sprite";
};

export type PlacementPose = {
    anchor: HomeAnchorId;
    anchorPoint: AnchorPoint;
    x: number;
    y: number;
    width: number;
    rotation: number;
    scale: number;
    zIndex: number;
    hidden: boolean;
    flip: boolean;
    // For the few page-edge keepsakes, offset from the anchor's right edge
    // through the canvas gutter rather than using a fixed viewport coordinate.
    edgeOffset?: number | null;
};

export type AuthoredPlacement = PlacementPose & {
    id: string;
    assetId: string;
    // Retained for compatibility with earlier exports; no runtime collision pass consumes it.
    exclusionPadding?: number;
    wide?: Partial<PlacementPose>;
    narrow?: Partial<PlacementPose>;
    tablet?: Partial<PlacementPose>;
    mobile?: Partial<PlacementPose>;
};
