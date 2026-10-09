"use client";

import { createContext } from "react";
import type { AuthoredPlacement } from "../../lib/home/clutter-types";

// The development-only editor supplies drafts; production uses saved data.
export const ClutterDraftContext = createContext<AuthoredPlacement[] | null>(null);
