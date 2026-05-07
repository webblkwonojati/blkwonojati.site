import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function StudentLamaranPage() {
  const session = await auth();
  
  if (session?.user?.role !== "siswa") {
    redirect("/login");
  }

  // Fetch student profile first to get NIK if available (or use email)
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("full_name")
    .eq("id", session.user.id)
    .single();

  // Fetch applications for this student
  // We match by name for now as per the recordLowonganApply logic
  const { data: lamaran, error } = await supabaseAdmin
    .from("pelamar_lowongan")
    .select(`
      *,
      lowongan_kerja (
        id,
        posisi,
        instansi_perusahaan,
        lokasi,
        tipe_pekerjaan
      )
    `)
    .eq("nama", profile?.full_name)
    .order("created_at", { ascending: false });

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lamaran Saya</h1>
        <p className="text-slate-500 font-medium">Pantau status lamaran kerja yang telah Anda kirimkan.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {lamaran && lamaran.length > 0 ? (
          lamaran.map((item: any) => (
            <Card key={item.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[28px] overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all">
              <CardContent className="p-0 flex flex-col md:flex-row">
                 <div className="p-8 flex-1">
                    <div className="flex items-start justify-between mb-4">
                       <div className="space-y-1">
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{item.lowongan_kerja?.posisi}</h3>
                          <p className="font-bold text-slate-500 flex items-center gap-2">
                             <Building2 className="w-4 h-4" />
                             {item.lowongan_kerja?.instansi_perusahaan}
                          </p>
                       </div>
                       <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-[11px] font-black uppercase tracking-widest">Terkirim</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lokasi</p>
                          <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                             <MapPin className="w-3 h-3" />
                             {item.lowongan_kerja?.lokasi}
                          </p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Kontrak</p>
                          <p className="text-xs font-bold text-slate-700">{item.lowongan_kerja?.tipe_pekerjaan}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Melamar</p>
                          <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                             <Calendar className="w-3 h-3" />
                             {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Waktu</p>
                          <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                             <Clock className="w-3 h-3" />
                             {new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                       </div>
                    </div>
                 </div>

                 <Link 
                    href={`/lowongan-kerja/${item.lowongan_kerja?.id}`}
                    className="bg-slate-50 md:w-48 flex items-center justify-center p-6 hover:bg-primary transition-all group/btn"
                 >
                    <div className="flex flex-col items-center text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-white/70 mb-2">Lihat Detail</p>
                       <div className="size-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg group-hover/btn:bg-white/20 group-hover/btn:text-white group-hover/btn:scale-110 transition-all">
                          <ArrowRight className="w-5 h-5" />
                       </div>
                    </div>
                 </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="h-[400px] border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
             <div className="size-20 rounded-[28px] bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Belum Ada Lamaran</h3>
             <p className="mt-2 text-slate-400 font-medium max-w-sm">Anda belum mengirimkan lamaran kerja. Temukan peluang karir yang sesuai dengan keahlian Anda sekarang.</p>
             <Link href="/lowongan-kerja">
                <Button className="mt-8 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest px-8 h-12 rounded-xl shadow-lg shadow-primary/20">
                   Eksplor Lowongan
                </Button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
