"use client";

import { motion } from "framer-motion";
import { Code, Network, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const pathIcons = [Network, Code, ShieldCheck] as const;

export function About() {
  const { t } = useLanguage();

  return (
    <Section id="sobre-mi" title={t.about.title}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div className="h-fit space-y-8 md:sticky md:top-28">
        {/* Foto oficial: URL fija y nombre de archivo limpio para Google Imágenes */}
        <figure className="flex items-center gap-4">
          <picture>
            <source srcSet={`${siteConfig.photos.square.base}.avif`} type="image/avif" />
            <source srcSet={`${siteConfig.photos.square.base}.webp`} type="image/webp" />
            <img
              src={`${siteConfig.photos.square.base}.jpg`}
              alt={t.hero.photoAlt}
              title={siteConfig.name}
              width={siteConfig.photos.square.width}
              height={siteConfig.photos.square.height}
              loading="lazy"
              decoding="async"
              className="size-20 rounded-2xl border border-line object-cover"
            />
          </picture>
          <figcaption>
            <span className="block text-sm font-medium text-fg">{siteConfig.name}</span>
            <span className="block text-sm text-subtle">{t.hero.role}</span>
          </figcaption>
        </figure>

        {/* Recorrido: la secuencia importa, por eso se muestra como camino */}
        <motion.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative space-y-6"
        >
          <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-px bg-linear-to-b from-line via-line-strong to-accent/60" />
          {t.about.path.map((step, i) => {
            const Icon = pathIcons[i] ?? ShieldCheck;
            const last = i === t.about.path.length - 1;
            return (
              <motion.li key={i} variants={fadeUp} className="relative flex items-center gap-4">
                <span
                  className={
                    last
                      ? "relative grid size-10 place-items-center rounded-full border border-accent/60 bg-surface text-accent-text"
                      : "relative grid size-10 place-items-center rounded-full border border-line bg-surface text-muted"
                  }
                >
                  <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-medium text-fg">{step.label}</span>
                  <span className="block text-sm text-subtle">{step.detail}</span>
                </span>
              </motion.li>
            );
          })}
        </motion.ol>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-[68ch] space-y-6"
        >
          {t.about.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className={
                i === 0
                  ? "text-lg leading-relaxed text-pretty text-muted md:text-xl md:leading-relaxed"
                  : "text-base leading-relaxed text-pretty text-muted md:text-lg md:leading-relaxed"
              }
            >
              <RichText text={paragraph} />
            </motion.p>
          ))}

          <motion.dl variants={fadeUp} className="grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            {t.about.facts.map((fact, i) => (
              <div key={i}>
                <dt className="text-xs font-medium text-subtle">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-pretty text-fg">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </Section>
  );
}
