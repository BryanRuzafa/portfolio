"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

/** Contenedor común de sección: ancla, encabezado accesible y revelado al hacer scroll. */
export function Section({ id, title, intro, children, className }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn("relative py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.header
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <motion.h2
            id={titleId}
            variants={fadeUp}
            className="text-3xl font-semibold tracking-[-0.03em] text-balance text-fg md:text-[2.5rem] md:leading-[1.1]"
          >
            {title}
          </motion.h2>
          {intro ? (
            <motion.p variants={fadeUp} className="mt-4 text-base text-pretty text-muted md:text-lg">
              {intro}
            </motion.p>
          ) : null}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
