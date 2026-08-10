"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageVisit } from "@/app/actions/trackVisit";

export default function PageTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent double tracking in strict mode or rapid re-renders
    if (trackedPath.current === pathname) return;
    
    // Only track public routes
    if (!pathname.startsWith("/admin")) {
      let jobId = undefined;
      if (pathname.startsWith("/jobs/") && pathname.split("/").length === 3) {
        jobId = pathname.split("/")[2];
      }
      trackPageVisit(pathname, jobId);
      trackedPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
