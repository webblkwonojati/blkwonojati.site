"use client";

import { useState } from "react";
import { Button, Table, Space, Tag, Popconfirm, message, Switch, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteKejuruan, toggleKejuruanStatus } from "../actions/kejuruan";

export default function KejuruanClient({ initialData }: { initialData: any[] }) {
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
      title: "Nama Program",
      dataIndex: "title",
      key: "title",
      className: "font-semibold text-slate-900",
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value: any, record: any) =>
        String(record.title).toLowerCase().includes(String(value).toLowerCase()) ||
        String(record.category).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      render: (cat: string) => <Tag color="green" variant="solid">{cat}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (active: boolean, record: any) => (
        <Switch 
          checked={active} 
          onChange={(checked) => handleToggleActive(record.id, checked)}
        />
      ),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/kejuruan/edit/${record.id}`)}
            className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
          >
            Edit
          </Button>
          <Popconfirm
            title="Hapus program ini?"
            description="Tindakan ini tidak dapat dibatalkan."
            onConfirm={() => handleDelete(record.id)}
            okText="Ya, Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
              className="hover:bg-red-50"
            >
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
      {/* Decorative background matching the premium theme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 z-0"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">Program Kejuruan</h1>
          <p className="text-slate-500 mt-1">Kelola kurikulum dan modul pelatihan</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            placeholder="Cari program..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-64 rounded-xl border-slate-200 hover:border-primary focus:border-primary h-10"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push('/admin/kejuruan/create')}
            className="bg-primary hover:bg-primary/90 h-10 px-6 font-semibold rounded-xl shadow-lg shadow-green-500/30 border-none"
          >
            Tambah Baru
          </Button>
        </div>
      </div>

      <div className="relative z-10">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10, className: "mt-6" }}
          className="border border-slate-100 rounded-2xl overflow-hidden [&_.ant-table-thead>tr>th]:bg-slate-50 [&_.ant-table-thead>tr>th]:text-slate-600 [&_.ant-table-thead>tr>th]:font-semibold"
        />
      </div>
    </div>
  );
}
