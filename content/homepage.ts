import type { HomepageContent } from "../lib/content/models.ts";

export const homepageContent = {
    displayName: "Cameron Almazan",
    availability: "OPEN TO WORK",
    email: "almazancameron@gmail.com",
    introduction:
        "I build deeply connected systems and applications that turn complex ideas into delightful experiences.",
    aboutSummary:
        "Full-stack engineering, systems thinking, and a passion for poking at things.",
    currentProjectSlug: "one-night-familiar-fight",
    featuredFamiliarSlug: null,
    spotlightCapture: {
        kind: "image",
        src: "/media/projects/pixel-pugilists/combat.png",
        alt: "One Night Familiar Fight combat prototype",
        width: 1153,
        height: 655,
    },
    portrait: {
        kind: "image",
        src: "/media/home/creator-portrait.png",
        alt: "Illustrated creator avatar in a purple hat",
        width: 1170,
        height: 1344,
    },
} satisfies HomepageContent;
