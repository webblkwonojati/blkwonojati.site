import SectionHeader from "@/components/marketing/SectionHeader";

export default function Galeri() {
  return (
    <main className="flex-1 bg-white w-full min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader 
            withBreadcrumbs
            badge="Moment & Aktivitas"
            title="Koleksi Dokumentasi"
            description="Melihat cuplikan proses belajar mengajar dan fasilitas nyata di lingkungan Pelatihan."
            className="mb-16"
          />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((img, i) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 shadow-sm transition-all hover:scale-[1.02] cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:shadow-slate-200/50">
              <img 
                src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=800`} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                alt={`Galeri ${i+1}`} 
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="material-symbols-outlined text-white text-4xl drop-shadow-md hover:scale-110 transition-transform">zoom_out_map</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
  );
}
