import type { ChangelogEntry } from "../lib/content/models.ts";

export const changelogEntries = [
    {
        id: "homepage-authored-clutter",
        version: "v0.1",
        title: "Homepage authored clutter",
        notes: [
            "Placed curated sprites and keepsakes around the homepage.",
            "Tuned overlaps and spacing for desktop and smaller screens.",
        ],
        publishedAt: "2026-10-08",
        links: [],
    },
    {
        id: "homepage-composition",
        version: "v0.1",
        title: "Homepage composition",
        notes: [
            "Added the homepage Spotlight, About section, and project previews.",
            "Adapted the composition for desktop and smaller screens.",
        ],
        publishedAt: "2026-10-07",
        links: [],
    },
    {
        id: "ui-sound-feedback",
        version: "v0.1",
        title: "UI sound feedback",
        notes: [
            "Added click feedback to navigation and visitor-profile controls.",
            "Updated sound handling to respect mute and visitor readiness.",
        ],
        publishedAt: "2026-10-05",
        links: [],
    },
    {
        id: "header-and-animated-logo",
        version: "v0.1",
        title: "Header and animated logo",
        notes: [
            "Added custom Home, Projects, and About navigation links.",
            "Animated the header wordmark as two separate halves.",
        ],
        publishedAt: "2026-10-04",
        links: [],
    },
    {
        id: "intro-splash",
        version: "v0.1",
        title: "Intro splash",
        notes: [
            "Added the animated intro with skip and replay controls.",
            "Remembered returning visitors and fixed loading and playback flashes.",
        ],
        publishedAt: "2026-10-04",
        links: [],
    },
    {
        id: "v0-1-foundation",
        version: "v0.1",
        title: "Production foundation",
        notes: ["The static site foundation is being assembled."],
        publishedAt: "2026-09-27",
        links: [],
    },
] satisfies ChangelogEntry[];
