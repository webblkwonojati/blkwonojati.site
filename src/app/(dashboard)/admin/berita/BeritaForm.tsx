"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
  FileText,
  Settings,
  Globe,
  EyeOff,
  Loader2,
  Lightbulb,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import { addBerita, editBerita } from "./actions";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const TiptapEditor = dynamic(() => import("@/components/dashboard/TiptapEditor"), { 
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-50/50 animate-pulse rounded-3xl border border-slate-100 flex items-center justify-center">
       <div className="flex flex-col items-center gap-2">
          <Loader2 className="text-3xl text-slate-200 animate-spin" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Memuat Editor...</span>
       </div>
    </div>
  )
});

const formSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  excerpt: z.string().min(1, "Ringkasan wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  status: z.enum(["published", "draft"]),
});

interface BeritaFormProps {
  initialData?: any;
  mode: "add" | "edit";
}

export default function BeritaForm({ initialData, mode }: BeritaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [mounted, setMounted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      category: initialData?.category || "Berita",
      status: initialData?.published_at ? "published" : "draft"
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!content) {
      toast.error("Konten artikel tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", values.title);
      fd.append("excerpt", values.excerpt);
      fd.append("content", content);
      fd.append("image_url", imageUrl);
      fd.append("category", values.category);
      fd.append("status", values.status);
      
      if (mode === "edit") {
        fd.append("id", initialData.id);
        fd.append("existing_published_at", initialData.published_at || "");
      }

      const result = mode === "add" ? await addBerita(fd) : await editBerita(fd);

      if (!result.success) throw new Error(result.error);

      toast.success(values.status === "published" ? "Berita berhasil diterbitkan! 🎉" : "Draft berhasil disimpan! 💾");
      
      router.push("/admin/berita");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan berita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="container max-w-6xl mx-auto px-4 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <Link href="/admin/berita">
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary p-0 h-auto gap-1 mb-2 hover:bg-transparent cursor-pointer">
               <ChevronLeft size={14} /> Kembali ke Daftar
             </Button>
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 flex items-center justify-center text-primary border border-green-100 shrink-0 shadow-sm shadow-primary/10">
               <FileText className="w-6 h-6 md:w-8 md:h-8" />
             </div>
             <div>
               <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">
                 {mode === "add" ? "Tulis Artikel" : "Edit Artikel"}
               </h2>
               <p className="text-slate-500 text-xs font-medium">Kelola konten berita dan pengumuman BLK Wonojati.</p>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button 
              variant="outline"
              disabled={isSubmitting}
              onClick={() => {
                form.setValue('status', 'draft');
                form.handleSubmit(onSubmit)();
              }}
              className="rounded-2xl h-12 px-6 font-bold flex-1 sm:flex-initial border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Simpan Draft
            </Button>
            <Button 
              disabled={isSubmitting}
              onClick={() => {
                form.setValue('status', 'published');
                form.handleSubmit(onSubmit)();
              }}
              className="bg-primary hover:bg-green-600 text-white h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-[11px] flex-1 sm:flex-initial cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === "add" ? "Terbitkan" : "Simpan Perubahan")}
            </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Area */}
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/40 p-6 bg-white">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Judul Artikel *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Contoh: Pembukaan Pelatihan Berbasis Kompetensi 2024"
                            {...field}
                            className="text-xl md:text-2xl font-black rounded-2xl h-16 border-slate-100 bg-slate-50/20 focus:bg-white transition-all px-6 border-none shadow-none focus-visible:ring-2 focus-visible:ring-primary/10"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Isi Artikel *</label>
                    <TiptapEditor 
                      content={content}
                      onChange={setContent}
                      placeholder="Tulis isi berita selengkapnya di sini..."
                    />
                    {!content && isSubmitting && (
                      <p className="text-destructive text-[10px] font-bold mt-1">Konten artikel tidak boleh kosong.</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/40 bg-white overflow-hidden">
                <CardHeader className="bg-slate-50/50 py-4 px-6 border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="font-black text-[11px] uppercase tracking-widest text-slate-600">Pengaturan Konten</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gambar Utama (16:9)</label>
                    <ImageUpload 
                      initialValue={imageUrl}
                      onUploadComplete={setImageUrl}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ringkasan Pendek *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Ringkasan ini akan muncul di kartu berita..." 
                            {...field}
                            className="rounded-2xl border-slate-100 bg-slate-50/20 text-sm leading-relaxed focus:bg-white min-h-[120px] p-4 focus-visible:ring-primary/10 border-none shadow-none"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kategori</FormLabel>
                          <FormControl>
                            <Input {...field} className="rounded-xl h-11 border-slate-100 bg-slate-50/20 focus:bg-white border-none shadow-none focus-visible:ring-primary/10 font-bold text-xs" />
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visibilitas</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 rounded-xl bg-slate-50/20 border-none shadow-none focus:ring-primary/10 font-bold text-xs">
                                <SelectValue placeholder="Pilih Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-none shadow-2xl">
                              <SelectItem value="published" className="text-xs font-bold py-3">🌎 Publik</SelectItem>
                              <SelectItem value="draft" className="text-xs font-bold py-3">🔒 Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px] font-bold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="bg-slate-100" />

                  <div className="space-y-4">
                     {(() => {
                        const status = form.watch('status');
                        const isPub = status === 'published';
                        return (
                          <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                            isPub ? 'bg-emerald-50/50 border-emerald-100' : 'bg-amber-50/50 border-amber-100'
                          }`}>
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                               isPub ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                             }`}>
                               {isPub ? <Globe size={18} /> : <EyeOff size={18} />}
                             </div>
                             <div>
                               <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Status Final</p>
                               <div className="flex items-center gap-1.5">
                                 <p className={`text-xs font-black uppercase tracking-tight ${
                                   isPub ? 'text-emerald-600' : 'text-amber-600'
                                 }`}>
                                   {isPub ? 'Ready to Publish' : 'Saved as Draft'}
                                 </p>
                                 {isPub ? <CheckCircle2 size={10} className="text-emerald-500" /> : <AlertCircle size={10} className="text-amber-500" />}
                               </div>
                             </div>
                          </div>
                        );
                     })()}
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tip */}
              <div className="group relative bg-slate-900 p-8 rounded-[2rem] text-white overflow-hidden shadow-2xl shadow-slate-900/20">
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="text-primary w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Pro Tip</span>
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">
                      Gunakan gambar dengan rasio 16:9 (lebar) untuk hasil tampilan terbaik di halaman publik.
                    </p>
                 </div>
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
