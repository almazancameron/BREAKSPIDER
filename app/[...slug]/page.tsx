import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

type RouteInfo = {
  index: string;
  title: string;
  lead: string;
  note: string;
  images?: { src: string; alt: string; label: string }[];
  links?: { href: string; label: string }[];
};

const routes: Record<string, RouteInfo> = {
  about: {
    index: "01 / the person",
    title: "About + contact",
    lead: "A full-stack software engineer and game developer who likes unique interactions and systems that connect.",
    note: "This is a route stub for the homepage prototype. Name, résumé, and contact details have not been supplied yet; they belong here in the next content pass.",
    links: [{ href: "/projects", label: "See the work" }, { href: "/", label: "Back to the homepage" }],
  },
  projects: {
    index: "02 / things I’ve made",
    title: "Work, games, and other systems.",
    lead: "One archive for professional software, game development, and experiments.",
    note: "The full project trail is beyond this homepage prototype. These are real screenshots from two very different kinds of work.",
    images: [{ src: "/media/viscap-storyboard.png", alt: "Viscap storyboard application", label: "VISCap / connected platform" }, { src: "/media/pp-combat.png", alt: "Pixel Pugilists combat prototype", label: "PIXEL PUGILISTS / game notebook" }],
    links: [{ href: "/projects/viscap", label: "Viscap" }, { href: "/projects/pixel-pugilists", label: "Pixel Pugilists" }],
  },
  "projects/pixel-pugilists": {
    index: "Project / game notebook",
    title: "Pixel Pugilists",
    lead: "A deterministic autobattler built around Familiars, priorities, and the fun of seeing a system come alive.",
    note: "This route currently holds a small evidence preview. A full design and development notebook is outside this prototype’s scope.",
    images: [{ src: "/media/pp-priority.png", alt: "Pixel Pugilists priority builder", label: "Priority builder" }, { src: "/media/pp-combat.png", alt: "Pixel Pugilists combat screen", label: "Combat prototype" }],
    links: [{ href: "/familiars", label: "Meet the Familiars" }, { href: "/projects", label: "All projects" }],
  },
  "projects/viscap": {
    index: "Project / connected platform",
    title: "Viscap",
    lead: "An interconnected web application with media, creative, and team workflows inside one platform.",
    note: "The full platform story and contribution details are reserved for the project page. These images are genuine application screenshots.",
    images: [{ src: "/media/viscap-media.png", alt: "Viscap media library", label: "Media library" }, { src: "/media/viscap-actor.png", alt: "Viscap actor hub", label: "Actor hub" }],
    links: [{ href: "/projects", label: "All projects" }, { href: "/about", label: "About + contact" }],
  },
  sketchbook: {
    index: "03 / sketchbook",
    title: "Notes from the workbench.",
    lead: "Small updates, design problems, experiments, and occasional longer thoughts live here.",
    note: "The homepage’s Battle Plans note is a prototype teaser, anchored to the real priority-builder screen. Full authored entries will come in a later content pass.",
    images: [{ src: "/media/pp-priority.png", alt: "Pixel Pugilists priority builder", label: "Current study / battle plans" }],
    links: [{ href: "/projects/pixel-pugilists", label: "Follow Pixel Pugilists" }],
  },
  familiars: {
    index: "04 / familiar catalogue",
    title: "Meet the Familiars.",
    lead: "Small creatures with their own roles, moods, and mechanical possibilities.",
    note: "Ashwing and Pebbloq are original Pixel Pugilists sprites. The full catalogue and individual profiles will be developed after the homepage prototype.",
    images: [{ src: "/media/ashwing.png", alt: "Ashwing sprite", label: "Ashwing" }, { src: "/media/pebbloq.png", alt: "Pebbloq sprite", label: "Pebbloq" }],
    links: [{ href: "/projects/pixel-pugilists", label: "Their game" }],
  },
  collection: {
    index: "05 / local visitor",
    title: "The Collection",
    lead: "A quiet place for things found around Breakspider.",
    note: "The visitor profile is active in this prototype. Collectible unlocking and equipping belong to a later version.",
    links: [{ href: "/map", label: "Public map" }, { href: "/", label: "Keep wandering" }],
  },
  map: {
    index: "Found / public map",
    title: "A map of this place.",
    lead: "The public rooms, in case you wanted a less winding route.",
    note: "The map is a playful shortcut. Essential professional destinations are already in the header.",
    links: [{ href: "/", label: "Home" }, { href: "/about", label: "About + contact" }, { href: "/projects", label: "Projects" }, { href: "/sketchbook", label: "Sketchbook" }, { href: "/familiars", label: "Familiars" }, { href: "/collection", label: "Collection" }],
  },
};

export default async function ContentStub({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const route = routes[slug.join("/")];
  if (!route) notFound();

  return <div className="site-layer"><SiteHeader /><main className="stub-page">
    <Link href="/" className="back-home">← return to the homepage</Link>
    <span className="eyebrow">{route.index}</span>
    <h1>{route.title}</h1>
    <p className="stub-lead">{route.lead}</p>
    {route.images && <div className={`stub-media ${slug.join("/") === "familiars" ? "sprite-media" : ""}`}>{route.images.map(image => <figure key={image.src}><img src={image.src} alt={image.alt} /><figcaption>{image.label}</figcaption></figure>)}</div>}
    <div className="stub-bottom"><p>{route.note}</p><nav aria-label="Related destinations">{route.links?.map(link => <Link href={link.href} key={link.href}>{link.label} ↗</Link>)}</nav></div>
  </main></div>;
}
