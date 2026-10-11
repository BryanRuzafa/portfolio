"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección activa: la última cuyo borde superior
 * ha cruzado la línea de lectura (por defecto, el 40% del alto de la ventana).
 */
export function useScrollSpy(ids: readonly string[], readingLine = 0.4): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|");
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * readingLine;
      let current: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = sectionIds[sectionIds.length - 1] ?? current;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key, readingLine]);

  return active;
}
