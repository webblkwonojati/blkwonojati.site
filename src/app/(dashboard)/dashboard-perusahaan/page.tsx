import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PerusahaanDashboard() {
  const session = await auth();
  
  // Extra security check beyond middleware
  if (session?.user?.role !== "perusahaan") {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black font-lexend">Dashboard Mitra Perusahaan</h1>
      <p className="text-slate-500 mt-2">Selamat datang, {session.user.name}. Di sini Anda dapat mengelola lowongan kerja.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
         <div className="p-6 bg-white border rounded-3xl shadow-sm">
            <h3 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Lowongan Aktif</h3>
            <p className="text-4xl font-black mt-2">0</p>
         </div>
         <div className="p-6 bg-white border rounded-3xl shadow-sm">
            <h3 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Pelamar Baru</h3>
            <p className="text-4xl font-black mt-2">0</p>
         </div>
         <div className="p-6 bg-[#fc703d]/10 border border-[#fc703d]/20 rounded-3xl shadow-sm">
            <h3 className="font-bold text-[#fc703d] uppercase text-[10px] tracking-widest">Status Akun</h3>
            <p className="text-xl font-black mt-2">{(session.user as any).is_verified ? "⚡ Terverifikasi" : "⏳ Menunggu Verifikasi"}</p>
         </div>
      </div>
    </div>
  );
}
