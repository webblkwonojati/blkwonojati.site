import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { full_name, email, password } = await req.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: "Semua field harus diisi." }, { status: 400 });
    }

    // Validation: Password length
    if (password.length < 8) {
      return NextResponse.json({ error: "Password minimal 8 karakter." }, { status: 400 });
    }

    // 1. Buat instance anon untuk memicu SignUp
    const supabaseAnon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: authData, error: authError } = await supabaseAnon.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      console.error("SignUp Error:", authError?.message);
      return NextResponse.json(
        { error: "Pendaftaran gagal. Email mungkin sudah terpakai." },
        { status: 400 }
      );
    }

    // Generate username from email
    const username = email.split("@")[0] + "_" + Math.random().toString(36).substring(2, 7);

    // 2. Masukkan Profile menggunakan Akses Admin.
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: authData.user.id,
        username: username,
        full_name: full_name,
        display_name: full_name,
        role: "siswa",
      });

    if (profileError) {
      console.error("Profile Error:", profileError.message);
      return NextResponse.json({ error: "Gagal menyimpan profil peserta." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi." });
  } catch (err: any) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
