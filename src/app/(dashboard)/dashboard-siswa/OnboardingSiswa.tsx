"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  MapPin, 
  Phone, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Loader2,
  ArrowRight
} from "lucide-react";
import { uploadCVAction } from "./actions";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OnboardingSiswa({ profile, userId }: { profile: any, userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Biodata, 2: CV
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone_number: profile?.phone_number || "",
    address: profile?.address || "",
    bio: profile?.bio || ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Check if onboarding is needed
    const isIncomplete = !profile?.phone_number || !profile?.address || !profile?.cv_url;
    if (isIncomplete) {
      setIsOpen(true);
      // Determine starting step
      if (profile?.phone_number && profile?.address) {
        setStep(2);
      }
    }
  }, [profile]);

  const handleSaveBiodata = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          address: formData.address,
          bio: formData.bio
        })
        .eq("id", userId);

      if (error) throw error;
      
      toast.success("Biodata berhasil disimpan!");
      setStep(2);
    } catch (err: any) {
      toast.error("Gagal menyimpan biodata.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvFile(file);
  };

  const handleSubmitCV = async () => {
    if (!cvFile) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", cvFile);

      const result = await uploadCVAction(uploadData, userId);

      if (!result.success) throw new Error(result.error);

      toast.success("CV berhasil diupload! Selamat datang di dashboard.");
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Gagal mengupload CV.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-[32px] p-0 overflow-hidden font-display">
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#fc703d] animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider">Lengkapi Profil</span>
             </div>
             <DialogTitle className="text-2xl font-black mb-2">Selamat Datang!</DialogTitle>
             <DialogDescription className="text-slate-400 text-sm font-medium">
               Sebelum mengakses dashboard, mohon lengkapi informasi profil Anda terlebih dahulu.
             </DialogDescription>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#fc703d]/20 blur-3xl rounded-full"></div>
        </div>

        <div className="p-8">
           {/* Steps Indicator */}
           <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#fc703d]' : 'text-slate-300'}`}>
                 <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${step === 1 ? 'bg-[#fc703d] text-white' : 'bg-slate-100'}`}>1</div>
                 <span className="text-[11px] font-bold uppercase tracking-widest">Biodata</span>
              </div>
              <div className="flex-1 h-px bg-slate-100"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#fc703d]' : 'text-slate-300'}`}>
                 <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${step === 2 ? 'bg-[#fc703d] text-white' : 'bg-slate-100'}`}>2</div>
                 <span className="text-[11px] font-bold uppercase tracking-widest">Upload CV</span>
              </div>
           </div>

           {step === 1 ? (
             <form onSubmit={handleSaveBiodata} className="space-y-4">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap</Label>
                   <Input 
                      value={formData.full_name}
                      onChange={e => setFormData({...formData, full_name: e.target.value})}
                      required
                      placeholder="Contoh: Budi Santoso"
                      className="rounded-xl h-12 border-slate-200"
                   />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nomor WhatsApp</Label>
                   <Input 
                      value={formData.phone_number}
                      onChange={e => setFormData({...formData, phone_number: e.target.value})}
                      required
                      placeholder="Contoh: 08123456789"
                      className="rounded-xl h-12 border-slate-200"
                   />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alamat Lengkap</Label>
                   <Input 
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      required
                      placeholder="Jl. Raya Wonojati No. 12"
                      className="rounded-xl h-12 border-slate-200"
                   />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Bio Singkat (Opsional)</Label>
                   <Textarea 
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      placeholder="Siswa kreatif yang antusias belajar..."
                      className="rounded-xl border-slate-200 min-h-[80px]"
                   />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-xl mt-4">
                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Lanjutkan ke Langkah 2"}
                   {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
             </form>
           ) : (
             <div className="space-y-6 text-center">
                <div className="relative border-2 border-dashed border-slate-200 rounded-[24px] p-10 bg-slate-50/50 hover:bg-white transition-all">
                   <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      onChange={handleUploadCV}
                      accept=".pdf,.png,.jpg,.jpeg"
                   />
                   <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center mb-4">
                         {cvFile ? <CheckCircle2 className="w-8 h-8 text-emerald-500" /> : <Upload className="w-8 h-8 text-slate-400" />}
                      </div>
                      <p className="text-sm font-bold text-slate-900">{cvFile ? cvFile.name : "Pilih file CV Anda"}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">PDF atau PNG (Maks 5MB)</p>
                   </div>
                </div>

                <div className="flex gap-3">
                   <Button variant="ghost" onClick={() => setStep(1)} className="h-12 flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest text-slate-400">Kembali</Button>
                   <Button 
                      onClick={handleSubmitCV} 
                      disabled={!cvFile || isUploading} 
                      className="h-12 flex-[2] bg-[#fc703d] hover:bg-[#e55a2b] text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg shadow-[#fc703d]/20"
                   >
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Selesaikan Pendaftaran"}
                   </Button>
                </div>
             </div>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
