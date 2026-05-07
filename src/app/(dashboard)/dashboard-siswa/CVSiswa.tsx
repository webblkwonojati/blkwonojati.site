"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  X
} from "lucide-react";
import { uploadCVAction } from "./actions";
import { toast } from "sonner";

export default function CVSiswa({ initialCV, userId }: { initialCV?: string, userId: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState(initialCV);
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Format file harus PDF, PNG, atau JPG.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadCVAction(formData, userId);

      if (!result.success) throw new Error(result.error);

      setCvUrl(result.url);
      toast.success("CV berhasil diupdate via GitHub!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Gagal mengupload CV.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-none">Curriculum Vitae</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Wajib diisi untuk melamar</p>
          </div>
        </div>
        {cvUrl && (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Sudah Terupload</span>
          </div>
        )}
      </div>

      {!cvUrl ? (
        <div className="group relative border-2 border-dashed border-slate-200 hover:border-primary/50 bg-slate-50/50 hover:bg-white rounded-[24px] p-10 text-center transition-all">
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            onChange={handleUpload}
            accept=".pdf,.png,.jpg,.jpeg"
            disabled={isUploading}
            suppressHydrationWarning
          />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {isUploading ? <Loader2 className="w-8 h-8 text-primary animate-spin" /> : <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />}
            </div>
            <p className="text-sm font-bold text-slate-900">Klik atau seret file ke sini</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">PDF atau PNG (Maks 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-900">CV Saya Terupdate</p>
                <a href={cvUrl} target="_blank" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Lihat File</a>
             </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCvUrl("")}
            className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {!cvUrl && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
           <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
           <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
             Perhatian: Perusahaan tidak dapat melihat profil Anda sebelum CV terupload.
           </p>
        </div>
      )}
    </div>
  );
}
