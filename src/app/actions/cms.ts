"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { cache } from "react";
import { auth } from "@/auth";

export const getSiteContent = cache(async function getSiteContent<T>(section: string, defaultData: T): Promise<T> {
  return unstable_cache(
    async () => {
      try {
        const content = await prisma.siteContent.findUnique({
          where: { section }
        });
        
        if (content && content.data) {
          return JSON.parse(content.data);
        }
      } catch (error) {
        console.error(`Failed to fetch CMS content for ${section}:`, error);
      }
      return defaultData;
    },
    [`cms-content-${section}`],
    { revalidate: 300, tags: ["cms", `cms-${section}`] }
  )();
});

export async function updateSiteContent<T>(section: string, data: T) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  try {
    await prisma.siteContent.upsert({
      where: { section },
      update: { data: JSON.stringify(data) },
      create: { section, data: JSON.stringify(data) }
    });
    
    // Revalidate the home page so changes show up instantly
    revalidatePath("/");
    
    return { success: true, message: "Content saved successfully!" };
  } catch (error) {
    console.error(`Failed to update CMS content for ${section}:`, error);
    return { error: "Failed to save content. Please try again." };
  }
}
