import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session || !session.user || (session.user as any).role !== 'siswa') {
      return NextResponse.json({ error: 'Unauthorized. Hanya siswa yang dapat menyimpan lowongan.' }, { status: 401 });
    }

    const body = await request.json();
    const { jobId, action } = body;

    if (!jobId || !action) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const userId = session.user.id;
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
