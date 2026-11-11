import type { Metadata } from "next";
import Link from "next/link";
import { ClutterPage } from "../../../components/clutter/clutter-page";
import { OnffPlayer } from "../../../components/play/onff-player";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Play One Night Familiar Fight — Breakspider",
    description: "Play the current Web preview of Cameron Almazan's Familiar autobattler.",
};

export default function OneNightFamiliarFightPage() {
    return (
        <ClutterPage pageId="play-onff">
            <div className={styles.page}>
                <div className={styles.topline}>
                    <Link href="/projects/one-night-familiar-fight">← Back to the project</Link>
                    <span>WEB BUILD / IN DEVELOPMENT</span>
                </div>
                <header className={styles.intro}>
                    <p className={styles.kicker}>PIXEL PUGILISTS / PLAYABLE PREVIEW</p>
                    <h1>One Night <span>Familiar Fight</span></h1>
                    <p>Build a plan, send your Familiars into the bracket, and see what happens. This is a current development build.</p>
                </header>
                <p className={styles.mobileNote}>This build is best played on a larger screen. Its game interface becomes very small on a phone.</p>
                <OnffPlayer />
                <p className={styles.footnote}>The game runs in its own window. Launching it stops any site sounds already playing; use Stop game to close the build and its audio.</p>
            </div>
        </ClutterPage>
    );
}
