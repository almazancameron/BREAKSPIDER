import { expect, test } from "vitest";

import {
    createDefaultVisitorState,
    deserializeVisitorState,
    getVisitorDisplayLabel,
    loadVisitorState,
    recordPageVisit,
    saveVisitorState,
    serializeVisitorState,
    VISITOR_STATE_STORAGE_KEY,
} from "../lib/visitor/visitor-state.ts";

function createStorage(initialValue = null) {
    let value = initialValue;
    let lastKey = null;

    return {
        getItem(key) {
            lastKey = key;
            return value;
        },
        setItem(key, nextValue) {
            lastKey = key;
            value = nextValue;
        },
        read() {
            return value;
        },
        lastKey() {
            return lastKey;
        },
    };
}

test("visitor state defaults to a muted, empty local profile", () => {
    const state = createDefaultVisitorState("visitor-test");

    expect(state.visitorId).toBe("visitor-test");
    expect(state.soundMuted).toBe(true);
    expect(state.unlockedCollectibleIds).toEqual([]);
    expect(state.visitedPages).toEqual([]);
});

test("visitor labels are derived from the persisted visitor id", () => {
    expect(getVisitorDisplayLabel("visitor-000")).toBe("Visitor 000");
    expect(getVisitorDisplayLabel("d41c4de2-1234-5678")).toBe("Visitor D41C4DE2");
});

test("route visits are unique in history and counted on repeat visits", () => {
    const firstVisit = recordPageVisit(createDefaultVisitorState("visitor-test"), "/about");
    const secondVisit = recordPageVisit(firstVisit, "/about");

    expect(secondVisit.visitedPages).toEqual(["/about"]);
    expect(secondVisit.pageVisitCounts["/about"]).toBe(2);
});

test("visitor state round-trips through the versioned storage envelope", () => {
    const state = createDefaultVisitorState("visitor-test");
    const serialized = serializeVisitorState(state);

    expect(JSON.parse(serialized).version).toBe(1);
    expect(deserializeVisitorState(serialized)).toEqual(state);
});

test("visitor state migrates version zero records and rejects malformed records", () => {
    const legacy = JSON.stringify({
        version: 0,
        state: {
            visitorId: "visitor-old",
            unlockedCollectibleIds: ["map"],
            equippedAvatarId: "default",
            equippedBadgeIds: [],
            cursorStyleId: null,
            cursorFollowerId: null,
            visitedPages: ["/"],
            pageVisitCounts: { "/": 1 },
            unlockFlags: { map: true },
        },
    });

    expect(deserializeVisitorState(legacy)?.visitorId).toBe("visitor-old");
    expect(deserializeVisitorState("not json")).toBeNull();
    expect(deserializeVisitorState(JSON.stringify({ version: 99, state: {} }))).toBeNull();
    expect(deserializeVisitorState(JSON.stringify({ version: 1, state: {} }))).toBeNull();
});

test("visitor state loads defaults and tolerates unavailable storage", () => {
    const unavailable = {
        getItem() {
            throw new Error("storage blocked");
        },
        setItem() {
            throw new Error("storage blocked");
        },
    };

    expect(loadVisitorState(unavailable).soundMuted).toBe(true);
    expect(saveVisitorState(createDefaultVisitorState("visitor-test"), unavailable)).toBe(false);
});

test("visitor state loads valid data and saves under the production key", () => {
    const storage = createStorage();
    const state = createDefaultVisitorState("visitor-test");
    state.visitedPages.push("/");

    expect(saveVisitorState(state, storage)).toBe(true);
    expect(storage.lastKey()).toBe(VISITOR_STATE_STORAGE_KEY);
    expect(loadVisitorState(storage).visitedPages[0]).toBe("/");
});
