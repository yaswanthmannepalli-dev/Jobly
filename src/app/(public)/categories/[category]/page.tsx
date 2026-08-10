import { capitalize } from "@/lib/utils";
import CategoryPageClient from "./CategoryPageClient";
import { prisma } from "@/lib/prisma";
import { Job } from "@/lib/types";

export const generateMetadata = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const title = `${capitalize(category)} – Jobly`;
  return {
    title,
    description: `Browse ${category} job openings`,
  };
};

import { getCategories } from "@/app/actions/categories";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);

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

  return <CategoryPageClient category={category} initialJobs={parsedJobs} categories={categories} />;
}
