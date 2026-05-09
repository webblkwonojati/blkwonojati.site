import BeritaForm from "../../BeritaForm";
import { checkRole } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const role = await checkRole();
  
  if (!role) {
    redirect("/");
  }

  const { id } = await params;

  const { data: item, error } = await supabaseAdmin
    .from("berita")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !item) {
    notFound();
  }

  return <BeritaForm mode="edit" initialData={item} />;
}
