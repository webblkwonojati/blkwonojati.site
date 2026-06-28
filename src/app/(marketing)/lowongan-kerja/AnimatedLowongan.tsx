"use client";

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, X, ArrowLeft, ArrowRight, LogIn, UserPlus, RotateCcw, Zap } from 'lucide-react';
import Link from 'next/link';
import JobCard from './JobCard';

interface AnimatedLowonganProps {
  jobs: any[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function AnimatedLowongan({ jobs }: AnimatedLowonganProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pageSize = 9;

  const startIndex = (currentPage - 1) * pageSize;
  const visibleJobs = jobs.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(jobs.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 mt-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-slate-900 text-white text-[10px] font-bold">
            {jobs.length}
          </span>
          <span className="uppercase tracking-[0.15em] text-[10px] font-semibold text-slate-700">
            Peluang Ditemukan
          </span>
        </div>
        <span className="text-[10px] font-medium text-slate-700 uppercase tracking-wider hidden md:block">
          Halaman {currentPage} dari {totalPages}
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200 flex flex-col items-center text-center">
          <ClipboardCheck className="w-16 h-16 text-slate-200 mb-4" />
          <h4 className="text-lg font-bold text-slate-900 mb-1">Lowongan Tidak Ditemukan</h4>
          <p className="text-sm text-slate-700 mb-6">Kami tidak menemukan pekerjaan yang sesuai dengan kriteria Anda.</p>
          <button
            onClick={() => window.location.href = '/lowongan-kerja'}
            className="group relative flex items-center gap-3 px-6 h-10 bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
          >
            <span>Reset Semua Filter</span>
            <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
          </button>
        </div>
      ) : (
        <>
          <motion.div
            key={currentPage}
            variants={container}
            initial="hidden"
            animate="show"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleJobs.map((j: any) => (
                <motion.div
                  variants={item}
                  layout
                  key={j.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <JobCard job={j} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-center pt-20 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[40px] h-10 rounded-xl text-xs font-bold transition-all ${
                    page === currentPage
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Eksplorasi Karir</h3>
                <p className="text-slate-500 font-medium text-sm">
                  Masuk untuk mendapatkan akses penuh ke detail lowongan eksklusif dari mitra industri kami.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <Link
                href="/login"
                className="group relative flex items-center justify-center gap-3 w-full h-12 bg-primary rounded-lg text-[10px] font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-95"
              >
                Masuk Sekarang
                <LogIn className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/register"
                className="group relative flex items-center justify-center gap-3 w-full h-12 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all duration-300 active:scale-95"
              >
                Belum punya akun?
                <UserPlus className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full text-center text-slate-500 font-bold uppercase text-[9px] tracking-widest py-2 hover:text-slate-600 transition-colors"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
