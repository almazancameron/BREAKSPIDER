type ToneDefinition = {
    startFrequency: number;
    endFrequency: number;
    durationSeconds: number;
    peakVolume: number;
    kind: "tone"
};

type ClipDefinition = {
    kind: "clip",
    src: string,
    volume: number
}

type SoundDefinition = ToneDefinition | ClipDefinition;

export const SOUND_REGISTRY = {
    interface: {
        kind: "tone",
        startFrequency: 620,
        endFrequency: 890,
        durationSeconds: 0.14,
        peakVolume: 0.045,
    },
    uiClick: {
        kind: "clip",
        src: "/audio/ui-click.mp3",
        volume: 0.12
    }
} satisfies Record<string, SoundDefinition>;

export type SoundName = keyof typeof SOUND_REGISTRY;

let sharedContext: AudioContext | null = null;
let activeSource: AudioScheduledSourceNode | null = null;
let activeGain: GainNode | null = null;
let playbackRevision = 0;
const bufferLoads = new Map<SoundName, Promise<AudioBuffer>>();

export const playSound = async (
    name: SoundName,
    muted: boolean,
): Promise<boolean> => {
    if (muted || typeof window === "undefined" || !window.AudioContext) {
        return false;
    }

    stopAllSounds();
    const requestRevision = playbackRevision;

    try {
        const definition = SOUND_REGISTRY[name];
        if (!sharedContext || sharedContext.state === "closed") {
            sharedContext = new window.AudioContext();
        }
        const context = sharedContext;
        const resume = context.resume();
        const loading = definition.kind === "clip"
            ? getSoundBuffer(name, definition.src, context)
            : Promise.resolve(null);
        const [, buffer] = await Promise.all([resume, loading]);

        if (requestRevision !== playbackRevision || context.state !== "running") {
            return false;
        }

        let source: AudioScheduledSourceNode;
        const gain = context.createGain();
        const startTime = context.currentTime;

        if (definition.kind === "tone") {
            const oscillator = context.createOscillator();
            const endTime = startTime + definition.durationSeconds;
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(definition.startFrequency, startTime);
            oscillator.frequency.exponentialRampToValueAtTime(
                definition.endFrequency,
                startTime + definition.durationSeconds * 0.6,
            );
            gain.gain.setValueAtTime(definition.peakVolume, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, endTime);
            source = oscillator;
        } else {
            if (!buffer) return false;
            const clip = context.createBufferSource();
            clip.buffer = buffer;
            clip.loop = false;
            gain.gain.setValueAtTime(definition.volume, startTime);
            source = clip;
        }

        source.connect(gain).connect(context.destination);
        activeSource = source;
        activeGain = gain;
        source.onended = () => {
            source.disconnect();
            gain.disconnect();
            if (activeSource === source) {
                activeSource = null;
                activeGain = null;
            }
        };
        source.start(startTime);
        if (definition.kind === "tone") {
            source.stop(startTime + definition.durationSeconds);
        }
        return true;
    } catch {
        if (requestRevision === playbackRevision) stopAllSounds();
        return false;
    }
}

export const stopAllSounds = (): void => {
    playbackRevision += 1;
    if (activeSource) {
        try {
            activeSource.stop();
        } catch {
            // The source may already have finished.
        }
        activeSource.disconnect();
    }
    activeGain?.disconnect();
    activeSource = null;
    activeGain = null;

}

const getSoundBuffer = (
    name: SoundName,
    src: string,
    context: AudioContext,
): Promise<AudioBuffer> => {
    const cached = bufferLoads.get(name);
    if (cached) return cached;

    const loading = (async () => {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Could not load sound: ${name}`);
        return context.decodeAudioData(await response.arrayBuffer());
    })();
    bufferLoads.set(name, loading);
    void loading.catch(() => {
        if (bufferLoads.get(name) === loading) bufferLoads.delete(name);
    });
    return loading;
}
