import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bookmark, 
  Building2, 
  MapPin, 
  Calendar,
  ArrowRight,
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default async function StudentBookmarksPage() {
  const session = await auth();
  
  if (session?.user?.role !== "siswa") {
    redirect("/login");
  }

  // Fetch bookmarked jobs for this student
  const { data: bookmarks, error } = await supabaseAdmin
    .from("bookmarks")
    .select(`
      *,
      lowongan_kerja (
        id,
        posisi,
        instansi_perusahaan,
        lokasi,
        tipe_pekerjaan,
        batas_lamaran,
        jurusan
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookmarks:", error);
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lowongan Disimpan</h1>
        <p className="text-slate-500 font-medium">Temukan kembali lowongan yang menurut Anda menarik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((b: any) => (
            <Card key={b.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                     <div className="p-2 rounded-xl bg-primary/5 text-primary">
                        <Briefcase className="w-6 h-6" />
                     </div>
                     <div className="bg-slate-900 text-white p-2 rounded-xl">
                        <Bookmark className="w-4 h-4 fill-white" />
                     </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{b.lowongan_kerja?.posisi}</h3>
                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5 leading-none">
                       <Building2 className="w-3.5 h-3.5" />
                       {b.lowongan_kerja?.instansi_perusahaan}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                     <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-1 rounded-md">
                        {b.lowongan_kerja?.jurusan}
                     </span>
                     <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-2 py-1 rounded-md">
                        {b.lowongan_kerja?.tipe_pekerjaan}
                     </span>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400">
                     <div className="flex items-center gap-1.5 text-xs font-bold transition-colors">
                        <MapPin className="w-4 h-4" />
                        {b.lowongan_kerja?.lokasi}
                     </div>
                     {b.lowongan_kerja?.batas_lamaran && (
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter">
                           <Calendar className="w-3.5 h-3.5" />
                           {new Date(b.lowongan_kerja?.batas_lamaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </div>
                     )}
                  </div>
                </div>

                <Link 
                  href={`/lowongan-kerja/${b.lowongan_kerja?.id}`}
                  className="block w-full py-4 text-center bg-slate-50 group-hover:bg-primary transition-all"
                >
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white flex items-center justify-center gap-2">
                       Lihat Detail 
                       <ArrowRight className="w-3.5 h-3.5" />
                   </span>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="lg:col-span-3 h-[400px] border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
             <div className="size-20 rounded-[28px] bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6">
                <Bookmark className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Belum Ada Simpanan</h3>
             <p className="mt-2 text-slate-400 font-medium max-w-sm">Anda belum menyimpan lowongan kerja manapun.</p>
             <Link href="/lowongan-kerja">
                <Button className="mt-8 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest px-8 h-12 rounded-xl shadow-lg shadow-slate-200">
                   Cari Lowongan
                </Button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
