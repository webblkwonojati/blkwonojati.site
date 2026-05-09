"use client";

import React, { useState, useTransition } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  ShieldCheck, 
  UserPlus, 
  ShieldAlert,
  Loader2,
  Mail,
  UserCheck
} from "lucide-react";
import { updateUserRole } from "./actions";
import { toast } from "sonner";
import Image from "next/image";

export default function UserManagementClient({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = async (userId: string, role: string) => {
    startTransition(async () => {
      try {
        // Jika empty string, kirim null ke backend
        const res = await updateUserRole(userId, role === "none" ? null : role as any);
        if (res.success) {
          toast.success("Role user berhasil diperbarui ✨");
          // Update local state
          setUsers(prev => prev.map(u => u.id === userId ? { ...u, publicMetadata: { ...u.publicMetadata, role: role === "none" ? null : role } } : u));
        }
      } catch (err) {
        toast.error("Gagal memperbarui role");
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-none mb-2 uppercase">
            Manajemen Akses
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Kelola hak akses untuk tim pengelola konten BLK Wonojati.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <UserCheck size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-0.5">Active Admins</p>
              <p className="text-sm font-black text-slate-900 leading-none">
                {users.filter(u => u.publicMetadata?.role).length} Users
              </p>
           </div>
        </div>
      </header>

      <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/40 overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6 pl-8">User Info</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6">Email Address</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6">Current Role</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6 pr-8 text-right">Assign Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((record) => {
                  const role = record.publicMetadata?.role;
                  return (
                    <TableRow key={record.id} className="group border-slate-50 hover:bg-slate-50/40 transition-colors">
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 transition-transform group-hover:scale-105">
                            {record.imageUrl ? (
                              <Image 
                                src={record.imageUrl} 
                                alt={record.firstName || "User"} 
                                width={48} 
                                height={48} 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <User className="text-slate-300" size={20} />
                            )}
                          </div>
                          <div>
                            <span className="block font-black text-slate-900 leading-tight text-sm tracking-tight">
                              {record.firstName} {record.lastName}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                              @{record.username || "no-username"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail size={14} className="opacity-40" />
                          <span className="text-sm font-medium tracking-tight">
                            {record.emailAddresses[0]?.emailAddress}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge 
                          variant="outline" 
                          className={`font-black uppercase text-[9px] tracking-widest rounded-full px-4 py-0.5 border-none ${
                            role === "super_admin" 
                              ? "bg-orange-50 text-orange-600 shadow-sm" 
                              : role === "admin" 
                                ? "bg-emerald-50 text-emerald-600 shadow-sm" 
                                : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {role || "Regular User"}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5 pr-8 text-right">
                        <div className="flex justify-end">
                          <Select
                            defaultValue={role || "none"}
                            onValueChange={(value) => handleRoleChange(record.id, value)}
                            disabled={isPending}
                          >
                            <SelectTrigger className="w-[180px] h-10 rounded-xl bg-slate-50/50 border-none shadow-none font-bold text-[11px] uppercase tracking-wider focus:ring-primary/10">
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-none shadow-2xl p-2">
                              <SelectItem value="none" className="rounded-xl py-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 focus:bg-slate-50">
                                None (Regular)
                              </SelectItem>
                              <SelectItem value="admin" className="rounded-xl py-3 text-[11px] font-bold uppercase tracking-widest text-emerald-600 focus:bg-emerald-50">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck size={14} /> Admin Access
                                </div>
                              </SelectItem>
                              <SelectItem value="super_admin" className="rounded-xl py-3 text-[11px] font-bold uppercase tracking-widest text-orange-600 focus:bg-orange-50">
                                <div className="flex items-center gap-2">
                                  <ShieldAlert size={14} /> Super Admin
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="p-8 border-t border-slate-50 flex items-center justify-between">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total {users.length} Users Found</span>
             <div className="flex items-center gap-2 opacity-50">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-not-allowed cursor-pointer">Prev</Button>
                <Button variant="ghost" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-not-allowed cursor-pointer">Next</Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
