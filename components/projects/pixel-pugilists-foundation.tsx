import type { Project } from "../../lib/content/models";
import { RoutePlaceholder } from "../pages/route-placeholder";
import { ContentImage } from "../ui/content-image";

export function PixelPugilistsFoundation({ project }: { project: Project }) {
    return (
        <RoutePlaceholder eyebrow="GAME / IN DEVELOPMENT" title={project.title} summary={project.summary}>
            {project.heroMedia && <ContentImage media={project.heroMedia} sizes="(max-width: 48rem) 100vw, 70vw" />}
        </RoutePlaceholder>
    );
}
