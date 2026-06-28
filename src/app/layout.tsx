import { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blkwonojati.site"),
  title: {
    default: "UPT BLK Wonojati | Pelatihan Kerja & Kompetensi",
    template: "%s | UPT BLK Wonojati"
  },
  description: "Pusat Pelatihan Kerja (BLK) Wonojati untuk pengembangan kompetensi dan keterampilan kerja masa depan yang handal.",
  keywords: ["BLK Wonojati", "Pelatihan Kerja", "Kompetensi", "Sertifikasi", "Vokasi", "Malang"],
  authors: [{ name: "UPT BLK Wonojati" }],
  creator: "UPT BLK Wonojati",
  alternates: {
    canonical: "https://www.blkwonojati.site",
    languages: {
      "id-ID": "https://www.blkwonojati.site",
    },
  },
  icons: {
    icon: "/logo-blk.png",
    apple: "/logo-blk.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.blkwonojati.site",
    title: "UPT BLK Wonojati | Pelatihan Kerja & Kompetensi",
    description: "Wujudkan masa depan lewat keterampilan nyata di UPT BLK Wonojati.",
    siteName: "Agrilearn BLK Wonojati",
    images: [
      {
        url: "/BLK-wonojati.webp",
        width: 1200,
        height: 630,
        alt: "Gedung UPT BLK Wonojati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPT BLK Wonojati | Pelatihan Kerja & Kompetensi",
    description: "Pusat Pelatihan Kerja untuk pengembangan kompetensi masa depan.",
    images: ["/BLK-wonojati.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("scroll-smooth", sans.variable, display.variable)} data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UPT BLK Wonojati",
              "url": "https://blkwonojati.site",
              "logo": "https://blkwonojati.site/logo-blk.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Wonojati No.1",
                "addressLocality": "Malang",
                "addressRegion": "Jawa Timur",
                "postalCode": "65161",
                "addressCountry": "ID"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-341-xxxxxx",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className="font-display antialiased bg-white text-slate-900 flex min-h-screen flex-col overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
