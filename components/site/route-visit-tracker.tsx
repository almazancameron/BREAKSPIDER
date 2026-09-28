"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useVisitorState } from "../../lib/visitor/visitor-state-provider";

export function RouteVisitTracker() {
  const pathname = usePathname();
  const { ready, recordPageVisit } = useVisitorState();
  const lastRecordedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!ready || !pathname || lastRecordedPath.current === pathname) return;

    lastRecordedPath.current = pathname;
    recordPageVisit(pathname);
  }, [pathname, ready, recordPageVisit]);

  return null;
}
