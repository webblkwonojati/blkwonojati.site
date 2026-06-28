"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ButtonPremium from "@/components/ui/ButtonPremium";

export default function HomeHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 bg-[#1a3a1a]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-blk.jpg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover pointer-events-none opacity-30"
          alt="UPT BLK Wonojati"
          priority
        />

        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay overflow-hidden">
          <motion.div
            animate={{
              x: [0, -100],
              y: [0, -100]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundImage: "url('/batik.webp')", backgroundSize: "1500px", willChange: "transform" }}
            className="absolute -inset-[400px]"
          />
        </div>

        <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] opacity-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(92,162,90,0.3) 0%, transparent 60%)", filter: "blur(60px)" }} />

        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a1a]/90 via-[#1a3a1a]/40 to-[#1a3a1a]"></div>
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_40%,rgba(92,162,90,0.4),transparent_60%)]"></div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl w-full relative z-10 flex flex-col items-center text-center gap-6"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-white/60 -mb-2"
        >
          UNIT PELATIHAN
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            }
          }}
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white text-balance font-display">
            Balai Latihan Kerja <br className="hidden md:block" />
            <span className="text-white">Wonojati Malang</span>
          </h1>
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.6, duration: 1.2 }
            }
          }}
          className="text-sm md:text-xl text-slate-200 max-w-2xl leading-relaxed font-medium text-balance opacity-90"
        >
          Membangun kemandirian melalui pelatihan berbasis kompetensi yang inovatif untuk tenaga kerja masa depan.
        </motion.p>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            }
          }} 
          className="pt-8 flex items-center justify-center gap-5 flex-wrap"
        >
          <ButtonPremium
            href="/kejuruan-pelatihan"
            icon="east"
            variant="outline"
            className="!px-10 !h-14 !rounded-2xl !border-white/20 !text-white/70 shadow-2xl shadow-green-500/20 active:scale-95 transition-all"
          >
            Jelajahi Program
          </ButtonPremium>

          <ButtonPremium
            href="/profil"
            variant="outline"
            icon="account_balance"
            className="!px-10 !h-14 !rounded-2xl !border-white/20 !text-white/70 hover:!text-white hover:!bg-white/10 active:scale-95 transition-all"
          >
            Tentang Kami
          </ButtonPremium>
        </motion.div>
      </motion.div>
    </section>
  );
}
