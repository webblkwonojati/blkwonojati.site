import dynamic from "next/dynamic";
import SectionHeader from "@/components/marketing/SectionHeader";
import Image from "next/image";
import { Metadata } from "next";

// Dynamic import for below-the-fold component
const HistorySlider = dynamic(() => import("./HistorySlider"));

export const metadata: Metadata = {
  title: "Profil Lembaga",
  description: "Kenali lebih dekat UPT BLK Wonojati, visi, misi, dan sejarah kami dalam membangun kompetensi nasional.",
};

// Hoisted static data
const MISSIONS = [
  "Mempersiapkan SDM melalui pelatihan berbasis kompetensi.",
  "Mencetak tenaga kerja yang kompeten di bidang pertanian dan jasa."
];

const FACILITIES = [
  { title: "Laboratorium TIK", icon: "computer" },
  { title: "Greenhouse", icon: "agriculture" },
  { title: "Amphitheater", icon: "forum" },
  { title: "Pusat Bio-Gas", icon: "bolt" }
];

export default function ProfilPage() {
  return (
    <main className="relative flex h-auto min-h-screen w-full flex-col bg-transparent">
      <div className="flex-1">
        {/* --- Intro Content Section --- */}
        <section className="pt-32 pb-16 px-6 border-b border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader 
                  withBreadcrumbs
                  badge="Tentang Kami"
                  title="Pendahuluan"
                  description="Mengenal landasan institusi kami sebagai pusat pengembangan kompetensi."
                />
                <div className="space-y-6 text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                  <p>
                    Jawa Timur merupakan sentra pertanian di Indonesia. Peningkatan SDM melalui pelatihan kerja berbasis kompetensi sangat penting untuk menghadapi arus perubahan teknologi.
                  </p>
                  <p>
                    UPT Balai Latihan Kerja Wonojati Malang memiliki tugas di bidang pelaksanaan pelatihan kerja dan pelayanan masyarakat berdasarkan klaster kompetensi.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm relative">
                  <Image 
                    src="/BLK-wonojati.webp" 
                    fill 
                    className="object-cover" 
                    alt="UPT BLK Wonojati" 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority // LCP candidate
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Vision & Mission --- */}
        <section className="py-24 px-6 bg-transparent border-b border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                   <Image 
                    src="/visi-blk.png" 
                    fill 
                    alt="Visi Misi BLK Wonojati" 
                    className="object-cover" 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div>
                <SectionHeader 
                  badge="Visi & Misi"
                  title="Tujuan Kami"
                  description="Membangun Kompetensi Nasional melalui sistem pelatihan terpadu."
                />
                
                <div className="space-y-6">
                  <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <p className="text-lg md:text-xl font-bold text-slate-800 leading-tight">
                      "Mewujudkan SDM profesional dan berkualitas melalui sistem pelatihan terpadu."
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {MISSIONS.map((text, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="h-5 w-5 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                          {i + 1}
                        </div>
                        <p className="text-slate-600 font-medium text-sm md:text-base">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- History --- */}
        <section className="py-24 px-6 border-b border-slate-100 bg-transparent">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col justify-center">
                <SectionHeader 
                  badge="Sejarah"
                  title="Satu Dekade Berbakti"
                  description="Perjalanan kami mencetak tenaga kerja handal."
                />
                <div className="space-y-6 text-slate-500 font-medium text-sm md:text-base">
                  <p>Berawal dari semangat memajukan sektor agrikultur lokal, UPT BLK Wonojati kini menjadi institusi vokasi rujukan di Jawa Timur.</p>
                  <p>Kami percaya setiap individu memiliki potensi besar jika diberikan akses pada pengetahuan yang tepat.</p>
                </div>
              </div>

              <div className="w-full">
                <HistorySlider />
              </div>
            </div>
          </div>
        </section>

        {/* --- Facilities --- */}
        <section className="py-24 px-6 bg-transparent pb-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeader 
              badge="Fasilitas"
              title="Sarana Modern"
              description="Pendukung proses pelatihan yang efektif."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {FACILITIES.map((f, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center text-center hover:bg-white hover:border-primary/20 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-2xl text-slate-400 mb-3">{f.icon}</span>
                  <h3 className="text-xs font-bold text-slate-900">{f.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
