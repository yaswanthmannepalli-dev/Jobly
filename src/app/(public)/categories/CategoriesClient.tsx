"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Job } from "@/lib/types";
import Pagination from "@/components/Pagination";

const CATEGORIES_PER_PAGE = 12;

export default function CategoriesClient({ categories, parsedJobs }: { categories: any[], parsedJobs: Job[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE);
  const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
  const currentCategories = categories.slice(startIndex, startIndex + CATEGORIES_PER_PAGE);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {currentCategories.map((cat) => {
          const count = parsedJobs.filter((j: Job) => j.category === cat.name).length;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.name.toLowerCase()}`}
              className="group flex items-center justify-between rounded-2xl border border-line bg-white p-5 transition-colors hover:border-purple hover:shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="text-xs text-muted group-hover:text-purple-dark">{count} open roles</p>
              </div>
              <ChevronRight size={18} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-purple" />
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
