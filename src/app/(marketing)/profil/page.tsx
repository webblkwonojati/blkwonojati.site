import SectionHeader from "@/components/marketing/SectionHeader";
import Image from "next/image";
import { Metadata } from "next";
import HistorySlider from "./HistorySlider";

export const metadata: Metadata = {
  title: "Profil Lembaga",
  description: "Kenali lebih dekat UPT BLK Wonojati, visi, misi, dan sejarah kami dalam membangun kompetensi nasional.",
};

export default function ProfilPage() {
  return (
    <main className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex-1">
        {/* --- Intro Content Section --- */}
        <section className="pt-32 pb-24 px-6 border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader 
                  withBreadcrumbs
                  badge="About Us"
                  title="Pendahuluan"
                  description="Mengenal landasan dan latar belakang berdirinya institusi kami sebagai pusat pengembangan kompetensi."
                />
                <div className="space-y-6 text-slate-600 leading-relaxed text-justify max-w-2xl">
                  <p>
                    Jawa Timur merupakan sentra pertanian di Indonesia. Namun dalam menghadapi arus perubahan teknologi yang tumbuh begitu cepat, perlu diimbangi dengan peningkatan SDM (Sumber Daya Manusia) melalui pendidikan formal dan non formal khususnya di sektor pertanian.
                  </p>
                  <p>
                    Tenaga kerja perlu dibekali pelatihan berbasis kompetensi dan informasi teknologi, sehingga mampu bersaing di sektor pertanian, terutama agribisnis yang banyak memberikan peluang usaha dan mampu bersaing di dalam dan luar negeri, sekaligus dapat mendongkrak peningkatan kesejahteraan.
                  </p>
                  <p className="text-sm border-l-4 border-primary/20 pl-6 py-2 bg-slate-50/50 rounded-r-xl italic">
                    Berdasarkan Peraturan Gubernur Provinsi Jawa Timur No.62 Tahun 2018, UPT Balai Latihan Kerja Wonojati Malang mempunyai tugas dinas di bidang pelaksanaan pelatihan kerja, pengembangan pengetahuan berdasarkan klaster kompetensi, ketatausahaan, dan pelayanan masyarakat.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border-8 border-white shadow-2xl shadow-slate-200/50 relative">
                  <Image 
                    src="/BLK-wonojati.webp" 
                    fill 
                    className="object-cover" 
                    alt="UPT BLK Wonojati" 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-xl shadow-slate-200/50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Legal Basis</span>
                    <span className="text-sm font-bold text-slate-900">Pergub Jatim No. 62/2018</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Vision & Mission: Redesigned 2-Column Layout --- */}
        <section className="py-24 px-6 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column: Image Area */}
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-200/60 relative z-10">
                   <Image 
                    src="/visi-blk.png" 
                    fill 
                    alt="Visi Misi BLK Wonojati" 
                    className="object-cover" 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
              </div>

              {/* Right Column: Text Content */}
              <div className="order-1 lg:order-2">
                <SectionHeader 
                  badge="Identity & Purpose"
                  title="Misi & Visi Kami"
                  description="Membangun Kompetensi Nasional melalui sistem pelatihan terpadu dan berkelanjutan."
                />
                
                <div className="space-y-10">
                  {/* Vision Card */}
                  <div className="relative p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute -top-4 left-8 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Visi Utama</div>
                    <p className="text-xl font-medium text-slate-800 leading-relaxed">
                      "Mewujudkan SDM yang profesional dan tenaga kerja yang berkualitas melalui sistem pelatihan terpadu."
                    </p>
                  </div>

                  {/* Mission Items */}
                  <div className="grid gap-6">
                    {[
                      { num: "01", text: "Mempersiapkan SDM melalui pelatihan kerja berbasis kompetensi agar menjadi wirausaha yang mandiri." },
                      { num: "02", text: "Mencetak tenaga kerja yang kompeten di bidang pertanian dan jasa tenaga kerja domestik maupun luar negeri." }
                    ].map((m, i) => (
                      <div key={i} className="flex items-start gap-6 group">
                        <div className="h-12 w-12 flex-shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {m.num}
                        </div>
                        <p className="text-slate-600 leading-relaxed pt-1">{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- History: Simple Timeline --- */}
        <section className="py-24 px-6 border-b border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              {/* Left Column: Text Content */}
              <div className="md:w-1/2 flex flex-col justify-center order-2 md:order-1">
                <SectionHeader 
                  badge="Founded 2014"
                  title="Melangkah Maju Sejak Satu Dekade Lalu"
                  description="Perjalanan panjang kami dalam mencetak tenaga kerja handal yang siap bersaing global."
                />
                <div className="space-y-6 text-sm text-slate-500 leading-relaxed">
                  <p>Berawal dari semangat untuk memajukan sektor agrikultur lokal, UPT BLK Wonojati didirikan sebagai wadah bagi para pemuda untuk belajar dan berinovasi.</p>
                  <p>Selama sepuluh tahun terakhir, kami telah bertransformasi dari pusat pelatihan kecil menjadi institusi vokasi rujukan di Jawa Timur.</p>
                </div>
                <div className="mt-12 p-6 border-l-2 border-primary bg-slate-50">
                  <p className="text-slate-900 italic font-medium">"Kami percaya bahwa setiap individu memiliki potensi besar jika diberikan akses pada pengetahuan yang tepat."</p>
                </div>
              </div>

              {/* Right Column: Image Slider */}
              <div className="md:w-1/2 w-full order-1 md:order-2">
                <HistorySlider />
              </div>
            </div>
          </div>
        </section>

        {/* --- Facilities: Clean Grid --- */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <SectionHeader 
              badge="Infrastructure"
              title="Fasilitas Unggulan"
              description="Sarana dan prasarana modern untuk mendukung proses pelatihan yang efektif."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Workshop", title: "Laboratorium TIK", icon: "computer" },
                { label: "Field", title: "Greenhouse Cerdas", icon: "agriculture" },
                { label: "Community", title: "Amphitheater", icon: "forum" },
                { label: "Energy", title: "Pusat Bio-Gas", icon: "bolt" }
              ].map((f, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-square rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-8 transition-all group-hover:border-primary/20 group-hover:bg-white shadow-sm hover:shadow-md">
                    <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors mb-4">{f.icon}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-2 text-center">{f.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
