import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** /sitemap.xml: una sola página, más los CVs para que también se indexen. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      // Fotos oficiales: se publican en el sitemap como <image:image> para Google Imágenes.
      images: Object.values(siteConfig.photos).map((p) => `${siteConfig.url}${p.base}.jpg`),
    },
    ...siteConfig.cv.map((cv) => ({
      url: `${siteConfig.url}${cv.href}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
