"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  Card, 
  Space, 
  Typography, 
  Divider,
  Badge,
  Spin
} from "antd";
import { 
  LeftOutlined, 
  SaveOutlined, 
  SendOutlined,
  FileTextOutlined,
  SettingOutlined,
  GlobalOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
  BulbOutlined
} from "@ant-design/icons";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import { addBerita, editBerita } from "./actions";
import Link from "next/link";

const { Title, Text } = Typography;
const { TextArea } = Input;

// ─── Dynamic Import for TiptapEditor ──────────────────────────────────────────
const TiptapEditor = dynamic(() => import("@/components/dashboard/TiptapEditor"), { 
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-50/50 animate-pulse rounded-3xl border border-slate-100 flex items-center justify-center">
       <div className="flex flex-col items-center gap-2">
          <LoadingOutlined className="text-3xl text-slate-200" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Memuat Editor...</span>
       </div>
    </div>
  )
});

interface BeritaFormProps {
  initialData?: any;
  mode: "add" | "edit";
}

export default function BeritaForm({ initialData, mode }: BeritaFormProps) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = async (values: any) => {
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

      // Use the actual value from the form to be sure
      const finalStatus = form.getFieldValue('status');
      toast.success(finalStatus === "published" ? "Berita berhasil diterbitkan! 🎉" : "Draft berhasil disimpan! 💾");
      
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
    <div className="container max-w-6xl mx-auto px-4 pb-24">
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col gap-0.5">
          <Link href="/admin/berita">
             <Button type="text" icon={<LeftOutlined />} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary p-0">
               Kembali ke Daftar
             </Button>
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 flex items-center justify-center text-primary border border-green-100 shrink-0">
               <FileTextOutlined className="text-xl md:text-2xl" />
             </div>
             <div>
               <Title level={4} className="md:!text-2xl !m-0 !font-black !tracking-tight">
                 {mode === "add" ? "Tulis Artikel" : "Edit Artikel"}
               </Title>
               <Text type="secondary" className="text-xs">Kelola konten berita dan pengumuman BLK Wonojati.</Text>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button 
              disabled={isSubmitting}
              onClick={() => {
                form.setFieldsValue({ status: 'draft' });
                form.submit();
              }}
              className="rounded-2xl h-12 px-6 font-bold flex-1 sm:flex-initial"
            >
              Simpan Draft
            </Button>
            <Button 
              type="primary"
              size="large"
              loading={isSubmitting}
              onClick={() => {
                form.submit();
              }}
              className="h-12 px-8 rounded-2xl shadow-xl shadow-green-500/20 font-black uppercase tracking-widest text-xs flex-1 sm:flex-initial"
            >
              {mode === "add" ? "Terbitkan" : "Simpan Perubahan"}
            </Button>
        </div>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish}
        initialValues={{
          title: initialData?.title || "",
          excerpt: initialData?.excerpt || "",
          category: initialData?.category || "Berita",
          status: initialData?.published_at ? "published" : "draft"
        }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Area */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="rounded-[2.5rem] border-slate-50 shadow-xl shadow-slate-200/30 p-4">
              <Form.Item 
                name="title" 
                label={<Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">Judul Artikel *</Text>}
                rules={[{ required: true, message: 'Harap isi judul artikel' }]}
              >
                <Input 
                  placeholder="Contoh: Pembukaan Pelatihan Berbasis Kompetensi 2024"
                  className="text-xl md:text-2xl font-black rounded-2xl h-16 border-slate-100 bg-slate-50/20 focus:bg-white transition-all px-6"
                />
              </Form.Item>

              <Form.Item 
                label={<Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">Isi Artikel</Text>}
                required
              >
                <TiptapEditor 
                  content={content}
                  onChange={setContent}
                  placeholder="Tulis isi berita selengkapnya di sini..."
                />
                {!content && isSubmitting && (
                  <Text type="danger" className="text-[10px] mt-1 block">Konten artikel tidak boleh kosong.</Text>
                )}
              </Form.Item>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card 
              className="rounded-[2rem] border-slate-50 shadow-xl shadow-slate-200/30"
              title={
                <Space>
                  <SettingOutlined className="text-primary" />
                  <Text className="font-black text-xs uppercase tracking-widest">Pengaturan Konten</Text>
                </Space>
              }
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gambar Utama (16:9)</Text>
                  <ImageUpload 
                    initialValue={imageUrl}
                    onUploadComplete={setImageUrl}
                  />
                </div>

                <Form.Item 
                  name="excerpt" 
                  label={<Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ringkasan Pendek *</Text>}
                  rules={[{ required: true, message: 'Harap isi ringkasan' }]}
                >
                  <TextArea 
                    placeholder="Ringkasan ini akan muncul di kartu berita..." 
                    rows={4}
                    className="rounded-2xl border-slate-100 bg-slate-50/20 text-sm leading-relaxed focus:bg-white"
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item name="category" label={<Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kategori</Text>}>
                    <Input className="rounded-xl h-11 border-slate-100 bg-slate-50/20 focus:bg-white" />
                  </Form.Item>

                  <Form.Item name="status" label={<Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visibilitas</Text>}>
                    <Select className="h-11 custom-antd-select" options={[
                      { value: 'published', label: '🌎 Publik' },
                      { value: 'draft', label: '🔒 Draft' }
                    ]} />
                  </Form.Item>
                </div>

                <Divider className="m-0" />

                <Form.Item shouldUpdate className="m-0">
                  {() => {
                    const status = form.getFieldValue('status');
                    return (
                      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                        status === 'published' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-amber-50/50 border-amber-100'
                      }`}>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                           status === 'published' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                         }`}>
                           {status === 'published' ? <GlobalOutlined /> : <EyeInvisibleOutlined />}
                         </div>
                         <div>
                           <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Status</p>
                           <p className={`text-xs font-black uppercase tracking-tight ${
                             status === 'published' ? 'text-emerald-600' : 'text-amber-600'
                           }`}>
                             {status === 'published' ? 'Ready to Publish' : 'Saved as Draft'}
                           </p>
                         </div>
                      </div>
                    )
                  }}
                </Form.Item>
              </div>
            </Card>

            {/* Pro Tip */}
            <div className="group relative bg-slate-900 p-8 rounded-[2rem] text-white overflow-hidden">
               <div className="relative z-10">
                  <Space align="center" className="mb-2">
                    <BulbOutlined className="text-primary" />
                    <Text className="text-[10px] font-black uppercase tracking-widest text-primary">Pro Tip</Text>
                  </Space>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">
                    Gunakan gambar dengan rasio 16:9 untuk hasil terbaik di halaman Berita publik.
                  </p>
               </div>
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
