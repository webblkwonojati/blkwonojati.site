import { auth } from "@/auth";
import SidebarToggle from "./SidebarToggle";

export default async function Header() {
  const session = await auth();
  
  return (
    <header className="h-20 border-b border-primary/10 bg-white/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarToggle />
        <h3 className="font-bold text-slate-800 text-sm md:text-base">Administrator Portal</h3>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-4 pr-4 border-r border-primary/10">
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">notifications</button>
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">search</button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 line-clamp-1">{session?.user?.name || "Admin"}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">{session?.user?.role || "Admin"}</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-xl">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
