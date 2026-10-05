export const VISITOR_STATE_VERSION = 1;
export const VISITOR_STATE_STORAGE_KEY = "breakspider:visitor:v1";

export type VisitorState = {
    visitorId: string;
    soundMuted: boolean;
    unlockedCollectibleIds: string[];
    equippedAvatarId: string;
    equippedBadgeIds: string[];
    cursorStyleId: string | null;
    cursorFollowerId: string | null;
    cursorTrailId: string | null;
    visitedPages: string[];
    pageVisitCounts: Record<string, number>;
    unlockFlags: Record<string, boolean>;
};

export type VisitorStorage = Pick<Storage, "getItem" | "setItem">;

type UnknownRecord = Record<string, unknown>;

const DEFAULT_VISITOR_ID = "visitor-000";

export function createDefaultVisitorState(
    visitorId = DEFAULT_VISITOR_ID,
): VisitorState {
    return {
        visitorId,
        soundMuted: true,
        unlockedCollectibleIds: [],
        equippedAvatarId: "default",
        equippedBadgeIds: [],
        cursorStyleId: null,
        cursorFollowerId: null,
        cursorTrailId: null,
        visitedPages: [],
        pageVisitCounts: {},
        unlockFlags: {},
    };
}

export function getVisitorDisplayLabel(visitorId: string): string {
    const prefix = "visitor-";
    const displayId = visitorId.startsWith(prefix)
        ? visitorId.slice(prefix.length)
        : visitorId.slice(0, 8);

    return `Visitor ${displayId.toUpperCase()}`;
}

export function serializeVisitorState(state: VisitorState): string {
    return JSON.stringify({ version: VISITOR_STATE_VERSION, state });
}

export function deserializeVisitorState(serialized: string): VisitorState | null {
    let envelope: unknown;

    try {
        envelope = JSON.parse(serialized);
    } catch {
        return null;
    }

    if (!isRecord(envelope) || typeof envelope.version !== "number") {
        return null;
    }

    if (envelope.version === 1) {
        return validateVisitorState(envelope.state);
    }

    if (envelope.version === 0) {
        return migrateVersionZero(envelope.state);
    }

    return null;
}

export function loadVisitorState(
    storage: VisitorStorage | null = getBrowserStorage(),
): VisitorState {
    const fallback = createDefaultVisitorState(createVisitorId());

    if (!storage) return fallback;

    try {
        const serialized = storage.getItem(VISITOR_STATE_STORAGE_KEY);
        if (!serialized) return fallback;

        return deserializeVisitorState(serialized) ?? fallback;
    } catch {
        return fallback;
    }
}

export function saveVisitorState(
    state: VisitorState,
    storage: VisitorStorage | null = getBrowserStorage(),
): boolean {
    if (!storage) return false;

    try {
        storage.setItem(VISITOR_STATE_STORAGE_KEY, serializeVisitorState(state));
        return true;
    } catch {
        return false;
    }
}

export function recordPageVisit(state: VisitorState, path: string): VisitorState {
    const previousCount = state.pageVisitCounts[path] ?? 0;

    return {
        ...state,
        visitedPages: state.visitedPages.includes(path)
            ? state.visitedPages
            : [...state.visitedPages, path],
        pageVisitCounts: {
            ...state.pageVisitCounts,
            [path]: previousCount + 1,
        },
    };
}

function migrateVersionZero(value: unknown): VisitorState | null {
    if (!isRecord(value)) return null;

    return validateVisitorState({
        ...createDefaultVisitorState(),
        ...value,
        soundMuted: typeof value.soundMuted === "boolean" ? value.soundMuted : true,
        cursorTrailId:
            typeof value.cursorTrailId === "string" || value.cursorTrailId === null
                ? value.cursorTrailId
                : null,
    });
}

function validateVisitorState(value: unknown): VisitorState | null {
    if (!isRecord(value)) return null;

    const visitorId = value.visitorId;
    const soundMuted = value.soundMuted;
    const unlockedCollectibleIds = value.unlockedCollectibleIds;
    const equippedAvatarId = value.equippedAvatarId;
    const equippedBadgeIds = value.equippedBadgeIds;
    const cursorStyleId = value.cursorStyleId;
    const cursorFollowerId = value.cursorFollowerId;
    const cursorTrailId = value.cursorTrailId;
    const visitedPages = value.visitedPages;
    const pageVisitCounts = value.pageVisitCounts;
    const unlockFlags = value.unlockFlags;

    if (
        !isNonEmptyString(visitorId) ||
        typeof soundMuted !== "boolean" ||
        !isStringArray(unlockedCollectibleIds) ||
        !isNonEmptyString(equippedAvatarId) ||
        !isStringArray(equippedBadgeIds) ||
        !isNullableString(cursorStyleId) ||
        !isNullableString(cursorFollowerId) ||
        !isNullableString(cursorTrailId) ||
        !isStringArray(visitedPages) ||
        !isCountRecord(pageVisitCounts) ||
        !isBooleanRecord(unlockFlags)
    ) {
        return null;
    }

    return {
        visitorId,
        soundMuted,
        unlockedCollectibleIds,
        equippedAvatarId,
        equippedBadgeIds,
        cursorStyleId,
        cursorFollowerId,
        cursorTrailId,
        visitedPages,
        pageVisitCounts,
        unlockFlags,
    };
}

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.length > 0;
}

function isNullableString(value: unknown): value is string | null {
    return value === null || typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCountRecord(value: unknown): value is Record<string, number> {
    return (
        isRecord(value) &&
        Object.values(value).every(
            (count) => typeof count === "number" && Number.isInteger(count) && count >= 0,
        )
    );
}

function isBooleanRecord(value: unknown): value is Record<string, boolean> {
    return isRecord(value) && Object.values(value).every((flag) => typeof flag === "boolean");
}

function getBrowserStorage(): VisitorStorage | null {
    try {
        return typeof window === "undefined" ? null : window.localStorage;
    } catch {
        return null;
    }
}

function createVisitorId(): string {
    try {
        if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
            return crypto.randomUUID();
        }
    } catch {
        // Use the local fallback if the browser blocks cryptographic APIs.
    }

    return `visitor-${Math.random().toString(36).slice(2, 10)}`;
}
