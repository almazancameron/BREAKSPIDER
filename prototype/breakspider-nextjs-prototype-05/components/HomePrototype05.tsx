"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SplashEntry from "./SplashEntry";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./HomePrototype05.module.css";

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
        title: "Battle plans in progress",
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

const noiseSources = {
    blue: "/media/p03-noise-blue.png",
    blue03: "/media/p03-noise-blue-03.png",
    blue09: "/media/p03-noise-blue-09.png",
    blue05: "/media/p04-noise-blue-05.png",
    blue12: "/media/p04-noise-blue-12.png",
    blue15: "/media/p04-noise-blue-15.png",
    green: "/media/p03-noise-green-bonus.png",
    lavender: "/media/p03-noise-lavender.png",
    lavender04: "/media/p03-noise-lavender-04.png",
    lavender15: "/media/p03-noise-lavender-15.png",
    lavender02: "/media/p04-noise-lavender-02.png",
    lavender07: "/media/p04-noise-lavender-07.png",
    lavender11: "/media/p04-noise-lavender-11.png",
    orange02: "/media/p03-noise-orange-02.png",
    orange08: "/media/p03-noise-orange-08.png",
    orange04: "/media/p04-noise-orange-04.png",
    orange11: "/media/p04-noise-orange-11.png",
    orange15: "/media/p04-noise-orange-15.png",
    red: "/media/p03-noise-red.png",
    red12: "/media/p03-noise-red-12.png",
    red03: "/media/p04-noise-red-03.png",
    red07: "/media/p04-noise-red-07.png",
    red15: "/media/p04-noise-red-15.png",
};
type NoisePiece = readonly [keyof typeof noiseSources, number, number, number];

const upperLeftNoise: NoisePiece[] = [
    ["red07", 12, 24, 31], ["orange02", 41, 63, 26], ["blue05", -4, 104, 40],
    ["lavender02", 26, 142, 35], ["orange04", -10, 189, 52], ["blue12", 38, 214, 29],
    ["red03", 12, 263, 38], ["green", 42, 307, 25], ["lavender11", -3, 333, 45],
    ["orange02", 30, 386, 39], ["blue15", -5, 429, 47], ["red12", 36, 465, 34],
    ["lavender07", 0, 512, 39], ["orange11", 27, 555, 50], ["blue03", -7, 602, 38],
];
const upperRightNoise: NoisePiece[] = [
    ["blue09", 40, 30, 40], ["red15", 9, 89, 36], ["lavender04", 52, 128, 44],
    ["orange15", 2, 187, 52], ["blue12", 48, 242, 36], ["green", 18, 291, 26],
    ["red", 57, 340, 43], ["lavender07", 45, 390, 40], ["orange04", 42, 455, 39],
    ["blue03", 60, 500, 35], ["red12", 39, 563, 47], ["lavender", 54, 621, 36],
    ["orange08", 42, 685, 51],
];
const lowerLeftNoise: NoisePiece[] = [
    ["orange08", 6, 25, 47], ["blue03", 10, 72, 32], ["lavender11", -2, 126, 39],
    ["green", 32, 174, 23], ["red07", 5, 250, 35], ["orange11", 45, 286, 56],
    ["blue09", -5, 365, 48], ["red12", 37, 411, 34], ["lavender15", -7, 470, 46],
    ["orange02", -6, 516, 39], ["blue05", -13, 590, 55], ["green", 5, 643, 25],
];
const lowerRightNoise: NoisePiece[] = [
    ["lavender15", 56, 25, 40], ["red03", 28, 79, 37], ["blue15", 60, 134, 48],
    ["orange02", 12, 187, 35], ["green", 78, 225, 25], ["lavender02", 43, 263, 56],
    ["blue03", 10, 321, 42], ["red15", 62, 376, 38], ["orange15", 27, 421, 61],
    ["blue", 77, 484, 38], ["lavender04", 8, 534, 50], ["red", 59, 584, 45],
    ["green", 24, 627, 31],
];
const bridgeNoise: NoisePiece[] = [
    ["red15", 0, 5, 32], ["blue05", 55, 27, 42], ["lavender02", 100, 0, 35],
    ["green", 147, 45, 25], ["orange11", 180, 13, 43], ["blue12", 245, 52, 39],
    ["red07", 291, 17, 34], ["lavender11", 118, 78, 45], ["orange04", 25, 83, 35],
];
const rightPocketNoise: NoisePiece[] = [
    ["green", 15, 15, 25], ["lavender07", 74, 0, 42], ["red12", 137, 28, 34],
    ["blue15", 179, 11, 43], ["orange15", 194, 85, 45], ["lavender02", 112, 124, 40],
    ["blue09", 27, 136, 33], ["red03", 53, 68, 33],
];
const lowerPocketNoise: NoisePiece[] = [
    ["red07", 0, 15, 36], ["blue03", 54, 44, 32], ["lavender15", 96, 1, 43],
    ["green", 153, 29, 24], ["orange04", 194, 6, 42], ["blue12", 247, 57, 39],
    ["red15", 295, 21, 33], ["lavender11", 342, 52, 43], ["orange02", 134, 81, 35],
];

function NoiseBank({ pieces, className }: { pieces: NoisePiece[]; className: string }) {
    return <div className={`${styles.noiseBank} ${className}`} aria-hidden="true">{pieces.map(([sprite, x, y, size], index) => <img key={index} src={noiseSources[sprite]} alt="" style={{ left: x, top: y, width: size, height: size }} />)}</div>;
}

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

export default function HomePrototype05() {
    const [entered, setEntered] = useState(false);
    const [muted, setMuted] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [artifact, setArtifact] = useState<Artifact | null>(null);
    const [familiarIndex, setFamiliarIndex] = useState(0);
    const [pileIndex, setPileIndex] = useState(0);
    const [crystalFound, setCrystalFound] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setEntered(params.has("preview") || window.localStorage.getItem("breakspider-entered") === "true");
        setMuted(window.localStorage.getItem("breakspider-muted") !== "false");
    }, []);

    useEffect(() => {
        if (!artifact && !profileOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") { setArtifact(null); setProfileOpen(false); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [artifact, profileOpen]);

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
                    <div className={styles.headerLeft}>
                        <button type="button" className={styles.avatar} aria-label="Open visitor profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); playInterfaceNote(); }}><img src="/media/default-avatar.png" alt="" /><img className={styles.profileBadge} src="/media/p03-heart-badge.png" alt="" /></button>
                        <button type="button" className={styles.mute} onClick={toggleMute} aria-label={`Audio ${muted ? "off" : "on"}. Toggle audio`}>{muted ? "◌" : "♫"}<span>Sound {muted ? "off" : "on"}</span></button>
                    </div>
                    <nav className={styles.nav} aria-label="Primary navigation"><Link href="/" aria-current="page">Home</Link><Link href="/projects">Projects</Link><Link href="/about">About</Link></nav>
                    <div className={styles.headerRight}>
                        <div className={styles.headerStatus}><span>PERSONAL INTERNET SPACE</span><b>currently online <i /></b></div>
                        <Link className={styles.headerBrand} href="/" aria-label="Breakspider home" onClick={playInterfaceNote}><img src="/media/breakspider-logo.svg" alt="Breakspider" /></Link>
                    </div>
                </header>

                <main className={styles.canvas} id="main-content">
                    <div className={styles.backGrid} aria-hidden="true" />
                    <Link className={styles.roamingFamiliar} href="/familiars" aria-label="Meet the Familiars"><img src="/media/ashwing.png" alt="" /><span>WILD ENCOUNTER ↗</span></Link>
                    <span className={styles.sideReadout}>BREAKSPIDER · SINCE WHENEVER <span>↓</span></span>

                    <section className={styles.spotlight} aria-labelledby="p03-spotlight-title">
                        <div className={styles.windowBar}><span><i /> PINNED TO PROFILE</span><span>NOW / OPEN TO WORK</span><span>□ ×</span></div>
                        <div className={styles.spotlightBody}>
                            <span className={styles.signal}>● AVAILABLE FOR WORK <span>// [YOUR NAME]</span></span>
                            <h1 id="p03-spotlight-title">Full-stack<br />software engineer.<br /><em>Game developer.</em></h1>
                            <p>I build connected applications, game systems, and interfaces with a few things worth poking at.</p>
                            <div className={styles.spotlightLinks}><Link href="/projects" onClick={playInterfaceNote}>See projects <span>↗</span></Link><Link href="/about" onClick={playInterfaceNote}>About + contact <span>↗</span></Link></div>
                            <div className={styles.spotlightFacts}><span>WEB APPS</span><span>GAME SYSTEMS</span><span>INTERACTIONS</span></div>
                        </div>
                        <div className={styles.heroCapture}><div><span>LIVE BUILD / PP</span><span>●</span></div><img src="/media/pp-combat.png" alt="Pixel Pugilists combat prototype" /><button type="button" onClick={() => inspect(artifacts[0])}>Inspect build artifact ↗</button></div>
                        <span className={styles.spotlightCorner} aria-hidden="true">◆</span>
                        <span className={styles.spotlightBadges} aria-hidden="true"><img src="/media/p04-badge-fire.png" alt="" /><img src="/media/p04-badge-ice.png" alt="" /></span>
                    </section>

                    <section className={styles.about} aria-labelledby="p03-about-title">
                        <span className={styles.moduleNumber}>A LITTLE ABOUT ME</span><h2 id="p03-about-title">About <span>me</span></h2>
                        <p>[Your Name] · full-stack engineering, systems thinking, and a lot of time spent making games.</p>
                        <small className={styles.contactPlaceholder}>you@example.com</small>
                        <Link href="/about" onClick={playInterfaceNote}>Profile, contact + résumé <span>↗</span></Link>
                        <span className={styles.aboutBracket} aria-hidden="true">[ mostly human ]</span>
                    </section>

                    <Link className={styles.creatorPortrait} href="/about" aria-label="About the creator" title="My OC / GitHub avatar" onClick={playInterfaceNote}><img src="/media/p04-creator-oc.png" alt="Illustrated creator avatar in a purple hat" /></Link>

                    <section className={styles.projects} aria-labelledby="p03-projects-title">
                        <div className={styles.projectHead}><span>PROJECTS</span><h2 id="p03-projects-title">THINGS I&apos;VE MADE<span>↗</span></h2></div>
                        <div className={styles.projectImages}>
                            <Link className={styles.viscapScreen} href="/projects/viscap" aria-label="Open Viscap project"><img src="/media/viscap-storyboard.png" alt="Viscap storyboard system" /><img className={styles.viscapMark} src="/media/p04-viscap-mark.png" alt="" /><span>VISCAP / PLATFORM</span></Link>
                            <Link className={styles.ppScreen} href="/projects/pixel-pugilists" aria-label="Open Pixel Pugilists project"><img src="/media/pp-priority.png" alt="Pixel Pugilists priority builder" /><span>PP / GAME BUILD</span></Link>
                        </div>
                        <div className={styles.projectBottom}><span>SOFTWARE + GAMES</span><Link href="/projects" onClick={playInterfaceNote}>All projects ↗</Link></div>
                    </section>

                    <section className={styles.current} aria-labelledby="p03-current-title"><span className={styles.moduleNumber}>WORKING ON</span><h2 id="p03-current-title">PIXEL<br />PUGILISTS</h2><p>Deterministic autobattler. Systems, creatures, lots of iterations.</p><Link href="/projects/pixel-pugilists">Open project ↗</Link><img src="/media/pebbloq.png" alt="" /></section>

                    <section className={styles.sketchbook} aria-labelledby="p03-sketch-title"><div className={styles.forumTop}><span>LATEST SKETCHBOOK POST</span><span>↗</span></div><h2 id="p03-sketch-title">Battle plans, first pass</h2><p>Priority rules are easier to change when you can actually see them.</p><Link href="/sketchbook/battle-plans-first-pass">Read post ↗</Link><small>GAME DESIGN · UI · WIP</small></section>

                    <section className={styles.familiar} aria-labelledby="p03-familiar-title"><button type="button" className={styles.familiarSprite} onClick={() => { setFamiliarIndex((familiarIndex + 1) % familiars.length); playInterfaceNote(); }} aria-label="Show another Familiar"><img src={familiar.image} alt={`${familiar.name}, a Pixel Pugilists Familiar`} /><span>↻</span></button><div><span className={styles.moduleNumber}>RANDOM FAMILIAR</span><h2 id="p03-familiar-title">{familiar.name}</h2><p>{familiar.tags}</p><Link href="/familiars">Meet the Familiars ↗</Link></div><span className={styles.familiarDrops} aria-hidden="true"><img src="/media/p04-strawberry.gif" alt="" /><img src="/media/p04-badge-vial.png" alt="" /></span></section>

                    <section className={styles.changelog} aria-labelledby="p03-log-title"><div><span>UPDATE.TXT</span><span>v0.5</span></div><h2 id="p03-log-title">Site changelog</h2><p>Projects moved up beside the profile. Notes and build files are easier to reach.</p><Link href="/sketchbook">See updates ↗</Link><img className={styles.changelogMegaphone} src="/media/p04-megaphone.png" alt="" /></section>

                    <button type="button" className={styles.foundMap} onClick={() => inspect(artifacts[2])}><MapGlyph /><span>found: MAP.EXE <b>inspect ↗</b></span></button>

                    <section className={styles.pile} aria-labelledby="p03-pile-title"><div className={styles.pileTitle}><span>MORE STUFF</span><h2 id="p03-pile-title">Stuff you can inspect.</h2><p>Click a file. There&apos;s actual work inside.</p><small className={styles.swipeHint}>SWIPE FILES →</small><button type="button" onClick={() => { setPileIndex((pileIndex + 1) % artifacts.length); playInterfaceNote(); }}>Shuffle focus ↻</button></div><div className={styles.pileObjects}><span className={styles.pileKeepsakes} aria-hidden="true"><img src="/media/p04-pp-godot.png" alt="" /><img src="/media/p04-burning-blood.png" alt="" /></span>{artifacts.map((item, index) => <button type="button" key={item.id} className={`${styles.pileFile} ${pileIndex === index ? styles.pileActive : ""}`} onMouseEnter={() => setPileIndex(index)} onFocus={() => setPileIndex(index)} onClick={() => inspect(item)}><span>{item.label} <b>□ ×</b></span>{item.image ? <img src={item.image} alt="" /> : <MapGlyph />}<strong>{item.title} ↗</strong></button>)}</div></section>

                    <img className={styles.noiseEmblem} src="/media/p03-noise-blue.png" alt="" title="stuck here for a while" />
                    <button type="button" className={`${styles.lifeCrystal} ${crystalFound ? styles.crystalFound : ""}`} onClick={() => { setCrystalFound(!crystalFound); playInterfaceNote(); }} aria-label={crystalFound ? "Put the crystal back" : "Touch the little crystal"} title={crystalFound ? "okay, you found it" : "it's still here"}><img src="/media/p03-life-crystal.gif" alt="" /></button>
                    <img className={styles.lightCrystal} src="/media/p03-light-crystal.webp" alt="" title="inventory: probably full" />
                    <img className={styles.iceCream} src="/media/p03-ice-cream.png" alt="" title="emergency supplies" />
                    <img className={styles.saturn} src="/media/p03-mr-saturn.png" alt="" title="boing" />
                    <div className={styles.marginClutter} aria-hidden="true">
                        <img className={styles.debrisStone} src="/media/p03-badge-stone.png" alt="" />
                        <img className={styles.debrisMana} src="/media/p03-mana-crystal.gif" alt="" />
                        <img className={styles.debrisPickaxe} src="/media/p03-pickaxe.webp" alt="" />
                        <img className={styles.debrisWayfinder} src="/media/p03-wayfinder.webp" alt="" />
                        <img className={styles.debrisIceBadge} src="/media/p03-badge-ice.png" alt="" />
                        <img className={styles.debrisOrangeBadge} src="/media/p03-badge-orange.png" alt="" />
                        <img className={styles.debrisLavender} src="/media/p03-noise-lavender.png" alt="" />
                        <img className={styles.debrisCore} src="/media/p03-cracked-core.png" alt="" />
                        <img className={styles.debrisDarkCrystal} src="/media/p03-dark-crystal.webp" alt="" />
                        <img className={styles.debrisWhimsicott} src="/media/p03-whimsicott.png" alt="" />
                        <img className={styles.debrisRed} src="/media/p03-noise-red.png" alt="" />
                        <img className={styles.debrisSkull} src="/media/p03-snecko-skull.png" alt="" />
                        <img className={styles.debrisDroplets} src="/media/p03-badge-droplets.png" alt="" />
                        <img className={styles.noiseBlue03} src="/media/p03-noise-blue-03.png" alt="" />
                        <img className={styles.noiseBlue09} src="/media/p03-noise-blue-09.png" alt="" />
                        <img className={styles.noiseRed12} src="/media/p03-noise-red-12.png" alt="" />
                        <img className={styles.noiseLavender04} src="/media/p03-noise-lavender-04.png" alt="" />
                        <img className={styles.noiseLavender15} src="/media/p03-noise-lavender-15.png" alt="" />
                        <img className={styles.noiseOrange02} src="/media/p03-noise-orange-02.png" alt="" />
                        <img className={styles.noiseOrange08} src="/media/p03-noise-orange-08.png" alt="" />
                        <img className={styles.noiseGreenBonus} src="/media/p03-noise-green-bonus.png" alt="" />
                    </div>
                    <NoiseBank className={styles.noiseUpperLeft} pieces={upperLeftNoise} />
                    <NoiseBank className={styles.noiseUpperRight} pieces={upperRightNoise} />
                    <NoiseBank className={styles.noiseLowerLeft} pieces={lowerLeftNoise} />
                    <NoiseBank className={styles.noiseLowerRight} pieces={lowerRightNoise} />
                    <NoiseBank className={styles.noiseBridge} pieces={bridgeNoise} />
                    <NoiseBank className={styles.noiseRightPocket} pieces={rightPocketNoise} />
                    <NoiseBank className={styles.noiseLowerPocket} pieces={lowerPocketNoise} />
                </main>
                <footer className={styles.footer}><span>BREAKSPIDER / 05</span><div><button type="button" onClick={replayEntry}>Replay intro ↻</button><Link href="/map">Map ↗</Link></div></footer>
            </div>
            {!entered && <SplashEntry onEntered={finishEntry} />}
            {profileOpen && entered && <div className={styles.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setProfileOpen(false); }}><section className={styles.profileDialog} role="dialog" aria-modal="true" aria-label="Visitor profile"><div className={styles.dialogBar}>VISITOR PROFILE <button type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button></div><div className={styles.profileIdentity}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><small>LOCAL SAVE SLOT / 000</small><h2>Visitor 000</h2><p>Default avatar equipped.</p></div></div><div className={styles.profileStats}><span>FOUND <b>0 / ??</b></span><span>STATUS <b>EXPLORING</b></span></div><Link href="/collection">Open Collection ↗</Link></section></div>}
            {artifact && entered && <div className={styles.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setArtifact(null); }}><section className={styles.inspectDialog} role="dialog" aria-modal="true" aria-labelledby="p03-inspect-title"><div className={styles.dialogBar}><span>{artifact.label}</span><button type="button" onClick={() => setArtifact(null)} aria-label="Close inspection">×</button></div><div className={styles.inspectContent}><div className={styles.inspectVisual}>{artifact.image ? <img src={artifact.image} alt={artifact.title} /> : <MapGlyph />}</div><div><span className={styles.moduleNumber}>FILE OPENED</span><h2 id="p03-inspect-title">{artifact.title}</h2><p>{artifact.description}</p><Link href={artifact.destination}>{artifact.destinationLabel} ↗</Link><button type="button" onClick={() => setArtifact(null)}>Close file ×</button></div></div></section></div>}
        </>
    );
}
