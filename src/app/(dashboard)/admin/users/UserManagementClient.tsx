"use client";

import React, { useState, useTransition } from "react";
import { Table, Button, Tag, Space, Card, Typography, Select, App } from "antd";
import { UserOutlined, SafetyCertificateOutlined, UserAddOutlined } from "@ant-design/icons";
import { updateUserRole } from "./actions";

const { Title, Text } = Typography;

export default function UserManagementClient({ initialUsers }: { initialUsers: any[] }) {
  const { message } = App.useApp();
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = async (userId: string, role: "admin" | "super_admin" | "") => {
    startTransition(async () => {
      try {
        // Jika empty string, kirim null ke backend
        const res = await updateUserRole(userId, role === "" ? null : role);
        if (res.success) {
          message.success("Role user berhasil diperbarui");
          // Update local state
          setUsers(prev => prev.map(u => u.id === userId ? { ...u, publicMetadata: { ...u.publicMetadata, role: role === "" ? null : role } } : u));
        }
      } catch (err) {
        message.error("Gagal memperbarui role");
      }
    });
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (record: any) => (
        <Space>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
            {record.imageUrl ? (
              <img src={record.imageUrl} alt={record.firstName} className="w-full h-full object-cover" />
            ) : (
              <UserOutlined className="text-slate-400" />
            )}
          </div>
          <div>
            <Text strong className="block leading-none mb-1">
              {record.firstName} {record.lastName}
            </Text>
            <Text type="secondary" className="text-[10px] uppercase font-bold tracking-widest">
              {record.username || "No Username"}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (record: any) => (
        <Text className="text-sm font-medium">
          {record.emailAddresses[0]?.emailAddress}
        </Text>
      ),
    },
    {
      title: "Current Role",
      key: "role",
      render: (record: any) => {
        const role = record.publicMetadata?.role;
        return (
          <Tag color={role === "super_admin" ? "volcano" : role === "admin" ? "green" : "default"} className="font-bold border-none rounded-full px-4 py-0.5 uppercase text-[10px] tracking-widest">
            {role || "No Role"}
          </Tag>
        );
      },
    },
    {
      title: "Assign Role",
      key: "action",
      render: (record: any) => (
        <Select
          defaultValue={record.publicMetadata?.role || ""}
          style={{ width: 160 }}
          onChange={(value) => handleRoleChange(record.id, value)}
          loading={isPending}
          disabled={isPending}
        >
          <Select.Option value="">None (Regular User)</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="super_admin">Super Admin</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <Title level={2} className="!m-0 !font-black !tracking-tighter !text-slate-900 leading-none mb-2">
            Manajemen Akses Admin
          </Title>
          <Text className="text-slate-500 font-medium">
            Kelola hak akses untuk tim pengelola konten BLK Wonojati.
          </Text>
        </div>
      </header>

      <Card 
        className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden"
        styles={{ body: { padding: 0 } }}
      >
        <Table 
          dataSource={users} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          className="admin-table"
        />
      </Card>

      <style jsx global>{`
        .admin-table .ant-table-thead > tr > th {
          background: #f8fafc !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          font-size: 10px !important;
          color: #64748b !important;
          padding: 24px !important;
          border-bottom: 2px solid #f1f5f9 !important;
        }
        .admin-table .ant-table-tbody > tr > td {
          padding: 20px 24px !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
      `}</style>
    </div>
  );
}
