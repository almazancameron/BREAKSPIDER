"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader, { playInterfaceNote } from "./SiteHeader";
import SplashEntry from "./SplashEntry";

type Artifact = {
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
  href: string;
  action: string;
  kind?: "map";
};

const artifacts: Artifact[] = [
  {
    title: "A battle plan in progress",
    eyebrow: "Pixel Pugilists / process scrap 01",
    description: "A real priority-builder screen from the current game prototype. Rules, conditions, and mock state share one working surface.",
    image: "/media/pp-priority.png",
    href: "/projects/pixel-pugilists",
    action: "Follow the game thread",
  },
  {
    title: "One application, many rooms",
    eyebrow: "Viscap / work scrap 02",
    description: "An actual media-library view from Viscap. The project archive will connect this workflow to the rest of the platform.",
    image: "/media/viscap-media.png",
    href: "/projects/viscap",
    action: "Follow the platform thread",
  },
  {
    title: "A map of the public rooms",
    eyebrow: "Found object / site scrap 03",
    description: "A little directory of the visible parts of Breakspider. The important professional routes are always available in the regular navigation.",
    href: "/map",
    action: "Open the map",
    kind: "map",
  },
];

const familiars = [
  { name: "Ashwing", image: "/media/ashwing.png", tags: "Burn / offense", note: "A small, smoky reason to keep exploring." },
  { name: "Pebbloq", image: "/media/pebbloq.png", tags: "Stone / defense", note: "A stubborn little creature from Pixel Pugilists." },
];

function MapDrawing({ large = false }: { large?: boolean }) {
  return <div className={`map-drawing ${large ? "large" : ""}`} aria-hidden="true"><span className="map-line one" /><span className="map-line two" /><span className="map-line three" /><span className="map-x">×</span><span className="map-dot" /><span className="map-word">YOU ARE HERE-ish</span></div>;
}

export default function HomePrototype() {
  const [entered, setEntered] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [familiarIndex, setFamiliarIndex] = useState(0);
  const familiar = familiars[familiarIndex];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("preview") || window.localStorage.getItem("breakspider-entered") === "true") setEntered(true);
  }, []);

  const finishEntry = () => {
    window.localStorage.setItem("breakspider-entered", "true");
    setEntered(true);
  };

  const replayEntry = () => {
    window.localStorage.removeItem("breakspider-entered");
    setEntered(false);
  };

  useEffect(() => {
    if (!activeArtifact) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveArtifact(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeArtifact]);

  const inspect = (artifact: Artifact) => { setActiveArtifact(artifact); playInterfaceNote(); };

  return (
    <>
      <div className="site-layer" inert={!entered} aria-hidden={!entered}>
        <SiteHeader />
        <main id="main-content" className="homepage">
          <div className="home-intro-line"><span>INTERNET PROFILE / CURRENTLY OPEN</span><span>scroll to wander ↓</span></div>
          <section className="constellation" aria-label="Breakspider homepage">
            <section className="spotlight" aria-labelledby="spotlight-title">
              <div className="spotlight-meta"><span className="small-kicker">00 / currently pinned</span><span className="availability"><i /> Available for work</span></div>
              <h1 id="spotlight-title">Software<br />with a sense<br /><em>of discovery.</em></h1>
              <p className="spotlight-copy">Full-stack software engineer &amp; game developer. I like interconnected systems, unusual interactions, and things worth finding twice.</p>
              <div className="spotlight-actions">
                <Link className="action-link primary" href="/about" onClick={playInterfaceNote}>About + contact <span>↗</span></Link>
                <Link className="action-link secondary" href="/projects" onClick={playInterfaceNote}>Explore my work <span>↗</span></Link>
              </div>
              <div className="spotlight-media">
                <img src="/media/pp-combat.png" alt="Pixel Pugilists combat prototype showing two Familiars and a battle log" />
                <span className="media-caption">ON THE WORKBENCH / PIXEL PUGILISTS</span>
              </div>
              <button className="process-scrap" type="button" onClick={() => inspect(artifacts[0])}><span>open process<br />scrap ↗</span><small>priority builder / 01</small></button>
            </section>

            <section className="about-path" aria-labelledby="about-path-title">
              <span className="eyebrow">01 / the person</span>
              <h2 id="about-path-title">There’s a person behind all this.</h2>
              <p>Engineer by trade. Game maker by curiosity. A little too interested in how systems talk to each other.</p>
              <Link className="path-link" href="/about" onClick={playInterfaceNote}>About + contact <span>↗</span></Link>
              <div className="about-doodle" aria-hidden="true"><span>hello from<br />the margin</span><img src="/media/spider.svg" alt="" /></div>
            </section>

            <section className="projects-path" aria-labelledby="projects-path-title">
              <span className="eyebrow">02 / things I’ve made</span>
              <h2 id="projects-path-title">Work, games,<br />and other<br />systems.</h2>
              <div className="project-preview">
                <img className="viscap-preview" src="/media/viscap-storyboard.png" alt="Viscap storyboard application screenshot" />
                <img className="pp-preview" src="/media/pp-priority.png" alt="Pixel Pugilists priority builder screenshot" />
              </div>
              <p>Viscap / Pixel Pugilists / the archive keeps growing.</p>
              <Link className="path-link" href="/projects" onClick={playInterfaceNote}>Browse projects <span>↗</span></Link>
            </section>

            <section className="current-project" aria-labelledby="current-project-title">
              <div className="tape" aria-hidden="true" /><span className="eyebrow">Right now / current project</span>
              <h3 id="current-project-title">Pixel<br />Pugilists</h3>
              <p>A deterministic autobattler with small creatures and big system questions.</p>
              <Link href="/projects/pixel-pugilists" onClick={playInterfaceNote}>Open the notebook ↗</Link>
            </section>

            <section className="latest-sketchbook" aria-labelledby="sketchbook-title">
              <span className="eyebrow">From the sketchbook / latest</span>
              <h3 id="sketchbook-title">Battle plans,<br />first pass.</h3>
              <p>A current UI study: turning combat priorities into something you can see and change.</p>
              <Link href="/sketchbook" onClick={playInterfaceNote}>Read the note ↗</Link>
              <span className="scribble" aria-hidden="true">✳</span>
            </section>

            <section className="random-familiar" aria-labelledby="familiar-title">
              <div className="familiar-field"><img src={familiar.image} alt={`${familiar.name}, a Pixel Pugilists Familiar`} /></div>
              <div><span className="eyebrow">Random familiar</span><h3 id="familiar-title">{familiar.name}</h3><p className="familiar-tags">{familiar.tags}</p><p>{familiar.note}</p><div className="familiar-links"><Link href="/familiars" onClick={playInterfaceNote}>Meet the Familiars ↗</Link><button type="button" onClick={() => { setFamiliarIndex((index) => (index + 1) % familiars.length); playInterfaceNote(); }} aria-label="Show another familiar">↻</button></div></div>
            </section>

            <section className="site-changelog" aria-labelledby="changelog-title">
              <span className="eyebrow">site changelog .txt</span><h3 id="changelog-title">Still building this place.</h3>
              <p><b>v0.1 / prototype</b><br />The homepage gets its first real shape. More room for curiosities soon.</p>
              <Link href="/sketchbook" onClick={playInterfaceNote}>View updates ↗</Link>
            </section>

            <button className="found-map" type="button" onClick={() => inspect(artifacts[2])} aria-label="Inspect found map scrap">
              <span className="eyebrow">found / map scrap</span><MapDrawing /><span className="found-map-label">pick this up ↗</span>
            </button>
          </section>

          <section className="explore-section" aria-labelledby="explore-title">
            <div className="explore-heading"><div><span className="eyebrow">↓ below the fold / keep wandering</span><h2 id="explore-title">Things left on the desk.</h2></div><p>Click or tap a scrap to bring it into focus. Each one leads somewhere real.</p></div>
            <div className="artifact-pile">
              <button type="button" className="artifact artifact-pp" onClick={() => inspect(artifacts[0])}><img src="/media/pp-priority.png" alt="" /><span>01 / battle plan</span></button>
              <button type="button" className="artifact artifact-viscap" onClick={() => inspect(artifacts[1])}><img src="/media/viscap-media.png" alt="" /><span>02 / platform room</span></button>
              <button type="button" className="artifact artifact-map" onClick={() => inspect(artifacts[2])}><MapDrawing /><span>03 / found map</span></button>
              <div className="desk-note">a little archive<br />of things that connect ↗</div>
            </div>
            <div className="explore-links"><Link href="/sketchbook">Sketchbook ↗</Link><Link href="/familiars">Familiars ↗</Link><Link href="/collection">Collection ↗</Link></div>
          </section>
        </main>
        <footer className="site-footer"><span>BREAKSPIDER / a personal web space</span><div><Link href="/projects">Projects</Link><Link href="/about">About + contact</Link><Link href="/map">Map</Link><button type="button" onClick={replayEntry}>Replay intro ↺</button></div><span>Made to be wandered through.</span></footer>
      </div>
      {!entered && <SplashEntry onEntered={finishEntry} />}
      {activeArtifact && entered && (
        <div className="inspection-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveArtifact(null); }}>
          <section className="inspection" role="dialog" aria-modal="true" aria-labelledby="inspection-title">
            <button className="plain-close" type="button" onClick={() => setActiveArtifact(null)} aria-label="Close inspection">×</button>
            <span className="eyebrow">{activeArtifact.eyebrow}</span>
            <h2 id="inspection-title">{activeArtifact.title}</h2>
            <div className="inspection-media">{activeArtifact.image ? <img src={activeArtifact.image} alt={activeArtifact.title} /> : <MapDrawing large />}</div>
            <p>{activeArtifact.description}</p>
            <div className="inspection-actions"><Link className="action-link primary" href={activeArtifact.href} onClick={playInterfaceNote}>{activeArtifact.action} <span>↗</span></Link><button className="action-link secondary" type="button" onClick={() => setActiveArtifact(null)}>Back to homepage ×</button></div>
          </section>
        </div>
      )}
    </>
  );
}
