"use client";

import Link from "next/link";
import { useState } from "react";
import InteriorShell from "./InteriorShell";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./MapPage.module.css";

const places = [
  { name: "Home", href: "/", image: "/media/spider.svg", group: "Start here", description: "The customized profile canvas and current work." },
  { name: "About", href: "/about", image: "/media/p04-creator-oc.png", group: "Start here", description: "The person, professional background, contact, and résumé." },
  { name: "Projects", href: "/projects", image: "/media/pp-combat.png", group: "Start here", description: "The public work archive." },
  { name: "Viscap", href: "/projects/viscap", image: "/media/p04-viscap-mark.png", group: "Project rooms", description: "One connected professional software platform." },
  { name: "Pixel Pugilists", href: "/projects/pixel-pugilists", image: "/media/pebbloq.png", group: "Project rooms", description: "A game-development workbench and current build captures." },
  { name: "Sketchbook", href: "/sketchbook", image: "/media/pp-priority.png", group: "Other rooms", description: "Short updates and longer development notes." },
  { name: "Familiars", href: "/familiars", image: "/media/ashwing.png", group: "Other rooms", description: "A scannable roster of Pixel Pugilists creatures." },
  { name: "Collection", href: "/collection", image: "/media/p03-heart-badge.png", group: "Other rooms", description: "The visitor profile, badges, and customization preview." },
];

export default function MapPage() {
  const [selected, setSelected] = useState(0);
  const place = places[selected];
  return <InteriorShell>
    <main className={styles.page}>
      <div className={styles.crumb}><Link href="/collection">← COLLECTION</Link><span>/ MAP</span><b>PUBLIC ROUTES ONLY</b></div>
      <header className={styles.intro}><div><span>FOUND ITEM / PUBLIC DIRECTORY</span><h1>Map<span>.</span></h1><p>These are the public rooms. Pick a point or use the list below.</p></div><div className={styles.mapObject} aria-hidden="true"><svg viewBox="0 0 170 130"><path d="M20 18h129v95H20z" fill="#21273b" stroke="#b9f45d" strokeWidth="2" /><path d="M45 43 87 27l43 36-36 42-55-15z" fill="none" stroke="#8a91b3" strokeWidth="2" strokeDasharray="5 4" /><path d="m45 43 45 39 40-19M90 82l4 23" fill="none" stroke="#f4eee4" strokeWidth="2" /><circle cx="45" cy="43" r="7" fill="#ef7ea6" /><circle cx="130" cy="63" r="7" fill="#71dcf3" /><circle cx="94" cy="105" r="7" fill="#b9f45d" /><text x="26" y="31">HOME</text><text x="110" y="52">WORK</text><text x="105" y="120">ABOUT</text></svg><small>THE THING FROM THE HOMEPAGE</small></div></header>
      <section className={styles.mapRegion} aria-label="Interactive public route map"><div className={styles.routeDiagram}><div className={styles.diagramBar}><span>MAP.EXE / PUBLIC SPACE</span><span>08 LOCATIONS</span></div><svg className={styles.paths} viewBox="0 0 1000 670" preserveAspectRatio="none" aria-hidden="true"><path d="M145 125 465 220 725 100M465 220 805 312M465 220 515 455 825 550M465 220 215 440 300 560M215 440 300 560M515 455 825 550" /><path className={styles.outerPath} d="M145 125 725 100 805 312 825 550 300 560 215 440Z" /></svg><span className={styles.youAreHere}>YOU FOUND THIS MAP ↘</span>{places.map((item, index) => <button type="button" key={item.href} className={styles.node + " " + styles["node" + index]} aria-pressed={selected === index} onClick={() => { setSelected(index); playInterfaceNote(); }}><img src={item.image} alt="" /><span>{item.name}</span></button>)}</div><aside className={styles.readout}><span>SELECTED ROUTE / {String(selected + 1).padStart(2, "0")}</span><img src={place.image} alt="" /><h2>{place.name}</h2><p>{place.description}</p><Link href={place.href}>Open {place.name} ↗</Link><small>MAP IS OPTIONAL. HEADER LINKS STILL WORK.</small></aside></section>
      <section className={styles.directory} aria-labelledby="directory-title"><div><span>PLAIN LINKS / NO GUESSING</span><h2 id="directory-title">Public directory.</h2><p>The Map does not show private or hidden routes.</p></div><div className={styles.directoryGroups}>{["Start here", "Project rooms", "Other rooms"].map(group => <div key={group}><h3>{group}</h3>{places.filter(place => place.group === group).map(place => <Link href={place.href} key={place.href}><span>{place.name}</span><b>↗</b></Link>)}</div>)}</div></section>
      <div className={styles.buildNote}><img src="/media/pebbloq.png" alt="" /><p>Playable Pixel Pugilists build: no public link is available in this prototype. The project page has the current screenshots.</p><Link href="/projects/pixel-pugilists">Open project ↗</Link></div>
    </main>
  </InteriorShell>;
}
