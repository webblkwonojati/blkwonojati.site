"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PreloaderClient({ targetUrl }: { targetUrl: string }) {
  const [dots, setDots] = useState("");
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Redirect setelah 2 detik
    const timer = setTimeout(() => {
      window.location.href = targetUrl;
    }, 2000);

    // Tampilkan tombol manual jika redirect lambat/gagal (setelah 3 detik)
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    // Animasi titik-titik pada teks
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      clearInterval(interval);
    };
  }, [targetUrl]);

  return (
    <div className="min-h-screen w-full bg-[#1a3a1a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-display">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay">
        <motion.div
          animate={{ x: [0, -50], y: [0, -50] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ backgroundImage: "url('/batik.webp')", backgroundSize: "800px" }}
          className="absolute -inset-[200px]"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-24 h-24 bg-white rounded-3xl shadow-2xl shadow-black/40 flex items-center justify-center p-4 mb-8 border border-white/10"
        >
          <Image src="/logo-blk.png" alt="Logo BLK Wonojati" width={80} height={80} className="object-contain" priority />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4"
        >
          Mengarahkan Anda{dots}
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-300 font-medium max-w-md text-sm md:text-base leading-relaxed"
        >
          Harap tunggu sebentar, Anda sedang dialihkan ke halaman tujuan yang aman.
        </motion.p>

        {/* Animated Progress Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-48 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden relative"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute top-0 bottom-0 left-0 bg-primary shadow-[0_0_15px_rgba(74,222,128,0.5)] rounded-full"
          />
        </motion.div>

        {/* Manual Click Fallback */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: showFallback ? 1 : 0 }}
           className="mt-8 h-8"
        >
           {showFallback && (
             <a href={targetUrl} className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4">
               Klik di sini jika pengalihan otomatis tidak berjalan
             </a>
           )}
        </motion.div>
      </div>
    </div>
  );
}
