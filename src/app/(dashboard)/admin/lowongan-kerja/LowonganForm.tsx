'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addLowongan, editLowongan } from './actions';
import ImageUpload from '@/components/ImageUpload';
import { Button, Input, Select, DatePicker, Typography, Flex, Card, Space } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function LowonganForm({ jobData }: { jobData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [posterUrl, setPosterUrl] = useState(jobData?.poster_url || '');

  const handleSubmit = async (values: any) => {
    setLoading(true);
    
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });
    
    formData.append('poster_url', posterUrl);
    
    if (jobData?.id) {
      formData.append('id', jobData.id);
    }

    try {
      const res = jobData?.id ? await editLowongan(formData) : await addLowongan(formData);
      if (res.success) {
        toast.success(jobData?.id ? 'Lowongan diperbarui' : 'Lowongan ditambahkan');
        router.push('/admin/lowongan-kerja');
        router.refresh();
      } else {
        toast.error('Gagal menyimpan: ' + res.error);
      }
    } catch (err) {
      toast.error('Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* ─── Premium Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <Button 
            type="text" 
            size="small"
            icon={<ArrowLeftOutlined className="text-[10px]" />} 
            onClick={() => router.back()}
            className="text-slate-400 hover:text-primary p-0 h-auto font-black uppercase text-[10px] tracking-widest mb-2"
          >
            Back to List
          </Button>
          <Title level={2} className="!m-0 !font-black !tracking-tighter uppercase !text-3xl text-slate-900">
            {jobData ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
          </Title>
          <Text type="secondary" className="text-xs font-medium">
            Pastikan semua informasi detail pekerjaan sudah sesuai sebelum dipublikasikan.
          </Text>
        </div>
        
        <Button 
          type="primary" 
          form="job-form" 
          htmlType="submit" 
          loading={loading}
          icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
          className="h-12 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-green-500/20 active:scale-95 transition-all w-full md:w-auto"
        >
          {jobData ? 'Update Data' : 'Publish Vacancy'}
        </Button>
      </div>

      <form 
        id="job-form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries());
          handleSubmit(data);
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Column: Media & Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card 
            className="rounded-[2.5rem] border-slate-50 shadow-2xl shadow-slate-200/40 overflow-hidden" 
            styles={{ body: { padding: '24px md:32px' } }}
          >
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-6 px-1">Poster Utama</label>
                <ImageUpload 
                  label="" 
                  initialValue={jobData?.poster_url} 
                  onUploadComplete={(url) => setPosterUrl(url)} 
                />
              </div>

              <div className="w-full h-px bg-slate-50" />

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Tipe Pekerjaan</label>
                  <select name="tipe_pekerjaan" defaultValue={jobData?.tipe_pekerjaan || 'Full-time'} className="w-full h-12 px-4 rounded-2xl border border-slate-100 bg-slate-50/50 font-bold text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all cursor-pointer">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Magang">Magang</option>
                    <option value="Kontrak">Kontrak</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Kejuruan Terkait</label>
                  <select name="jurusan" defaultValue={jobData?.jurusan || 'Semua Jurusan'} className="w-full h-12 px-4 rounded-2xl border border-slate-100 bg-slate-50/50 font-bold text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all cursor-pointer">
                    <option value="Semua Jurusan">Semua Jurusan</option>
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Teknik Otomotif">Teknik Otomotif</option>
                    <option value="Teknik Las">Teknik Las</option>
                    <option value="Garmen/Tata Busana">Garmen/Tata Busana</option>
                    <option value="Tata Boga">Tata Boga</option>
                    <option value="Pertanian/Hidroponik">Pertanian/Hidroponik</option>
                    <option value="Teknik Pendingin">Teknik Pendingin</option>
                    <option value="Kecantikan">Kecantikan</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3 px-1">Visibilitas</label>
                  <select name="is_active" defaultValue={jobData?.is_active?.toString() || 'true'} className="w-full h-12 px-4 rounded-2xl border border-slate-100 bg-slate-50/50 font-bold text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all cursor-pointer">
                    <option value="true">🌎 Aktif / Publik</option>
                    <option value="false">🔒 Simpan Draft</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-8">
          <Card 
            className="rounded-[2.5rem] border-slate-50 shadow-2xl shadow-slate-200/40" 
            styles={{ body: { padding: '24px md:40px' } }}
          >
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="w-4 h-px bg-primary/20" />
                  Informasi Dasar
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Text className="text-[11px] font-bold text-slate-400 ml-1">Posisi Jabatan</Text>
                    <Input name="posisi" placeholder="e.g. Senior Web Designer" defaultValue={jobData?.posisi} required className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                  </div>
                  <div className="space-y-1.5">
                    <Text className="text-[11px] font-bold text-slate-400 ml-1">Perusahaan</Text>
                    <Input name="instansi_perusahaan" placeholder="e.g. PT Maju Bersama" defaultValue={jobData?.instansi_perusahaan} required className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                  </div>
                  <div className="space-y-1.5">
                    <Text className="text-[11px] font-bold text-slate-400 ml-1">Penempatan</Text>
                    <Input name="lokasi" placeholder="e.g. Malang, Jawa Timur" defaultValue={jobData?.lokasi} required className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                  </div>
                  <div className="space-y-1.5">
                    <Text className="text-[11px] font-bold text-slate-400 ml-1">Deadline Lamaran</Text>
                    <Input name="batas_lamaran" type="date" defaultValue={jobData?.batas_lamaran ? new Date(jobData.batas_lamaran).toISOString().slice(0, 10) : ''} className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold text-slate-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="w-4 h-px bg-primary/20" />
                  Akses Pendaftaran
                </label>
                <Input name="link_pendaftaran" type="url" placeholder="https://career.perusahaan.com/apply" defaultValue={jobData?.link_pendaftaran} required className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold text-primary" />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="w-4 h-px bg-primary/20" />
                  Uraian Pekerjaan
                </label>
                <TextArea name="deskripsi" placeholder="Sebutkan tanggung jawab utama..." defaultValue={jobData?.deskripsi} rows={4} required className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-medium p-6 resize-none" />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="w-4 h-px bg-primary/20" />
                  Kualifikasi Utama
                </label>
                <TextArea name="kualifikasi" placeholder="Persyaratan pendidikan, pengalaman, dan keahlian..." defaultValue={jobData?.kualifikasi} rows={4} required className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-medium p-6 resize-none" />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
