"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import type { ExperienceItem } from "@/i18n";
import { EASE_OUT_EXPO, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Experiencia laboral como lista desplegable.
 * Un resaltado compartido (layoutId) se desliza hasta la fila bajo el cursor.
 */
export function Experience() {
  const { t } = useLanguage();
  // Por defecto, abierta la experiencia en IT.
  const defaultOpen = Math.max(0, t.experience.items.findIndex((item) => item.tag));
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="experiencia" title={t.experience.title} intro={t.experience.intro}>
      <motion.ul
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        onMouseLeave={() => setHovered(null)}
        className="border-t border-line"
      >
        {/* Claves por índice: el texto cambia con el idioma y no debe re-montar la fila. */}
        {t.experience.items.map((item, i) => (
          <ExperienceRow
            key={i}
            item={item}
            open={open === i}
            hovered={hovered === i}
            onHover={() => setHovered(i)}
            onToggle={() => setOpen((current) => (current === i ? null : i))}
          />
        ))}
      </motion.ul>
    </Section>
  );
}

interface RowProps {
  item: ExperienceItem;
  open: boolean;
  hovered: boolean;
  onHover: () => void;
  onToggle: () => void;
}

function ExperienceRow({ item, open, hovered, onHover, onToggle }: RowProps) {
  const panelId = useId();

  return (
    <motion.li variants={fadeUp} onMouseEnter={onHover} className="relative isolate border-b border-line">
      {hovered ? (
        <motion.span
          layoutId="experience-hover"
          aria-hidden
          className="absolute -inset-x-3 inset-y-1 -z-10 rounded-2xl bg-fg/[0.035] md:-inset-x-4"
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
        />
      ) : null}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 py-6 text-left md:grid-cols-[240px_1fr_auto] md:py-7"
      >
        <span className="order-2 col-span-2 font-mono text-sm text-subtle tabular-nums md:order-none md:col-span-1">
          {item.period}
        </span>

        <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-lg font-semibold tracking-[-0.02em] text-fg md:text-xl">{item.role}</span>
          <span className="text-muted">{item.company}</span>
          {item.tag ? (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-text">
              {item.tag}
            </span>
          ) : null}
        </span>

        <span
          aria-hidden
          className={cn(
            "grid size-9 place-items-center rounded-full border transition-[border-color,background-color,color] duration-300",
            open ? "border-accent/50 bg-accent/10 text-accent-text" : "border-line text-muted",
          )}
        >
          <Plus
            className={cn("size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", open && "rotate-[135deg]")}
            strokeWidth={1.75}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={stagger(0.05, 0.05)}
              className="space-y-2.5 pb-7 md:pl-[264px]"
            >
              {item.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
                  }}
                  className="flex max-w-[68ch] gap-3 leading-relaxed text-pretty text-muted"
                >
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}
