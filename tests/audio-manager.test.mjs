import { expect, test } from "vitest";

import { playSound, SOUND_REGISTRY } from "../lib/audio/sound-manager.ts";

test("audio registry has a named interface sound", () => {
    expect(SOUND_REGISTRY.interface).toBeDefined();
});

test("sound playback safely declines when muted or browser audio is unavailable", () => {
    expect(playSound("interface", true)).toBe(false);
    expect(playSound("interface", false)).toBe(false);
});
