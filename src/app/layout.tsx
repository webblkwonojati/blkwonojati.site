import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/SmoothScroll";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "UPT BLK Wonojati | Pelatihan Kerja & Kompetensi",
    template: "%s | UPT BLK Wonojati"
  },
  description: "Pusat Pelatihan Kerja (BLK) Wonojati untuk pengembangan kompetensi dan keterampilan kerja masa depan yang handal.",
  keywords: ["BLK Wonojati", "Pelatihan Kerja", "Kompetensi", "Sertifikasi", "Vokasi", "Malang"],
  authors: [{ name: "UPT BLK Wonojati" }],
  creator: "UPT BLK Wonojati",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://agrilearn.id",
    title: "UPT BLK Wonojati | Pelatihan Kerja & Kompetensi",
    description: "Wujudkan masa depan lewat keterampilan nyata di UPT BLK Wonojati.",
    siteName: "Agrilearn BLK Wonojati",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPT BLK Wonojati | Pelatihan Kerja & Kompetensi",
    description: "Pusat Pelatihan Kerja untuk pengembangan kompetensi masa depan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("scroll-smooth", inter.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UPT BLK Wonojati",
              "url": "https://agrilearn.id",
              "logo": "https://agrilearn.id/logo-blk.png",
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
        {/* Analytics Placeholder - Uncomment and add ID when ready */}
        {/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
        
        <Providers>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
