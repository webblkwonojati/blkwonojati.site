"use client";

import { motion } from "framer-motion";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
