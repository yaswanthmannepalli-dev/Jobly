import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Basic security: check for a valid cron secret
    const authHeader = req.headers.get("authorization");
    if (
      process.env.CRON_SECRET && 
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    
    // Calculate the date 30 days ago for the default expiration
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Delete jobs that have explicitly expired, or have no expiry and are older than 30 days
    const result = await prisma.job.deleteMany({
      where: {
        OR: [
          {
            deadline: {
              lt: now, // Deadline is in the past
            },
          },
          {
            deadline: null,
            postedAt: {
              lt: thirtyDaysAgo, // No deadline set, but posted more than 30 days ago
            },
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.count} expired jobs.`,
      deletedCount: result.count,
    });
  } catch (error: unknown) {
    console.error("Failed to run cron job cleanup:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
