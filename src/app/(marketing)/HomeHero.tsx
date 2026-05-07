"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HomeHero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center px-6">
      {/* Background Image with Slow Zoom Animation using next/image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="h-full w-full relative"
        >
          <Image
            src="/hero-blk.jpg"
            fill
            className="object-cover"
            alt="UPT BLK Wonojati Background"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Simple Dark Overlay */}
        <div className="absolute inset-0 bg-accent/40"></div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl w-full relative z-10 text-white text-center"
      >
        <div className="flex flex-col items-center gap-8">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Pusat Pelatihan Kerja <br className="hidden md:block" />
            <span className="text-primary italic"> UPT BLK Wonojati</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed opacity-90">
            Pelatihan kerja berbasis industri untuk mencetak tenaga kerja yang handal dan wirausahawan mandiri.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-5 mt-4">
            <Link href="/register">
              <button className="h-12 px-10 bg-primary text-sm font-bold text-white rounded-3xl transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:-translate-y-1 cursor-pointer">
                Daftar Sekarang
              </button>
            </Link>
            <Link href="/kejuruan-pelatihan" className="h-12 px-10 border border-white/40 text-sm font-bold text-white rounded-3xl transition-all hover:bg-white/10 flex items-center hover:-translate-y-1">
              Jelajahi Program
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
