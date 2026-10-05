"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { playInterfaceNote } from "./SiteHeader";
import shell from "./HomePrototype05.module.css";
import styles from "./PixelPugilistsPage.module.css";

type BuildImage = { src: string; alt: string; label: string; detail: string };

const buildImages: BuildImage[] = [
    { src: "/media/pp-combat.png", alt: "Pixel Pugilists combat screen with two Familiars and a combat log", label: "Combat", detail: "Two Familiars, their status displays, and the combat log in the current prototype." },
    { src: "/media/pp-priority.png", alt: "Priority Builder showing rules, conditions, techniques, and mock state", label: "Priority Builder", detail: "Priority slots, a conditions palette, available techniques, and a mock state in one work surface." },
    { src: "/media/pp-bracket.png", alt: "Pixel Pugilists tournament bracket screen", label: "Bracket", detail: "A bracket screen showing the current round and upcoming opponents." },
    { src: "/media/pp-reward.png", alt: "Pixel Pugilists bout reward selection screen", label: "Rewards", detail: "The reward selection screen between bouts." },
    { src: "/media/pp-godot-panel.png", alt: "Godot editor showing part of the battle scene and scene tree", label: "Godot", detail: "A capture from the Godot editor while the battle interface was being built." },
];

export default function PixelPugilistsPage() {
    const [muted, setMuted] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(2);
    const [inspection, setInspection] = useState<BuildImage | null>(null);

    useEffect(() => { setMuted(window.localStorage.getItem("breakspider-muted") !== "false"); }, []);
    useEffect(() => {
        if (!profileOpen && !inspection) return;
        const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setProfileOpen(false); setInspection(null); } };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [profileOpen, inspection]);

    function toggleMute() {
        const next = !muted;
        setMuted(next);
        window.localStorage.setItem("breakspider-muted", String(next));
        if (!next) window.setTimeout(playInterfaceNote, 0);
    }
    function inspect(image: BuildImage) { setInspection(image); playInterfaceNote(); }

    return <div className={`${shell.site} ${styles.page}`}>
        <header className={shell.header}>
            <div className={shell.headerLeft}>
                <button type="button" className={shell.avatar} aria-label="Open visitor profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); playInterfaceNote(); }}><img src="/media/default-avatar.png" alt="" /><img className={shell.profileBadge} src="/media/p03-heart-badge.png" alt="" /></button>
                <button type="button" className={shell.mute} onClick={toggleMute} aria-label={`Audio ${muted ? "off" : "on"}. Toggle audio`}>{muted ? "◌" : "♫"}<span>Sound {muted ? "off" : "on"}</span></button>
            </div>
            <nav className={shell.nav} aria-label="Primary navigation"><Link href="/" onClick={playInterfaceNote}>Home</Link><Link href="/projects" aria-current="page" onClick={playInterfaceNote}>Projects</Link><Link href="/about" onClick={playInterfaceNote}>About</Link></nav>
            <div className={shell.headerRight}><div className={shell.headerStatus}><span>PERSONAL INTERNET SPACE</span><b>currently online <i /></b></div><Link className={shell.headerBrand} href="/" aria-label="Breakspider home" onClick={playInterfaceNote}><img src="/media/breakspider-logo.svg" alt="Breakspider" /></Link></div>
        </header>

        <main className={styles.main} id="main-content">
            <div className={styles.grid} aria-hidden="true" />
            <div className={styles.routeLine}><Link href="/projects">← THINGS I&apos;VE MADE</Link><span>/ PIXEL PUGILISTS</span><b>PROJECT FILE / ACTIVE</b></div>

            <section className={styles.hero} aria-labelledby="pp-title">
                <div className={styles.heroCopy}><span className={styles.kicker}>GAME PROJECT / IN DEVELOPMENT</span><h1 id="pp-title">Pixel<br /><em>Pugilists.</em></h1><p>A deterministic autobattler about Familiars, priorities, and watching a battle plan meet an actual opponent.</p><div className={styles.heroFacts}><span>DESIGN + IMPLEMENTATION</span><span>GODOT</span><span>ACTIVE PROTOTYPE</span></div><div className={styles.heroLinks}><a href="#battle-plans">See battle plans ↓</a><Link href="/familiars">Meet the Familiars ↗</Link></div></div>
                <div className={styles.heroStage}><div className={styles.stageBar}><span>PIXEL PUGILISTS / COMBAT BUILD</span><span>● LIVE CAPTURE</span></div><button type="button" className={styles.stageImage} onClick={() => inspect(buildImages[0])} aria-label="Inspect Pixel Pugilists combat screenshot"><img src="/media/pp-combat.png" alt="Pixel Pugilists combat prototype" /><span>Inspect combat screen ↗</span></button></div>
                <div className={styles.heroFamiliars}><div><img src="/media/ashwing.png" alt="Ashwing Familiar" /><span>ASHWING</span></div><div><img src="/media/pebbloq.png" alt="Pebbloq Familiar" /><span>PEBBLOQ</span></div></div>
                <span className={styles.heroAside}>THE GAME IS STILL IN PIECES. THESE ARE SOME OF THE PIECES.</span>
            </section>

            <section className={styles.loop} aria-label="Screens in the current build"><span className={styles.kicker}>CURRENT BUILD / VISIBLE PARTS</span><div><span>01 <b>Set priorities</b></span><i>→</i><span>02 <b>Watch combat</b></span><i>→</i><span>03 <b>Advance a bracket</b></span><i>→</i><span>04 <b>Choose a reward</b></span></div></section>

            <section className={styles.plans} id="battle-plans" aria-labelledby="plans-title">
                <div className={styles.plansIntro}><span className={styles.kicker}>01 / BATTLE PLANS</span><h2 id="plans-title">The plan goes<br /><em>in first.</em></h2><p>Priority slots, techniques, status comparisons, and a mock state are visible together in the builder. It makes the rules easier to inspect and change.</p><Link href="/sketchbook">Related dev notes ↗</Link></div>
                <button type="button" className={styles.priorityScreen} onClick={() => inspect(buildImages[1])} aria-label="Inspect Priority Builder screenshot"><span>PRIORITY BUILDER / WORKING SCREEN <b>□ ×</b></span><img src="/media/pp-priority.png" alt="Pixel Pugilists Priority Builder" /><strong>Open full screenshot ↗</strong></button>
                <div className={styles.plansRule}><span>WHAT IS ON THIS SCREEN</span><ol><li>Familiar stats and available techniques</li><li>Ordered priority slots</li><li>Conditions palette and mock battle state</li></ol></div>
                <img className={styles.plansGodot} src="/media/pp-godot-panel.png" alt="" aria-hidden="true" />
            </section>

            <section className={styles.build} id="build-evidence" aria-labelledby="build-title">
                <div className={styles.buildIntro}><span className={styles.kicker}>02 / MORE OF THE BUILD</span><h2 id="build-title">Screens, tests,<br />and rough edges.</h2><p>These are captures from the current work, including the game UI and the editor behind it.</p></div>
                <div className={styles.buildViewer}><div className={styles.viewerBar}><span>{String(activeImage + 1).padStart(2, "0")} / {String(buildImages.length).padStart(2, "0")} &nbsp; {buildImages[activeImage].label.toUpperCase()}</span><button type="button" onClick={() => inspect(buildImages[activeImage])}>Inspect ↗</button></div><img src={buildImages[activeImage].src} alt={buildImages[activeImage].alt} /><p>{buildImages[activeImage].detail}</p></div>
                <div className={styles.buildChooser} aria-label="Choose a build screenshot">{buildImages.map((image, index) => <button type="button" key={image.label} aria-pressed={activeImage === index} onClick={() => { setActiveImage(index); playInterfaceNote(); }}><span>{String(index + 1).padStart(2, "0")}</span>{image.label}</button>)}</div>
                <img className={styles.buildReward} src="/media/pp-reward.png" alt="" aria-hidden="true" /><img className={styles.buildBracket} src="/media/pp-bracket.png" alt="" aria-hidden="true" />
            </section>

            <aside className={styles.related} aria-label="Related routes"><div><span className={styles.kicker}>OTHER FILES CONNECTED TO THIS</span><p>Familiars and development notes have their own places on the site.</p></div><Link href="/familiars"><img src="/media/ashwing.png" alt="" />Familiars ↗</Link><Link href="/sketchbook">Sketchbook ↗</Link><Link href="/projects">All projects ↗</Link></aside>

            <div className={styles.clutter} aria-hidden="true"><img className={styles.noiseA} src="/media/p04-noise-orange-04.png" alt="" /><img className={styles.noiseB} src="/media/p03-noise-blue-09.png" alt="" /><img className={styles.noiseC} src="/media/p04-noise-red-07.png" alt="" /><img className={styles.badgeFire} src="/media/p04-badge-fire.png" alt="" /><img className={styles.badgeVial} src="/media/p04-badge-vial.png" alt="" /><img className={styles.strawberry} src="/media/p04-strawberry.gif" alt="" /></div>
        </main>

        <footer className={styles.footer}><span>BREAKSPIDER / PIXEL PUGILISTS</span><div><Link href="/projects">Projects ↗</Link><Link href="/about">About ↗</Link><Link href="/">Home ↗</Link></div></footer>
        {profileOpen && <div className={shell.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setProfileOpen(false); }}><section className={shell.profileDialog} role="dialog" aria-modal="true" aria-label="Visitor profile"><div className={shell.dialogBar}>VISITOR PROFILE <button type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button></div><div className={shell.profileIdentity}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><small>LOCAL SAVE SLOT / 000</small><h2>Visitor 000</h2><p>Default avatar equipped.</p></div></div><div className={shell.profileStats}><span>FOUND <b>0 / ??</b></span><span>STATUS <b>EXPLORING</b></span></div><Link href="/collection">Open Collection ↗</Link></section></div>}
        {inspection && <div className={styles.inspectionOverlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setInspection(null); }}><section className={styles.inspection} role="dialog" aria-modal="true" aria-label={`${inspection.label} screenshot`}><div><span>PP / {inspection.label.toUpperCase()}</span><button type="button" onClick={() => setInspection(null)} aria-label="Close screenshot">×</button></div><img src={inspection.src} alt={inspection.alt} /><p>{inspection.detail}</p></section></div>}
    </div>;
}
