"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Play } from "lucide-react";

export default function HomeVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 px-6 relative bg-green-50/60 overflow-hidden">
      {/* Ambient Gradient Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(92,162,90,0.3) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tighter leading-tight">
                Bincang Podcast <br />
                <span className="text-primary">Pelatihan Barista</span>
              </h2>
            </div>
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-medium">
              <p>Video Podcast UPT BLK Wonojati Malang kali ini menghadirkan obrolan santai bersama peserta pelatihan kejuruan pelatihan Peracikan Minuman Kopi (Barista).</p>
              <p>Melalui podcast ini, kita juga dapat mengetahui bagaimana pelatihan di UPT BLK Wonojati Malang membantu meningkatkan keterampilan dan membangun kepercayaan diri.</p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                <Play className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900">Tonton di YouTube</span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="w-full relative aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-slate-900 group">
              {!isPlaying ? (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <Image
                    src="https://img.youtube.com/vi/8r9-RA-T1sc/maxresdefault.jpg"
                    alt="Video Thumbnail - Podcast BLK Wonojati"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-1">YouTube Video</p>
                    <p className="text-white/80 text-xs font-medium">Klik untuk memutar podcast</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/8r9-RA-T1sc?autoplay=1"
                  title="Podcast BLK Wonojati - Pelatihan Barista"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
