import { getLinks, getProfileById } from "@/app/(dashboard)/admin/links/actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { 
  Globe, 
  Share2,
  Video, 
  Camera,
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  ArrowRight,
  Info
} from "lucide-react";

// The hardcoded global profile ID for the BLK Wonojati Linktree
const PROFILE_ID = "11111111-1111-1111-1111-111111111111";

export const metadata = {
  title: "Linktree | UPT BLK Wonojati",
  description: "Official links and social media for UPT BLK Wonojati.",
};

export default async function LinktreePage() {
  const [profile, links] = await Promise.all([
    getProfileById(PROFILE_ID),
    getLinks(PROFILE_ID)
  ]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Profile Not Found</h1>
          <p className="text-slate-500">The Linktree profile for UPT BLK Wonojati is currently being set up.</p>
        </div>
      </div>
    );
  }

  // Map icons to labels or URL keywords
  const getIcon = (title: string, url: string) => {
    const t = title.toLowerCase();
    const u = url.toLowerCase();
    
    if (t.includes('instagram') || u.includes('instagram.com')) return Camera;
    if (t.includes('youtube') || u.includes('youtube.com')) return Video;
    if (t.includes('facebook') || u.includes('facebook.com')) return Share2;
    if (t.includes('twitter') || t.includes('x') || u.includes('twitter.com') || u.includes('x.com')) return Globe;
    if (t.includes('whatsapp') || u.includes('wa.me') || u.includes('whatsapp.com')) return MessageCircle;
    if (t.includes('email') || u.includes('mailto:')) return Mail;
    if (t.includes('phone') || t.includes('tel') || u.includes('tel:')) return Phone;
    if (t.includes('map') || t.includes('lokasi') || u.includes('maps.google')) return MapPin;
    if (t.includes('website') || t.includes('situs')) return Globe;
    
    return ExternalLink;
  };

  const activeLinks = links.filter((l: any) => l.is_active);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-black selection:text-white">
      {/* Background Decor (Vercel Style) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#0070F3]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="w-full max-w-[580px] relative z-10 flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10 w-full animate-in fade-in zoom-in-95 duration-700">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white ring-1 ring-slate-100 transition-transform hover:scale-105 duration-500">
              <Image 
                src={profile.avatar_url || "/logo-blk.png"} 
                alt={profile.display_name} 
                width={96} 
                height={96} 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-black tracking-tight flex items-center justify-center gap-2">
              {profile.display_name}
              <svg className="w-5 h-5 text-[#0070F3]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </h1>
            <p className="text-slate-500 font-medium text-sm max-w-[400px]">
              {profile.bio || "UPT Balai Latihan Kerja Wonojati Malang"}
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full space-y-3.5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {activeLinks.length > 0 ? (
            activeLinks.map((link: any, index: number) => {
              const Icon = getIcon(link.title, link.url);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-center justify-between p-4 bg-white border border-[#EAEAEA] rounded-xl",
                    "transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#999] hover:-translate-y-0.5"
                  )}
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-slate-900 text-[15px]">{link.title}</span>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                </a>
              );
            })
          ) : (
            <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-2xl">
              <p className="text-slate-400 font-medium text-sm">No public links available yet.</p>
            </div>
          )}
        </div>

        {/* Branding */}
        <footer className="mt-16 text-center space-y-4 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center justify-center gap-6">
            <a href="https://instagram.com/blk_wonojati" className="text-slate-400 hover:text-black transition-colors"><Camera size={20} /></a>
            <a href="https://youtube.com/@blkwonojati" className="text-slate-400 hover:text-black transition-colors"><Video size={20} /></a>
            <a href="mailto:blk_wonojati@yahoo.com" className="text-slate-400 hover:text-black transition-colors"><Mail size={20} /></a>
          </div>
          
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              Official Linktree
            </p>
            <p className="text-[12px] font-semibold text-slate-400">
              © {new Date().getFullYear()} UPT BLK Wonojati
            </p>
          </div>
          
          <div className="pt-4 opacity-30 hover:opacity-100 transition-opacity">
            <Image src="/logo-blk.png" alt="BLK Wonojati" width={32} height={32} className="mx-auto grayscale" />
          </div>
        </footer>
      </main>
    </div>
  );
}
