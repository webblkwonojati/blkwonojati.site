"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  withBreadcrumbs?: boolean;
  className?: string;
}

export default function SectionHeader({ 
  badge, 
  title, 
  description, 
  align = "left",
  withBreadcrumbs = false,
  className 
}: SectionHeaderProps) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {withBreadcrumbs && <Breadcrumbs />}
      {badge && (
        <motion.span 
          variants={fadeInUp}
          className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
        >
          {badge}
        </motion.span>
      )}
      <h2 className={cn(
        "text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter leading-none font-display",
      )}>
        {title}
      </h2>
      {description && (
        <p className="text-slate-500 text-lg leading-relaxed font-medium">
          {description}
        </p>
      )}
    </motion.div>
  );
}
