// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zyra.works"),
  title: "ZyraWorks — Color consistente. Workflows automáticos.",
  description:
    "Estandarización de color ISO 12647, automatización de preprensa y respaldo 24/7 para imprentas de LATAM.",
  openGraph: {
    title: "ZyraWorks — Color consistente. Workflows automáticos.",
    description:
      "Menos reprocesos, más predictibilidad. Color consistente y automatización end-to-end.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

// Viewport correcto para respetar safe-area (iPhone/Android)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZyraWorks",
    url: "https://zyra.works",
    logo: "/favicon.svg",
    areaServed: ["AR", "UY", "CL", "PY", "BO"],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: "contacto@zyra.works" },
    ],
  };

  return (
    <html lang="es">
      <head>
        <Script id="ld-org" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
