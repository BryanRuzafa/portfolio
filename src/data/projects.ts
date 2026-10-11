import { siteConfig } from "@/config/site";

export type ProjectId = "adsum" | "kairos" | "sonaris" | "homelab" | "regalia";
export type ProjectVisualKind = "qr" | "catalog" | "audio" | "server" | "seats";

export interface LocalRun {
  /** Comandos a copiar, en orden. Uno por línea. */
  commands: readonly string[];
  /** Dirección en la que queda la app tras levantarla. */
  url: string;
  /** Qué hace falta para levantarlo: decide el texto de requisitos. Por defecto "docker". */
  needs?: "docker" | "node";
}

export interface Project {
  id: ProjectId;
  name: string;
  stack: readonly string[];
  /** Ilustración animada que se muestra si no hay vídeo. */
  visual: ProjectVisualKind;
  /** Repositorio de GitHub. Si es undefined, el botón no se muestra. */
  repo?: string;
  /** Segundo repositorio relacionado (p. ej. el código de esta web). */
  siteRepo?: string;
  /** Demo pública desplegada. Si es undefined, el botón no se muestra. */
  demo?: string;
  /** Vídeo loop (mp4/webm en /public/projects/). Sustituye a la ilustración. */
  video?: string;
  /** Instrucciones para clonar y levantar el proyecto con Docker. */
  run?: LocalRun;
  featured?: boolean;
  /** En los destacados, pone la ilustración a la derecha (alterna con el primero). */
  flip?: boolean;
}

const gh = siteConfig.links.github;

/**
 * Los textos (descripción, rol, etiqueta) viven en los diccionarios de i18n,
 * indexados por `id`. Aquí solo hay datos que no se traducen.
 */
export const projects: readonly Project[] = [
  {
    id: "adsum",
    name: "ADSUM",
    stack: ["NestJS", "Vue 3", "Docker", "Docker Compose", "MySQL", "WebSockets", "PWA"],
    visual: "qr",
    repo: `${gh}/ADSUM`,
    // video: "/projects/adsum.mp4",
    run: {
      commands: [`git clone ${gh}/ADSUM.git && cd ADSUM`, "docker compose up -d"],
      url: "http://localhost:3001",
    },
    featured: true,
  },
  {
    id: "homelab",
    name: "HOMELAB",
    stack: ["Debian Linux", "Docker Compose", "Tailscale (WireGuard)", "nftables", "CrowdSec", "Cloudflare", "Nginx", "Let's Encrypt", "restic + Google Drive", "Uptime Kuma", "n8n", "WAHA (WhatsApp)", "Whisper", "Vaultwarden", "AdGuard Home", "Python", "Web Crypto API", "systemd"],
    visual: "server",
    featured: true,
    flip: true,
    // Repos públicos saneados: sin IPs, secretos ni datos. Sin demo: los servicios son privados.
    repo: `${gh}/homelab`,
    siteRepo: `${gh}/portfolio`,
  },
  {
    id: "sonaris",
    name: "SONARIS",
    stack: ["Vue 3", "Node.js", "Express", "Prisma", "MySQL", "Socket.io", "Spotify Web API", "Ticketmaster API", "OAuth 2.0", "Gemini AI", "Tailwind CSS"],
    visual: "audio",
    repo: `${gh}/SONARIS`,
    // Sin Docker: servidor (Express + Prisma) y cliente (Vite) por separado. Necesita MySQL y server/.env (ver README).
    run: {
      needs: "node",
      commands: [
        `git clone ${gh}/SONARIS.git && cd SONARIS`,
        "cd server && npm install && npx prisma migrate deploy && npm run dev",
        "cd client && npm install && npm run dev",
      ],
      url: "http://localhost:5173",
    },
  },
  {
    id: "regalia",
    name: "TEATRE REGALIA",
    stack: ["Laravel 12", "PHP", "Node.js", "Socket.IO", "Nuxt 4", "Pinia"],
    visual: "seats",
    repo: `${gh}/TEATRE-REGALIA`,
  },
  {
    id: "kairos",
    name: "KAIROS",
    stack: ["Vue 3", "Pinia", "PHP 8.1", "MySQL", "Docker", "Nginx", "Scrum"],
    visual: "catalog",
    featured: true,
    repo: `${gh}/KAIROS`,
    run: {
      commands: [`git clone ${gh}/KAIROS.git && cd KAIROS`, "docker compose up -d"],
      url: "http://localhost",
    },
  },
];
