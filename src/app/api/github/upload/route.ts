
import { NextRequest, NextResponse } from 'next/server';
import { uploadToGithub } from '@/lib/github';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await uploadToGithub(file, file.name);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('GitHub Upload API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
