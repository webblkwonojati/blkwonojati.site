"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonPremiumProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white";
  icon?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

export default function ButtonPremium({
  href,
  onClick,
  children,
  variant = "primary",
  icon,
  className,
  size = "md",
  type = "button",
  target,
  rel,
}: ButtonPremiumProps) {
  
  const baseStyles = "group relative flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 overflow-hidden";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-primary shadow-lg border border-white/5",
    secondary: "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-green-900/20",
    outline: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
    white: "bg-white text-slate-900 hover:bg-primary hover:text-white shadow-2xl"
  };

  const sizes = {
    sm: "px-4 h-9 text-[9px] rounded-lg",
    md: "px-8 py-3.5 text-[10px] rounded-xl",
    lg: "px-10 py-4 text-[11px] rounded-2xl"
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon === "east" && (
        <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {content}
    </button>
  );
}
