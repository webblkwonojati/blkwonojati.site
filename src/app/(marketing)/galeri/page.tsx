import SectionHeader from "@/components/marketing/SectionHeader";
import { supabaseAdmin } from "@/lib/supabase-admin";
import GaleriGrid from "./GaleriGrid";

export const dynamic = 'force-dynamic';
export const metadata = {
  title: "Galeri Dokumentasi | AgriLearn",
  description: "Koleksi foto kegiatan dan fasilitas di UPT BLK Wonojati."
};

export default async function Galeri() {
  const { data: items, error } = await supabaseAdmin
    .from("galeri")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery items:", error);
  }

  // Get unique categories for the filter
  const categories = ["Semua", ...Array.from(new Set((items || []).map(item => item.category)))];

  return (
    <div className="pt-28 md:pt-32 pb-24 px-6 md:px-12 selection:bg-primary/10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader 
          withBreadcrumbs
          asH1
          badge="Dokumentasi Visual"
          title="Galeri Kegiatan"
          description="Melihat cuplikan proses pelatihan, fasilitas workshop, dan berbagai momen inspiratif di lingkungan UPT BLK Wonojati."
          className="mb-16"
        />

        <GaleriGrid initialItems={items || []} categories={categories} />
      </div>
    </div>
  );
}
