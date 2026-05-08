"use client";

import { useState } from "react";
import { Form, Input, Button, message, Select, Space } from "antd";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/dashboard/TiptapEditor";
import MultiImageUpload from "@/components/MultiImageUpload";
import FileUpload from "@/components/FileUpload";
import { saveKejuruan } from "../actions/kejuruan";
import { PictureOutlined, FilePdfOutlined, CheckCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";


export default function KejuruanForm({
  initialData,
}: {
  initialData?: any;
}) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(initialData?.content_html || "");

  const handleSubmit = async (values: any) => {
    if (!content || content === "<p></p>") {
      message.error("Konten modul/kurikulum tidak boleh kosong");
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
        message.success(initialData ? "Program berhasil diubah" : "Program berhasil ditambahkan");
        router.push("/admin/kejuruan");
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 z-0"></div>
      
      <div className="relative z-10 mb-8 flex items-center gap-4">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push("/admin/kejuruan")}
          className="bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl"
        />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            {initialData ? "Edit Program Kejuruan" : "Tambah Program Baru"}
          </h1>
          <p className="text-slate-500 mt-1">Lengkapi informasi untuk publikasi program</p>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={handleSubmit}
        className="space-y-6 relative z-10"
      >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="title"
          label={<span className="font-semibold text-slate-700">Nama Program</span>}
          rules={[{ required: true, message: "Masukkan nama program" }]}
        >
          <Input placeholder="Contoh: Pembudidayaan Jamur" className="px-4 py-2 rounded-xl" />
        </Form.Item>

        <Form.Item
          name="category"
          label={<span className="font-semibold text-slate-700">Kategori</span>}
          rules={[{ required: true, message: "Pilih kategori" }]}
        >
          <Select 
            placeholder="Pilih kategori"
            className="h-10 [&_.ant-select-selector]:rounded-xl"
            options={[
              { value: "Pertanian", label: "Pertanian" },
              { value: "Perhotelan", label: "Perhotelan" },
              { value: "Kuliner", label: "Kuliner" },
              { value: "Peternakan", label: "Peternakan" },
              { value: "Pariwisata", label: "Pariwisata" },
              { value: "Administrasi", label: "Administrasi" },
              { value: "Perikanan", label: "Perikanan" },
            ]}
          />
        </Form.Item>
      </div>

      <Form.Item
        name="subtitle"
        label={<span className="font-semibold text-slate-700">Deskripsi Singkat (Subtitle)</span>}
        rules={[{ required: true, message: "Masukkan deskripsi singkat" }]}
      >
        <Input.TextArea placeholder="Penjelasan singkat mengenai materi yang akan dipelajari..." rows={2} className="px-4 py-3 rounded-xl" />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
        <Form.Item
          name="hero_image"
          label={
            <Space className="font-semibold text-slate-700">
              <span className="p-1 bg-green-100 text-green-600 rounded"><PictureOutlined /></span>
              Galeri Image (Hero Slider)
            </Space>
          }
          className="mb-0 md:col-span-2"
        >
          <MultiImageUpload 
            initialValue={initialData?.hero_image}
            onUploadComplete={(url) => form.setFieldValue("hero_image", url)}
          />
        </Form.Item>

        <Form.Item
          name="pdf_url"
          label={
            <Space className="font-semibold text-slate-700">
              <span className="p-1 bg-red-100 text-red-500 rounded"><FilePdfOutlined /></span>
              Dokumen PDF Kurikulum
            </Space>
          }
          className="mb-0 md:col-span-2"
        >
          <FileUpload 
            initialValue={initialData?.pdf_url}
            onUploadComplete={(url) => form.setFieldValue("pdf_url", url)}
          />
        </Form.Item>
      </div>

      <div className="mt-6 border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-semibold text-slate-700">
          Modul / Kurikulum Detail
        </div>
        <TiptapEditor
          content={content}
          onChange={setContent}
        />
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
        <Button onClick={() => router.push("/admin/kejuruan")} className="px-6 h-10 rounded-xl">
          Batal
        </Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          icon={<CheckCircleOutlined />}
          className="px-8 h-10 rounded-xl font-semibold shadow-lg shadow-green-500/30"
        >
          {initialData ? "Update Program" : "Simpan Program Baru"}
        </Button>
      </div>
    </Form>
    </div>
  );
}
