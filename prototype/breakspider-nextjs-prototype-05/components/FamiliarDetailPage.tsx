"use client";

import Link from "next/link";
import { useState } from "react";
import InteriorShell from "./InteriorShell";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./FamiliarDetailPage.module.css";

const familiars = {
  ashwing: { name: "Ashwing", number: "001", image: "/media/ashwing.png", role: "BURN / OFFENSE", summary: "A dark winged Familiar with bright orange fire running through its silhouette.", badge: "/media/p04-badge-fire.png", noise: "/media/p04-noise-orange-15.png", visual: "The orange edge does the work at small scale. The wing and face stay readable against the dark body.", next: "pebbloq", nextName: "Pebbloq" },
  pebbloq: { name: "Pebbloq", number: "002", image: "/media/pebbloq.png", role: "STONE / DEFENSE", summary: "A squat stone Familiar with a shield-like outline and a compact, sturdy pose.", badge: "/media/p03-badge-stone.png", noise: "/media/p04-noise-blue-12.png", visual: "Broad stone shapes, a bright eye, and the shield-like side make a different silhouette from Ashwing.", next: "ashwing", nextName: "Ashwing" },
} as const;

export default function FamiliarDetailPage({ slug }: { slug: keyof typeof familiars }) {
  const familiar = familiars[slug];
  const [grid, setGrid] = useState(false);
  return <InteriorShell>
    <main className={styles.page + " " + (slug === "pebbloq" ? styles.stone : "")}>
      <div className={styles.crumb}><Link href="/familiars">← FAMILIARS</Link><span>/ {familiar.name.toUpperCase()}</span><b>PROFILE / {familiar.number}</b></div>
      <div className={styles.layout}><aside className={styles.fileIndex}><span>PUBLIC FAMILIAR FILE</span><strong>{familiar.number} / 002</strong><p>FROM PIXEL PUGILISTS</p><Link href="/familiars">Full roster ↗</Link><img src={familiar.badge} alt="" aria-hidden="true" /></aside>
        <section className={styles.stage} aria-label={familiar.name + " sprite"}><div className={styles.stageTop}><span>SPECIMEN / {familiar.number}</span><button type="button" aria-pressed={grid} onClick={() => { setGrid(!grid); playInterfaceNote(); }}>PIXEL GRID {grid ? "ON" : "OFF"} ↻</button></div><div className={styles.spriteField + (grid ? " " + styles.pixelGrid : "")}><img src={familiar.image} alt={familiar.name + " Familiar sprite"} /></div><span className={styles.stageCaption}>ORIGINAL SPRITE / 64 × 64 / ENLARGED HERE</span></section>
        <section className={styles.profile}><span>FAMILIAR / {familiar.number}</span><h1>{familiar.name}<em>.</em></h1><p>{familiar.summary}</p><div className={styles.role}>{familiar.role.split(" / ").map(tag => <b key={tag}>{tag}</b>)}</div><Link href="/projects/pixel-pugilists">Appears in Pixel Pugilists ↗</Link><img src={familiar.noise} alt="" aria-hidden="true" /></section></div>
      <section className={styles.notes} aria-labelledby="notes-title"><div className={styles.notesHeading}><span>FIELD NOTES / CURRENT PUBLIC FILE</span><h2 id="notes-title">What&apos;s here so far.</h2></div><div className={styles.noteColumns}><div><span>01 / VISUAL READ</span><p>{familiar.visual}</p></div><div><span>02 / GAME ROLE</span><p>The current public tag is <strong>{familiar.role.toLowerCase()}</strong>. A detailed technique list can be added once that part of the design is documented.</p></div><div><span>03 / CONNECTIONS</span><p>This Familiar belongs to Pixel Pugilists. The battle-plan note covers one system the roster is being built around.</p><Link href="/sketchbook/battle-plans-first-pass">Read the development note ↗</Link></div></div></section>
      <nav className={styles.next} aria-label="Related Familiar"><div><span>ANOTHER PUBLIC FILE</span><Link href={"/familiars/" + familiar.next}>Meet {familiar.nextName} ↗</Link></div><img src={familiars[familiar.next].image} alt="" /><Link href="/familiars">Back to roster ↗</Link></nav>
    </main>
  </InteriorShell>;
}
