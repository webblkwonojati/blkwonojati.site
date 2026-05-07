import RegisterForm from "./RegisterForm";
import Link from "next/link";
import AuthVisual from "../login/AuthVisual";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Siswa",
  description: "Daftar sebagai peserta pelatihan di UPT BLK Wonojati untuk meningkatkan kompetensi dan daya saing Anda di dunia kerja.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-stretch bg-white font-display">
      {/* Form Section - Left (Main on Mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 py-12 md:p-8 relative bg-white order-2 lg:order-1">
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
          <RegisterForm />
          
          <div className="mt-12 text-center text-sm font-medium text-slate-400">
            Sudah punya akun? 
            <Link href="/login" className="text-primary font-black uppercase tracking-widest hover:underline ml-2">Masuk</Link>
          </div>
        </div>
      </div>

      {/* Visual Section - Right (Hidden on Mobile) */}
      <AuthVisual 
        title={<>Raih Sertifikasi <br /><span className="text-primary italic">Karir Impian.</span></>}
        imageSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Siswa Pelatihan UPT BLK Wonojati"
        isReverse={true}
      />
    </div>
  )
}
