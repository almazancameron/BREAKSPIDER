import { RoutePlaceholder } from "../../components/pages/route-placeholder";
import { SketchbookPostPreview } from "../../components/sketchbook/sketchbook-post-preview";
import { getSketchbookPosts } from "../../lib/content/repository";

export default async function SketchbookPage() {
    const posts = await getSketchbookPosts();

    return (
        <RoutePlaceholder
            eyebrow="NOTES / UPDATES / ODD LITTLE LOGS"
            title="Sketchbook"
            summary="Short notes and longer development entries."
        >
            {posts.map((post) => <SketchbookPostPreview key={post.id} post={post} />)}
        </RoutePlaceholder>
    );
}
