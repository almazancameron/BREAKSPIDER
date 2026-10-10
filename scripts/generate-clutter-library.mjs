import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repository = fileURLToPath(new URL("../", import.meta.url));
const formats = { ".png": "png", ".jpg": "jpeg", ".jpeg": "jpeg", ".webp": "webp", ".avif": "heif" };
const extensions = new Set(Object.keys(formats));
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;

function validateSettings(settings, label, partial = false) {
    if (!settings || typeof settings !== "object" || Array.isArray(settings)) throw new Error(`Invalid settings: ${label}`);
    for (const key of Object.keys(settings)) {
        if (!["family", "pixelArt", "widthRange"].includes(key)) throw new Error(`Unknown setting ${key}: ${label}`);
    }
    if ((!partial || settings.family !== undefined) && !["noise", "badge", "sprite"].includes(settings.family)) {
        throw new Error(`Invalid family: ${label}`);
    }
    if ((!partial || settings.pixelArt !== undefined) && typeof settings.pixelArt !== "boolean") {
        throw new Error(`Invalid pixelArt: ${label}`);
    }
    const range = settings.widthRange;
    if ((!partial || range !== undefined) && (!Array.isArray(range) || range.length !== 2
        || !range.every((number) => Number.isFinite(number) && number > 0) || range[0] > range[1])) {
        throw new Error(`Invalid widthRange: ${label}`);
    }
}

async function imageFiles(directory, relative = "") {
    const files = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        if (entry.name.startsWith(".")) continue;
        const file = relative ? `${relative}/${entry.name}` : entry.name;
        if (entry.isSymbolicLink()) throw new Error(`Use regular files, not symbolic links: ${file}`);
        if (entry.isDirectory()) files.push(...await imageFiles(path.join(directory, entry.name), file));
        else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(file);
        else if (![".md", ".txt", ".json"].includes(path.extname(entry.name).toLowerCase())) {
            throw new Error(`Unsupported file ${file}. Use static PNG, JPEG, WebP or AVIF images.`);
        }
    }
    return files.sort(compare);
}

export async function generateCatalogue({
    rootDirectory = path.join(repository, "public/media/home/random-clutter"),
    outputFile = path.join(repository, "content/home-clutter-library.generated.ts"),
    configFile = path.join(repository, "content/home-clutter-library.settings.json"),
    check = false,
} = {}) {
    const config = JSON.parse(await readFile(configFile, "utf8"));
    if (!config?.folders || typeof config.folders !== "object" || Array.isArray(config.folders)) {
        throw new Error("Settings must contain folder defaults.");
    }
    if (config.overrides !== undefined && (!config.overrides || typeof config.overrides !== "object" || Array.isArray(config.overrides))) {
        throw new Error("Settings overrides must be an object keyed by relative image path.");
    }
    for (const [folder, settings] of Object.entries(config.folders)) validateSettings(settings, folder);
    for (const [file, settings] of Object.entries(config.overrides ?? {})) validateSettings(settings, file, true);

    const assets = [];
    const ids = new Map();
    for (const file of await imageFiles(rootDirectory)) {
        const folder = file.split("/")[0];
        if (!file.includes("/") || !Object.hasOwn(config.folders, folder)) {
            throw new Error(`Place ${file} inside a configured folder: ${Object.keys(config.folders).join(", ")}.`);
        }
        const id = path.posix.basename(file, path.posix.extname(file));
        const key = id.toLowerCase();
        if (ids.has(key)) throw new Error(`Duplicate asset ID: ${ids.get(key)} and ${file}. Give each image a unique filename.`);
        ids.set(key, file);
        const settings = { ...config.folders[folder], ...config.overrides?.[file] };
        let metadata;
        try {
            const buffer = await readFile(path.join(rootDirectory, file));
            metadata = await sharp(buffer, { animated: true }).metadata();
            if (metadata.format !== formats[path.extname(file).toLowerCase()]
                || (metadata.format === "heif" && metadata.compression !== "av1")) {
                throw new Error("Image format does not match its extension; export a supported static image first");
            }
            // Sharp doesn't expose APNG frames; inspect PNG chunk names separately.
            if (metadata.format === "png") {
                for (let offset = 8; offset + 12 <= buffer.length;) {
                    if (buffer.toString("ascii", offset + 4, offset + 8) === "acTL") throw new Error("Animated PNG");
                    offset += buffer.readUInt32BE(offset) + 12;
                }
            }
            if ((metadata.pages ?? 1) > 1) throw new Error("Animated image");
            if (!metadata.width || !metadata.height) throw new Error("Missing image dimensions");
            if (metadata.orientation && metadata.orientation !== 1) throw new Error("Rotate/export the image without EXIF orientation first");
        } catch (error) {
            throw new Error(`Cannot catalogue ${file}: ${error.message}`);
        }
        assets.push({
            id, family: settings.family, pixelArt: settings.pixelArt, widthRange: settings.widthRange,
            media: {
                kind: "image", src: `/media/home/random-clutter/${file.split("/").map(encodeURIComponent).join("/")}`,
                alt: "", width: metadata.width, height: metadata.height,
            },
        });
    }
    const output = [
        "// Generated by npm run clutter:generate. Edit the image folders/settings, not this file.",
        'import type { ClutterAsset } from "../lib/home/clutter-types";',
        "", "export const HOME_CLUTTER_LIBRARY: ClutterAsset[] = [",
        ...assets.map((asset) => `    ${JSON.stringify(asset)},`),
        "];", "",
    ].join("\n");
    let previous;
    try { previous = await readFile(outputFile, "utf8"); } catch (error) { if (error.code !== "ENOENT") throw error; }
    const changed = previous?.replace(/\r\n/g, "\n") !== output;
    if (check && changed) throw new Error("Clutter library is out of date. Run npm run clutter:generate.");
    if (changed) {
        await mkdir(path.dirname(outputFile), { recursive: true });
        await writeFile(outputFile, output, "utf8");
    }
    return { assets, changed };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        if (process.argv.slice(2).some((argument) => argument !== "--check")) throw new Error("Usage: npm run clutter:generate -- [--check]");
        const { assets, changed } = await generateCatalogue({ check: process.argv.includes("--check") });
        console.log(`${changed ? "Generated" : "Up to date:"} clutter library (${assets.length} images).`);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
