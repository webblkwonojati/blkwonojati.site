"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/dashboard/TiptapEditor";
import MultiImageUpload from "@/components/MultiImageUpload";
import FileUpload from "@/components/FileUpload";
import { saveKejuruan } from "../actions/kejuruan";
import { 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  ChevronLeft, 
  Info,
  Loader2,
  FileUp,
  Layout,
  FileCode,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const formSchema = z.object({
  title: z.string().min(1, "Nama program wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  subtitle: z.string().min(1, "Subtitle wajib diisi"),
  hero_image: z.string().optional(),
  pdf_url: z.string().optional(),
});

export default function KejuruanForm({
  initialData,
}: {
  initialData?: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(initialData?.content_html || "");
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "Pertanian",
      subtitle: initialData?.subtitle || "",
      hero_image: initialData?.hero_image || "",
      pdf_url: initialData?.pdf_url || "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!content || content === "<p></p>") {
      toast.error("Konten modul/kurikulum tidak boleh kosong");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...values,
        content_html: content,
      };

      const result = await saveKejuruan(payload, initialData?.id);
      
      if (result.success && result.data) {
        toast.success(initialData ? "Program berhasil diubah! ✨" : "Program berhasil ditambahkan! 🚀");
        router.push("/admin/kejuruan");
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="container max-w-5xl mx-auto px-4 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <Link href="/admin/kejuruan">
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary p-0 h-auto gap-1 mb-2 hover:bg-transparent cursor-pointer">
               <ChevronLeft size={14} /> Kembali ke Daftar
             </Button>
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10 shrink-0 shadow-sm shadow-primary/5">
               <Layout className="w-6 h-6 md:w-8 md:h-8" />
             </div>
             <div>
               <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">
                 {initialData ? "Edit Kurikulum" : "Program Baru"}
               </h2>
               <p className="text-slate-500 text-xs font-medium">Lengkapi informasi untuk publikasi program pelatihan.</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <Button 
              disabled={loading}
              onClick={() => form.handleSubmit(onSubmit)()}
              className="bg-slate-900 hover:bg-primary text-white h-12 px-8 rounded-2xl shadow-xl shadow-slate-900/10 font-black uppercase tracking-widest text-[11px] cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
              {initialData ? "Update Program" : "Simpan Program"}
            </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Info */}
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/40 p-8 bg-white overflow-hidden">
                <CardHeader className="px-0 pt-0 pb-6 flex flex-row items-center gap-3 border-b border-slate-50 mb-8">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                      <Info size={16} />
                   </div>
                   <CardTitle className="text-[11px] font-black uppercase tracking-widest text-slate-900 m-0">Informasi Utama</CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Program Kejuruan *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Contoh: Pembudidayaan Jamur"
                              {...field}
                              className="h-12 rounded-xl bg-slate-50/50 border-none shadow-none focus-visible:ring-primary/10 font-bold text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kategori Bidang</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-none shadow-none focus:ring-primary/10 font-bold text-sm">
                                <SelectValue placeholder="Pilih Kategori" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl border-none shadow-2xl p-2">
                              {["Pertanian", "Perhotelan", "Kuliner", "Peternakan", "Pariwisata", "Administrasi", "Perikanan"].map(cat => (
                                <SelectItem key={cat} value={cat} className="rounded-xl py-3 text-xs font-bold uppercase tracking-widest">
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Deskripsi Singkat (Subtitle) *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Penjelasan singkat mengenai materi yang akan dipelajari..." 
                            {...field}
                            className="rounded-2xl border-none bg-slate-50/50 text-sm leading-relaxed focus:bg-white min-h-[100px] p-6 shadow-none focus-visible:ring-primary/10 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <span className="w-6 h-px bg-primary/30" />
                      <FileCode size={14} />
                      Modul / Kurikulum Detail
                    </label>
                    <div className="border border-slate-100 rounded-[2rem] overflow-hidden focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm">
                      <TiptapEditor
                        content={content}
                        onChange={setContent}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Assets */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/40 bg-white overflow-hidden">
                <CardHeader className="bg-slate-50/50 py-4 px-8 border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="font-black text-[11px] uppercase tracking-widest text-slate-600">Assets & Files</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                      <ImageIcon size={14} className="text-primary" />
                      Galeri Image (Hero)
                    </label>
                    <MultiImageUpload 
                      initialValue={initialData?.hero_image}
                      onUploadComplete={(url) => form.setValue("hero_image", url)}
                    />
                  </div>

                  <Separator className="bg-slate-50" />

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                      <FileUp size={14} className="text-red-500" />
                      Dokumen PDF
                    </label>
                    <FileUpload 
                      initialValue={initialData?.pdf_url}
                      onUploadComplete={(url) => form.setValue("pdf_url", url)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Status Info */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                       <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Status</p>
                      <p className="text-xs font-black uppercase tracking-tight text-emerald-600">Ready for Launch</p>
                    </div>
                 </div>
                 <p className="text-[11px] font-medium text-emerald-700/70 leading-relaxed italic">
                    "Kurikulum yang lengkap membantu calon peserta memahami prospek pelatihan."
                 </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
