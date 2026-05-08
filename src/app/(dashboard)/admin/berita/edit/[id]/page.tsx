import BeritaForm from "../../BeritaForm";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
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
