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

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
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
      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-8 md:pt-20 lg:pb-40">
        
        {/* LEFT: Content */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start text-left max-w-xl w-full relative z-20">
          <motion.div
            variants={slideLeft}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-muted"
          >
            <Sparkles size={13} className="text-purple" />
            Trusted by {c.stats1} {c.stats1Label} · Updated every {c.stats2} {c.stats2Label}
          </motion.div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl text-foreground whitespace-pre-line">
            {titleLines.map((line: string, i: number) => (
              <motion.span key={i} variants={slideLeft} className={`block ${i === titleLines.length - 1 ? 'text-purple' : ''}`}>
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={slideLeft}
            className="mt-6 max-w-md text-base text-muted sm:text-lg"
          >
            {c.subtitle}
          </motion.p>

          <motion.div variants={slideLeft} className="mt-9 flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/jobs" className="button-glow w-full sm:w-auto text-center rounded-full bg-purple px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,92,252,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]">
              Browse jobs
            </Link>
            <Link href="/categories" className="link-underline w-full sm:w-auto text-center text-sm font-medium text-foreground/80">
              Explore categories
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Image: Hidden on mobile, absolutely positioned on tablet/laptop/desktop */}
      <div className="hidden md:flex absolute inset-0 z-0 items-end justify-end pointer-events-none">
        <img
          src={c.imageUrl || "/images/Hero image.png"}
          alt="Hero Illustration"
          className="h-full w-[75%] lg:w-[65%] xl:w-[60%] object-contain object-right-bottom"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 85%, rgba(0,0,0,0.5) 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, rgba(0,0,0,0.5) 92%, transparent 100%)"
          }}
        />
      </div>
    </section>
  );
}
