"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partnerLogos = [
  { name: "Pemprov Jatim", src: "/logo-jatim/logo_jatim.svg" },
  { name: "Disnakertrans", src: "/logo-jatim/logo_disnakertrans.svg" },
  { name: "Zona Integritas", src: "/logo-jatim/logo_zona_integritas.svg" },
  { name: "Berakhlak", src: "/logo-jatim/logo_berakhlak.svg" },
  { name: "Bangga Melayani Bangsa", src: "/logo-jatim/logo_bangga.svg" },
];

export default function HomeLogos() {
  return (
    <section className="py-20 bg-green-50/50 border-t border-green-100/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {partnerLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative h-14 md:h-20 w-32 md:w-44 flex items-center justify-center p-2"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 768px) 128px, 176px"
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
