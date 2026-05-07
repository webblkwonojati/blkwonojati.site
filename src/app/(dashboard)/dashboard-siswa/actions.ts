"use server";

import { uploadToGithub } from "@/lib/github";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function uploadCVAction(formData: FormData, userId: string) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("File tidak ditemukan");

    // Upload to GitHub
    const result = await uploadToGithub(file, file.name);
    const cvUrl = result.url;

    // Update Profile in DB
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ cv_url: cvUrl })
      .eq("id", userId);

    if (error) throw error;

    revalidatePath("/dashboard-siswa");
    return { success: true, url: cvUrl };
  } catch (error: any) {
    console.error("Upload CV Action Error:", error);
    return { success: false, error: error.message };
  }
}
