import nextDynamic from "next/dynamic";
import HomeHero from "./HomeHero";
import { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Dynamic imports for below-the-fold components
const HomeVideo = nextDynamic(() => import("./HomeVideo"));
const HomeMarquee = nextDynamic(() => import("./HomeMarquee"));
const HomeTestimonials = nextDynamic(() => import("./HomeTestimonials"));
const HomeCTA = nextDynamic(() => import("./HomeCTA"));
const HomeFAQ = nextDynamic(() => import("./HomeFAQ"));
const HomeLogos = nextDynamic(() => import("./HomeLogos"));
const HomeInstagram = nextDynamic(() => import("./HomeInstagram"));
const HomeNews = nextDynamic(() => import("./HomeNews"));

export const metadata: Metadata = {
  title: "Beranda",
  description: "Selamat datang di UPT BLK Wonojati. Pusat Pelatihan Kerja berbasis industri untuk masa depan Indonesia.",
};

const programs = [
  { title: "Practical Office Advance", icon: "desktop_windows", category: "Administrasi" },
  { title: "Pembuatan Roti dan Kue", icon: "bakery_dining", category: "Kuliner" },
  { title: "Pembudidayaan Ayam Pedaging", icon: "agriculture", category: "Peternakan" },
  { title: "Pembudidayaan Sayuran Hidroponik", icon: "potted_plant", category: "Pertanian" },
  { title: "Pembudidayaan Bibit Sayuran", icon: "nature", category: "Pertanian" },
  { title: "Pembudidayaan Jamur", icon: "nature_people", category: "Pertanian" },
  { title: "Barista Kafe", icon: "local_cafe", category: "Pariwisata" },
  { title: "Housekeeping", icon: "cleaning_services", category: "Perhotelan" },
  { title: "Housekeeper Level 1", icon: "hotel", category: "Perhotelan" },
  { title: "Pembudidayaan Ikan Hias", icon: "water", category: "Perikanan" },
  { title: "Pembesaran Ikan Catfish (Lele)", icon: "set_meal", category: "Perikanan" },
  { title: "Pengoperasian Traktor", icon: "agriculture", category: "Pertanian" },
];

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch latest 3 news for the spoiler
  const { data: latestNews } = await supabaseAdmin
    .from("berita")
    .select("id, title, excerpt, image_url, category, published_at")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <main>
      <HomeHero />
      <HomeNews news={latestNews || []} />
      <HomeVideo />
      <HomeMarquee programs={programs} />
      <HomeTestimonials />
      <HomeInstagram />
      <HomeCTA />
      <HomeFAQ />
      <HomeLogos />
    </main>
  );
}
