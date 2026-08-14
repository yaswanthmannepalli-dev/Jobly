"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function deleteJob(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  try {
    await prisma.job.delete({ where: { id } });
    revalidatePath("/admin/jobs");
    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete job:", error);
    return { error: "Failed to delete job" };
  }
}
