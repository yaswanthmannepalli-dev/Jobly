"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareButton({
  jobId,
  size = 18,
}: {
  jobId: string;
  size?: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/jobs/${jobId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this job!",
          url,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fallbackCopy(url);
        }
      }
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      aria-label="Share job"
      onClick={handleShare}
      className="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-purple-tint group/share"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
            className="flex text-purple"
          >
            <Check size={size} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
            className="flex text-muted group-hover/share:text-purple"
          >
            <Share2 size={size} strokeWidth={1.8} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
