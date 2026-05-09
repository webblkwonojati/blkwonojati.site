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
  Image as ImageIcon,
  Zap
} from "lucide-react";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    { label: "Berita & Artikel", value: stats.newsCount, href: "/admin/berita" },
    { label: "Lowongan Kerja", value: stats.jobsCount, href: "/admin/lowongan-kerja" },
    { label: "Galeri Dokumentasi", value: stats.galleryCount, href: "/admin/galeri" },
    { label: "Linktree Manager", value: stats.linksCount, href: "/admin/links" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-black tracking-tight">
            Overview
          </h1>
          <p className="text-[#666] text-sm">
            Welcome back, {user?.firstName || "Admin"}. Here's what's happening today.
          </p>
        </div>

        <div className="flex gap-3">
           <Link href="/" target="_blank" className="h-9 px-4 rounded-md border border-[#EAEAEA] bg-white flex items-center gap-2 text-[14px] font-medium text-black hover:bg-[#FAFAFA] transition-colors">
             View Live Site
           </Link>
           <Link href="/admin/berita/tulis" className="h-9 px-4 rounded-md bg-black text-white flex items-center gap-2 text-[14px] font-medium hover:bg-black/90 transition-colors">
             Create Post
           </Link>
        </div>
      </header>

      {/* ─── Highlights Stats ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-black tracking-tight mb-4">Content Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Link key={card.label} href={card.href} className="group transition-all">
              <Card className="h-full border-[#EAEAEA] shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden bg-white">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-[13px] font-medium text-[#666]">{card.label}</p>
                    <div className="flex items-center justify-between">
                       <h3 className="text-3xl font-semibold text-black tracking-tight">{card.value}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Quick Actions Grid ───────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-semibold text-black tracking-tight mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard 
            href="/admin/berita/tulis" 
            title="Write Article" 
            description="Publish news or announcements." 
            icon={FileEdit}
          />
          <ActionCard 
            href="/admin/lowongan-kerja" 
            title="Manage Jobs" 
            description="Add or edit job postings." 
            icon={Briefcase}
          />
          <ActionCard 
            href="/admin/galeri" 
            title="Update Gallery" 
            description="Upload new event photos." 
            icon={ImageIcon}
          />
          <ActionCard 
            href="/admin/shortlink" 
            title="URL Shortener" 
            description="Manage bit.blkwonojati.site links." 
            icon={Link2}
          />
        </div>
      </section>

      {/* ─── Status Footer ────────────────────────────────────────────────── */}
      <footer className="pt-8 flex items-center gap-6">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[#0070F3]" />
           <span className="text-[13px] font-medium text-[#666]">All systems operational</span>
        </div>
      </footer>
    </div>
  );
}

function ActionCard({ href, title, description, icon: Icon }: any) {
  return (
    <Link href={href} className="block p-5 rounded-lg border border-[#EAEAEA] bg-white group transition-all hover:border-[#999] hover:shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 text-black" />
        <ArrowUpRight className="w-4 h-4 text-[#999] group-hover:text-black transition-colors" />
      </div>
      <h4 className="font-medium text-black text-[14px] mb-1">{title}</h4>
      <p className="text-[13px] text-[#666] leading-relaxed">{description}</p>
    </Link>
  );
}


