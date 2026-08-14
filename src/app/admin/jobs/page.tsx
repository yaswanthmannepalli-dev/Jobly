import { prisma } from "@/lib/prisma"
import AdminJobsClient from "./AdminJobsClient";

export default async function AdminJobsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const page = Number(searchParams.page) || 1;
  const q = typeof searchParams.q === 'string' ? searchParams.q : "";
  const status = typeof searchParams.status === 'string' ? searchParams.status : "all";
  const limit = 10;
  
  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { company: { contains: q } }
    ];
  }
  if (status && status !== "all") {
    where.status = status;
  }
  
  const totalCount = await prisma.job.count({ where });
  const totalPages = Math.ceil(totalCount / limit);
  
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { postedAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  return (
    <AdminJobsClient 
      jobs={jobs.map(j => ({ ...j, postedAt: j.postedAt.toISOString(), deadline: j.deadline?.toISOString() })) as unknown as { id: string; title: string; company: string; status: string; postedAt: string; featured: boolean; }[]} 
      totalPages={totalPages} 
      currentPage={page} 
      initialQuery={q} 
      initialStatus={status} 
    />
  );
}
