"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InteriorShell from "./InteriorShell";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./ViscapPage.module.css";

const systems = [
    { name: "Media Library", image: "/media/viscap-media-library.png", note: "Browse and group production media in the same workspace used by creative teams." },
    { name: "Storyboards", image: "/media/viscap-storyboard.png", note: "Clips, production status, copy, people, and files meet in a structured storyboard." },
    { name: "Actor Hub", image: "/media/viscap-actor-hub.png", note: "Casting and talent information alongside the production timeline." },
    { name: "Phases & Sprints", image: "/media/viscap-phases-sprints.png", note: "Production phases and sprint progress for ongoing work." },
    { name: "Creatives", image: "/media/viscap-creatives-layered.png", note: "Creative records connect to phases, team assignments, and workflow settings." },
    { name: "Education", image: "/media/viscap-education.png", note: "Training content lives inside the same product." },
    { name: "Reporting", image: "/media/viscap-creative-reporting.png", note: "Time, stage, and revision information attached to production work." },
    { name: "Brand Intranet", image: "/media/viscap-brand-products.png", note: "Brands and product information belong to the wider platform." },
];

export default function ViscapPage() {
    const [selected, setSelected] = useState(1);
    const [inspection, setInspection] = useState(false);
    useEffect(() => {
        if (!inspection) return;
        const close = (event: KeyboardEvent) => { if (event.key === "Escape") setInspection(false); };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [inspection]);
    return <InteriorShell section="projects">
        <main className={styles.page}>
            <div className={styles.crumb}><Link href="/projects">← THINGS I&apos;VE MADE</Link><span>/ VISCAP</span><b>PROJECT FILE / SOFTWARE</b></div>
            <section className={styles.hero}>
                <div className={styles.intro}><img className={styles.mark} src="/media/p04-viscap-mark.png" alt="" /><span className={styles.eyebrow}>ONE APPLICATION / MANY WORKFLOWS</span><h1>Viscap<span>.</span></h1><p>A connected platform for media, creative production, people, and the work around them.</p><dl><div><dt>Work</dt><dd>Full-stack engineering and product support</dd></div><div><dt>Shape</dt><dd>Several systems inside one application</dd></div></dl><Link href="/about">About my work ↗</Link><div className={styles.activeSlip} aria-live="polite"><img src={systems[selected].image} alt="" /><div><span>OPEN IN DIRECTORY / {String(selected + 1).padStart(2, "0")}</span><strong>{systems[selected].name}</strong><p>{systems[selected].note}</p></div></div></div>
                <div className={styles.systemMap} aria-label="Select a Viscap system"><div className={styles.mapHead}>VISCAP / SYSTEM DIRECTORY <span>08 CONNECTED AREAS</span></div><svg viewBox="0 0 800 470" preserveAspectRatio="none" aria-hidden="true"><path d="M400 240 L130 78 M400 240 L408 62 M400 240 L674 84 M400 240 L150 225 M400 240 L650 238 M400 240 L125 390 M400 240 L390 405 M400 240 L690 390" /></svg><div className={styles.hub}><img src="/media/p04-viscap-mark.png" alt="" /><span>ONE PLATFORM</span></div><div className={styles.nodes}>{systems.map((system, index) => <button type="button" key={system.name} aria-pressed={selected === index} onClick={() => { setSelected(index); playInterfaceNote(); }}><small>{String(index + 1).padStart(2, "0")}</small>{system.name}</button>)}</div></div>
            </section>
            <section className={styles.focus} aria-labelledby="focus-title"><div className={styles.focusHead}><div><span className={styles.eyebrow}>SELECTED SYSTEM / {String(selected + 1).padStart(2, "0")}</span><h2 id="focus-title">{systems[selected].name}</h2><p>{systems[selected].note}</p></div><button type="button" onClick={() => setInspection(true)}>Inspect full capture ↗</button></div><button type="button" className={styles.focusImage} onClick={() => setInspection(true)} aria-label={"Inspect " + systems[selected].name + " screenshot"}><img src={systems[selected].image} alt={"Viscap " + systems[selected].name + " interface"} /></button><div className={styles.focusStrip}>{systems.map((system, index) => <button type="button" key={system.name} aria-label={"Show " + system.name} aria-pressed={selected === index} onClick={() => { setSelected(index); playInterfaceNote(); }}>{String(index + 1).padStart(2, "0")} <span>{system.name}</span></button>)}</div></section>
            <section className={styles.workflow} aria-labelledby="workflow-title"><div className={styles.workflowIntro}><span className={styles.eyebrow}>A PATH THROUGH THE PRODUCT</span><h2 id="workflow-title">Work crosses<br />screens.</h2><p>The captures show related tools in one product: source media, production planning, people, and status. Select any area above to inspect its screen.</p></div><div className={styles.workflowImages}><figure><img src="/media/viscap-media-library.png" alt="Viscap Media Library" /><figcaption>MEDIA LIBRARY / SOURCE MATERIAL</figcaption></figure><figure><img src="/media/viscap-storyboard.png" alt="Viscap Storyboard" /><figcaption>STORYBOARDS / PRODUCTION</figcaption></figure><figure><img src="/media/viscap-phases-sprints.png" alt="Viscap Phases and Sprints" /><figcaption>PHASES + SPRINTS / PROGRESS</figcaption></figure></div></section>
            <aside className={styles.endNote}><span>ABOUT THIS WORK</span><p>Viscap is professional product work. These prototype captures show the interface; detailed ownership and implementation notes still need an author pass.</p><Link href="/projects">All projects ↗</Link></aside>
            <img className={styles.edgeMark} src="/media/p04-noise-blue-12.png" alt="" aria-hidden="true" />
        </main>
        {inspection && <div className={styles.overlay} onMouseDown={(event) => { if (event.currentTarget === event.target) setInspection(false); }}><section className={styles.dialog} role="dialog" aria-modal="true" aria-label={systems[selected].name + " screenshot"}><div><span>VISCAP / {systems[selected].name.toUpperCase()}</span><button type="button" onClick={() => setInspection(false)} aria-label="Close screenshot">×</button></div><img src={systems[selected].image} alt={"Viscap " + systems[selected].name + " interface"} /><p>{systems[selected].note}</p></section></div>}
    </InteriorShell>;
}
