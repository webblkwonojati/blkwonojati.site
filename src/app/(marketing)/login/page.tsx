import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import AuthVisual from "./AuthVisual";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

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
        imageSrc="/BLK-wonojati.webp"
        imageAlt="Gedung Workshop UPT BLK Wonojati"
      />

      {/* Form Section - Right */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 md:p-8 relative bg-white">
        {/* Simple Back Link */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-accent uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Beranda
          </Link>
        </div>

        <div className="w-full flex justify-center scale-90 sm:scale-100">
          <SignIn 
            routing="hash"
            signUpUrl="/register"
            appearance={{
              elements: {
                formButtonPrimary: "bg-[#5ca25a] hover:bg-[#4a8a48] text-sm font-black uppercase tracking-widest rounded-xl",
                card: "shadow-none border-none",
                headerTitle: "text-2xl font-black text-slate-900 tracking-tight",
                headerSubtitle: "text-slate-500 text-sm font-medium",
                socialButtonsBlockButton: "rounded-xl border-slate-200",
                formFieldInput: "rounded-xl border-slate-200 h-11",
                footerActionLink: "text-primary hover:text-green-700 font-bold"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
