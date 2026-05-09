"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const role = await checkRole();
  if (role !== "super_admin") {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  const response = await client.users.getUserList({
     limit: 100,
  });
  
  return JSON.parse(JSON.stringify(response.data));
}

export async function updateUserRole(userId: string, role: "admin" | "super_admin" | null) {
  const currentRole = await checkRole();
  if (currentRole !== "super_admin") {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: role,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}
