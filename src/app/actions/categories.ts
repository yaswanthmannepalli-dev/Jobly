"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { cache } from "react";
import { auth } from "@/auth";

export const getCategories = cache(async function getCategories() {
  return unstable_cache(
    async () => {
      return await prisma.category.findMany({
        orderBy: { createdAt: 'asc' }
      });
    },
    ["categories-list"],
    { revalidate: 300, tags: ["categories"] }
  )();
});

export async function addCategory(name: string, icon: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  try {
    await prisma.category.create({
      data: { name, icon }
    });
    revalidatePath("/");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to add category:", error);
    return { error: "Failed to add category" };
  }
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  
  try {
    await prisma.category.delete({
      where: { id }
    });
    revalidatePath("/");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { error: "Failed to delete category" };
  }
}
