"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import TypingHeading from "@/components/TypingHeading";

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

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
  const c = content || {
    title: "Land the career you deserve",
    subtitle: "Curated roles. Zero noise. Just your next opportunity.",
    stats1: "10,000+",
    stats1Label: "professionals",
    stats2: "24",
    stats2Label: "hours",
    imageUrl: "/images/Hero%20image.png"
  };

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[550px] overflow-hidden flex flex-col justify-end px-6 py-12 sm:px-12 md:px-20 group bg-background">
      {/* Lanyard 3D Badge Overlay - Isolated to Hero Section Only */}
      <div className="absolute top-[-20px] right-6 z-20 w-[240px] h-[550px] pointer-events-none hidden lg:block">
        <div className="w-full h-full">
          <Lanyard 
            position={[0, 0, 15]} 
            gravity={[0, -40, 0]} 
            frontImage="/images/Lanyard Card png.png"
            backImage="/images/Lanyard Card png.png"
            lanyardImage="/assets/lanyard/nxt-band.svg"
          />
        </div>
      </div>

      {/* Full-bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Hero image.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Overlay for readability and brand tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#130d26]/95 via-[#130d26]/60 to-transparent" />
      </div>

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
        <div className="max-w-3xl">
          <TypingHeading 
            text={c.title}
            as="h1"
            speed={40}
            className="text-3xl leading-[1.15] tracking-tight font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto pb-1">
          <Link href="/jobs" className="w-full sm:w-auto text-center rounded-[6px] bg-purple px-6 py-2.5 text-xs md:text-sm font-medium text-white transition-colors duration-150 hover:bg-white hover:text-purple active:scale-95">
            Browse jobs
          </Link>
          <Link href="/categories" className="w-full sm:w-auto text-center rounded-[6px] bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 text-xs md:text-sm font-medium text-white transition-colors duration-150 hover:bg-white/20 active:scale-95">
            Explore categories
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
