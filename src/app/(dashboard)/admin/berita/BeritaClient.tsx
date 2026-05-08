"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Table, 
  Input, 
  Button, 
  Tag, 
  Flex, 
  Tooltip, 
  Popconfirm, 
  Typography, 
  Card,
  Badge,
  Empty,
  message
} from "antd";
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined,
  FileTextOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { toast } from "sonner";
import { deleteBerita, toggleBeritaStatus } from "./actions";

const { Title, Text } = Typography;

// ─── Types ──────────────────────────────────────────────────────────────────
interface BeritaItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
}

export default function BeritaClient({ initialData }: { initialData: BeritaItem[] }) {
  const [news, setNews] = useState<BeritaItem[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => { setNews(initialData); }, [initialData]);

  // ─── Actions ───────────────────────────────────────────────────────────
  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    try {
      const result = await deleteBerita(id);
      if (!result.success) throw new Error(result.error);
      setNews((prev) => prev.filter((n) => n.id !== id));
      toast.success("Berita berhasil dihapus.");
    } catch (err: any) {
      toast.error("Gagal menghapus berita: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (item: BeritaItem) => {
    setTogglingId(item.id);
    try {
      const res = await toggleBeritaStatus(item.id, item.published_at);
      if (res.success) {
        message.success(`Berita berhasil ${res.isPublished ? 'diterbitkan' : 'disimpan sebagai draft'}`);
        setNews((prev) =>
          prev.map((n) =>
            n.id === item.id
              ? { ...n, published_at: res.isPublished ? new Date().toISOString() : null }
              : n
          )
        );
      } else {
        message.error((res as any).error || 'Gagal menyimpan berita');
      }
    } catch (err: any) {
      toast.error("Gagal mengubah status: " + err.message);
    } finally {
      setTogglingId(null);
    }
  };

  // ─── Table Configuration ─────────────────────────────────────────────
  const columns = [
    {
      title: 'BERITA',
      key: 'news',
      fixed: 'left' as const,
      render: (_: any, record: BeritaItem) => (
        <Flex gap="middle">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
            {record.image_url ? (
              <Image src={record.image_url} width={48} height={48} className="w-full h-full object-cover" alt={record.title} />
            ) : (
              <FileTextOutlined className="text-slate-300 text-xl" />
            )}
          </div>
          <div className="flex flex-col max-w-[150px] md:max-w-sm">
            <Text strong className="text-slate-900 leading-tight block truncate">{record.title}</Text>
            <Text type="secondary" className="text-[10px] md:text-[11px] truncate block">{record.excerpt}</Text>
          </div>
        </Flex>
      ),
    },
    {
      title: 'KATEGORI',
      dataIndex: 'category',
      key: 'category',
      responsive: ['md' as const],
      render: (category: string) => (
        <Tag color="green" className="font-bold border-none rounded-full px-3 uppercase text-[10px] tracking-widest py-0.5">
          {category}
        </Tag>
      ),
    },
    {
      title: 'STATUS',
      key: 'status',
      render: (_: any, record: BeritaItem) => {
        const isPublished = !!record.published_at;
        return (
          <Badge 
            status={isPublished ? "success" : "warning"} 
            text={
              <button
                onClick={() => handleToggleStatus(record)}
                disabled={togglingId === record.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {togglingId === record.id ? <LoadingOutlined /> : isPublished ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                {isPublished ? "Published" : "Draft"}
              </button>
            }
          />
        );
      },
    },
    {
      title: 'TANGGAL',
      key: 'date',
      responsive: ['lg' as const],
      render: (_: any, record: BeritaItem) => (
        <Text type="secondary" className="text-xs uppercase font-bold tracking-tighter">
          {new Date(record.published_at || record.created_at).toLocaleDateString("id-ID", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </Text>
      ),
    },
    {
      title: 'AKSI',
      key: 'action',
      align: 'right' as const,
      fixed: 'right' as const,
      render: (_: any, record: BeritaItem) => (
        <Flex gap="small" justify="end">
          <Tooltip title="Edit Artikel">
            <Link href={`/admin/berita/edit/${record.id}`}>
              <Button 
                type="text" 
                icon={<EditOutlined className="text-slate-400 hover:text-primary" />} 
                className="rounded-xl flex items-center justify-center h-10 w-10"
              />
            </Link>
          </Tooltip>
          <Popconfirm
            title="Hapus Artikel"
            description={`Hapus artikel "${record.title}"?`}
            onConfirm={() => handleDelete(record.id, record.title)}
            okText="Ya, Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true, loading: deletingId === record.id }}
          >
            <Tooltip title="Hapus">
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined className="text-slate-400 hover:text-red-500" />} 
                className="rounded-xl flex items-center justify-center h-10 w-10 font-bold"
              />
            </Tooltip>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const filteredNews = news.filter((n) =>
    n.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <Title level={2} className="!m-0 !text-2xl !font-black !tracking-tight">Manajemen Berita</Title>
          <Text type="secondary">Publikasikan informasi dan kegiatan terbaru UPT BLK Wonojati.</Text>
        </div>

        <Link href="/admin/berita/tulis">
          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />}
            className="flex items-center h-12 px-8 rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-all text-xs font-black uppercase tracking-widest"
          >
            Tulis Berita
          </Button>
        </Link>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1 rounded-2xl border-slate-50 shadow-sm" styles={{ body: { padding: '16px' } }}>
          <div className="flex flex-col gap-0.5">
            <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest">Total Berita</Text>
            <Title level={3} className="!m-0 !font-black tracking-tighter">{news.length}</Title>
          </div>
        </Card>
        
        <div className="md:col-span-3 flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-50 shadow-sm">
          <Input
            placeholder="Cari kata kunci berita..."
            variant="borderless"
            prefix={<SearchOutlined className="text-slate-300 mr-2" />}
            className="h-10 text-sm font-medium"
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={filteredNews} 
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{ 
            pageSize: 10,
            placement: ['bottomCenter'],
            className: "py-8 m-0 border-t border-slate-50 font-bold",
            showTotal: (total) => <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest pl-8">Total {total} Berita</Text>
          }}
          locale={{
            emptyText: <Empty description="Belum ada berita yang sesuai" />
          }}
        />
      </div>
    </div>
  );
}
