"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Award, Building2, Check } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import type { Dictionary, JourneyItem } from "@/i18n";
import { chip, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Journey() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);

  // La línea se "rellena" a medida que el lector avanza por la trayectoria.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section id="trayectoria" title={t.journey.title} intro={t.journey.intro}>
      <ol ref={listRef} className="relative">
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b from-accent to-accent-deep"
        />
        {/* Claves por índice: si fueran el texto, al cambiar de idioma los elementos
            se volverían a montar y se quedarían ocultos (whileInView ya disparado). */}
        {t.journey.items.map((item, i) => (
          <TimelineItem key={i} item={item} labels={t.journey} />
        ))}
      </ol>
    </Section>
  );
}

function TimelineItem({ item, labels }: { item: JourneyItem; labels: Dictionary["journey"] }) {
  const ref = useRef<HTMLLIElement>(null);
  // Activo cuando el elemento cruza la franja central de la pantalla.
  const active = useInView(ref, { margin: "-40% 0px -45% 0px" });
  const current = item.status === "current";

  return (
    <motion.li
      ref={ref}
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="group relative pb-16 pl-10 last:pb-0 md:pl-16"
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border bg-bg transition-[border-color,box-shadow] duration-500",
          active ? "timeline-dot-active border-accent" : "border-line-strong group-hover:border-accent/60",
        )}
      >
        <span className={cn("size-[5px] rounded-full transition-colors duration-500", active ? "bg-accent" : "bg-line-strong")} />
      </span>

      <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
        <motion.div variants={fadeUp} className="space-y-2.5">
          <StatusBadge current={current} label={current ? labels.current : labels.done} />
          <p className="font-mono text-sm text-fg/80 tabular-nums">{item.period}</p>
          <p className="flex items-center gap-2 text-sm text-muted">
            <Building2 className="size-4 shrink-0 text-subtle" strokeWidth={1.75} aria-hidden />
            {item.center}
          </p>
          {item.note ? (
            <p className="flex items-center gap-2 text-sm text-muted">
              <Award className="size-4 shrink-0 text-subtle" strokeWidth={1.75} aria-hidden />
              {item.note}
            </p>
          ) : null}
        </motion.div>

        <div>
          <motion.h3
            variants={fadeUp}
            className={cn(
              "text-xl font-semibold tracking-[-0.02em] text-balance transition-colors duration-500 md:text-2xl",
              active ? "text-fg" : "text-fg/85",
            )}
          >
            {item.title}
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 max-w-[62ch] leading-relaxed text-pretty text-muted">
            {item.description}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 text-sm text-subtle">
            {labels.focus}
          </motion.p>
          <motion.ul variants={stagger(0.05)} className="mt-3 flex flex-wrap gap-2">
            {item.focus.map((f, i) => (
              <motion.li
                key={i}
                variants={chip}
                className="rounded-full border border-line px-3 py-1.5 text-sm text-fg/85 transition-colors duration-300 hover:border-accent/50 hover:text-fg"
              >
                {f}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.li>
  );
}

function StatusBadge({ current, label }: { current: boolean; label: string }) {
  if (current) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-text">
        <span className="relative flex size-1.5">
          <span aria-hidden className="pulse-ring absolute inset-0 rounded-full bg-accent" />
          <span className="relative size-1.5 rounded-full bg-accent" />
        </span>
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
      <Check className="size-3.5" strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}
