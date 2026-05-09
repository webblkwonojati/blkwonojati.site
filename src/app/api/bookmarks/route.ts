import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    // Role-based check via Clerk metadata
    const client = await clerkClient();
    const user = await client.users.getUser(clerkUserId);
    const role = user.publicMetadata?.role;

    if (role !== 'siswa' && role !== 'admin' && role !== 'super_admin') {
       // Optional: adjust logic if only siswa can bookmark
    }

    const body = await request.json();
    const { jobId, action } = body;

    if (!jobId || !action) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const userId = clerkUserId;
    // We use the existing admin client
    
    if (action === 'bookmark') {
      const { error } = await supabaseAdmin
        .from('bookmarks')
        .insert({ user_id: userId, job_id: jobId });

      if (error && error.code !== '23505') { // Ignore unique violation if already bookmarked
        console.error('Bookmark error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Berhasil disimpan' });
    } else if (action === 'unbookmark') {
      const { error } = await supabaseAdmin
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('job_id', jobId);

      if (error) {
        console.error('Unbookmark error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Dihapus dari simpang' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
