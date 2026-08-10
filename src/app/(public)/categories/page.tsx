import Link from "next/link";
import { Job } from "@/lib/types";
import JobList from "@/components/JobList";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/app/actions/categories";

export const metadata = {
  title: "Categories – Jobly",
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

  const latestJobs = parsedJobs.slice(0, 5);
  const categories = await getCategories();

  return (
    <main className="flex flex-col items-center gap-8 py-12">
      <section className="w-full max-w-6xl px-5 sm:px-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          Categories
        </h1>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {categories.map((cat) => {
            const count = parsedJobs.filter((j: Job) => j.category === cat.name).length;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.name.toLowerCase()}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-white p-5 transition-colors hover:border-purple hover:shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted group-hover:text-purple-dark">{count} open roles</p>
                </div>
                <ChevronRight size={18} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-purple" />
              </Link>
            );
          })}
        </div>
      </section>
      {/* Latest Jobs */}
      <section className="w-full max-w-6xl px-5 sm:px-8">
        <h2 className="mt-12 text-2xl font-bold">Latest Jobs</h2>
        <JobList jobs={latestJobs} hidePagination={true} />
      </section>
    </main>
  );
}
