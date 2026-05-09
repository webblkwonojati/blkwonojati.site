"use client";

import { useState } from "react";
import { Button, Table, Space, Tag, Popconfirm, App, Switch, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteKejuruan, toggleKejuruanStatus } from "../actions/kejuruan";

export default function KejuruanClient({ initialData }: { initialData: any[] }) {
  const { message } = App.useApp();
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deleteKejuruan(id);
      setData(data.filter((item) => item.id !== id));
      message.success("Program kejuruan berhasil dihapus");
    } catch (error) {
      console.error(error);
      message.error("Gagal menghapus program kejuruan");
    }
  };

  const handleToggleActive = async (id: string, checked: boolean) => {
    try {
      const { data: updatedItem } = await toggleKejuruanStatus(id, checked);
      if (updatedItem) {
        setData(data.map(item => item.id === id ? updatedItem : item));
        message.success(`Status berhasil diubah menjadi ${checked ? "Aktif" : "Non-aktif"}`);
      }
    } catch (error) {
      console.error(error);
      message.error("Gagal mengubah status program");
    }
  };

  const columns = [
    {
      title: "NAMA PROGRAM",
      dataIndex: "title",
      key: "title",
      width: 400,
      render: (title: string, record: any) => (
        <div className="flex flex-col min-w-0 py-2">
          <span className="font-bold text-slate-900 leading-snug truncate-2-lines whitespace-normal">{title}</span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">{record.category}</span>
        </div>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value: any, record: any) =>
        String(record.title).toLowerCase().includes(String(value).toLowerCase()) ||
        String(record.category).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: "KATEGORI",
      dataIndex: "category",
      key: "category",
      responsive: ["md" as const],
      render: (cat: string) => (
        <Tag color="green" className="font-bold border-none rounded-full px-3 uppercase text-[10px] tracking-widest py-0.5">
          {cat}
        </Tag>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "is_active",
      key: "is_active",
      render: (active: boolean, record: any) => (
        <div className="flex items-center gap-3">
          <Switch 
            checked={active} 
            size="small"
            onChange={(checked) => handleToggleActive(record.id, checked)}
          />
          <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-emerald-500' : 'text-slate-400'}`}>
            {active ? 'Aktif' : 'Draft'}
          </span>
        </div>
      ),
    },
    {
      title: "AKSI",
      key: "action",
      align: 'right' as const,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <div className="flex justify-end gap-1">
          <Button
            type="text"
            icon={<EditOutlined className="text-slate-400 hover:text-primary" />}
            onClick={() => router.push(`/admin/kejuruan/edit/${record.id}`)}
            className="rounded-xl flex items-center justify-center h-10 w-10"
          />
          <Popconfirm
            title="Hapus Program"
            description="Hapus program kejuruan ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya, Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined className="text-slate-400 hover:text-red-500" />}
              className="rounded-xl flex items-center justify-center h-10 w-10 font-bold"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Manajemen Kejuruan</h1>
          <p className="text-slate-500 text-sm">Kelola kurikulum dan modul pelatihan unggulan BLK.</p>
        </div>
        
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => router.push('/admin/kejuruan/create')}
          className="flex items-center h-12 px-8 rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-all text-xs font-black uppercase tracking-widest"
        >
          Tambah Program
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-50 shadow-sm overflow-hidden">
        <Input
          placeholder="Cari program kejuruan..."
          variant="borderless"
          prefix={<SearchOutlined className="text-slate-300 mr-2" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-10 text-sm font-medium"
          allowClear
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{ 
            pageSize: 10,
            placement: ['bottomCenter'],
            className: "py-8 m-0 border-t border-slate-50 font-bold",
            showTotal: (total) => <span className="text-[10px] font-black uppercase tracking-widest pl-8 text-slate-400">Total {total} Program</span>
          }}
        />
      </div>
    </div>
  );
}
