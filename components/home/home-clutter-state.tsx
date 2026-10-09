"use client";

import { createContext } from "react";
import type { AuthoredPlacement } from "../../lib/home/clutter-types";

// A future development-only editor can supply drafts; production uses saved data.
export const ClutterDraftContext = createContext<AuthoredPlacement[] | null>(null);
