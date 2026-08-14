"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: 'asc' }
  });
}

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
