"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

const testimonials = [
  {
    name: "Andi Wijaya",
    role: "Owner GreenFarm",
    text: "Kurikulum praktis dan pelatihan yang dipandu langsung oleh praktisi industri memberikan fondasi yang kuat bagi bisnis saya."
  },
  {
    name: "Siti Aminah",
    role: "Alumni Barista",
    text: "Dukungan komunitas yang luar biasa membantu saya membuka kedai kopi sendiri setelah lulus dari program BLK."
  },
  {
    name: "Budi Santoso",
    role: "Specialist Hydro",
    text: "Modul pelatihan kelas dunia yang menjembatani kesenjangan antara teori dan praktik lapangan yang sebenarnya."
  }
];

export default function HomeTestimonials() {
  return (
    <section className="py-24 px-6 bg-green-50 border-b border-green-100/50 relative overflow-hidden">
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
            backgroundImage: "url('/batik.webp')",
            backgroundSize: "1200px",
            filter: "invert(1) brightness(0.5)"
          }}
          className="absolute -inset-[400px]"
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 font-display leading-none">
            Cerita Sukses Alumni
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-slate-200 transition-all duration-300 p-6 flex flex-col gap-4"
            >
              <p className="text-slate-500 italic leading-relaxed text-sm md:text-base font-medium min-h-[100px]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-none mb-1">{t.name}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
