"use client";

import { useState } from "react";
import type { HomeArtifact } from "../../lib/content/models";
import { useUISound } from "../../lib/audio/use-ui-sound";
import { HomeArtifactVisual, InspectArtifactButton } from "./home-inspection";
import styles from "./home-artifact-pile.module.css";

export function HomeArtifactPile({ artifacts }: { artifacts: HomeArtifact[] }) {
    const [focusedId, setFocusedId] = useState(artifacts[0]?.id ?? null);
    const playUI = useUISound();

    const shuffleFocus = () => {
        if (artifacts.length < 2) return;
        playUI("uiClick");
        setFocusedId((current) => {
            const index = artifacts.findIndex((artifact) => artifact.id === current);
            return artifacts[(index + 1) % artifacts.length].id;
        });
    };

    return (
        <section className={styles.pile} aria-labelledby="home-artifacts-title">
            <div className={styles.introduction}>
                <span>MORE STUFF</span>
                <h2 id="home-artifacts-title">Stuff you can inspect</h2>
                <p>Open a file for a closer look and a path to its project or page.</p>
                {artifacts.length > 0 && (
                    <button type="button" onClick={shuffleFocus} disabled={artifacts.length < 2}>
                        Shuffle focus <span aria-hidden="true">↻</span>
                    </button>
                )}
                <p className={styles.swipeHint}>Swipe files →</p>
            </div>
            <div className={styles.files}>
                {artifacts.length === 0 && <p>No files to inspect yet.</p>}
                {artifacts.map((artifact) => (
                    <InspectArtifactButton
                        key={artifact.id}
                        artifactId={artifact.id}
                        className={styles.file}
                        data-artifact={artifact.id}
                        data-focused={focusedId === artifact.id}
                        onMouseEnter={() => setFocusedId(artifact.id)}
                        onFocus={() => setFocusedId(artifact.id)}
                    >
                        <span className={styles.label}>{artifact.label}</span>
                        <span className={styles.visual}><HomeArtifactVisual artifact={artifact} /></span>
                        <strong>{artifact.title}</strong>
                    </InspectArtifactButton>
                ))}
            </div>
        </section>
    );
}
