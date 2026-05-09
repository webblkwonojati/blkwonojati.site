import { currentUser } from "@clerk/nextjs/server";
import SidebarToggle from "./SidebarToggle";
import { UserButton } from "@clerk/nextjs";

export default async function Header() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;
  
  return (
    <header className="h-20 border-b border-primary/10 bg-white/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarToggle />
        <h3 className="font-bold text-slate-800 text-sm md:text-base hidden sm:block">Administrator Portal</h3>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-4 pr-4 border-r border-primary/10">
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">notifications</button>
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer font-bold">search</button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 line-clamp-1 leading-none mb-1">{user?.fullName || user?.username || "Admin"}</p>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">
              {role === 'super_admin' ? 'Super Admin' : 'Administrator'}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-xl shadow-lg shadow-primary/10 border border-primary/20"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
