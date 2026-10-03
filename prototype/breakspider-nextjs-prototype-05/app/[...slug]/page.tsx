import { notFound } from "next/navigation";
import AboutPage from "@/components/AboutPage";
import ProjectsPage from "@/components/ProjectsPage";
import PixelPugilistsPage from "@/components/PixelPugilistsPage";
import ViscapPage from "@/components/ViscapPage";
import SketchbookPage from "@/components/SketchbookPage";
import SketchbookEntryPage from "@/components/SketchbookEntryPage";
import FamiliarsPage from "@/components/FamiliarsPage";
import FamiliarDetailPage from "@/components/FamiliarDetailPage";
import CollectionPage from "@/components/CollectionPage";
import MapPage from "@/components/MapPage";

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  if (path === "about") return <AboutPage />;
  if (path === "projects") return <ProjectsPage />;
  if (path === "projects/pixel-pugilists") return <PixelPugilistsPage />;
  if (path === "projects/viscap") return <ViscapPage />;
  if (path === "sketchbook") return <SketchbookPage />;
  if (path === "sketchbook/battle-plans-first-pass") return <SketchbookEntryPage />;
  if (path === "familiars") return <FamiliarsPage />;
  if (path === "familiars/ashwing" || path === "familiars/pebbloq") return <FamiliarDetailPage slug={slug[1] as "ashwing" | "pebbloq"} />;
  if (path === "collection") return <CollectionPage />;
  if (path === "map") return <MapPage />;
  notFound();
}
