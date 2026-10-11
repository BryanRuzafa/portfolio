"use client";

import { motion } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Eleva ligeramente la tarjeta al pasar el ratón. */
  lift?: boolean;
}

/**
 * Tarjeta con borde de 1px que se ilumina siguiendo al cursor.
 * El efecto vive en CSS (.glow-card); aquí solo se actualizan --x / --y.
 * Participa en el `stagger` del contenedor padre mediante la variante fadeUp.
 */
export function GlowCard({ children, className, innerClassName, lift = true }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onPointerMove={handlePointerMove}
      whileHover={lift ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("glow-card relative rounded-2xl p-px", className)}
    >
      <div className={cn("glow-card-inner relative h-full rounded-[15px] bg-surface", innerClassName)}>{children}</div>
    </motion.div>
  );
}
