"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ArrowRight, Newspaper } from "lucide-react";
import ButtonPremium from "@/components/ui/ButtonPremium";

interface BeritaItem {
  id: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  published_at: string | null;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HomeNews({ news }: { news: BeritaItem[] }) {
  if (!news || news.length === 0) return null;

  return (
    <section className="py-24 px-6 relative bg-transparent overflow-hidden">
      {/* Subtle Batik Pattern - Ultra Soft Opacity */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, -100],
            y: [0, -100]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            backgroundImage: "url('/batik.png')", 
            backgroundSize: "1200px",
            filter: "invert(1) brightness(0.5)" 
          }}
          className="absolute -inset-[400px]"
        />
      </div>

      {/* Decorative Background Asset */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] opacity-10 pointer-events-none z-0">
        <img src="/gradien-1.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter leading-none text-balance font-display">
              Update Informasi <br />
              <span className="text-primary">& Artikel Terbaru</span>
            </h2>
          </div>
          <ButtonPremium href="/berita" variant="outline" icon="east">
            Daftar Berita
          </ButtonPremium>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ 
                delay: idx * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <Link href={`/berita/${item.id}`} className="group block h-full">
                <article className="h-full bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <Newspaper className="w-12 h-12" />
                      </div>
                    )}
                    {/* Category Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {item.category || "Berita"}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px w-6 bg-primary/30" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        {formatDate(item.published_at || "")}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6">
                      {item.excerpt || "Baca informasi selengkapnya mengenai kabar terbaru dari BLK Wonojati."}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">
                        Baca Artikel
                      </span>
                      <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
