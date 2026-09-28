import { notFound } from "next/navigation";
import { ViscapFoundation } from "../../../components/projects/viscap-foundation";
import { getProject } from "../../../lib/content/repository";

export default async function ViscapAiPage() {
  const project = await getProject("viscap-ai");

  if (!project) notFound();

  return <ViscapFoundation project={project} />;
}
