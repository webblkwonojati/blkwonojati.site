"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { icon: "dashboard", label: "Dashboard", href: "/admin" },
  { icon: "person_add", label: "Peserta Pelatihan", href: "/admin/peserta" },
  { icon: "group", label: "Pelamar Lowongan", href: "/admin/pelamar" },
  { icon: "link", label: "Linktree Manager", href: "/admin/links" },
  { icon: "work", label: "Lowongan Kerja", href: "/admin/lowongan-kerja" },
  { icon: "settings", label: "Settings", href: "/admin/settings" },
];

const perusahaanNavItems = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard-perusahaan" },
  { icon: "work", label: "Kelola Loker", href: "/dashboard-perusahaan/loker" },
  { icon: "group", label: "Pelamar", href: "/dashboard-perusahaan/pelamar" },
];

const siswaNavItems = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard-siswa" },
  { icon: "person", label: "Profil Saya", href: "/dashboard-siswa/profil" },
  { icon: "bookmark", label: "Lowongan Simpan", href: "/dashboard-siswa/simpan" },
  { icon: "work_history", label: "Lamaran Saya", href: "/dashboard-siswa/lamaran" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isOpen, setIsOpen, toggle } = useSidebar();
  const role = (session?.user as any)?.role;

  const getNavItems = () => {
    if (role === "admin") return adminNavItems;
    if (role === "perusahaan") return perusahaanNavItems;
    if (role === "siswa") return siswaNavItems;
    return [];
  };

  const navItems = getNavItems();
  const portalLabel = role === "admin" ? "Admin Portal" : role === "perusahaan" ? "Partner Portal" : "Student Portal";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "w-64 min-h-screen border-r border-primary/10 bg-white flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 p-1 border border-primary/10 shrink-0">
              <img src="/logo-blk.png" alt="UPT BLK Wonojati Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-slate-900">Wonojati</h1>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">{portalLabel}</p>
            </div>
          </div>
          <button 
            onClick={toggle}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-accent"
                )}
              >
                <span className={cn(
                  "material-symbols-outlined text-xl transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                )}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 hover:text-primary transition-all group"
            >
              <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">
                public
              </span>
              <span>Lihat Website</span>
            </Link>
          </div>
        </nav>

        {/* User Quick Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-3">
             <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
               <span className="material-symbols-outlined uppercase">{role?.[0] || 'A'}</span>
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold text-slate-900 truncate">{session?.user?.name}</p>
               <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">{session?.user?.email}</p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
}
