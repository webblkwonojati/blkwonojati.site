"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, Lock, Building2, User } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email atau password salah. Silakan coba lagi.")
      } else {
        const sessionRes = await fetch("/api/auth/session")
        const session = await sessionRes.json()
        const role = session?.user?.role

        if (role === "admin") router.push("/admin")
        else if (role === "perusahaan") router.push("/dashboard-perusahaan")
        else if (role === "siswa") router.push("/dashboard-siswa")
        else router.push(callbackUrl)
        
        router.refresh()
      }
    } catch (e) {
      setError("Terjadi kesalahan sistem. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto font-display">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-accent tracking-tight mb-2">Selamat Datang</h2>
        <p className="text-slate-500 text-sm font-medium">Masuk ke portal BLK Wonojati Anda</p>
      </div>

      <Tabs defaultValue="siswa" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-slate-100 rounded-xl">
          <TabsTrigger value="siswa" className="flex items-center gap-2 rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-sm text-slate-500 font-bold text-xs uppercase tracking-wider">
            <User className="w-3 h-3" /> Siswa
          </TabsTrigger>
          <TabsTrigger value="perusahaan" className="flex items-center gap-2 rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-sm text-slate-500 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-3 h-3" /> Mitra
          </TabsTrigger>
        </TabsList>

        <form onSubmit={onSubmit} className="space-y-6">
          <TabsContent value="siswa" className="mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-siswa" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input id="email-siswa" name="email" type="email" placeholder="email@siswa.com" required className="pl-11 h-12 bg-white border-slate-200 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password-siswa" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</Label>
                  <button type="button" className="text-[10px] font-bold text-[#fc703d] hover:underline">Lupa?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input id="password-siswa" name="password" type="password" placeholder="••••••••" required className="pl-11 h-12 bg-white border-slate-200 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="perusahaan" className="mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-mitra" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Perusahaan</Label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input id="email-mitra" name="email" type="email" placeholder="hrd@mitra.com" required className="pl-11 h-12 bg-white border-slate-200 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-mitra" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input id="password-mitra" name="password" type="password" placeholder="••••••••" required className="pl-11 h-12 bg-white border-slate-200 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
              </div>
            </div>
          </TabsContent>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-[#fc703d] hover:bg-[#e55a2b] text-white font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#fc703d]/20 mt-4"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Masuk ke Akun"}
          </Button>
        </form>
      </Tabs>
    </div>
  )
}
