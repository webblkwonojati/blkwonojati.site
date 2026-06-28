import { Metadata } from "next";
import BantuanClient from "./BantuanClient";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description: "Temukan jawaban atas pertanyaan umum seputar kejuruan pelatihan, pendaftaran, dan fasilitas di UPT BLK Wonojati.",
  openGraph: {
    title: "Pusat Bantuan | UPT BLK Wonojati",
    description: "Temukan jawaban atas pertanyaan umum seputar kejuruan pelatihan, pendaftaran, dan fasilitas di UPT BLK Wonojati.",
    images: [{ url: "/BLK-wonojati.webp", width: 1200, height: 630, alt: "BLK Wonojati" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pusat Bantuan | UPT BLK Wonojati",
    description: "Temukan jawaban atas pertanyaan umum seputar kejuruan pelatihan, pendaftaran, dan fasilitas di UPT BLK Wonojati.",
    images: ["/BLK-wonojati.webp"],
  },
};

export default function Bantuan() {
  return (
    <main className="flex-1 pt-28 md:pt-32 px-6 pb-24 bg-transparent relative">
      <BantuanClient />
    </main>
  );
}
