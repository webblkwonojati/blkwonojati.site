"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Search, 
  Plus, 
  Trash2, 
  UserCheck, 
  Filter
} from "lucide-react";
import { toast } from "sonner";

export default function PesertaClient({ initialData }: { initialData: any[] }) {
  const [peserta, setPeserta] = useState<any[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nik: "",
    full_name: "",
    jurusan: "",
    tahun_pelatihan: new Date().getFullYear().toString()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered Data
  const filteredPeserta = peserta.filter(p => 
    p.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nik?.includes(searchQuery)
  );

  const handleAddPeserta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nik.length !== 16) {
      toast.error("NIK harus 16 digit");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/peserta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const sessionData = await res.json();
      
      if (!res.ok) throw new Error(sessionData.error || "Gagal simpan");

      setPeserta([sessionData.data, ...peserta]);
      setFormData({ 
        nik: "", 
        full_name: "", 
        jurusan: "", 
        tahun_pelatihan: new Date().getFullYear().toString() 
      });
      setIsDialogOpen(false);
      toast.success("Peserta berhasil ditambahkan");
    } catch (error: any) {
      toast.error(error.message || "Gagal menambahkan peserta");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch(`/api/admin/peserta?id=${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Gagal hapus");

      setPeserta(peserta.filter(p => p.id !== id));
      toast.success("Data berhasil dihapus");
    } catch (error: any) {
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Peserta Pelatihan</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola daftar NIK siswa yang diizinkan untuk mendaftar akun.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={
            <button className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold rounded-xl h-11 px-6 shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer border-none outline-none">
              <Plus className="w-4 h-4 mr-2" /> Tambah Peserta
            </button>
          } />
          <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-accent">Tambah Peserta Baru</DialogTitle>
              <DialogDescription className="text-slate-500 text-xs"> Masukkan data NIK sesuai KTP peserta pelatihan. </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPeserta} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nik" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nomor Induk Kependudukan (16 Digit)</Label>
                <Input 
                  id="nik" 
                  value={formData.nik}
                  onChange={(e) => setFormData({...formData, nik: e.target.value.replace(/\D/g, "").slice(0, 16)})}
                  placeholder="NIK sesuai KTP" 
                  className="rounded-xl h-12 border-slate-200"
                  maxLength={16}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="Nama sesuai KTP" 
                  className="rounded-xl h-12 border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurusan" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Kejuruan / Program</Label>
                <Input 
                  id="jurusan" 
                  value={formData.jurusan}
                  onChange={(e) => setFormData({...formData, jurusan: e.target.value})}
                  placeholder="Contoh: Barista Kafe" 
                  className="rounded-xl h-12 border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tahun" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tahun Angkatan</Label>
                <Input 
                  id="tahun" 
                  value={formData.tahun_pelatihan}
                  onChange={(e) => setFormData({...formData, tahun_pelatihan: e.target.value.replace(/\D/g, "").slice(0, 4)})}
                  placeholder="Contoh: 2024" 
                  className="rounded-xl h-12 border-slate-200"
                  maxLength={4}
                  required
                />
              </div>
              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white h-12 rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Data Peserta"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Cari berdasarkan nama atau NIK..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 border-none bg-transparent focus-visible:ring-0 shadow-none text-sm"
          />
        </div>
        <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
        <Button variant="ghost" className="hidden md:flex text-slate-500 font-bold hover:bg-slate-50 rounded-xl px-4">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Table Area */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-16 text-center font-bold text-slate-400 text-[10px] uppercase tracking-widest py-6">ID</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Informasi Peserta</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Jurusan</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Status Registrasi</TableHead>
                <TableHead className="text-right font-bold text-slate-400 text-[10px] uppercase tracking-widest pr-8">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPeserta.length > 0 ? (
                filteredPeserta.map((p, idx) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 transition-colors border-slate-50">
                    <TableCell className="text-center text-slate-400 text-xs font-medium">{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex flex-col min-w-[200px]">
                        <span className="font-bold text-slate-900">{p.full_name}</span>
                        <span className="text-xs text-slate-500 font-medium tracking-tight mt-0.5">{p.nik}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap">
                        {p.jurusan}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[140px]">
                         <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                         <span className="text-[11px] font-bold text-slate-400 italic">Belum Registrasi</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(p.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center bg-slate-50/20">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <UserCheck className="w-12 h-12 mb-4" />
                      <p className="text-xs font-bold uppercase tracking-widest">Tidak ada data ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
