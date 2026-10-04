import { expect, test } from "vitest";
import { INTRO_SEEN_STORAGE_KEY, readIntroSeen, markIntroSeen, shouldShowInitialIntro } from "../lib/intro/intro-state.ts";

test("automatic intro is limited to an unseen homepage entry", () => {
  expect(shouldShowInitialIntro("/", "unseen")).toBe(true);
  expect(shouldShowInitialIntro("/", "seen")).toBe(false);
  expect(shouldShowInitialIntro("/", "unavailable")).toBe(false);
  
  for (const path of [
    "/about",
    "/projects/one-night-familiar-fight",
    "/play/onff",
  ]) {
    for (const status of ["seen", "unseen", "unavailable"]) {
      expect(shouldShowInitialIntro(path, status)).toBe(false);
    }
  }
});

test("intro completion round-trips using only the intro key", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };

  expect(readIntroSeen(storage)).toBe("unseen");
  expect(markIntroSeen(storage)).toBe(true);
  expect([...values.entries()]).toEqual([[INTRO_SEEN_STORAGE_KEY, "true"]]);
  expect(readIntroSeen(storage)).toBe("seen");
});

test("malformed values for INTRO_SEEN_STORAGE_KEY return unseen", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };

  values.set(INTRO_SEEN_STORAGE_KEY, "invalid");
  expect(readIntroSeen(storage)).toBe("unseen");
  values.set(INTRO_SEEN_STORAGE_KEY, "false");
  expect(readIntroSeen(storage)).toBe("unseen");
  values.set(INTRO_SEEN_STORAGE_KEY, "");
  expect(readIntroSeen(storage)).toBe("unseen");
  values.set(INTRO_SEEN_STORAGE_KEY, "true");
  expect(readIntroSeen(storage)).toBe("seen");
});

test("malformed storage object returns unavailable", () => {
  let storage = null

  expect(readIntroSeen(storage)).toBe("unavailable");

  storage = {
    getItem: () => {throw new Error("storage blocked")},
    setItem: () => {throw new Error("storage blocked")},
  }

  expect(readIntroSeen(storage)).toBe("unavailable");
})

test("intro persistence uses the production key and safely declines unavailable writes", () => {
  expect(INTRO_SEEN_STORAGE_KEY).toBe("breakspider_intro_seen_v1");
  expect(markIntroSeen(null)).toBe(false);
  expect(markIntroSeen()).toBe(false);
  expect(readIntroSeen()).toBe("unavailable");
  expect(markIntroSeen({
    getItem: () => null,
    setItem: () => { throw new Error("storage blocked") },
  })).toBe(false);
})
