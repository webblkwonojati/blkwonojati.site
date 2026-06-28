"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    value: "1",
    label: "Bagaimana cara mendaftar pelatihan?",
    children: "Pendaftaran dapat dilakukan secara online melalui website ini atau datang langsung ke kantor UPT BLK Wonojati untuk informasi jadwal terbaru."
  },
  {
    value: "2",
    label: "Apakah pelatihan ini dipungut biaya?",
    children: "Pelatihan reguler umumnya disubsidi penuh oleh pemerintah dan GRATIS bagi peserta yang lulus seleksi administrasi dan teknis."
  },
  {
    value: "3",
    label: "Syarat apa saja yang harus disiapkan?",
    children: "Persyaratan umum meliputi Fotokopi KTP, ijazah terakhir, dan pas foto. Syarat khusus bergantung pada kejuruan yang Anda pilih."
  },
  {
    value: "4",
    label: "Berapa lama durasi pelatihannya?",
    children: "Durasi bervariasi antara 1-2 bulan (160 hingga 480 jam pelatihan), dilaksanakan setiap Senin hingga Jumat."
  },
];

export default function HomeFAQ() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 100], y: [0, -100] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: "url('/batik.webp')", backgroundSize: "1500px", filter: "invert(1) brightness(0.5)" }}
          className="absolute -inset-[400px]"
        />
      </div>

      <div className="mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 font-display leading-none">
            Pertanyaan Umum
          </h2>
        </div>

        {!mounted ? (
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <div key={faq.value} className="border border-slate-200 rounded-2xl px-6 py-2 bg-white shadow-sm">
                <span className="text-lg font-bold text-slate-800 tracking-tight block py-3">
                  {faq.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.value}
                value={faq.value}
                className="border border-slate-200 rounded-2xl px-6 py-2 bg-white shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-300"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-3 group cursor-pointer">
                    <span className="text-lg font-bold text-slate-800 tracking-tight text-left">
                      {faq.label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-300 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary shrink-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  <div className="pb-4 text-slate-500 leading-relaxed text-base font-medium">
                    {faq.children}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}
      </div>
    </section>
  );
}
