"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface GaleriItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
}

export default function GaleriGrid({ initialItems, categories }: { initialItems: GaleriItem[], categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = activeCategory === "Semua" 
    ? initialItems 
    : initialItems.filter(item => item.category === activeCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Pills - Scrollable on Mobile */}
      <div className="flex flex-nowrap overflow-x-auto lg:flex-wrap lg:justify-center gap-3 pb-4 lg:pb-0 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
              activeCategory === cat 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105" 
                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                priority={index < 4}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                 <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                      {item.category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>
                 </div>
                 <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-75">
                    <ZoomIn className="w-5 h-5" />
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox - Premium Studio View */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
            onClick={() => setSelectedImage(null)}
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
            
            {/* Floating Top Controls - Moved below navbar area */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              className="absolute top-8 md:top-24 inset-x-0 px-4 md:px-8 flex justify-between items-center z-[110]"
            >
              <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md p-2 pr-6 rounded-2xl border border-white/10 shadow-2xl">
                 <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <ImageIcon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-1">Gallery View</p>
                    <h4 className="text-white text-xs font-bold m-0 line-clamp-1 max-w-[200px]">{filteredItems[selectedImage].title}</h4>
                 </div>
              </div>

              <button
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 hover:bg-red-500 border border-white/20 hover:border-red-500 flex items-center justify-center text-white transition-all group backdrop-blur-xl shadow-2xl active:scale-90"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </motion.div>

            {/* Navigation Buttons - Floating Side */}
            <div className="absolute inset-y-0 left-8 md:flex items-center hidden z-50">
               <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-xl group active:scale-90"
               >
                  <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
               </button>
            </div>
            <div className="absolute inset-y-0 right-8 md:flex items-center hidden z-50">
               <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-xl group active:scale-90"
               >
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            {/* Main Stage */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 bg-slate-900/50" 
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={filteredItems[selectedImage].image_url}
                alt={filteredItems[selectedImage].title}
                fill
                sizes="100vw"
                quality={100}
                className="object-contain p-4 md:p-8"
              />
              
              {/* Bottom Caption Overlay - Clean Gradient */}
              <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="px-4 py-1.5 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 inline-block border border-primary/30 backdrop-blur-md">
                      {filteredItems[selectedImage].category}
                    </span>
                    <h2 className="text-white text-xl md:text-5xl font-black tracking-tighter leading-tight drop-shadow-2xl">
                      {filteredItems[selectedImage].title}
                    </h2>
                  </motion.div>
              </div>
            </motion.div>

            {/* Mobile Navigation Bar */}
            <div className="absolute bottom-8 flex gap-4 md:hidden z-50">
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all">
                  <ChevronRight className="w-6 h-6" />
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
