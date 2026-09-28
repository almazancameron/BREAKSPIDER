import Link from "next/link";
import { notFound } from "next/navigation";
import { RoutePlaceholder } from "../../../components/pages/route-placeholder";
import { getProject } from "../../../lib/content/repository";

export default async function OneNightFamiliarFightPage() {
  const project = await getProject("one-night-familiar-fight");

  if (!project) notFound();

  return (
    <RoutePlaceholder
      eyebrow="GAME PROJECT"
      title={project.title}
      summary={project.summary}
    >
      <Link href={project.links[0]?.href ?? "/play/onff"}>Open playable build</Link>
    </RoutePlaceholder>
  );
}
