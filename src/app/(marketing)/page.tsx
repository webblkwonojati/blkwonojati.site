import HomeHero from "./HomeHero";
import HomeVideo from "./HomeVideo";
import HomeMarquee from "./HomeMarquee";
import HomeCTA from "./HomeCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
  description: "Selamat datang di UPT BLK Wonojati. Pusat Pelatihan Kerja berbasis industri untuk masa depan Indonesia.",
};

const programs = [
  { title: "Practical Office Advance", icon: "desktop_windows", category: "Administrasi" },
  { title: "Pembuatan Roti dan Kue", icon: "bakery_dining", category: "Kuliner" },
  { title: "Pembudidayaan Ayam Pedaging", icon: "agriculture", category: "Peternakan" },
  { title: "Pembudidayaan Sayuran Hidroponik", icon: "potted_plant", category: "Pertanian" },
  { title: "Pembudidayaan Bibit Sayuran", icon: "nature", category: "Pertanian" },
  { title: "Pembudidayaan Jamur", icon: "nature_people", category: "Pertanian" },
  { title: "Barista Kafe", icon: "local_cafe", category: "Pariwisata" },
  { title: "Housekeeping", icon: "cleaning_services", category: "Perhotelan" },
  { title: "Housekeeper Level 1", icon: "hotel", category: "Perhotelan" },
  { title: "Pembudidayaan Ikan Hias", icon: "water", category: "Perikanan" },
  { title: "Pembesaran Ikan Catfish (Lele)", icon: "set_meal", category: "Perikanan" },
  { title: "Pengoperasian Traktor", icon: "agriculture", category: "Pertanian" },
];

const testimonials = [
  { name: "Andi Wijaya", role: "Owner GreenFarm", text: "Kurikulum praktis dan pelatihan yang dipandu industri memberikan fondasi bagi kesuksesan bisnis saya." },
  { name: "Siti Aminah", role: "Alumni Barista", text: "Dukungan komunitas yang luar biasa dan peluang jaringan profesional di seluruh program." },
  { name: "Budi Santoso", role: "Specialist Hydro", text: "Modul kelas dunia yang menjembatani kesenjangan antara teori dan praktik lapangan yang sebenarnya." }
];

const faqs = [
  { q: "Bagaimana cara mendaftar pelatihan?", a: "Pendaftaran dapat dilakukan secara online melalui tombol 'Daftar Sekarang' di menu navigasi atau datang langsung ke kantor UPT BLK Wonojati." },
  { q: "Apakah pelatihan ini dipungut biaya?", a: "Kejuruan pelatihan reguler di UPT BLK Wonojati umumnya disubsidi penuh oleh pemerintah dan GRATIS bagi peserta yang lulus seleksi." },
  { q: "Syarat apa saja yang harus disiapkan?", a: "Persyaratan umum meliputi KTP, ijazah terakhir, dan pas foto. Syarat khusus mungkin diperlukan tergantung pada program kejuruan yang dipilih." },
  { q: "Berapa lama durasi pelatihannya?", a: "Durasi bervariasi bergantung pada skema pelatihan, umumnya berkisar antara 160 hingga 480 jam pelatihan (rata-rata 1-2 bulan)." },
];

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex-1 bg-gradient-to-b from-white via-slate-50/50 to-white">
        
        <HomeHero />
        
        <HomeVideo />
        
        <HomeMarquee programs={programs} />

        {/* --- Social Proof --- */}
        <section className="py-24 px-6 border-t border-slate-100 bg-white/40">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dipercaya oleh Alumni & Profesional</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col gap-6 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-transparent hover:border-slate-100 group">
                  <p className="text-slate-600 italic leading-relaxed text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                       <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HomeCTA />

        {/* --- FAQ Section --- */}
        <section className="py-24 px-6 border-t border-slate-100 bg-white/60">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Pertanyaan Umum</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">FAQ Pelatihan</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details 
                  key={i} 
                  className="group border border-slate-200 rounded-2xl bg-white p-5 md:p-6 transition-all hover:border-primary/30 shadow-sm hover:shadow-md"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 list-none outline-none">
                    <span className="pr-8 text-base">{faq.q}</span>
                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-primary bg-primary/5 rounded-full p-1">expand_more</span>
                  </summary>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
