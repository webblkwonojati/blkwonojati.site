"use client";

import Link from "next/link";
import { MapPin, Mail as LucideMail } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet (Client-side only)
const LeafletMap = dynamic(() => import("./marketing/LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center text-slate-600 font-bold uppercase text-[10px] tracking-widest">Loading Map...</div>
});

// Social SVG Icons
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

const navigation = [
  {
    title: "Eksplorasi",
    links: [
      { name: "Beranda", href: "/" },
      { name: "Profil Lembaga", href: "/profil" },
      { name: "Kejuruan & Pelatihan", href: "/kejuruan-pelatihan" },
      { name: "Galeri Kegiatan", href: "/galeri" },
    ]
  },
  {
    title: "Layanan & Info",
    links: [
      { name: "Berita Terbaru", href: "/berita" },
      { name: "Lowongan Kerja", href: "/lowongan-kerja" },
      { name: "Pusat Bantuan", href: "/bantuan" },
      { name: "Login Portal", href: "/login" },
    ]
  },
];

const socialLinks = [
  { icon: <InstagramIcon size={18} />, href: "#" },
  { icon: <FacebookIcon size={18} />, href: "#" },
  { icon: <YoutubeIcon size={18} />, href: "#" },
  { icon: <LucideMail size={18} />, href: "mailto:info@blk-wonojati.id" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden mt-20 group">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: "url('/footer.jpg')" }}
      />

      {/* Dark Overlay with Gradient - Changed to Green Theme */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#1a3a1a] via-[#1a3a1a]/95 to-[#1a3a1a]/85" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl pt-20 pb-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 p-1.5 bg-white rounded-lg shadow-lg shadow-black/20">
                <Image
                  src="/logo-blk.png"
                  width={32}
                  height={32}
                  className="object-contain"
                  alt="Logo BLK Wonojati"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-display font-bold tracking-tight text-white leading-none">
                  BLK WONOJATI
                </h2>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-medium">
              Memberdayakan potensi masyarakat melalui pelatihan vokasi modern dan terhubung langsung dengan industri.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:text-primary hover:border-primary hover:bg-white/10 transition-all shadow-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {navigation.map((group) => (
            <div key={group.title} className="lg:col-span-2 text-center lg:text-left pt-2">
              <h4 className="text-white font-bold mb-6 text-[10px] uppercase tracking-[0.2em] opacity-70">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-all text-[13px] font-semibold tracking-tight"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Map Column */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] self-center lg:self-start opacity-70 pt-2">
              Lokasi Strategis
            </h4>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 bg-slate-800">
              <LeafletMap />
            </div>
            <div className="flex align-start gap-4 text-slate-300">
              <MapPin size={16} className="shrink-0 text-primary mt-1" />
              <p className="text-[11px] font-bold leading-relaxed tracking-wide">
                Jalan Raya Mondoroko Nomor 1, Singosari, Malang, Jawa Timur.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[9px] font-bold text-slate-400 tracking-[0.2em] text-center md:text-left">
              2026 © All Rights Reserved by UPT BLK Wonojati
            </p>
          </div>
          <div className="flex gap-8 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
