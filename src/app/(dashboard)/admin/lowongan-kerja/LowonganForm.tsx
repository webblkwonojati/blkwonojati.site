'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addLowongan, editLowongan } from './actions';
import ImageUpload from '@/components/ImageUpload';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  Save, 
  Loader2, 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar,
  Settings,
  Globe,
  Lock,
  Info,
  Lightbulb,
  FileText,
  UserCheck,
  CheckCircle2
} from "lucide-react";
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const formSchema = z.object({
  posisi: z.string().min(1, "Posisi wajib diisi"),
  instansi_perusahaan: z.string().min(1, "Instansi wajib diisi"),
  tipe_pekerjaan: z.string().min(1, "Tipe pekerjaan wajib diisi"),
  jurusan: z.string().min(1, "Jurusan wajib diisi"),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  batas_lamaran: z.string(),
  link_pendaftaran: z.string().url("Link pendaftaran harus berupa URL valid"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  kualifikasi: z.string().min(1, "Kualifikasi wajib diisi"),
  is_active: z.string(),
});

export default function LowonganForm({ jobData }: { jobData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posterUrl, setPosterUrl] = useState(jobData?.poster_url || '');
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      posisi: jobData?.posisi || "",
      instansi_perusahaan: jobData?.instansi_perusahaan || "",
      tipe_pekerjaan: jobData?.tipe_pekerjaan || "Full-time",
      jurusan: jobData?.jurusan || "Semua Jurusan",
      lokasi: jobData?.lokasi || "",
      batas_lamaran: jobData?.batas_lamaran ? new Date(jobData.batas_lamaran).toISOString().slice(0, 10) : "",
      link_pendaftaran: jobData?.link_pendaftaran || "",
      deskripsi: jobData?.deskripsi || "",
      kualifikasi: jobData?.kualifikasi || "",
      is_active: jobData?.is_active?.toString() || "true",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        formData.append(key, val);
      }
    });
    formData.append('poster_url', posterUrl);
    if (jobData?.id) formData.append('id', jobData.id);

    try {
      const res = jobData?.id ? await editLowongan(formData) : await addLowongan(formData);
      if (res.success) {
        toast.success(jobData?.id ? 'Lowongan diperbarui! ✨' : 'Lowongan ditambahkan! 🚀');
        router.push('/admin/lowongan-kerja');
        router.refresh();
      } else {
        toast.error('Gagal menyimpan: ' + res.error);
      }
    } catch (err) {
      toast.error('Terjadi kesalahan sistem');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <Link href="/admin/lowongan-kerja">
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary p-0 h-auto gap-1 mb-2 hover:bg-transparent cursor-pointer">
               <ChevronLeft size={14} /> Back to List
             </Button>
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0 shadow-sm shadow-blue-500/10">
               <Briefcase className="w-6 h-6 md:w-8 md:h-8" />
             </div>
             <div>
               <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">
                 {jobData ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
               </h2>
               <p className="text-slate-500 text-xs font-medium">Lengkapi detail lowongan pekerjaan untuk dipublikasikan.</p>
             </div>
          </div>
        </div>
        
        <Button 
          disabled={isSubmitting}
          onClick={() => form.handleSubmit(onSubmit)()}
          className="h-12 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-slate-900 hover:bg-primary text-white shadow-xl shadow-slate-900/10 active:scale-95 transition-all cursor-pointer"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {jobData ? 'Update Data' : 'Publish Vacancy'}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Media & Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/40 overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 py-4 px-8 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  <span className="font-black text-[11px] uppercase tracking-widest text-slate-600">Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Poster Utama</label>
                  <ImageUpload 
                    initialValue={jobData?.poster_url} 
                    onUploadComplete={setPosterUrl} 
                  />
                </div>

                <Separator className="bg-slate-50" />

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tipe_pekerjaan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tipe Pekerjaan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-none shadow-none focus:ring-primary/10 font-bold text-sm">
                              <SelectValue placeholder="Pilih Tipe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-2xl">
                            <SelectItem value="Full-time" className="text-xs font-bold py-3">Full-time</SelectItem>
                            <SelectItem value="Part-time" className="text-xs font-bold py-3">Part-time</SelectItem>
                            <SelectItem value="Magang" className="text-xs font-bold py-3">Magang</SelectItem>
                            <SelectItem value="Kontrak" className="text-xs font-bold py-3">Kontrak</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jurusan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kejuruan Terkait</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-none shadow-none focus:ring-primary/10 font-bold text-sm">
                              <SelectValue placeholder="Pilih Jurusan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-2xl">
                            <SelectItem value="Semua Jurusan" className="text-xs font-bold py-3">Semua Jurusan</SelectItem>
                            <SelectItem value="Teknik Informatika" className="text-xs font-bold py-3">Teknik Informatika</SelectItem>
                            <SelectItem value="Teknik Otomotif" className="text-xs font-bold py-3">Teknik Otomotif</SelectItem>
                            <SelectItem value="Teknik Las" className="text-xs font-bold py-3">Teknik Las</SelectItem>
                            <SelectItem value="Garmen/Tata Busana" className="text-xs font-bold py-3">Garmen/Tata Busana</SelectItem>
                            <SelectItem value="Tata Boga" className="text-xs font-bold py-3">Tata Boga</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visibilitas</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-none shadow-none focus:ring-primary/10 font-bold text-sm">
                              <SelectValue placeholder="Pilih Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-2xl">
                            <SelectItem value="true" className="text-xs font-bold py-3">🌎 Aktif / Publik</SelectItem>
                            <SelectItem value="false" className="text-xs font-bold py-3">🔒 Simpan Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                      {form.watch('is_active') === 'true' ? <Globe size={18} /> : <Lock size={18} />}
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Current Status</p>
                     <p className="text-xs font-black uppercase tracking-tight text-emerald-600">
                       {form.watch('is_active') === 'true' ? 'Ready to Publish' : 'Draft Mode'}
                     </p>
                   </div>
                </div>
              </CardContent>
            </Card>

            <div className="group relative bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden shadow-2xl shadow-slate-900/20">
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="text-primary w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Pro Tip</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed">
                    Gunakan poster dengan resolusi tinggi dan informasi yang jelas untuk menarik perhatian calon pelamar.
                  </p>
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/40 p-8 bg-white">
              <div className="space-y-10">
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-6 h-px bg-primary/30" />
                    <Info size={14} />
                    Informasi Dasar
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="posisi"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-slate-400 ml-1">Posisi Jabatan</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Senior Web Designer" {...field} className="h-12 rounded-xl border-none bg-slate-50/50 focus:bg-white font-bold text-sm shadow-none focus-visible:ring-primary/10" />
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instansi_perusahaan"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-slate-400 ml-1">Perusahaan</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                              <Input placeholder="e.g. PT Maju Bersama" {...field} className="h-12 pl-12 rounded-xl border-none bg-slate-50/50 focus:bg-white font-bold text-sm shadow-none focus-visible:ring-primary/10" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lokasi"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-slate-400 ml-1">Penempatan</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                              <Input placeholder="e.g. Malang, Jawa Timur" {...field} className="h-12 pl-12 rounded-xl border-none bg-slate-50/50 focus:bg-white font-bold text-sm shadow-none focus-visible:ring-primary/10" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="batas_lamaran"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-slate-400 ml-1">Deadline Lamaran</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                              <Input type="date" {...field} className="h-12 pl-12 rounded-xl border-none bg-slate-50/50 focus:bg-white font-bold text-sm shadow-none focus-visible:ring-primary/10 text-slate-600" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-6 h-px bg-primary/30" />
                    <UserCheck size={14} />
                    Akses Pendaftaran
                  </label>
                  <FormField
                    control={form.control}
                    name="link_pendaftaran"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="https://career.perusahaan.com/apply" {...field} className="h-14 rounded-2xl border-none bg-slate-50/50 focus:bg-white font-black text-primary shadow-none focus-visible:ring-primary/10" />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-6 h-px bg-primary/30" />
                    <FileText size={14} />
                    Uraian Pekerjaan
                  </label>
                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Sebutkan tanggung jawab utama..." {...field} className="rounded-[2rem] border-none bg-slate-50/50 focus:bg-white font-medium p-8 resize-none min-h-[160px] shadow-none focus-visible:ring-primary/10 leading-relaxed" />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-6 h-px bg-primary/30" />
                    <CheckCircle2 size={14} />
                    Kualifikasi Utama
                  </label>
                  <FormField
                    control={form.control}
                    name="kualifikasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Persyaratan pendidikan, pengalaman, dan keahlian..." {...field} className="rounded-[2rem] border-none bg-slate-50/50 focus:bg-white font-medium p-8 resize-none min-h-[160px] shadow-none focus-visible:ring-primary/10 leading-relaxed" />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
