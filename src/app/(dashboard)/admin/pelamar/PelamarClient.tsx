"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  User, 
  MapPin, 
  Calendar,
  Phone,
  CheckCircle2,
  FileText,
  ExternalLink,
  Mail
} from "lucide-react";
import { toast } from "sonner";

export default function PelamarClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState<any[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter(p => 
    p.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone_number?.includes(searchQuery) ||
    p.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    try {
      if (filteredData.length === 0) {
        toast.error("Tidak ada data untuk diekspor");
        return;
      }

      // Format data for Excel
      const excelData = filteredData.map((p, idx) => ({
        "No": idx + 1,
        "Tanggal Register": new Date(p.created_at).toLocaleDateString('id-ID'),
        "Nama Lengkap": p.full_name,
        "Email": p.email || "-",
        "No. WhatsApp": p.phone_number || "-",
        "Alamat": p.address || "-",
        "Bio": p.bio || "-",
        "URL CV": p.cv_url || "Belum Update"
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa Register");

      // Generate buffer and download
      XLSX.writeFile(workbook, `Data_Siswa_Agrilearn_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Data berhasil diekspor ke Excel");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Gagal mengekspor data");
    }
  };

  return (
    <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-2">
                 Database Siswa & Alumni
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </CardTitle>
            <CardDescription className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Daftar seluruh pengguna yang telah melakukan registrasi akun.
            </CardDescription>
          </div>
          <Button 
            onClick={exportToExcel} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-200 rounded-xl h-12 px-8 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 mr-2" /> Export Excel
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-6 border-b bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Cari nama, email, atau alamat..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all rounded-xl shadow-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-bold bg-white">
                Total: {filteredData.length} Alumni Terdaftar
             </Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="w-16 text-center font-bold text-slate-400 text-[10px] uppercase tracking-widest py-6">No</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Informasi Dasar</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Alamat & Kontak</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Status CV</TableHead>
                <TableHead className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((p, idx) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 transition-colors border-slate-50">
                    <TableCell className="text-center text-slate-400 text-xs font-medium">{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex flex-col min-w-[200px] py-2">
                        <span className="font-black text-slate-900 group-hover:text-primary transition-colors">{p.full_name}</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500 font-bold">{p.email || "-"}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded font-black uppercase tracking-tighter">Registered: {new Date(p.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col max-w-[250px] py-2">
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-xs">
                           <Phone className="w-3 h-3 text-primary" />
                           {p.phone_number || "-"}
                        </div>
                        <div className="flex items-start gap-2 mt-2">
                           <MapPin className="w-3 h-3 text-slate-400 mt-1" />
                           <span className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed italic">
                             {p.address || "Alamat belum diisi"}
                           </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       {p.cv_url ? (
                         <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center w-fit gap-1.5 shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            CV Lengkap
                         </Badge>
                       ) : (
                         <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center w-fit gap-1.5 shadow-sm">
                            <User className="w-3 h-3" />
                            Belum Update
                         </Badge>
                       )}
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          {p.cv_url ? (
                            <Button 
                               onClick={() => window.open(p.cv_url, '_blank')}
                               size="sm" 
                               className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-9 rounded-lg px-4 flex items-center gap-2"
                            >
                               <FileText className="w-4 h-4" />
                               Buka CV
                               <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                            </Button>
                          ) : (
                            <Button 
                              disabled 
                              size="sm" 
                              variant="outline" 
                              className="h-9 rounded-lg px-4 text-slate-300 border-slate-100 font-bold"
                            >
                               Data Kosong
                            </Button>
                          )}
                       </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center bg-slate-50/20">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <User className="w-12 h-12 mb-4" />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tidak ada siswa ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
