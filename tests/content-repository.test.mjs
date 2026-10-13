import { expect, test } from "vitest";
import { access } from "node:fs/promises";
import { join } from "node:path";

import {
    getAboutContent,
    getFamiliar,
    getFamiliars,
    getChangelogEntries,
    getCollectibles,
    getProject,
    getProjects,
    getSketchbookPost,
    getSketchbookPosts,
} from "../lib/content/repository.ts";

test("About provides confirmed professional paths and honest pending evidence", async () => {
    const about = await getAboutContent();
    const projects = await getProjects();

    expect(about.githubUrl).toBe("https://github.com/almazancameron");
    expect(about.linkedinUrl).toBe("https://www.linkedin.com/in/almazancameron");
    if (about.resumeUrl) {
        expect(about.resumeUrl).toMatch(/^\/[a-zA-Z0-9/_-]+\.pdf$/);
        await expect(access(join(process.cwd(), "public", about.resumeUrl.slice(1)))).resolves.toBeUndefined();
    }
    expect(about.evidence.map((item) => item.projectSlug)).toEqual([
        "viscap-ai",
        "one-night-familiar-fight",
    ]);
    for (const item of about.evidence) {
        expect(projects.some((project) => project.slug === item.projectSlug)).toBe(true);
        if (item.media) {
            await expect(access(join(process.cwd(), "public", item.media.src.slice(1)))).resolves.toBeUndefined();
            expect(item.media.alt.trim().length).toBeGreaterThan(0);
        }
    }
    expect(about.evidence[1].media.alt).toContain("One Night Familiar Fight");
    expect(await getFamiliar(about.familiarSlug)).not.toBeNull();
});

test("project reads preserve authored order and find by slug", async () => {
    const projects = await getProjects();

    expect(projects.map((project) => project.slug)).toEqual([
        "one-night-familiar-fight",
        "viscap-ai",
    ]);
    expect((await getProject("viscap-ai"))?.title).toBe("Viscap");
    expect((await getProject("one-night-familiar-fight"))?.title).toBe("One Night Familiar Fight");
    expect(await getProject("pixel-pugilists")).toBeNull();
});

test("content lookups return null for missing slugs", async () => {
    expect(await getProject("missing-project")).toBeNull();
    expect(await getFamiliar("missing-familiar")).toBeNull();
    expect(await getSketchbookPost("missing-post")).toBeNull();
});

test("familiar and sketchbook feeds have deterministic ordering", async () => {
    const familiars = await getFamiliars();
    const posts = await getSketchbookPosts();

    expect(familiars.map((familiar) => familiar.slug)).toEqual(["ashwing", "pebbloq"]);
    expect(posts.map((post) => post.slug)).toEqual(["battle-plans-first-pass", "ashwing-at-64-pixels"]);
});

test("collectibles and changelog entries are read as typed local content", async () => {
    const collectibles = await getCollectibles();
    const changelog = await getChangelogEntries();

    expect(collectibles[0].id).toBe("found-map");
    expect(changelog[0].version).toBe("v0.1");
});
