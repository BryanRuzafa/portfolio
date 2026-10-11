"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { siteConfig } from "@/config/site";
import { localeLabels } from "@/i18n";
import { EASE_OUT_EXPO, pressable } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./buttonStyles";

/**
 * Botón "Descargar CV" con menú de idiomas.
 * Los idiomas disponibles salen de siteConfig.cv: para añadir inglés
 * basta con descomentar su línea allí y dejar el PDF en /public/cv/.
 */
export function CvMenu() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // El idioma activo de la web aparece primero.
  const files = [...siteConfig.cv].sort((a, b) => Number(b.locale === locale) - Number(a.locale === locale));

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector<HTMLElement>("button")?.focus();
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []);
      if (items.length === 0) return;
      e.preventDefault();
      const current = items.indexOf(document.activeElement as HTMLElement);
      const next = e.key === "ArrowDown" ? (current + 1) % items.length : (current - 1 + items.length) % items.length;
      items[next]?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        {...pressable}
        className={cn("group", buttonStyles.secondary)}
      >
        <Download className="size-4 text-accent-text" strokeWidth={1.75} aria-hidden />
        {t.hero.ctaCv}
        <ChevronDown
          className={cn("size-4 text-subtle transition-transform duration-300", open && "rotate-180")}
          strokeWidth={1.75}
          aria-hidden
        />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={t.hero.cvMenu}
            initial={{ opacity: 0, y: -6, scale: 0.97, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="absolute top-full left-0 z-30 mt-2 w-64 origin-top-left rounded-2xl border border-line bg-surface/95 p-1.5 shadow-[0_24px_60px_-24px_rgb(var(--shadow)/0.55)] backdrop-blur-xl"
          >
            <p className="px-3 pt-2 pb-1.5 text-xs text-subtle">{t.hero.cvMenu}</p>
            {files.map((cv, i) => (
              <motion.a
                key={cv.locale}
                role="menuitem"
                href={cv.href}
                download={`Bryan-Ruzafa-CV-${cv.locale.toUpperCase()}.pdf`}
                lang={cv.locale}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: 0.05 + i * 0.05 }}
                className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-fg outline-none transition-colors hover:bg-fg/[0.05] focus-visible:bg-fg/[0.06] focus-visible:ring-1 focus-visible:ring-accent/50"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg border border-line bg-bg text-[11px] font-semibold tracking-wide text-accent-text">
                    {localeLabels[cv.locale].short}
                  </span>
                  <span>
                    <span className="block font-medium">{localeLabels[cv.locale].name}</span>
                    <span className="block text-xs text-subtle">PDF</span>
                  </span>
                </span>
                <Download
                  className="size-4 text-subtle transition-all duration-300 group-hover/item:translate-y-0.5 group-hover/item:text-fg"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
