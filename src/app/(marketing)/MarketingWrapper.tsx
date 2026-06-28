"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function MarketingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Force scroll to top on every route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen relative overflow-x-clip bg-white">
      {/* Decorative Background Assets */}
      {!isAuthPage && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] animate-gradient-pulse"
            style={{ background: "radial-gradient(ellipse at center, rgba(92,162,90,0.2) 0%, transparent 60%)" }}
          />
          <div 
            className="absolute top-[40%] left-[-20%] w-[70vw] h-[70vw] opacity-30 animate-gradient-drift"
            style={{ background: "radial-gradient(ellipse at center, rgba(92,162,90,0.15) 0%, transparent 60%)" }}
          />
        </div>
      )}

      {!isAuthPage && <Navbar />}
      
      <PageTransition>
        {children}
      </PageTransition>

      {!isAuthPage && <Footer />}
    </div>
  );
}
