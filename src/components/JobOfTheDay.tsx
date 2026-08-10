"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Job } from "@/lib/types";
import MagneticArrow from "@/components/MagneticArrow";

export default function JobOfTheDay({ job }: { job: Job | undefined }) {
  if (!job) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="glass-card hover-lift relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-purple-tint via-white to-surface p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple">
              Editor&rsquo;s pick
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              The role we&rsquo;d apply to ourselves.
            </h2>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-line">
                <Image
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  width={28}
                  height={28}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">
                  {job.title}
                </p>
                <p className="text-sm text-muted">
                  {job.company} · {job.location}
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-md rounded-2xl bg-white/70 p-4 ring-1 ring-line">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Why this stands out
              </p>
              <p className="mt-1.5 text-sm text-foreground/80">
                {job.description.split(".")[0]}.
              </p>
            </div>
          </div>

          <Link
            href={`/jobs/${job.id}`}
            className="group/row flex items-center gap-3 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-[0_10px_30px_rgba(90,60,200,0.12)] ring-1 ring-line transition-transform hover:scale-[1.02] lg:self-center"
          >
            View role
            <MagneticArrow size={30} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
