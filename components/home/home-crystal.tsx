"use client";

import { useState } from "react";
import { useUISound } from "../../lib/audio/use-ui-sound";
import styles from "./home-crystal.module.css";

export function HomeCrystal() {
    const [touched, setTouched] = useState(false);
    const playUI = useUISound();
    return (
        <button
            type="button"
            className={styles.crystal}
            aria-pressed={touched}
            aria-label={touched ? "Put the crystal back" : "Touch the little crystal"}
            onClick={() => {
                playUI("uiClick");
                setTouched((current) => !current);
            }}
        >
            <picture>
                <source media="(prefers-reduced-motion: reduce)" srcSet="/media/home/crystal-still.png" />
                {/* Keep the animated source native; picture selects its still under reduced motion. */}
                <img src="/media/home/crystal.gif" width="32" height="32" alt="" />
            </picture>
        </button>
    );
}
