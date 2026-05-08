import nextDynamic from "next/dynamic";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

// Dynamic import for client component
const DetailClient = nextDynamic(() => import("./DetailClient"));

export const dynamic = 'force-dynamic';

export default async function LowonganDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Parallelize auth and data fetching
  const [session, { data: job, error }] = await Promise.all([
    auth(),
    supabaseAdmin
      .from('lowongan_kerja')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()
  ]);

  if (error || !job) {
    notFound();
  }

  // Optimized data preparation for serialization
  const descriptionLines = job.deskripsi?.split('\n').filter((l: string) => l.trim() !== '') || [];
  const qualificationLines = job.kualifikasi?.split('\n').filter((l: string) => l.trim() !== '') || [];

  return (
    <main className="flex-1 px-4 lg:px-6 pt-32 md:pt-40 pb-12 lg:py-20 relative">
      <DetailClient 
        job={job} 
        descriptionLines={descriptionLines} 
        qualificationLines={qualificationLines} 
        session={session} 
      />
    </main>
  );
}
