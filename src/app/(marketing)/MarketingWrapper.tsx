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
    <div className="flex flex-col min-h-screen relative overflow-x-clip">
      {/* Decorative Background Assets */}
      {!isAuthPage && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] opacity-40 pointer-events-none z-0">
            <img src="/gradien-1.png" alt="" className="w-full h-full object-contain animate-pulse duration-[10s]" />
          </div>
          <div className="absolute top-[40%] left-[-20%] w-[70vw] h-[70vw] opacity-30 pointer-events-none z-0">
            <img src="/gradien-1.png" alt="" className="w-full h-full object-contain rotate-180" />
          </div>
        </>
      )}

      <PageTransition>
        {!isAuthPage && <Navbar />}
        <main className="flex-1 relative z-10 font-sans">
          {children}
        </main>
        {!isAuthPage && <Footer />}
      </PageTransition>
    </div>
  );
}
