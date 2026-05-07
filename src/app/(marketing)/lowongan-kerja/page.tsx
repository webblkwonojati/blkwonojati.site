import { supabaseAdmin } from "@/lib/supabase-admin";
import FilterLowongan from "./FilterLowongan";
import AnimatedLowongan from "./AnimatedLowongan";
import { auth } from "@/auth";
import { Metadata } from "next";
import SectionHeader from "@/components/marketing/SectionHeader";
export const metadata: Metadata = {
  title: "Lowongan Kerja",
  description: "Temukan berbagai peluang karir dari mitra industri UPT BLK Wonojati khusus untuk alumni dan peserta pelatihan.",
};

export const revalidate = 60; // Revalidate every minute instead of force-dynamic for better performance

export default async function LowonganKerja({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const q = params.q || '';
  const kategori = params.kategori || '';
  const tipe = params.tipe || '';
  const lokasi = params.lokasi || '';

  // Start auth and jobs query in parallel
  const authPromise = auth();
  
  // Build query (but don't await yet)
  let query = supabaseAdmin
    .from('lowongan_kerja')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (q) query = query.or(`posisi.ilike.%${q}%,instansi_perusahaan.ilike.%${q}%`);
  if (kategori) query = query.eq('jurusan', kategori);
  if (tipe) query = query.eq('tipe_pekerjaan', tipe);
  if (lokasi) query = query.ilike('lokasi', `%${lokasi}%`);

  // Parallelize auth and jobs
  const [session, { data: jobs, error }] = await Promise.all([authPromise, query]);

  if (error) {
    console.error('Error fetching lowongan_kerja:', error);
  }

  const validJobs = jobs || [];
  const isSiswa = session?.user && (session.user as any).role === 'siswa';

  // Fetch bookmarks if logged in as siswa
  let bookmarkedJobIds: string[] = [];
  if (isSiswa && session?.user?.id) {
    const { data: bookmarks } = await supabaseAdmin
      .from('bookmarks')
      .select('job_id')
      .eq('user_id', session.user.id);

    if (bookmarks) {
      bookmarkedJobIds = bookmarks.map(b => b.job_id);
    }
  }

  return (
    <main className="flex-1 bg-white">
      <section className="pt-32 pb-24 px-6 bg-white">
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
            isLoggedIn={!!session}
            isSiswa={!!isSiswa}
            bookmarkedJobIds={bookmarkedJobIds}
          />
        </div>
      </section>
    </main>
  );
}
