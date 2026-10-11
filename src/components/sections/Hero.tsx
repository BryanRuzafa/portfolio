"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CvMenu } from "@/components/ui/CvMenu";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { siteConfig } from "@/config/site";
import { EASE_OUT_EXPO, fadeUp, pressable, stagger, wordReveal } from "@/lib/motion";

export function Hero() {
  const { t } = useLanguage();
  const [first, ...rest] = siteConfig.name.split(" ");
  const lines = [[first], rest];

  return (
    // overflow-x-clip (no hidden) y z-10: el menú de CV puede salir por debajo del hero sin recortarse
    // y quedar por encima de "Sobre mí"; los halos siguen sin provocar scroll horizontal.
    <section
      id="inicio"
      aria-label={siteConfig.name}
      className="relative isolate z-10 flex min-h-[100svh] items-center overflow-x-clip pt-28 pb-24"
    >
      {/* Fondo: retícula técnica + halo navy muy tenue */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 opacity-60 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr] md:gap-12 lg:gap-16">
        <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="visible">
          {siteConfig.available ? (
            <motion.p
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm text-muted"
            >
              <span className="relative flex size-2">
                <span aria-hidden className="absolute inline-flex size-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t.hero.availability}
            </motion.p>
          ) : null}
          <h1 className="text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-fg">
            {lines.map((words, li) => (
              <span key={li} className="block">
                {words.map((word, wi) => (
                  <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0">
                    <motion.span variants={wordReveal} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg font-medium text-fg/90 md:text-xl">
            <ScrambleText text={t.hero.role} delay={650} />
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted md:text-lg">
            {t.hero.tagline}
          </motion.p>

          {/* z-20: el menú de CV se despliega por encima de los iconos sociales */}
          <motion.div variants={fadeUp} className="relative z-20 mt-9 flex flex-wrap items-center gap-3">
            <motion.a href="#proyectos" {...pressable} className={`group ${buttonStyles.primary}`}>
              {t.hero.ctaProjects}
              <ArrowDown
                className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
            </motion.a>
            <CvMenu />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <SocialLinks label={t.hero.social} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="order-first md:order-none"
        >
          <Portrait alt={t.hero.photoAlt} badge={t.hero.badge} />
        </motion.div>
      </div>

      <ScrollCue label={t.hero.scroll} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Retrato: recorte sin fondo que "sale" del marco + inclinación 3D     */
/* ------------------------------------------------------------------ */

function usePointerTilt() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.6 });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return { sx, sy, onPointerMove, onPointerLeave };
}

function useRange(value: MotionValue<number>, to: [number, number]) {
  return useTransform(value, [-0.5, 0.5], to);
}

function Portrait({ alt, badge }: { alt: string; badge: string }) {
  const [failed, setFailed] = useState(false);
  const { sx, sy, onPointerMove, onPointerLeave } = usePointerTilt();

  const rotateY = useRange(sx, [-8, 8]);
  const rotateX = useRange(sy, [6, -6]);
  // Capas a distinta profundidad: la foto se mueve más que el marco (parallax).
  const photoX = useRange(sx, [-14, 14]);
  const photoY = useRange(sy, [-8, 8]);
  const badgeX = useRange(sx, [-22, 22]);
  const badgeY = useRange(sy, [-14, 14]);
  const shineX = useRange(sx, [20, 80]);
  const shine = useTransform(
    shineX,
    (x) => `radial-gradient(420px circle at ${x}% 20%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)`,
  );

  return (
    <div className="relative mx-auto w-[250px] [perspective:1100px] sm:w-[300px] md:w-full md:max-w-[430px]">
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5]"
      >
        {/* Halo */}
        <div aria-hidden className="absolute inset-x-6 top-[22%] bottom-2 -z-10 rounded-[40px] bg-accent/25 blur-3xl" />

        {/* Marco con borde cónico animado */}
        <div aria-hidden className="portrait-ring absolute inset-x-0 top-[16%] bottom-0 rounded-[32px] p-px">
          <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-surface">
            <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_10%,color-mix(in_oklab,var(--accent-deep)_55%,transparent),transparent_75%)]" />
            <div className="hero-grid absolute inset-0 opacity-70" />
            <motion.div className="absolute inset-0" style={{ backgroundImage: shine }} />
          </div>
        </div>

        {/* Foto: recortada por los lados y abajo como el marco, pero la cabeza sobresale por arriba */}
        <div className="absolute inset-x-px top-0 bottom-px overflow-hidden rounded-b-[31px] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]">
          <motion.div className="absolute -inset-x-4 top-0 bottom-0" style={{ x: photoX, y: photoY }}>
            {failed ? (
              <Monogram />
            ) : (
              <Image
                src={siteConfig.avatarPath}
                alt={alt}
                fill
                preload
                sizes="(min-width: 768px) 430px, 300px"
                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgb(0_0_0/0.35)]"
                onError={() => setFailed(true)}
              />
            )}
          </motion.div>
        </div>

        {/* Etiqueta flotante */}
        <motion.div
          style={{ x: badgeX, y: badgeY }}
          className="absolute bottom-[10%] -left-3 sm:-left-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 1.1, duration: 0.5 },
              scale: { delay: 1.1, duration: 0.5, ease: EASE_OUT_EXPO },
              y: { delay: 1.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface/85 py-2 pr-4 pl-3 text-xs font-medium text-fg shadow-[0_16px_40px_-16px_rgb(var(--shadow)/0.6)] backdrop-blur-md sm:text-sm"
          >
            <span className="relative flex size-2">
              <span aria-hidden className="pulse-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {badge}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Monogram() {
  return (
    <div className="grid h-full w-full place-items-center pt-[16%]">
      <span className="text-[clamp(3.5rem,9vw,6rem)] font-semibold tracking-[-0.04em] text-fg/90 select-none">
        {siteConfig.initials}
        <span className="text-accent">.</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Indicador de scroll                                                  */
/* ------------------------------------------------------------------ */

function ScrollCue({ label }: { label: string }) {
  return (
    <motion.a
      href="#sobre-mi"
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-fg md:flex"
    >
      <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-line-strong transition-colors group-hover:border-accent/60">
        <motion.span
          className="mt-2 h-1.5 w-1 rounded-full bg-accent"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="text-[11px] tracking-[0.12em] uppercase">{label}</span>
    </motion.a>
  );
}
