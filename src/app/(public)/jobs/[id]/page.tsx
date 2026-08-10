import { notFound } from "next/navigation";
import JobDetailsClient from "@/components/JobDetailsClient";
import { prisma } from "@/lib/prisma";
import { Job } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const dbJob = await prisma.job.findUnique({
    where: { id },
  });

  if (!dbJob) notFound();

  const parsedJob: Job = {
    ...dbJob,
    postedAt: dbJob.postedAt.toISOString(),
    deadline: dbJob.deadline ? dbJob.deadline.toISOString() : undefined,
    responsibilities: JSON.parse(dbJob.responsibilities),
    requirements: JSON.parse(dbJob.requirements),
    skills: JSON.parse(dbJob.skills),
  } as unknown as Job;

  return <JobDetailsClient job={parsedJob} />;
}
