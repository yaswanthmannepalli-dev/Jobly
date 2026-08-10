const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const whyNxtContent = await prisma.siteContent.findUnique({
    where: { section: 'whyNxt' }
  });
  console.log("\nWHYNXT CONTENT:");
  console.log(whyNxtContent ? whyNxtContent.data : "Not found in DB");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
