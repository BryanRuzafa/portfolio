"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { pressable } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./BrandIcons";
import { buttonStyles } from "./buttonStyles";

/** Chat de WhatsApp (web o app, según el dispositivo) con el número de empresa. */
export const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsapp}`;

export const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "WhatsApp", href: whatsappUrl, Icon: WhatsappIcon, external: true, detail: siteConfig.phone.display },
  { label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail, external: false },
] as const;

export function SocialLinks({ label, className }: { label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn("flex items-center gap-2", className)}>
      {socialLinks.map(({ label: name, href, Icon, external }) => (
        <li key={name}>
          <motion.a
            href={href}
            aria-label={name}
            title={name}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            {...pressable}
            whileHover={{ scale: 1.08, y: -1 }}
            className={buttonStyles.icon}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
