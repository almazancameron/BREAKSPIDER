"use client"

import { useIntro } from "./intro-provider"
import styles from "./splash-entry.module.css"

export const ReplayIntroButton = () => {
    const { ready, replayIntro } = useIntro()

    return <button className={styles.replay} type="button" disabled={!ready} onClick={replayIntro}>Replay intro ↻</button>
}
