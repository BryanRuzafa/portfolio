const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-60";

export const buttonStyles = {
  primary: `${base} h-11 px-5 bg-accent-deep text-white ring-1 ring-inset ring-white/10 shadow-[0_10px_30px_-12px_rgb(14_165_233/0.55)] hover:bg-[#1d4ed8] hover:shadow-[0_14px_36px_-12px_rgb(14_165_233/0.75)]`,
  secondary: `${base} h-11 px-5 border border-line-strong bg-surface/60 text-fg hover:border-accent/60 hover:bg-surface`,
  ghost: `${base} h-9 px-3.5 border border-line text-muted hover:border-accent/50 hover:text-fg`,
  icon: "inline-grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg",
} as const;
