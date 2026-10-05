import type { Project } from "../../lib/content/models";
import { RoutePlaceholder } from "../pages/route-placeholder";

export function ViscapFoundation({ project }: { project: Project }) {
    return (
        <RoutePlaceholder eyebrow="CONNECTED SOFTWARE PLATFORM" title={project.title} summary={project.summary}>
            <p>{project.sections[0]?.paragraphs[0]}</p>
        </RoutePlaceholder>
    );
}
