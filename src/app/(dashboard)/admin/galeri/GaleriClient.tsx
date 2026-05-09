"use client";

import { useState } from "react";
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  ExternalLink,
  Search,
  Filter,
  Loader2,
  Calendar
} from "lucide-react";
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { addGaleri, deleteGaleri } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

interface GaleriItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
});

export default function GaleriClient({ initialData }: { initialData: GaleriItem[] }) {
  const [data, setData] = useState<GaleriItem[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GaleriItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "Kegiatan",
    },
  });

  const filteredData = data.filter(item => 
    item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchText.toLowerCase())
  );

  const categories = ["Kegiatan", "Fasilitas", "Kunjungan", "Workshop", "Lainnya"];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageUrl) {
      toast.error("Harap unggah gambar terlebih dahulu");
      return;
    }
    setLoading(true);
    try {
      const res = await addGaleri({
        title: values.title,
        image_url: imageUrl,
        category: values.category || "Kegiatan"
      });

      if (!res.success) throw new Error(res.error);

      setData([res.data, ...data]);
      toast.success("Foto berhasil ditambahkan ke galeri");
      setIsModalOpen(false);
      form.reset();
      setImageUrl("");
      router.refresh();
    } catch (error: any) {
      toast.error("Gagal menambahkan foto: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!itemToDelete) return;
    try {
      const res = await deleteGaleri(itemToDelete.id);
      if (!res.success) throw new Error(res.error);

      setData(data.filter(item => item.id !== itemToDelete.id));
      toast.success("Foto berhasil dihapus");
      setIsAlertOpen(false);
      setItemToDelete(null);
      router.refresh();
    } catch (error: any) {
      toast.error("Gagal menghapus foto: " + error.message);
    }
  }

  const confirmDelete = (item: GaleriItem) => {
    setItemToDelete(item);
    setIsAlertOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">Media Assets</span>
             <span className="w-px h-3 bg-slate-200" />
             <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{data.length} Total Items</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">
            Galeri Dokumentasi
          </h2>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-slate-900 hover:bg-primary text-white transition-all shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" /> Tambah Dokumentasi
        </Button>
      </div>

      {/* Main Container */}
      <Card className="border-none shadow-2xl shadow-slate-200/20 rounded-[2.5rem] overflow-hidden bg-white">
        <CardContent className="p-0">
          {/* Toolbar */}
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/30">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 z-10" />
                <Input 
                  placeholder="Cari foto atau kategori..." 
                  className="h-12 pl-12 pr-4 rounded-2xl border-none bg-white shadow-sm font-medium text-slate-600 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-none"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
             </div>
             <Button variant="ghost" className="h-12 px-6 rounded-xl text-slate-400 hover:text-primary gap-2 font-bold uppercase text-[10px] tracking-widest">
                <Filter size={16} /> Filter Kategori
             </Button>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 pl-8">Pratinjau</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5">Informasi Detail</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 hidden md:table-cell">Tanggal Post</TableHead>
                  <TableHead className="font-bold text-slate-900 uppercase text-[10px] tracking-widest py-5 pr-8 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-48 text-center text-slate-400 font-medium italic">
                      Belum ada dokumentasi yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="group border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-4 pl-8">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm transition-transform group-hover:scale-105">
                          <Image 
                            src={item.image_url} 
                            alt={item.title} 
                            fill 
                            sizes="80px"
                            className="object-cover" 
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-black text-slate-900 text-sm tracking-tight">{item.title}</span>
                          <Badge variant="outline" className="w-fit rounded-full px-3 py-0.5 font-black uppercase text-[8px] tracking-[0.15em] bg-slate-100 border-none text-slate-500">
                            {item.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar size={14} className="text-slate-300" />
                          <span className="text-xs font-bold uppercase tracking-tighter">
                            {new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 pr-8 text-right">
                        <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-emerald-50 cursor-pointer"
                          >
                            <a href={item.image_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} />
                            </a>
                          </Button>
                          <Button 
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDelete(item)}
                            className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Total {data.length} Foto</span>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Prev</Button>
               <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase cursor-pointer">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <DialogHeader className="p-8 pb-0">
            <div className="flex items-center gap-3 py-2 border-b border-slate-50 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-500/10">
                 <ImageIcon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 m-0 leading-none mb-1">Media Entry</p>
                <DialogTitle className="text-xl font-black text-slate-900 tracking-tight m-0 leading-none">Tambah Foto Galeri</DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unggah Foto Dokumentasi *</label>
                  <ImageUpload 
                    initialValue={imageUrl}
                    onUploadComplete={setImageUrl}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Judul Dokumentasi</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Contoh: Pelatihan Las Listrik 2024" 
                          {...field}
                          className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus-visible:ring-primary/10 border-none shadow-none font-bold text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-none shadow-none focus:ring-primary/10 font-bold text-sm">
                            <SelectValue placeholder="Pilih Kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-none shadow-2xl">
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat} className="text-xs font-bold py-3">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px] font-bold" />
                    </FormItem>
                  )}
                />

                <div className="pt-4 flex gap-3">
                   <Button 
                      type="button"
                      variant="ghost"
                      className="flex-1 h-12 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
                      onClick={() => setIsModalOpen(false)}
                   >
                      Batal
                   </Button>
                   <Button 
                      disabled={loading}
                      className="flex-[2] h-12 rounded-xl font-black uppercase tracking-widest text-[11px] bg-slate-900 hover:bg-primary text-white shadow-xl shadow-slate-900/10 cursor-pointer"
                   >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Dokumentasi"}
                   </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight">Hapus Foto?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium">
              Foto <span className="font-bold text-slate-900">"{itemToDelete?.title}"</span> akan dihapus dari galeri secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="rounded-xl h-11 font-bold border-none bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-xl h-11 font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 cursor-pointer"
            >
              Ya, Hapus Foto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
