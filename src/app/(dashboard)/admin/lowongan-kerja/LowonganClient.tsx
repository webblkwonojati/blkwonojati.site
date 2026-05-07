'use client';

import React, { useState } from 'react';
import { toggleLowonganActive, deleteLowongan } from './actions';
import LowonganFormModal from './LowonganFormModal';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  Building2, 
  MapPin, 
  Calendar,
  Filter,
  MoreVertical,
  Eye,
  EyeOff
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LowonganClient({ initialJobs }: { initialJobs: any[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.instansi_perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' ? true : 
                        statusFilter === 'ACTIVE' ? job.is_active : !job.is_active;
    return matchSearch && matchStatus;
  });

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, is_active: !currentStatus } : job));
    const res = await toggleLowonganActive(id, currentStatus);
    if (!res.success) {
       alert('Failed to toggle status');
       setJobs(initialJobs);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah anda yakin ingin menghapus lowongan ini?')) return;
    setJobs(jobs.filter(job => job.id !== id));
    const res = await deleteLowongan(id);
    if (!res.success) {
      alert('Failed to delete job');
      setJobs(initialJobs);
    }
  };

  return (
    <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">Daftar Lowongan Kerja</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Manajemen informasi lowongan kerja untuk alumni UPT BLK Wonojati
            </CardDescription>
          </div>
          <Button onClick={() => { setEditingJob(null); setIsModalOpen(true); }} className="font-bold shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5 mr-2" />
            Tambah Lowongan
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-6 border-b bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Cari posisi atau perusahaan..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white transition-all rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
             <Button variant="outline" className={`rounded-xl h-11 px-4 ${statusFilter === 'ALL' ? 'bg-slate-100' : ''}`} onClick={() => setStatusFilter('ALL')}>Semua</Button>
             <Button variant="outline" className={`rounded-xl h-11 px-4 ${statusFilter === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}`} onClick={() => setStatusFilter('ACTIVE')}>Aktif</Button>
             <Button variant="outline" className={`rounded-xl h-11 px-4 ${statusFilter === 'INACTIVE' ? 'bg-slate-100' : ''}`} onClick={() => setStatusFilter('INACTIVE')}>Nonaktif</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[350px] font-bold py-4 pl-6 uppercase text-[11px] tracking-wider text-slate-500">Posisi & Perusahaan</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider text-slate-500">Tipe</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider text-slate-500 text-center">Views</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider text-slate-500">Batas Lamaran</TableHead>
                <TableHead className="text-right pr-6 font-bold uppercase text-[11px] tracking-wider text-slate-500">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-slate-400">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">Tidak ada data lowongan ditemukan</p>
                  </TableCell>
                </TableRow>
              ) : filteredJobs.map(job => (
                <TableRow key={job.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden">
                        {job.poster_url ? (
                          <img src={job.poster_url} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-5 h-5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 leading-tight">{job.posisi}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-slate-500 text-[12px] font-medium mt-0.5">
                          <span>{job.instansi_perusahaan}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-primary font-bold">{job.jurusan || 'Semua Jurusan'}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.lokasi}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-tight">
                      {job.tipe_pekerjaan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-bold text-[11px] bg-slate-100 text-slate-600">
                      <Eye className="w-3 h-3 mr-1" />
                      {job.views_count || 0}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={job.is_active} 
                        onCheckedChange={() => handleToggleActive(job.id, job.is_active)}
                        className="data-[state=checked]:bg-emerald-500"
                      />
                      <Badge variant={job.is_active ? "default" : "secondary"} className={`text-[10px] font-bold ${job.is_active ? 'bg-emerald-500' : ''}`}>
                        {job.is_active ? 'Aktif' : 'Draft'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-[13px]">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {job.batas_lamaran ? new Date(job.batas_lamaran).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      }) : '-'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs uppercase text-slate-400 font-bold px-3 py-2">Opsi Lowongan</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => { setEditingJob(job); setIsModalOpen(true); }} className="rounded-lg gap-2 cursor-pointer font-medium p-3">
                          <Pencil className="w-4 h-4 text-primary" /> Edit Data
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(job.id, job.is_active)} className="rounded-lg gap-2 cursor-pointer font-medium p-3">
                          {job.is_active ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-emerald-500" />}
                          {job.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem onClick={() => handleDelete(job.id)} className="rounded-lg gap-2 cursor-pointer font-medium p-3 text-red-600 hover:text-red-600 focus:text-red-600 hover:bg-red-50 focus:bg-red-50">
                          <Trash2 className="w-4 h-4" /> Hapus Permanen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {isModalOpen && (
        <LowonganFormModal 
           isOpen={isModalOpen} 
           onClose={() => setIsModalOpen(false)} 
           jobData={editingJob} 
        />
      )}
    </Card>
  );
}
