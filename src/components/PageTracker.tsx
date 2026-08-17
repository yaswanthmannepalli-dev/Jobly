"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent double tracking in strict mode or rapid re-renders
    if (trackedPath.current === pathname) return;
    
    // Only track public routes
    if (!pathname.startsWith("/admin")) {
      let jobId: string | undefined = undefined;
      if (pathname.startsWith("/jobs/") && pathname.split("/").length === 3) {
        jobId = pathname.split("/")[2];
      }
      
      trackedPath.current = pathname;

      // Use idle callback or timeout to prevent blocking routing logic
      const triggerTracking = () => {
        const payload = JSON.stringify({ path: pathname, jobId });
        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/track", blob);
        } else {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(triggerTracking);
      } else {
        setTimeout(triggerTracking, 200);
      }
    }
  }, [pathname]);

  return null;
}
