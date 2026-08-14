"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getSiteContent(section: string, defaultData: any) {
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
}

export async function updateSiteContent(section: string, data: any) {
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
