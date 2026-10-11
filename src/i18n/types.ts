import type { ProjectId } from "@/data/projects";

export const LOCALES = ["es", "ca", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export type StackGroupKey = "frontend" | "backend" | "data" | "devops";

export interface JourneyItem {
  title: string;
  center: string;
  status: "current" | "done";
  /** Años, p. ej. "2024 – 2026". */
  period: string;
  /** Dato opcional bajo el centro, p. ej. la nota media. */
  note?: string;
  description: string;
  focus: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  /** Etiqueta opcional, p. ej. "IT". */
  tag?: string;
  bullets: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface ProjectCopy {
  tag: string;
  /** Fechas del proyecto, si se quieren mostrar (p. ej. «feb. – may. 2026»). */
  period?: string;
  description: string;
  role: string;
  /** Explicación más extensa que solo aparece en el diálogo de detalles. */
  details?: { title: string; body: string }[];
}

/**
 * Contrato único para los tres idiomas. Si falta una clave en cualquier
 * diccionario, TypeScript lo marca en compilación.
 * En los párrafos, **texto** se renderiza como énfasis.
 */
export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    skip: string;
    about: string;
    journey: string;
    experience: string;
    stack: string;
    projects: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    toDark: string;
    toLight: string;
    language: string;
    home: string;
  };
  hero: {
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaCv: string;
    photoAlt: string;
    /** Indicador de disponibilidad para trabajar (siteConfig.available). */
    availability: string;
    social: string;
    cvMenu: string;
    badge: string;
    scroll: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    path: { label: string; detail: string }[];
    /** Datos rápidos bajo los párrafos: ubicación, idiomas, carnet. */
    facts: { label: string; value: string }[];
  };
  journey: {
    title: string;
    intro: string;
    current: string;
    done: string;
    focus: string;
    items: JourneyItem[];
  };
  experience: {
    title: string;
    intro: string;
    items: ExperienceItem[];
  };
  stack: {
    title: string;
    intro: string;
    groups: { key: StackGroupKey; title: string; items: string[] }[];
    certsTitle: string;
    certs: Certification[];
  };
  projects: {
    title: string;
    intro: string;
    role: string;
    stack: string;
    code: string;
    demo: string;
    details: string;
    close: string;
    runLocal: string;
    copyCommand: string;
    /** Nota sobre los requisitos, según cómo se levanta el proyecto (LocalRun.needs). */
    requires: Record<"docker" | "node", string>;
    openAt: string;
    preview: string;
    items: Record<ProjectId, ProjectCopy>;
  };
  contact: {
    title: string;
    intro: string;
    copyEmail: string;
    copied: string;
    elsewhere: string;
    form: {
      title: string;
      name: string;
      email: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      errors: { name: string; email: string; message: string };
    };
  };
  footer: { rights: string; credits: string; backToTop: string };
  toast: {
    emailCopied: string;
    commandCopied: string;
    copyFailed: string;
    sent: string;
    mailto: string;
    sendFailed: string;
  };
}
