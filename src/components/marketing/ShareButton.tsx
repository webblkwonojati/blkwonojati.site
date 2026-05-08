"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton() {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Tautan berhasil disalin!");
  };

  return (
    <button 
      onClick={handleCopy}
      className="h-10 px-6 rounded-xl border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
    >
      <Share2 className="w-4 h-4" /> Salin Tautan
    </button>
  );
}
