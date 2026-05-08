'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { deleteFromGithub } from '@/lib/github';
import { revalidatePath } from 'next/cache';

function revalidateAll(id?: string) {
  revalidatePath('/berita');
  if (id) revalidatePath(`/berita/${id}`);
  revalidatePath('/berita/[id]', 'page');
  revalidatePath('/', 'layout');
}

export async function addBerita(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const image_url = formData.get('image_url') as string;
  const category = (formData.get('category') as string) || 'Berita';
  const status = formData.get('status') as string;

  if (!title || !excerpt) {
    return { success: false, error: 'Judul dan ringkasan wajib diisi.' };
  }

  const { data, error } = await supabaseAdmin
    .from('berita')
    .insert([{
      title,
      excerpt,
      content,
      image_url: image_url || null,
      category,
      published_at: status === 'published' ? new Date().toISOString() : null,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding berita:', error);
    return { success: false, error: error.message };
  }

  revalidateAll(data?.id);
  return { success: true, data };
}

export async function editBerita(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const image_url = formData.get('image_url') as string;
  const category = (formData.get('category') as string) || 'Berita';
  const status = formData.get('status') as string;
  const existing_published_at = formData.get('existing_published_at') as string;

  if (!id || !title || !excerpt) {
    return { success: false, error: 'ID, judul, dan ringkasan wajib diisi.' };
  }

  // If it was already published, keep the original date. If being published now, set new date.
  const published_at =
    status === 'published'
      ? (existing_published_at || new Date().toISOString())
      : null;

  const { data, error } = await supabaseAdmin
    .from('berita')
    .update({
      title,
      excerpt,
      content,
      image_url: image_url || null,
      category,
      published_at,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error editing berita:', error);
    return { success: false, error: error.message };
  }

  revalidateAll(id);
  return { success: true, data };
}

export async function deleteBerita(id: string) {
  // Get image_url first to delete from GitHub if needed
  const { data: item } = await supabaseAdmin
    .from('berita')
    .select('image_url')
    .eq('id', id)
    .single();

  const { error } = await supabaseAdmin.from('berita').delete().eq('id', id);

  if (error) {
    console.error('Error deleting berita:', error);
    return { success: false, error: error.message };
  }

  // Attempt to delete image from GitHub/JSDelivr CDN
  if (item?.image_url && item.image_url.includes('jsdelivr.net')) {
    try {
      const urlParts = item.image_url.split('@');
      if (urlParts.length > 1) {
        const filePath = urlParts[1].split('/').slice(1).join('/');
        if (filePath) await deleteFromGithub(filePath);
      }
    } catch (err) {
      console.error('Failed to delete image from GitHub (non-fatal):', err);
    }
  }

  revalidateAll(id);
  return { success: true };
}

export async function toggleBeritaStatus(id: string, currentPublishedAt: string | null) {
  const newPublishedAt = currentPublishedAt ? null : new Date().toISOString();

  const { error } = await supabaseAdmin
    .from('berita')
    .update({ published_at: newPublishedAt })
    .eq('id', id);

  revalidateAll(id);
  return { success: true, isPublished: !!newPublishedAt };
}
