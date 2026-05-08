import { Metadata } from "next";
import BantuanClient from "./BantuanClient";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description: "Temukan jawaban atas pertanyaan umum seputar kejuruan pelatihan, pendaftaran, dan fasilitas di UPT BLK Wonojati.",
};

export default function Bantuan() {
  return (
    <main className="flex-1 pt-32 px-6 pb-24 bg-transparent relative">
      <BantuanClient />
    </main>
  );
}
