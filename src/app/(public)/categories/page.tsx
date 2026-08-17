import { Job } from "@/lib/types";
import JobList from "@/components/JobList";
import CategoriesClient from "./CategoriesClient";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/app/actions/categories";

export const metadata = {
  title: "Categories – NXT.",
  description: "Browse job categories",
};

export const dynamic = "force-dynamic";

export default async function CategoriesIndex() {
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

  return (
    <main className="flex flex-col items-center gap-8 py-12">
      <section className="w-full max-w-6xl px-5 sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-1 text-sm text-muted">Find roles by what you do best.</p>
        <CategoriesClient categories={categories} parsedJobs={parsedJobs} />
      </section>
      {/* All Jobs */}
      <section className="w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">All Jobs</h2>
        <div className="mt-4">
          <JobList jobs={parsedJobs} />
        </div>
      </section>
    </main>
  );
}
