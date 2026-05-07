import Image from "next/image";
import SectionHeader from "@/components/marketing/SectionHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita & Artikel",
  description: "Kabar terbaru, inovasi, dan wawasan seputar dunia pelatihan dan industri dari UPT BLK Wonojati.",
};

export default function Berita() {
  return (
    <main className="flex-1 bg-white min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader 
            withBreadcrumbs
            badge="Arsip Berita"
            title="Laporan & Catatan"
            description="Dokumentasi tertulis mengenai perkembangan teknologi dan kegiatan di lingkungan BLK."
            className="mb-16"
          />
          <div className="grid lg:grid-cols-2 gap-16">
            {[1, 2, 3, 4].map((n, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="aspect-video rounded-3xl overflow-hidden mb-8 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200 group-hover:-translate-y-2 relative">
                 <Image 
                  src={`https://images.unsplash.com/photo-1549${i}00000000000?auto=format&fit=crop&q=80&w=1200`} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={`Ilustrasi berita ${i}: Inovasi Sistem Irigasi Tetes di Laboratorium Wonojati`} 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">Berita • 12 Maret 2024</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                Inovasi Sistem Irigasi Tetes di Laboratorium Wonojati
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Penelitian terbaru mengenai efisiensi penggunaan air dalam budidaya sayuran modern yang dapat menghemat air hingga 60% dibandingkan metode konvensional...
              </p>
              <button className="text-sm font-bold flex items-center gap-2 text-slate-900 group-hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg">
                Baca Selengkapnya
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
    </main>
  );
}
