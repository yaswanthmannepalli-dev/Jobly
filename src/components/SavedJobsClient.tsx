"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import JobList from "@/components/JobList";
import { Job } from "@/lib/types";

export default function SavedJobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const { savedIds, hydrated } = useSavedJobs();
  const savedJobs = initialJobs.filter((j) => savedIds.includes(j.id));

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-8 flex items-center gap-3"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-[5px] border border-line bg-purple-tint">
          <Bookmark size={19} className="text-purple" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Saved Jobs</h1>
          <p className="text-sm text-muted">
            Saved on this device — no account needed.
          </p>
        </div>
      </motion.div>

      {!hydrated ? null : savedJobs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[5px] border border-dashed border-line bg-surface/30 py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            Nothing saved yet
          </p>
          <p className="max-w-xs text-sm text-muted">
            Bookmark a job from the listings to find it here later.
          </p>
        </div>
      ) : (
        <JobList jobs={savedJobs} />
      )}
    </div>
  );
}
