export type ImageMedia = {
    kind: "image";
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

export type ProjectSection = {
    heading: string;
    paragraphs: string[];
    media: ImageMedia[];
};

export type Project = {
    id: string;
    slug: string;
    title: string;
    type: "game" | "software";
    status: "active" | "complete" | "paused";
    summary: string;
    heroMedia: ImageMedia | null;
    sections: ProjectSection[];
    relatedSketchbookPosts: string[];
    relatedFamiliars: string[];
    links: { label: string; href: string }[];
};

export type SketchbookBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; level: 2 | 3; text: string }
    | { type: "image"; media: ImageMedia; caption: string }
    | { type: "list"; items: string[] };

export type SketchbookPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: SketchbookBlock[];
    tags: string[];
    media: ImageMedia[];
    relatedProject: string | null;
    relatedFamiliars: string[];
    publishedAt: string;
    updatedAt: string | null;
    isLongform: boolean;
};

export type Familiar = {
    id: string;
    slug: string;
    name: string;
    sprite: ImageMedia;
    shortDescription: string;
    description: string;
    playstyle: string;
    tags: string[];
    mechanics: string[];
    projects: string[];
    relatedSketchbookPosts: string[];
    featured: boolean;
    publishedAt: string;
};

export type CollectibleCosmetic =
    | { kind: "avatar"; media: ImageMedia }
    | { kind: "badge"; media: ImageMedia }
    | { kind: "cursor-style"; styleId: string }
    | { kind: "cursor-follower"; followerId: string }
    | { kind: "cursor-trail"; trailId: string };

export type Collectible = {
    id: string;
    name: string;
    type: CollectibleCosmetic["kind"] | "map" | "toy";
    media: ImageMedia | null;
    description: string;
    unlockRuleId: string;
    cosmetic: CollectibleCosmetic | null;
};

export type ChangelogEntry = {
    id: string;
    version: string;
    title: string;
    notes: string[];
    publishedAt: string;
    links: { label: string; href: string }[];
};
