import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { Job } from "@/lib/types";

import { getSiteContent } from "@/app/actions/cms";
import { getCategories } from "@/app/actions/categories";

export const dynamic = "force-dynamic";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { status: "active" },
    orderBy: { postedAt: "desc" },
  });

  const featuredJob = await prisma.job.findFirst({
    where: { status: "active", featured: true },
    orderBy: { postedAt: "desc" },
  });

  const categories = await getCategories();

  const heroContent = await getSiteContent("hero", {
    title: "Land the career\nyou deserve"
  });

  const newsletterContent = await getSiteContent("newsletter", {
    title: "Never miss a great opportunity",
    subtitle: "One email, once a day. Only the roles worth your time — zero spam, unsubscribe anytime."
  });

  const whyNxtContent = await getSiteContent("whyNxt", {
    title: "Why NXT?",
    points: [
      { title: "Refreshed every 24 hours", text: "Our team reviews and adds new roles daily so you’re never looking at stale listings." },
      { title: "Apply in seconds", text: "No 10-step forms. See a role, click through, and land directly on the company’s application page." },
      { title: "Quality over quantity", text: "We list dozens of hand-picked roles, not thousands of duplicates. Every listing earns its spot." },
      { title: "Zero sign-up required", text: "Browse, filter, and save jobs without creating an account. Your privacy comes first." }
    ]
  });

  // Convert Prisma model fields (JSON strings) to objects matching the Job type
  const parsedJobs: Job[] = jobs.map((job) => ({
    ...job,
    postedAt: job.postedAt.toISOString(),
    deadline: job.deadline ? job.deadline.toISOString() : undefined,
    responsibilities: JSON.parse(job.responsibilities),
    requirements: JSON.parse(job.requirements),
    skills: JSON.parse(job.skills),
  } as unknown as Job));

  const parsedFeatured: Job = featuredJob
    ? ({
        ...featuredJob,
        postedAt: featuredJob.postedAt.toISOString(),
        deadline: featuredJob.deadline ? featuredJob.deadline.toISOString() : undefined,
        responsibilities: JSON.parse(featuredJob.responsibilities),
        requirements: JSON.parse(featuredJob.requirements),
        skills: JSON.parse(featuredJob.skills),
      } as unknown as Job)
    : parsedJobs[0];

  return <HomeClient jobs={parsedJobs} categories={categories} featuredJob={parsedFeatured} heroContent={heroContent} newsletterContent={newsletterContent} whyNxtContent={whyNxtContent} />;
}
