"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import CategorySection from "@/components/CategorySection";
import JobOfTheDay from "@/components/JobOfTheDay";
import WhyNxt from "@/components/WhyNxt";
import WhatsAppSection from "@/components/WhatsAppSection";
import Newsletter from "@/components/Newsletter";
import LogoMarquee from "@/components/LogoMarquee";
import { Job, JobCategory } from "@/lib/types";
import { motion } from "framer-motion";

function HomeClientContent({ jobs, categories, featuredJob, heroContent, newsletterContent, whyNxtContent }: { jobs: Job[], categories: any[], featuredJob?: Job, heroContent?: any, newsletterContent?: any, whyNxtContent?: any }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs
      .filter((j) =>
        q
          ? j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.location.toLowerCase().includes(q)
          : true
      )
  }, [jobs, query]);

  return (
    <>
      <Hero content={heroContent} />

      <LogoMarquee />

      <section id="jobs" className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-8 flex flex-col gap-2"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Fresh Opportunities, Every Day
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Hand-verified roles from companies that are actually hiring — never recycled listings.
          </p>
        </motion.div>

        <JobList jobs={filtered.slice(0, 8)} hidePagination={true} />
      </section>

      <CategorySection jobs={jobs} categories={categories} />

      <JobOfTheDay job={featuredJob} />

      <WhyNxt content={whyNxtContent} />

      <WhatsAppSection />

      <Newsletter content={newsletterContent} />
    </>
  );
}

export default function HomeClient({ jobs, categories, featuredJob, heroContent, newsletterContent, whyNxtContent }: { jobs: Job[], categories: any[], featuredJob?: Job, heroContent?: any, newsletterContent?: any, whyNxtContent?: any }) {
  return (
    <Suspense fallback={null}>
      <HomeClientContent jobs={jobs} categories={categories} featuredJob={featuredJob} heroContent={heroContent} newsletterContent={newsletterContent} whyNxtContent={whyNxtContent} />
    </Suspense>
  );
}
