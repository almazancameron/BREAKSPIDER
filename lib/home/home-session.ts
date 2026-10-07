let sessionSeed: number | null = null;

export const getHomeSessionSeed = (): number => {
    if (typeof window === "undefined") {
        throw new Error("Read the homepage seed after browser hydration.");
    }
    if (sessionSeed === null) {
        sessionSeed = window.crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return sessionSeed;
};

export const createSeededRandom = (seed: number): (() => number) => {
    let value = seed >>> 0;
    return () => {
        value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
        return value / 4294967296;
    };
};
