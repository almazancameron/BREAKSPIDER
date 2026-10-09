"use client";

import { useContext, type CSSProperties } from "react";
import type { AuthoredPlacement, ClutterAsset, ClutterViewport, HomeAnchorId } from "../../lib/home/clutter-types";
import { resolveClutterPose } from "../../lib/home/clutter-placement";
import { ContentImage } from "../ui/content-image";
import { ClutterDraftContext } from "./home-clutter-state";
import styles from "./home-authored-clutter.module.css";

const viewports: ClutterViewport[] = ["desktop", "wide", "narrow", "tablet", "mobile"];

export function HomeAuthoredClutter({ anchor, assets, placements }: {
    anchor: HomeAnchorId;
    assets: ClutterAsset[];
    placements: AuthoredPlacement[];
}) {
    const records = useContext(ClutterDraftContext) ?? placements;

    return records.flatMap((placement) => {
        const asset = assets.find((candidate) => candidate.id === placement.assetId);
        if (!asset) {
            if (process.env.NODE_ENV === "development") console.warn(`Unknown clutter asset: ${placement.assetId}`);
            return [];
        }

        return viewports.flatMap((viewport) => {
            const pose = resolveClutterPose(placement, viewport);
            if (pose.hidden || pose.anchor !== anchor) return [];
            const pointX = pose.anchorPoint.includes("right") ? "100%" : pose.anchorPoint === "center" ? "50%" : "0%";
            const pointY = pose.anchorPoint.includes("bottom") ? "100%" : pose.anchorPoint === "center" ? "50%" : "0%";
            const style: CSSProperties & Record<`--${string}`, string | number> = {
                "--point-x": pointX,
                "--point-y": pointY,
                "--offset-x": pose.edgeOffset == null ? `${pose.x}px` : `calc(var(--home-gutter) - ${pose.edgeOffset}px)`,
                "--offset-y": `${pose.y}px`,
                "--object-width": `${pose.width}px`,
                "--object-layer": pose.zIndex,
                "--object-rotation": `${pose.rotation}deg`,
                "--object-scale": pose.scale,
                "--object-flip": pose.flip ? -1 : 1,
            };

            return [(
                <span
                    key={`${placement.id}-${viewport}`}
                    className={`${styles.object} ${styles[viewport]}`}
                    style={style}
                    aria-hidden="true"
                    data-clutter-placement={placement.id}
                    data-clutter-viewport={viewport}
                    data-clutter-exclusion-padding={placement.exclusionPadding}
                >
                    <span data-clutter-visual className={`${styles.visual} ${asset.pixelArt ? styles.pixelArt : ""} ${asset.framed ? styles.framed : ""}`}>
                        <picture>
                            {asset.reducedMotionMedia && (
                                <source media="(prefers-reduced-motion: reduce)" srcSet={asset.reducedMotionMedia.src} />
                            )}
                            <ContentImage media={{ ...asset.media, alt: "" }} sizes={`${pose.width}px`} unoptimized />
                        </picture>
                    </span>
                </span>
            )];
        });
    });
}
