"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on homepage
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  // Map path segments to human-readable names
  const routeMap: Record<string, string> = {
    "profil": "Profil Lembaga",
    "kejuruan-pelatihan": "Kejuruan Pelatihan",
    "lowongan-kerja": "Lowongan Kerja",
    "berita": "Berita & Artikel",
    "galeri": "Galeri Kegiatan",
    "bantuan": "Pusat Bantuan",
    "register": "Pendaftaran",
    "login": "Masuk Akun",
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
      <Link href="/" className="hover:text-primary transition-colors focus-visible:outline-primary">
        Beranda
      </Link>
      
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const name = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <Fragment key={path}>
            <span className="material-symbols-outlined text-sm select-none" aria-hidden="true">chevron_right</span>
            {isLast ? (
              <span className="text-slate-900" aria-current="page">{name}</span>
            ) : (
              <Link href={path} className="hover:text-primary transition-colors focus-visible:outline-primary">
                {name}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
