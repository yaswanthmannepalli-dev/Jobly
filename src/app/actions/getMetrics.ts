"use server";

import { prisma } from "@/lib/prisma";
import { subDays, startOfDay, format } from "date-fns";

export async function getDashboardMetrics() {
  const totalJobs = await prisma.job.count();
  const activeJobs = await prisma.job.count({ where: { status: "active" } });
  
  // Get visits for the last 7 days
  const sevenDaysAgo = startOfDay(subDays(new Date(), 6));
  
  const recentVisits = await prisma.pageVisit.findMany({
    where: {
      visitedAt: { gte: sevenDaysAgo }
    }
  });

  // Group visits by day
  const visitsByDay = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, "MMM dd");
    const count = recentVisits.filter(v => format(v.visitedAt, "MMM dd") === dateStr).length;
    return { date: dateStr, visitors: count };
  });

  const totalVisits = await prisma.pageVisit.count();
  const visitsToday = recentVisits.filter(v => format(v.visitedAt, "MMM dd") === format(new Date(), "MMM dd")).length;

  // Get Top Jobs by Views
  const topVisits = await prisma.pageVisit.groupBy({
    by: ['jobId'],
    _count: { jobId: true },
    where: { jobId: { not: null } },
    orderBy: { _count: { jobId: 'desc' } },
    take: 5
  });

  const topJobs = await Promise.all(
    topVisits.map(async (v) => {
      const job = await prisma.job.findUnique({ where: { id: v.jobId! }, select: { title: true, company: true } });
      return {
        id: v.jobId,
        title: job?.title || 'Unknown Job',
        company: job?.company || 'Unknown',
        views: v._count.jobId
      };
    })
  );

  return {
    totalJobs,
    activeJobs,
    totalVisits,
    visitsToday,
    visitsChartData: visitsByDay,
    topJobs
  };
}
