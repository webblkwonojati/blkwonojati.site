-- Hapus tabel jika sudah ada (opsional)
-- DROP TABLE IF EXISTS public.shortlinks;

CREATE TABLE public.shortlinks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    target_url TEXT NOT NULL,
    clicks BIGINT DEFAULT 0,
    created_by TEXT, -- Menyimpan Clerk User ID pembuat
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.shortlinks ENABLE ROW LEVEL SECURITY;

-- Policy 1: Mengizinkan akses baca (SELECT) untuk publik agar sistem preloader bisa berjalan.
CREATE POLICY "Allow public read access on shortlinks" 
    ON public.shortlinks FOR SELECT 
    USING (true);

-- Catatan:
-- Operasi INSERT/UPDATE/DELETE akan dilakukan melalui Server Actions (admin panel)
-- yang menggunakan `supabaseAdmin` (Service Role Key). 
-- Service Role Key akan otomatis mengabaikan (bypass) RLS, 
-- sehingga kita tidak perlu membuat Policy tambahan untuk Admin.
