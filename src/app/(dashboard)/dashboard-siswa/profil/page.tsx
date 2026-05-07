import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ProfileClient from "./ProfileClient";

export default async function StudentProfilePage() {
  const session = await auth();
  
  if (session?.user?.role !== "siswa") {
    redirect("/login");
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profil Saya</h1>
        <p className="text-slate-500 font-medium">Kelola informasi pribadi dan data pendukung karir Anda.</p>
      </div>
      <ProfileClient profile={profile} userId={session.user.id} />
    </div>
  );
}
