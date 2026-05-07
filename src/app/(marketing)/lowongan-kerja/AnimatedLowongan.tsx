'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, Plus } from "lucide-react";
import Link from 'next/link';
import JobCard from './JobCard';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

interface AnimatedLowonganProps {
  jobs: any[];
  isLoggedIn: boolean;
  isSiswa: boolean;
  bookmarkedJobIds: string[];
}

export default function AnimatedLowongan({ jobs, isLoggedIn, isSiswa, bookmarkedJobIds }: AnimatedLowonganProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pageSize = 9;
  const totalPages = Math.ceil(jobs.length / pageSize);

  // Calculate visible range
  const startIndex = (currentPage - 1) * pageSize;
  const visibleJobs = jobs.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (!isLoggedIn && page > 1) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPage(page);
    // Smooth scroll back to top of the results
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      } 
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-12 mt-8">
      {/* Stats / Results Count */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
         <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
            <span className="text-accent bg-accent/10 px-3 py-1 rounded-full">{jobs.length}</span>
            <span className="uppercase tracking-widest text-[11px]">Lowongan ditemukan</span>
         </div>
         <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Halaman {currentPage} dari {totalPages || 1}
         </div>
      </div>

      {/* Grid */}
      {jobs.length === 0 ? (
        <Card className="border-dashed py-24 text-center text-slate-500 bg-white/50 backdrop-blur-sm rounded-[32px] shadow-sm">
          <CardContent>
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pencarian Tidak Ditemukan</h3>
            <p className="max-w-xs mx-auto text-slate-500">Kami tidak menemukan lowongan yang sesuai dengan kriteria Anda saat ini.</p>
            <Link href="/lowongan-kerja" passHref>
              <Button 
                variant="outline" 
                className="mt-8 rounded-xl border-slate-200 uppercase text-[10px] font-black tracking-widest"
              >
                Reset Semua Filter
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <motion.div 
            key={currentPage} // Reset animation on page change
            variants={container}
            initial="hidden"
            animate="show"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleJobs.map((j) => (
                <motion.div 
                  variants={item} 
                  layout 
                  key={j.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <JobCard 
                    job={j} 
                    isLoggedIn={isLoggedIn}
                    isSiswa={isSiswa} 
                    initialIsBookmarked={bookmarkedJobIds.includes(j.id)} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-12 border-t border-slate-100">
               <Button 
                variant="ghost" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl h-12 w-12 p-0 text-slate-400 hover:text-slate-900 disabled:opacity-30"
               >
                 <ChevronRight className="w-5 h-5 rotate-180" />
               </Button>

               {[...Array(totalPages)].map((_, i) => {
                 const pageNum = i + 1;
                 const isActive = currentPage === pageNum;
                 return (
                   <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-12 w-12 rounded-xl font-black transition-all ${
                      isActive 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200 scale-110" 
                        : "bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-900 border border-slate-100"
                    }`}
                   >
                     {pageNum}
                   </Button>
                 );
               })}

               <Button 
                variant="ghost" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl h-12 w-12 p-0 text-slate-400 hover:text-slate-900 disabled:opacity-30"
               >
                 <ChevronRight className="w-5 h-5" />
               </Button>
            </div>
          )}
        </>
      )}

      {/* Login Prompt Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-[32px] p-0 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
               </div>
               <DialogTitle className="text-2xl font-black mb-2 tracking-tight">Eksplorasi Terbatas</DialogTitle>
               <DialogDescription className="text-slate-400 font-medium">
                 Silakan login untuk melihat lebih banyak lowongan kerja dan fitur eksklusif lainnya.
               </DialogDescription>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
          </div>
          <div className="p-8 space-y-4">
             <Link href="/login">
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                   Login Sekarang
                </Button>
             </Link>
             <Link href="/register">
                <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-widest rounded-xl">
                   Belum punya akun? Daftar
                </Button>
             </Link>
             <Button variant="ghost" onClick={() => setShowLoginModal(false)} className="w-full text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                Nanti Saja
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
