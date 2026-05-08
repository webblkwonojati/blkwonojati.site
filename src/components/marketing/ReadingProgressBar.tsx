"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height === 0) {
        setProgress(0);
        return;
      }
      const scrolled = (winScroll / height);
      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    // Jalankan sekali saat mount
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-50 pointer-events-none">
      <div 
        className="h-full bg-primary origin-left transition-transform duration-200 ease-out" 
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
