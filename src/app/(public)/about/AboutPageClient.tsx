"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Users,
  Heart,
  Rocket,
  Globe,
} from "lucide-react";
import Link from "next/link";
import WhyNxt from "@/components/WhyNxt";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const stats = [
  { value: "500+", label: "Curated roles" },
  { value: "120+", label: "Partner companies" },
  { value: "10K+", label: "Monthly visitors" },
  { value: "24h", label: "Refresh cycle" },
];

const values = [
  {
    icon: Target,
    title: "Precision over volume",
    description:
      "We reject 90% of listings. Only roles with clear descriptions, fair compensation, and genuine openings make the cut.",
  },
  {
    icon: Users,
    title: "People-first design",
    description: (
      <>
        No dark patterns, no forced sign-ups, no data harvesting. We built <img src="/images/logo.png" alt="NXT." className="inline h-[14px] w-auto -mt-0.5 mx-0.5" /> as the job board we wished existed.
      </>
    ),
  },
  {
    icon: Heart,
    title: "Transparency always",
    description:
      "Every listing shows salary ranges, work modes, and real company details. No surprises after you apply.",
  },
  {
    icon: Rocket,
    title: "Speed matters",
    description:
      "Our platform loads in under a second. Search, filter, and apply without waiting for bloated pages to render.",
  },
  {
    icon: Globe,
    title: "Built for India",
    description:
      "Roles from Bangalore to Hyderabad, Mumbai to Remote — we focus on the companies and cities driving India's tech boom.",
  },
  {
    icon: Sparkles,
    title: "Always evolving",
    description:
      "We ship improvements weekly. New filters, better recommendations, and smarter categories — all based on your feedback.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The frustration",
    description:
      "Our founders spent weeks scrolling through cluttered job boards filled with expired posts, irrelevant roles, and aggressive upsells. There had to be a better way.",
  },
  {
    year: "2024",
    title: "The prototype",
    description: (
      <>
        A weekend hackathon turned into an obsession. The first version of <img src="/images/logo.png" alt="NXT." className="inline h-[14px] w-auto -mt-0.5 mx-0.5" /> launched with just 30 hand-picked roles — and people loved the simplicity.
      </>
    ),
  },
  {
    year: "2025",
    title: "The growth",
    description: (
      <>
        Word spread. Within months, thousands of professionals were using <img src="/images/logo.png" alt="NXT." className="inline h-[14px] w-auto -mt-0.5 mx-0.5" /> daily. Companies started reaching out to be listed. We kept saying no to anything that felt like noise.
      </>
    ),
  },
  {
    year: "Today",
    title: "The mission continues",
    description: (
      <>
        <img src="/images/logo.png" alt="NXT." className="inline h-[14px] w-auto -mt-0.5 mr-0.5" /> now serves 10,000+ monthly visitors with 500+ curated roles across 6 categories. And we’re just getting started.
      </>
    ),
  },
];

import TypingHeading from "@/components/TypingHeading";

export default function AboutPageClient() {
  return (
    <main>
      {/* Full-bleed Hero Section */}
      <section className="relative w-full min-h-[480px] md:min-h-[550px] overflow-hidden flex flex-col justify-end px-6 py-12 sm:px-12 md:px-20 bg-background">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Aboutus page png.png"
            alt="About Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130d26]/95 via-[#130d26]/60 to-transparent" />
        </div>

        {/* Content */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <TypingHeading
            text="We believe job hunting shouldn't feel like a job."
            as="h1"
            speed={35}
            className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl text-white"
          />

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm text-white/85 sm:text-base leading-relaxed"
          >
            Built to cut the noise. Only roles worth your time.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-semibold text-purple sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How it all started</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            From a weekend hack to thousands of daily users.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-line sm:left-1/2 sm:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-10 flex items-start gap-6 sm:gap-12 ${
                i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-purple bg-background sm:left-1/2" />

              {/* Content Card */}
              <div
                className={`ml-10 flex-1 rounded-[5px] border border-line bg-surface p-5 sm:ml-0 ${
                  i % 2 === 0 ? "sm:mr-[52%]" : "sm:ml-[52%]"
                }`}
              >
                <span className="inline-block rounded-[6px] bg-purple-tint px-3 py-1 text-xs font-semibold text-purple">
                  {item.year}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed text-justify">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-surface/60">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What we stand for</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Six principles that guide every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="rounded-[5px] border border-line bg-surface p-6 transition-colors duration-150 hover:border-purple/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[5px] border border-line bg-purple-tint">
                  <v.icon size={20} className="text-purple" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed text-justify">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NXT. */}
      <WhyNxt />

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden bg-surface/50 py-12 sm:py-16 my-8">
        {/* Background Gradient Blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-tint/60 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
              Your next role awaits
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted leading-relaxed">
              Thousands of professionals already made the switch.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/jobs"
                className="rounded-[6px] bg-purple px-8 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-purple/90 active:scale-[0.98]"
              >
                Start exploring
              </Link>
              <Link
                href="/categories"
                className="rounded-[6px] border border-line bg-surface px-8 py-3 text-sm font-medium text-foreground transition-colors duration-150 hover:border-purple/40"
              >
                View categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
