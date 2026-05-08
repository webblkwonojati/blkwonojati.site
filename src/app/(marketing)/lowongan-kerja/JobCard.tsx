"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  Typography,
  Tag,
  Flex
} from 'antd';
import Image from 'next/image';
import { 
  CheckCircleFilled,
  BankOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import ButtonPremium from '@/components/ui/ButtonPremium';

const { Title, Text } = Typography;

interface JobCardProps {
  job: any;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <article className="h-full">
      <Card 
        hoverable
        onClick={() => router.push(`/lowongan-kerja/${job.id}`)}
        className="group h-full rounded-2xl border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
        styles={{ body: { padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' } }}
      >
        <div className="flex-1">
          {/* Header Area */}
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
                <BankOutlined className="text-2xl text-slate-200 group-hover:text-primary transition-colors" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 tracking-tight">
                {job.posisi}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] font-medium text-slate-500 line-clamp-1">{job.instansi_perusahaan}</span>
                <CheckCircleFilled className="text-blue-500/80 text-[10px]" />
              </div>
            </div>
          </div>

          {/* Info Area */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{job.lokasi}</span>
            <span className="text-slate-200 inline-block">•</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
               {job.tipe_pekerjaan}
            </span>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between w-full">
          <Flex vertical gap={0}>
             <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] leading-none mb-1">Batas Lamaran</Text>
             <Flex align="center" gap="small">
               <CalendarOutlined className="text-[10px] text-slate-400" />
               <Text className="text-xs font-bold text-slate-700">
                 {job.batas_lamaran ? new Date(job.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Segera'}
               </Text>
             </Flex>
          </Flex>

          <ButtonPremium
            href={`/lowongan-kerja/${job.id}`}
            size="sm"
            icon="east"
          >
            Detail
          </ButtonPremium>
        </div>
      </Card>
    </article>
  );
}
