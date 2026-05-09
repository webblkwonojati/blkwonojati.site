"use client";

import { 
  Typography, 
  Tag, 
  Flex
} from "antd";
import { 
  CheckCircleOutlined,
  RocketOutlined,
  TeamOutlined,
  SearchOutlined,
  ReadOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeader from "@/components/marketing/SectionHeader";
import Link from "next/link";

const { Title, Text } = Typography;

// Hoisted static data
const PROGRAMS = [
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

const ADVANTAGES = [
  "Pelatihan berbasis praktik langsung (70% Praktika)",
  "Instruktur bersertifikat kompetensi nasional",
  "Fasilitas bengkel dan laboratorium modern",
  "Sertifikat BNSP untuk daya tawar tinggi",
  "Kerjasama penempatan kerja mitra industri",
  "Pelatihan gratis (Subsidi Pemerintah)"
];

const TARGETS = [
  { label: "Lulusan SMA/SMK", icon: <ReadOutlined /> },
  { label: "Pencari Kerja", icon: <SearchOutlined /> },
  { label: "Masyarakat Umum", icon: <TeamOutlined /> },
  { label: "Wirausaha", icon: <RocketOutlined /> }
];

export default function KejuruanClient({ initialData }: { initialData?: any[] }) {
  const displayPrograms = initialData && initialData.length > 0 ? initialData : PROGRAMS;

  return (
    <section className="pt-28 md:pt-32 pb-16 px-6 md:px-12 bg-transparent">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto max-w-7xl font-sans"
      >
        <motion.div variants={fadeInUp}>
          <SectionHeader
            withBreadcrumbs
            asH1
            badge="Kejuruan Tersedia"
            title="Daftar Pelatihan"
            description="Pilih bidang yang sesuai dengan minat Anda untuk membangun karir."
          />
        </motion.div>

        {/* Programs List */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden p-2"
        >
          {displayPrograms.map((item, index) => (
            <Link
              href={item.slug ? `/kejuruan-pelatihan/${item.slug}` : "#"}
              key={index}
              className={`flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 hover:bg-slate-50 transition-all cursor-pointer group rounded-2xl ${
                index !== displayPrograms.length - 1 ? 'mb-1' : ''
              }`}
            >
              <div className="flex items-center gap-6 md:gap-8 flex-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{item.icon || "school"}</span>
                </div>
                <div className="flex flex-col">
                  <Title level={4} className="!m-0 !font-bold !text-slate-800 group-hover:text-primary transition-colors !tracking-tight">
                    {item.title}
                  </Title>
                  <Text type="secondary" className="text-xs md:text-sm font-medium leading-relaxed block mt-1 max-w-2xl text-slate-500 line-clamp-2">
                    {item.subtitle || item.desc}
                  </Text>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-8 shrink-0">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg active:scale-90">
                  <span className="material-symbols-outlined text-sm">east</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mt-20 md:mt-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Keunggulan Pelatihan */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[2rem] p-6 lg:p-14 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-40 -mt-40 blur-[100px]" />
            
            <h2 className="text-3xl font-bold text-white tracking-tight mb-10 relative z-10">Keunggulan Pelatihan</h2>
            
            <ul className="space-y-6 relative z-10">
              {ADVANTAGES.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <CheckCircleOutlined style={{ color: 'white' }} className="text-xl shrink-0 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                  <span className="text-slate-300 font-bold uppercase tracking-[0.15em] text-[11px] md:text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Target Peserta Section */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <div className="space-y-3">
              <Tag className="!m-0 text-primary bg-primary/5 border-none rounded-full px-4 py-1 uppercase text-[9px] font-bold tracking-widest mb-2">
                Target Peserta
              </Tag>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight m-0 leading-tight text-balance">
                 Siapa Yang Bisa Mendaftar?
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                Terbuka untuk masyarakat umum yang siap membangun karir profesional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TARGETS.map((target, idx) => (
                <div 
                  key={idx} 
                  className="p-5 md:p-6 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-primary/20 transition-all duration-300 group flex items-center gap-5"
                >
                  <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all text-xl shrink-0 shadow-sm">
                     {target.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest block leading-tight">
                    {target.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
