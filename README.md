# AgriLearn Landing Page

AgriLearn adalah platform landing page untuk UPT BLK Wonojati yang menghubungkan peserta pelatihan dengan peluang industri agribisnis dan lowongan kerja.

## 🚀 Fitur Utama
- **Landing Page Informatif**: Informasi program studi dan profil BLK.
- **Manajemen Lowongan**: Admin panel untuk mengelola lowongan kerja.
- **Pendaftaran Siswa**: Integrasi pendaftaran dan profil siswa.
- **Simpan & Bookmark**: Fitur untuk menyimpan lowongan yang diminati.
- **Responsive Design**: Tampilan optimal di berbagai perangkat (Mobile, Tablet, Desktop).

## 🛠️ Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: Tailwind CSS v4
- **Database & Auth**: [Supabase](https://supabase.com)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Animations**: Framer Motion & Lenis Scroll

## 🏁 Memulai Pengembangan

1. **Clone repository**:
   ```bash
   git clone https://github.com/[username]/agrilearn-landing.git
   cd agrilearn-landing
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Salin `.env.example` ke `.env.local` dan isi nilai yang diperlukan.
   ```bash
   cp .env.example .env.local
   ```

4. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

## ☁️ Deployment ke Vercel

Proyek ini direkomendasikan untuk dideploy ke [Vercel](https://vercel.com/) (platform native Next.js).

1. **Push ke GitHub**: Pastikan semua perubahan sudah di-commit dan di-push ke repository GitHub Anda.
2. **Koneksi Vercel**: 
   - Masuk ke dashboard [Vercel](https://vercel.com/new).
   - Impor repository `agrilearn-landing`.
3. **Konfigurasi Build**:
   - Vercel akan mendeteksi Next.js secara otomatis.
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
4. **Environment Variables**:
   Tambahkan semua variabel dari `.env.example` ke bagian **Environment Variables** di dashboard Vercel sebelum mengklik **Deploy**.

## 📄 Lisensi
[MIT](LICENSE)
