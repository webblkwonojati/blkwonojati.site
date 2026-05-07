'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Bookmark, 
  CheckCircle,
  Building2,
  Target,
  Lock
} from "lucide-react";
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: any;
  isLoggedIn: boolean;
  isSiswa: boolean;
  initialIsBookmarked: boolean;
}

export default function JobCard({ job, isLoggedIn, isSiswa, initialIsBookmarked }: JobCardProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLiking, setIsLiking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link click
    e.stopPropagation();

    if (!isSiswa) {
      router.push('/login?message=Silakan login sebagai siswa untuk menyimpan lowongan.');
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    const newStatus = !isBookmarked;

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job.id,
          action: newStatus ? 'bookmark' : 'unbookmark',
        }),
      });

      if (!res.ok) {
        throw new Error('Gagal memproses bookmark');
      }

      setIsBookmarked(newStatus);
      showToast(newStatus ? 'Lowongan berhasil disimpan!' : 'Lowongan dihapus dari simpanan.');
      
      // Opt: revalidate if we were using router.refresh(), but local state is fine.
    } catch (error) {
      showToast('Gagal memproses. Coba lagi nanti.');
    } finally {
      setIsLiking(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <article className="relative h-full">
      <div 
        onClick={() => {
          if (!isLoggedIn) {
            router.push('/login?callbackUrl=/lowongan-kerja');
          } else {
            router.push(`/lowongan-kerja/${job.id}`);
          }
        }}
        className="cursor-pointer h-full"
      >
        <Card className={`group relative h-full flex flex-col hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white border-slate-200 overflow-hidden rounded-3xl ${!isLoggedIn ? 'opacity-90' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors"></div>
          
          {!isLoggedIn && (
            <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-white/90 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-slate-900">Login untuk Lihat Detail</span>
               </div>
            </div>
          )}
          <CardHeader className="p-5 md:p-6 pb-2 flex flex-row items-start gap-3 md:gap-4 space-y-0 relative z-10 w-full justify-between">
            {/* Logo Box */}
            <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white border border-slate-100 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all shrink-0 overflow-hidden p-1.5">
                     {job.poster_url ? (
                       <img src={job.poster_url} className="w-full h-full object-contain" alt="logo" />
                     ) : (
                   <Building2 className="w-7 h-7 text-slate-400 group-hover:text-primary transition-all duration-300" />
                 )}
              </div>
              
              {/* Title & Company */}
              <div className="flex-1 pr-2">
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter mb-2 border-primary/20 bg-primary/5 text-accent rounded-md">
                  {job.jurusan || 'Alumni BLK'}
                </Badge>
                <CardTitle className="text-[18px] font-bold text-slate-900 group-hover:text-primary leading-tight transition-colors mb-1 line-clamp-2 min-h-[2.5rem]">
                  {job.posisi}
                </CardTitle>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-sm font-bold text-slate-500 line-clamp-1 group-hover:text-slate-700 transition-colors">{job.instansi_perusahaan}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10 shrink-0" />
                </div>
              </div>
            </div>

            {/* Bookmark Button */}
            <button 
              onClick={handleBookmarkClick}
              disabled={isLiking}
              className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors z-20 outline-none"
            >
               <motion.div
                 whileTap={{ scale: 0.8 }}
                 animate={isBookmarked ? { scale: [1, 1.2, 1] } : {}}
                 transition={{ duration: 0.3 }}
               >
                 <Bookmark 
                   className={`w-5 h-5 transition-colors duration-300 ${isBookmarked ? 'fill-primary text-primary' : 'text-slate-400'}`} 
                 />
               </motion.div>
            </button>
          </CardHeader>

          <CardContent className="p-5 md:p-6 flex-1 flex flex-col relative z-10 w-full mt-2">
            {/* Info List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-400 group-hover:translate-x-1 transition-transform">
                <MapPin className="w-4 h-4 shrink-0 text-accent/60" />
                <span className="text-xs font-bold text-slate-600">{job.lokasi}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 group-hover:translate-x-1 transition-transform duration-300">
                <Target className="w-4 h-4 shrink-0 text-accent/60" />
                <span className="text-xs font-bold text-slate-600 line-clamp-1">{job.jurusan || 'Semua Jurusan'}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 group-hover:translate-x-1 transition-transform duration-500">
                <Briefcase className="w-4 h-4 shrink-0 text-accent/60" />
                <span className="text-xs font-bold text-slate-600">{job.tipe_pekerjaan}</span>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Batas Lamaran</span>
                 <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                   <Clock className="w-3 h-3 text-accent" />
                   {job.batas_lamaran ? new Date(job.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Segera'}
                 </span>
              </div>
              <div className="group/btn relative">
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-full scale-0 group-hover/btn:scale-150 transition-transform duration-500"></div>
                <Badge variant="default" className="relative h-10 px-4 flex items-center justify-center rounded-xl bg-slate-900 group-hover:bg-accent transition-all duration-300 shadow-lg cursor-pointer">
                   {isLoggedIn ? 'Lihat Detail' : <><Lock className="w-3 h-3 mr-1.5" /> Login</>}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mini Toast */}
      {toastMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-xl z-50 whitespace-nowrap"
        >
          {toastMessage}
        </motion.div>
      )}
    </article>
  );
}
