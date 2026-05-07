import { supabaseAdmin } from "@/lib/supabase-admin";
import PesertaClient from "./PesertaClient";

export const dynamic = 'force-dynamic';

export default async function PesertaPage() {
  // Fetch master_siswa data server-side
  const { data: peserta, error } = await supabaseAdmin
    .from("master_siswa")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching master_siswa:", error);
  }

  return (
    <PesertaClient initialData={peserta || []} />
  );
}
