'use client';

import React, { useState, useEffect } from 'react';
import { toggleLowonganActive, deleteLowongan } from './actions';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  Briefcase,
  Building2,
  Filter,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LowonganClient({ initialJobs }: { initialJobs: any[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

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

  const handleDelete = async () => {
    if (!itemToDelete) return;
    const id = itemToDelete.id;
    const title = itemToDelete.posisi;
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
      setIsAlertOpen(false);
      setItemToDelete(null);
    }
  };

  const confirmDelete = (item: any) => {
    setItemToDelete(item);
    setIsAlertOpen(true);
  };

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.instansi_perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' ? true : 
                        statusFilter === 'ACTIVE' ? job.is_active : !job.is_active;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header Area */}
      <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2rem] overflow-hidden bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-6 px-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Total</span>
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">{jobs.length}</h3>
              </div>
              <div className="w-px h-10 bg-slate-100 hidden md:block" />
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
                 <Button 
                   variant="ghost"
                   size="sm"
                   onClick={() => setStatusFilter('ALL')}
                   className={`rounded-lg px-4 h-9 font-black uppercase tracking-widest text-[10px] ${statusFilter === 'ALL' ? 'text-primary bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600'} cursor-pointer`}
                 >
                   Semua
                 </Button>
                 <Button 
                   variant="ghost"
                   size="sm"
                   onClick={() => setStatusFilter('ACTIVE')}
                   className={`rounded-lg px-4 h-9 font-black uppercase tracking-widest text-[10px] ${statusFilter === 'ACTIVE' ? 'text-emerald-500 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600'} cursor-pointer`}
                 >
                   Aktif
                 </Button>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-4 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <Input 
                 placeholder="Cari posisi atau instansi..." 
                 className="h-12 pl-12 pr-4 rounded-2xl border-none bg-slate-50 shadow-none font-medium text-slate-600 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
            </div>

            <Button 
              onClick={() => router.push('/admin/lowongan-kerja/tambah')}
              className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-slate-900 hover:bg-primary text-white shadow-xl shadow-slate-900/10 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5 mr-2" /> Tambah Loker
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 pl-8">Posisi & Perusahaan</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5">Status</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 hidden lg:table-cell">Tanggal</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 pr-8 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-slate-400 font-medium italic">
                      Belum ada lowongan pekerjaan yang sesuai.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((record) => (
                    <TableRow key={record.id} className="group border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
                            {record.poster_url ? (
                              <Image 
                                src={record.poster_url} 
                                width={56} 
                                height={56} 
                                className="w-full h-full object-cover" 
                                alt={record.posisi} 
                                sizes="56px"
                              />
                            ) : (
                              <Briefcase className="text-slate-300 w-6 h-6" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0 pr-4">
                            <span className="font-black text-slate-900 leading-snug line-clamp-2 text-sm tracking-tight">
                              {record.posisi}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5 opacity-60">
                              <Building2 size={10} />
                              <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                                {record.instansi_perusahaan}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 hidden md:table-cell">
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-black uppercase text-[9px] tracking-widest rounded-full px-3 py-0.5">
                          {record.tipe_pekerjaan}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5">
                        <button
                          onClick={() => handleToggleActive(record.id, record.is_active)}
                          disabled={togglingId === record.id}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed ${
                            record.is_active
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          }`}
                        >
                          {togglingId === record.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : record.is_active ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <XCircle size={12} />
                          )}
                          {record.is_active ? "Active" : "Inactive"}
                        </button>
                      </TableCell>
                      <TableCell className="py-5 hidden lg:table-cell">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                            {record.created_at ? new Date(record.created_at).toLocaleDateString("id-ID", {
                              day: "numeric", month: "short", year: "numeric",
                            }) : '-'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 pr-8 text-right">
                        <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => router.push(`/admin/lowongan-kerja/edit/${record.id}`)}
                                  className="h-9 w-9 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 cursor-pointer"
                                >
                                  <Pencil size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Lowongan</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => confirmDelete(record)}
                                  className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Hapus Lowongan</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Total {jobs.length} Lowongan</span>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Prev</Button>
               <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight">Hapus Lowongan?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium">
              Lowongan <span className="font-bold text-slate-900">"{itemToDelete?.posisi}"</span> di <span className="font-bold text-slate-900">{itemToDelete?.instansi_perusahaan}</span> akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="rounded-xl h-11 font-bold border-none bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-xl h-11 font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 cursor-pointer"
            >
              Ya, Hapus Lowongan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
