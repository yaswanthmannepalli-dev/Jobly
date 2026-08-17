import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { path, jobId } = await req.json();
    const userAgent = req.headers.get("user-agent")?.toLowerCase() || "";

    if (!path || userAgent.includes("bot") || userAgent.includes("spider") || userAgent.includes("crawl")) {
      return NextResponse.json({ ok: true });
    }

    // Database insert
    await prisma.pageVisit.create({
      data: {
        path,
        ...(jobId && { jobId }),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to record visit:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
