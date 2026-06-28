"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle, MessageSquare, MessageCircle, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/marketing/SectionHeader";

const faqs = [
  {
    value: "1",
    label: "Bagaimana cara mendaftar pelatihan?",
    children: "Anda dapat mendaftar secara online melalui tombol 'Pendaftaran' di header atau datang langsung ke kantor UPT BLK Wonojati dengan membawa dokumen persyaratan."
  },
  {
    value: "2",
    label: "Apakah pelatihan ini dipungut biaya?",
    children: "Seluruh program pelatihan reguler di UPT BLK Wonojati disubsidi penuh oleh pemerintah (APBN/APBD) sehingga GRATIS bagi peserta yang lolos seleksi."
  },
  {
    value: "3",
    label: "Syarat apa saja yang harus disiapkan?",
    children: "Syarat utama meliputi fotokopi KTP, fotokopi ijazah terakhir (minimal SMP/SMA tergantung kejuruan), pas foto terbaru, dan usia minimal 18 tahun."
  },
  {
    value: "4",
    label: "Berapa lama durasi pelatihannya?",
    children: "Durasi bervariasi antara 120 hingga 480 jam pelatihan (sekitar 1-3 bulan) dengan jadwal Senin hingga Jumat pukul 08:00 - 15:00 WIB."
  }
];

import nextDynamic from "next/dynamic";

const MapLibreMap = nextDynamic(() => import("@/components/marketing/MapLibreMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">Memuat peta...</div>
});

export default function BantuanClient() {
  return (
    <div className="mx-auto max-w-4xl font-sans">
      <SectionHeader 
        withBreadcrumbs
        badge="FAQ & Support"
        title="Pusat Bantuan"
        description="Temukan jawaban atas pertanyaan umum seputar pelatihan kami di UPT BLK Wonojati."
        className="mb-16"
      />

      <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
        {faqs.map((faq) => (
          <Accordion.Item
            key={faq.value}
            value={faq.value}
            className="border border-slate-200 rounded-2xl px-6 py-2 bg-white shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-300"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between py-3 group cursor-pointer">
                <span className="text-base md:text-lg font-bold text-slate-800 tracking-tight text-left">
                  {faq.label}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-300 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary shrink-0" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
              <div className="pb-4 text-slate-500 leading-relaxed text-sm md:text-base font-medium">
                {faq.children}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      {/* Location Section */}
      <div className="mt-24 md:mt-32 p-1 bg-slate-50 rounded-[1.5rem] md:rounded-[3rem] border border-slate-100/50">
        <div className="bg-white rounded-[1.4rem] md:rounded-[2.8rem] overflow-hidden shadow-sm border border-slate-100">
          <div className="grid lg:grid-cols-12">
            {/* Map Area */}
            <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px] relative">
              <MapLibreMap />
              <div className="absolute top-6 left-6 z-[1000]">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Lokasi Utama Workshop</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-5 p-6 md:p-10 lg:p-14 flex flex-col justify-center bg-slate-50/30">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                <MessageSquare className="w-5 h-5" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Kunjungi Workshop <br className="hidden md:block" />Kami di Wonojati
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-1">
                    <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Jalan Raya Mondoroko Nomor 1, Singosari, Malang, Jawa Timur.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-1">
                    <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Jam Operasional</span>
                    <span className="text-sm font-bold text-slate-700 block">Senin - Jumat | 08:00 - 15:00 WIB</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=UPT+BLK+Wonojati"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 rounded-2xl font-bold bg-slate-900 text-white hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10"
              >
                Buka di Google Maps <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist CTA */}
      <div className="mt-20 md:mt-32 py-12 md:py-20 px-6 md:px-10 bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100/50 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100 mb-8">
          <MessageSquare className="w-7 h-7" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">
          Masih Memiliki Pertanyaan?
        </h2>

        <p className="text-slate-500 text-lg font-medium max-w-xl mb-12">
          Tim bantuan kami siap membantu Anda dengan informasi pendaftaran dan detail lainnya secara langsung.
        </p>

        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <a
            href="https://wa.me/..."
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-10 rounded-2xl font-bold flex items-center gap-2 bg-emerald-500 text-white hover:opacity-90 shadow-xl shadow-emerald-500/10 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Hubungi via WhatsApp
          </a>
          <a
            href="/bantuan"
            className="h-14 px-10 rounded-2xl font-bold flex items-center gap-2 text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            Panduan Lengkap
          </a>
        </div>

        <div className="mt-12 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Operasional: Senin - Jumat (08:00 - 15:00)
          </span>
        </div>
      </div>
    </div>
  );
}
