"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero({ content }: { content?: { title: string; subtitle?: string; stats1?: string; stats1Label?: string; stats2?: string; stats2Label?: string; imageUrl?: string } }) {
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
    <section className="relative w-full px-4 sm:px-6 md:px-8 pt-4 pb-8 md:pb-12 bg-background">
      <div className="relative mx-auto max-w-[1400px] w-full min-h-[500px] md:min-h-[600px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-16 group">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Hero image.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Overlay gradients for readability and brand tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#130d26]/90 via-[#130d26]/40 to-transparent" />
          <div className="absolute inset-0 bg-purple/10 mix-blend-overlay" />
        </div>

        {/* Content */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <h1 className="text-3xl leading-[1.1] tracking-tight font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl whitespace-pre-line drop-shadow-sm max-w-3xl">
            {titleLines.map((line: string, i: number) => (
              <motion.span key={i} variants={slideUp} className={`block ${i === titleLines.length - 1 ? 'text-purple-200' : ''}`}>
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto pb-1">
            <Link href="/jobs" className="w-full sm:w-auto text-center rounded-full bg-purple px-6 py-2.5 text-xs md:text-sm font-semibold text-white transition-all hover:bg-white hover:text-purple shadow-lg shadow-purple/20 hover:scale-105 active:scale-95">
              Browse jobs
            </Link>
            <Link href="/categories" className="w-full sm:w-auto text-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 text-xs md:text-sm font-semibold text-white transition-all hover:bg-white/20 active:scale-95">
              Explore categories
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
