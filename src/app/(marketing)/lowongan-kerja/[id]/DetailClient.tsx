"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  CheckCircle,
  Building,
  Zap,
  ArrowLeft,
  X,
  Loader2
} from "lucide-react";
import { trackLowonganView, recordLowonganApply } from '../actions';
import { toast } from "sonner";
import Link from 'next/link';
import Image from 'next/image';

export default function DetailClient({ job, descriptionLines, qualificationLines }: any) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
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
    if (user) {
      const res = await recordLowonganApply(job.id, {
        nik: (user.publicMetadata as any).nik || 'LOGGED_IN_USER',
        nama: user.fullName || user.username || 'User',
        email: user.primaryEmailAddress?.emailAddress || ''
      });
      if (res.success) {
        window.open(job.link_pendaftaran, '_blank');
      } else {
        toast.error("Gagal mencatat lamaran.");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleVerifyAndApply = async () => {
    if (nik.length !== 16) {
      toast.error("NIK harus 16 digit");
      return;
    }

    setIsVerifying(true);
    try {
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

      const recordRes = await recordLowonganApply(job.id, {
        nik: verifyData.student.nik,
        nama: verifyData.student.full_name,
        email: ""
      });

      if (recordRes.success) {
        toast.success("Data berhasil diverifikasi!");
        setIsModalOpen(false);
        setIsApplied(true);
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

  return (
    <div className="mx-auto max-w-6xl font-sans pb-32">
      <Link href="/lowongan-kerja" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-all mb-12">
        <ArrowLeft className="w-3 h-3" />
        Kembali ke Daftar
      </Link>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="lg:col-span-4 order-2 lg:order-1 sticky top-10">
          {job.poster_url ? (
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 relative group border-4 border-white">
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={job.poster_url}
                  alt={job.posisi}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent text-white backdrop-blur-[2px]">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Batas Lamaran</span>
                  <span className="text-sm font-bold">
                    {job.batas_lamaran ? new Date(job.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Segera'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-square bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-200 border border-dashed border-slate-200">
              <Building className="w-12 h-12" />
              <span className="text-[10px] font-bold uppercase tracking-widest mt-4">No Image</span>
            </div>
          )}

          <button
            onClick={handleLamarClick}
            className="w-full h-14 mt-6 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-green-500/10 bg-green-600 hover:bg-green-700 text-white transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Lamar Sekarang
          </button>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 md:space-y-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-primary bg-primary/5 rounded-full px-4 py-1 uppercase text-[9px] font-extrabold tracking-[0.2em]">
                {job.jurusan || 'Semua Jurusan'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                {job.tipe_pekerjaan}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              {job.posisi}
            </h1>

            <div className="flex items-center gap-2 text-slate-500 flex-wrap">
              <span className="font-bold text-slate-900">{job.instansi_perusahaan}</span>
              <CheckCircle className="w-2.5 h-2.5 text-blue-500/80" />
              <div className="w-px h-3 bg-slate-200 mx-1" />
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{job.lokasi}</span>
            </div>
          </div>

          <div className="h-px w-full bg-slate-100" />

          <div className="grid gap-12 pt-4">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-primary rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Deskripsi Pekerjaan</h2>
              </div>
              <div className="text-slate-600 leading-relaxed text-base space-y-4 font-normal">
                {descriptionLines.map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-primary rounded-full" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Kualifikasi & Syarat</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {qualificationLines.map((line: string, i: number) => {
                  const cleanedLine = line.replace(/^- /, '');
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary/40 mt-2 shrink-0" />
                      <span className="text-slate-600 text-sm font-medium leading-relaxed">{cleanedLine}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-50 mt-10">
            <p className="text-[11px] text-slate-500 font-medium italic">
              * Lowongan ini diverifikasi oleh BKK UPT BLK Wonojati. Jika Anda menemui kendala, silakan hubungi pusat bantuan kami.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-8 md:p-10 flex flex-col items-center text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-primary mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Verifikasi Alumni</h4>
              <p className="text-xs text-slate-500 px-4 mb-6">
                Silakan masukkan NIK Anda untuk melanjutkan pendaftaran.
              </p>

              <div className="w-full space-y-4">
                <input
                  placeholder="16 Digit NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  maxLength={16}
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 font-bold tracking-[0.2em] text-center px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  onClick={handleVerifyAndApply}
                  disabled={isVerifying}
                  className="w-full h-12 font-bold uppercase text-[10px] tracking-widest rounded-xl bg-primary text-white hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    'Konfirmasi & Lamar'
                  )}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full text-slate-500 font-bold uppercase text-[9px] tracking-widest py-2 hover:text-slate-600 transition-colors"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
