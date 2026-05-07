import LoginForm from "./LoginForm";
import Link from "next/link";
import AuthVisual from "./AuthVisual";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Masuk Akun",
  description: "Masuk ke portal Agrilearn UPT BLK Wonojati untuk mengakses kursus, lowongan kerja, dan profil Anda.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-stretch bg-white font-display">
      {/* Visual Section - Left (Hidden on Mobile) */}
      <AuthVisual 
        title={<>Membangun Masa Depan <br /><span className="text-primary italic">Terampil & Kompeten.</span></>}
        imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Gedung Workshop UPT BLK Wonojati"
      />

      {/* Form Section - Right */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative bg-white">
        {/* Simple Back Link */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-accent uppercase tracking-[0.2em] transition-all"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Beranda
          </Link>
        </div>

        <div className="w-full relative z-10">
          <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <LoginForm />
          </Suspense>
          
          <div className="mt-12 text-center text-sm font-medium text-slate-400">
            Belum punya akun? 
            <Link href="/register" className="text-primary font-black uppercase tracking-widest hover:underline ml-2">Registrasi</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
