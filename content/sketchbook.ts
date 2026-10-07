import type { SketchbookPost } from "../lib/content/models.ts";

export const sketchbookPosts = [
    {
        id: "battle-plans-first-pass",
        slug: "battle-plans-first-pass",
        title: "Battle plans, first pass",
        excerpt:
            "Priority rules are easier to change when you can actually see them.",
        body: [
            {
                type: "paragraph",
                text: "I'm trying to make combat decisions readable before the fight starts. The priority builder puts rules, techniques, and a mock battle state in one place.",
            },
            {
                type: "image",
                media: {
                    kind: "image",
                    src: "/media/projects/pixel-pugilists/priority-builder.png",
                    alt: "One Night Familiar Fight priority builder",
                    width: 1159,
                    height: 661,
                },
                caption: "A priority-builder screen from One Night Familiar Fight.",
            },
        ],
        tags: ["ONFF", "Game design"],
        media: [],
        relatedProject: "pixel-pugilists",
        relatedFamiliars: [],
        publishedAt: "2026-09-24T12:00:00.000Z",
        updatedAt: null,
        isLongform: true,
    },
    {
        id: "ashwing-at-64-pixels",
        slug: "ashwing-at-64-pixels",
        title: "Ashwing at 64 pixels",
        excerpt:
            "Its orange edge and broken silhouette do most of the work at sprite size.",
        body: [
            {
                type: "paragraph",
                text: "I keep checking how much of Ashwing's silhouette survives when the sprite gets small.",
            },
        ],
        tags: ["ONFF", "Game design"],
        media: [],
        relatedProject: "pixel-pugilists",
        relatedFamiliars: ["ashwing"],
        publishedAt: "2026-09-20T12:00:00.000Z",
        updatedAt: null,
        isLongform: false,
    },
] satisfies SketchbookPost[];
