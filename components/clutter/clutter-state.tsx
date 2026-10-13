"use client";

import { createContext } from "react";
import type { AuthoredPlacement } from "../../lib/clutter/types";

// Development supplies a page-scoped draft; production renders saved records.
export const ClutterDraftContext = createContext<AuthoredPlacement[] | null>(null);
