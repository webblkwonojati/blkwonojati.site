'use client';

import React, { useState, useEffect } from 'react';
import { toggleLowonganActive, deleteLowongan } from './actions';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  Button, 
  Input, 
  Badge, 
  Switch, 
  Tooltip, 
  Popconfirm, 
  Typography,
  Card,
  Flex,
  Tag,
  Empty
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { Building2, Eye, Pencil, Trash2, Briefcase } from "lucide-react";

const { Title, Text } = Typography;

export default function LowonganClient({ initialJobs }: { initialJobs: any[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    const previousJobs = [...jobs];
    setJobs(prev => prev.map(job => job.id === id ? { ...job, is_active: !currentStatus } : job));
    
    try {
      const res = await toggleLowonganActive(id, currentStatus);
      if (!res.success) throw new Error('Failed');
      toast.success(`Lowongan ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`);
    } catch (err) {
      toast.error('Gagal mengubah status.');
      setJobs(previousJobs);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    const previousJobs = [...jobs];
    setJobs(prev => prev.filter(job => job.id !== id));
    
    try {
      const res = await deleteLowongan(id);
      if (!res.success) throw new Error('Failed');
      toast.success(`Lowongan "${title}" berhasil dihapus`);
    } catch (err) {
      toast.error('Gagal menghapus lowongan.');
      setJobs(previousJobs);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.instansi_perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' ? true : 
                        statusFilter === 'ACTIVE' ? job.is_active : !job.is_active;
    return matchSearch && matchStatus;
  });

  const columns = [
    {
      title: 'LOWONGAN',
      key: 'job',
      fixed: 'left' as const,
      render: (_: any, record: any) => (
        <Flex gap="middle">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
            {record.poster_url ? (
              <img src={record.poster_url} className="w-full h-full object-cover" alt={record.posisi} />
            ) : (
              <Briefcase className="text-slate-300 text-xl" />
            )}
          </div>
          <div className="flex flex-col max-w-[150px] md:max-w-sm">
            <Text strong className="text-slate-900 leading-tight block truncate">{record.posisi}</Text>
            <Text type="secondary" className="text-[10px] md:text-[11px] truncate block">{record.instansi_perusahaan}</Text>
          </div>
        </Flex>
      ),
    },
    {
      title: 'KATEGORI',
      dataIndex: 'tipe_pekerjaan',
      key: 'category',
      responsive: ['md' as const],
      render: (category: string) => (
        <Tag color="blue" className="font-bold border-none rounded-full px-3 uppercase text-[10px] tracking-widest py-0.5">
          {category}
        </Tag>
      ),
    },
    {
      title: 'STATUS',
      key: 'status',
      responsive: ['sm' as const],
      render: (_: any, record: any) => (
        <Badge status={record.is_active ? "success" : "default"} text={
          <span className={`text-[10px] font-black uppercase tracking-widest ${record.is_active ? "text-emerald-500" : "text-slate-400"}`}>
            {record.is_active ? "Active" : "Inactive"}
          </span>
        } />
      ),
    },
    {
      title: 'TANGGAL',
      key: 'date',
      responsive: ['lg' as const],
      render: (_: any, record: any) => (
        <Text type="secondary" className="text-xs uppercase font-bold tracking-tighter">
          {record.created_at ? new Date(record.created_at).toLocaleDateString("id-ID", {
            day: "numeric", month: "short", year: "numeric",
          }) : '-'}
        </Text>
      ),
    },
    {
      title: 'AKSI',
      key: 'action',
      align: 'right' as const,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <Flex gap="small" justify="end">
          <Button 
            type="text" 
            size="small"
            icon={<Pencil className="w-4 h-4 text-slate-400" />} 
            onClick={() => router.push(`/admin/lowongan-kerja/edit/${record.id}`)}
            className="hover:bg-slate-100 rounded-lg"
          />
          <Popconfirm
            title="Hapus Lowongan"
            onConfirm={() => handleDelete(record.id, record.posisi)}
            okText="Ya"
            cancelText="Tidak"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              size="small"
              danger 
              icon={<Trash2 className="w-4 h-4 text-slate-300 group-hover:text-red-500" />} 
              className="hover:bg-red-50 rounded-lg group"
            />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* ─── Simplified Header ────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-200/20">
        <div className="flex items-center gap-6 px-4">
          <div className="flex flex-col">
            <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Total</Text>
            <Title level={3} className="!m-0 !font-black !tracking-tighter">{jobs.length}</Title>
          </div>
          <div className="w-px h-8 bg-slate-100 hidden md:block" />
          <div className="flex items-center gap-1">
             <Button 
               type="text"
               size="small"
               onClick={() => setStatusFilter('ALL')}
               className={`rounded-lg px-4 h-9 font-black uppercase tracking-widest text-[10px] ${statusFilter === 'ALL' ? 'text-primary bg-green-50' : 'text-slate-400'}`}
             >
               Semua
             </Button>
             <Button 
               type="text"
               size="small"
               onClick={() => setStatusFilter('ACTIVE')}
               className={`rounded-lg px-4 h-9 font-black uppercase tracking-widest text-[10px] ${statusFilter === 'ACTIVE' ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400'}`}
             >
               Aktif
             </Button>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
           <Input 
             placeholder="Cari lowongan..." 
             variant="borderless"
             prefix={<SearchOutlined className="text-slate-300 mr-2" />}
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             className="h-10 w-full font-medium placeholder:text-slate-300 focus:placeholder:text-slate-400 transition-all"
           />
        </div>

        <Button 
          onClick={() => router.push('/admin/lowongan-kerja/tambah')}
          type="primary"
          icon={<PlusOutlined />}
          className="h-11 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-green-500/20"
        >
          Tambah Loker
        </Button>
      </div>

      {/* ─── Clean Table ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={filteredJobs} 
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{ 
            pageSize: 10,
            placement: ['bottomCenter'],
            className: "py-8 m-0 border-t border-slate-50 font-bold",
            showTotal: (total) => <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest pl-8">Total {total} Lowongan</Text>
          }}
          locale={{
            emptyText: <Empty description="Belum ada lowongan yang sesuai" />
          }}
        />
      </div>
    </div>
  );
}
