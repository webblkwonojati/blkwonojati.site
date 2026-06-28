"use client";

import Link from "next/link";
import { MapPin, Mail as LucideMail } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/Icons";

// Dynamic import for MapLibre (Client-side only)
const MapLibreMap = dynamic(() => import("./marketing/MapLibreMap"), {
  ssr: false,
  loading: () => <div className="w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase text-[10px] tracking-widest" style={{ height: '256px', flexShrink: 0 }}>Loading Map...</div>
});

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
  { icon: <InstagramIcon size={18} />, href: "https://www.instagram.com/blkwonojatimalang/", ariaLabel: "Instagram" },
  { icon: <FacebookIcon size={18} />, href: "https://www.facebook.com/wonojati.malang/", ariaLabel: "Facebook" },
  { icon: <YoutubeIcon size={18} />, href: "https://www.youtube.com/@UPTBLKWonojati", ariaLabel: "YouTube" },
  { icon: <LucideMail size={18} />, href: "mailto:support@blkwonojati.site", ariaLabel: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden group bg-[#1a3a1a] mt-auto">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105 opacity-20">
        <Image
          src="/footer.jpg"
          fill
          sizes="100vw"
          className="object-cover"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#1a3a1a] via-[#1a3a1a]/95 to-[#1a3a1a]" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl pt-16 md:pt-20 pb-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-16">

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
                  aria-label={social.ariaLabel}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:text-primary hover:border-primary hover:bg-white/10 transition-all shadow-xl active:scale-90"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {navigation.map((group) => (
            <div key={group.title} className="lg:col-span-2 text-center lg:text-left pt-2">
              <h3 className="text-white font-bold mb-6 text-[10px] uppercase tracking-[0.2em] opacity-70">
                {group.title}
              </h3>
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
            <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] self-center lg:self-start opacity-70 pt-2">
              Lokasi Strategis
            </h3>
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 bg-slate-800" style={{ height: '256px', flexShrink: 0 }}>
              <MapLibreMap />
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
        <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[9px] font-bold text-slate-400 tracking-[0.2em] text-center md:text-left">
              2026 © All Rights Reserved by UPT BLK Wonojati
            </p>
          </div>
          <div className="flex gap-8 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/bantuan" className="hover:text-white transition-colors">Pusat Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
