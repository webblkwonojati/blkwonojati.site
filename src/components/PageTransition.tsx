"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";

function PageTransitionContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // When pathname or searchParams change, we start the loading state
    setIsPending(true);
    
    // Faster delay for a snappier feel while still allowing content to load
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsPending(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, children]);

  return (
    <div className="relative w-full flex-1 flex flex-col">
      <AnimatePresence mode="wait">
        {isPending && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a3a1a]"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="relative flex flex-col items-center">
              {/* Logo Pulsing */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 mb-8"
              >
                <Image
                  src="/logo-blk.png"
                  alt="Loading..."
                  width={96}
                  height={96}
                  className="object-contain brightness-0 invert"
                />
              </motion.div>

              {/* Progress Line */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                />
              </div>
              <p className="mt-6 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Menyiapkan Konten</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 flex flex-col w-full relative"
      >
        {displayChildren}
      </motion.div>
    </div>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <PageTransitionContent>{children}</PageTransitionContent>
    </Suspense>
  );
}
