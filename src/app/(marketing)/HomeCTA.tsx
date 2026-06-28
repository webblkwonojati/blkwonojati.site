"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";
import ButtonPremium from "@/components/ui/ButtonPremium";

export default function HomeCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-green-50/60">
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-[3rem] overflow-hidden bg-[#1a3a1a] shadow-2xl border border-white/10 p-6 md:p-20">

          <div className="absolute inset-0 z-0">
            <Image
              src="/cta-blk.jpg"
              alt="CTA Background"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover opacity-[0.25] scale-105"
            />

            <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -100],
                  y: [0, -50]
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundImage: "url('/batik.webp')", backgroundSize: "1200px" }}
                className="absolute -inset-[400px]"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a1a] via-[#1a3a1a]/80 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a1a] via-transparent to-transparent z-0"></div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="absolute -bottom-16 -right-16 w-[280px] md:w-[700px] h-[200px] md:h-[500px] opacity-20 md:opacity-40 pointer-events-none z-10 transition-transform hover:scale-105 duration-700">
              <Image
                src="/rumah-blk.png"
                alt="BLK House"
                fill
                sizes="(max-width: 768px) 280px, 700px"
                className="object-contain"
              />
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-left relative z-10 max-w-2xl flex flex-col items-start gap-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] font-display">
                Siapkan <span className="text-green-300">Masa Depan</span> <br />
                Gemilang Bersama Kami.
              </h2>
            </div>

            <p className="text-slate-300 text-sm md:text-lg leading-relaxed max-w-xl font-medium">
              Jadilah bagian dari jaringan alumni UPT BLK Wonojati yang telah sukses membangun karir cemerlang di berbagai sektor industri nyata dengan bekal kompetensi bersertifikat.
            </p>

            <div className="pt-6 flex items-center gap-4 flex-wrap">
              <ButtonPremium
                href="/kejuruan-pelatihan"
              >
                Daftar Sekarang
              </ButtonPremium>

              <ButtonPremium
                href="/profil"
                variant="outline"
              >
                Profil Lembaga
              </ButtonPremium>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
