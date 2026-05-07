import { Metadata } from "next";
import SectionHeader from "@/components/marketing/SectionHeader";

export const metadata: Metadata = {
  title: "Kejuruan Pelatihan",
  description: "Daftar lengkap kejuruan pelatihan keterampilan kerja di UPT BLK Wonojati yang siap kerja.",
};

const programs = [
  {
    title: "Practical Office Advance",
    desc: "Meningkatkan keterampilan administrasi perkantoran, pengolahan dokumen, pengoperasian komputer, serta manajemen arsip modern.",
    icon: "desktop_windows"
  },
  {
    title: "Pembuatan Roti dan Kue",
    desc: "Keterampilan pembuatan berbagai jenis roti dan kue, mulai dari persiapan bahan, teknik pengolahan, hingga penyajian produk.",
    icon: "bakery_dining"
  },
  {
    title: "Pembudidayaan Ayam Pedaging",
    desc: "Teknik budidaya ayam pedaging modern: manajemen kandang, pakan, kesehatan ternak, hingga strategi panen dan pemasaran.",
    icon: "agriculture"
  },
  {
    title: "Pembudidayaan Sayuran Hidroponik",
    desc: "Sistem pertanian modern tanpa tanah menggunakan nutrisi. Mempelajari instalasi, perawatan, dan pengelolaan hasil panen.",
    icon: "potted_plant"
  },
  {
    title: "Pembudidayaan Bibit Sayuran",
    desc: "Fokus pada teknik pembibitan tanaman sayuran berkualitas: pemilihan benih, penyemaian, perawatan, hingga distribusi.",
    icon: "nature"
  },
  {
    title: "Pembudidayaan Jamur",
    desc: "Keterampilan budidaya jamur konsumsi: pembuatan media tanam, perawatan kumbung, serta teknik panen dan pemasaran.",
    icon: "nature_people"
  },
  {
    title: "Barista Kafe",
    desc: "Keterampilan meracik kopi dan minuman kafe. Mempelajari teknik brewing, mesin kopi, dan standar industri kafe.",
    icon: "local_cafe"
  },
  {
    title: "Housekeeping",
    desc: "Keterampilan pengelolaan kebersihan dan perawatan fasilitas hotel atau penginapan sesuai standar industri hospitality.",
    icon: "cleaning_services"
  },
  {
    title: "Housekeeper Level 1",
    desc: "Pelatihan dasar housekeeping: teknik kebersihan kamar, pengelolaan linen, dan pelayanan dasar bidang perhotelan.",
    icon: "hotel"
  },
  {
    title: "Pembudidayaan Ikan Hias",
    desc: "Teknik budidaya ikan hias: perawatan akuarium, manajemen pakan, serta strategi pemasaran produk ikan hias.",
    icon: "water"
  },
  {
    title: "Pembesaran Ikan Catfish (Lele)",
    desc: "Fokus pada teknik pembesaran ikan lele: persiapan kolam, pemeliharaan, pemberian pakan, hingga masa panen.",
    icon: "set_meal"
  },
  {
    title: "Pengoperasian Traktor Pertanian",
    desc: "Keterampilan dalam mengoperasikan dan merawat traktor pertanian sebagai bagian dari mekanisasi pertanian modern.",
    icon: "agriculture"
  },
];

export default function KejuruanPelatihan() {

  return (
    <main className="flex-1 bg-white">
      <section className="pt-32 pb-24 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            withBreadcrumbs
            badge="Kejuruan Tersedia"
            title="Daftar Kejuruan Pelatihan"
            description="Pilih bidang yang sesuai dengan minat dan potensi Anda untuk membangun masa depan karir yang lebih cemerlang."
          />

          <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
            {programs.map((p, i) => (
              <div
                key={i}
                className={`group flex items-center p-6 md:p-8 hover:bg-slate-50/50 transition-all cursor-pointer ${i !== programs.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
              >
                <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">{p.icon}</span>
                </div>

                <div className="ml-6 md:ml-8 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1 md:line-clamp-none leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 grid md:grid-cols-2 gap-16">
            <div className="bg-accent rounded-[32px] p-12 text-white overflow-hidden relative shadow-2xl shadow-accent/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-3xl font-bold mb-8 relative z-10">Keunggulan Kejuruan Pelatihan</h2>
              <ul className="space-y-6 relative z-10">
                {[
                  "Pelatihan berbasis praktik langsung (70% Praktik)",
                  "Instruktur bersertifikat kompetensi nasional",
                  "Fasilitas bengkel dan laboratorium modern",
                  "Sertifikat BNSP untuk meningkatkan daya tawar",
                  "Kerjasama penempatan kerja dengan mitra industri",
                  "Kejuruan pelatihan tanpa biaya pendaftaran"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Target Peserta</h2>
              <p className="text-slate-600 mb-10 text-lg">
                Kejuruan pelatihan BLK Wonojati ditujukan untuk berbagai kalangan masyarakat yang ingin meningkatkan daya saing mereka:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Lulusan SMA/SMK", icon: "school" },
                  { label: "Pencari Kerja", icon: "person_search" },
                  { label: "Masyarakat Umum", icon: "groups" },
                  { label: "Calon Wirausaha", icon: "rocket_launch" }
                ].map((target, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <span className="material-symbols-outlined text-primary">{target.icon}</span>
                    <span className="text-sm font-bold text-slate-700">{target.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "Kami berkomitmen mencetak tenaga kerja handal dan wirausahawan mandiri yang siap bersaing di era ekonomi modern."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

