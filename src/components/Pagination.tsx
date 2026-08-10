import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Simple logic to show all pages (or a window of pages if there are many)
  // For now, we'll show up to 5 pages around the current page, and ellipses if needed.
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  
  if (currentPage <= 3) {
    endPage = Math.min(totalPages, 5);
  }
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="mt-12 flex w-full justify-end items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-muted transition hover:bg-surface disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <ChevronLeft size={16} /> Prev
      </button>
      
      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium text-foreground transition hover:bg-surface"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-muted">...</span>}
          </>
        )}
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition ${
              currentPage === page
                ? "bg-purple text-white shadow-sm shadow-purple/20"
                : "text-foreground hover:bg-surface"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1 text-muted">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium text-foreground transition hover:bg-surface"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-purple transition hover:bg-purple-tint disabled:opacity-50 disabled:hover:bg-transparent"
      >
        Next page <ChevronRight size={16} />
      </button>
    </div>
  );
}
