import { ProjectPreview } from "../../components/projects/project-preview";
import { RoutePlaceholder } from "../../components/pages/route-placeholder";
import { getProjects } from "../../lib/content/repository";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <RoutePlaceholder
      eyebrow="PUBLIC ARCHIVE"
      title="Things I’ve made"
      summary="A growing archive of software, games, and experiments."
    >
      {projects.map((project) => <ProjectPreview key={project.id} project={project} />)}
    </RoutePlaceholder>
  );
}
