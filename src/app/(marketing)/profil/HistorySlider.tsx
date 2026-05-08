"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Hoisted static data
const IMAGES = ["/about1.jpg", "/about2.jpg"];

export default function HistorySlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-200 bg-slate-100 relative shadow-2xl shadow-slate-200/50"
      style={{ aspectRatio: '4 / 3' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={IMAGES[currentImage]}
            fill
            className="object-cover"
            alt={`History image ${currentImage + 1}`}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {IMAGES.map((_, i: number) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentImage === i ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
