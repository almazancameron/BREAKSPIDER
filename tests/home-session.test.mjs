import { afterEach, expect, test, vi } from "vitest";

afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
});

test("each consumer gets the same repeatable sequence for a saved seed", async () => {
    const { createSeededRandom } = await import("../lib/home/home-session.ts");
    const familiarRandom = createSeededRandom(12345);
    const clutterRandom = createSeededRandom(12345);
    const otherSession = createSeededRandom(54321);
    const familiarValues = Array.from({ length: 100 }, () => familiarRandom());

    expect(Array.from({ length: 100 }, () => clutterRandom())).toEqual(familiarValues);
    expect(Array.from({ length: 100 }, () => otherSession())).not.toEqual(familiarValues);
});

test("seeded values stay within the array-selection range, including boundary seeds", async () => {
    const { createSeededRandom } = await import("../lib/home/home-session.ts");
    for (const seed of [0, 1, 4294967295]) {
        const random = createSeededRandom(seed);
        for (let index = 0; index < 1000; index++) {
            const value = random();
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(1);
        }
    }
});

test("the browser document retains one seed without generating it at import", async () => {
    const getRandomValues = vi.fn((values) => {
        values[0] = 12345;
        return values;
    });
    vi.stubGlobal("window", { crypto: { getRandomValues } });
    const { getHomeSessionSeed } = await import("../lib/home/home-session.ts");

    expect(getRandomValues).not.toHaveBeenCalled();
    expect(getHomeSessionSeed()).toBe(12345);
    expect(getHomeSessionSeed()).toBe(12345);
    expect(getRandomValues).toHaveBeenCalledTimes(1);
});

test("server code cannot request a browser session seed", async () => {
    const { getHomeSessionSeed } = await import("../lib/home/home-session.ts");
    expect(() => getHomeSessionSeed()).toThrow("after browser hydration");
});
