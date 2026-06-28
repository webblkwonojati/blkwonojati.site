import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export default async function Header() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;
  
  return (
    <header className="h-[60px] border-b border-[#EAEAEA] bg-white px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-[#666] hover:text-black transition-colors h-8 w-8 rounded-md hover:bg-[#FAFAFA]" />
        <div className="h-4 w-[1px] bg-[#EAEAEA] mx-1 hidden sm:block" />
        <div className="hidden sm:flex items-center gap-2 text-[14px]">
          <span className="text-[#666] hover:text-black transition-colors cursor-pointer">Dashboard</span>
          <span className="text-[#EAEAEA]">/</span>
          <span className="text-black font-medium">Overview</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1 mr-2">
          <button className="text-[#666] hover:text-black transition-colors h-8 w-8 flex items-center justify-center rounded-md hover:bg-[#FAFAFA] cursor-pointer relative">
            <Bell className="w-[16px] h-[16px]" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-7 h-7 rounded-full border border-[#EAEAEA]"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
