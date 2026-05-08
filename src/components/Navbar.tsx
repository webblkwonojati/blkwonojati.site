"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ButtonPremium from "@/components/ui/ButtonPremium";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Profil", href: "/profil" },
  { name: "Kejuruan", href: "/kejuruan-pelatihan" },
  { name: "Lowongan", href: "/lowongan-kerja" },
  { name: "Galeri", href: "/galeri" },
  { name: "Berita", href: "/berita" },
  { name: "Bantuan", href: "/bantuan" },
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
  const isTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm" : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/logo-blk.png"
              fill
              sizes="32px"
              className={cn("object-contain transition-all duration-300", isTransparent && "brightness-0 invert")}
              alt="Logo"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h2 className={cn(
              "text-base md:text-2xl font-display font-bold tracking-tighter leading-none transition-colors",
              isTransparent ? "text-white" : "text-slate-900"
            )}>
              BLK WONOJATI
            </h2>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest transition-colors",
                  isActive
                    ? isTransparent
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-primary"
                    : isTransparent
                      ? "text-white/70 hover:text-white"
                      : "text-slate-600 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <ButtonPremium
            href="/login"
            size="sm"
            icon="east"
            variant={isTransparent ? "outline" : "primary"}
            className={cn(isTransparent && "border-white/20 text-white hover:bg-white hover:text-slate-900")}
          >
            Masuk Portal
          </ButtonPremium>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className={cn("lg:hidden transition-colors", isTransparent && !isMobileMenuOpen ? "text-white" : "text-slate-900")}
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div >

      {/* Simplified Mobile Menu */}
      <AnimatePresence>
        {
          isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl lg:hidden overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-bold text-slate-600 uppercase tracking-widest py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full mt-4 bg-primary text-white">Masuk Portal</Button>
                </Link>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </header >
  );
}
