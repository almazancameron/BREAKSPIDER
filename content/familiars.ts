import type { Familiar } from "../lib/content/models.ts";

export const familiars = [
  {
    id: "ashwing",
    slug: "ashwing",
    name: "Ashwing",
    sprite: {
      kind: "image",
      src: "/media/familiars/ashwing.png",
      alt: "Ashwing Familiar sprite",
      width: 64,
      height: 64,
    },
    shortDescription: "A fire-aligned offensive Familiar.",
    description:
      "A dark winged Familiar with bright orange fire running through its silhouette.",
    playstyle: "Offense",
    tags: ["burn", "offense"],
    mechanics: [],
    projects: ["pixel-pugilists"],
    relatedSketchbookPosts: ["ashwing-at-64-pixels"],
    featured: true,
    publishedAt: "2026-09-24",
  },
  {
    id: "pebbloq",
    slug: "pebbloq",
    name: "Pebbloq",
    sprite: {
      kind: "image",
      src: "/media/familiars/pebbloq.png",
      alt: "Pebbloq Familiar sprite",
      width: 64,
      height: 64,
    },
    shortDescription: "A stone-aligned defensive Familiar.",
    description:
      "A squat stone Familiar with a shield-like outline and a compact, sturdy pose.",
    playstyle: "Defense",
    tags: ["stone", "defense"],
    mechanics: [],
    projects: ["pixel-pugilists"],
    relatedSketchbookPosts: [],
    featured: false,
    publishedAt: "2026-09-24",
  },
] satisfies Familiar[];
