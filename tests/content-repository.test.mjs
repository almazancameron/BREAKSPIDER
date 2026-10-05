import { expect, test } from "vitest";

import {
    getFamiliar,
    getFamiliars,
    getChangelogEntries,
    getCollectibles,
    getProject,
    getProjects,
    getSketchbookPost,
    getSketchbookPosts,
} from "../lib/content/repository.ts";

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
