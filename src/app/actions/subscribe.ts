"use server";

import { prisma } from "@/lib/prisma";

export async function subscribeUser(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await prisma.subscriber.create({
      data: { email },
    });
    return { success: true, message: "Successfully subscribed!" };
  } catch (error: unknown) {
    if (error instanceof Error && (error as { code?: string }).code === 'P2002') {
      return { error: "This email is already subscribed." };
    }
    console.error("Subscription error:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
