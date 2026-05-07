"use client";

import { cn } from "@/lib/utils";

export default function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 p-6 space-y-6 bg-white overflow-hidden relative">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      
      <div className="flex gap-4 border-t border-slate-50 pt-6">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
