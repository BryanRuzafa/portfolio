import type { Transition, Variants } from "framer-motion";

/**
 * Sistema de movimiento del portfolio.
 * Una sola curva (ease-out exponencial) para todo: entra rápido, se posa despacio.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = { duration: 0.7, ease: EASE_OUT_EXPO };

/**
 * Revelado estándar al entrar en viewport: sube un poco y gana opacidad.
 * Corto y sin desenfoque para que, al hacer scroll rápido, el contenido nunca se vea borroso ni vacío.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay } }),
};

/** Contenedor que escalona a sus hijos. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Revelado con máscara para el titular del hero (cada palabra sube desde detrás de su línea). */
export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.95, ease: EASE_OUT_EXPO } },
};

/** Badges y chips: entrada corta y ligera. */
export const chip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

/** Viewport por defecto para whileInView: se dispara una sola vez, algo antes del borde inferior. */
export const viewportOnce = { once: true, margin: "0px 0px 8% 0px" } as const;

/** Micro-interacciones compartidas por botones y tarjetas. */
export const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 28 },
} as const;
