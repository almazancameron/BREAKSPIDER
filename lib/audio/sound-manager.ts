type ToneDefinition = {
  startFrequency: number;
  endFrequency: number;
  durationSeconds: number;
  peakVolume: number;
};

export const SOUND_REGISTRY = {
  interface: {
    startFrequency: 620,
    endFrequency: 890,
    durationSeconds: 0.14,
    peakVolume: 0.045,
  },
} satisfies Record<string, ToneDefinition>;

export type SoundName = keyof typeof SOUND_REGISTRY;

let sharedContext: AudioContext | null = null;

export function playSound(name: SoundName, muted: boolean): boolean {
  if (muted || typeof window === "undefined" || !window.AudioContext) {
    return false;
  }

  try {
    const definition = SOUND_REGISTRY[name];
    sharedContext ??= new window.AudioContext();
    const context = sharedContext;
    void context.resume().catch(() => undefined);

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const endTime = context.currentTime + definition.durationSeconds;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(definition.startFrequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      definition.endFrequency,
      context.currentTime + definition.durationSeconds * 0.6,
    );
    gain.gain.setValueAtTime(definition.peakVolume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, endTime);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(endTime);
    return true;
  } catch {
    return false;
  }
}
