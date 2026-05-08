import nextDynamic from "next/dynamic";
import SectionHeader from "@/components/marketing/SectionHeader";
import { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Dynamic import to reduce initial JS payload
const BeritaClient = nextDynamic(() => import("./BeritaClient"));

export const metadata: Metadata = {
  title: "Berita & Artikel",
  description:
    "Kabar terbaru, inovasi, dan wawasan seputar dunia pelatihan dan industri dari UPT BLK Wonojati.",
  openGraph: {
    title: "Berita & Artikel | UPT BLK Wonojati",
    description:
      "Kabar terbaru, inovasi, dan wawasan seputar dunia pelatihan dan industri dari UPT BLK Wonojati.",
  },
};

export const dynamic = 'force-dynamic';

export default async function BeritaPage() {
  // Fetch published news AND distinct categories in parallel
  const [newsResult, categoryResult] = await Promise.all([
    supabaseAdmin
      .from("berita")
      .select("id, title, excerpt, image_url, category, published_at, created_at")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false }),
    supabaseAdmin
      .from("berita")
      .select("category")
      .not("published_at", "is", null),
  ]);

  const news = newsResult.data || [];

  // Derive unique categories for filter pills
  const categories = Array.from(
    new Set((categoryResult.data || []).map((r) => r.category).filter(Boolean))
  ) as string[];

  const hero = news[0] ?? null;
  const rest = news.slice(1);

  return (
    <main className="flex-1 bg-transparent min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            withBreadcrumbs
            badge="Artikel"
            title="Berita Terbaru"
            description="Informasi kegiatan dan inovasi di lingkungan BLK Wonojati."
            className="mb-12"
          />

          {hero ? (
            <BeritaClient hero={hero} rest={rest} categories={categories} />
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-4xl text-slate-300 block mb-4">
                newspaper
              </span>
              <h3 className="text-lg font-bold text-slate-900">Belum Ada Berita</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">
                Kami akan segera mempublikasikan informasi terbaru di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
