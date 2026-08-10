"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteJob(id: string) {
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
