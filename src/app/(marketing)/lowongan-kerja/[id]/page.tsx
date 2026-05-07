import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import DetailClient from "./DetailClient";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function LowonganDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  
  const { data: job, error } = await supabase
    .from('lowongan_kerja')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    notFound();
  }

  // Handle new lines for description and requirements
  const descriptionLines = job.deskripsi.split('\n').filter((l: string) => l.trim() !== '');
  const qualificationLines = job.kualifikasi.split('\n').filter((l: string) => l.trim() !== '');

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md ">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo-blk.png" className="w-8 h-8 object-contain" alt="Logo" />
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-primary transition-colors">UPT BLK WONOJATI</Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/">Beranda</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/profil">Profil Lembaga</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/kejuruan-pelatihan">Kejuruan Pelatihan</Link>
            <Link className="text-sm font-medium text-primary transition-colors" href="/lowongan-kerja">Lowongan Kerja</Link>
          </nav>
          <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-primary/90 transition-all shadow-md">
            Pendaftaran
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 lg:px-6 py-12 lg:py-20 relative">
        <DetailClient job={job} descriptionLines={descriptionLines} qualificationLines={qualificationLines} session={session} />
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} UPT BLK Wonojati. Pusat Karier & Pelatihan.</p>
      </footer>
    </div>
  );
}
