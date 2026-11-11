"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { stopAllSounds } from "../../lib/audio/sound-manager";
import styles from "./onff-player.module.css";

const gameUrl = "/games/onff/onff.html";

export function OnffPlayer() {
    const [playing, setPlaying] = useState(false);
    const [frameLoaded, setFrameLoaded] = useState(false);
    const [fullscreenError, setFullscreenError] = useState(false);
    const frame = useRef<HTMLDivElement>(null);

    function launchGame() {
        stopAllSounds();
        setFrameLoaded(false);
        setPlaying(true);
    }

    function stopGame() {
        setPlaying(false);
        setFrameLoaded(false);
        if (document.fullscreenElement === frame.current) void document.exitFullscreen().catch(() => {});
    }

    async function enterFullscreen() {
        if (!frame.current) return;
        try {
            await frame.current.requestFullscreen();
            setFullscreenError(false);
        } catch {
            setFullscreenError(true);
        }
    }

    return (
        <section className={styles.player} aria-label="One Night Familiar Fight playable preview">
            <div className={styles.toolbar}>
                <span className={styles.status}><span aria-hidden="true" /> ONFF.EXE / WEB PREVIEW</span>
                {playing && (
                    <div className={styles.actions}>
                        <button type="button" onClick={enterFullscreen}>Fullscreen</button>
                        <button type="button" onClick={stopGame}>Stop game</button>
                    </div>
                )}
            </div>
            <div className={styles.viewport} ref={frame}>
                {playing ? (
                    <>
                        {!frameLoaded && <p className={styles.loading} role="status">Opening the game window…</p>}
                        <iframe
                            className={styles.gameFrame}
                            src={gameUrl}
                            title="One Night Familiar Fight game"
                            allow="autoplay; fullscreen; gamepad"
                            allowFullScreen
                            onLoad={() => setFrameLoaded(true)}
                        />
                    </>
                ) : (
                    <div className={styles.launchScreen}>
                        <Image
                            src="/media/projects/pixel-pugilists/combat.png"
                            alt="One Night Familiar Fight combat preview"
                            width={1153}
                            height={655}
                            sizes="(max-width: 760px) 100vw, 80vw"
                        />
                        <div className={styles.launchPanel}>
                            <span>READY WHEN YOU ARE</span>
                            <button type="button" onClick={launchGame}>Launch playable build ↗</button>
                            <p>About 54 MB of game data loads after you launch.</p>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.details}>
                <p>Click inside the game to give it input focus. Press Escape to leave fullscreen.</p>
                <a href={gameUrl} target="_blank" rel="noopener noreferrer" onClick={stopAllSounds}>Open game in a separate tab ↗</a>
            </div>
            {fullscreenError && <p className={styles.error} role="status">Fullscreen is unavailable in this browser. You can keep playing here.</p>}
        </section>
    );
}
