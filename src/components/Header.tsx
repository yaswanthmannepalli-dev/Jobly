"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Bookmark, Search } from "lucide-react";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useSavedJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-[70] transition-colors duration-150 ${scrolled ? "border-b border-line/70 bg-background/80 backdrop-blur-md" : "border-b border-transparent bg-background"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto dark:brightness-0 dark:invert transition-all duration-150" />
          </Link>

          {/* Search bar — center */}
          <div className="hidden flex-1 justify-center md:flex">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs">
              {searchOpen ? (
                <div className="flex items-center rounded-full border border-purple/40 bg-surface px-3 py-1.5 shadow-sm">
                  <Search size={15} className="shrink-0 text-purple" />
                  <input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs, companies..."
                    className="ml-2 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="ml-1 shrink-0 rounded-full p-1 text-muted hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex w-full items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-sm text-muted transition hover:border-purple/30 hover:bg-surface"
                >
                  <Search size={14} />
                  <span>Search jobs...</span>
                  <kbd className="ml-auto rounded border border-line bg-surface dark:bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">
                    /
                  </kbd>
                </button>
              )}
            </form>
          </div>

          {/* Nav links — right */}
          <nav className="hidden items-center gap-6 md:flex ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile elements */}
          <div className="flex items-center gap-2 md:hidden ml-auto">
            <ThemeToggle />
            <button
              className="flex items-center justify-center rounded-[6px] p-2 text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <nav className="flex flex-col gap-1 px-5 py-4">
                <form onSubmit={(e) => { handleSearchSubmit(e); setOpen(false); }} className="relative mb-2 block md:hidden">
                  <div className="flex items-center rounded-xl border border-line bg-surface px-3 py-2.5 shadow-sm focus-within:border-purple/50 focus-within:ring-1 focus-within:ring-purple">
                    <Search size={15} className="shrink-0 text-muted" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs..."
                      className="ml-2 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                    />
                  </div>
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/saved"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface"
                >
                  <Bookmark size={15} />
                  Saved jobs {hydrated && count > 0 ? `(${count})` : ""}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
