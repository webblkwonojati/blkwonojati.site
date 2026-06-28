import nextDynamic from "next/dynamic";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";

import { Metadata } from "next";

// Dynamic import for client component
const DetailClient = nextDynamic(() => import("./DetailClient"));

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: job } = await supabaseAdmin
    .from('lowongan_kerja')
    .select('posisi, perusahaan, deskripsi')
    .eq('id', id)
    .single();

  const title = job ? `Lowongan: ${job.posisi} di ${job.perusahaan}` : 'Lowongan Kerja';
  const description = job?.deskripsi?.substring(0, 150) || 'Daftar lowongan kerja terbaru via UPT BLK Wonojati.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default async function LowonganDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: job, error } = await supabaseAdmin
    .from('lowongan_kerja')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error || !job) {
    notFound();
  }

  // Optimized data preparation for serialization
  const descriptionLines = job.deskripsi?.split('\n').filter((l: string) => l.trim() !== '') || [];
  const qualificationLines = job.kualifikasi?.split('\n').filter((l: string) => l.trim() !== '') || [];

  return (
    <main className="flex-1 px-4 lg:px-6 pt-32 md:pt-40 pb-12 lg:py-20 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.posisi,
            "description": job.deskripsi,
            "datePosted": job.created_at || "2024-01-01",
            "hiringOrganization": {
              "@type": "Organization",
              "name": job.perusahaan
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": job.lokasi || "Malang"
              }
            }
          })
        }}
      />
      <DetailClient 
        job={job} 
        descriptionLines={descriptionLines} 
        qualificationLines={qualificationLines} 
      />
    </main>
  );
}
