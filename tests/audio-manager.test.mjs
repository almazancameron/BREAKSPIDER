import assert from "node:assert/strict";
import test from "node:test";

import { playSound, SOUND_REGISTRY } from "../lib/audio/sound-manager.ts";

test("audio registry has a named interface sound", () => {
  assert.ok(SOUND_REGISTRY.interface);
});

test("sound playback safely declines when muted or browser audio is unavailable", () => {
  assert.equal(playSound("interface", true), false);
  assert.equal(playSound("interface", false), false);
});
