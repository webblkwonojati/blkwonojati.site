"use client";

import { useState } from "react";
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { 
  Table, 
  Button, 
  Input, 
  Modal, 
  Form, 
  message, 
  Popconfirm,
  Tag,
  Typography,
  Select
} from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { addGaleri, deleteGaleri } from "./actions";

const { Title, Text } = Typography;

interface GaleriItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
}

export default function GaleriClient({ initialData }: { initialData: GaleriItem[] }) {
  const [data, setData] = useState<GaleriItem[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const filteredData = data.filter(item => 
    item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchText.toLowerCase())
  );

  const categories = ["Kegiatan", "Fasilitas", "Kunjungan", "Workshop", "Lainnya"];

  async function handleAdd(values: any) {
    if (!imageUrl) {
      message.error("Harap unggah gambar terlebih dahulu");
      return;
    }
    setLoading(true);
    try {
      const res = await addGaleri({
        title: values.title,
        image_url: imageUrl,
        category: values.category || "Kegiatan"
      });

      if (!res.success) throw new Error(res.error);

      setData([res.data, ...data]);
      message.success("Foto berhasil ditambahkan ke galeri");
      setIsModalOpen(false);
      form.resetFields();
      setImageUrl("");
      router.refresh();
    } catch (error: any) {
      message.error("Gagal menambahkan foto: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await deleteGaleri(id);

      if (!res.success) throw new Error(res.error);

      setData(data.filter(item => item.id !== id));
      message.success("Foto berhasil dihapus");
      router.refresh();
    } catch (error: any) {
      message.error("Gagal menghapus foto: " + error.message);
    }
  }

  const columns = [
    {
      title: "Pratinjau",
      dataIndex: "image_url",
      key: "image_url",
      width: 120,
      render: (url: string) => (
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
          <Image 
            src={url} 
            alt="Preview" 
            fill 
            sizes="80px"
            className="object-cover" 
          />
        </div>
      )
    },
    {
      title: "Informasi Detail",
      key: "detail",
      render: (_: any, record: GaleriItem) => (
        <div className="space-y-1">
          <Text className="font-black text-slate-900 block">{record.title}</Text>
          <Tag className="rounded-full px-3 py-0.5 font-bold uppercase text-[10px] bg-slate-100 border-none text-slate-500">
            {record.category}
          </Tag>
        </div>
      )
    },
    {
      title: "Tanggal Post",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => (
        <Text className="text-xs font-bold text-slate-400">
          {new Date(date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
      )
    },
    {
      title: "Aksi",
      key: "action",
      width: 150,
      align: "right" as const,
      render: (_: any, record: GaleriItem) => (
        <div className="flex justify-end gap-2">
          <Button 
            icon={<ExternalLink className="w-4 h-4" />} 
            href={record.image_url} 
            target="_blank"
            className="rounded-xl border-slate-200 text-slate-400 hover:text-primary"
          />
          <Popconfirm
            title="Hapus foto?"
            description="Tindakan ini tidak dapat dibatalkan."
            onConfirm={() => handleDelete(record.id)}
            okText="Ya, Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true, className: "rounded-lg" }}
            cancelButtonProps={{ className: "rounded-lg" }}
          >
            <Button 
              danger 
              icon={<Trash2 className="w-4 h-4" />} 
              className="rounded-xl border-red-100 bg-red-50/50"
            />
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">Media Assets</span>
             <span className="w-px h-3 bg-slate-200" />
             <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{data.length} Total Items</Text>
          </div>
          <Title level={2} className="!m-0 !text-3xl !font-black !tracking-tighter !text-slate-900">
            Galeri Dokumentasi
          </Title>
        </div>
        
        <Button 
          type="primary" 
          size="large"
          icon={<Plus className="w-5 h-5" />} 
          onClick={() => setIsModalOpen(true)}
          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-slate-900 border-none hover:!bg-primary transition-all shadow-xl shadow-slate-900/10"
        >
          Tambah Dokumentasi
        </Button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/30">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <Input 
                placeholder="Cari foto atau kategori..." 
                className="h-12 pl-11 pr-4 rounded-2xl border-none bg-white shadow-sm font-medium text-slate-600 focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
           </div>
        </div>

        {/* Table Area */}
        <div className="p-2">
          <Table 
            columns={columns} 
            dataSource={filteredData} 
            rowKey="id"
            pagination={{ 
              pageSize: 10,
              className: "px-6 pb-4",
              style: { marginTop: 24 }
            }}
            className="admin-table"
          />
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3 py-2 border-b border-slate-50 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
               <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 m-0 leading-none mb-1">Entry Baru</p>
              <h3 className="text-lg font-black text-slate-900 tracking-tight m-0 leading-none">Tambah Foto Galeri</h3>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
        centered
        className="custom-modal"
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleAdd}
          className="space-y-4"
        >
          <Form.Item 
            label={<Text className="font-bold text-slate-700 uppercase tracking-widest text-[10px]">Unggah Foto Dokumentasi *</Text>}
            required
          >
            <ImageUpload 
              initialValue={imageUrl}
              onUploadComplete={setImageUrl}
            />
          </Form.Item>

          <Form.Item 
            label={<Text className="font-bold text-slate-700 uppercase tracking-widest text-[10px]">Judul Dokumentasi</Text>}
            name="title" 
            rules={[{ required: true, message: 'Masukan judul foto' }]}
          >
            <Input className="h-12 rounded-xl bg-slate-50 border-slate-100" placeholder="Contoh: Pelatihan Las Listrik 2024" />
          </Form.Item>

          <Form.Item 
            label={<Text className="font-bold text-slate-700 uppercase tracking-widest text-[10px]">Kategori</Text>}
            name="category"
          >
            <Select className="h-12 rounded-xl" placeholder="Pilih Kategori">
              {categories.map(cat => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="pt-4 flex gap-3">
             <Button 
                className="flex-1 h-12 rounded-xl font-bold text-slate-500 border-slate-200"
                onClick={() => setIsModalOpen(false)}
             >
                Batal
             </Button>
             <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="flex-[2] h-12 rounded-xl font-black uppercase tracking-widest text-[10px] bg-slate-900 border-none"
             >
                Simpan Dokumentasi
             </Button>
          </div>
        </Form>
      </Modal>

      <style jsx global>{`
        .admin-table .ant-table-thead > tr > th {
          background: transparent !important;
          border-bottom: 2px solid #f8fafc !important;
          color: #94a3b8 !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          font-size: 10px !important;
        }
        .admin-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f8fafc !important;
          padding: 16px !important;
        }
        .admin-table .ant-table-row:hover > td {
          background: #f8fafc/50 !important;
        }
        .custom-modal .ant-modal-content {
          border-radius: 2rem !important;
          padding: 2rem !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
