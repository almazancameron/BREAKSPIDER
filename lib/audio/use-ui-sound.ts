"use client"

import { useVisitorState } from "../visitor/visitor-state-provider"
import { playSound, type SoundName } from "./sound-manager"

export const useUISound = () => {
    const { state, ready } = useVisitorState()

    return (name: SoundName) => {
        if (!ready || state.soundMuted) return
        void playSound(name, false)
    }
}
