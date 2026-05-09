"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff,
  FileText,
  Loader2,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { deleteBerita, toggleBeritaStatus } from "./actions";
import { Card, CardContent } from "@/components/ui/card";

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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<BeritaItem | null>(null);

  useEffect(() => { setNews(initialData); }, [initialData]);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    const id = itemToDelete.id;
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
      setIsAlertOpen(false);
      setItemToDelete(null);
    }
  };

  const handleToggleStatus = async (item: BeritaItem) => {
    setTogglingId(item.id);
    try {
      const res = await toggleBeritaStatus(item.id, item.published_at);
      if (res.success) {
        toast.success(`Berita berhasil ${res.isPublished ? 'diterbitkan' : 'disimpan sebagai draft'}`);
        setNews((prev) =>
          prev.map((n) =>
            n.id === item.id
              ? { ...n, published_at: res.isPublished ? new Date().toISOString() : null }
              : n
          )
        );
      } else {
        toast.error((res as any).error || 'Gagal menyimpan berita');
      }
    } catch (err: any) {
      toast.error("Gagal mengubah status: " + err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = (item: BeritaItem) => {
    setItemToDelete(item);
    setIsAlertOpen(true);
  };

  const filteredNews = news.filter((n) =>
    n.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen Berita</h2>
          <p className="text-slate-500 text-sm font-medium">Publikasikan informasi dan kegiatan terbaru UPT BLK Wonojati.</p>
        </div>

        <Link href="/admin/berita/tulis">
          <Button 
            className="bg-primary hover:bg-green-600 text-white font-black uppercase tracking-widest text-[11px] h-12 px-8 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="mr-2 h-5 w-5" /> Tulis Berita
          </Button>
        </Link>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1 rounded-[1.5rem] border-none shadow-xl shadow-slate-200/40 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Berita</span>
              <div className="flex items-end gap-2">
                 <h3 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">{news.length}</h3>
                 <span className="text-[10px] font-bold text-primary mb-1 uppercase">Artikel</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3 flex items-center gap-4 bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5" />
            <Input
              placeholder="Cari kata kunci berita..."
              className="pl-12 h-12 border-none bg-transparent shadow-none focus-visible:ring-0 font-medium text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" className="hidden md:flex h-12 px-6 rounded-xl text-slate-400 hover:text-primary gap-2 font-bold uppercase text-[10px] tracking-widest">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 pl-8">Berita</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5">Status</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 hidden lg:table-cell">Tanggal</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 pr-8 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-slate-400 font-medium italic">
                      Belum ada berita yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNews.map((item) => {
                    const isPublished = !!item.published_at;
                    return (
                      <TableRow key={item.id} className="group border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="py-5 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
                              {item.image_url ? (
                                <Image src={item.image_url} width={56} height={56} className="w-full h-full object-cover" alt={item.title} />
                              ) : (
                                <FileText className="text-slate-300 w-6 h-6" />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0 pr-4">
                              <span className="font-black text-slate-900 leading-snug line-clamp-2 text-sm tracking-tight">
                                {item.title}
                              </span>
                              <span className="text-[11px] font-medium text-slate-400 line-clamp-1 mt-0.5">
                                {item.excerpt}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5 hidden md:table-cell">
                          <Badge variant="outline" className="bg-green-50/50 text-primary border-green-100 font-black uppercase text-[9px] tracking-widest rounded-full px-3 py-0.5">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-5">
                          <button
                            onClick={() => handleToggleStatus(item)}
                            disabled={togglingId === item.id}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed ${
                              isPublished
                                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                          >
                            {togglingId === item.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : isPublished ? (
                              <Eye size={12} />
                            ) : (
                              <EyeOff size={12} />
                            )}
                            {isPublished ? "Published" : "Draft"}
                          </button>
                        </TableCell>
                        <TableCell className="py-5 hidden lg:table-cell">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">
                              {new Date(item.published_at || item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {new Date(item.published_at || item.created_at).getFullYear()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-5 pr-8 text-right">
                          <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link href={`/admin/berita/edit/${item.id}`}>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 cursor-pointer">
                                      <Pencil size={16} />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>Edit Artikel</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => confirmDelete(item)}
                                    className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Hapus Artikel</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination Placeholder */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Total {news.length} Berita</span>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Prev</Button>
               <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight">Hapus Artikel?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium">
              Artikel <span className="font-bold text-slate-900">"{itemToDelete?.title}"</span> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="rounded-xl h-11 font-bold border-none bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={deletingId === itemToDelete?.id}
              className="rounded-xl h-11 font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 cursor-pointer"
            >
              {deletingId ? "Menghapus..." : "Ya, Hapus Artikel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
