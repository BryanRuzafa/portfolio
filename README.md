# bryanrg.dev

Mi portfolio personal: **[bryanrg.dev](https://bryanrg.dev)**

Una sola página en tres idiomas (ES · CA · EN) con mis proyectos, mi trayectoria y un contador en vivo de los ataques que bloquea mi servidor. La sirve mi propio homelab ([repo](https://github.com/BryanRuzafa/homelab)), detrás de Cloudflare, en un contenedor de solo lectura.

![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=fff) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=fff) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)

## Lo más interesante

- **Seguridad de verdad, no solo cabeceras.** Content-Security-Policy estricta con un *nonce* nuevo en cada petición ([`src/proxy.ts`](src/proxy.ts)): no se ejecuta ningún script sin él, ni siquiera inline. Además, HSTS, `frame-ancestors 'none'` y un contenedor `read_only` con `no-new-privileges`.
- **Contador de CrowdSec en vivo.** La tarjeta del homelab muestra las IPs bloqueadas en ese momento. Lee un JSON estático que el servidor regenera cada minuto y que solo contiene números: no hay ninguna API que exponga el servidor.
- **i18n tipado.** [`src/i18n/types.ts`](src/i18n/types.ts) define el contrato y los tres diccionarios lo implementan: si una traducción falta, la compilación falla.
- **SEO de persona.** JSON-LD `ProfilePage` + `Person`, sitemap con imágenes, Open Graph de perfil e imagen social generada en el servidor.
- **Formulario de contacto sin exponer mi correo.** Usa [Resend](https://resend.com), con validación en cliente y en servidor, honeypot anti-spam, límite de 5 envíos cada 10 minutos por IP y escapado de HTML.
- **Animaciones accesibles.** Un único sistema de variantes ([`src/lib/motion.ts`](src/lib/motion.ts)) que respeta la preferencia «reducir movimiento» del sistema. Tema claro y oscuro sin parpadeo inicial.

## Arrancar en local

```bash
npm install
cp .env.example .env.local   # opcional: sin clave, el formulario abre el cliente de correo
npm run dev                  # http://localhost:3000
```

Otros comandos: `npm run build`, `npm run typecheck`. Requiere Node.js 20 o superior.

## Estructura

```
src/
├─ proxy.ts             CSP con nonce por petición
├─ app/                 layout, página, API de contacto, sitemap, robots e imagen OG
├─ components/
│  ├─ sections/         Hero, About, Journey, Stack, Projects, Contact
│  ├─ projects/         tarjetas, modal de detalles y visuales animados de cada proyecto
│  ├─ layout/           navegación con scroll-spy, idioma, tema y footer
│  └─ ui/               piezas reutilizables
├─ config/site.ts       datos personales y enlaces
├─ data/projects.ts     datos de los proyectos que no dependen del idioma
├─ i18n/                contrato tipado + diccionarios es / ca / en
└─ lib/                 animaciones, JSON-LD y utilidades
deploy/                 script de despliegue y bloque de Nginx
```

## Despliegue

Imagen Docker *standalone* que solo escucha en `127.0.0.1:3000`, con Nginx del servidor delante como proxy HTTPS:

```bash
DEPLOY_HOST=usuario@servidor ./deploy/deploy.sh
```

El servidor necesita un `.env` con las variables de [`.env.example`](.env.example).
