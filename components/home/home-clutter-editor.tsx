"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HOME_AUTHORED_PLACEMENTS } from "../../content/home-clutter";
import {
    ANCHOR_ORDER, ANCHOR_POINTS, VIEWPORT_QUERIES, anchorPointPosition, clonePlacements,
    exportPlacements, findNearestAnchor, findNearestAnchorPoint, patchPlacementPose,
    resetPlacementOverride, roundOffset, toAnchorOffset, validateNumber,
    type Point, type Rect,
} from "../../lib/home/clutter-authoring";
import { resolveClutterPose } from "../../lib/home/clutter-placement";
import type { AnchorPoint, AuthoredPlacement, ClutterAsset, ClutterViewport, HomeAnchorId, PlacementPose } from "../../lib/home/clutter-types";
import { ContentImage } from "../ui/content-image";
import { ClutterDraftContext } from "./home-clutter-state";
import clutterStyles from "./home-authored-clutter.module.css";
import styles from "./home-clutter-editor.module.css";

type Anchor = { id: HomeAnchorId; rect: Rect; positioningRect: Rect; element: HTMLElement };
type Handle = { id: string; rect: Rect };
type Preview = { record: AuthoredPlacement; pose: PlacementPose; center: Point; target: Anchor | null };

function currentViewport(): ClutterViewport {
    return VIEWPORT_QUERIES.find(([, query]) => window.matchMedia(query).matches)![0];
}

function measureAnchors(root: HTMLElement): Anchor[] {
    return ANCHOR_ORDER.flatMap((id) => {
        const element = root.querySelector<HTMLElement>(`[data-home-anchor="${id}"]`);
        if (!element || !element.checkVisibility()) return [];
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return [];
        const css = getComputedStyle(element);
        const left = parseFloat(css.borderLeftWidth);
        const top = parseFloat(css.borderTopWidth);
        // Absolute percentages resolve against the padding box, not the border box.
        const positioningRect = {
            left: rect.left + left, top: rect.top + top,
            width: rect.width - left - parseFloat(css.borderRightWidth),
            height: rect.height - top - parseFloat(css.borderBottomWidth),
        };
        return [{ id, rect, positioningRect, element }];
    });
}

function visibleVisual(root: HTMLElement, id: string, mode: ClutterViewport): HTMLElement | undefined {
    return [...root.querySelectorAll<HTMLElement>("[data-clutter-placement]")]
        .find((element) => element.dataset.clutterPlacement === id
            && element.dataset.clutterViewport === mode && element.checkVisibility())
        ?.querySelector<HTMLElement>("[data-clutter-visual]") ?? undefined;
}

function poseCenter(root: HTMLElement, record: AuthoredPlacement, mode: ClutterViewport): Point | null {
    const visual = visibleVisual(root, record.id, mode);
    if (visual) {
        const rect = visual.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    // Hidden items still support keyboard/manual authoring through the record list.
    const pose = resolveClutterPose(record, mode);
    const anchor = measureAnchors(root).find((candidate) => candidate.id === pose.anchor);
    if (!anchor) return null;
    const point = anchorPointPosition(anchor.positioningRect, pose.anchorPoint);
    const gutter = parseFloat(getComputedStyle(anchor.element.parentElement!).paddingRight);
    return { x: point.x + (pose.edgeOffset == null ? pose.x : gutter - pose.edgeOffset), y: point.y + pose.y };
}

function NumberField({ label, value, min, max, step = "any", commitUnchanged = false, onCommit }: {
    label: string; value: number; min?: number; max?: number; step?: number | "any";
    commitUnchanged?: boolean;
    onCommit: (value: number) => void;
}) {
    const edited = useRef(false);

    return (
        <label>{label}
            <input type="number" defaultValue={value} min={min} max={max} step={step}
                onChange={() => { edited.current = true; }}
                onBlur={(event) => {
                    const next = validateNumber(event.currentTarget.value, min, max);
                    const valid = next !== null && (step !== 1 || Number.isInteger(next));
                    event.currentTarget.value = String(valid ? next : value);
                    const commit = next !== value || (commitUnchanged && edited.current);
                    edited.current = false;
                    if (valid && commit) onCommit(next);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        edited.current = true;
                        event.currentTarget.blur();
                    }
                    if (event.key === "Escape") {
                        edited.current = false;
                        event.currentTarget.value = String(value);
                        event.currentTarget.blur();
                    }
                }}
            />
        </label>
    );
}

export function HomeClutterEditor({ children, assets }: { children: ReactNode; assets: ClutterAsset[] }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(() => clonePlacements(HOME_AUTHORED_PLACEMENTS));
    const [root, setRoot] = useState<HTMLDivElement | null>(null);

    return (
        <ClutterDraftContext.Provider value={draft}>
            <div ref={setRoot} data-home-clutter-editing={editing ? "true" : undefined}>
                {children}
            </div>
            {editing && root ? <ActiveEditor root={root} assets={assets} draft={draft} setDraft={setDraft} onClose={() => setEditing(false)} /> : (
                <button type="button" className={styles.toggle} onClick={() => setEditing(true)}>Edit clutter</button>
            )}
        </ClutterDraftContext.Provider>
    );
}

function ActiveEditor({ root, assets, draft, setDraft, onClose }: {
    root: HTMLElement;
    assets: ClutterAsset[];
    draft: AuthoredPlacement[];
    setDraft: React.Dispatch<React.SetStateAction<AuthoredPlacement[]>>;
    onClose: () => void;
}) {
    const [mode, setMode] = useState<ClutterViewport>(currentViewport);
    const [selectedId, setSelectedId] = useState(draft[0]?.id ?? "");
    const [assetId, setAssetId] = useState(assets[0].id);
    const [handles, setHandles] = useState<Handle[]>([]);
    const [preview, setPreview] = useState<Preview | null>(null);
    const [status, setStatus] = useState("");
    const [expanded, setExpanded] = useState(true);
    const cleanupDrag = useRef<(() => void) | null>(null);
    const exportArea = useRef<HTMLTextAreaElement>(null);
    const nextId = useRef(1);
    const selected = draft.find((record) => record.id === selectedId);
    const pose = selected && resolveClutterPose(selected, mode);
    const exportText = exportPlacements(draft);

    useEffect(() => {
        let frame = 0;
        const measure = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                setMode(currentViewport());
                setHandles(draft.flatMap((record) => {
                    const visual = visibleVisual(root, record.id, currentViewport());
                    if (!visual) return [];
                    const { left, top, width, height } = visual.getBoundingClientRect();
                    return width && height ? [{ id: record.id, rect: { left, top, width, height } }] : [];
                }));
            });
        };
        const observer = new ResizeObserver(measure);
        observer.observe(root);
        root.querySelectorAll("[data-home-anchor], [data-clutter-visual]").forEach((node) => observer.observe(node));
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);
        root.addEventListener("load", measure, true);
        measure();
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure, true);
            root.removeEventListener("load", measure, true);
        };
    }, [draft, root]);

    useEffect(() => () => cleanupDrag.current?.(), []);

    const patch = (changes: Partial<PlacementPose>) => {
        if (selected) setDraft((records) => patchPlacementPose(records, selected.id, mode, changes));
    };

    const reanchor = (anchorId: HomeAnchorId, point: AnchorPoint) => {
        if (!selected) return;
        const center = poseCenter(root, selected, mode);
        const anchor = measureAnchors(root).find((candidate) => candidate.id === anchorId);
        if (!center || !anchor) {
            setStatus("Anchor is unavailable at this viewport.");
            return;
        }
        const offset = toAnchorOffset(center, anchor.positioningRect, point);
        patch({ anchor: anchorId, anchorPoint: point, x: roundOffset(offset.x), y: roundOffset(offset.y), edgeOffset: null });
    };

    const newRecord = (): AuthoredPlacement => {
        let id: string;
        do { id = `${assetId}-${nextId.current++}`; } while (draft.some((record) => record.id === id));
        const asset = assets.find((item) => item.id === assetId)!;
        return {
            id, assetId, anchor: pose?.anchor ?? "spotlight", anchorPoint: "center",
            x: 0, y: 0, width: asset.widthRange ? Math.min(80, asset.widthRange[1]) : Math.min(asset.media.width ?? 96, 160),
            rotation: 0, scale: 1, zIndex: 3, hidden: false, flip: false, edgeOffset: null,
        };
    };

    const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, record: AuthoredPlacement, added = false) => {
        if (event.button !== 0 || !event.isPrimary || cleanupDrag.current) return;
        event.preventDefault();
        const dragMode = currentViewport();
        const dragPose = resolveClutterPose(record, dragMode);
        const start = { x: event.clientX, y: event.clientY };
        let center = added ? start : poseCenter(root, record, dragMode);
        if (!center) return;
        const grab = { x: start.x - center.x, y: start.y - center.y };
        let moved = false;
        const pointerId = event.pointerId;
        const owner = event.currentTarget;
        if (!added) setSelectedId(record.id);
        const targetAt = (point: Point) => {
            const anchors = measureAnchors(root);
            const nearest = findNearestAnchor(point, anchors);
            return anchors.find((anchor) => anchor.id === nearest?.id) ?? null;
        };
        const move = (pointer: PointerEvent) => {
            if (pointer.pointerId !== pointerId) return;
            center = { x: pointer.clientX - grab.x, y: pointer.clientY - grab.y };
            moved ||= Math.hypot(pointer.clientX - start.x, pointer.clientY - start.y) > 3;
            setPreview({ record, pose: dragPose, center, target: targetAt(center) });
        };
        const cleanup = () => {
            cleanupDrag.current = null;
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", drop);
            window.removeEventListener("pointercancel", cancelPointer);
            owner.removeEventListener("lostpointercapture", cancelPointer);
            window.removeEventListener("keydown", keydown, true);
            window.removeEventListener("wheel", preventScroll, true);
            window.removeEventListener("touchmove", preventScroll, true);
            window.removeEventListener("scroll", cancel, true);
            window.removeEventListener("resize", cancel);
            window.removeEventListener("blur", cancel);
            if (owner.hasPointerCapture(pointerId)) owner.releasePointerCapture(pointerId);
        };
        const cancel = () => {
            cleanup();
            setPreview(null);
            setStatus("Drag cancelled. Draft unchanged.");
        };
        const cancelPointer = (pointer: PointerEvent) => {
            if (pointer.pointerId === pointerId) cancel();
        };
        const keydown = (key: KeyboardEvent) => {
            if (key.key === "Escape") {
                key.preventDefault();
                key.stopPropagation();
                cancel();
            }
        };
        const preventScroll = (scroll: Event) => scroll.preventDefault();
        const drop = (pointer: PointerEvent) => {
            if (pointer.pointerId !== pointerId) return;
            center = { x: pointer.clientX - grab.x, y: pointer.clientY - grab.y };
            const target = targetAt(center);
            cleanup();
            setPreview(null);
            if (!target || currentViewport() !== dragMode || (!added && !moved)) return;
            const point = findNearestAnchorPoint(center, target.positioningRect);
            const offset = toAnchorOffset(center, target.positioningRect, point);
            const changes = { anchor: target.id, anchorPoint: point, x: roundOffset(offset.x), y: roundOffset(offset.y), edgeOffset: null };
            setDraft((records) => patchPlacementPose(added ? [...records, record] : records, record.id, dragMode, changes));
            setSelectedId(record.id);
            setStatus(`Placed ${record.id} at ${target.id} / ${point} (${dragMode}).`);
        };
        owner.setPointerCapture(pointerId);
        cleanupDrag.current = cleanup;
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", drop);
        window.addEventListener("pointercancel", cancelPointer);
        owner.addEventListener("lostpointercapture", cancelPointer);
        window.addEventListener("keydown", keydown, true);
        window.addEventListener("wheel", preventScroll, { capture: true, passive: false });
        window.addEventListener("touchmove", preventScroll, { capture: true, passive: false });
        window.addEventListener("scroll", cancel, true);
        window.addEventListener("resize", cancel);
        window.addEventListener("blur", cancel);
        setPreview({ record, pose: dragPose, center, target: targetAt(center) });
    };

    const previewAsset = preview && assets.find((asset) => asset.id === preview.record.assetId);
    const paletteAsset = assets.find((asset) => asset.id === assetId)!;
    const field = (label: string, name: "x" | "y" | "width" | "rotation" | "scale" | "zIndex" | "edgeOffset", min?: number, max?: number, step?: number) => pose && (
        <NumberField key={`${selectedId}-${mode}-${name}-${pose[name]}`} label={label} value={pose[name] ?? 0} min={min} max={max} step={step}
            commitUnchanged={name === "x" && pose.edgeOffset != null}
            onCommit={(value) => patch({ [name]: name === "x" || name === "y" ? roundOffset(value) : value, ...(name === "x" ? { edgeOffset: null } : {}) })} />
    );

    return createPortal(
        <div className={styles.editor} data-clutter-editor>
            <div className={styles.handles}>
                {handles.map(({ id, rect }) => (
                    <button key={id} type="button" aria-label={`Move ${id}`} aria-pressed={id === selectedId}
                        className={styles.handle} data-clutter-handle={id} style={{ ...rect, zIndex: id === selectedId ? 2 : 1 }}
                        onPointerDown={(event) => startDrag(event, draft.find((record) => record.id === id)!)}
                        onClick={() => setSelectedId(id)} onDragStart={(event) => event.preventDefault()} />
                ))}
            </div>
            {preview && previewAsset && <>
                {preview.target && <div className={styles.anchor} style={preview.target.rect} data-clutter-target={preview.target.id}>
                    <span>{preview.target.id}</span>
                </div>}
                <div className={styles.preview} data-clutter-preview aria-hidden="true" style={{ left: preview.center.x, top: preview.center.y, width: preview.pose.width }}>
                    <div className={`${clutterStyles.visual} ${previewAsset.pixelArt ? clutterStyles.pixelArt : ""} ${previewAsset.framed ? clutterStyles.framed : ""}`}
                        style={{ transform: `rotate(${preview.pose.rotation}deg) scale(${preview.pose.scale}) scaleX(${preview.pose.flip ? -1 : 1})` }}>
                        <picture>
                            {previewAsset.reducedMotionMedia && <source media="(prefers-reduced-motion: reduce)" srcSet={previewAsset.reducedMotionMedia.src} />}
                            <ContentImage media={{ ...previewAsset.media, alt: "" }} sizes={`${preview.pose.width}px`} loading="eager" unoptimized />
                        </picture>
                    </div>
                </div>
            </>}
            <aside className={styles.panel} aria-label="Static clutter editor">
                <div className={styles.heading}>
                    <strong>Clutter · {mode}{mode === "desktop" ? " (base)" : " override"}</strong>
                    <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Collapse" : "Expand"}</button>
                    <button type="button" onClick={onClose}>Done</button>
                </div>
                <div hidden={!expanded}>
                    <p>Draft not saved to repository. Done keeps the in-memory preview; reload discards it.</p>
                    <p>Scroll before dragging. Escape cancels. Use the list for covered or hidden objects. Numbers apply on Enter or blur; invalid values revert.</p>
                    <fieldset disabled={!!preview}>
                        <label>Placement ({draft.length})
                            <select value={selected?.id ?? ""} onChange={(event) => setSelectedId(event.target.value)}>
                                <option value="" disabled>Select a decoration</option>
                                {draft.map((record) => <option key={record.id} value={record.id}>{record.id}{resolveClutterPose(record, mode).hidden ? " (hidden)" : ""}</option>)}
                            </select>
                        </label>
                        {selected && pose && <>
                            <p>Stable ID: {selected.id}</p>
                            <div className={styles.grid}>
                                <label>Anchor<select value={pose.anchor} onChange={(event) => reanchor(event.target.value as HomeAnchorId, pose.anchorPoint)}>
                                    {ANCHOR_ORDER.map((id) => <option key={id}>{id}</option>)}
                                </select></label>
                                <label>Anchor point<select value={pose.anchorPoint} onChange={(event) => reanchor(pose.anchor, event.target.value as AnchorPoint)}>
                                    {ANCHOR_POINTS.map((point) => <option key={point}>{point}</option>)}
                                </select></label>
                                {field("X (px)", "x")}{field("Y (px)", "y")}
                                {field("Width (8–2048 px)", "width", 8, 2048)}
                                {field("Rotation (−180–180°)", "rotation", -180, 180)}
                                {field("Scale (0.25–8)", "scale", 0.25, 8)}
                                {field("Layer (0–9)", "zIndex", 0, 9, 1)}
                            </div>
                            <div className={styles.row}>
                                <label><input type="checkbox" checked={!pose.hidden} onChange={(event) => patch({ hidden: !event.target.checked })} /> Visible</label>
                                <label><input type="checkbox" checked={pose.flip} onChange={(event) => patch({ flip: event.target.checked })} /> Flip</label>
                            </div>
                            <details>
                                <summary>Edge positioning</summary>
                                <p>Edge offset replaces X with gutter minus offset. Dragging, reanchoring, or editing X clears it explicitly in this mode.</p>
                                <label><input type="checkbox" checked={pose.edgeOffset != null} onChange={(event) => {
                                    if (event.target.checked) patch({ edgeOffset: 0 });
                                    else reanchor(pose.anchor, pose.anchorPoint);
                                }} /> Use edge offset</label>
                                {pose.edgeOffset != null && field("Edge offset (px)", "edgeOffset")}
                            </details>
                            {mode !== "desktop" && <button type="button" disabled={!selected[mode]} onClick={() => setDraft((records) => resetPlacementOverride(records, selected.id, mode))}>Reset {mode} override</button>}
                            <details>
                                <summary>Whole record / all modes</summary>
                                <p>Asset and Delete affect every mode. IDs stay fixed.</p>
                                <label>Asset<select value={selected.assetId} onChange={(event) => {
                                    const value = event.target.value;
                                    setDraft((records) => records.map((record) => record.id === selected.id ? { ...record, assetId: value } : record));
                                }}>{assets.map((asset) => <option key={asset.id}>{asset.id}</option>)}</select></label>
                                <button type="button" onClick={() => {
                                    setDraft((records) => records.filter((record) => record.id !== selected.id));
                                    setSelectedId("");
                                }}>Delete placement in all modes</button>
                            </details>
                        </>}
                        <details>
                            <summary>Add from catalogue</summary>
                            <p>Add creates a whole record at the selected anchor (or Spotlight). Dragging in an override mode adds that mode&apos;s position.</p>
                            <label>New asset<select value={assetId} onChange={(event) => setAssetId(event.target.value)}>
                                {assets.map((asset) => <option key={asset.id}>{asset.id}</option>)}
                            </select></label>
                            <div className={`${styles.palettePreview} ${paletteAsset.pixelArt ? clutterStyles.pixelArt : ""}`}>
                                <ContentImage media={{ ...paletteAsset.media, alt: "Selected decoration preview" }} sizes="80px" unoptimized />
                            </div>
                            <div className={styles.row}>
                                <button type="button" onClick={() => {
                                    const record = newRecord();
                                    setDraft((records) => [...records, record]);
                                    setSelectedId(record.id);
                                }}>Add</button>
                                <button type="button" className={styles.paletteDrag} onPointerDown={(event) => startDrag(event, newRecord(), true)} onDragStart={(event) => event.preventDefault()}>Drag new asset</button>
                            </div>
                        </details>
                        <details>
                            <summary>Export all {draft.length} placements</summary>
                            <p>Replace only HOME_AUTHORED_PLACEMENTS in content/home-clutter.ts. Keep the asset catalogue and existing type import; the included import is for reference.</p>
                            <textarea ref={exportArea} aria-label="Complete placement export" value={exportText} readOnly spellCheck={false} />
                            <button type="button" onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(exportText);
                                    setStatus("Copied all placements. Paste into the repository to save.");
                                } catch {
                                    exportArea.current?.focus();
                                    exportArea.current?.select();
                                    setStatus("Clipboard unavailable. Export selected; use your browser’s Copy command.");
                                }
                            }}>Copy export</button>
                        </details>
                        <button type="button" onClick={() => {
                            setDraft(clonePlacements(HOME_AUTHORED_PLACEMENTS));
                            setSelectedId(HOME_AUTHORED_PLACEMENTS[0]?.id ?? "");
                            setStatus("Draft reset to repository placements.");
                        }}>Reset entire draft</button>
                    </fieldset>
                    <p role="status">{status}</p>
                </div>
            </aside>
        </div>, document.body,
    );
}
