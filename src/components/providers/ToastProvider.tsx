"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type ToastVariant = "success" | "error" | "info";
type ToastFn = (message: string, variant?: ToastVariant) => void;

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

const ToastContext = createContext<ToastFn | null>(null);
const DURATION_MS = 2800;

const icons = {
  success: <CircleCheck className="size-4 shrink-0 text-success" strokeWidth={1.75} aria-hidden />,
  error: <CircleAlert className="size-4 shrink-0 text-danger" strokeWidth={1.75} aria-hidden />,
  info: <Info className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />,
} satisfies Record<ToastVariant, ReactNode>;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback<ToastFn>(
    (message, variant = "success") => {
      const id = ++nextId.current;
      setToasts((current) => [...current.slice(-2), { id, message, variant }]);
      window.setTimeout(() => dismiss(id), DURATION_MS);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-line bg-surface/95 px-4 py-2.5 text-sm text-fg shadow-[0_14px_36px_-14px_rgb(0_0_0/0.45)] backdrop-blur-md"
            >
              {icons[t.variant]}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastFn {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}
