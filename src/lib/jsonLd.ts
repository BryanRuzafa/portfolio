import { siteConfig } from "@/config/site";

const { url, name, email, jobTitle, photos, sameAs } = siteConfig;
const photo = (p: { base: string; width: number; height: number }) => ({
  "@type": "ImageObject",
  url: `${url}${p.base}.jpg`,
  contentUrl: `${url}${p.base}.jpg`,
  width: p.width,
  height: p.height,
  caption: name,
  creditText: name,
  creator: { "@id": `${url}/#person` },
  copyrightNotice: `© ${name}`,
});

/**
 * Datos estructurados (JSON-LD) para que Google identifique la página como el perfil
 * de una persona concreta y asocie su foto, su nombre y sus otros perfiles (sameAs).
 * Se comprueba en https://search.google.com/test/rich-results
 */
export const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${url}/#profilepage`,
      url,
      name: `${name} · Portfolio`,
      inLanguage: ["es", "ca", "en"],
      isPartOf: { "@id": `${url}/#website` },
      mainEntity: { "@id": `${url}/#person` },
      primaryImageOfPage: { "@id": `${url}/#photo` },
    },
    {
      "@type": "Person",
      "@id": `${url}/#person`,
      name,
      givenName: "Bryan",
      familyName: "Ruzafa Gonçalves",
      alternateName: ["Bryan Ruzafa", "Bryan RG", "BryanRuzafa"],
      url,
      email: `mailto:${email}`,
      jobTitle,
      description: "Full-Stack Developer y estudiante de Ciberseguridad.",
      image: { "@id": `${url}/#photo`, ...photo(photos.square) },
      address: { "@type": "PostalAddress", addressRegion: "Barcelona", addressCountry: "ES" },
      knowsAbout: ["Desarrollo web full-stack", "Ciberseguridad", "Docker", "Linux", "Next.js", "Vue", "NestJS"],
      sameAs,
    },
    { "@type": "WebSite", "@id": `${url}/#website`, url, name, publisher: { "@id": `${url}/#person` }, inLanguage: ["es", "ca", "en"] },
    { "@id": `${url}/#photo-portrait`, ...photo(photos.portrait) },
  ],
} as const;
