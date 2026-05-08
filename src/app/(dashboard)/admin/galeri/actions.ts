'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function addGaleri(data: { title: string, image_url: string, category: string }) {
  const { data: newItem, error } = await supabaseAdmin
    .from('galeri')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error adding galeri:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/galeri');
  revalidatePath('/admin/galeri');
  return { success: true, data: newItem };
}

export async function deleteGaleri(id: string) {
  const { error } = await supabaseAdmin
    .from('galeri')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting galeri:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/galeri');
  revalidatePath('/admin/galeri');
  return { success: true };
}
