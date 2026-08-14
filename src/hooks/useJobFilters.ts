"use client";

import { useState, useMemo } from "react";
import { Job } from "@/lib/types";

export interface Filters {
  search: string;
  category: string;
  location: string;
  type: string;
  experience: string;
  salaryMin?: number;
  workMode: string;
  batch: string;
  isInternship: boolean;
  isFresher: boolean;
}

export function useJobFilters(initialJobs: Job[], initialFilters?: Partial<Filters>) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    location: "",
    type: "",
    experience: "",
    workMode: "",
    batch: "",
    isInternship: false,
    isFresher: false,
    salaryMin: undefined,
    ...(initialFilters || {}),
  });

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // Search (title, company, location)
      if (filters.search) {
        const term = filters.search.toLowerCase();
        const matches =
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term);
        if (!matches) return false;
      }
      // Category
      if (filters.category && job.category !== filters.category) return false;
      // Location
      if (filters.location && job.location !== filters.location) return false;
      // Type
      if (filters.type && job.type !== filters.type) return false;
      // Experience
      if (filters.experience && job.experience !== filters.experience) return false;
      // Work Mode
      if (filters.workMode && job.workMode !== filters.workMode) return false;
      // Salary Min
      if (filters.salaryMin && (!job.salaryMin || job.salaryMin < filters.salaryMin)) return false;
      // Batch
      if (filters.batch && job.batch !== filters.batch) return false;
      // Internship
      if (filters.isInternship && !job.isInternship) return false;
      // Fresher
      if (filters.isFresher && !job.isFresher) return false;
      
      return true;
    });
  }, [initialJobs, filters]);

  return { filters, setFilters, filteredJobs };
}
