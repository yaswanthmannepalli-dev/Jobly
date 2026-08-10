"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackPageVisit(path: string, jobId?: string) {
  try {
    const headerList = await headers();
    const userAgent = headerList.get("user-agent")?.toLowerCase() || "";
    
    // Ignore obvious bots
    if (userAgent.includes("bot") || userAgent.includes("spider") || userAgent.includes("crawl")) {
      return;
    }

    await prisma.pageVisit.create({
      data: {
        path,
        ...(jobId && { jobId })
      }
    });
  } catch (error) {
    console.error("Failed to track visit", error);
  }
}
