"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Copy, Terminal } from "lucide-react";
import { useId, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useToast } from "@/components/providers/ToastProvider";
import type { LocalRun } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, copyToClipboard } from "@/lib/utils";

/**
 * Desplegable "Ejecutar en local": los comandos para clonar el repo y levantarlo
 * (con Docker o con Node, según run.needs), cada uno con su botón de copiar, y la URL donde queda la app.
 */
export function CommandSnippet({ run, defaultOpen = false }: { run: LocalRun; defaultOpen?: boolean }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <Terminal className="size-4 text-accent-text" strokeWidth={1.75} aria-hidden />
        {t.projects.runLocal}
        <ChevronDown
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <div className="mt-3 overflow-hidden rounded-xl border border-line bg-bg">
              {/* Barra de terminal */}
              <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
                <span className="size-2 shrink-0 rounded-full bg-line-strong" />
                <span className="size-2 shrink-0 rounded-full bg-line-strong" />
                <span className="size-2 shrink-0 rounded-full bg-line-strong" />
                <span className="ml-2 text-xs leading-snug text-subtle">{t.projects.requires[run.needs ?? "docker"]}</span>
              </div>

              <ol className="divide-y divide-line">
                {run.commands.map((command, i) => (
                  <CommandLine key={i} index={i + 1} command={command} />
                ))}
              </ol>

              <p className="flex items-center gap-1.5 border-t border-line px-3.5 py-2.5 text-xs text-subtle">
                {t.projects.openAt}
                <a
                  href={run.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-mono text-accent-text hover:underline"
                >
                  {run.url.replace(/^https?:\/\//, "")}
                  <ArrowUpRight className="size-3" strokeWidth={2} aria-hidden />
                </a>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CommandLine({ index, command }: { index: number; command: string }) {
  const { t } = useLanguage();
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(command);
    if (!ok) {
      toast(t.toast.copyFailed, "error");
      return;
    }
    setCopied(true);
    toast(t.toast.commandCopied);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <li className="group/line flex items-center gap-3 py-2 pr-2 pl-3.5">
      <span className="w-3 shrink-0 font-mono text-xs text-subtle tabular-nums select-none">{index}</span>
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] whitespace-nowrap text-fg [scrollbar-width:none]">
        <span className="text-accent-text select-none">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${t.projects.copyCommand}: ${command}`}
        title={t.projects.copyCommand}
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md border text-muted transition-colors",
          copied ? "border-success/50" : "border-line hover:border-accent/50 hover:text-fg",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {copied ? (
              <Check className="size-3.5 text-success" strokeWidth={2} aria-hidden />
            ) : (
              <Copy className="size-3.5" strokeWidth={1.75} aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </li>
  );
}
