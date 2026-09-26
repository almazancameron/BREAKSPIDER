"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

type Phase = "playing" | "ready" | "opening" | "entered";

export default function SplashEntry({ onEntered }: { onEntered: () => void }) {
  const [phase, setPhase] = useState<Phase>("playing");
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("playing");

  const changePhase = (next: Phase) => { phaseRef.current = next; setPhase(next); };

  useEffect(() => {
    const ready = () => { if (phaseRef.current === "playing") changePhase("ready"); };
    const onMessage = (event: MessageEvent) => {
      if (event.source === frameRef.current?.contentWindow && event.data?.type === "breakspider:intro-finished") ready();
    };
    window.addEventListener("message", onMessage);
    const fallback = window.setTimeout(ready, 4800);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ready();
    return () => { window.removeEventListener("message", onMessage); window.clearTimeout(fallback); };
  }, []);

  const syncArtwork = () => {
    const box = shellRef.current?.getBoundingClientRect();
    const splash = splashRef.current;
    if (!box || !splash) return;
    splash.style.setProperty("--logo-left", `${box.left}px`);
    splash.style.setProperty("--logo-left-right", `${box.left - window.innerWidth / 2}px`);
    splash.style.setProperty("--logo-top", `${box.top}px`);
    splash.style.setProperty("--logo-width", `${box.width}px`);
    splash.style.setProperty("--logo-height", `${box.height}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", syncArtwork);
    syncArtwork();
    return () => window.removeEventListener("resize", syncArtwork);
  }, []);

  const finish = () => {
    if (phaseRef.current !== "opening") return;
    changePhase("entered");
    document.body.classList.remove("intro-visible");
    onEntered();
  };

  const enter = () => {
    if (phaseRef.current !== "ready") return;
    syncArtwork();
    changePhase("opening");
    window.setTimeout(finish, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 60 : 1250);
  };

  useEffect(() => {
    document.body.classList.add("intro-visible");
    return () => document.body.classList.remove("intro-visible");
  }, []);

  if (phase === "entered") return null;

  return (
    <div className={`splash ${phase === "ready" ? "is-ready" : ""} ${phase === "opening" ? "is-split-ready is-opening" : ""}`} ref={splashRef} onClick={enter} aria-label="Breakspider animated splash screen">
      <div className="logo-shell" ref={shellRef}>
        <iframe ref={frameRef} title="Breakspider logo animation" src="/intro/logo-animation/index.html?embed=1" tabIndex={-1} aria-hidden="true" />
      </div>
      <div className="entry">
        <button className="enter-button" type="button" disabled={phase !== "ready"} onClick={(event) => { event.stopPropagation(); enter(); }}>Enter</button>
        <small>Or click anywhere</small>
      </div>
      <div className="splash-panels" aria-hidden="true" style={{ "--split-duration": "1050ms" } as CSSProperties}>
        <div className="splash-panel left" onTransitionEnd={(event) => { if (event.propertyName === "transform") finish(); }}><img src="/media/breakspider-logo.svg" alt="" /></div>
        <div className="splash-panel right"><img src="/media/breakspider-logo.svg" alt="" /></div>
      </div>
    </div>
  );
}
