"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

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
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": pathSegments.map((segment, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
              "item": `https://blkwonojati.site/${pathSegments.slice(0, index + 1).join("/")}`
            }))
          })
        }}
      />
      <Link href="/" className="hover:text-primary transition-colors focus-visible:outline-primary">
        Beranda
      </Link>
      
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const name = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <Fragment key={path}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 select-none" aria-hidden="true" />
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
