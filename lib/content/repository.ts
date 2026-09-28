import { changelogEntries } from "../../content/changelog.ts";
import { collectibles } from "../../content/collectibles.ts";
import { familiars } from "../../content/familiars.ts";
import { projects } from "../../content/projects.ts";
import { sketchbookPosts } from "../../content/sketchbook.ts";
import type {
  ChangelogEntry,
  Collectible,
  Familiar,
  Project,
  SketchbookPost,
} from "./models.ts";

/**
 * Pages read authored content through this module. The local arrays can later
 * be replaced by a Supabase-backed implementation without changing consumers.
 */
export async function getProjects(): Promise<Project[]> {
  return [...projects];
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getFamiliars(): Promise<Familiar[]> {
  return [...familiars];
}

export async function getFamiliar(slug: string): Promise<Familiar | null> {
  return familiars.find((familiar) => familiar.slug === slug) ?? null;
}

export async function getSketchbookPosts(): Promise<SketchbookPost[]> {
  return [...sketchbookPosts].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}

export async function getSketchbookPost(
  slug: string,
): Promise<SketchbookPost | null> {
  return sketchbookPosts.find((post) => post.slug === slug) ?? null;
}

export async function getCollectibles(): Promise<Collectible[]> {
  return [...collectibles];
}

export async function getChangelogEntries(): Promise<ChangelogEntry[]> {
  return [...changelogEntries].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}
