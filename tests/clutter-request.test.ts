import { expect, test } from "vitest";
import { isSameOriginJson } from "../lib/clutter/request";

test("same-origin loopback requests remain valid when Next normalizes the internal URL host", () => {
    const request = new Request("http://localhost:3013/api/dev/clutter", {
        headers: { host: "127.0.0.1:3013", origin: "http://127.0.0.1:3013", "content-type": "application/json" },
    });
    expect(isSameOriginJson(request)).toBe(true);
});

test("cross-origin, missing-origin, wrong-port, and non-JSON requests stay rejected", () => {
    const cases: Record<string, string>[] = [
        { host: "localhost:3013", origin: "https://outside.example", "content-type": "application/json" },
        { host: "localhost:3013", origin: "http://localhost:3014", "content-type": "application/json" },
        { host: "localhost:3013", "content-type": "application/json" },
        { host: "localhost:3013", origin: "http://localhost:3013", "content-type": "text/plain" },
    ];
    for (const headers of cases) {
        expect(isSameOriginJson(new Request("http://localhost:3013/api/dev/clutter", { headers }))).toBe(false);
    }
    expect(isSameOriginJson(new Request("http://localhost:3013/api/dev/clutter", {
        headers: { origin: "http://localhost:3013", "content-type": "application/json; charset=utf-8" },
    }))).toBe(true);
});
