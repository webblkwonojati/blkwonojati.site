import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // Proteksi: Hanya Admin yang bisa menambah peserta
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nik, full_name, jurusan, tahun_pelatihan } = await req.json();

    if (!nik || !full_name || !jurusan) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // Default ke tahun sekarang jika tidak dikirim
    const year = tahun_pelatihan || new Date().getFullYear().toString();

    const { data, error } = await supabaseAdmin
      .from("master_siswa")
      .insert([{ 
        nik, 
        full_name, 
        jurusan, 
        tahun_pelatihan: year 
      }])
      .select();

    if (error) {
      // Handle unique constraint or other DB errors
      if (error.code === '23505') {
        return NextResponse.json({ error: "NIK ini sudah terdaftar di sistem." }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err: any) {
    console.error("Admin Peserta Error:", err);
    return NextResponse.json({ error: "Gagal menyimpan data ke server" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from("master_siswa")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
