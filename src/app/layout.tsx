import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers/Providers";
import { siteConfig } from "@/config/site";
import { dictionaries } from "@/i18n";
import { profileJsonLd } from "@/lib/jsonLd";
import "./globals.css";

const { meta } = dictionaries.es;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: meta.title,
  description: meta.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Bryan",
    lastName: "Ruzafa Gonçalves",
    username: "BryanRuzafa",
    url: siteConfig.url,
    title: meta.title,
    description: meta.description,
    siteName: siteConfig.name,
    locale: "es_ES",
    alternateLocale: ["ca_ES", "en_US"],
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  colorScheme: "dark light",
};

/**
 * Se ejecuta antes del primer pintado: aplica tema e idioma guardados
 * para evitar el destello de tema incorrecto (FOUC).
 * Tema por defecto: oscuro.
 */
const bootScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('theme');var d=t?t==='dark':true;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';var l=localStorage.getItem('locale');if(l==='es'||l==='ca'||l==='en'){r.lang=l;}}catch(e){}})();`;

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  // Nonce de la CSP generado en src/proxy.ts (leer headers() hace la página dinámica, que es lo que exige el nonce).
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} dark`} suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <Providers nonce={nonce}>{children}</Providers>
      </body>
    </html>
  );
}
