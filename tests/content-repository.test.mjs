import assert from "node:assert/strict";
import test from "node:test";

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

  assert.deepEqual(projects.map((project) => project.slug), [
    "pixel-pugilists",
    "viscap-ai",
    "one-night-familiar-fight",
  ]);
  assert.equal((await getProject("viscap-ai"))?.title, "Viscap");
  assert.equal((await getProject("one-night-familiar-fight"))?.title, "One Night Familiar Fight");
});

test("content lookups return null for missing slugs", async () => {
  assert.equal(await getProject("missing-project"), null);
  assert.equal(await getFamiliar("missing-familiar"), null);
  assert.equal(await getSketchbookPost("missing-post"), null);
});

test("familiar and sketchbook feeds have deterministic ordering", async () => {
  const familiars = await getFamiliars();
  const posts = await getSketchbookPosts();

  assert.deepEqual(familiars.map((familiar) => familiar.slug), ["ashwing", "pebbloq"]);
  assert.deepEqual(posts.map((post) => post.slug), ["battle-plans-first-pass", "ashwing-at-64-pixels"]);
});

test("collectibles and changelog entries are read as typed local content", async () => {
  const collectibles = await getCollectibles();
  const changelog = await getChangelogEntries();

  assert.equal(collectibles[0].id, "found-map");
  assert.equal(changelog[0].version, "v0.1");
});
