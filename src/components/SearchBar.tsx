"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => setOpen(true);
  const closeSearch = () => {
    setOpen(false);
    onChange("");
  };

  useEffect(() => {
    if (open) {
      // let the field finish forming before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !open && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape" && open) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex justify-center w-full">
      <motion.div
        layout
        onClick={!open ? openSearch : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className={`relative flex items-center overflow-hidden rounded-full border border-line bg-surface shadow-[0_1px_0_rgba(20,18,31,0.02)] ${
          open ? "w-full cursor-text px-2" : "w-full cursor-pointer justify-center px-4"
        }`}
        style={{ height: 56 }}
      >
        {/* glowing point / light sweep, only visible mid-transition */}
        <AnimatePresence>
          {open && (
            <motion.span
              key="glow"
              initial={{ opacity: 0.9, scaleX: 0 }}
              animate={{ opacity: 0, scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pointer-events-none absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-purple/0 via-purple/25 to-purple/0"
            />
          )}
        </AnimatePresence>

        {!open ? (
          <motion.span
            key="closed-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm font-medium text-muted"
          >
            <Search size={16} />
            Search jobs...
            <kbd className="ml-1 rounded border border-line bg-white px-1.5 py-0.5 text-[10px] text-muted">
              /
            </kbd>
          </motion.span>
        ) : (
          <>
            <Search size={17} className="ml-2.5 shrink-0 text-purple" />
            <motion.input
              ref={inputRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search by job, company or city..."
              className="h-full flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted"
            />
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="mr-1.5 flex shrink-0 items-center justify-center rounded-full p-2 text-muted transition-colors hover:bg-white hover:text-foreground"
            >
              <X size={16} />
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
