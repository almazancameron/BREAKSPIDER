import type { ReactNode } from "react";
import { getPageClutter } from "../../lib/clutter/repository";
import { ClutterLayer } from "./clutter-layer";
import styles from "./clutter-page.module.css";

export async function ClutterBoundary({ clutter, children }: {
    clutter: ReturnType<typeof getPageClutter>;
    children: ReactNode;
}) {
    if (process.env.NODE_ENV !== "development") return children;
    const { ClutterEditor } = await import("./clutter-editor");
    return <ClutterEditor key={clutter.pageId} {...clutter}>{children}</ClutterEditor>;
}

// Foundation rooms get a canvas only; their future compositions own richer anchors.
export function ClutterPage({ pageId, children }: { pageId: string; children: ReactNode }) {
    const clutter = getPageClutter(pageId);
    return (
        <ClutterBoundary clutter={clutter}>
            <div className={styles.canvas} data-clutter-anchor="canvas">
                {children}
                <ClutterLayer anchor="canvas" assets={clutter.assets} placements={clutter.placements} />
            </div>
        </ClutterBoundary>
    );
}
