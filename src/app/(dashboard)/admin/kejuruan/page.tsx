import { supabaseAdmin } from "@/lib/supabase-admin";
import KejuruanClient from "./KejuruanClient";

export const dynamic = 'force-dynamic';

export default async function AdminKejuruanPage() {
  const { data: kejuruan, error } = await supabaseAdmin
    .from('kejuruan_pelatihan')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching kejuruan:", error);
  }

  return <KejuruanClient initialData={kejuruan || []} />;
}
