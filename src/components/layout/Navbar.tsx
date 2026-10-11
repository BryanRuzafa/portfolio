"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Dictionary } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavKey = keyof Pick<Dictionary["nav"], "about" | "journey" | "experience" | "stack" | "projects" | "contact">;

export const NAV_ITEMS: readonly { id: string; key: NavKey }[] = [
  { id: "sobre-mi", key: "about" },
  { id: "trayectoria", key: "journey" },
  { id: "experiencia", key: "experience" },
  { id: "stack", key: "stack" },
  { id: "proyectos", key: "projects" },
  { id: "contacto", key: "contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const { t } = useLanguage();
  const active = useScrollSpy(SECTION_IDS);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Cierra el menú móvil con Escape y al pasar a escritorio.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-fg focus:ring-2 focus:ring-accent"
      >
        {t.nav.skip}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-line/80 bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#inicio"
            aria-label={`${t.nav.home} · Bryan Ruzafa`}
            className="text-lg font-semibold tracking-[-0.04em] text-fg"
            onClick={() => setOpen(false)}
          >
            BR<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map(({ id, key }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-fg/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                    <span className="relative">{t.nav[key]}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className={cn(buttonStyles.icon, "size-9 lg:hidden")}
            >
              {open ? <X className="size-4" strokeWidth={1.75} aria-hidden /> : <Menu className="size-4" strokeWidth={1.75} aria-hidden />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="overflow-hidden lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="mx-auto flex max-w-6xl flex-col px-5 pt-2 pb-6 sm:px-8"
              >
                {NAV_ITEMS.map(({ id, key }) => (
                  <motion.li
                    key={id}
                    variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === id ? "location" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-[-0.02em]",
                        active === id ? "text-fg" : "text-muted",
                      )}
                    >
                      {t.nav[key]}
                      {active === id ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
                    </a>
                  </motion.li>
                ))}
                <li className="pt-6 sm:hidden">
                  <LanguageSwitcher layoutId="locale-pill-mobile" />
                </li>
              </motion.ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
