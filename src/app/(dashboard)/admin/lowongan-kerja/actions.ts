'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { deleteFromGithub } from '@/lib/github';

export async function getLowongan() {
  const { data, error } = await supabase
    .from('lowongan_kerja')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error fetching lowongan:', error.message, error.details);
    return [];
  }
  return data;
}

export async function addLowongan(formData: FormData) {
  const posisi = formData.get('posisi') as string;
  const instansi_perusahaan = formData.get('instansi_perusahaan') as string;
  const lokasi = formData.get('lokasi') as string;
  const tipe_pekerjaan = formData.get('tipe_pekerjaan') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const kualifikasi = formData.get('kualifikasi') as string;
  const link_pendaftaran = formData.get('link_pendaftaran') as string;
  const batas_lamaran_raw = formData.get('batas_lamaran') as string;
  const poster_url = formData.get('poster_url') as string;
  const jurusan = formData.get('jurusan') as string;

  const batas_lamaran = batas_lamaran_raw ? new Date(batas_lamaran_raw).toISOString() : null;

  const { error } = await supabase
    .from('lowongan_kerja')
    .insert([{ 
      posisi, instansi_perusahaan, lokasi, tipe_pekerjaan, deskripsi, 
      kualifikasi, link_pendaftaran, is_active: true, batas_lamaran, poster_url, jurusan 
    }]);

  if (error) {
    console.error('Error adding lowongan:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/lowongan-kerja');
  return { success: true };
}

export async function toggleLowonganActive(id: string, currentStatus: boolean) {
  const { error } = await supabase
    .from('lowongan_kerja')
    .update({ is_active: !currentStatus })
    .eq('id', id);

  if (error) {
    console.error('Error toggling lowongan:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/lowongan-kerja');
  return { success: true };
}

export async function editLowongan(formData: FormData) {
  const id = formData.get('id') as string;
  const posisi = formData.get('posisi') as string;
  const instansi_perusahaan = formData.get('instansi_perusahaan') as string;
  const lokasi = formData.get('lokasi') as string;
  const tipe_pekerjaan = formData.get('tipe_pekerjaan') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const kualifikasi = formData.get('kualifikasi') as string;
  const link_pendaftaran = formData.get('link_pendaftaran') as string;
  const batas_lamaran_raw = formData.get('batas_lamaran') as string;
  const poster_url = formData.get('poster_url') as string;
  const jurusan = formData.get('jurusan') as string;

  const batas_lamaran = batas_lamaran_raw ? new Date(batas_lamaran_raw).toISOString() : null;

  const { error } = await supabase
    .from('lowongan_kerja')
    .update({ 
      posisi, instansi_perusahaan, lokasi, tipe_pekerjaan, deskripsi, 
      kualifikasi, link_pendaftaran, batas_lamaran, poster_url, jurusan 
    })
    .eq('id', id);

  if (error) {
    console.error('Error editing lowongan:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/lowongan-kerja');
  return { success: true };
}

export async function deleteLowongan(id: string) {
  // Get the poster_url first to delete from GitHub
  const { data: job } = await supabase
    .from('lowongan_kerja')
    .select('poster_url')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('lowongan_kerja')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lowongan:', error);
    return { success: false, error: error.message };
  }

  // If there's a poster_url, try to delete from GitHub
  if (job?.poster_url && job.poster_url.includes('jsdelivr.net')) {
    try {
      // Extract path from JSDelivr URL: https://cdn.jsdelivr.net/gh/owner/repo@branch/path
      // We need everything after the branch
      const urlParts = job.poster_url.split('@');
      if (urlParts.length > 1) {
        const pathWithBranch = urlParts[1];
        const filePath = pathWithBranch.split('/').slice(1).join('/');
        if (filePath) {
          await deleteFromGithub(filePath);
        }
      }
    } catch (err) {
      console.error('Failed to delete image from GitHub:', err);
      // We don't fail the whole operation if GitHub delete fails
    }
  }

  revalidatePath('/lowongan-kerja');
  return { success: true };
}


export async function trackLowonganView(id: string) {
  const { error } = await supabase.rpc('increment_lowongan_views', { job_id: id });
  
  if (error) {
    // Fallback if RPC failed
    const { data: current } = await supabase.from('lowongan_kerja').select('views_count').eq('id', id).single();
    await supabase.from('lowongan_kerja').update({ views_count: (current?.views_count || 0) + 1 }).eq('id', id);
  }
  
  return { success: true };
}
