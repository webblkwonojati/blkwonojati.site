import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { nik } = await req.json();

    if (!nik || typeof nik !== 'string' || !/^\d{16}$/.test(nik)) {
      return NextResponse.json({ error: "NIK harus tepat 16 digit angka." }, { status: 400 });
    }

    // Melakukan query ke master_siswa menggunakan Admin Key agar RLS tidak bocor ke klien
    // Hanya select field yang diperlukan untuk meminimalisir ekspos data
    const { data: student, error } = await supabaseAdmin
      .from("master_siswa")
      .select("id, full_name, jurusan")
      .eq("nik", nik)
      .single();

    if (error || !student) {
      return NextResponse.json(
        { error: "NIK tidak ditemukan di database peserta pelatihan UPT BLK Wonojati." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, student });
  } catch (err: any) {
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
