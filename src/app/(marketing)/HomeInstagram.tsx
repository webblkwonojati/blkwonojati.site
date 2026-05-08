"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeader from "@/components/marketing/SectionHeader";
import ButtonPremium from "@/components/ui/ButtonPremium";

export default function HomeInstagram() {
  useEffect(() => {
    // Only load script if not already present
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    }
  }, []);

  const embeds = [
    "https://www.instagram.com/p/DXOL2fvCTmv/",
    "https://www.instagram.com/p/DUhKuqqEtOP/",
    "https://www.instagram.com/p/DU7gyD4kT8T/"
  ];

  return (
    <section className="py-24 px-6 bg-slate-50/50 overflow-hidden relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader
          align="center"
          badge="Social Feed"
          title="Lensa BLK Wonojati"
          description="Ikuti keseruan kegiatan pelatihan dan momen inspiratif alumni kami langsung di Instagram."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-start"
        >
          {embeds.map((url, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="flex justify-center"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: 0,
                  width: "99.375%"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <ButtonPremium
            href="https://instagram.com/blkwonojatimalang"
            target="_blank"
            variant="primary"
          >
            Ikuti Kami di Instagram
          </ButtonPremium>
        </motion.div>
      </div>
    </section>
  );
}
