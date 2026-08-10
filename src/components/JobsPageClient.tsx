"use client";

import { useState } from "react";
import { useJobFilters } from "@/hooks/useJobFilters";
import { Job } from "@/lib/types";
import { Briefcase } from "lucide-react";
import FilterBar, { Filters } from "./FilterBar";
import JobList from "./JobList";
import Pagination from "./Pagination";

interface JobsPageClientProps {
  initialJobs: Job[];
  categories: any[];
}

const JOBS_PER_PAGE = 8;

export default function JobsPageClient({ initialJobs, categories }: JobsPageClientProps) {
  const defaultFilters: Partial<Filters> = {};
  const { filters, setFilters, filteredJobs } = useJobFilters(initialJobs, defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const locations = Array.from(new Set(initialJobs.map(j => j.location))).filter(Boolean).sort();

  return (
    <main className="flex flex-col items-center gap-8 py-12">
      <section className="w-full max-w-6xl px-5 sm:px-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Briefcase size={28} /> Jobs
        </h1>
        <FilterBar filters={filters} onChange={handleFilterChange} categories={categories} locations={locations} />
        <JobList jobs={currentJobs} hidePagination={true} />
        
        {filteredJobs.length > JOBS_PER_PAGE && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </section>
    </main>
  );
}
