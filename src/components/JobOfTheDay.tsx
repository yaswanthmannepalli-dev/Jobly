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
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative overflow-hidden rounded-[5px] border border-line bg-surface p-6 sm:p-8"
      >
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple">
              Editor&rsquo;s pick
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              The role we&rsquo;d apply to ourselves.
            </h2>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[5px] bg-surface border border-line">
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

            <div className="mt-6 max-w-md rounded-[5px] bg-surface/60 p-4 border border-line">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Why this stands out
              </p>
              <p className="mt-1.5 text-sm text-foreground/80 text-justify leading-relaxed">
                {job.description.split(".")[0]}.
              </p>
            </div>
          </div>

          <Link
            href={`/jobs/${job.id}`}
            className="group/row flex items-center gap-3 self-start rounded-[6px] border border-line bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors duration-150 hover:border-purple/40 hover:bg-surface/80 lg:self-center"
          >
            View role
            <MagneticArrow size={28} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
