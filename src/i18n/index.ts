import { ca } from "./locales/ca";
import { en } from "./locales/en";
import { es } from "./locales/es";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { es, ca, en };

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  es: { short: "ES", name: "Castellano" },
  ca: { short: "CA", name: "Català" },
  en: { short: "EN", name: "English" },
};

export * from "./types";
