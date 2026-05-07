"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

interface Program {
  title: string;
  icon: string;
  category: string;
}

export default function HomeMarquee({ programs }: { programs: Program[] }) {
  const duplicatedPrograms = [...programs, ...programs];

  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[.4em] text-primary mb-4 block">Pilihan Masa Depan</span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Kejuruan Pelatihan Unggulan</h2>
            <p className="text-slate-500 mt-4 text-lg leading-relaxed">
              Temukan kejuruan pelatihan yang sesuai dengan minat dan bakat Anda untuk membangun karir profesional.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/kejuruan-pelatihan"
              className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              Lihat Semua
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group/marquee overflow-hidden"
        >
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r from-slate-50 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l from-slate-50 to-transparent"></div>

          <div className="flex animate-marquee gap-4 md:gap-6 pb-4">
            {duplicatedPrograms.map((p, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] md:w-[350px]">
                <div className="h-full p-6 md:p-8 border border-slate-100 rounded-[2rem] bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group/card relative overflow-hidden active:scale-95 cursor-pointer">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover/card:scale-150 transition-transform duration-700"></div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl">{p.icon}</span>
                  </div>

                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{p.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover/card:text-primary transition-colors leading-tight">
                    {p.title}
                  </h3>

                  <Link
                    href="/kejuruan-pelatihan"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 group-hover/card:gap-3 transition-all duration-300"
                  >
                    Pelajari Selengkapnya
                    <span className="material-symbols-outlined text-sm">east</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
