import { prisma } from "@/lib/prisma";
import SavedJobsClient from "@/components/SavedJobsClient";
import { Job } from "@/lib/types";

export const metadata = {
  title: "Saved Jobs – NXT",
  description: "View your saved job listings",
};

export const dynamic = "force-dynamic";

export default async function SavedJobsPage() {
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

  return <SavedJobsClient initialJobs={parsedJobs} />;
}
