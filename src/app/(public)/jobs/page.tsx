import JobsPageClient from "@/components/JobsPageClient";
import { prisma } from "@/lib/prisma";
import { Job } from "@/lib/types";

export const metadata = {
  title: "Jobs – NXT",
  description: "Browse all job listings",
};

export const dynamic = "force-dynamic";

import { getCategories } from "@/app/actions/categories";

export default async function JobsPage(props: { searchParams: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams;
  const dbJobs = await prisma.job.findMany({
    where: { status: "active" },
    orderBy: { postedAt: "desc" },
  });

  const parsedJobs: Job[] = dbJobs.map((job) => ({
    ...job,
    postedAt: job.postedAt.toISOString(),
    deadline: job.deadline ? job.deadline.toISOString() : undefined,
    responsibilities: JSON.parse(job.responsibilities),
    requirements: JSON.parse(job.requirements),
    skills: JSON.parse(job.skills),
  } as unknown as Job));

  const categories = await getCategories();

  return <JobsPageClient initialJobs={parsedJobs} categories={categories} initialSearch={searchParams.search || ""} />;
}
