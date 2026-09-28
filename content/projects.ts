import type { Project } from "../lib/content/models.ts";

export const projects = [
  {
    id: "pixel-pugilists",
    slug: "pixel-pugilists",
    title: "Pixel Pugilists",
    type: "game",
    status: "active",
    summary:
      "A deterministic autobattler built around Familiars, priorities, and seeing a plan play out.",
    heroMedia: {
      kind: "image",
      src: "/media/projects/pixel-pugilists/priority-builder.png",
      alt: "Pixel Pugilists priority builder",
      width: 1159,
      height: 661,
    },
    sections: [
      {
        heading: "Battle plans",
        paragraphs: [
          "Combat decisions are configured before the fight. The priority builder brings rules, techniques, and a mock battle state into one workspace.",
        ],
        media: [],
      },
    ],
    relatedSketchbookPosts: ["battle-plans-first-pass"],
    relatedFamiliars: ["ashwing", "pebbloq"],
    links: [{ label: "Playable prototype", href: "/play/onff" }],
  },
  {
    id: "viscap-ai",
    slug: "viscap-ai",
    title: "Viscap",
    type: "software",
    status: "complete",
    summary:
      "An interconnected production platform with tools for creative teams, media, storyboards, and workflows.",
    heroMedia: null,
    sections: [
      {
        heading: "One connected platform",
        paragraphs: [
          "The product brought multiple production systems together. Public screenshots will be selected after the privacy review.",
        ],
        media: [],
      },
    ],
    relatedSketchbookPosts: [],
    relatedFamiliars: [],
    links: [],
  },
  {
    id: "one-night-familiar-fight",
    slug: "one-night-familiar-fight",
    title: "One Night Familiar Fight",
    type: "game",
    status: "active",
    summary: "A Familiar combat game with a web build planned for a later implementation phase.",
    heroMedia: null,
    sections: [
      {
        heading: "Playable build",
        paragraphs: ["The web build and player wrapper will be added in the playable-build phase."],
        media: [],
      },
    ],
    relatedSketchbookPosts: [],
    relatedFamiliars: [],
    links: [{ label: "Playable build", href: "/play/onff" }],
  },
] satisfies Project[];
