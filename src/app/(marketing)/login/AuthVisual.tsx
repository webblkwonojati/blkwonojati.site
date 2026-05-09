"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthVisualProps {
  title: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  isReverse?: boolean;
}

export default function AuthVisual({ title, imageSrc, imageAlt, isReverse }: AuthVisualProps) {
  return (
    <div className={cn(
      "hidden lg:flex lg:w-1/2 relative bg-accent overflow-hidden group",
      isReverse ? "order-2" : "order-1"
    )}>
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-50"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent"></div>
      
      <div className={cn(
        "relative z-10 w-full p-20 flex flex-col justify-end",
        isReverse ? "text-right items-end" : "text-left items-start"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-14 h-14 bg-white rounded-xl p-2 mb-8 shadow-xl relative">
            <Image src="/logo-blk.png" alt="Logo UPT BLK Wonojati" fill sizes="56px" className="p-2 object-contain" />
          </div>
          <h1 className={cn(
            "text-5xl font-black text-white leading-tight mb-4",
            isReverse ? "pr-6 border-r-8 border-primary" : ""
          )}>
            {title}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

