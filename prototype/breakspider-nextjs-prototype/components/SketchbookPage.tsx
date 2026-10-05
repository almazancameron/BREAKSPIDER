"use client";

import Link from "next/link";
import { useState } from "react";
import InteriorShell from "./InteriorShell";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./SketchbookPage.module.css";

const filters = ["All", "Pixel Pugilists", "Game design", "Viscap", "Site notes"];
const posts = [
    { id: "004", date: "SEP 24", kind: "long", tags: ["Pixel Pugilists", "Game design"] },
    { id: "003", date: "SEP 20", kind: "sprite", tags: ["Pixel Pugilists", "Game design"] },
    { id: "002", date: "SEP 12", kind: "screens", tags: ["Viscap"] },
    { id: "001", date: "SEP 06", kind: "plain", tags: ["Site notes"] },
];

export default function SketchbookPage() {
    const [filter, setFilter] = useState("All");
    const visible = posts.filter(post => filter === "All" || post.tags.includes(filter));
    return <InteriorShell>
        <main className={styles.page}>
            <div className={styles.crumb}><Link href="/">← HOME</Link><span>/ SKETCHBOOK</span><b>NEWEST FIRST / SAMPLE ENTRIES</b></div>
            <header className={styles.intro}><div><span className={styles.kicker}>NOTES / UPDATES / ODD LITTLE LOGS</span><h1>Sketchbook<span>.</span></h1><p>Short posts stay here. Longer ones get their own page.</p></div><div className={styles.introBits} aria-hidden="true"><img src="/media/ashwing.png" alt="" /><span>POSTING WHEN THERE IS SOMETHING TO SHOW</span><img src="/media/p04-strawberry.gif" alt="" /></div></header>
            <nav className={styles.filters} aria-label="Filter posts by tag"><span>SHOW</span>{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); playInterfaceNote(); }}>{item}</button>)}</nav>
            <div className={styles.layout}><section className={styles.feed} aria-label="Sketchbook entries">{visible.map(post => <article className={styles.post + " " + styles[post.kind]} key={post.id}><div className={styles.date}><b>{post.date}</b><span>2026</span><small>#{post.id}</small></div><div className={styles.postContent}>
                {post.kind === "long" && <><span className={styles.postType}>LONG NOTE / GAME DESIGN</span><h2><Link href="/sketchbook/battle-plans-first-pass">Battle plans, first pass ↗</Link></h2><p>I&apos;m trying to make combat decisions readable before the fight starts. The priority builder now puts rules, techniques, and a mock battle state in one place.</p><Link className={styles.longImage} href="/sketchbook/battle-plans-first-pass"><img src="/media/pp-priority.png" alt="Pixel Pugilists priority builder" /><span>OPEN THE FULL NOTE ↗</span></Link><div className={styles.postFooter}><Link href="/sketchbook/battle-plans-first-pass">Read the full entry ↗</Link><span>PIXEL PUGILISTS · GAME DESIGN</span></div></>}
                {post.kind === "sprite" && <><span className={styles.postType}>SHORT / FAMILIAR</span><div className={styles.spritePost}><div><h2>Ashwing at 64 pixels</h2><p>Its orange edge and broken silhouette do most of the work. I keep checking how much of that survives when the sprite gets small.</p><Link href="/familiars/ashwing">Ashwing&apos;s profile ↗</Link></div><img src="/media/ashwing.png" alt="Ashwing Familiar sprite" /></div><div className={styles.postFooter}><span>PIXEL PUGILISTS · GAME DESIGN</span></div></>}
                {post.kind === "screens" && <><span className={styles.postType}>SHORT / WORK</span><h2>Two screens from Viscap</h2><p>The storyboard and media library are different tools in the same product. It helps to see them beside each other.</p><div className={styles.screenPair}><img src="/media/viscap-storyboard.png" alt="Viscap storyboard" /><img src="/media/viscap-media.png" alt="Viscap media library" /></div><div className={styles.postFooter}><Link href="/projects/viscap">Open the Viscap project ↗</Link><span>VISCAP</span></div></>}
                {post.kind === "plain" && <><span className={styles.postType}>SHORT / SITE NOTES</span><p className={styles.plainText}>The site has a Map now. It is a regular public index, even if it looks like a thing you found on the floor.</p><div className={styles.postFooter}><Link href="/map">Open the Map ↗</Link><span>SITE NOTES</span></div></>}
            </div></article>)}</section><aside className={styles.sidebar}><div className={styles.sideHeading}>CURRENTLY LINKED TO</div><Link href="/projects/pixel-pugilists"><img src="/media/pebbloq.png" alt="" /><span>Pixel Pugilists <small>GAME / ACTIVE</small></span>↗</Link><Link href="/projects/viscap"><img src="/media/p04-viscap-mark.png" alt="" /><span>Viscap <small>PROFESSIONAL WORK</small></span>↗</Link><div className={styles.sideNote}><span>ABOUT THIS FEED</span><p>These are sample entries for the visual prototype. Dates and final post text can be replaced without changing the feed structure.</p></div><img className={styles.sideNoise} src="/media/p04-noise-orange-11.png" alt="" aria-hidden="true" /></aside></div>
        </main>
    </InteriorShell>;
}
