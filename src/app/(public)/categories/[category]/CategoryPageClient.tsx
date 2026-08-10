"use client";

import { useMemo, useState } from "react";
import JobList from "@/components/JobList";
import FilterBar, { Filters } from "@/components/FilterBar";
import { capitalize } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Job } from "@/lib/types";
import Pagination from "@/components/Pagination";

const VALID_CATEGORIES = ["development", "design", "marketing", "data", "sales", "support"];
const JOBS_PER_PAGE = 8;

export default function CategoryPageClient({ category, initialJobs, categories }: { category: string, initialJobs: Job[], categories: any[] }) {
  const normalizedSlug = category.toLowerCase();
  const displayName = capitalize(normalizedSlug);

  const isValid = categories.some((c) => c.name.toLowerCase() === normalizedSlug);

  const categoryJobs = useMemo(
    () => initialJobs.filter((j) => j.category.toLowerCase() === normalizedSlug),
    [initialJobs, normalizedSlug]
  );

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: displayName, // keep the dropdown pre-selected
    location: "",
    type: "",
    experience: "",
    workMode: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Apply remaining filters on top of the category slice
  const filtered = useMemo(() => {
    return categoryJobs.filter((job) => {
      if (filters.search) {
        const term = filters.search.toLowerCase();
        if (
          !job.title.toLowerCase().includes(term) &&
          !job.company.toLowerCase().includes(term) &&
          !job.location.toLowerCase().includes(term)
        )
          return false;
      }
      if (filters.location && job.location !== filters.location) return false;
      if (filters.type && job.type !== filters.type) return false;
      if (filters.experience && job.experience !== filters.experience) return false;
      return true;
    });
  }, [categoryJobs, filters]);

  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = filtered.slice(startIndex, startIndex + JOBS_PER_PAGE);

  if (!isValid) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <Briefcase size={40} className="text-purple/40" />
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="text-muted">The category &quot;{category}&quot; doesn&apos;t exist.</p>
      </main>
    );
  }

  const locations = Array.from(new Set(categoryJobs.map(j => j.location))).filter(Boolean).sort();

  return (
    <main className="flex flex-col items-center gap-8 py-12">
      <section className="w-full max-w-6xl px-5 sm:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-purple">
            Browse category
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {displayName}{" "}
            <span className="text-muted text-2xl font-normal">
              ({filtered.length} open role{filtered.length !== 1 ? "s" : ""})
            </span>
          </h1>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onChange={handleFilterChange} categories={categories} locations={locations} />

        {/* Job List or Empty State */}
        {filtered.length > 0 ? (
          <>
            <JobList jobs={currentJobs} />
            {filtered.length > JOBS_PER_PAGE && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-20 text-center"
          >
            <Briefcase size={36} className="text-purple/30" />
            <p className="text-lg font-semibold text-foreground">No jobs match your filters</p>
            <p className="text-sm text-muted">Try adjusting the filters above.</p>
            <button
              onClick={() => handleFilterChange({ search: "", category: displayName, location: "", type: "", experience: "", workMode: "" })}
              className="mt-2 text-sm font-medium text-purple hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </section>
    </main>
  );
}
