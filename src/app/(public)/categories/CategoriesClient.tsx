"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Job } from "@/lib/types";
import Pagination from "@/components/Pagination";

const CATEGORIES_PER_PAGE = 12;

export default function CategoriesClient({ categories, parsedJobs }: { categories: { id: string; name: string; icon: string }[], parsedJobs: Job[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE);
  const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
  const currentCategories = categories.slice(startIndex, startIndex + CATEGORIES_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {currentCategories.map((cat) => {
          const count = parsedJobs.filter((j: Job) => j.category === cat.name).length;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.name.toLowerCase()}`}
              className="group flex items-center justify-between rounded-[5px] border border-line bg-surface p-5 transition-colors duration-150 hover:border-purple/40"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="text-xs text-muted mt-0.5 group-hover:text-purple-dark transition-colors duration-150">{count} open roles</p>
              </div>
              <ChevronRight size={16} className="text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-purple" />
            </Link>
          );
        })}
      </div>

      {categories.length > CATEGORIES_PER_PAGE && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
