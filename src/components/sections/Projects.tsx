"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import { projects, type Project } from "@/data/projects";
import { stagger, viewportOnce } from "@/lib/motion";

export function Projects() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(project);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    // Devuelve el foco al botón que abrió el diálogo.
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <Section id="proyectos" title={t.projects.title} intro={t.projects.intro}>
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 lg:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={open} />
        ))}
      </motion.div>

      <AnimatePresence>{selected ? <ProjectModal key={selected.id} project={selected} onClose={close} /> : null}</AnimatePresence>
    </Section>
  );
}
