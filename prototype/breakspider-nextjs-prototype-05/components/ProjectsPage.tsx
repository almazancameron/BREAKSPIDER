"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { playInterfaceNote } from "./SiteHeader";
import shell from "./HomePrototype05.module.css";
import styles from "./ProjectsPage.module.css";

const viscapFrames = [
  { src: "/media/viscap-storyboard.png", alt: "Viscap storyboard view with production rows and clip details", label: "Storyboard" },
  { src: "/media/viscap-actor.png", alt: "Viscap actor hub interface", label: "Actor hub" },
];
const gameFrames = [
  { src: "/media/pp-combat.png", alt: "Pixel Pugilists combat prototype with two Familiars and combat log", label: "Combat build" },
  { src: "/media/pp-priority.png", alt: "Pixel Pugilists priority builder with rules and conditions", label: "Priority builder" },
];

export default function ProjectsPage() {
  const [muted, setMuted] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [viscapFrame, setViscapFrame] = useState(0);
  const [gameFrame, setGameFrame] = useState(0);

  useEffect(() => { setMuted(window.localStorage.getItem("breakspider-muted") !== "false"); }, []);
  useEffect(() => {
    if (!profileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setProfileOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [profileOpen]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    window.localStorage.setItem("breakspider-muted", String(next));
    if (!next) window.setTimeout(playInterfaceNote, 0);
  }

  return <div className={`${shell.site} ${styles.page}`}>
    <header className={shell.header}>
      <div className={shell.headerLeft}>
        <button type="button" className={shell.avatar} aria-label="Open visitor profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); playInterfaceNote(); }}><img src="/media/default-avatar.png" alt="" /><img className={shell.profileBadge} src="/media/p03-heart-badge.png" alt="" /></button>
        <button type="button" className={shell.mute} onClick={toggleMute} aria-label={`Audio ${muted ? "off" : "on"}. Toggle audio`}>{muted ? "◌" : "♫"}<span>Sound {muted ? "off" : "on"}</span></button>
      </div>
      <nav className={shell.nav} aria-label="Primary navigation"><Link href="/" onClick={playInterfaceNote}>Home</Link><Link href="/projects" aria-current="page">Projects</Link><Link href="/about" onClick={playInterfaceNote}>About</Link></nav>
      <div className={shell.headerRight}><div className={shell.headerStatus}><span>PERSONAL INTERNET SPACE</span><b>currently online <i /></b></div><Link className={shell.headerBrand} href="/" aria-label="Breakspider home" onClick={playInterfaceNote}><img src="/media/breakspider-logo.svg" alt="Breakspider" /></Link></div>
    </header>

    <main className={styles.main} id="main-content">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.routeLine}><Link href="/">← HOME</Link><span>/ PROJECTS</span><b>PUBLIC ARCHIVE / 02 ENTRIES</b></div>

      <section className={styles.intro} aria-labelledby="projects-title">
        <div><span className={styles.kicker}>WORK ARCHIVE / SO FAR</span><h1 id="projects-title">Things I&apos;ve<br /><em>made.</em></h1><p>Software, games, and the systems behind them. Two projects are public right now.</p></div>
        <nav className={styles.index} aria-label="Projects on this page"><span>JUMP TO A FILE</span><a href="#viscap"><b>01</b> Viscap <small>software ↘</small></a><a href="#pixel-pugilists"><b>02</b> Pixel Pugilists <small>game ↘</small></a></nav>
      </section>

      <div className={styles.spine} aria-hidden="true"><span>01</span><i /><span>02</span></div>

      <section className={styles.viscap} id="viscap" aria-labelledby="viscap-title">
        <div className={styles.viscapCopy}><span className={styles.kicker}>01 / PROFESSIONAL SOFTWARE</span><img className={styles.viscapMark} src="/media/p04-viscap-mark.png" alt="" /><h2 id="viscap-title">Viscap</h2><p>One connected platform for media, creative production, people, and workflows.</p><dl><div><dt>Work</dt><dd>Full-stack engineering and product support</dd></div><div><dt>Shape</dt><dd>Several systems in one application</dd></div></dl><Link className={styles.openLink} href="/projects/viscap" onClick={playInterfaceNote}>Open Viscap <span>↗</span></Link></div>
        <div className={styles.viscapViewport}><div className={styles.viewportBar}><span>VISCAP / PLATFORM VIEW</span><span>□ ×</span></div><img src={viscapFrames[viscapFrame].src} alt={viscapFrames[viscapFrame].alt} /><div className={styles.viewportControls}><span>{viscapFrames[viscapFrame].label}</span><div>{viscapFrames.map((frame, index) => <button type="button" key={frame.label} aria-label={`Show Viscap ${frame.label} screenshot`} aria-pressed={viscapFrame === index} onClick={() => { setViscapFrame(index); playInterfaceNote(); }}>{String(index + 1).padStart(2, "0")}</button>)}</div></div></div>
        <div className={styles.systems}><span>SOME OF THE CONNECTED PARTS</span><ul><li>Media library</li><li>Storyboards</li><li>Actor hub</li><li>Production workflows</li></ul></div>
        <img className={styles.viscapSmall} src="/media/viscap-media.png" alt="" aria-hidden="true" />
      </section>

      <section className={styles.game} id="pixel-pugilists" aria-labelledby="game-title">
        <div className={styles.gameIntro}><span className={styles.kicker}>02 / GAME IN DEVELOPMENT</span><h2 id="game-title">Pixel<br />Pugilists</h2><p>A deterministic autobattler built around Familiars, priorities, and seeing a plan actually play out.</p><div className={styles.gameFacts}><span>DESIGN + IMPLEMENTATION</span><span>GODOT / SIMULATION</span><span>ACTIVE BUILD</span></div><Link className={styles.openLink} href="/projects/pixel-pugilists" onClick={playInterfaceNote}>Open Pixel Pugilists <span>↗</span></Link><div className={styles.gameLinks}><Link href="/familiars">Familiars ↗</Link><Link href="/sketchbook">Development notes ↗</Link></div></div>
        <div className={styles.gameViewport}><div className={styles.gameBar}><span>PP / {gameFrames[gameFrame].label.toUpperCase()}</span><span>BUILD IN PROGRESS •</span></div><img src={gameFrames[gameFrame].src} alt={gameFrames[gameFrame].alt} /><div className={styles.gameControls}><span>VIEW BUILD SCREEN</span><div>{gameFrames.map((frame, index) => <button type="button" key={frame.label} aria-label={`Show Pixel Pugilists ${frame.label} screenshot`} aria-pressed={gameFrame === index} onClick={() => { setGameFrame(index); playInterfaceNote(); }}>{frame.label}</button>)}</div></div></div>
        <img className={styles.ashwing} src="/media/ashwing.png" alt="" aria-hidden="true" /><img className={styles.pebbloq} src="/media/pebbloq.png" alt="" aria-hidden="true" /><img className={styles.godot} src="/media/p04-pp-godot.png" alt="" aria-hidden="true" />
      </section>

      <section className={styles.after} aria-label="More from Breakspider"><span className={styles.kicker}>ARCHIVE END / FOR NOW</span><p>More work will show up here as it exists.</p><div><Link href="/about">About + contact ↗</Link><Link href="/sketchbook">Sketchbook ↗</Link></div></section>

      <div className={styles.clutter} aria-hidden="true"><img className={styles.noiseA} src="/media/p04-noise-blue-12.png" alt="" /><img className={styles.noiseB} src="/media/p04-noise-red-03.png" alt="" /><img className={styles.noiseC} src="/media/p03-noise-green-bonus.png" alt="" /><img className={styles.noiseD} src="/media/p04-noise-orange-15.png" alt="" /><img className={styles.noiseE} src="/media/p03-noise-lavender-15.png" alt="" /><img className={styles.pickup} src="/media/p03-mana-crystal.gif" alt="" /><img className={styles.badge} src="/media/p04-badge-ice.png" alt="" /></div>
    </main>

    <footer className={styles.footer}><span>BREAKSPIDER / PROJECTS</span><div><Link href="/">Home ↗</Link><Link href="/about">About ↗</Link><Link href="/map">Map ↗</Link></div></footer>
    {profileOpen && <div className={shell.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setProfileOpen(false); }}><section className={shell.profileDialog} role="dialog" aria-modal="true" aria-label="Visitor profile"><div className={shell.dialogBar}>VISITOR PROFILE <button type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button></div><div className={shell.profileIdentity}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><small>LOCAL SAVE SLOT / 000</small><h2>Visitor 000</h2><p>Default avatar equipped.</p></div></div><div className={shell.profileStats}><span>FOUND <b>0 / ??</b></span><span>STATUS <b>EXPLORING</b></span></div><Link href="/collection">Open Collection ↗</Link></section></div>}
  </div>;
}
