"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

const lineUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero({ content }: { content?: any }) {
  // Fallback defaults in case content is missing
  const c = content || {
    title: "Land the career\nyou deserve",
    subtitle: "Handpicked roles from India's top companies — no spam, no noise. Just opportunities that move your career forward.",
    stats1: "10,000+",
    stats1Label: "professionals",
    stats2: "24",
    stats2Label: "hours",
    imageUrl: "/images/Hero%20image.png"
  };

  const titleLines = c.title.split('\n');

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Image positioned to the right */}
      <div className="absolute inset-0 z-0 flex items-end justify-end pointer-events-none">
        <img
          src={c.imageUrl || "/images/Hero image.png"}
          alt="Hero Illustration"
          className="h-full w-full object-cover object-right-bottom sm:object-right lg:w-[75%] lg:object-contain"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 85%, rgba(0,0,0,0.5) 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, rgba(0,0,0,0.5) 92%, transparent 100%)"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 md:pt-20 lg:pb-40">
        
        {/* LEFT: Content */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start max-w-xl">
          <motion.div
            variants={lineUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-muted"
          >
            <Sparkles size={13} className="text-purple" />
            Trusted by {c.stats1} {c.stats1Label} · Updated every {c.stats2} {c.stats2Label}
          </motion.div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl text-foreground whitespace-pre-line">
            {titleLines.map((line: string, i: number) => (
              <motion.span key={i} variants={lineUp} className={`block ${i === titleLines.length - 1 ? 'text-purple' : ''}`}>
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={lineUp}
            className="mt-6 max-w-md text-base text-muted sm:text-lg"
          >
            {c.subtitle}
          </motion.p>

          <motion.div variants={lineUp} className="mt-9 flex items-center gap-4">
            <Link href="/jobs" className="button-glow rounded-full bg-purple px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,92,252,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]">
              Browse jobs
            </Link>
            <Link href="/categories" className="link-underline text-sm font-medium text-foreground/80">
              Explore categories
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
