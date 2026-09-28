import { notFound } from "next/navigation";
import { FamiliarProfile } from "../../../components/familiars/familiar-profile";
import { getFamiliar, getFamiliars } from "../../../lib/content/repository";

export const dynamicParams = false;

export async function generateStaticParams() {
  const familiars = await getFamiliars();
  return familiars.map(({ slug }) => ({ slug }));
}

export default async function FamiliarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const familiar = await getFamiliar(slug);

  if (!familiar) notFound();

  return <FamiliarProfile familiar={familiar} />;
}
