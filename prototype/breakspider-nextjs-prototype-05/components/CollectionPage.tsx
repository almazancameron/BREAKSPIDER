"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import InteriorShell from "./InteriorShell";
import { playInterfaceNote } from "./SiteHeader";
import styles from "./CollectionPage.module.css";

type Item = { id: string; category: string; name: string; image?: string; glyph?: string; status: "starter" | "owned" | "locked"; note: string };
const categories = ["Avatars", "Badges", "Cursors", "Followers", "Trails", "Map", "Toys"];
const items: Item[] = [
  { id: "default", category: "Avatars", name: "Default visitor", image: "/media/default-avatar.png", status: "starter", note: "The default avatar. It starts on the visitor profile." },
  { id: "red-avatar", category: "Avatars", name: "Red portrait", image: "/media/collection-avatar-red.png", status: "owned", note: "Archive portrait shown as a customization sample." },
  { id: "blue-avatar", category: "Avatars", name: "Blue portrait", image: "/media/collection-avatar-blue.png", status: "locked", note: "An unknown avatar slot." },
  { id: "heart", category: "Badges", name: "Pixel heart", image: "/media/p03-heart-badge.png", status: "starter", note: "The small badge already attached to the visitor avatar." },
  { id: "fire", category: "Badges", name: "Fire badge", image: "/media/p04-badge-fire.png", status: "owned", note: "A badge from the visual archive." },
  { id: "ice", category: "Badges", name: "Ice badge", image: "/media/p04-badge-ice.png", status: "locked", note: "An unknown badge slot." },
  { id: "pointer", category: "Cursors", name: "Standard pointer", glyph: "↖", status: "starter", note: "The normal cursor. Nothing fancy." },
  { id: "crosshair", category: "Cursors", name: "Crosshair", glyph: "✛", status: "owned", note: "A cursor concept for the prototype showcase." },
  { id: "strawberry", category: "Followers", name: "Strawberry", image: "/media/p04-strawberry.gif", status: "owned", note: "A tiny animated follower concept." },
  { id: "mystery-follower", category: "Followers", name: "Unknown", glyph: "?", status: "locked", note: "An unknown follower slot." },
  { id: "trail", category: "Trails", name: "Pixel crumbs", glyph: "· · ·", status: "locked", note: "A future trail slot." },
  { id: "map", category: "Map", name: "Public Map", glyph: "◇", status: "owned", note: "A directory of the public rooms. It also works as a regular URL." },
  { id: "toy", category: "Toys", name: "Unknown toy", glyph: "?", status: "locked", note: "A future toy slot." },
];

export default function CollectionPage() {
  const [category, setCategory] = useState("Badges");
  const [selectedId, setSelectedId] = useState("heart");
  const [showcasedId, setShowcasedId] = useState("heart");
  const detailRef = useRef<HTMLElement>(null);
  const selected = items.find(item => item.id === selectedId) || items[0];
  const showcased = items.find(item => item.id === showcasedId) || items[0];
  const visible = items.filter(item => item.category === category);
  function chooseCategory(next: string) { setCategory(next); setSelectedId(items.find(item => item.category === next)?.id || "heart"); playInterfaceNote(); }
  function inspectItem(id: string) {
    setSelectedId(id);
    playInterfaceNote();
    if (window.matchMedia("(max-width: 700px)").matches) {
      window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }));
    }
  }
  return <InteriorShell>
    <main className={styles.page}>
      <div className={styles.crumb}><Link href="/">← HOME</Link><span>/ COLLECTION</span><b>VISITOR SLOT / 000</b></div>
      <header className={styles.intro}><span>PROFILE CUSTOMIZATION / PROTOTYPE INVENTORY</span><h1>Collection<span>.</span></h1><p>Avatars, badges, little interface things, and a few empty spaces. This page previews how a visitor profile could be customized.</p></header>
      <section className={styles.showcase} aria-labelledby="showcase-title"><div className={styles.avatarCase}><span>VISITOR 000 / PUBLIC PROFILE PREVIEW</span><div className={styles.avatarDisplay}><img src="/media/default-avatar.png" alt="Default visitor avatar" /><img className={styles.attachedHeart} src="/media/p03-heart-badge.png" alt="Pixel heart badge attached to avatar" /></div><h2 id="showcase-title">Default visitor</h2><p>AVATAR / DEFAULT &nbsp;·&nbsp; BADGE / HEART</p><img className={styles.caseBadge} src="/media/p04-badge-fire.png" alt="" aria-hidden="true" /><img className={styles.caseSprite} src="/media/p03-mr-saturn.png" alt="" aria-hidden="true" /></div><div className={styles.showcaseRight}><span>PINNED IN THE SHOWCASE</span><div className={styles.pinned}>{showcased.image ? <img src={showcased.image} alt="" /> : <strong>{showcased.glyph}</strong>}<div><h2>{showcased.name}</h2><p>{showcased.note}</p><small>{showcased.category.toUpperCase()} / {showcased.status.toUpperCase()}</small></div></div><p className={styles.prototypeNote}>Pins change this showcase. The heart remains attached to the avatar in this prototype.</p></div></section>
      <section className={styles.inventory} aria-labelledby="inventory-title"><div className={styles.inventoryHead}><div><span>THE ITEMS / THE EMPTY SLOTS</span><h2 id="inventory-title">Inventory</h2></div><p>OWNED, LOCKED, AND CURRENTLY SHOWCASED ARE SHOWN SEPARATELY.</p></div><nav className={styles.tabs} aria-label="Collection categories">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => chooseCategory(item)}>{item}<small>{String(items.filter(entry => entry.category === item).length).padStart(2, "0")}</small></button>)}</nav><div className={styles.inventoryBody}><div className={styles.itemGrid}>{visible.map(item => <button type="button" key={item.id} className={styles.item + (item.status === "locked" ? " " + styles.locked : "")} aria-pressed={selectedId === item.id} onClick={() => inspectItem(item.id)}><span>{item.status === "locked" ? "UNKNOWN" : item.status === "starter" ? "STARTER" : "OWNED"}</span>{item.image && item.status !== "locked" ? <img src={item.image} alt="" /> : <strong>{item.status === "locked" ? "?" : item.glyph}</strong>}<b>{item.status === "locked" ? "Unknown slot" : item.name}</b></button>)}</div><aside className={styles.inspect} ref={detailRef} aria-live="polite"><span>SELECTED / {selected.category.toUpperCase()}</span><div className={styles.inspectImage}>{selected.image && selected.status !== "locked" ? <img src={selected.image} alt="" /> : <strong>{selected.status === "locked" ? "?" : selected.glyph}</strong>}</div><h3>{selected.status === "locked" ? "Unknown slot" : selected.name}</h3><p>{selected.note}</p><small>{selected.status === "locked" ? "LOCKED / NO HINT IN THIS PROTOTYPE" : selected.status === "starter" ? "STARTER ITEM" : "OWNED IN SAMPLE INVENTORY"}</small>{selected.status !== "locked" && <button type="button" onClick={() => { setShowcasedId(selected.id); playInterfaceNote(); }} disabled={showcasedId === selected.id}>{showcasedId === selected.id ? "Currently showcased ✓" : "Pin in showcase ↗"}</button>}{selected.id === "map" && <Link href="/map">Open the public Map ↗</Link>}</aside></div></section>
      <div className={styles.lastLink}><img src="/media/p03-life-crystal.gif" alt="" aria-hidden="true" /><span>THE COLLECTION HAS ROOM FOR MORE LATER.</span><Link href="/map">Map ↗</Link><Link href="/">Back home ↗</Link></div>
    </main>
  </InteriorShell>;
}
