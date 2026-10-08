"use client";

import Link from "next/link";
import { createContext, useContext, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { HomeArtifact } from "../../lib/content/models";
import { useUISound } from "../../lib/audio/use-ui-sound";
import { ContentImage } from "../ui/content-image";
import { Dialog } from "../ui/dialog";
import { HomeMapGlyph } from "./home-map-glyph";
import styles from "./home-inspection.module.css";

const InspectionContext = createContext<((id: HomeArtifact["id"]) => void) | null>(null);

export function HomeArtifactVisual({ artifact }: { artifact: HomeArtifact }) {
    if (artifact.id === "found-map") return <HomeMapGlyph />;
    if (artifact.media) return <ContentImage media={artifact.media} loading="eager" />;
    return <span className={styles.pending}>Media pending review</span>;
}

export function HomeInspection({ artifacts, children }: { artifacts: HomeArtifact[]; children: ReactNode }) {
    const [selectedId, setSelectedId] = useState<HomeArtifact["id"] | null>(null);
    // Guard repeated events before React has committed the next render.
    const selectionRef = useRef<HomeArtifact["id"] | null>(null);
    const playUI = useUISound();
    const selected = artifacts.find((artifact) => artifact.id === selectedId) ?? null;

    const inspect = (id: HomeArtifact["id"]) => {
        if (selectionRef.current !== null || !artifacts.some((artifact) => artifact.id === id)) return;
        selectionRef.current = id;
        playUI("uiClick");
        setSelectedId(id);
    };

    const closeInspection = () => {
        if (selectionRef.current === null) return;
        selectionRef.current = null;
        playUI("uiClick");
        setSelectedId(null);
    };

    return (
        <InspectionContext.Provider value={inspect}>
            {children}
            <Dialog open={selected !== null} onClose={closeInspection} labelledBy="home-inspection-title" className={styles.inspection}>
                <div className={styles.bar}>
                    <span>{selected?.label ?? "FILE INSPECTOR"}</span>
                    <button type="button" autoFocus onClick={closeInspection}>Close file</button>
                </div>
                {selected && (
                    <div className={styles.body}>
                        <div className={styles.visual}><HomeArtifactVisual artifact={selected} /></div>
                        <div className={styles.copy}>
                            <h2 id="home-inspection-title">{selected.title}</h2>
                            <p>{selected.description}</p>
                            {selected.href && selected.linkLabel && (
                                <Link href={selected.href} onClick={closeInspection}>{selected.linkLabel} <span aria-hidden="true">↗</span></Link>
                            )}
                        </div>
                    </div>
                )}
            </Dialog>
        </InspectionContext.Provider>
    );
}

type InspectArtifactButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    artifactId: HomeArtifact["id"];
};

export function InspectArtifactButton({ artifactId, children, ...props }: InspectArtifactButtonProps) {
    const inspect = useContext(InspectionContext);
    if (!inspect) throw new Error("InspectArtifactButton must be inside HomeInspection.");
    return <button {...props} type="button" aria-haspopup="dialog" onClick={() => inspect(artifactId)}>{children}</button>;
}
