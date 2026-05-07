"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "@/lib/animations";

export default function HomeVideo() {
  return (
    <section className="py-24 px-6 border-y border-slate-100 relative overflow-hidden bg-white/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Bincang Podcast Pelatihan Barista
            </h2>
            <div className="space-y-5 text-slate-500 text-sm leading-relaxed text-justify">
              <p>Video Podcast UPT BLK Wonojati Malang kali ini menghadirkan obrolan santai bersama peserta pelatihan kejuruan pelatihan Peracikan Minuman Kopi (Barista). Dalam episode perdana ini, para peserta berbagi pengalaman selama mengikuti pelatihan, mulai dari proses belajar teknik dasar meracik kopi, mengenal berbagai jenis kopi, hingga praktik langsung melayani pelanggan.</p>
              <p>Melalui podcast ini, kita juga dapat mengetahui bagaimana pelatihan di UPT BLK Wonojati Malang membantu meningkatkan keterampilan, membangun kepercayaan diri, serta membuka peluang kerja dan wirausaha di bidang kopi. Yuk, simak cerita inspiratif dari para peserta pelatihan dan kenali lebih dekat dunia barista bersama BLK Wonojati Malang!</p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50"
          >
            <iframe
              src="https://www.youtube.com/embed/8r9-RA-T1sc"
              title="YouTube Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
