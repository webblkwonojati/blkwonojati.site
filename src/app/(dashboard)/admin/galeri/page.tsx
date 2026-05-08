import { supabaseAdmin } from "@/lib/supabase-admin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GaleriClient from "./GaleriClient";

export const dynamic = 'force-dynamic';

export default async function AdminGaleriPage() {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  const { data: gallery, error } = await supabaseAdmin
    .from("galeri")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery:", error);
  }

  return (
    <div className="space-y-6">
      <GaleriClient initialData={gallery || []} />
    </div>
  );
}
