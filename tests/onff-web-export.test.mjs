import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const exportDirectory = join(process.cwd(), "public", "games", "onff");

describe("ONFF Web export", () => {
    it("includes the loader and every runtime asset it references", () => {
        const htmlPath = join(exportDirectory, "onff.html");
        expect(existsSync(htmlPath)).toBe(true);

        const html = readFileSync(htmlPath, "utf8");
        for (const file of [
            "onff.js",
            "onff.pck",
            "onff.wasm",
            "onff.png",
            "onff.icon.png",
            "onff.apple-touch-icon.png",
        ]) {
            expect(existsSync(join(exportDirectory, file)), file).toBe(true);
        }
        expect(html).toContain('"executable":"onff"');
        expect(html).toContain("const GODOT_THREADS_ENABLED = false");
    });
});
