import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, it } from "vitest";
import { HOME_AUTHORED_PLACEMENTS } from "../content/home-clutter";
import { readPlacementFile, savePlacementFile, validatePlacements } from "../lib/home/clutter-save";

const directories: string[] = [];
afterEach(async () => { await Promise.all(directories.splice(0).map((path) => rm(path, { recursive: true, force: true }))); });

async function fixture() {
    const directory = await mkdtemp(join(tmpdir(), "clutter-save-"));
    directories.push(directory);
    const path = join(directory, "home-clutter.ts");
    const source = await readFile(join(process.cwd(), "content/home-clutter.ts"), "utf8");
    await writeFile(path, source);
    return { path, source };
}

it("saves complete records and overrides while preserving the catalogue and surrounding source", async () => {
    const { path, source } = await fixture();
    const original = await readPlacementFile(path);
    const records = structuredClone(original.placements);
    records[0].mobile = { ...records[0].mobile, x: 67, edgeOffset: null };
    const revision = await savePlacementFile(path, original.revision, records);
    const saved = await readPlacementFile(path);
    expect(saved.placements).toEqual(records);
    expect(saved.revision).toBe(revision);
    expect(saved.revision).not.toBe(original.revision);
    const output = await readFile(path, "utf8");
    expect(output.split("export const HOME_AUTHORED_PLACEMENTS")[0]).toBe(source.split("export const HOME_AUTHORED_PLACEMENTS")[0]);
    expect(output).toContain('    {\n        "id":');
});

it("refuses to overwrite external edits", async () => {
    const { path, source } = await fixture();
    const original = await readPlacementFile(path);
    await writeFile(path, source + "\n// Owner edit\n");
    await expect(savePlacementFile(path, original.revision, original.placements)).rejects.toThrow("changed");
    expect(await readFile(path, "utf8")).toBe(source + "\n// Owner edit\n");
});

it("serializes concurrent saves so a stale writer cannot replace a newer save", async () => {
    const { path } = await fixture();
    const original = await readPlacementFile(path);
    const results = await Promise.allSettled([
        savePlacementFile(path, original.revision, original.placements.map((record, index) => index ? record : { ...record, x: record.x + 1 })),
        savePlacementFile(path, original.revision, [{ ...original.placements[0], x: 123 }]),
    ]);
    expect(results[0].status).toBe("fulfilled");
    expect(results[1].status).toBe("rejected");
});

it("accepts all existing records, empty compositions, and null edge overrides", () => {
    expect(validatePlacements(HOME_AUTHORED_PLACEMENTS, HOME_AUTHORED_PLACEMENTS.map((item) => item.assetId))).toEqual(HOME_AUTHORED_PLACEMENTS);
    expect(validatePlacements([], [])).toEqual([]);
});

it("rejects invalid shapes, duplicate IDs, unknown assets, and invalid overrides", () => {
    const record = HOME_AUTHORED_PLACEMENTS[0];
    const assets = [record.assetId];
    for (const records of [null, [record, record], [{ ...record, assetId: "missing" }], [{ ...record, width: -1 }], [{ ...record, mobile: { anchor: "bad" } }], [{ ...record, x: Infinity }], [{ ...record, mobile: { surprise: 1 } }]]) {
        expect(() => validatePlacements(records, assets)).toThrow();
    }
});
