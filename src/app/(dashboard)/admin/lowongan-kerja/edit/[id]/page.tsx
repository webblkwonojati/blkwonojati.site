import { supabaseAdmin } from "@/lib/supabase-admin";
import LowonganForm from "../../LowonganForm";
import { notFound } from "next/navigation";

export default async function EditLowonganPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: job, error } = await supabaseAdmin
    .from('lowongan_kerja')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    return notFound();
  }

  return (
    <div className="py-6">
      <LowonganForm jobData={job} />
    </div>
  );
}
