import type { AboutContent } from "../lib/content/models.ts";

export const aboutContent = {
    // Draft copy for owner review; identity and availability remain in homepage.ts.
    introduction:
        "I build web applications, connected systems, and games. I like making complicated things understandable enough to use and interesting enough to poke at.",
    practiceSummary:
        "My work brings interfaces and connected application systems together. On the game side, I’m building One Night Familiar Fight: an autobattler about Familiars, priorities, and watching a plan play out.",
    skillLabels: ["WEB APPS", "SYSTEMS THINKING", "GAME DEVELOPMENT", "INTERACTION"],
    portraitCaption: "ALSO ME, SORT OF",
    githubUrl: "https://github.com/almazancameron",
    linkedinUrl: "https://www.linkedin.com/in/almazancameron",
    // Add the real PDF to public/resume.pdf, then set this to "/resume.pdf".
    resumeUrl: null,
    evidence: [
        {
            projectSlug: "viscap-ai",
            caption: "Connected web platform",
            // Pending a privacy-reviewed storyboard derivative. Do not publish the source.
            media: null,
        },
        {
            projectSlug: "one-night-familiar-fight",
            caption: "Game systems in progress",
            media: {
                kind: "image",
                src: "/media/projects/pixel-pugilists/priority-builder.png",
                alt: "One Night Familiar Fight priority builder, with rules and a mock battle state",
                width: 1159,
                height: 661,
            },
        },
    ],
    familiarSlug: "ashwing",
} satisfies AboutContent;
