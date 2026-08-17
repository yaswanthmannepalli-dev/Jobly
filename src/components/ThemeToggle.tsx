"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`flex h-9 w-9 items-center justify-center rounded-[6px] border border-line bg-surface text-muted opacity-50 ${className}`}
      >
        <Sun size={17} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-[6px] border border-line bg-surface text-foreground transition-colors duration-150 hover:border-purple/40 hover:text-purple focus:outline-none ${className}`}
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400 transition-transform duration-150" />
      ) : (
        <Moon size={17} className="text-foreground/80 transition-transform duration-150" />
      )}
    </button>
  );
}
