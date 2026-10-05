import Link from "next/link";
import type { Familiar } from "../../lib/content/models";
import { ContentImage } from "../ui/content-image";
import styles from "./familiar-preview.module.css";

export function FamiliarPreview({ familiar }: { familiar: Familiar }) {
    return (
        <article className={styles.preview}>
            <Link className={styles.link} href={`/familiars/${familiar.slug}`}>
                <ContentImage media={familiar.sprite} sizes="96px" />
                <span>
                    <strong>{familiar.name}</strong>
                    <small>{familiar.tags.join(" / ")}</small>
                </span>
            </Link>
            <p>{familiar.shortDescription}</p>
        </article>
    );
}
