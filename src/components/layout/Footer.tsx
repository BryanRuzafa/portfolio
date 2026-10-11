"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="text-sm text-fg">
            © <span className="tabular-nums">{year}</span> {siteConfig.name}. <span className="text-muted">{t.footer.rights}</span>
          </p>
          <p className="text-xs text-subtle">{t.footer.credits}</p>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <GithubIcon className="size-4" /> GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <LinkedinIcon className="size-4" /> LinkedIn
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <WhatsappIcon className="size-4" /> WhatsApp
          </a>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
          >
            {t.footer.backToTop}
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
