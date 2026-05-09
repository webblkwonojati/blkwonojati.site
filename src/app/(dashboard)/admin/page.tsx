import { checkRole } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { 
  Newspaper, 
  Briefcase, 
  Link2, 
  Plus, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileEdit,
  Settings,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { cn } from "@/lib/utils";

async function getStats() {
  const [news, jobs, links, gallery, kejuruan] = await Promise.all([
    supabaseAdmin.from("berita").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("lowongan_kerja").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("links").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("galeri").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("kejuruan_pelatihan").select("id", { count: "exact", head: true }),
  ]);

  return {
    newsCount: news.count || 0,
    jobsCount: jobs.count || 0,
    linksCount: links.count || 0,
    galleryCount: gallery.count || 0,
    kejuruanCount: kejuruan.count || 0,
  };
}

export default async function AdminPage() {
  const [role, user] = await Promise.all([checkRole(), currentUser()]);
  
  if (!role) {
    redirect("/");
  }

  const stats = await getStats();

  const cards = [
    { label: "Berita & Artikel", value: stats.newsCount, icon: Newspaper, color: "text-blue-500", bg: "bg-blue-50", href: "/admin/berita" },
    { label: "Lowongan Kerja", value: stats.jobsCount, icon: Briefcase, color: "text-green-600", bg: "bg-green-50", href: "/admin/lowongan-kerja" },
    { label: "Galeri Dokumentasi", value: stats.galleryCount, icon: ImageIcon, color: "text-emerald-500", bg: "bg-emerald-50", href: "/admin/galeri" },
    { label: "Linktree Manager", value: stats.linksCount, icon: Link2, color: "text-purple-500", bg: "bg-purple-50", href: "/admin/links" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Admin Portal</span>
             <span className="w-1 h-1 rounded-full bg-slate-300" />
             <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
             </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-3">
            Halo, {user?.firstName || "Admin"} 👋
          </h1>
          <p className="text-slate-500 max-w-xl font-medium">
            Selamat datang di pusat kendali konten AgriLearn. Kelola artikel, lowongan, dan tautan eksternal Anda dari sini.
          </p>
        </div>

        <div className="flex gap-3">
           <Link href="/" className="h-12 px-6 rounded-2xl border border-slate-200 bg-white flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
             Lihat Situs
           </Link>
        </div>
      </header>

      {/* ─── Highlights Stats ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group transition-all active:scale-95">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-6 relative overflow-hidden group-hover:border-primary/20 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <card.icon className="w-24 h-24" />
              </div>
              
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", card.bg, card.color)}>
                <card.icon className="w-6 h-6" />
              </div>
              
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
                <div className="flex items-end gap-2">
                   <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{card.value}</h3>
                   <span className="text-slate-300 text-xs font-bold mb-1.5 uppercase tracking-widest font-sans">Entries</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                Manage Details <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── Quick Actions Grid ───────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <h2 className="text-xl font-black text-slate-900 tracking-tight">Quick Actions</h2>
           <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard 
            href="/admin/berita/tulis" 
            title="Tulis Berita" 
            description="Buat artikel atau pengumuman baru." 
            icon={FileEdit}
            color="primary"
          />
          <ActionCard 
            href="/admin/lowongan-kerja" 
            title="Update Loker" 
            description="Tambah atau edit lowongan pekerjaan." 
            icon={Plus}
            color="blue"
          />
          <ActionCard 
            href="/admin/galeri" 
            title="Update Galeri" 
            description="Tambah atau hapus foto dokumentasi." 
            icon={ImageIcon}
            color="emerald"
          />
          <ActionCard 
            href="/admin/links" 
            title="Edit Linktree" 
            description="Kelola tautan cepat di homepage." 
            icon={Link2}
            color="purple"
          />
          <ActionCard 
            href="/admin/settings" 
            title="Settings" 
            description="Konfigurasi portal administrator." 
            icon={Settings}
            color="slate"
          />
        </div>
      </section>

      {/* ─── Status Footer ────────────────────────────────────────────────── */}
      <footer className="pt-12 border-t border-slate-100">
         <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database Connection: Stable</span>
            </div>
            <div className="flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Policy: Active</span>
            </div>
         </div>
      </footer>
    </div>
  );
}

function ActionCard({ href, title, description, icon: Icon, color }: any) {
  const colorMap: any = {
    primary: "hover:border-primary/20 bg-green-50/20",
    blue: "hover:border-blue-200 bg-blue-50/20",
    emerald: "hover:border-emerald-200 bg-emerald-50/20",
    purple: "hover:border-purple-200 bg-purple-50/20",
    slate: "hover:border-slate-300 bg-slate-50/20",
  };

  return (
    <Link href={href} className={cn("block p-6 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/30", colorMap[color])}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <Plus className="w-4 h-4 text-slate-200 group-hover:text-primary transition-colors" />
      </div>
      <h4 className="font-black text-slate-900 uppercase tracking-tighter mb-1 text-sm">{title}</h4>
      <p className="text-xs text-slate-400 font-medium leading-relaxed">{description}</p>
    </Link>
  );
}

