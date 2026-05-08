"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Typography, 
  Tag, 
  Button, 
  Modal, 
  Input, 
  Flex, 
  Divider,
  Space
} from 'antd';
import { 
  EnvironmentOutlined, 
  CalendarOutlined, 
  CarryOutOutlined, 
  CheckCircleFilled, 
  BankOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { trackLowonganView, recordLowonganApply } from '../actions';
import { toast } from "sonner";
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

import Image from 'next/image';

export default function DetailClient({ job, descriptionLines, qualificationLines, session }: any) {
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
    if (session?.user) {
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
      {/* Basic Navigation */}
      <Link href="/lowongan-kerja" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all mb-12">
        <ArrowLeftOutlined className="text-[10px]" />
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              
              {/* Simplified Overlaid Batas Lamaran */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent text-white backdrop-blur-[2px]">
                 <Flex vertical gap={2}>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Batas Lamaran</span>
                    <span className="text-sm font-bold">
                       {job.batas_lamaran ? new Date(job.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Segera'}
                    </span>
                 </Flex>
              </div>
            </div>
          ) : (
            <div className="aspect-square bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-200 border border-dashed border-slate-200">
               <BankOutlined className="text-5xl" />
               <Text className="text-[10px] font-bold uppercase tracking-widest mt-4">No Image</Text>
            </div>
          )}
          
          <Button 
            type="primary" 
            size="large" 
            block 
            icon={<ThunderboltOutlined />}
            onClick={handleLamarClick}
            className="h-14 mt-6 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-green-500/10 border-none bg-green-600 hover:bg-green-700"
          >
            Lamar Sekarang
          </Button>
        </div>

        {/* Content Area (Order 1 on Mobile) */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 md:space-y-16">
           {/* Header Section */}
            <div className="space-y-4">
               <Flex align="center" gap="middle">
                 <Tag className="!m-0 text-primary bg-primary/5 border-none rounded-full px-4 py-1 uppercase text-[9px] font-extrabold tracking-[0.2em]">
                    {job.jurusan || 'Semua Jurusan'}
                 </Tag>
                 <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                    {job.tipe_pekerjaan}
                 </Text>
               </Flex>

              <Title level={1} className="!m-0 text-2xl md:text-3xl lg:text-4xl !font-bold !tracking-tight !text-slate-900 leading-tight">
                 {job.posisi}
              </Title>

               <Flex align="center" gap="small" className="text-slate-400">
                  <Text className="font-bold text-slate-900">{job.instansi_perusahaan}</Text>
                  <CheckCircleFilled className="text-blue-500/80 text-[10px]" />
                 <div className="w-px h-3 bg-slate-200 mx-2" />
                  <EnvironmentOutlined className="text-xs" />
                  <Text className="text-[10px] font-bold uppercase tracking-widest">{job.lokasi}</Text>
               </Flex>
           </div>

            <div className="h-px w-full bg-slate-100" />

           {/* Core Content */}
           <div className="grid gap-12 pt-4">
               {/* Deskripsi Section */}
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

               {/* Kualifikasi Section */}
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
              <Paragraph className="text-[11px] text-slate-400 font-medium italic">
                 * Lowongan ini diverifikasi oleh BKK UPT BLK Wonojati. Jika Anda menemui kendala, silakan hubungi pusat bantuan kami.
              </Paragraph>
           </div>
        </div>
      </div>

      {/* Simplified Verification Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={400}
        closeIcon={null}
        styles={{ 
          body: { padding: '28px md:40px', borderRadius: '1.5rem' }
        }}
      >
        <Flex vertical align="center" gap="middle" className="text-center">
           <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-primary mb-2">
              <ThunderboltOutlined className="text-2xl" />
           </div>
           <Title level={4} className="!m-0 !font-bold">Verifikasi Alumni</Title>
           <Text type="secondary" className="text-xs px-4">
             Silakan masukkan NIK Anda untuk melanjutkan pendaftaran.
           </Text>
           
           <div className="w-full space-y-4 mt-6">
              <Input 
                size="large" 
                placeholder="16 Digit NIK" 
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                maxLength={16}
                className="h-12 rounded-xl border-slate-200 bg-slate-50 font-bold tracking-[0.2em] text-center"
              />
              <Button 
                type="primary" 
                size="large" 
                block 
                loading={isVerifying}
                onClick={handleVerifyAndApply}
                className="h-12 font-bold uppercase text-[10px] tracking-widest rounded-xl"
              >
                 Konfirmasi & Lamar
              </Button>
              <Button 
                type="text" 
                block 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-2"
              >
                Kembali
              </Button>
           </div>
        </Flex>
      </Modal>
    </div>
  );
}
