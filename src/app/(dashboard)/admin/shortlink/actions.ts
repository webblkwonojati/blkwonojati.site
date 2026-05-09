"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getShortlinks() {
  const { data, error } = await supabaseAdmin
    .from("shortlinks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching shortlinks:", error);
    return [];
  }
  return data;
}

export async function saveShortlink(payload: { code: string; target_url: string }, id?: string) {
  try {
    // Basic validation
    if (!payload.code || !payload.target_url) {
      return { success: false, error: "Code dan Target URL wajib diisi." };
    }

    // Ensure code has no spaces
    const cleanCode = payload.code.trim().replace(/\s+/g, '-').toLowerCase();
    
    let result;
    if (id) {
      result = await supabaseAdmin
        .from("shortlinks")
        .update({ code: cleanCode, target_url: payload.target_url })
        .eq("id", id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from("shortlinks")
        .insert({ code: cleanCode, target_url: payload.target_url })
        .select()
        .single();
    }

    if (result.error) throw result.error;

    revalidatePath("/admin/shortlink");
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Save Shortlink Error:", error);
    // Handle unique constraint violation
    if (error.code === '23505') {
      return { success: false, error: "Kode shortlink sudah digunakan." };
    }
    return { success: false, error: error.message };
  }
}

export async function deleteShortlink(id: string) {
  try {
    const { error } = await supabaseAdmin.from("shortlinks").delete().eq("id", id);
    if (error) throw error;
    
    revalidatePath("/admin/shortlink");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Shortlink Error:", error);
    return { success: false, error: error.message };
  }
}
