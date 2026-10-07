"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUISound } from "../../lib/audio/use-ui-sound";
import type { Familiar } from "../../lib/content/models";
import { createSeededRandom, getHomeSessionSeed } from "../../lib/home/home-session";
import { ContentImage } from "../ui/content-image";
import styles from "./home-familiar.module.css";

type HomeFamiliarProps = {
    familiars: Familiar[];
    featuredSlug: string | null;
};

export function HomeFamiliar({ familiars, featuredSlug }: HomeFamiliarProps) {
    const featuredIndex = familiars.findIndex((familiar) => familiar.slug === featuredSlug);
    const [index, setIndex] = useState(featuredIndex >= 0 ? featuredIndex : 0);
    const playUI = useUISound();

    useEffect(() => {
        if (featuredIndex >= 0 || familiars.length === 0) return;
        const random = createSeededRandom(getHomeSessionSeed());
        // Restore browser-only randomness after deterministic server markup has hydrated.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIndex(Math.floor(random() * familiars.length));
    }, [familiars, featuredIndex]);

    const familiar = familiars[index] ?? familiars[0];
    if (!familiar) {
        return (
            <div className={styles.empty}>
                <p className={styles.label}>FAMILIARS</p>
                <h2 id="home-familiar-title">No Familiars yet</h2>
                <Link href="/familiars">Meet the Familiars <span aria-hidden="true">↗</span></Link>
            </div>
        );
    }

    const showNext = () => {
        if (familiars.length < 2) return;
        playUI("uiClick");
        setIndex((current) => (current + 1) % familiars.length);
    };

    return (
        <div className={styles.familiar}>
            <button
                type="button"
                className={styles.sprite}
                onClick={showNext}
                disabled={familiars.length < 2}
                aria-label="Show another Familiar"
            >
                <ContentImage media={familiar.sprite} sizes="106px" />
                {familiars.length > 1 && <span aria-hidden="true">↻</span>}
            </button>
            <div className={styles.identity} aria-live="polite" aria-atomic="true">
                <p className={styles.label}>{featuredIndex >= 0 ? "FEATURED FAMILIAR" : "RANDOM FAMILIAR"}</p>
                <h2 id="home-familiar-title">{familiar.name}</h2>
                <p className={styles.tags}>{familiar.tags.join(" / ")}</p>
                <p className={styles.description}>{familiar.shortDescription}</p>
                <div className={styles.links}>
                    <Link href={`/familiars/${familiar.slug}`}>About {familiar.name} <span aria-hidden="true">↗</span></Link>
                    <Link href="/familiars">Meet the Familiars <span aria-hidden="true">↗</span></Link>
                </div>
            </div>
        </div>
    );
}
