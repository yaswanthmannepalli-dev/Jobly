"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Job } from "@/lib/types";
import { timeAgo } from "@/lib/data";
import BookmarkButton from "@/components/BookmarkButton";
import MagneticArrow from "@/components/MagneticArrow";

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function JobRow({ job }: { job: Job }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return (
    <motion.div variants={itemVariants} layout>
      <Link
        href={`/jobs/${job.id}`}
        className="group/row relative flex items-center gap-4 rounded-2xl border border-transparent px-4 py-4 hover-lift hover:border-line hover:bg-surface hover:shadow-[0_16px_40px_rgba(90,60,200,0.10)] sm:px-5"
      >
        <motion.div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface ring-1 ring-line transition-transform duration-300 group-hover/row:scale-105"
        >
          <Image
            src={job.companyLogo}
            alt={`${job.company} logo`}
            width={28}
            height={28}
            className="object-contain"
            unoptimized
          />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 max-w-full">
            <h3 className="truncate max-w-full text-[15px] font-semibold text-foreground sm:text-base">
              {job.title}
            </h3>
            {job.verified && (
              <span className="hidden rounded-full bg-purple-tint px-2 py-0.5 text-[10px] font-medium text-purple-dark sm:inline-block">
                Listing active
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-sm text-muted">
            {job.company} · {job.location}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="rounded-full bg-surface px-2 py-0.5 ring-1 ring-line">
              {job.type}
            </span>
            <span suppressHydrationWarning>{mounted ? timeAgo(job.postedAt) : ""}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:block">
            <BookmarkButton jobId={job.id} />
          </div>
          <span className="hidden text-sm font-medium text-foreground/70 transition-colors group-hover/row:text-purple md:inline">
            View &amp; Apply
          </span>
          <MagneticArrow size={38} />
        </div>
      </Link>
    </motion.div>
  );
}
