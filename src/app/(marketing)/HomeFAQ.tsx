"use client";

import { motion } from "framer-motion";

import { Collapse, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const faqs = [
  { 
    key: '1',
    label: "Bagaimana cara mendaftar pelatihan?", 
    children: "Pendaftaran dapat dilakukan secara online melalui website ini atau datang langsung ke kantor UPT BLK Wonojati untuk informasi jadwal terbaru." 
  },
  { 
    key: '2',
    label: "Apakah pelatihan ini dipungut biaya?", 
    children: "Pelatihan reguler umumnya disubsidi penuh oleh pemerintah dan GRATIS bagi peserta yang lulus seleksi administrasi dan teknis." 
  },
  { 
    key: '3',
    label: "Syarat apa saja yang harus disiapkan?", 
    children: "Persyaratan umum meliputi Fotokopi KTP, ijazah terakhir, dan pas foto. Syarat khusus bergantung pada kejuruan yang Anda pilih." 
  },
  { 
    key: '4',
    label: "Berapa lama durasi pelatihannya?", 
    children: "Durasi bervariasi antara 1-2 bulan (160 hingga 480 jam pelatihan), dilaksanakan setiap Senin hingga Jumat." 
  },
];

export default function HomeFAQ() {
  const items = faqs.map((faq) => ({
    key: faq.key,
    label: (
      <Text className="text-lg font-bold text-slate-800 py-3 block tracking-tight">
        {faq.label}
      </Text>
    ),
    children: (
      <Paragraph className="text-slate-500 leading-relaxed text-base font-medium pb-4">
        {faq.children}
      </Paragraph>
    ),
  }));

  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Subtle Batik Pattern - Ultra Soft Opacity */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100],
            y: [0, -100]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            backgroundImage: "url('/batik.png')", 
            backgroundSize: "1500px",
            filter: "invert(1) brightness(0.5)"
          }}
          className="absolute -inset-[400px]"
        />
      </div>

      <div className="mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-16">
          <Text className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">Common Questions</Text>
          <Title level={2} className="!m-0 !text-4xl md:!text-5xl !font-bold !tracking-tighter !text-slate-900 border-none !font-display !leading-none">
            Pertanyaan Umum
          </Title>
        </div>

        <Collapse
          accordion
          expandIconPlacement="end"
          items={items}
          expandIcon={({ isActive }) => (
            <RightOutlined className={`transition-transform text-slate-300 ${isActive ? 'rotate-90 text-primary' : ''}`} />
          )}
          className="bg-transparent border-none"
        />
      </div>
    </section>
  );
}
