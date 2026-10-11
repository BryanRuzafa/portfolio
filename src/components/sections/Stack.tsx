"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Database, Monitor, Server, ShieldCheck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GlowCard } from "@/components/ui/GlowCard";
import { Section } from "@/components/ui/Section";
import type { StackGroupKey } from "@/i18n";
import { chip, fadeUp, stagger, viewportOnce } from "@/lib/motion";

const groupIcons: Record<StackGroupKey, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  data: Database,
  devops: ShieldCheck,
};

export function Stack() {
  const { t } = useLanguage();

  return (
    <Section id="stack" title={t.stack.title} intro={t.stack.intro}>
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 md:grid-cols-2 md:gap-5"
      >
        {t.stack.groups.map((group) => {
          const Icon = groupIcons[group.key];
          return (
            <GlowCard key={group.key} innerClassName="p-6 md:p-8">
              <div className="flex items-center gap-3.5">
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg text-accent-text">
                  <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-fg">{group.title}</h3>
              </div>

              <motion.ul variants={stagger(0.04, 0.15)} className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={chip}
                    whileHover={{ y: -2 }}
                    className="cursor-default rounded-lg border border-line bg-bg/60 px-3 py-1.5 text-sm text-fg/85 transition-[border-color,color,background-color] duration-300 hover:border-accent/50 hover:bg-accent/5 hover:text-fg"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </GlowCard>
          );
        })}
      </motion.div>

      {/* Certificaciones: bloque compacto bajo el stack */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 md:mt-16"
      >
        <motion.h3
          variants={fadeUp}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.01em] text-fg"
        >
          <Award className="size-[18px] text-accent-text" strokeWidth={1.75} aria-hidden />
          {t.stack.certsTitle}
        </motion.h3>

        <motion.ul variants={stagger(0.08)} className="mt-5 grid gap-3 md:grid-cols-2">
          {t.stack.certs.map((cert, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="sheen group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent-text transition-colors duration-300 group-hover:border-accent/50">
                <BadgeCheck className="size-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium text-subtle">{cert.issuer}</span>
                <span className="mt-1 block leading-snug font-medium text-pretty text-fg">{cert.name}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </Section>
  );
}
