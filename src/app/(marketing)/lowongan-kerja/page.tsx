import nextDynamic from "next/dynamic";
import { supabaseAdmin } from "@/lib/supabase-admin";
import FilterLowongan from "./FilterLowongan";
import { auth } from "@/auth";
import { Metadata } from "next";
import SectionHeader from "@/components/marketing/SectionHeader";

// Dynamic import for below-the-fold content
const AnimatedLowongan = nextDynamic(() => import("./AnimatedLowongan"));
export const metadata: Metadata = {
  title: "Lowongan Kerja",
  description: "Temukan berbagai peluang karir dari mitra industri UPT BLK Wonojati khusus untuk alumni dan peserta pelatihan.",
};

export const dynamic = 'force-dynamic';

export default async function LowonganKerja({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const q = params.q || '';
  const kategori = params.kategori || '';
  const tipe = params.tipe || '';
  const lokasi = params.lokasi || '';

  // Build query
  let query = supabaseAdmin
    .from('lowongan_kerja')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (q) query = query.or(`posisi.ilike.%${q}%,instansi_perusahaan.ilike.%${q}%`);
  if (kategori) query = query.eq('jurusan', kategori);
  if (tipe) query = query.eq('tipe_pekerjaan', tipe);
  if (lokasi) query = query.ilike('lokasi', `%${lokasi}%`);

  const { data: jobs, error } = await query;

  if (error) {
    console.error('Error fetching lowongan_kerja:', error);
  }

  const validJobs = jobs || [];

  return (
    <main className="flex-1 bg-transparent">
      <section className="pt-32 pb-24 px-6 bg-transparent">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            withBreadcrumbs
            badge="Filter & Explore"
            title="Peluang Tersedia"
            description="Navigasikan masa depan Anda dengan filter pencarian yang disesuaikan dengan kompetensi Anda."
          />

          <div className="mb-12">
            <FilterLowongan />
          </div>

          <AnimatedLowongan
            jobs={validJobs}
          />
        </div>
      </section>
    </main>
  );
}
