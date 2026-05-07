'use server';

import { supabase } from '@/lib/supabase';

export async function trackLowonganView(id: string) {
  if (!id) return { success: false };

  // Use the RPC function for atomic increment if it exists, 
  // otherwise fallback to manual update.
  const { error: rpcError } = await supabase.rpc('increment_views', { job_id: id });
  
  if (rpcError) {
    console.warn('RPC increment_views failed, falling back to manual update:', rpcError.message);
    
    const { data: current, error: fetchError } = await supabase
      .from('lowongan_kerja')
      .select('views_count')
      .eq('id', id)
      .single();

    if (!fetchError) {
      await supabase
        .from('lowongan_kerja')
        .update({ views_count: (current?.views_count || 0) + 1 })
        .eq('id', id);
    }
  }
  
  return { success: true };
}
export async function recordLowonganApply(job_id: string, data: { nik: string, nama: string, email?: string }) {
  if (!job_id || !data.nik) return { success: false, error: 'Data tidak lengkap' };

  const { error } = await supabase
    .from('pelamar_lowongan')
    .insert([{
      job_id,
      nik: data.nik,
      nama: data.nama,
      email: data.email || null,
      created_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('Error recording application:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
