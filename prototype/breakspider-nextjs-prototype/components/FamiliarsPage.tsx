import Link from "next/link";
import InteriorShell from "./InteriorShell";
import styles from "./FamiliarsPage.module.css";

const roster = [
    { name: "Ashwing", slug: "ashwing", image: "/media/ashwing.png", tags: "BURN / OFFENSE" },
    { name: "Pebbloq", slug: "pebbloq", image: "/media/pebbloq.png", tags: "STONE / DEFENSE" },
];

export default function FamiliarsPage() {
    return <InteriorShell>
        <main className={styles.page}>
            <div className={styles.crumb}><Link href="/">← HOME</Link><span>/ FAMILIARS</span><b>PIXEL PUGILISTS / CREATURE FILES</b></div>
            <header className={styles.intro}><span>CHARACTER ROSTER / 02 PUBLIC SO FAR</span><h1>Familiars<span>.</span></h1><p>The creatures in Pixel Pugilists. Two have public sprites right now; this roster has room for more.</p><Link href="/projects/pixel-pugilists">See the game they belong to ↗</Link></header>
            <section className={styles.feature} aria-labelledby="feature-title"><div className={styles.featureStage}><div className={styles.stageHalo}>FAMILIAR / 001</div><img className={styles.ashwing} src="/media/ashwing.png" alt="Ashwing, a dark winged Familiar with orange fire details" /><img className={styles.fireBadge} src="/media/p04-badge-fire.png" alt="" aria-hidden="true" /><span className={styles.stageBottom}>SELECTED / ASHWING</span></div><div className={styles.featureText}><span>FEATURED FAMILIAR / 01</span><h2 id="feature-title">Ashwing</h2><p>A small, sharp silhouette with fire along its edges. In the current roster, Ashwing is tagged for Burn and offense.</p><div className={styles.tags}><b>BURN</b><b>OFFENSE</b><b>PIXEL PUGILISTS</b></div><Link href="/familiars/ashwing">Open Ashwing&apos;s profile ↗</Link></div><img className={styles.featureNoise} src="/media/p04-noise-orange-15.png" alt="" aria-hidden="true" /></section>
            <section className={styles.roster} aria-labelledby="roster-title"><div className={styles.rosterHead}><div><span>PUBLIC ROSTER</span><h2 id="roster-title">Pick a face.</h2></div><small>SCANNABLE NOW / BUILT TO GROW</small></div><div className={styles.rosterGrid}>{roster.map((familiar, index) => <Link href={"/familiars/" + familiar.slug} className={styles.rosterEntry} key={familiar.name}><small>{String(index + 1).padStart(3, "0")}</small><img src={familiar.image} alt={familiar.name + " sprite"} /><strong>{familiar.name}</strong><span>{familiar.tags}</span><b>OPEN PROFILE ↗</b></Link>)}{[3,4,5,6].map(slot => <div className={styles.emptySlot} key={slot} aria-label="Future Familiar slot"><small>{String(slot).padStart(3, "0")}</small><span>?</span><b>NO PUBLIC FILE YET</b></div>)}</div><p className={styles.rosterNote}>Only public entries open. The empty slots are space for the roster to grow.</p></section>
            <aside className={styles.gameLink}><div><span>THEIR GAME</span><h2>Pixel Pugilists</h2><p>Priorities, combat, brackets, and the Familiars that make the systems interesting.</p><Link href="/projects/pixel-pugilists">Open the project ↗</Link></div><img src="/media/pp-combat.png" alt="Pixel Pugilists combat screen" /></aside>
            <img className={styles.edgeNoise} src="/media/p04-noise-red-03.png" alt="" aria-hidden="true" />
        </main>
    </InteriorShell>;
}
