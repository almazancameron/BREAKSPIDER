"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { playInterfaceNote } from "./SiteHeader";
import shell from "./HomePrototype05.module.css";
import styles from "./AboutPage.module.css";

const scraps = [
    { src: "/media/p04-noise-red-07.png", className: styles.noiseOne },
    { src: "/media/p03-noise-blue-03.png", className: styles.noiseTwo },
    { src: "/media/p04-noise-orange-11.png", className: styles.noiseThree },
    { src: "/media/p03-noise-lavender-04.png", className: styles.noiseFour },
    { src: "/media/p03-noise-green-bonus.png", className: styles.noiseFive },
];

export default function AboutPage() {
    const [muted, setMuted] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        setMuted(window.localStorage.getItem("breakspider-muted") !== "false");
    }, []);

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
            <nav className={shell.nav} aria-label="Primary navigation"><Link href="/" onClick={playInterfaceNote}>Home</Link><Link href="/projects" onClick={playInterfaceNote}>Projects</Link><Link href="/about" aria-current="page">About</Link></nav>
            <div className={shell.headerRight}><div className={shell.headerStatus}><span>PERSONAL INTERNET SPACE</span><b>currently online <i /></b></div><Link className={shell.headerBrand} href="/" aria-label="Breakspider home" onClick={playInterfaceNote}><img src="/media/breakspider-logo.svg" alt="Breakspider" /></Link></div>
        </header>

        <main className={styles.main} id="main-content">
            <div className={styles.grid} aria-hidden="true" />
            <div className={styles.routeLine}><Link href="/">← HOME</Link><span>/ ABOUT + CONTACT</span><b>PROFILE / PUBLIC</b></div>

            <section className={styles.identity} aria-labelledby="about-title">
                <div className={styles.identityCopy}>
                    <div className={styles.status}><i /> AVAILABLE FOR WORK <span>// ABOUT THIS PERSON</span></div>
                    <h1 id="about-title">About <em>me.</em></h1>
                    <p className={styles.name}>[Your Name] <span>· full-stack engineer / game developer</span></p>
                    <p className={styles.lead}>I build web applications, connected systems, and games. I like making complicated things understandable enough to use and interesting enough to poke at.</p>
                    <div className={styles.quickLinks}><a href="#contact">Contact + résumé ↗</a><Link href="/projects">See projects ↗</Link></div>
                </div>
                <div className={styles.portraitArea}><span className={styles.portraitLabel}>GITHUB AVATAR / ALSO ME, SORT OF</span><img className={styles.portrait} src="/media/p04-creator-oc.png" alt="Creator's illustrated OC in a purple hat" /><img className={styles.portraitBadge} src="/media/p04-badge-fire.png" alt="" /><img className={styles.portraitCrystal} src="/media/p03-life-crystal.gif" alt="" /></div>
            </section>

            <section className={styles.contact} id="contact" aria-labelledby="contact-title">
                <div className={styles.contactBar}><span>CONTACT.TXT</span><span>PUBLIC / OPEN</span><span>□ ×</span></div>
                <div className={styles.contactBody}><span className={styles.kicker}>EASIEST WAY TO REACH ME</span><h2 id="contact-title">Get in touch.</h2><a className={styles.email} href="mailto:you@example.com">you@example.com ↗</a><span className={styles.placeholder}>placeholder address</span>
                    <div className={styles.contactLinks}><span><b>GITHUB</b><small>[profile URL]</small></span><span><b>LINKEDIN</b><small>[profile URL]</small></span><a href="/resume-placeholder.txt" download><b>RÉSUMÉ</b><small>download placeholder ↧</small></a></div>
                </div>
            </section>

            <div className={styles.middleNote} aria-hidden="true"><img src="/media/p03-noise-orange-08.png" alt="" /><span>still editing this profile</span></div>

            <section className={styles.practice} aria-labelledby="practice-title"><span className={styles.kicker}>WHAT I DO</span><h2 id="practice-title">Software <span>and</span> game systems.</h2><p>Full-stack applications, interfaces, backend services, integrations, debugging, deployment, and product support. I also design and build game mechanics, creatures, and tools.</p><div className={styles.skillLine}><span>WEB APPS</span><span>SYSTEM DESIGN</span><span>GAME DEVELOPMENT</span><span>INTERACTION</span></div></section>

            <section className={styles.workTrail} aria-label="Related work"><div className={styles.workIntro}><span className={styles.kicker}>SOME RECEIPTS</span><p>Two different kinds of work. The project pages have the details.</p></div><Link className={styles.viscap} href="/projects/viscap" onClick={playInterfaceNote}><img src="/media/viscap-storyboard.png" alt="Viscap storyboard software screenshot" /><span>VISCAP <small>connected web platform ↗</small></span></Link><Link className={styles.pugilists} href="/projects/pixel-pugilists" onClick={playInterfaceNote}><img src="/media/pp-priority.png" alt="Pixel Pugilists priority builder screenshot" /><span>PIXEL PUGILISTS <small>game systems in progress ↗</small></span></Link></section>

            <div className={styles.satellite}><img src="/media/ashwing.png" alt="" /><span>Making this one too.<br /><Link href="/familiars">Meet the Familiars ↗</Link></span></div>

            <div className={styles.clutter} aria-hidden="true">{scraps.map(item => <img key={item.className} className={item.className} src={item.src} alt="" />)}<img className={styles.strawberry} src="/media/p04-strawberry.gif" alt="" /><img className={styles.vial} src="/media/p04-badge-vial.png" alt="" /><img className={styles.cornerBadge} src="/media/p03-badge-ice.png" alt="" /></div>
        </main>

        <footer className={styles.footer}><span>BREAKSPIDER / ABOUT</span><div><Link href="/">Home ↗</Link><Link href="/projects">Projects ↗</Link><Link href="/map">Map ↗</Link></div></footer>
        {profileOpen && <div className={shell.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setProfileOpen(false); }}><section className={shell.profileDialog} role="dialog" aria-modal="true" aria-label="Visitor profile"><div className={shell.dialogBar}>VISITOR PROFILE <button type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button></div><div className={shell.profileIdentity}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><small>LOCAL SAVE SLOT / 000</small><h2>Visitor 000</h2><p>Default avatar equipped.</p></div></div><div className={shell.profileStats}><span>FOUND <b>0 / ??</b></span><span>STATUS <b>EXPLORING</b></span></div><Link href="/collection">Open Collection ↗</Link></section></div>}
    </div>;
}
