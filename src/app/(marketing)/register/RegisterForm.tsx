"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, Lock, User, Building2, CheckCircle2, AlertCircle } from "lucide-react"

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onRegisterSiswa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // Validasi dasar
    if (!fullName || !email || !password) {
      setError("Semua field harus diisi.")
      return
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/register-siswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, password })
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.error || "Gagal mendaftar.")
      setSuccess(resData.message || "Pendaftaran sukses! Silakan login.")
      setTimeout(() => router.push("/login"), 3000)
    } catch (e: any) {
      setError(e.message || "Gagal mendaftar.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto font-display">
      {!success && (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-accent tracking-tight mb-2">Registrasi Baru</h2>
          <p className="text-slate-500 text-sm font-medium">Buat akun untuk memulai di BLK Wonojati</p>
        </div>
      )}

      <Tabs defaultValue="siswa" className="w-full">
        {!success && (
          <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-slate-100 rounded-xl">
            <TabsTrigger value="siswa" className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-accent font-bold text-xs uppercase tracking-wider">Siswa</TabsTrigger>
            <TabsTrigger value="perusahaan" className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-accent font-bold text-xs uppercase tracking-wider">Mitra</TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="siswa" className="mt-0">
          <form onSubmit={onRegisterSiswa} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="full_name" 
                    placeholder="Nama sesuai KTP" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                    className="h-12 bg-white border-slate-200 rounded-xl pl-11 focus:border-accent focus:ring-1 focus:ring-accent" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Aktif</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="h-12 bg-white border-slate-200 rounded-xl pl-11 focus:border-accent focus:ring-1 focus:ring-accent" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password Baru (Min. 8 Karakter)</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="h-12 bg-white border-slate-200 rounded-xl pl-11 focus:border-accent focus:ring-1 focus:ring-accent" 
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#fc703d] hover:bg-[#e55a2b] text-white font-black uppercase tracking-widest rounded-xl shadow-md shadow-[#fc703d]/20 active:scale-[0.98]">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Daftar Sekarang"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="perusahaan" className="mt-0">
          <div className="p-8 rounded-[2rem] bg-accent text-white text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-black mb-2 tracking-tight">Mitra Perusahaan</h3>
            <p className="text-xs font-medium text-white/70 leading-relaxed mb-6">Pendaftaran perusahaan saat ini melalui admin BLK. Silakan hubungi kami untuk kerja sama penempatan kerja.</p>
            <Button className="w-full bg-white text-accent hover:bg-slate-100 h-11 rounded-xl font-bold uppercase tracking-widest text-xs font-display">Hubungi Admin</Button>
          </div>
        </TabsContent>
      </Tabs>

      {success && (
        <div className="mt-8 p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center shadow-xl shadow-slate-200/50 animate-in zoom-in-95 font-display">
          <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-xl font-black text-accent mb-2">Pendaftaran Sukses</h4>
          <p className="text-sm font-bold text-slate-500 leading-relaxed">{success}</p>
        </div>
      )}
    </div>
  )
}
