"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, localeLabels } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ layoutId = "locale-pill" }: { layoutId?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center rounded-full border border-line p-0.5">
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={localeLabels[code].name}
            className={cn(
              "relative h-7 rounded-full px-2.5 text-xs font-medium tracking-wide transition-colors duration-300",
              active ? "text-fg" : "text-subtle hover:text-fg",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute inset-0 rounded-full bg-fg/[0.08] ring-1 ring-inset ring-line-strong"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{localeLabels[code].short}</span>
          </button>
        );
      })}
    </div>
  );
}
