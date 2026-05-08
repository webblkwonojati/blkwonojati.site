"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function saveKejuruan(payload: any, id?: string) {
  try {
    let result;
    
    // Generate slug from title if not present
    let slug = payload.slug;
    if (!slug) {
      slug = payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      // Add random string to ensure uniqueness if creating new
      if (!id) {
        slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
      }
    }

    const dataToSave = {
      ...payload,
      slug,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      result = await supabaseAdmin
        .from('kejuruan_pelatihan')
        .update(dataToSave)
        .eq('id', id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from('kejuruan_pelatihan')
        .insert(dataToSave)
        .select()
        .single();
    }

    if (result.error) throw result.error;

    // Revalidate paths so public views update immediately
    revalidatePath("/kejuruan-pelatihan");
    if (id) {
      revalidatePath(`/kejuruan-pelatihan/${slug}`);
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Save Kejuruan Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteKejuruan(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from('kejuruan_pelatihan')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    revalidatePath("/kejuruan-pelatihan");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Kejuruan Error:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleKejuruanStatus(id: string, is_active: boolean) {
  try {
    const { data, error } = await supabaseAdmin
      .from('kejuruan_pelatihan')
      .update({ is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath("/kejuruan-pelatihan");
    revalidatePath(`/kejuruan-pelatihan/${data.slug}`);
    return { success: true, data };
  } catch (error: any) {
    console.error("Toggle Kejuruan Error:", error);
    return { success: false, error: error.message };
  }
}
