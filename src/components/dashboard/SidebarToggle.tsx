"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Menu } from "lucide-react";

export default function SidebarToggle() {
  const { toggle } = useSidebar();

  return (
    <button 
      onClick={toggle}
      className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors mr-2 cursor-pointer"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
