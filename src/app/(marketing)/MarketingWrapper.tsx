"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
