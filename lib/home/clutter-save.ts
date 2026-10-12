// Loaded only by the development save endpoint, never by the page or editor bundle.
import { createHash, randomUUID } from "node:crypto";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import ts from "typescript";
import { ANCHOR_ORDER, ANCHOR_POINTS } from "./clutter-authoring";
import type { AuthoredPlacement } from "./clutter-types";

export class ClutterSaveError extends Error {
    constructor(message: string, public status = 400) { super(message); }
}

const poseKeys = ["anchor", "anchorPoint", "x", "y", "width", "rotation", "scale", "zIndex", "hidden", "flip", "edgeOffset"];
const modes = ["wide", "narrow", "tablet", "mobile"];
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

export function validatePlacements(value: unknown, assetIds: readonly string[]): AuthoredPlacement[] {
    const invalid = () => { throw new ClutterSaveError("Invalid placement data. Nothing was saved."); };
    if (!Array.isArray(value) || value.length > 500) return invalid();
    const ids = new Set<string>();
    const pose = (record: Record<string, unknown>, partial: boolean) => {
        for (const key of poseKeys) {
            const item = record[key];
            if (item === undefined && (partial || key === "edgeOffset")) continue;
            if (key === "anchor") { if (!ANCHOR_ORDER.includes(item as never)) invalid(); }
            else if (key === "anchorPoint") { if (!ANCHOR_POINTS.includes(item as never)) invalid(); }
            else if (key === "hidden" || key === "flip") { if (typeof item !== "boolean") invalid(); }
            else if (key === "edgeOffset" && item === null) continue;
            else {
                if (typeof item !== "number" || !Number.isFinite(item)) invalid();
                const number = item as number;
                if (key === "width" && (number < 8 || number > 2048)) invalid();
                if (key === "scale" && (number < 0.25 || number > 8)) invalid();
                if (key === "rotation" && Math.abs(number) > 180) invalid();
                if (key === "zIndex" && (!Number.isInteger(number) || number < 0 || number > 9)) invalid();
            }
        }
    };
    for (const record of value) {
        if (!object(record)) return invalid();
        if (Object.keys(record).some((key) => ![...poseKeys, ...modes, "id", "assetId", "exclusionPadding"].includes(key))) invalid();
        if (typeof record.id !== "string" || !/^[a-zA-Z0-9_-]{1,120}$/.test(record.id) || ids.has(record.id)) invalid();
        ids.add(record.id as string);
        if (typeof record.assetId !== "string" || !assetIds.includes(record.assetId)) invalid();
        if (record.exclusionPadding !== undefined && (typeof record.exclusionPadding !== "number" || !Number.isFinite(record.exclusionPadding) || record.exclusionPadding < 0)) invalid();
        pose(record, false);
        for (const mode of modes) {
            if (record[mode] === undefined) continue;
            const override = record[mode];
            if (!object(override) || Object.keys(override).some((key) => !poseKeys.includes(key))) return invalid();
            pose(override, true);
        }
    }
    return value as AuthoredPlacement[];
}

function placementArray(source: string) {
    const file = ts.createSourceFile("home-clutter.ts", source, ts.ScriptTarget.Latest, true);
    const arrays: ts.ArrayLiteralExpression[] = [];
    for (const statement of file.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "HOME_AUTHORED_PLACEMENTS" || !declaration.initializer) continue;
            let node = declaration.initializer;
            while (ts.isSatisfiesExpression(node) || ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) node = node.expression;
            if (ts.isArrayLiteralExpression(node)) arrays.push(node);
        }
    }
    if (arrays.length !== 1) throw new ClutterSaveError("Cannot locate the placement array. Use Copy export and check content/home-clutter.ts.");
    return { start: arrays[0].getStart(file), end: arrays[0].getEnd() };
}

const revisionOf = (source: string) => createHash("sha256").update(source).digest("hex");

export async function readPlacementFile(path: string) {
    const source = await readFile(path, "utf8");
    const { start, end } = placementArray(source);
    // Editor-authored records are JSON literals. Never evaluate source code on the server.
    try {
        return { revision: revisionOf(source), placements: JSON.parse(source.slice(start, end)) as AuthoredPlacement[] };
    } catch {
        throw new ClutterSaveError("Placements must be JSON literals to use automatic saving. Use Copy export to restore the array.");
    }
}

let pendingSave: Promise<unknown> = Promise.resolve();

export function savePlacementFile(path: string, revision: string, placements: AuthoredPlacement[]): Promise<string> {
    const save = pendingSave.catch(() => {}).then(async () => {
        const source = await readFile(path, "utf8");
        if (revisionOf(source) !== revision) throw new ClutterSaveError("The placement file changed outside this editor. Copy your export, then reload before saving.", 409);
        const { start, end } = placementArray(source);
        const newline = source.includes("\r\n") ? "\r\n" : "\n";
        const next = source.slice(0, start) + JSON.stringify(placements, null, 4).replaceAll("\n", newline) + source.slice(end);
        if (next === source) return revision;
        const temporary = `${path}.${randomUUID()}.tmp`;
        try {
            await writeFile(temporary, next, { encoding: "utf8", flag: "wx" });
            if (revisionOf(await readFile(path, "utf8")) !== revision) throw new ClutterSaveError("The placement file changed while saving. Nothing was overwritten.", 409);
            await rename(temporary, path);
        } finally {
            await unlink(temporary).catch((error: NodeJS.ErrnoException) => { if (error.code !== "ENOENT") throw error; });
        }
        return revisionOf(next);
    });
    pendingSave = save;
    return save;
}
