"use client";

import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/buttonStyles";
import type { Project } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { CommandSnippet } from "./CommandSnippet";
import { ProjectPreview } from "./ProjectPreview";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/**
 * Diálogo accesible: bloquea el scroll, atrapa el foco, cierra con Escape
 * o clic fuera, y devuelve el foco al botón que lo abrió (lo gestiona el padre).
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.id];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `modal-${project.id}-title`;

  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div aria-hidden className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={onClose} />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-[0_40px_120px_-40px_rgb(var(--shadow)/0.7)] sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface/90 px-5 py-4 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-3">
            <h3 id={titleId} className="text-xl font-semibold tracking-[-0.03em] text-fg">
              {project.name}
            </h3>
            <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{copy.tag}</span>
            {copy.period ? <span className="hidden text-sm text-subtle tabular-nums sm:inline">{copy.period}</span> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.close}
            className={`${buttonStyles.icon} size-9`}
          >
            <X className="size-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="space-y-7 p-5 sm:p-7">
          <ProjectPreview project={project} label={t.projects.preview} className="aspect-[16/9]" />

          <p className="text-lg leading-relaxed text-pretty text-muted">{copy.description}</p>

          <div>
            <p className="text-sm font-medium text-fg">{t.projects.role}</p>
            <p className="mt-2 leading-relaxed text-pretty text-muted">{copy.role}</p>
          </div>

          {copy.details?.length ? (
            <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              {copy.details.map((d) => (
                <div key={d.title}>
                  <p className="text-sm font-medium text-fg">{d.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-pretty text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div>
            <p className="text-sm font-medium text-fg">{t.projects.stack}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-md border border-line bg-bg/60 px-2.5 py-1 text-sm text-fg/85">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.run ? <CommandSnippet run={project.run} defaultOpen /> : null}

          {project.repo || project.demo ? (
            <div className="flex flex-wrap gap-3 border-t border-line pt-6">
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                  <GithubIcon className="size-4" />
                  {t.projects.code}
                </a>
              ) : null}
              {project.siteRepo ? (
                <a href={project.siteRepo} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                  <GithubIcon className="size-4" />
                  {t.projects.siteCode}
                </a>
              ) : null}
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
                  <ExternalLink className="size-4" strokeWidth={1.75} aria-hidden />
                  {t.projects.demo}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
