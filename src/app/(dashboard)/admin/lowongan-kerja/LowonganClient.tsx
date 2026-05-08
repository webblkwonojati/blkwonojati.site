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
  Flex
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { Building2, Eye, Pencil, Trash2 } from "lucide-react";

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
      title: 'POSISI & PERUSAHAAN',
      key: 'position',
      width: '40%',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
            {record.poster_url ? (
              <img src={record.poster_url} className="w-full h-full object-cover" alt={record.posisi} />
            ) : (
              <Building2 className="w-4 h-4 text-slate-300" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <Text strong className="text-slate-900 text-sm tracking-tight truncate">{record.posisi}</Text>
            <Text type="secondary" className="text-[11px] font-medium truncate">{record.instansi_perusahaan}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'TIPE',
      dataIndex: 'tipe_pekerjaan',
      key: 'type',
      render: (type: string) => (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {type}
        </span>
      ),
    },
    {
      title: 'VIEWS',
      dataIndex: 'views_count',
      key: 'views',
      align: 'center' as const,
      render: (count: number) => (
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{count || 0}</span>
        </div>
      ),
    },
    {
      title: 'STATUS',
      key: 'status',
      render: (_: any, record: any) => (
        <Flex gap="small" align="center">
          <Switch 
            size="small"
            checked={record.is_active} 
            loading={togglingId === record.id}
            onChange={() => handleToggleActive(record.id, record.is_active)}
            style={{ backgroundColor: record.is_active ? '#5ca25a' : undefined }}
          />
          <span className={`text-[10px] font-black uppercase tracking-widest ${record.is_active ? 'text-emerald-500' : 'text-slate-300'}`}>
            {record.is_active ? 'Aktif' : 'Draft'}
          </span>
        </Flex>
      ),
    },
    {
      title: 'DEADLINE',
      dataIndex: 'batas_lamaran',
      key: 'deadline',
      render: (date: string) => (
        <Text className="text-slate-400 font-medium text-xs">
          {date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '-'}
        </Text>
      ),
    },
    {
      title: 'AKSI',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Flex gap="4px" justify="end">
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
      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-200/30 overflow-hidden">
        <Table 
          dataSource={filteredJobs} 
          columns={columns} 
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            placement: ['bottomCenter'],
            className: "py-8 m-0 border-t border-slate-50 font-bold",
            itemRender: (page, type, originalElement) => {
              if (type === 'prev') return <Text className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Prev</Text>;
              if (type === 'next') return <Text className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Next</Text>;
              if (type === 'page') return <div className="text-xs font-bold w-full h-full flex items-center justify-center">{page}</div>;
              return originalElement;
            }
          }}
          className="custom-antd-table-clean"
        />
      </div>
    </div>
  );
}
