"use client";

import { useEffect } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public Route Error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
        <AlertTriangle size={32} />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
        <p className="text-sm text-muted max-w-md mx-auto">
          We encountered a temporary connection issue. Please try refreshing or checking back in a moment.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple/20 transition-all hover:bg-purple/90 active:scale-95"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}
