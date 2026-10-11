"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { GlowCard } from "@/components/ui/GlowCard";
import { buttonStyles } from "@/components/ui/buttonStyles";
import type { Project } from "@/data/projects";
import { pressable } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CommandSnippet } from "./CommandSnippet";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.id];
  const featured = Boolean(project.featured);

  return (
    <GlowCard
      className={cn(featured && "lg:col-span-2")}
      innerClassName={cn(
        "flex flex-col gap-6 p-4 sm:p-5",
        featured && "lg:grid lg:gap-10 lg:p-6",
        featured && (project.flip ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"),
      )}
    >
      <ProjectPreview
        project={project}
        label={t.projects.preview}
        className={cn("aspect-[16/10]", featured && "lg:aspect-auto lg:min-h-[380px]", featured && project.flip && "lg:order-2")}
      />

      <div className={cn("flex flex-1 flex-col px-1 pb-1", featured && "lg:py-2")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-fg">{project.name}</h3>
            {copy.period ? <p className="mt-0.5 text-sm text-subtle tabular-nums">{copy.period}</p> : null}
          </div>
          <span className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{copy.tag}</span>
        </div>

        <p className="mt-3 leading-relaxed text-pretty text-muted">{copy.description}</p>

        <ul aria-label={t.projects.stack} className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md border border-line bg-bg/60 px-2 py-1 text-xs text-fg/80">
              {tech}
            </li>
          ))}
        </ul>

        {featured ? (
          <div className="mt-6 border-t border-line pt-5">
            <p className="text-sm font-medium text-fg">{t.projects.role}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted">{copy.role}</p>
          </div>
        ) : null}

        <div className="mt-auto flex flex-col gap-4 pt-6">
          {project.run ? <CommandSnippet run={project.run} /> : null}

          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              type="button"
              {...pressable}
              onClick={(e) => onOpen(project, e.currentTarget)}
              className={cn("group", buttonStyles.ghost, "text-fg")}
            >
              {t.projects.details}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
            </motion.button>
            {project.repo ? (
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                {...pressable}
                className={buttonStyles.ghost}
              >
                <GithubIcon className="size-3.5" />
                {t.projects.code}
              </motion.a>
            ) : null}
            {project.demo ? (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                {...pressable}
                className={buttonStyles.ghost}
              >
                <ExternalLink className="size-3.5" strokeWidth={1.75} aria-hidden />
                {t.projects.demo}
              </motion.a>
            ) : null}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
