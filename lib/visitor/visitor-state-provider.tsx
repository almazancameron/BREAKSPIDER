"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import {
    createDefaultVisitorState,
    loadVisitorState,
    recordPageVisit as addPageVisit,
    saveVisitorState,
    type VisitorState,
} from "./visitor-state.ts";

type VisitorStateContextValue = {
    state: VisitorState;
    ready: boolean;
    updateVisitorState: (update: (current: VisitorState) => VisitorState) => void;
    recordPageVisit: (path: string) => void;
};

const VisitorStateContext = createContext<VisitorStateContextValue | null>(null);

export function VisitorStateProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState(createDefaultVisitorState);
    const [ready, setReady] = useState(false);
    const stateRef = useRef(state);
    const readyRef = useRef(false);

    useEffect(() => {
        const savedState = loadVisitorState();
        stateRef.current = savedState;
        readyRef.current = true;
        // Local storage is client-only, so restore it after hydration to keep the server markup deterministic.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(savedState);
        setReady(true);
    }, []);

    const updateVisitorState = useCallback(
        (update: (current: VisitorState) => VisitorState) => {
            if (!readyRef.current) return;

            const nextState = update(stateRef.current);
            stateRef.current = nextState;
            setState(nextState);
            saveVisitorState(nextState);
        },
        [],
    );

    const recordPageVisit = useCallback(
        (path: string) => updateVisitorState((current) => addPageVisit(current, path)),
        [updateVisitorState],
    );

    return (
        <VisitorStateContext.Provider
            value={{ state, ready, updateVisitorState, recordPageVisit }}
        >
            {children}
        </VisitorStateContext.Provider>
    );
}

export function useVisitorState(): VisitorStateContextValue {
    const context = useContext(VisitorStateContext);

    if (!context) {
        throw new Error("useVisitorState must be used inside VisitorStateProvider.");
    }

    return context;
}
