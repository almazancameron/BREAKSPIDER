import { HOME_AUTHORED_PLACEMENTS } from "../../content/home-clutter";
import { ABOUT_AUTHORED_PLACEMENTS } from "../../content/about-clutter";
import { ANCHOR_ORDER } from "../home/clutter-authoring";
import type { AuthoredPlacement } from "./types";
import { AUTHORED_PLACEMENTS as projectsPlacements } from "../../content/clutter/projects";
import { AUTHORED_PLACEMENTS as onffPlacements } from "../../content/clutter/onff-project";
import { AUTHORED_PLACEMENTS as viscapPlacements } from "../../content/clutter/viscap-project";
import { AUTHORED_PLACEMENTS as sketchbookPlacements } from "../../content/clutter/sketchbook";
import { AUTHORED_PLACEMENTS as battlePlansPlacements } from "../../content/clutter/sketchbook-battle-plans-first-pass";
import { AUTHORED_PLACEMENTS as familiarsPlacements } from "../../content/clutter/familiars";
import { AUTHORED_PLACEMENTS as ashwingPlacements } from "../../content/clutter/familiar-ashwing";
import { AUTHORED_PLACEMENTS as pebbloqPlacements } from "../../content/clutter/familiar-pebbloq";
import { AUTHORED_PLACEMENTS as collectionPlacements } from "../../content/clutter/collection";
import { AUTHORED_PLACEMENTS as mapPlacements } from "../../content/clutter/map";
import { AUTHORED_PLACEMENTS as playPlacements } from "../../content/clutter/play-onff";

export type ClutterPageRegistration = {
    id: string;
    pathname: string;
    file: string;
    exportName: string;
    anchors: readonly string[];
    placements: AuthoredPlacement[];
};

// Fixed repo-owned registrations. Never use a request ID as a file path.
export const CLUTTER_PAGES: ClutterPageRegistration[] = [
    { id: "home", pathname: "/", file: "content/home-clutter.ts", exportName: "HOME_AUTHORED_PLACEMENTS", anchors: ANCHOR_ORDER, placements: HOME_AUTHORED_PLACEMENTS },
    { id: "about", pathname: "/about", file: "content/about-clutter.ts", exportName: "ABOUT_AUTHORED_PLACEMENTS", anchors: ["portrait", "contact", "practice", "workTrail", "satellite", "identity", "canvas"], placements: ABOUT_AUTHORED_PLACEMENTS },
    { id: "projects", pathname: "/projects", file: "content/clutter/projects.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: projectsPlacements },
    { id: "onff-project", pathname: "/projects/one-night-familiar-fight", file: "content/clutter/onff-project.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: onffPlacements },
    { id: "viscap-project", pathname: "/projects/viscap-ai", file: "content/clutter/viscap-project.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: viscapPlacements },
    { id: "sketchbook", pathname: "/sketchbook", file: "content/clutter/sketchbook.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: sketchbookPlacements },
    { id: "sketchbook-battle-plans-first-pass", pathname: "/sketchbook/battle-plans-first-pass", file: "content/clutter/sketchbook-battle-plans-first-pass.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: battlePlansPlacements },
    { id: "familiars", pathname: "/familiars", file: "content/clutter/familiars.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: familiarsPlacements },
    { id: "familiar-ashwing", pathname: "/familiars/ashwing", file: "content/clutter/familiar-ashwing.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: ashwingPlacements },
    { id: "familiar-pebbloq", pathname: "/familiars/pebbloq", file: "content/clutter/familiar-pebbloq.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: pebbloqPlacements },
    { id: "collection", pathname: "/collection", file: "content/clutter/collection.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: collectionPlacements },
    { id: "map", pathname: "/map", file: "content/clutter/map.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: mapPlacements },
    { id: "play-onff", pathname: "/play/onff", file: "content/clutter/play-onff.ts", exportName: "AUTHORED_PLACEMENTS", anchors: ["canvas"], placements: playPlacements },
];

export function getClutterPage(id: unknown): ClutterPageRegistration | null {
    return typeof id === "string" ? CLUTTER_PAGES.find((page) => page.id === id) ?? null : null;
}

