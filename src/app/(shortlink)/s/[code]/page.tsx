import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import PreloaderClient from "./PreloaderClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  return {
    title: `Mengarahkan... | BLK Wonojati`,
    robots: {
      index: false,
      follow: false,
    }
  }
}

export default async function ShortlinkPage({ params }: { params: Promise<{ code: string }> }) {
  // Ambil code dari params (harus di-await di Next.js 15/16)
  const { code } = await params;

  // Ambil data shortlink dari Supabase
  const { data: shortlink, error } = await supabaseAdmin
    .from("shortlinks")
    .select("id, target_url, clicks")
    .eq("code", code)
    .single();

  // Jika tidak ditemukan, kembalikan halaman 404 Not Found
  if (error || !shortlink) {
    notFound();
  }

  // Increment click count
  await supabaseAdmin
    .from("shortlinks")
    .update({ clicks: (shortlink.clicks || 0) + 1 })
    .eq("id", shortlink.id);

  // Render Client Component untuk UI Preloader dan Redirect
  return <PreloaderClient targetUrl={shortlink.target_url} />;
}
