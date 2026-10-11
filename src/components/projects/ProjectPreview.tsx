"use client";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

/** Vídeo en loop si el proyecto lo tiene; si no, su ilustración animada. */
export function ProjectPreview({ project, label, className }: { project: Project; label: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-line", className)}>
      {project.video ? (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${label}: ${project.name}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <ProjectVisual kind={project.visual} />
      )}
    </div>
  );
}
