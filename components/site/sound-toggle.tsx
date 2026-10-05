"use client";

import { playSound } from "../../lib/audio/sound-manager";
import { useVisitorState } from "../../lib/visitor/visitor-state-provider";
import styles from "./sound-toggle.module.css";

export function SoundToggle() {
    const { state, ready, updateVisitorState } = useVisitorState();
    const muted = state.soundMuted;

    function toggleSound() {
        if (!ready) return;

        const nextMuted = !muted;
        updateVisitorState((current) => ({ ...current, soundMuted: nextMuted }));
        playSound("interface", nextMuted);
    }

    return (
        <button
            className={styles.toggle}
            type="button"
            aria-pressed={!muted}
            aria-label={`Sound ${muted ? "off" : "on"}. Toggle sound`}
            disabled={!ready}
            onClick={toggleSound}
        >
            <span aria-hidden="true">{muted ? "◌" : "♫"}</span>
            <span>Sound {muted ? "off" : "on"}</span>
        </button>
    );
}
