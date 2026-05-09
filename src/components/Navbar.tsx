"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import ButtonPremium from "@/components/ui/ButtonPremium";

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 7.5z" /></svg>
);

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
  const { user, isLoaded } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardHref = () => {
    const role = user?.publicMetadata?.role as string;
    if (role === "admin" || role === "super_admin") return "/admin";
    return "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Determine navbar appearance
  // On home or pages with dark heroes, it's transparent at top.
  const darkHeroPaths = ["/"];
  const hasDarkHero = darkHeroPaths.includes(pathname);
  const isTransparent = hasDarkHero && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[1001] transition-all duration-300 border-b",
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
                  "text-xs font-bold uppercase tracking-widest transition-all duration-300",
                  isTransparent && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                  isActive
                    ? isTransparent
                      ? "!text-white border-b-2 border-white pb-1"
                      : "text-primary"
                    : isTransparent
                      ? "!text-white/90 hover:!text-white"
                      : "text-slate-600 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          {isLoaded && user && (
            <>
              <Link
                href={getDashboardHref()}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all",
                  isTransparent ? "text-white" : "text-slate-900"
                )}
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-xl"
                  }
                }}
              />
            </>
          )}
          {isLoaded && !user && (
            <ButtonPremium
              href="/login"
              size="sm"
              icon="east"
              variant={isTransparent ? "outline" : "primary"}
              className={cn(isTransparent && "border-white/20 text-white hover:bg-white hover:text-slate-900")}
            >
              Masuk
            </ButtonPremium>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMobileMenuOpen}
          className={cn("lg:hidden transition-colors", isTransparent && !isMobileMenuOpen ? "text-white" : "text-slate-900")}
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div >

      {/* Premium Side Drawer Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Glassmorphism Backdrop - Darkened for absolute separation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl lg:hidden"
            />

            {/* Side Drawer - Opaque White */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm !bg-white bg-opacity-100 z-[110] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex flex-col h-full bg-white relative">
                {/* Drawer Header */}
                <div className="h-20 px-8 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 relative">
                      <Image src="/logo-blk.png" fill sizes="32px" className="object-contain" alt="Logo" />
                    </div>
                    <span className="text-sm font-black tracking-tighter text-slate-900">WONOJATI</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Tutup menu navigasi"
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 active:scale-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>

                {/* Navigation Links - Staggered */}
                <nav className="flex-1 overflow-y-auto py-8 px-8">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link, i) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center justify-between py-4 group transition-all",
                              isActive ? "text-primary border-b border-primary/20" : "text-slate-600 border-b border-transparent"
                            )}
                          >
                            <span className={cn(
                              "text-base tracking-tight font-bold",
                              isActive ? "text-primary" : "text-slate-600"
                            )}>
                              {link.name}
                            </span>
                            <span className={cn(
                              "material-symbols-outlined text-lg opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0",
                              isActive && "opacity-100 translate-x-0"
                            )}>
                              east
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12"
                  >
                    {isLoaded && user ? (
                      <Link href={getDashboardHref()} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/10 active:scale-95 transition-all">
                          Masuk Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/10 active:scale-95 transition-all">
                          Masuk
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </nav>

                {/* Drawer Footer */}
                <div className="p-8 bg-slate-50/50 border-t border-slate-100 mt-auto">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-mono">Social Media</p>
                  <div className="flex items-center gap-3">
                    <a href="https://www.instagram.com/blkwonojatimalang/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm active:scale-90 transition-all hover:text-primary">
                      <InstagramIcon size={18} />
                    </a>
                    <a href="https://www.facebook.com/wonojati.malang/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm active:scale-90 transition-all hover:text-primary">
                      <FacebookIcon size={18} />
                    </a>
                    <a href="https://www.youtube.com/@UPTBLKWonojati" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm active:scale-90 transition-all hover:text-primary">
                      <YoutubeIcon size={18} />
                    </a>
                    <a href="mailto:support@blkwonojati.site" aria-label="Email Kami" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm active:scale-90 transition-all hover:text-primary">
                      <span className="material-symbols-outlined text-lg" aria-hidden="true">mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header >
  );
}
