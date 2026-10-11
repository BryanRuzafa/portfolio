import type { Locale } from "@/i18n/types";

export interface CvFile {
  /** Idioma del documento (la etiqueta se toma de localeLabels). */
  locale: Locale;
  href: string;
}

/**
 * Datos personales y enlaces. Es el ÚNICO archivo que necesitas tocar
 * para cambiar URLs, email, foto o CV.
 */
export const siteConfig = {
  name: "Bryan Ruzafa Gonçalves",
  initials: "BR",
  /** Dominio público final (se usa para metadatos y Open Graph). */
  url: "https://bryanrg.dev",
  email: "bryan@bryanrg.dev",
  /** Teléfono de empresa con WhatsApp: se muestra tal cual y se enlaza con wa.me (sin espacios ni +). */
  phone: { display: "684 722 989", whatsapp: "34684722989" },
  links: {
    github: "https://github.com/BryanRuzafa",
    linkedin: "https://www.linkedin.com/in/bryan-ruzafa/",
  },
  /** CVs descargables desde el botón del hero (en /public/cv/). */
  cv: [
    { locale: "es", href: "/cv/bryan-ruzafa-cv-es.pdf" },
    { locale: "ca", href: "/cv/bryan-ruzafa-cv-ca.pdf" },
    { locale: "en", href: "/cv/bryan-ruzafa-cv-en.pdf" },
  ] as CvFile[],
  /** Foto recortada sin fondo (PNG/WebP con transparencia). Si no existe, se muestra el monograma. */
  avatarPath: "/images/bryan-ruzafa-goncalves-recorte.webp",
  /** Indicador «Disponible» en la cabecera. Ponlo a false cuando no busques trabajo. */
  available: true,
  /** Puesto que se declara en los datos estructurados (Schema.org Person). */
  jobTitle: "Full-Stack Developer",
  /**
   * Fotos oficiales con fondo, en AVIF/WebP/JPG (mismo nombre, distinta extensión).
   * Son las que se declaran a Google: datos estructurados, sitemap de imágenes y la foto de «Sobre mí».
   */
  photos: {
    square: { base: "/images/bryan-ruzafa-goncalves", width: 1200, height: 1200 },
    portrait: { base: "/images/bryan-ruzafa-goncalves-retrato", width: 1200, height: 1500 },
  },
  /** Otros perfiles que son esta misma persona (Schema.org sameAs). Añade aquí Gravatar, etc. */
  sameAs: ["https://github.com/BryanRuzafa", "https://www.linkedin.com/in/bryan-ruzafa/"],
} as const;
