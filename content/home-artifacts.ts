import type { HomeArtifact } from "../lib/content/models.ts";

export const homeArtifacts = [
    {
        id: "onff-build",
        label: "ONFF / BUILD 01",
        title: "One Night Familiar Fight",
        description:
            "The priority builder brings battle-plan rules, techniques, and a mock battle state into one workspace.",
        media: {
            kind: "image",
            src: "/media/projects/pixel-pugilists/priority-builder.png",
            alt: "One Night Familiar Fight priority builder",
            width: 1159,
            height: 661,
        },
        kind: "image",
        href: "/projects/one-night-familiar-fight",
        linkLabel: "Open ONFF project",
    },
    {
        id: "viscap-system",
        label: "VISCAP / SYSTEM 02",
        title: "Viscap",
        description:
            "An interconnected production platform for creative teams, media, storyboards, and workflows. Public screenshots are pending privacy review.",
        media: {
            kind: "image",
            src: "/media/projects/viscap/media-library.PNG",
            alt: "One Night Familiar Fight priority builder",
            width: 1159,
            height: 661,
        },
        kind: "other",
        href: "/projects/viscap-ai",
        linkLabel: "Open Viscap project",
    },
    {
        id: "found-map",
        label: "FOUND / MAP 03",
        title: "Site map",
        description:
            "A small route diagram for finding your way around the public site.",
        media: null,
        kind: "vector",
        href: "/map",
        linkLabel: "Open site map",
    },
] satisfies HomeArtifact[];
