"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string;
  className?: string;
}

export default function PageHero({ 
  badge, 
  title, 
  description,
  className 
}: PageHeroProps) {
  return (
    <section className={cn("pt-32 pb-24 px-6 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden", className)}>
      <div className="mx-auto max-w-3xl">
        <motion.div
           variants={staggerContainer}
           initial="hidden"
           animate="visible"
           className="flex flex-col"
        >
          <motion.div variants={fadeInUp}>
            <Breadcrumbs />
          </motion.div>
          
          <div className="flex flex-col">
            {badge && (
              <motion.span 
                variants={fadeInUp}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {badge}
              </motion.span>
            )}
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold text-slate-900 mb-8"
            >
              {title}
            </motion.h1>
            
            {description && (
              <motion.p 
                variants={fadeInUp}
                className="text-slate-500 mb-16 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
