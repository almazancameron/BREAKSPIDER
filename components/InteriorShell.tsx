"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { playInterfaceNote } from "./SiteHeader";
import shell from "./HomePrototype04.module.css";
import styles from "./InteriorShell.module.css";

export default function InteriorShell({ children, section = "" }: { children: ReactNode; section?: "projects" | "" }) {
  const [muted, setMuted] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
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
  return <div className={shell.site + " " + styles.room}>
    <header className={shell.header}>
      <div className={shell.headerLeft}>
        <button type="button" className={shell.avatar} aria-label="Open visitor profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); playInterfaceNote(); }}><img src="/media/default-avatar.png" alt="" /><img className={shell.profileBadge} src="/media/p03-heart-badge.png" alt="" /></button>
        <button type="button" className={shell.mute} onClick={toggleMute} aria-label={"Audio " + (muted ? "off" : "on") + ". Toggle audio"}>{muted ? "◌" : "♫"}<span>Sound {muted ? "off" : "on"}</span></button>
      </div>
      <nav className={shell.nav} aria-label="Primary navigation"><Link href="/" onClick={playInterfaceNote}>Home</Link><Link href="/projects" aria-current={section === "projects" ? "page" : undefined} onClick={playInterfaceNote}>Projects</Link><Link href="/about" onClick={playInterfaceNote}>About</Link></nav>
      <div className={shell.headerRight}><div className={shell.headerStatus}><span>PERSONAL INTERNET SPACE</span><b>currently online <i /></b></div><Link className={shell.headerBrand} href="/" aria-label="Breakspider home" onClick={playInterfaceNote}><img src="/media/breakspider-logo.svg" alt="Breakspider" /></Link></div>
    </header>
    {children}
    <footer className={styles.footer}><span>BREAKSPIDER / PUBLIC ROOMS</span><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/sketchbook">Sketchbook</Link><Link href="/familiars">Familiars</Link><Link href="/collection">Collection</Link><Link href="/map">Map</Link></nav></footer>
    {profileOpen && <div className={shell.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setProfileOpen(false); }}><section className={shell.profileDialog} role="dialog" aria-modal="true" aria-label="Visitor profile"><div className={shell.dialogBar}>VISITOR PROFILE <button type="button" onClick={() => setProfileOpen(false)} aria-label="Close visitor profile">×</button></div><div className={shell.profileIdentity}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><div><small>LOCAL SAVE SLOT / 000</small><h2>Visitor 000</h2><p>Default avatar equipped.</p></div></div><div className={shell.profileStats}><span>FOUND <b>0 / ??</b></span><span>STATUS <b>EXPLORING</b></span></div><Link href="/collection" onClick={() => setProfileOpen(false)}>Open Collection ↗</Link></section></div>}
  </div>;
}
