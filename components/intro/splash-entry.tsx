"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import styles from "./splash-entry.module.css"

type Phase = "playing" | "ready" | "opening" | "dismissed"
type SplashEntryProps = {
    onCommitSeen: () => void
    onDismiss: () => void
}

const logo = "/media/branding/breakspider-logo.svg"

export const SplashEntry = ({ onCommitSeen, onDismiss }: SplashEntryProps) => {
    const [phase, setPhase] = useState<Phase>("playing")
    const [reducedMotion, setReducedMotion] = useState<boolean | null>(null)
    const [moving, setMoving] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const phaseRef = useRef<Phase>("playing")
    const committed = useRef(false)

    const changePhase = useCallback((next: Phase) => {
        phaseRef.current = next
        setPhase(next)
    }, [])

    const commitSeen = useCallback(() => {
        if (committed.current) return
        committed.current = true
        onCommitSeen()
    }, [onCommitSeen])

    const finish = useCallback(() => {
        if (phaseRef.current === "dismissed") return
        changePhase("dismissed")
        onDismiss()
    }, [changePhase, onDismiss])

    const skip = () => {
        commitSeen()
        finish()
    }

    useLayoutEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        if (!dialog.open) dialog.showModal()

        return () => {
            if (dialog.open) dialog.close()
            document.body.style.overflow = previousOverflow
        }
    }, [])

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
        const updateMotion = () => {
            setReducedMotion(preference.matches)
            if (!preference.matches) return
            if (phaseRef.current === "opening") finish()
            else if (phaseRef.current === "playing") changePhase("ready")
        }
        updateMotion()
        preference.addEventListener("change", updateMotion)
        return () => preference.removeEventListener("change", updateMotion)
    }, [changePhase, finish])

    useEffect(() => {
        const makeReady = () => {
            if (phaseRef.current === "playing") changePhase("ready")
        }
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return
            if (event.data && typeof event.data === "object" && event.data.type === "breakspider:intro-finished") makeReady()
        }
        window.addEventListener("message", onMessage)
        const fallback = window.setTimeout(makeReady, 4800)
        return () => {
            window.removeEventListener("message", onMessage)
            window.clearTimeout(fallback)
        }
    }, [changePhase])

    const syncArtwork = useCallback(() => {
        const box = logoRef.current?.getBoundingClientRect()
        const dialog = dialogRef.current
        if (!box || !dialog) return
        dialog.style.setProperty("--logo-left", `${box.left}px`)
        dialog.style.setProperty("--logo-right-left", `${box.left - window.innerWidth / 2}px`)
        dialog.style.setProperty("--logo-top", `${box.top}px`)
        dialog.style.setProperty("--logo-width", `${box.width}px`)
        dialog.style.setProperty("--logo-height", `${box.height}px`)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", syncArtwork)
        return () => window.removeEventListener("resize", syncArtwork)
    }, [syncArtwork])

    useEffect(() => {
        if (phase !== "opening") return
        let secondFrame = 0
        let fallback = 0
        const firstFrame = requestAnimationFrame(() => {
            secondFrame = requestAnimationFrame(() => {
                syncArtwork()
                setMoving(true)
                fallback = window.setTimeout(finish, 1250)
            })
        })
        return () => {
            cancelAnimationFrame(firstFrame)
            cancelAnimationFrame(secondFrame)
            window.clearTimeout(fallback)
        }
    }, [phase, finish, syncArtwork])

    const enter = () => {
        if (phaseRef.current !== "ready") return
        commitSeen()
        if (reducedMotion) finish()
        else {
            syncArtwork()
            changePhase("opening")
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className={`${styles.splash} ${phase === "opening" ? styles.opening : ""} ${moving ? styles.moving : ""}`}
            aria-label="Breakspider intro"
            onCancel={(event) => { event.preventDefault(); skip() }}
            onClick={enter}
        >
            <div className={styles.logo} ref={logoRef} aria-hidden="true">
                {reducedMotion === false && phase === "playing" ? (
                    <iframe ref={iframeRef} title="Breakspider logo animation" src="/intro/logo-animation/index.html?embed=1" tabIndex={-1} aria-hidden="true" />
                ) : phase !== "playing" || reducedMotion === true ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt="" />
                ) : null}
            </div>
            <div className={`${styles.entry} ${phase === "ready" ? styles.ready : ""}`} aria-hidden={phase !== "ready"}>
                <button className={styles.enter} type="button" disabled={phase !== "ready"} onClick={enter}>Enter</button>
                <small>Or click anywhere</small>
            </div>
            <div className={styles.panels} aria-hidden="true">
                <div className={`${styles.panel} ${styles.left}`} onTransitionEnd={(event) => {
                    if (event.target === event.currentTarget && event.propertyName === "transform" && phaseRef.current === "opening") finish()
                }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="" />
                </div>
                <div className={`${styles.panel} ${styles.right}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="" />
                </div>
            </div>
            <button className={styles.skip} type="button" autoFocus onClick={(event) => { event.stopPropagation(); skip() }}>Skip intro</button>
        </dialog>
    )
}
