"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail as LucideMail } from "lucide-react";
import Image from "next/image";

// Social SVG Icons for better trademark support
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
    title: "Navigasi",
    links: [
      { name: "Beranda", href: "/" },
      { name: "Profil Lembaga", href: "/profil" },
      { name: "Kejuruan Pelatihan", href: "/kejuruan-pelatihan" },
      { name: "Lowongan Kerja", href: "/lowongan-kerja" },
    ]
  },
  {
    title: "Sumber Daya",
    links: [
      { name: "Blog & Berita", href: "/berita" },
      { name: "Panduan Siswa", href: "#" },
      { name: "Portal Alumni", href: "#" },
      { name: "Cek Sertifikat", href: "#" },
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
    <footer className="w-full bg-accent border-t border-white/5 pt-16 md:pt-24 pb-12 px-6 overflow-hidden mt-16 md:mt-20 relative">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-16 md:mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-xl relative">
                <Image 
                  src="/logo-blk.png" 
                  width={36}
                  height={36}
                  className="object-contain" 
                  alt="Logo UPT BLK Wonojati" 
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                  UPT BLK WONOJATI
                </h2>
                <span className="text-[11px] font-bold text-primary tracking-[0.3em] uppercase">Pusat Pelatihan Kerja</span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Memberdayakan generasi berikutnya melalui teknologi pertanian modern, praktik berkelanjutan, dan model bisnis untuk masa depan Indonesia.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5, backgroundColor: "var(--color-primary)", color: "white", borderColor: "var(--color-primary)" }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all shadow-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {navigation.map((group) => (
            <div key={group.title} className="lg:col-span-2 text-center lg:text-left">
              <h4 className="text-white font-bold mb-6 md:mb-10 uppercase tracking-[0.2em] text-[10px] pb-3 border-b border-white/5 inline-block">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-4 md:gap-5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-all text-sm font-medium flex items-center justify-center lg:justify-start gap-2 group/link"
                    >
                      <span className="hidden lg:block h-1 w-0 bg-primary group-hover/link:w-3 transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Map Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-white font-bold mb-2 uppercase tracking-[0.2em] text-[10px] pb-3 border-b border-white/5 inline-block self-start">
              Lokasi Kami
            </h4>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group ring-4 ring-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.900804211328!2d112.65750367591093!3d-7.905431078673711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62a3113550d59%3A0xd11ec6dc2a8d8060!2sKantor%20BLK%20Wonojati!5e0!3m2!1sen!2sid!4v1775580651550!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.4] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.05]"
              ></iframe>
            </div>
            <div className="flex items-start gap-4 mt-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <MapPin size={18} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Jl. Wonojati No.1, Wonojati, Kec. Kalisidi, Kabupaten Malang, Jawa Timur 65161
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[.2em] text-center md:text-left">
            2026 © All Rights Reserved by UPT BLK Wonojati
          </p>
          <div className="flex gap-10 text-[10px] font-bold text-slate-500 uppercase tracking-[.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
