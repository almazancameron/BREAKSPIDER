"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { markIntroSeen, readIntroSeen, shouldShowInitialIntro } from "../../lib/intro/intro-state"
import { SplashEntry } from "./splash-entry"
import styles from "./splash-entry.module.css"

type IntroContextValue = {
    ready: boolean
    replayIntro: () => void
}

const IntroContext = createContext<IntroContextValue | null>(null)

export const IntroProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const [ready, setReady] = useState(false)
    const [show, setShow] = useState(false)
    const initialized = useRef(false)
    const active = useRef(false)
    const replayTarget = useRef<HTMLElement | null>(null)
    const focusFrame = useRef<number | null>(null)

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            const eligible = shouldShowInitialIntro(window.location.pathname, readIntroSeen())
            active.current = eligible
            // Restore browser-only state after hydration, like the visitor provider.
            setReady(true)
            setShow(eligible)
        }

        if (pathname !== "/") {
            active.current = false
            replayTarget.current = null
            // Clear an interrupted run when the route leaves Home.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShow(false)
        }

        return () => {
            if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
        }
    }, [pathname])

    const commitSeen = useCallback(() => {
        markIntroSeen()
    }, [])

    const dismiss = useCallback(() => {
        active.current = false
        setShow(false)
        const target = replayTarget.current ?? document.getElementById("main-content")
        focusFrame.current = requestAnimationFrame(() => {
            if (window.location.pathname === "/" && target?.isConnected) {
                target.focus({ preventScroll: true })
            }
        })
    }, [])

    const replayIntro = useCallback(() => {
        if (!initialized.current || active.current || window.location.pathname !== "/") return
        if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
        replayTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        active.current = true
        setShow(true)
    }, [])

    return (
        <IntroContext.Provider value={{ ready, replayIntro }}>
            {!ready && pathname === "/" && (
                <>
                    <div id="intro-loading-cover" className={styles.loadingCover} aria-hidden="true" />
                    <noscript><style>{"#intro-loading-cover { display: none; }"}</style></noscript>
                </>
            )}
            {children}
            {show && pathname === "/" && <SplashEntry onCommitSeen={commitSeen} onDismiss={dismiss} />}
        </IntroContext.Provider>
    )
}

export const useIntro = () => {
    const context = useContext(IntroContext)
    if (!context) throw new Error("useIntro must be used inside IntroProvider")
    return context
}
