import { mkdtemp, mkdir, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { expect, test } from "vitest";

const defaults = {
    folders: {
        noise: { family: "noise", pixelArt: false, widthRange: [32, 74] },
        badges: { family: "badge", pixelArt: true, widthRange: [20, 38] },
        sprites: { family: "sprite", pixelArt: false, widthRange: [44, 110] },
        "pixel-sprites": { family: "sprite", pixelArt: true, widthRange: [44, 110] },
    },
    overrides: {},
};

async function fixture(run) {
    const directory = await mkdtemp(path.join(tmpdir(), "breakspider-catalogue-test-"));
    const rootDirectory = path.join(directory, "images");
    const outputFile = path.join(directory, "catalogue.ts");
    const configFile = path.join(directory, "settings.json");
    await mkdir(rootDirectory);
    await writeFile(configFile, JSON.stringify(defaults));
    const image = async (file, width = 20, height = 10) => {
        const target = path.join(rootDirectory, file);
        await mkdir(path.dirname(target), { recursive: true });
        await sharp({ create: { width, height, channels: 4, background: "transparent" } }).toFile(target);
    };
    try {
        await run({ rootDirectory, outputFile, configFile, image });
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
}

test("folder defaults, nested assets and optional overrides produce measured static records", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await options.image("pixel-sprites/game/tall sprite.png", 12, 40);
        await options.image("badges/small.webp", 16, 24);
        await options.image("noise/blue.png", 30, 20);
        await writeFile(options.configFile, JSON.stringify({
            ...defaults, overrides: { "pixel-sprites/game/tall sprite.png": { widthRange: [28, 50] } },
        }));
        const { assets } = await generateCatalogue(options);
        expect(assets.map((asset) => asset.id)).toEqual(["small", "blue", "tall sprite"]);
        expect(assets[0]).toMatchObject({ family: "badge", pixelArt: true, widthRange: [20, 38], media: { width: 16, height: 24 } });
        expect(assets[2]).toEqual({
            id: "tall sprite", family: "sprite", pixelArt: true, widthRange: [28, 50],
            media: { kind: "image", src: "/media/home/random-clutter/pixel-sprites/game/tall%20sprite.png", alt: "", width: 12, height: 40 },
        });
    });
});

test("regeneration reflects additions, deletions and replacement dimensions without editing records", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await options.image("sprites/old.png");
        expect((await generateCatalogue(options)).assets.map((asset) => asset.id)).toEqual(["old"]);
        await options.image("sprites/new.png", 50, 60);
        await unlink(path.join(options.rootDirectory, "sprites/old.png"));
        await options.image("sprites/new.png", 80, 90);
        expect((await generateCatalogue(options)).assets).toMatchObject([{ id: "new", media: { width: 80, height: 90 } }]);
        expect((await generateCatalogue(options)).changed).toBe(false);
    });
});

test("check mode detects stale output without changing it and allows an empty collection", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await generateCatalogue(options);
        const original = await readFile(options.outputFile, "utf8");
        await options.image("sprites/new.png");
        await expect(generateCatalogue({ ...options, check: true })).rejects.toThrow(/out of date/i);
        expect(await readFile(options.outputFile, "utf8")).toBe(original);
        await generateCatalogue(options);
        expect((await generateCatalogue({ ...options, check: true })).changed).toBe(false);
    });
});

test("duplicate IDs across folders fail before overwriting a working catalogue", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await options.image("sprites/same.png");
        await generateCatalogue(options);
        const original = await readFile(options.outputFile, "utf8");
        await options.image("badges/SAME.webp");
        await expect(generateCatalogue(options)).rejects.toThrow(/duplicate/i);
        expect(await readFile(options.outputFile, "utf8")).toBe(original);
    });
});

test("unsupported image content cannot enter the collection under a supported extension", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await options.image("sprites/disguised.png");
        const tiff = await sharp({ create: { width: 2, height: 2, channels: 4, background: "red" } }).tiff().toBuffer();
        await writeFile(path.join(options.rootDirectory, "sprites/disguised.png"), tiff);
        await expect(generateCatalogue(options)).rejects.toThrow(/disguised.png.*format/i);
    });
});

test("JPEG and AVIF images retain detected dimensions", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await options.image("sprites/photo.jpg", 30, 40);
        await options.image("sprites/cutout.avif", 50, 60);
        expect((await generateCatalogue(options)).assets).toMatchObject([
            { id: "cutout", media: { width: 50, height: 60 } },
            { id: "photo", media: { width: 30, height: 40 } },
        ]);
    });
});

test("malformed override containers fail instead of silently dropping asset settings", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        for (const overrides of [[], true]) {
            await writeFile(options.configFile, JSON.stringify({ ...defaults, overrides }));
            await expect(generateCatalogue(options)).rejects.toThrow(/overrides/i);
        }
    });
});

test("invalid settings, misplaced files, corrupt images and animations fail with useful errors", async () => {
    const { generateCatalogue } = await import("../scripts/generate-clutter-library.mjs");
    await fixture(async (options) => {
        await options.image("sprites/valid.png");
        await writeFile(options.configFile, JSON.stringify({ ...defaults, overrides: { "sprites/valid.png": { widthRange: [50, 20] } } }));
        await expect(generateCatalogue(options)).rejects.toThrow(/widthRange/i);
        await writeFile(options.configFile, JSON.stringify(defaults));
        await options.image("misplaced.png");
        await expect(generateCatalogue(options)).rejects.toThrow(/folder/i);
        await unlink(path.join(options.rootDirectory, "misplaced.png"));
        await writeFile(path.join(options.rootDirectory, "sprites/valid.png"), "broken image");
        await expect(generateCatalogue(options)).rejects.toThrow(/sprites\/valid.png/);
        await options.image("sprites/valid.png");
        // Two real WebP frames exercise the static-only contract without a DOM mock.
        const frames = Buffer.from([...Array(4).fill([255, 0, 0, 255]).flat(), ...Array(4).fill([0, 0, 255, 255]).flat()]);
        await sharp(frames, { raw: { width: 2, height: 4, channels: 4, pageHeight: 2 } })
            .webp({ loop: 0 }).toFile(path.join(options.rootDirectory, "sprites/animated.webp"));
        await expect(generateCatalogue(options)).rejects.toThrow(/animated/i);
    });
});
