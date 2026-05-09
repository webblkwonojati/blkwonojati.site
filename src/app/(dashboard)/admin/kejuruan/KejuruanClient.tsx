"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  BookOpen,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteKejuruan, toggleKejuruanStatus } from "../actions/kejuruan";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function KejuruanClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteKejuruan(itemToDelete.id);
      setData(data.filter((item) => item.id !== itemToDelete.id));
      toast.success("Program kejuruan berhasil dihapus ✨");
    } catch (error) {
      toast.error("Gagal menghapus program kejuruan");
    } finally {
      setIsAlertOpen(false);
      setItemToDelete(null);
    }
  };

  const confirmDelete = (item: any) => {
    setItemToDelete(item);
    setIsAlertOpen(true);
  };

  const handleToggleActive = async (id: string, checked: boolean) => {
    try {
      const { data: updatedItem } = await toggleKejuruanStatus(id, checked);
      if (updatedItem) {
        setData(data.map(item => item.id === id ? updatedItem : item));
        toast.success(`Status berhasil diubah menjadi ${checked ? "Aktif" : "Non-aktif"}`);
      }
    } catch (error) {
      toast.error("Gagal mengubah status program");
    }
  };

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header Area */}
      <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg shadow-primary/5">
                  <BookOpen size={28} />
               </div>
               <div>
                  <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase leading-none mb-1">
                    Kurikulum Kejuruan
                  </h1>
                  <p className="text-slate-500 text-sm font-medium">Kelola kurikulum dan modul pelatihan unggulan BLK.</p>
               </div>
            </div>
            
            <Button
              onClick={() => router.push('/admin/kejuruan/create')}
              className="h-12 px-8 rounded-2xl bg-slate-900 hover:bg-primary text-white shadow-xl shadow-slate-900/10 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest cursor-pointer"
            >
              <Plus size={18} className="mr-2" /> Tambah Program
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
               <Input
                 placeholder="Cari program kejuruan atau kategori..."
                 value={searchText}
                 onChange={(e) => setSearchText(e.target.value)}
                 className="h-12 pl-12 pr-4 rounded-2xl border-none bg-slate-50 shadow-none font-medium text-slate-600 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all"
               />
            </div>
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
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6 pl-10">Nama Program</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6 hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6">Status</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-6 pr-10 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-48 text-center text-slate-400 font-medium italic">
                      Belum ada program kejuruan yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="group border-slate-50 hover:bg-slate-50/40 transition-colors">
                      <TableCell className="py-6 pl-10">
                        <div className="flex flex-col min-w-0 pr-4">
                          <span className="font-black text-slate-900 leading-snug tracking-tight text-sm uppercase">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">
                            ID: {item.id.slice(0, 8)}...
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 hidden md:table-cell">
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-black uppercase text-[9px] tracking-widest rounded-full px-4 py-0.5">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-3">
                          <Switch 
                            checked={item.is_active} 
                            onCheckedChange={(checked) => handleToggleActive(item.id, checked)}
                            className="data-[state=checked]:bg-emerald-500 cursor-pointer scale-90"
                          />
                          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${item.is_active ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {item.is_active ? 'Aktif' : 'Draft'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 pr-10 text-right">
                        <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => router.push(`/admin/kejuruan/edit/${item.id}`)}
                                  className="rounded-xl h-10 w-10 text-slate-400 hover:text-primary hover:bg-primary/5 cursor-pointer"
                                >
                                  <Pencil size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Program</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => confirmDelete(item)}
                                  className="rounded-xl h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Hapus Program</TooltipContent>
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
          <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total {filteredData.length} Program Pelatihan</span>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Prev</Button>
                <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Next</Button>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <AlertCircle className="text-red-500" /> Hapus Program?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium">
              Program kejuruan <span className="font-bold text-slate-900">"{itemToDelete?.title}"</span> akan dihapus secara permanen. Data yang sudah dihapus tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="rounded-xl h-11 font-bold border-none bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-xl h-11 font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 cursor-pointer"
            >
              Ya, Hapus Program
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
