"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/#$%&*";

interface ScrambleTextProps {
  text: string;
  /** Retraso antes de empezar (ms). */
  delay?: number;
  /** Duración total del descifrado (ms). */
  duration?: number;
}

/**
 * Texto que se "descifra" de izquierda a derecha.
 * El servidor renderiza el texto final (SEO, sin JS) y los lectores de pantalla leen siempre el texto real.
 */
export function ScrambleText({ text, delay = 0, duration = 1100 }: ScrambleTextProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    let start = 0;
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / duration);
        const revealed = Math.floor(progress * text.length);
        let next = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          next += i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(next);
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [text, delay, duration, reduce]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </>
  );
}
