"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LanguageProvider } from "./LanguageProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

/** nonce: el de la CSP de esta petición; Framer Motion lo pone en los <style> que inyecta (popLayout). */
export function Providers({ children, nonce }: { children: ReactNode; nonce?: string }) {
  return (
    // reducedMotion="user": respeta "reducir movimiento" del sistema operativo en todas las animaciones.
    <MotionConfig reducedMotion="user" nonce={nonce}>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>{children}</ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
