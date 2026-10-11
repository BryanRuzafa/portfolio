"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { ProjectVisualKind } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, seededRandom } from "@/lib/utils";

/**
 * Ilustraciones animadas ligeras (DOM/CSS, sin canvas ni librerías 3D)
 * que resumen la idea de cada proyecto cuando no hay vídeo.
 * Solo se animan mientras están en pantalla.
 */
export function ProjectVisual({ kind, className }: { kind: ProjectVisualKind; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative grid h-full w-full place-items-center overflow-hidden bg-bg",
        "bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--accent-deep)_22%,transparent),transparent_70%)]",
        className,
      )}
    >
      <div className="hero-grid absolute inset-0 opacity-70" />
      {kind === "qr" ? <QrVisual active={inView} /> : null}
      {kind === "catalog" ? <CatalogVisual active={inView} /> : null}
      {kind === "audio" ? <AudioVisual active={inView} /> : null}
      {kind === "server" ? <ServerVisual active={inView} /> : null}
      {kind === "seats" ? <SeatsVisual active={inView} /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ADSUM — QR dinámico que se regenera y una línea de escaneo           */
/* ------------------------------------------------------------------ */

const QR_SIZE = 21;

function isFinder(x: number, y: number) {
  const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
  return inBox(0, 0) || inBox(QR_SIZE - 7, 0) || inBox(0, QR_SIZE - 7);
}

function finderOn(x: number, y: number) {
  const lx = x % (QR_SIZE - 7) === x ? x : x - (QR_SIZE - 7);
  const ly = y % (QR_SIZE - 7) === y ? y : y - (QR_SIZE - 7);
  const edge = lx === 0 || lx === 6 || ly === 0 || ly === 6;
  const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
  return edge || core;
}

function buildQr(seed: number): boolean[] {
  const rand = seededRandom(seed);
  const cells: boolean[] = [];
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      cells.push(isFinder(x, y) ? finderOn(x, y) : rand() > 0.52);
    }
  }
  return cells;
}

function QrVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [seed, setSeed] = useState(7);
  const cells = useMemo(() => buildQr(seed), [seed]);

  useEffect(() => {
    if (!active || reduce) return;
    const id = window.setInterval(() => setSeed((s) => s + 1), 2200);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  return (
    <div className="relative rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-30px_rgb(var(--shadow)/0.6)]">
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${QR_SIZE}, minmax(0, 1fr))`, width: "clamp(140px, 22vw, 188px)" }}
      >
        {cells.map((on, i) => (
          <span
            key={i}
            className="aspect-square rounded-[1.5px] bg-fg transition-opacity duration-500"
            style={{ opacity: on ? 0.92 : 0.06 }}
          />
        ))}
      </div>
      {!reduce ? (
        <motion.span
          className="absolute inset-x-3 h-px bg-accent shadow-[0_0_12px_2px_rgb(14_165_233/0.6)]"
          initial={{ top: "12%" }}
          animate={active ? { top: ["12%", "88%", "12%"] } : undefined}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        />
      ) : null}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-subtle">
        <span>qr.rotate()</span>
        <span className="tabular-nums">ttl 30s</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* KAIROS — catálogo con filtros dinámicos                             */
/* ------------------------------------------------------------------ */

const CATEGORIES = ["STEM", "Arte", "Digital"] as const;
const WORKSHOPS: { cat: (typeof CATEGORIES)[number]; w: number }[] = [
  { cat: "STEM", w: 72 },
  { cat: "Arte", w: 58 },
  { cat: "Digital", w: 80 },
  { cat: "STEM", w: 64 },
  { cat: "Digital", w: 52 },
  { cat: "Arte", w: 76 },
];

function CatalogVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const filter = CATEGORIES[index % CATEGORIES.length];
  const visible = WORKSHOPS.map((w, i) => ({ ...w, id: i })).filter((w) => w.cat === filter || index % 4 === 3);

  useEffect(() => {
    if (!active || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % 4), 1900);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  return (
    <div className="relative w-[min(86%,340px)] rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-30px_rgb(var(--shadow)/0.6)]">
      <div className="flex gap-1.5">
        {CATEGORIES.map((c, i) => {
          const on = index % 4 === i;
          return (
            <span
              key={c}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-300",
                on ? "border-accent/60 bg-accent/10 text-accent-text" : "border-line text-subtle",
              )}
            >
              {c}
            </span>
          );
        })}
      </div>
      <motion.ul layout className="mt-3 grid min-h-[132px] grid-cols-2 content-start gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((w) => (
            <motion.li
              key={w.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="rounded-lg border border-line bg-bg p-2.5"
            >
              <span className="block h-1.5 rounded-full bg-fg/70" style={{ width: `${w.w}%` }} />
              <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-fg/15" />
              <span className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] text-subtle">{w.cat}</span>
                <span className="h-3.5 w-8 rounded-full bg-accent-deep/90" />
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SONARIS — ecualizador de métricas de audio                          */
/* ------------------------------------------------------------------ */

const BARS = (() => {
  const rand = seededRandom(42);
  return Array.from({ length: 32 }, () => ({
    duration: 0.7 + rand() * 0.9,
    delay: -rand() * 1.5,
    height: 35 + rand() * 65,
  }));
})();

function AudioVisual({ active }: { active: boolean }) {
  return (
    <div className="relative w-[min(86%,360px)] rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-30px_rgb(var(--shadow)/0.6)]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="size-6 rounded-md bg-linear-to-br from-accent to-accent-deep" />
          <span className="space-y-1">
            <span className="block h-1.5 w-20 rounded-full bg-fg/70" />
            <span className="block h-1.5 w-12 rounded-full bg-fg/15" />
          </span>
        </span>
        <span className="font-mono text-[10px] text-subtle tabular-nums">128 BPM</span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-[3px]">
        {BARS.map((bar, i) => (
          <span
            key={i}
            className="eq-bar flex-1 rounded-t-[2px] bg-linear-to-t from-accent-deep to-accent"
            style={
              {
                height: `${bar.height}%`,
                "--d": `${bar.duration}s`,
                "--delay": `${bar.delay}s`,
                animationPlayState: active ? "running" : "paused",
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-subtle">
        {["energy", "valence", "dance"].map((m, i) => (
          <span key={m} className="space-y-1">
            <span className="block font-mono">{m}</span>
            <span className="block h-1 rounded-full bg-line">
              <span className="block h-full rounded-full bg-accent/80" style={{ width: `${[78, 54, 66][i]}%` }} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HOMELAB — servidor con servicios en línea y ataques bloqueados       */
/* ------------------------------------------------------------------ */

const SERVICES = [
  { name: "vault", w: 64 },
  { name: "agenda", w: 52 },
  { name: "assistant", w: 70 },
  { name: "backups", w: 46 },
] as const;

/** Cifras reales de CrowdSec que publica el servidor cada minuto (sin IPs ni detalles). */
function useCrowdsecBlocked() {
  const [value, setValue] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/stats/crowdsec.json", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d && typeof d.blocked === "number") setValue(d.blocked);
        })
        .catch(() => {});
    load();
    const id = window.setInterval(load, 60_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);
  return value;
}

function ServerVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const target = useCrowdsecBlocked();
  const [shown, setShown] = useState<number | null>(null);
  const [hit, setHit] = useState(-1);
  const shownRef = useRef<number | null>(null);

  // El número va del valor mostrado al real con una transición corta; los puntos rojos solo
  // se encienden cuando el contador sube de verdad (no hay subidas simuladas).
  useEffect(() => {
    if (target === null) return;
    const from = shownRef.current;
    if (from === null || reduce || !active) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    if (target > from) setHit((h) => (h + 1) % 3);
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      const v = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      shownRef.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, reduce]);

  useEffect(() => {
    if (hit < 0) return;
    const id = window.setTimeout(() => setHit(-1), 1200);
    return () => window.clearTimeout(id);
  }, [hit]);

  return (
    <div className="relative flex w-[min(90%,380px)] items-center gap-3">
      {/* tráfico entrante: se enciende cuando CrowdSec bloquea IPs nuevas */}
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="relative block h-px w-12 bg-line">
            <span
              className={cn(
                "absolute -top-[3px] right-0 size-[7px] rounded-full bg-danger transition-opacity duration-500",
                hit === i ? "opacity-100" : "opacity-0",
              )}
            />
          </span>
        ))}
      </div>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent-text">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </span>
      <div className="flex-1 rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-30px_rgb(var(--shadow)/0.6)]">
        <ul className="space-y-2.5">
          {SERVICES.map((s, i) => (
            <li key={s.name} className="flex items-center gap-2.5">
              <span
                className={cn("size-2 rounded-full bg-success", active && !reduce && "animate-pulse")}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
              <span className="h-1.5 rounded-full bg-fg/60" style={{ width: `${s.w}%` }} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] text-subtle">
          <span className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", shown === null ? "bg-line" : "bg-success")} />
            crowdsec · live
          </span>
          <span className="tabular-nums text-fg/80">{shown === null ? "—" : `${shown.toLocaleString("es-ES")} blocked`}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TEATRE REGALIA — mapa de butacas que se bloquean en tiempo real      */
/* ------------------------------------------------------------------ */

const SEAT_ROWS = 6;
const SEAT_COLS = 10;
type SeatState = "free" | "locked" | "sold";

function initialSeats(): SeatState[] {
  const rand = seededRandom(11);
  return Array.from({ length: SEAT_ROWS * SEAT_COLS }, () => (rand() < 0.28 ? "sold" : "free"));
}

function SeatsVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [seats, setSeats] = useState<SeatState[]>(initialSeats);

  useEffect(() => {
    if (!active || reduce) return;
    const rand = seededRandom(Date.now() % 1000);
    const id = window.setInterval(() => {
      setSeats((prev) => {
        const next = [...prev];
        // una butaca bloqueada se vende o se libera…
        const locked = next.flatMap((s, i) => (s === "locked" ? [i] : []));
        if (locked.length && rand() < 0.6) {
          const i = locked[Math.floor(rand() * locked.length)];
          next[i] = rand() < 0.7 ? "sold" : "free";
        }
        // …y otro usuario bloquea una libre al momento
        const free = next.flatMap((s, i) => (s === "free" ? [i] : []));
        if (free.length > 6) next[free[Math.floor(rand() * free.length)]] = "locked";
        else return initialSeats();
        return next;
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  return (
    <div className="relative w-[min(86%,340px)] rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-30px_rgb(var(--shadow)/0.6)]">
      <span className="mx-auto mb-4 block h-1.5 w-3/5 rounded-full bg-linear-to-r from-transparent via-fg/40 to-transparent" />
      <div className="grid gap-[5px]" style={{ gridTemplateColumns: `repeat(${SEAT_COLS}, minmax(0, 1fr))` }}>
        {seats.map((state, i) => (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-t-[5px] rounded-b-[2px] border transition-colors duration-500",
              state === "free" && "border-line bg-bg",
              state === "locked" && "border-accent bg-accent/30 shadow-[0_0_10px_rgb(14_165_233/0.45)]",
              state === "sold" && "border-transparent bg-fg/70",
            )}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-subtle">
        <span>socket.io · seat:lock</span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-[2px] border border-line bg-bg" />
          <span className="size-2 rounded-[2px] bg-accent/60" />
          <span className="size-2 rounded-[2px] bg-fg/70" />
        </span>
      </div>
    </div>
  );
}
