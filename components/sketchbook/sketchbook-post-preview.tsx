import Link from "next/link";
import type { SketchbookPost } from "../../lib/content/models";
import styles from "./sketchbook-post-preview.module.css";

export function SketchbookPostPreview({ post }: { post: SketchbookPost }) {
    return (
        <article className={styles.post}>
            <p className={styles.meta}>
                {post.isLongform ? "Long entry" : "Short note"} / {post.tags.join(" · ")}
            </p>
            <h2>
                {post.isLongform ? (
                    <Link href={`/sketchbook/${post.slug}`}>{post.title}</Link>
                ) : (
                    post.title
                )}
            </h2>
            <p>{post.excerpt}</p>
            <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                })}
            </time>
        </article>
    );
}
