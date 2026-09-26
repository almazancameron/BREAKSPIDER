"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SplashEntry from "./SplashEntry";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./HomePrototype02.module.css";

type Artifact = {
  id: string;
  label: string;
  title: string;
  description: string;
  image?: string;
  destination: string;
  destinationLabel: string;
};

const artifacts: Artifact[] = [
  {
    id: "battle",
    label: "PP / BUILD 01",
    title: "Battle Plans in progress",
    description: "A real priority-builder screen from Pixel Pugilists. Conditions, techniques, and a mock battle state share one workspace.",
    image: "/media/pp-priority.png",
    destination: "/projects/pixel-pugilists",
    destinationLabel: "Pixel Pugilists",
  },
  {
    id: "platform",
    label: "VISCAP / SYSTEM 02",
    title: "One product, many systems",
    description: "A storyboard view from Viscap, one part of a larger connected production platform.",
    image: "/media/viscap-storyboard.png",
    destination: "/projects/viscap",
    destinationLabel: "Viscap",
  },
  {
    id: "map",
    label: "FOUND / MAP 03",
    title: "A map of the public rooms",
    description: "A shortcut to the public parts of Breakspider. Home, Projects, and About are always available without it.",
    destination: "/map",
    destinationLabel: "Open site map",
  },
];

const familiars = [
  { name: "Ashwing", image: "/media/ashwing.png", tags: "BURN / OFFENSE" },
  { name: "Pebbloq", image: "/media/pebbloq.png", tags: "STONE / DEFENSE" },
];

function MapGlyph() {
  return (
    <svg viewBox="0 0 170 130" role="img" aria-label="A small diagram of the public site routes">
      <path d="M20 18h129v95H20z" fill="#21273b" stroke="#b9f45d" strokeWidth="2" />
      <path d="M45 43 87 27l43 36-36 42-55-15z" fill="none" stroke="#8a91b3" strokeWidth="2" strokeDasharray="5 4" />
      <path d="m45 43 45 39 40-19M90 82l4 23" fill="none" stroke="#f4eee4" strokeWidth="2" />
      <circle cx="45" cy="43" r="7" fill="#ef7ea6" /><circle cx="130" cy="63" r="7" fill="#71dcf3" /><circle cx="94" cy="105" r="7" fill="#b9f45d" />
      <text x="26" y="31">HOME</text><text x="110" y="52">WORK</text><text x="105" y="120">ABOUT</text>
    </svg>
  );
}

export default function HomePrototype02() {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [familiarIndex, setFamiliarIndex] = useState(0);
  const [pileIndex, setPileIndex] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEntered(params.has("preview") || window.localStorage.getItem("breakspider-entered") === "true");
    setMuted(window.localStorage.getItem("breakspider-muted") !== "false");
  }, []);

  useEffect(() => {
    if (!artifact && !profileOpen && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setArtifact(null); setProfileOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [artifact, profileOpen, menuOpen]);

  const inspect = (item: Artifact) => { setArtifact(item); playInterfaceNote(); };
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    window.localStorage.setItem("breakspider-muted", String(next));
    if (!next) window.setTimeout(playInterfaceNote, 0);
  };
  const finishEntry = () => {
    window.localStorage.setItem("breakspider-entered", "true");
    setEntered(true);
  };
  const replayEntry = () => {
    window.localStorage.removeItem("breakspider-entered");
    setEntered(false);
  };
  const familiar = familiars[familiarIndex];

  return (
    <>
      <div className={styles.site} inert={!entered} aria-hidden={!entered}>
        <header className={styles.header}>
          <Link className={styles.headerBrand} href="/" aria-label="Breakspider home" onClick={playInterfaceNote}><img src="/media/spider.svg" alt="" /><b>BREAKSPIDER</b><span>PROFILE / 02</span></Link>
          <nav className={styles.nav} aria-label="Primary navigation"><Link href="/">Home</Link><Link href="/projects">Projects</Link><Link href="/about">About</Link></nav>
          <div className={styles.headerTools}>
            <button type="button" className={styles.mute} onClick={toggleMute} aria-label={`Audio ${muted ? "off" : "on"}. Toggle audio`}>{muted ? "◌" : "♫"}<span>Sound {muted ? "off" : "on"}</span></button>
            <button type="button" className={styles.avatar} aria-label="Open visitor profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); setMenuOpen(false); playInterfaceNote(); }}><img src="/media/default-avatar.png" alt="" /></button>
            <button type="button" className={styles.menuButton} aria-expanded={menuOpen} aria-controls="p02-menu" onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }}> {menuOpen ? "Close" : "Menu"} </button>
          </div>
        </header>
        {menuOpen && <nav className={styles.mobileMenu} id="p02-menu" aria-label="Mobile navigation"><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link><Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link><Link href="/about" onClick={() => setMenuOpen(false)}>About + contact</Link><Link href="/sketchbook" onClick={() => setMenuOpen(false)}>Sketchbook</Link></nav>}

        <main className={styles.canvas} id="main-content">
          <div className={styles.backGrid} aria-hidden="true" />
          <div className={styles.identityStrip}>
            <img src="/media/breakspider-logo.svg" alt="Breakspider" />
            <div><span>PERSONAL INTERNET SPACE</span><b>currently online <i /></b></div>
          </div>
          <Link className={styles.roamingFamiliar} href="/familiars" aria-label="Meet the Familiars"><img src="/media/ashwing.png" alt="" /><span>WILD ENCOUNTER ↗</span></Link>
          <span className={styles.sideReadout}>PROFILE CANVAS // PUBLIC BUILD 02 <span>↓</span></span>

          <section className={styles.spotlight} aria-labelledby="p02-spotlight-title">
            <div className={styles.windowBar}><span><i /> PINNED TO PROFILE</span><span>NOW / OPEN TO WORK</span><span>□ ×</span></div>
            <div className={styles.spotlightBody}>
              <span className={styles.signal}>● AVAILABLE FOR WORK <span>// [YOUR NAME]</span></span>
              <h1 id="p02-spotlight-title">Full-stack<br />software engineer.<br /><em>Game developer.</em></h1>
              <p>I build connected applications, game systems, and interfaces with a few things worth poking at.</p>
              <div className={styles.spotlightLinks}><Link href="/projects" onClick={playInterfaceNote}>See projects <span>↗</span></Link><Link href="/about" onClick={playInterfaceNote}>About + contact <span>↗</span></Link></div>
              <div className={styles.spotlightFacts}><span>WEB APPS</span><span>GAME SYSTEMS</span><span>INTERACTIONS</span></div>
            </div>
            <div className={styles.heroCapture}><div><span>LIVE BUILD / PP</span><span>●</span></div><img src="/media/pp-combat.png" alt="Pixel Pugilists combat prototype" /><button type="button" onClick={() => inspect(artifacts[0])}>Inspect build artifact ↗</button></div>
            <span className={styles.spotlightCorner} aria-hidden="true">◆</span>
          </section>

          <section className={styles.about} aria-labelledby="p02-about-title">
            <span className={styles.moduleNumber}>01 / PERSON.TXT</span><h2 id="p02-about-title">ABOUT <span>ME</span></h2>
            <p>[Your Name] · full-stack engineering, systems thinking, and a lot of time spent making games.</p>
            <small className={styles.contactPlaceholder}>CONTACT: you@example.com</small>
            <Link href="/about" onClick={playInterfaceNote}>Profile, contact + résumé <span>↗</span></Link>
            <span className={styles.aboutBracket} aria-hidden="true">[ mostly human ]</span>
          </section>

          <section className={styles.projects} aria-labelledby="p02-projects-title">
            <div className={styles.projectHead}><span>02 / DIRECTORY</span><h2 id="p02-projects-title">THINGS I&apos;VE MADE<span>↗</span></h2></div>
            <div className={styles.projectImages}>
              <Link className={styles.viscapScreen} href="/projects/viscap" aria-label="Open Viscap project"><img src="/media/viscap-storyboard.png" alt="Viscap storyboard system" /><span>VISCAP / PLATFORM</span></Link>
              <Link className={styles.ppScreen} href="/projects/pixel-pugilists" aria-label="Open Pixel Pugilists project"><img src="/media/pp-priority.png" alt="Pixel Pugilists priority builder" /><span>PP / GAME BUILD</span></Link>
            </div>
            <div className={styles.projectBottom}><span>ONE CONNECTED PLATFORM + ONE GAME IN PROGRESS</span><Link href="/projects" onClick={playInterfaceNote}>All projects ↗</Link></div>
          </section>

          <section className={styles.current} aria-labelledby="p02-current-title"><span className={styles.moduleNumber}>CURRENT QUEST / IN DEVELOPMENT</span><h2 id="p02-current-title">PIXEL<br />PUGILISTS</h2><p>Deterministic autobattler. Systems, creatures, lots of iterations.</p><Link href="/projects/pixel-pugilists">Open project ↗</Link><img src="/media/pebbloq.png" alt="" /></section>

          <section className={styles.sketchbook} aria-labelledby="p02-sketch-title"><div className={styles.forumTop}><span>THREAD / LATEST NOTE</span><span>↗</span></div><h2 id="p02-sketch-title">Battle plans, first pass</h2><p>Priority rules are easier to change when you can actually see them.</p><Link href="/sketchbook">Read Sketchbook ↗</Link><small>GAME DESIGN · UI · WIP</small></section>

          <section className={styles.familiar} aria-labelledby="p02-familiar-title"><button type="button" className={styles.familiarSprite} onClick={() => { setFamiliarIndex((familiarIndex + 1) % familiars.length); playInterfaceNote(); }} aria-label="Show another Familiar"><img src={familiar.image} alt={`${familiar.name}, a Pixel Pugilists Familiar`} /><span>↻</span></button><div><span className={styles.moduleNumber}>RANDOM FAMILIAR</span><h2 id="p02-familiar-title">{familiar.name}</h2><p>{familiar.tags}</p><Link href="/familiars">Meet the Familiars ↗</Link></div></section>

          <section className={styles.changelog} aria-labelledby="p02-log-title"><div><span>UPDATE.TXT</span><span>v0.2</span></div><h2 id="p02-log-title">Site changelog</h2><p>Homepage layout updated. Pixel Pugilists and Viscap previews added.</p><Link href="/sketchbook">See updates ↗</Link></section>

          <button type="button" className={styles.foundMap} onClick={() => inspect(artifacts[2])}><MapGlyph /><span>found: MAP.EXE <b>inspect ↗</b></span></button>

          <section className={styles.pile} aria-labelledby="p02-pile-title"><div className={styles.pileTitle}><span>OPEN FILES / 03</span><h2 id="p02-pile-title">Stuff you can inspect.</h2><p>Click a file. There&apos;s actual work inside.</p><small className={styles.swipeHint}>SWIPE FILES →</small><button type="button" onClick={() => { setPileIndex((pileIndex + 1) % artifacts.length); playInterfaceNote(); }}>Shuffle focus ↻</button></div><div className={styles.pileObjects}>{artifacts.map((item, index) => <button type="button" key={item.id} className={`${styles.pileFile} ${pileIndex === index ? styles.pileActive : ""}`} onMouseEnter={() => setPileIndex(index)} onFocus={() => setPileIndex(index)} onClick={() => inspect(item)}><span>{item.label} <b>□ ×</b></span>{item.image ? <img src={item.image} alt="" /> : <MapGlyph />}<strong>{item.title} ↗</strong></button>)}</div></section>
        </main>
        <footer className={styles.footer}><span>BREAKSPIDER / PROFILE BUILD 02</span><div><Link href="/prototype-01">View Prototype 01 ↗</Link><button type="button" onClick={replayEntry}>Replay intro ↻</button><Link href="/map">Map ↗</Link></div></footer>
      </div>
      {!entered && <SplashEntry onEntered={finishEntry} />}
      {profileOpen && entered && <div className={styles.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setProfileOpen(false); }}><section className={styles.profileDialog} role="dialog" aria-modal="true" aria-label="Visitor profile"><div className={styles.dialogBar}>VISITOR PROFILE <button type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button></div><div className={styles.profileIdentity}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><small>LOCAL SAVE SLOT / 000</small><h2>Visitor 000</h2><p>Default avatar equipped.</p></div></div><div className={styles.profileStats}><span>FOUND <b>0 / ??</b></span><span>STATUS <b>EXPLORING</b></span></div><Link href="/collection">Open Collection ↗</Link></section></div>}
      {artifact && entered && <div className={styles.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setArtifact(null); }}><section className={styles.inspectDialog} role="dialog" aria-modal="true" aria-labelledby="p02-inspect-title"><div className={styles.dialogBar}><span>{artifact.label}</span><button type="button" onClick={() => setArtifact(null)} aria-label="Close inspection">×</button></div><div className={styles.inspectContent}><div className={styles.inspectVisual}>{artifact.image ? <img src={artifact.image} alt={artifact.title} /> : <MapGlyph />}</div><div><span className={styles.moduleNumber}>FILE OPENED</span><h2 id="p02-inspect-title">{artifact.title}</h2><p>{artifact.description}</p><Link href={artifact.destination}>{artifact.destinationLabel} ↗</Link><button type="button" onClick={() => setArtifact(null)}>Close file ×</button></div></div></section></div>}
    </>
  );
}
