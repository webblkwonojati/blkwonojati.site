"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import ButtonPremium from "@/components/ui/ButtonPremium";

interface Program {
  title: string;
  icon: string;
  category: string;
}

export default function HomeMarquee({ programs }: { programs: Program[] }) {
  const duplicatedPrograms = [...programs, ...programs];

  return (
    <section className="py-24 px-6 bg-transparent overflow-hidden relative">
      {/* Ambient Gradient Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-20 pointer-events-none z-0">
        <img src="/gradien-1.png" alt="" loading="lazy" aria-hidden="true" className="w-full h-full object-contain animate-pulse duration-[12s]" />
      </div>
      
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter leading-none text-balance font-display">
              Kejuruan Pelatihan <br />
              <span className="text-primary">Unggulan</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg leading-relaxed font-medium text-balance">
              Temukan kejuruan pelatihan yang sesuai dengan minat dan bakat Anda untuk membangun karir.
            </p>
          </div>
          <div className="flex gap-4">
            <ButtonPremium
              href="/kejuruan-pelatihan"
              icon="east"
            >
              Lihat Semua
            </ButtonPremium>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group/marquee overflow-hidden"
        >
          {/* Gradient Overlays - Adjusted for Transparency */}
          <div className="absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r from-background/80 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l from-background/80 to-transparent"></div>

          <div className="flex animate-marquee gap-6 pb-8">
            {duplicatedPrograms.map((p, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] md:w-[350px]">
                <div className="h-full p-6 md:p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 group/card relative overflow-hidden active:scale-95 cursor-pointer">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover/card:scale-125 transition-all duration-700"></div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-300 mb-8 group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300 border border-slate-100 group-hover/card:border-transparent">
                    <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">{p.category}</span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 group-hover/card:text-primary transition-colors leading-tight tracking-tight">
                    {p.title}
                  </h3>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover/card:text-slate-900 transition-colors">
                      Detail Program
                    </span>
                    <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover/card:bg-primary group-hover/card:text-white group-hover/card:border-transparent transition-all">
                      <span className="material-symbols-outlined text-base">east</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
