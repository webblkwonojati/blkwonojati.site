import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi resmi UPT BLK Wonojati mengenai perlindungan data pribadi dan penggunaan informasi pengguna.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <div className="mb-16">
        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">Legal Document</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6 font-display">
          Kebijakan <span className="text-primary">Privasi</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          Terakhir diperbarui: 8 Mei 2026. Privasi Anda adalah prioritas kami di UPT BLK Wonojati.
        </p>
      </div>

      <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary text-sm">01</span>
            Pendahuluan
          </h2>
          <p>
            Kebijakan Privasi ini menjelaskan bagaimana UPT BLK Wonojati mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan situs web kami. Kami berkomitmen untuk memastikan bahwa privasi Anda terlindungi sesuai dengan peraturan perundang-undangan yang berlaku di Republik Indonesia.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary text-sm">02</span>
            Informasi yang Kami Kumpulkan
          </h2>
          <p className="mb-4">Kami dapat mengumpulkan informasi berikut:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nama lengkap dan informasi kontak termasuk alamat email.</li>
            <li>Informasi demografis seperti kode pos, preferensi, dan minat.</li>
            <li>Data akademik dan profesional untuk keperluan pendaftaran pelatihan.</li>
            <li>Informasi lain yang relevan dengan survei pelanggan dan/atau penawaran.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary text-sm">03</span>
            Penggunaan Informasi
          </h2>
          <p className="mb-4">Kami memerlukan informasi ini untuk memahami kebutuhan Anda dan memberikan layanan yang lebih baik, khususnya untuk alasan berikut:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pemeliharaan catatan internal dan administrasi peserta pelatihan.</li>
            <li>Peningkatan produk dan layanan kami.</li>
            <li>Mengirimkan email promosi tentang program pelatihan baru, penawaran khusus, atau informasi lain yang kami rasa menarik bagi Anda.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary text-sm">04</span>
            Keamanan Data
          </h2>
          <p>
            Kami berkomitmen untuk memastikan bahwa informasi Anda aman. Untuk mencegah akses atau pengungkapan yang tidak sah, kami telah menerapkan prosedur fisik, elektronik, dan manajerial yang sesuai untuk menjaga dan mengamankan informasi yang kami kumpulkan secara online menggunakan enkripsi SSL terkini.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary text-sm">05</span>
            Hak Pengguna
          </h2>
          <p>
            Anda memiliki hak untuk meminta rincian informasi pribadi yang kami simpan tentang Anda berdasarkan Undang-Undang Perlindungan Data Pribadi. Jika Anda meyakini bahwa informasi apa pun yang kami simpan tentang Anda salah atau tidak lengkap, silakan hubungi kami sesegera mungkin.
          </p>
        </section>
      </div>

      <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-2">Punya pertanyaan tentang privasi?</h3>
          <p className="text-sm text-slate-500 font-medium">Tim legal kami siap membantu menjelaskan kebijakan ini lebih lanjut.</p>
        </div>
        <a href="mailto:info@blk-wonojati.id" className="h-12 px-8 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-900 flex items-center hover:bg-slate-100 transition-all shadow-sm">
          Hubungi Kami
        </a>
      </div>
    </div>
  );
}
