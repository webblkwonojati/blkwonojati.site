import dynamic from "next/dynamic";
import HomeHero from "./HomeHero";
import { Metadata } from "next";

// Dynamic imports for below-the-fold components
const HomeVideo = dynamic(() => import("./HomeVideo"));
const HomeMarquee = dynamic(() => import("./HomeMarquee"));
const HomeTestimonials = dynamic(() => import("./HomeTestimonials"));
const HomeCTA = dynamic(() => import("./HomeCTA"));
const HomeFAQ = dynamic(() => import("./HomeFAQ"));
const HomeLogos = dynamic(() => import("./HomeLogos"));
const HomeInstagram = dynamic(() => import("./HomeInstagram"));

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

export default function Home() {
  return (
    <main className="w-full bg-transparent relative">
      <HomeHero />
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
