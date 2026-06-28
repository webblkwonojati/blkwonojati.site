"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeader from "@/components/marketing/SectionHeader";
import ButtonPremium from "@/components/ui/ButtonPremium";

export default function HomeInstagram() {
  useEffect(() => {
    const titles = [
      "Instagram post 1 dari BLK Wonojati",
      "Instagram post 2 dari BLK Wonojati",
      "Instagram post 3 dari BLK Wonojati",
    ];

    const setTitles = () => {
      for (let i = 0; i < 3; i++) {
        const el = document.getElementById(`instagram-embed-${i}`) as HTMLIFrameElement | null;
        if (el && !el.title) el.title = titles[i];
      }
    };

    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }

    const interval = setInterval(setTitles, 500);
    const timeout = setTimeout(() => clearInterval(interval), 15000);
    setTitles();

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const embeds = [
    "https://www.instagram.com/p/DXOL2fvCTmv/",
    "https://www.instagram.com/p/DUhKuqqEtOP/",
    "https://www.instagram.com/p/DU7gyD4kT8T/"
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader
          align="center"
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
                title={`Instagram post ${idx + 1}`}
                aria-label={`Instagram post ${idx + 1} dari BLK Wonojati`}
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "280px",
                  padding: 0,
                  width: "99.375%",
                  minHeight: "580px",
                  position: "relative"
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
