import { checkRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";
import BeritaClient from "./BeritaClient";

export const dynamic = 'force-dynamic';

export default async function AdminBeritaPage() {
  const role = await checkRole();
  
  if (!role) {
    redirect("/");
  }

  const { data: news, error } = await supabaseAdmin
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="space-y-6">
      <BeritaClient initialData={news || []} />
    </div>
  );
}
