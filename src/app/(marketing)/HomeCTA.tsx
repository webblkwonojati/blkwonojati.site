"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";

export default function HomeCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-900 font-display lg:py-32">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/cta-blk.jpg" 
          alt="UPT BLK Wonojati Career Center" 
          fill 
          className="object-cover"
          priority
        />
        {/* Subtlest possible overlay for text contrast without blending colors */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mx-auto max-w-4xl text-center relative z-10"
      >
        <div className="flex flex-col items-center gap-6">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">Ayo Bergabung</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Mulai Perjalanan Karir <br />
            <span className="text-primary font-black">Anda Hari Ini.</span>
          </h2>
          <p className="text-slate-100 text-lg md:text-xl leading-relaxed max-w-2xl font-medium mb-6">
            Jadilah bagian dari alumni UPT BLK Wonojati yang telah sukses membangun masa depan dengan keterampilan kompeten dan sertifikasi industri.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/register">
              <button className="h-14 px-12 bg-primary text-sm font-black text-white rounded-3xl hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-xl shadow-primary/30 cursor-pointer uppercase tracking-widest">
                Daftar Sekarang
              </button>
            </Link>
            <Link href="/kejuruan-pelatihan">
              <button className="h-14 px-12 border border-white/60 text-sm font-black text-white rounded-3xl hover:bg-white/20 hover:-translate-y-1 transition-all backdrop-blur-sm cursor-pointer uppercase tracking-widest">
                Lihat Kejuruan
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
