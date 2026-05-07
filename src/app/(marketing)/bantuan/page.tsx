import SectionHeader from "@/components/marketing/SectionHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description: "Temukan jawaban atas pertanyaan umum seputar kejuruan pelatihan, pendaftaran, dan fasilitas di UPT BLK Wonojati.",
};

export default function Bantuan() {
  return (
    <main className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex-1 pt-32 px-6 pb-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-3xl">
          <SectionHeader 
            withBreadcrumbs
            badge="FAQ & Support"
            title="Tanya Jawab Umum"
            description="Informasi lengkap mengenai prosedur pendaftaran, biaya, dan detail pelatihan."
            className="mb-12"
          />

          <div className="space-y-4">
            {[
              { q: "Bagaimana cara mendaftar pelatihan?", a: "Anda dapat mendaftar secara online melalui tombol 'Pendaftaran' di header atau datang langsung ke kantor UPT BLK Wonojati." },
              { q: "Apakah pelatihan ini dipungut biaya?", a: "Sebagian besar kejuruan pelatihan reguler kami disubsidi penuh oleh pemerintah dan GRATIS bagi peserta yang memenuhi syarat." },
              { q: "Syarat apa saja yang harus disiapkan?", a: "Umumnya memerlukan KTP, ijazah terakhir, dan pas foto terbaru. Syarat spesifik tergantung pada kejuruan pelatihan yang dipilih." },
              { q: "Berapa lama durasi pelatihannya?", a: "Durasi bervariasi antara 160 hingga 480 jam pelatihan (sekitar 1-3 bulan) tergantung tingkat kompetensi." },
            ].map((faq, i) => (
              <details key={i} className="group border border-slate-100 rounded-xl bg-white p-6 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 list-none font-display">
                  {faq.q}
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-20 p-12 bg-accent rounded-3xl text-center text-white shadow-2xl shadow-accent/20">
            <h3 className="text-2xl font-black mb-4 tracking-tight">Masih Butuh Bantuan?</h3>
            <p className="opacity-70 mb-8 font-medium">Tim kami siap membantu Anda setiap Senin - Jumat pukul 08:00 - 15:00 WIB.</p>
            <button className="h-12 px-10 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">Hubungi via WhatsApp</button>
          </div>
        </div>
      </div>
    </main>
  );
}
