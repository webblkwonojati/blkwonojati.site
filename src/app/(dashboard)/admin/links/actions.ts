'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// We fetch by username to find profile logic, or we hardcode a single profile for this linktree
// In this case, we'll fetch all links or pass a specific profile ID
export async function getLinks(profileId: string) {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profileId)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error fetching links:', error.message, error.details, error.hint);
    return [];
  }
  return data;
}

export async function addLink(formData: FormData) {
  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  const icon = formData.get('icon') as string;
  const profile_id = formData.get('profile_id') as string;

  const { error } = await supabase
    .from('links')
    .insert([{ title, url, icon, profile_id, is_active: true, order_index: 0 }]);

  if (error) {
    console.error('Error adding link:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/links');
  revalidatePath(`/[username]`, 'page');
  return { success: true };
}

export async function toggleLinkActive(id: string, currentStatus: boolean) {
  const { error } = await supabase
    .from('links')
    .update({ is_active: !currentStatus })
    .eq('id', id);

  if (error) {
    console.error('Error toggling link:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/links');
  revalidatePath(`/[username]`, 'page');
  return { success: true };
}

export async function deleteLink(id: string) {
  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting link:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/links');
  revalidatePath(`/[username]`, 'page');
  return { success: true };
}

export async function editLink(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  const icon = formData.get('icon') as string;

  const { error } = await supabase
    .from('links')
    .update({ title, url, icon })
    .eq('id', id);

  if (error) {
    console.error('Error editing link:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/links');
  revalidatePath(`/[username]`, 'page');
  return { success: true };
}

export async function getProfileByUsername(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    return null;
  }
  return data;
}
export async function getProfileById(id: string) {
  // Check if id is a valid UUID before querying to avoid database errors
  // Clerk user IDs like 'user_...' are not UUIDs
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  
  const query = supabase
    .from('profiles')
    .select('*');
    
  if (isUuid) {
    query.eq('id', id);
  } else {
    // If not a UUID, it might be a Clerk ID stored in a different column 
    // or we might need to query by clerk_id if you have that column
    // For now, let's try to match it as a string if the column allows, 
    // but the error suggests it's a UUID type in DB.
    // Fallback: return null gracefully instead of crashing
    return null;
  }

  const { data, error } = await query.single();

  if (error) {
    // Silently fail if not found to avoid console clutter for uninitialized profiles
    return null;
  }
  return data;
}

import { uploadToGithub } from '@/lib/github';

export async function updateProfile(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const username = formData.get('username') as string;
    const display_name = formData.get('display_name') as string;
    const bio = formData.get('bio') as string;
    let avatar_url = formData.get('avatar_url') as string;
    let background_image = formData.get('background_image') as string;

    const avatarFile = formData.get('avatar_file') as File;
    const bgFile = formData.get('bg_file') as File;

    // Handle Avatar Upload
    if (avatarFile && avatarFile.size > 0 && avatarFile.name !== 'undefined') {
      const uploadResult = await uploadToGithub(avatarFile, 'avatar');
      if (uploadResult) avatar_url = uploadResult.url;
    }

    // Handle Background Upload
    if (bgFile && bgFile.size > 0 && bgFile.name !== 'undefined') {
      const uploadResult = await uploadToGithub(bgFile, 'bg');
      if (uploadResult) background_image = uploadResult.url;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ 
        username, 
        display_name, 
        bio, 
        avatar_url,
        theme_settings: { 
          background_image,
          social_links: {
            instagram: formData.get('instagram') as string,
            whatsapp: formData.get('whatsapp') as string,
            youtube: formData.get('youtube') as string,
            tiktok: formData.get('tiktok') as string,
          }
        }
      })
      .eq('id', id);

    if (error) {
      console.error('❌ Error updating profile in database:', error.message);
      return { success: false, error: error.message };
    }

    revalidatePath('/links');
    revalidatePath(`/${username}`);
    return { success: true };
  } catch (err: any) {
    console.error('❌ Critical error in updateProfile:', err);
    return { success: false, error: 'Connection failed or server busy. Please check your internet and try again.' };
  }
}
