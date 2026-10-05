import Link from "next/link";
import type { SketchbookPost } from "../../lib/content/models";
import { RoutePlaceholder } from "../pages/route-placeholder";
import { ContentImage } from "../ui/content-image";
import styles from "./sketchbook-entry.module.css";

export function SketchbookEntry({ post }: { post: SketchbookPost }) {
    return (
        <RoutePlaceholder eyebrow="SKETCHBOOK / FULL ENTRY" title={post.title} summary={post.excerpt}>
            <article className={styles.body}>
                {post.body.map((block, index) => {
                    switch (block.type) {
                        case "paragraph":
                            return <p key={`${block.type}-${index}`}>{block.text}</p>;
                        case "heading":
                            return block.level === 2 ? (
                                <h2 key={`${block.type}-${index}`}>{block.text}</h2>
                            ) : (
                                <h3 key={`${block.type}-${index}`}>{block.text}</h3>
                            );
                        case "image":
                            return (
                                <figure key={`${block.type}-${index}`}>
                                    <ContentImage media={block.media} />
                                    <figcaption>{block.caption}</figcaption>
                                </figure>
                            );
                        case "list":
                            return (
                                <ul key={`${block.type}-${index}`}>
                                    {block.items.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            );
                    }
                })}
            </article>
            <Link href="/sketchbook">Back to the Sketchbook</Link>
        </RoutePlaceholder>
    );
}
