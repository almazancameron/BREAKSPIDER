import { notFound } from "next/navigation";
import { SketchbookEntry } from "../../../components/sketchbook/sketchbook-entry";
import { getSketchbookPost, getSketchbookPosts } from "../../../lib/content/repository";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getSketchbookPosts();
  return posts.filter((post) => post.isLongform).map(({ slug }) => ({ slug }));
}

export default async function SketchbookEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSketchbookPost(slug);

  if (!post || !post.isLongform) notFound();

  return <SketchbookEntry post={post} />;
}
