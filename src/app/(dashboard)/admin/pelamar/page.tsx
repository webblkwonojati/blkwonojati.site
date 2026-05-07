import { supabaseAdmin } from "@/lib/supabase-admin";
import PelamarClient from "./PelamarClient";

export const dynamic = 'force-dynamic';

export default async function PelamarPage() {
  // Fetch all registered siswa (students)
  const { data: users, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("role", "siswa")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching registered users:", error);
  }

  return (
    <div className="space-y-6">
      <PelamarClient initialData={users || []} />
    </div>
  );
}
