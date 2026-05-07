"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Loader2, 
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfileClient({ profile, userId }: { profile: any, userId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    display_name: profile?.display_name || "",
    phone_number: profile?.phone_number || "",
    address: profile?.address || "",
    bio: profile?.bio || ""
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          display_name: formData.display_name,
          phone_number: formData.phone_number,
          address: formData.address,
          bio: formData.bio
        })
        .eq("id", userId);

      if (error) throw error;
      toast.success("Profil berhasil diperbarui!");
    } catch (err: any) {
      toast.error("Gagal memperbarui profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <form onSubmit={handleUpdateProfile}>
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b p-8">
               <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black">Informasi Dasar</CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest mt-1">Data Utama Identitas Anda</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap</Label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input 
                          value={formData.full_name}
                          onChange={e => setFormData({...formData, full_name: e.target.value})}
                          className="pl-11 h-12 rounded-xl border-slate-200 focus:ring-primary"
                          required
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Panggilan</Label>
                    <Input 
                       value={formData.display_name}
                       onChange={e => setFormData({...formData, display_name: e.target.value})}
                       className="h-12 rounded-xl border-slate-200"
                    />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nomor WhatsApp</Label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input 
                          value={formData.phone_number}
                          onChange={e => setFormData({...formData, phone_number: e.target.value})}
                          className="pl-11 h-12 rounded-xl border-slate-200"
                          placeholder="08xxxxxxxx"
                          required
                       />
                    </div>
                 </div>
                 <div className="space-y-2 opacity-50">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Username (ID)</Label>
                    <Input value={profile?.username} disabled className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                 </div>
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alamat Domisili</Label>
                 <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                    <Textarea 
                       value={formData.address}
                       onChange={e => setFormData({...formData, address: e.target.value})}
                       className="pl-11 min-h-[100px] rounded-xl border-slate-200"
                       required
                       placeholder="Jl. Raya Nomor 123..."
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Bio Singkat</Label>
                 <Textarea 
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    className="min-h-[120px] rounded-xl border-slate-200"
                    placeholder="Ceritakan tentang keahlian atau minat karir Anda..."
                 />
              </div>

              <div className="pt-4">
                 <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-10 h-12 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all active:scale-95">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Perubahan Profil"}
                 </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="space-y-8">
         <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-slate-900 text-white">
            <CardHeader>
               <div className="size-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-2">
                 <Mail className="w-6 h-6" />
               </div>
               <CardTitle className="text-xl font-black">Informasi Akun</CardTitle>
               <CardDescription className="text-slate-400 text-xs font-bold uppercase tracking-widest">Digunakan untuk login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Email Aktif</p>
                  <p className="font-bold text-slate-200">{profile?.email || 'Tidak tersedia'}</p>
               </div>
               <div className="pt-2">
                  <Badge className="bg-[#fc703d] text-white font-black uppercase text-[10px] tracking-widest px-3 py-1">Personal Account</Badge>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
            <CardHeader>
               <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                 <Briefcase className="w-6 h-6" />
               </div>
               <CardTitle className="text-xl font-black">Status Keahlian</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm font-medium">
                  Informasi keahlian akan muncul setelah Admin memverifikasi sertifikat pelatihan Anda.
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ${className}`}>
      {children}
    </span>
  );
}
