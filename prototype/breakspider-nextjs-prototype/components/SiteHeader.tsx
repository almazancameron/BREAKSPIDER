"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function playInterfaceNote() {
    if (typeof window === "undefined" || window.localStorage.getItem("breakspider-muted") !== "false") return;
    try {
        const AudioContextClass = window.AudioContext;
        const context = new AudioContextClass();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(620, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(890, context.currentTime + 0.085);
        gain.gain.setValueAtTime(0.045, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.13);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.14);
        oscillator.onended = () => void context.close();
    } catch {
        // Audio is optional; navigation and inspection always work without it.
    }
}

export default function SiteHeader() {
    const [muted, setMuted] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMuted(window.localStorage.getItem("breakspider-muted") !== "false");
    }, []);

    useEffect(() => {
        if (!profileOpen && !menuOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setProfileOpen(false);
                setMenuOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [profileOpen, menuOpen]);

    const toggleMute = () => {
        const next = !muted;
        setMuted(next);
        window.localStorage.setItem("breakspider-muted", String(next));
        if (!next) window.setTimeout(playInterfaceNote, 0);
    };

    return (
        <>
            <header className="site-header">
                <Link className="brand" href="/" aria-label="Breakspider home" onClick={playInterfaceNote}>
                    <img src="/media/spider.svg" alt="" />
                    <span>BREAKSPIDER<small>personal web space</small></span>
                </Link>
                <nav className="main-nav" aria-label="Primary navigation">
                    <Link className="nav-sticker" href="/" onClick={playInterfaceNote}>Home</Link>
                    <Link className="nav-sticker" href="/projects" onClick={playInterfaceNote}>Projects</Link>
                    <Link className="nav-sticker" href="/about" onClick={playInterfaceNote}>About</Link>
                </nav>
                <div className="header-actions">
                    <button className="audio-toggle" onClick={toggleMute} type="button" aria-label={`Audio ${muted ? "off" : "on"}. Toggle audio`}>
                        <span aria-hidden="true">{muted ? "◌" : "♪"}</span><span>Audio: {muted ? "off" : "on"}</span>
                    </button>
                    <button className="avatar-button" type="button" aria-label="Open visitor profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen((open) => !open); setMenuOpen(false); playInterfaceNote(); }}>
                        <img src="/media/default-avatar.png" alt="" />
                    </button>
                    <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { setMenuOpen((open) => !open); setProfileOpen(false); playInterfaceNote(); }}>
                        {menuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </header>
            {menuOpen && (
                <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">
                    {[["/", "Home"], ["/projects", "Projects"], ["/about", "About + contact"], ["/sketchbook", "Sketchbook"], ["/familiars", "Familiars"]].map(([href, label]) => (
                        <Link href={href} key={href} onClick={() => { setMenuOpen(false); playInterfaceNote(); }}>{label}<span aria-hidden="true">↗</span></Link>
                    ))}
                </nav>
            )}
            {profileOpen && (
                <div className="popover-scrim" onClick={() => setProfileOpen(false)}>
                    <section className="profile-popover" role="dialog" aria-modal="true" aria-label="Visitor profile" onClick={(event) => event.stopPropagation()}>
                        <button className="plain-close" type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button>
                        <div className="popover-title"><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><span className="eyebrow">Local visitor profile</span><h2>Visitor 000</h2></div></div>
                        <p>Your little corner of this corner. The default avatar is equipped; discoveries can live here later.</p>
                        <div className="profile-slots"><span>Avatar <b>default</b></span><span>Found <b>0 / ??</b></span></div>
                        <Link className="text-link" href="/collection" onClick={() => setProfileOpen(false)}>Open Collection ↗</Link>
                        <p className="tiny-note">Prototype state is stored only in this browser.</p>
                    </section>
                </div>
            )}
        </>
    );
}
