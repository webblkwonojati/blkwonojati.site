"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Newspaper, 
  Link2, 
  Briefcase, 
  Settings,
  Globe,
  User as UserIcon,
  Image as ImageIcon,
  Users as UsersIcon,
  Link as LinkIcon
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Newspaper, label: "Berita & Artikel", href: "/admin/berita" },
  { icon: ImageIcon, label: "Galeri Dokumentasi", href: "/admin/galeri" },
  { icon: Link2, label: "Linktree Manager", href: "/admin/links" },
  { icon: LinkIcon, label: "Shortlink Manager", href: "/admin/shortlink" },
  { icon: Briefcase, label: "Lowongan Kerja", href: "/admin/lowongan-kerja" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { isOpen, setIsOpen, toggle } = useSidebar();
  
  const role = user?.publicMetadata?.role as string;

  const navItems = adminNavItems;
  const portalLabel = "Admin Portal";

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
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                )} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Conditional Manage Admins for super_admin */}
          {role === 'super_admin' && (
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                pathname === "/admin/users"
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <UsersIcon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                pathname === "/admin/users" ? "text-white" : "text-slate-400 group-hover:text-slate-900"
              )} />
              <span>Kelola Admin</span>
            </Link>
          )}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 hover:text-primary transition-all group"
            >
              <Globe className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Lihat Website</span>
            </Link>
          </div>
        </nav>

        {/* User Quick Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-3">
             <div className="w-10 h-10 rounded-xl bg-green-50 text-primary flex items-center justify-center shadow-lg shadow-green-500/10 border border-green-100 overflow-hidden shrink-0">
               {user?.imageUrl ? (
                 <img src={user.imageUrl} alt={user.fullName || "User"} className="w-full h-full object-cover" />
               ) : (
                 <UserIcon className="w-5 h-5" />
               )}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold text-slate-900 truncate">{user?.fullName || user?.username || "Admin"}</p>
               <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">
                 {user?.primaryEmailAddress?.emailAddress || "support@blkwonojati.site"}
               </p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
}
