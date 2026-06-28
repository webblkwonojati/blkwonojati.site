"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Building, CheckCircle, Calendar } from 'lucide-react';
import ButtonPremium from '@/components/ui/ButtonPremium';

interface JobCardProps {
  job: any;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <article className="h-full">
      <div
        onClick={() => router.push(`/lowongan-kerja/${job.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push(`/lowongan-kerja/${job.id}`); } }}
        className="group h-full rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 cursor-pointer p-6 flex flex-col"
      >
        <div className="flex-1">
          <div className="flex gap-4 mb-6 items-start">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1.5 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              {job.poster_url ? (
                <div className="relative w-full h-full">
                  <Image
                    src={job.poster_url}
                    alt="Logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <Building className="w-5 h-5 text-slate-200 group-hover:text-primary transition-colors" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 tracking-tight">
                {job.posisi}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-medium text-slate-700 line-clamp-1">{job.instansi_perusahaan}</span>
                <CheckCircle className="w-2.5 h-2.5 text-blue-500/80" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{job.lokasi}</span>
            <span className="text-slate-200">•</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              {job.tipe_pekerjaan}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between w-full">
          <div className="flex flex-col gap-0">
            <span className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.1em] leading-none mb-1">Batas Lamaran</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-2.5 h-2.5 text-slate-700" />
              <span className="text-xs font-bold text-slate-700">
                {job.batas_lamaran ? new Date(job.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Segera'}
              </span>
            </div>
          </div>

          <ButtonPremium
            href={`/lowongan-kerja/${job.id}`}
            size="sm"
            icon="east"
          >
            Detail
          </ButtonPremium>
        </div>
      </div>
    </article>
  );
}
