import { expect, test, vi } from "vitest";

import { playSound, SOUND_REGISTRY, stopAllSounds } from "../lib/audio/sound-manager.ts";

test("audio registry has named confirmation and click sounds", () => {
    expect(SOUND_REGISTRY.interface.kind).toBe("tone");
    expect(SOUND_REGISTRY.uiClick.src).toBe("/audio/ui-click.mp3");
});

test("sound playback safely declines when muted or browser audio is unavailable", async () => {
    expect(await playSound("interface", true)).toBe(false);
    expect(await playSound("uiClick", true)).toBe(false);
    expect(await playSound("interface", false)).toBe(false);
    expect(await playSound("uiClick", false)).toBe(false);
});

test("stopping sound is safe before playback and on repeated calls", () => {
    expect(() => {
        stopAllSounds();
        stopAllSounds();
    }).not.toThrow();
});

test("muting while audio resumes cancels the pending tone", async () => {
    let finishResume;
    let contextsCreated = 0;
    const createOscillator = vi.fn();

    class FakeAudioContext {
        state = "suspended";
        createOscillator = createOscillator;

        constructor() {
            contextsCreated += 1;
        }

        resume() {
            return new Promise((resolve) => {
                finishResume = () => {
                    this.state = "running";
                    resolve();
                };
            });
        }
    }

    vi.resetModules();
    vi.stubGlobal("window", { AudioContext: FakeAudioContext });

    try {
        const manager = await import("../lib/audio/sound-manager.ts");
        const pending = manager.playSound("interface", false);
        expect(contextsCreated).toBe(1);
        manager.stopAllSounds();
        finishResume();
        expect(await pending).toBe(false);
        expect(createOscillator).not.toHaveBeenCalled();
    } finally {
        vi.unstubAllGlobals();
        vi.resetModules();
    }
});
