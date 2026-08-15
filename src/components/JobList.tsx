"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "@/lib/types";
import JobRow from "@/components/JobRow";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ITEMS_PER_PAGE = 8; // Adjust this if you want more/less per page

export default function JobList({ jobs, hidePagination = false }: { jobs: Job[]; hidePagination?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Removed reset to page 1 in effect because it causes cascading renders.
  // The parent component should pass the correct page down, or we should use a derived state.
  // We'll manage pagination solely through props or user interaction.

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line py-16 text-center">
        <SearchX size={28} className="text-muted" />
        <p className="text-sm font-medium text-foreground">No jobs match yet</p>
        <p className="max-w-xs text-sm text-muted">
          Try a different job title, company, or city — new roles are added
          every day.
        </p>
      </div>
    );
  }

  const totalPages = hidePagination ? 1 : Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = hidePagination 
    ? jobs 
    : jobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        layout
        className="flex flex-col divide-y divide-line/70"
      >
        <AnimatePresence mode="popLayout">
          {currentJobs.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      {!hidePagination && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-end gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-purple/30 hover:text-purple disabled:pointer-events-none disabled:opacity-50"
            aria-label="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-purple text-white shadow-md shadow-purple/20"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-purple/30 hover:text-purple disabled:pointer-events-none disabled:opacity-50"
            aria-label="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
