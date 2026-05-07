"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Profil Lembaga", href: "/profil" },
  { name: "Kejuruan Pelatihan", href: "/kejuruan-pelatihan" },
  { name: "Lowongan Kerja", href: "/lowongan-kerja" },
];

const otherLinks = [
  { name: "Galeri Pelatihan", href: "/galeri", icon: "photo_library" },
  { name: "Berita Terbaru", href: "/berita", icon: "news" },
  { name: "Pusat Bantuan", href: "/bantuan", icon: "support_agent" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardHref = () => {
    const role = (session?.user as any)?.role;
    if (role === "admin") return "/admin";
    if (role === "perusahaan") return "/dashboard-perusahaan";
    if (role === "siswa") return "/dashboard-siswa";
    return "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar appearance
  // On home, it's transparent at top. On subpages, it's always solidified for consistency.
  const isSolidNavbar = !isHomePage || isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSolidNavbar
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center relative overflow-hidden">
              <Image
                src="/logo-blk.png"
                fill
                className="p-1.5 object-contain brightness-0 invert"
                alt="Logo"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h2 className={cn(
                "text-base font-black tracking-tight transition-colors",
                isSolidNavbar ? "text-slate-900" : "text-white"
              )}>
                UPT BLK WONOJATI
              </h2>
              <span className="text-[9px] font-bold text-primary tracking-[0.2em] uppercase">Pusat Pelatihan Kerja</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-bold transition-all duration-200 rounded-lg",
                  pathname === link.href
                    ? "text-primary"
                    : isSolidNavbar ? "text-slate-600 hover:text-primary hover:bg-slate-50" : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-bold transition-all duration-200 rounded-lg cursor-pointer outline-none",
                  isSolidNavbar ? "text-slate-600 hover:text-primary hover:bg-slate-50" : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <span>Lainnya</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180">
                  keyboard_arrow_down
                </span>
              </button>

              <div className="absolute top-full right-0 mt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                  {otherLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {status === "authenticated" ? (
              <div className="flex items-center gap-2">
                <Link href={getDashboardHref()}>
                  <Button variant="ghost" className={cn(
                    "rounded-xl px-4 py-2 font-bold",
                    isSolidNavbar ? "text-slate-600 hover:bg-slate-50" : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}>
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className={cn(
                    "rounded-xl px-4 py-2 font-bold border-2",
                    isSolidNavbar
                      ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                      : "border-white/20 text-white hover:bg-white/10"
                  )}
                >
                  Keluar
                </Button>
              </div>
            ) : (
              <Link href="/register">
                <Button className={cn(
                  "rounded-xl px-6 py-2.5 h-auto font-bold transition-all duration-300 active:scale-95 shadow-lg",
                  isSolidNavbar
                    ? "bg-primary text-white hover:bg-primary-dark shadow-primary/20"
                    : "bg-primary text-white hover:bg-primary-dark shadow-primary/10"
                )}>
                  Pendaftaran
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className={cn(
              "lg:hidden w-12 h-12 flex items-center justify-center rounded-xl transition-colors active:scale-90",
              isSolidNavbar ? "bg-primary/10 text-primary" : "bg-white/10 text-white"
            )}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined font-bold text-2xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[998] lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[999] lg:hidden shadow-2xl flex flex-col h-screen overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center relative overflow-hidden shadow-lg shadow-primary/10">
                    <img 
                      src="/logo-blk.png" 
                      className="w-7 h-7 object-contain brightness-0 invert" 
                      alt="Logo" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-sm font-black text-slate-900 leading-tight">BLK WONOJATI</h2>
                    <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Pusat Pelatihan</span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 bg-white custom-scrollbar">
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 px-2">Navigasi Utama</p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300",
                        pathname === link.href
                          ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-1"
                          : "text-slate-600 hover:bg-slate-50 hover:translate-x-1"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 px-2">Layanan Tambahan</p>
                  <div className="grid grid-cols-2 gap-3">
                    {otherLinks.map((link, idx) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-slate-50/80 text-center transition-all hover:bg-primary/5 active:scale-95 group border border-transparent hover:border-primary/10",
                          idx === 2 ? "col-span-2" : "col-span-1"
                        )}
                      >
                        <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all">
                          <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-primary">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-slate-100 bg-white shrink-0 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.05)]">
                {status === "authenticated" ? (
                  <div className="flex flex-col gap-3">
                    <Link href={getDashboardHref()} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full rounded-xl py-6 h-auto bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/10 active:scale-95 transition-all">
                        Ke Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={() => signOut()}
                      variant="ghost"
                      className="w-full rounded-xl py-4 h-auto text-red-500 font-bold hover:bg-red-50 active:scale-95 transition-all"
                    >
                      Keluar
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full rounded-xl py-6 h-auto bg-primary hover:bg-primary-dark text-white font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all">
                        Daftar Sekarang
                      </Button>
                    </Link>
                    <p className="text-[10px] text-center text-slate-400 font-medium italic">Gabung bersama 5000+ alumni lainnya</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
