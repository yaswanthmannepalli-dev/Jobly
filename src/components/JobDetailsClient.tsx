"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Job } from "@/lib/types";
import { timeAgo, deadlineLabel } from "@/lib/data";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAboutFromUrl } from "@/app/actions/company";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function JobDetailsClient({ job }: { job: Job }) {
  const router = useRouter();
  const deadline = deadlineLabel(job.deadline);
  const [aboutText, setAboutText] = useState<string | null>(null);

  useEffect(() => {
    getAboutFromUrl(job.applicationUrl).then((text) => {
      if (text && text.trim().length > 10) {
        setAboutText(text);
      }
    });
  }, [job.applicationUrl]);

  const beforeYouApply = [
    { ok: true, text: `Experience: ${job.experience}` },
    { ok: true, text: job.location === "Remote" ? "Fully remote role" : job.location },
    { ok: true, text: `${job.skills[0]} required` },
    { ok: false, text: "Application handled externally" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => window.history.length > 1 ? router.back() : router.push('/jobs')}
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} />
          Back
        </button>
      </motion.div>

      {/* Header */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
            <Image
              src={job.companyLogo}
              alt={`${job.company} logo`}
              width={36}
              height={36}
              className="object-contain"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {job.title}
            </h1>
            <p className="mt-1 text-base text-muted">{job.company}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} /> {job.type}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {timeAgo(job.postedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton jobId={job.id} size={20} />
          <BookmarkButton jobId={job.id} size={20} />
        </div>
      </motion.div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.verified && (
          <span className="rounded-full bg-purple-tint px-2.5 py-1 text-xs font-medium text-purple-dark">
            Listing active
          </span>
        )}
        {deadline && (
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-line">
            {deadline}
          </span>
        )}
      </div>

      {/* 20 sec overview */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-8 rounded-2xl border border-line bg-surface p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-purple">
          20 sec overview
        </p>
        <div className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-3">
          <Overview label="Role" value={job.title} />
          <Overview label="Experience" value={job.experience} />
          <Overview label="Location" value={job.location} />
          <Overview label="Main skills" value={job.skills.slice(0, 3).join(" · ")} />
          <Overview label="Type" value={job.type} />
        </div>
      </motion.div>

      {/* Before you apply */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-6 rounded-2xl border border-line p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Before you apply
        </p>
        <ul className="mt-3 space-y-2">
          {beforeYouApply.map((point) => (
            <li key={point.text} className="flex items-center gap-2 text-sm text-foreground/85">
              {point.ok ? (
                <CheckCircle2 size={15} className="shrink-0 text-purple" />
              ) : (
                <AlertTriangle size={15} className="shrink-0 text-amber-500" />
              )}
              {point.text}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Description */}
      <motion.section custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Job Overview</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">{job.description}</p>
      </motion.section>

      <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Responsibilities</h2>
        <ul className="mt-3 space-y-2">
          {job.responsibilities.map((r) => (
            <li key={r} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple" />
              {r}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Requirements</h2>
        <ul className="mt-3 space-y-2">
          {job.requirements.map((r) => (
            <li key={r} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple" />
              {r}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section custom={6} variants={fadeUp} initial="hidden" animate="show" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">About {job.company}</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          {aboutText 
            ? aboutText 
            : `${job.company} is hiring via ${job.source}. Applications are reviewed directly by the company’s hiring team.`}
        </p>
      </motion.section>

      <motion.section custom={7} variants={fadeUp} initial="hidden" animate="show" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Job Highlights</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-foreground/75 ring-1 ring-line"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Apply CTA */}
      <motion.div
        custom={8}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="sticky bottom-4 mt-10"
      >
        <ApplyButton job={job} />
      </motion.div>
    </div>
  );
}

function Overview({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

import { createPortal } from "react-dom";

function ApplyButton({ job }: { job: Job }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Show the "All the best!" overlay first so the user can see it
    setShowOverlay(true);
    
    // Wait for 1.5 seconds while they view the overlay
    setTimeout(() => {
      // Hide the overlay
      setShowOverlay(false);
      
      // Attempt to open in a new tab
      const newWindow = window.open(job.applicationUrl, '_blank');
      
      // If the browser's popup blocker prevented the new tab, navigate in the current tab instead
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = job.applicationUrl;
      }
    }, 1500);
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md overflow-hidden"
            >
              {/* Floating Stickers */}
              {[
                { emoji: "🎉", top: "20%", left: "20%", delay: 0.1, rotate: -15 },
                { emoji: "🚀", top: "15%", right: "20%", delay: 0.2, rotate: 20 },
                { emoji: "💼", bottom: "25%", left: "25%", delay: 0.3, rotate: -10 },
                { emoji: "✨", bottom: "20%", right: "25%", delay: 0.15, rotate: 15 },
                { emoji: "🔥", top: "45%", right: "10%", delay: 0.25, rotate: 5 },
                { emoji: "🌟", top: "50%", left: "10%", delay: 0.35, rotate: -20 },
              ].map((sticker, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, rotate: sticker.rotate - 45, y: 50 }}
                  animate={{ scale: 1, opacity: 1, rotate: sticker.rotate, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15, 
                    delay: sticker.delay 
                  }}
                  className="absolute text-5xl md:text-6xl drop-shadow-xl select-none"
                  style={{ top: sticker.top, bottom: sticker.bottom, left: sticker.left, right: sticker.right }}
                >
                  {sticker.emoji}
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                className="flex flex-col items-center gap-6 text-center z-10"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-purple/10 text-purple shadow-[0_0_40px_rgba(124,92,252,0.3)]"
                >
                  <CheckCircle2 size={50} strokeWidth={2.5} />
                </motion.div>
                
                <motion.h2 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent drop-shadow-sm"
                >
                  All the best!
                </motion.h2>
                
                <p className="text-muted text-lg md:text-xl mt-2 font-medium">
                  Taking you to the application page...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <motion.button
        onClick={handleApplyClick}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-purple px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(124,92,252,0.38)]"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        />
        <span className="relative">Apply Job</span>
        <ExternalLink size={15} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.button>
    </>
  );
}
