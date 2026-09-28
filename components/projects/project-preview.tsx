import Link from "next/link";
import type { Project } from "../../lib/content/models";
import { ContentImage } from "../ui/content-image";
import styles from "./project-preview.module.css";

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <article className={styles.project}>
      <div className={styles.media}>
        {project.heroMedia ? (
          <ContentImage media={project.heroMedia} sizes="(max-width: 48rem) 100vw, 45vw" />
        ) : (
          <span className={styles.mediaPending}>MEDIA PENDING REVIEW</span>
        )}
      </div>
      <div className={styles.details}>
        <p className={styles.meta}>{project.type} / {project.status}</p>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <Link href={`/projects/${project.slug}`}>Open {project.title} <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
