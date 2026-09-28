import assert from "node:assert/strict";
import test from "node:test";

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

  assert.equal(state.visitorId, "visitor-test");
  assert.equal(state.soundMuted, true);
  assert.deepEqual(state.unlockedCollectibleIds, []);
  assert.deepEqual(state.visitedPages, []);
});

test("visitor labels are derived from the persisted visitor id", () => {
  assert.equal(getVisitorDisplayLabel("visitor-000"), "Visitor 000");
  assert.equal(getVisitorDisplayLabel("d41c4de2-1234-5678"), "Visitor D41C4DE2");
});

test("route visits are unique in history and counted on repeat visits", () => {
  const firstVisit = recordPageVisit(createDefaultVisitorState("visitor-test"), "/about");
  const secondVisit = recordPageVisit(firstVisit, "/about");

  assert.deepEqual(secondVisit.visitedPages, ["/about"]);
  assert.equal(secondVisit.pageVisitCounts["/about"], 2);
});

test("visitor state round-trips through the versioned storage envelope", () => {
  const state = createDefaultVisitorState("visitor-test");
  const serialized = serializeVisitorState(state);

  assert.equal(JSON.parse(serialized).version, 1);
  assert.deepEqual(deserializeVisitorState(serialized), state);
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

  assert.equal(deserializeVisitorState(legacy)?.visitorId, "visitor-old");
  assert.equal(deserializeVisitorState("not json"), null);
  assert.equal(deserializeVisitorState(JSON.stringify({ version: 99, state: {} })), null);
  assert.equal(deserializeVisitorState(JSON.stringify({ version: 1, state: {} })), null);
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

  assert.equal(loadVisitorState(unavailable).soundMuted, true);
  assert.equal(saveVisitorState(createDefaultVisitorState("visitor-test"), unavailable), false);
});

test("visitor state loads valid data and saves under the production key", () => {
  const storage = createStorage();
  const state = createDefaultVisitorState("visitor-test");
  state.visitedPages.push("/");

  assert.equal(saveVisitorState(state, storage), true);
  assert.equal(storage.lastKey(), VISITOR_STATE_STORAGE_KEY);
  assert.equal(loadVisitorState(storage).visitedPages[0], "/");
});
