"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useSavedJobs } from "@/hooks/useSavedJobs";

export default function BookmarkButton({
  jobId,
  size = 18,
}: {
  jobId: string;
  size?: number;
}) {
  const { isSaved, toggleSaved } = useSavedJobs();
  const saved = isSaved(jobId);

  return (
    <button
      aria-label={saved ? "Remove bookmark" : "Save job"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(jobId);
      }}
      className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-purple-tint"
    >
      <motion.span
        animate={saved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="flex"
      >
        <Bookmark
          size={size}
          className={saved ? "fill-purple text-purple" : "text-muted"}
          strokeWidth={1.8}
        />
      </motion.span>
    </button>
  );
}
