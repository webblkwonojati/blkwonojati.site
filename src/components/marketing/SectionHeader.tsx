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
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block">
          {badge}
        </span>
      )}
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight",
      )}>
        {title}
      </h2>
      {description && (
        <p className="text-slate-500 text-lg leading-relaxed">
          {description}
        </p>
      )}
      {align === "left" && <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>}
    </motion.div>
  );
}
