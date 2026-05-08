import { supabaseAdmin } from "@/lib/supabase-admin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BeritaClient from "./BeritaClient";

export const dynamic = 'force-dynamic';

export default async function AdminBeritaPage() {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
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
