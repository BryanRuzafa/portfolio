import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** /robots.txt: todo indexable salvo la API del formulario. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
