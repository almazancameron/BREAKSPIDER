"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { getVisitorDisplayLabel } from "../../lib/visitor/visitor-state.ts";
import { useVisitorState } from "../../lib/visitor/visitor-state-provider";
import { VisitorAvatar } from "./visitor-avatar";
import styles from "./visitor-profile.module.css";

const PROFILE_TITLE_ID = "visitor-profile-title";

export function VisitorProfile() {
  const [open, setOpen] = useState(false);
  const { state } = useVisitorState();

  return (
    <>
      <button
        className={styles.trigger}
        type="button"
        aria-label="Open visitor profile"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <VisitorAvatar />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={PROFILE_TITLE_ID}
        className={styles.dialog}
      >
        <div className={styles.bar}>
          <span>LOCAL PROFILE</span>
          <button type="button" autoFocus aria-label="Close visitor profile" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className={styles.identity}>
          <VisitorAvatar size={72} />
          <div>
            <p className={styles.eyebrow}>BROWSER SAVE SLOT</p>
            <h2 id={PROFILE_TITLE_ID}>{getVisitorDisplayLabel(state.visitorId)}</h2>
            <p>Equipped avatar: {state.equippedAvatarId}</p>
          </div>
        </div>
        <dl className={styles.stats}>
          <div>
            <dt>Found</dt>
            <dd>{state.unlockedCollectibleIds.length}</dd>
          </div>
          <div>
            <dt>Places visited</dt>
            <dd>{state.visitedPages.length}</dd>
          </div>
        </dl>
        <Link className={styles.collection} href="/collection" onClick={() => setOpen(false)}>
          Open Collection <span aria-hidden="true">↗</span>
        </Link>
      </Dialog>
    </>
  );
}
