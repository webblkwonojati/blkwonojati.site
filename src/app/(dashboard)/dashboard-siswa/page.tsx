import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import CVSiswa from "./CVSiswa";
import OnboardingSiswa from "./OnboardingSiswa";
import { AlertCircle } from "lucide-react";

export default async function SiswaDashboard() {
  const session = await auth();
  
  if (session?.user?.role !== "siswa") {
    redirect("/login");
  }

  // Fetch updated profile for CV status and onboarding
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Onboarding Overlay */}
      <OnboardingSiswa profile={profile} userId={session.user.id} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black font-lexend text-slate-900 tracking-tight">Portal Peserta</h1>
          <p className="text-slate-500 mt-2 font-medium">Hai <span className="text-[#fc703d]">{session.user.name}</span>, kembangkan keahlianmu dan temukan karir impian.</p>
        </div>
        {!profile?.cv_url && (
          <div className="flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-pulse">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Wajib Update CV</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CVSiswa initialCV={profile?.cv_url} userId={session.user.id} />
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[32px] relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-2xl font-black">Lengkapi Profil</h2>
              <p className="mt-2 text-slate-300 text-sm">Update data diri tambahan untuk menarik perhatian perusahaan.</p>
              <button className="mt-6 px-6 py-3 bg-[#fc703d] rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">Update Sekarang</button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fc703d]/20 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>
          </div>
          
          <div className="bg-white border p-8 rounded-[31px] flex flex-col justify-center">
             <h3 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-4">Statistik Lamaran</h3>
             <div className="flex gap-10">
                <div>
                  <p className="text-3xl font-black">0</p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">Dikirim</p>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div>
                  <p className="text-3xl font-black text-[#fc703d]">0</p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">Diterima</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
