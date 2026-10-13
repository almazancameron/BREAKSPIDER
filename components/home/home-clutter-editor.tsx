"use client";

import type { ReactNode } from "react";
import { HOME_AUTHORED_PLACEMENTS } from "../../content/home-clutter";
import { ANCHOR_ORDER } from "../../lib/home/clutter-authoring";
import type { ClutterAsset } from "../../lib/home/clutter-types";
import { ClutterEditor } from "../clutter/clutter-editor";

// Compatibility boundary: Home keeps its exact file, placements and wrapper geometry.
export function HomeClutterEditor({ children, assets }: { children: ReactNode; assets: ClutterAsset[] }) {
    return (
        <ClutterEditor pageId="home" anchors={ANCHOR_ORDER} placements={HOME_AUTHORED_PLACEMENTS}
            assets={assets} fileLabel="content/home-clutter.ts" exportName="HOME_AUTHORED_PLACEMENTS">
            {children}
        </ClutterEditor>
    );
}
