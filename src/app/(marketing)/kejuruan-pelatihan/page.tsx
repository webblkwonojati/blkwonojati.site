import { supabaseAdmin } from "@/lib/supabase-admin";
import { Metadata } from "next";
import KejuruanClient from "./KejuruanClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Kejuruan Pelatihan",
  description: "Daftar lengkap kejuruan pelatihan keterampilan kerja di UPT BLK Wonojati yang siap kerja.",
  openGraph: {
    title: "Kejuruan Pelatihan | UPT BLK Wonojati",
    description: "Daftar lengkap kejuruan pelatihan keterampilan kerja di UPT BLK Wonojati yang siap kerja.",
    images: [{ url: "/BLK-wonojati.webp", width: 1200, height: 630, alt: "BLK Wonojati" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kejuruan Pelatihan | UPT BLK Wonojati",
    description: "Daftar lengkap kejuruan pelatihan keterampilan kerja di UPT BLK Wonojati yang siap kerja.",
    images: ["/BLK-wonojati.webp"],
  },
};

export default async function KejuruanPage() {
  const { data: programs, error } = await supabaseAdmin
    .from('kejuruan_pelatihan')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching kejuruan:", error);
  }

  return <KejuruanClient initialData={programs || []} />;
}
