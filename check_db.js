const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const jobs = await prisma.job.findMany({
    select: { id: true, title: true, location: true, salaryMin: true, salaryMax: true }
  });
  console.log("Total jobs:", jobs.length);
  console.log("Locations:", Array.from(new Set(jobs.map(j => j.location))));
  console.log("Sample jobs:", JSON.stringify(jobs.slice(0, 5), null, 2));
}

run().finally(() => prisma.$disconnect());
