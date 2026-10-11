"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { EASE_OUT_EXPO, pressable } from "@/lib/motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const label = isDark ? t.nav.toLight : t.nav.toDark;

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      {...pressable}
      className={`${buttonStyles.icon} size-9 overflow-hidden`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          className="grid place-items-center"
        >
          {isDark ? (
            <Moon className="size-4" strokeWidth={1.75} aria-hidden />
          ) : (
            <Sun className="size-4" strokeWidth={1.75} aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
