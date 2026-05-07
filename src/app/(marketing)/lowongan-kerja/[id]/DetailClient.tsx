'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackLowonganView, recordLowonganApply } from '../actions';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  ExternalLink,
  Building2,
  Eye,
  Target,
  Loader2,
  Lock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function DetailClient({ job, descriptionLines, qualificationLines, session }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nik, setNik] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (job?.id) {
       trackLowonganView(job.id);
    }
  }, [job?.id]);

  const handleLamarClick = async () => {
    if (session?.user) {
      // Already logged in, record and go
      const res = await recordLowonganApply(job.id, {
        nik: (session.user as any).nik || 'LOGGED_IN_USER',
        nama: session.user.name || 'User',
        email: session.user.email
      });
      if (res.success) {
        window.open(job.link_pendaftaran, '_blank');
      } else {
        toast.error("Gagal mencatat lamaran.");
      }
    } else {
      // Not logged in, show modal
      setIsModalOpen(true);
    }
  };

  const handleVerifyAndApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nik.length !== 16) {
      toast.error("NIK harus 16 digit");
      return;
    }

    setIsVerifying(true);
    try {
      // Verify NIK first using the existing API
      const verifyRes = await fetch("/api/auth/verify-nik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nik })
      });
      
      const verifyData = await verifyRes.json();
      
      if (!verifyRes.ok) {
        toast.error(verifyData.error || "NIK tidak terdaftar sebagai peserta pelatihan.");
        return;
      }

      // If valid, record application
      const recordRes = await recordLowonganApply(job.id, {
        nik: verifyData.student.nik,
        nama: verifyData.student.full_name,
        email: ""
      });

      if (recordRes.success) {
        toast.success("Data berhasil diverifikasi!");
        setIsModalOpen(false);
        setIsApplied(true);
        // Open the link after a short delay
        setTimeout(() => {
          window.open(job.link_pendaftaran, '_blank');
        }, 500);
      } else {
        toast.error("Gagal mencatat lamaran.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setIsVerifying(false);
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      <Link href="/lowongan-kerja" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Daftar Lowongan
      </Link>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card className="border-none shadow-2xl shadow-slate-200/50 overflow-hidden rounded-[32px]">
          {job.poster_url && (
            <motion.div variants={item} className="w-full bg-slate-50 border-b border-primary/5 flex items-center justify-center p-4 lg:p-10">
              <img 
                src={job.poster_url} 
                alt={`Poster ${job.posisi}`} 
                className="max-w-full h-auto max-h-[700px] rounded-2xl shadow-2xl shadow-primary/10 object-contain border border-slate-200"
              />
            </motion.div>
          )}
          <CardHeader className="p-8 lg:p-12 border-b bg-white relative">
            <motion.div variants={item} className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="flex gap-6 items-start w-full">
                <div className="size-20 rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden p-2">
                   {job.poster_url ? (
                     <img src={job.poster_url} className="w-full h-full object-contain" />
                   ) : (
                     <Building2 className="w-10 h-10" />
                   )}
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="default" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                        {job.jurusan || 'Semua Jurusan'}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <Eye className="w-3.5 h-3.5" />
                        {job.views_count || 0} Dilihat
                      </div>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                      {job.posisi}
                    </h1>
                    <p className="text-xl text-muted-foreground font-semibold flex items-center gap-2">
                      {job.instansi_perusahaan}
                      <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/10" />
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-50 border-slate-200 text-slate-600 font-bold">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.lokasi}
                    </Badge>
                    <Badge className="py-1.5 px-3 bg-slate-900 font-bold uppercase tracking-wider">
                      {job.tipe_pekerjaan}
                    </Badge>
                    {job.batas_lamaran && (
                      <Badge variant="destructive" className="flex items-center gap-1.5 py-1.5 px-3 font-bold">
                        <Calendar className="w-4 h-4" />
                        Batas: {new Date(job.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0">
                <Button 
                  onClick={handleLamarClick}
                  size="lg" 
                  className="w-full lg:w-auto font-black text-lg h-14 px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 rounded-2xl"
                >
                    Lamar Sekarang
                    <ExternalLink className="ml-2 w-5 h-5 shrink-0" />
                </Button>
              </div>
            </motion.div>
          </CardHeader>

          <CardContent className="p-8 lg:p-12 bg-slate-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Deskripsi */}
              <motion.div variants={item} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-l-4 border-primary pl-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  Deskripsi Pekerjaan
                </h3>
                <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                  {descriptionLines.map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </motion.div>

              {/* Kualifikasi */}
              <motion.div variants={item} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-l-4 border-primary pl-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Target className="w-5 h-5" />
                  </div>
                  Syarat & Kualifikasi
                </h3>
                <ul className="space-y-4">
                  {qualificationLines.map((line: string, i: number) => {
                    const cleanedLine = line.replace(/^- /, '');
                    return (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-slate-600 leading-relaxed font-medium">{cleanedLine}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2rem] border-slate-100 p-8">
          <DialogHeader className="items-center text-center">
            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
               <Lock className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Verifikasi Identitas</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium pt-2">
              Masukkan NIK Anda untuk melanjutkan pendaftaran ke pihak perusahaan.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleVerifyAndApply} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="nik" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">NIK (16 Digit)</Label>
              <Input 
                id="nik" 
                placeholder="Sesuaikan dengan KTP" 
                value={nik}
                onChange={(e) => setNik(e.target.value.replace(/\D/g, "").slice(0, 16))}
                className="h-14 bg-slate-50 border-slate-200 rounded-xl focus:ring-primary focus:border-primary font-bold text-lg tracking-widest text-center"
                autoComplete="off"
                required
              />
            </div>

            <Button 
                type="submit" 
                disabled={isVerifying || nik.length !== 16}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-slate-900 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Memverifikasi...
                </>
              ) : (
                "Konfirmasi & Lamar"
              )}
            </Button>
          </form>
          
          <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider mt-2">
            Hanya untuk Alumni & Siswa BLK Wonojati
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
