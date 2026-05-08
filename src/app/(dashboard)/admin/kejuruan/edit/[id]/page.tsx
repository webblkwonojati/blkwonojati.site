import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import KejuruanForm from "../../KejuruanForm";

export const dynamic = 'force-dynamic';

export default async function EditKejuruanPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: program, error } = await supabaseAdmin
    .from("kejuruan_pelatihan")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !program) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <KejuruanForm initialData={program} />
    </div>
  );
}
