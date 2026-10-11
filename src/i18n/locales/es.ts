import type { Dictionary } from "../types";

export const es: Dictionary = {
  meta: {
    title: "Bryan Ruzafa Gonçalves · Full-Stack Developer",
    description:
      "Full-Stack Developer y estudiante de Ciberseguridad. Aplicaciones web sólidas, eficientes y seguras, de la infraestructura a la interfaz.",
  },
  nav: {
    skip: "Saltar al contenido",
    about: "Sobre mí",
    journey: "Trayectoria",
    experience: "Experiencia",
    stack: "Stack",
    projects: "Proyectos",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toDark: "Cambiar a modo oscuro",
    toLight: "Cambiar a modo claro",
    language: "Idioma",
    home: "Inicio",
  },
  hero: {
    role: "Full-Stack Developer & Cybersecurity Student",
    tagline:
      "Construyendo aplicaciones web sólidas, eficientes y seguras desde la base de la infraestructura hasta la interfaz final.",
    ctaProjects: "Ver proyectos",
    ctaCv: "Descargar CV",
    photoAlt: "Bryan Ruzafa Gonçalves, Full-Stack Developer y estudiante de Ciberseguridad",
    social: "Redes y contacto",
    cvMenu: "Elige el idioma del CV",
    badge: "Especialización en Ciberseguridad",
    scroll: "Desplázate",
    availability: "Disponible · Barcelona · Presencial, híbrido o remoto",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Mi base técnica no empezó picando código, sino administrando infraestructura en **Sistemas Microinformáticos y Redes (SMR)**: servidores Linux, redes, protocolos y virtualización. Entender primero la máquina y las comunicaciones cambió por completo mi forma de programar: no tiro código a ciegas, sé exactamente qué recursos consume el servidor, cómo viajan los paquetes y cómo responde el sistema operativo a cada petición.",
      "Para unir esa base con el desarrollo de software cursé el Grado Superior en **Desarrollo de Aplicaciones Web (DAW)**. Esto me permite cubrir el stack completo sin aislar el código del entorno donde corre.",
      "Actualmente curso la **Especialización en Ciberseguridad** en el Institut Esteve Terradas i Illa con un objetivo claro: aplicar desarrollo seguro desde el minuto uno (bastionado, DevSecOps y prevención de vulnerabilidades OWASP), evitando parches de última hora.",
    ],
    path: [
      { label: "Infraestructura", detail: "SMR" },
      { label: "Software", detail: "DAW" },
      { label: "Seguridad", detail: "Ciberseguridad" },
    ],
    facts: [
      { label: "Ubicación", value: "Sant Sadurní d'Anoia (Barcelona)" },
      { label: "Idiomas", value: "Castellano y catalán nativos · Inglés B2" },
      { label: "Carnet", value: "A1, A2 y B, con vehículo propio" },
    ],
  },
  journey: {
    title: "Trayectoria académica",
    intro: "De la infraestructura al código, y del código a la seguridad.",
    current: "En curso",
    done: "Completado",
    focus: "Foco",
    items: [
      {
        title: "Especialización en Ciberseguridad en Entornos de las TI",
        center: "Institut Esteve Terradas i Illa",
        status: "current",
        period: "2026 – actualidad",
        description:
          "Formación especializada en proteger sistemas y aplicaciones: desde el bastionado de servidores y la seguridad integrada en el ciclo DevSecOps hasta el análisis forense y el hacking ético para detectar vulnerabilidades antes que un atacante.",
        focus: [
          "Bastionado de servidores",
          "DevSecOps",
          "Auditorías",
          "Prevención de vulnerabilidades OWASP",
          "Análisis forense",
          "Hacking ético",
        ],
      },
      {
        title: "CFGS Desarrollo de Aplicaciones Web (DAW)",
        center: "INS Pedralbes",
        status: "done",
        period: "2024 – 2026",
        description:
          "Desarrollo de aplicaciones web completas: diseño de APIs REST, interfaces reactivas con frameworks modernos, bases de datos relacionales y despliegue en contenedores Docker.",
        focus: ["Arquitectura full-stack", "APIs REST", "Aplicaciones reactivas", "Despliegue en contenedores"],
      },
      {
        title: "CFGM Sistemas Microinformáticos y Redes (SMR)",
        center: "Institut Eugeni d'Ors",
        status: "done",
        period: "2022 – 2024",
        note: "Nota media: 8,47",
        description:
          "La base técnica: montaje y mantenimiento de equipos, configuración de redes locales, administración de sistemas Linux y Windows y virtualización de servidores.",
        focus: ["Infraestructura de redes", "Administración Linux / Windows", "Virtualización", "Hardware"],
      },
    ],
  },
  experience: {
    title: "Experiencia",
    intro: "Soporte IT en un entorno corporativo real: usuarios, sistemas y redes.",
    items: [
      {
        role: "Técnico de Soporte IT (Prácticas)",
        company: "Raventós Codorníu",
        period: "Octubre 2023 – Junio 2024",
        tag: "IT",
        bullets: [
          "Soporte IT de nivel 1 y 2 a usuarios internos en la sede corporativa.",
          "Resolución de 20-30 incidencias semanales de hardware, software y conectividad mediante la herramienta de ticketing interna.",
          "Preparación, maquetación y despliegue de 5-10 portátiles por semana en Windows y Linux.",
          "Gestión básica de usuarios y permisos en Active Directory y diagnóstico de problemas de red local.",
          "Documentación de procedimientos técnicos y mantenimiento preventivo de equipos.",
        ],
      },
    ],
  },
  stack: {
    title: "Stack técnico",
    intro: "Herramientas con las que construyo, despliego y aseguro aplicaciones.",
    groups: [
      { key: "frontend", title: "Frontend", items: ["Vue 3", "Nuxt", "Pinia", "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
      { key: "backend", title: "Backend & APIs", items: ["NestJS", "Laravel", "Node.js", "Express", "Socket.IO", "PHP", "REST APIs", "WebSockets"] },
      { key: "data", title: "Bases de datos", items: ["PostgreSQL", "MariaDB / MySQL", "Prisma", "TypeORM", "Optimización relacional"] },
      {
        key: "devops",
        title: "DevOps, Sistemas & Seguridad",
        items: ["Docker", "Docker Compose", "Linux", "Windows", "Redes LAN", "Git", "GitHub", "Scrum", "OWASP", "Hardening", "Nginx", "nftables", "CrowdSec", "Tailscale (WireGuard)", "Cloudflare", "Copias cifradas (restic)", "Monitorización (Uptime Kuma)", "Automatización (n8n)"],
      },
    ],
    certsTitle: "Certificaciones",
    certs: [
      { name: "CCNA Routing and Switching: Introducción a las redes", issuer: "Cisco Networking Academy" },
      { name: "CCNA Routing and Switching: Principios básicos de routing y switching", issuer: "Cisco Networking Academy" },
    ],
  },
  projects: {
    title: "Proyectos destacados",
    intro: "Trabajo real, en equipo y en solitario, con la arquitectura explicada.",
    role: "Mi rol",
    stack: "Stack",
    code: "Código",
    siteCode: "Código de esta web",
    demo: "Demo",
    details: "Ver detalles",
    close: "Cerrar",
    runLocal: "Ejecutar en local",
    copyCommand: "Copiar comando",
    requires: {
      docker: "Requiere Git y Docker. Copia y pega estas dos líneas:",
      node: "Requiere Node.js 18+, MySQL y un server/.env con tus claves de Spotify y Gemini (ver README). Lanza las líneas 2 y 3 en terminales distintas:",
    },
    openAt: "Después abre",
    preview: "Vista previa",
    items: {
      adsum: {
        tag: "Proyecto final DAW · Equipo",
        period: "feb. – may. 2026",
        description:
          "Plataforma web y PWA para control de asistencia automatizado mediante verificación de QR dinámico y módulo integral de gestión de incidencias escolares.",
        role: "Diseño e implementación de la arquitectura backend con NestJS, endpoints seguros para autenticación y QR, y orquestación con Docker. Proyecto en equipo de DAW.",
      },
      kairos: {
        tag: "Equipo DAW · Scrum",
        description:
          "Plataforma para el Programa ENGINY del Consorci d'Educació de Barcelona: conecta centros educativos con talleres vocacionales y gestiona todo el ciclo, de la solicitud y la asignación de plazas a la calendarización y el feedback.",
        role: "Catálogo de talleres con su CRUD completo, sistema de asignación de talleres a centros (API en PHP e interfaz en Vue) y frontend de la página de inicio y del feedback del alumnado. Equipo de 4 con Scrum (Taiga).",
      },
      sonaris: {
        tag: "Proyecto individual DAW",
        description:
          "Aplicación full-stack conectada a tu cuenta de Spotify: estadísticas de escucha, un diario emocional que recomienda la canción del momento con IA (Gemini), salas en tiempo real para descubrir música en pareja, un radar semanal que crea playlists de artistas emergentes y un generador de carteles de festival.",
        role: "Proyecto individual de principio a fin: API REST con Express y Prisma sobre MySQL, OAuth 2.0 con Spotify, WebSockets con Socket.io para las salas, tareas programadas con node-cron e integración de Gemini, Ticketmaster y OpenWeather.",
      },
      regalia: {
        tag: "Trabajo de investigación DAW",
        description:
          "Plataforma de venta de entradas que resuelve un problema real de concurrencia: dos usuarios nunca pueden reservar ni comprar la misma butaca a la vez. Las butacas se bloquean y se sincronizan en tiempo real entre todos los usuarios conectados.",
        role: "Proyecto individual de principio a fin: API REST en Laravel 12 con tests de funcionalidad, servidor de tiempo real independiente en Node.js + Socket.IO y frontend en Nuxt 4 + Pinia.",
      },
      homelab: {
        tag: "Proyecto personal",
        period: "ago. 2026 – act.",
        description:
          "Mi propio servidor en la nube, montado y asegurado por mí. Aloja esta web y, en privado, las herramientas que uso cada día: gestor de contraseñas, documentos cifrados, una agenda con asistente de WhatsApp y automatizaciones.",
        role: "Todo de principio a fin: administración del servidor Linux, contenedores Docker, red privada, firewall, detección de intrusiones, copias cifradas y monitorización, además de dos aplicaciones propias: una bóveda de documentos con cifrado de extremo a extremo y una agenda con asistente.",
        details: [
          {
            title: "Acceso solo desde mis dispositivos",
            body: "Las herramientas personales no están abiertas a Internet. Solo se puede llegar a ellas desde mis propios dispositivos (portátil, móvil…) a través de una red privada cifrada con WireGuard. Para cualquier otra persona, sencillamente no existen.",
          },
          {
            title: "Seguridad por capas",
            body: "Un firewall que lo bloquea todo por defecto, la web accesible solo a través de Cloudflare para ocultar la dirección real del servidor, detección de intrusiones con CrowdSec y una lista colaborativa de miles de IPs maliciosas, y administración únicamente con clave criptográfica.",
          },
          {
            title: "Datos cifrados de verdad",
            body: "He programado una bóveda de documentos que cifra cada archivo en el navegador (AES-256) antes de subirlo. El servidor solo guarda datos ilegibles: sin la contraseña, nadie puede abrirlos, ni siquiera yo desde el servidor.",
          },
          {
            title: "Un asistente por WhatsApp",
            body: "Le escribo o le mando una nota de voz y lo apunta: citas que se sincronizan con Google Calendar, entregas de clase, tareas, ideas y gastos. La voz se transcribe en el propio servidor y las automatizaciones están construidas con n8n.",
          },
          {
            title: "Copias y mantenimiento automático",
            body: "Copias de seguridad diarias, cifradas e incrementales guardadas fuera del servidor; actualizaciones automáticas con copia previa; y vigilancia de cada servicio con avisos al móvil si algo falla.",
          },
          {
            title: "Esta web, blindada",
            body: "A+ en SSL Labs y securityheaders.com: CSP estricta con nonce por petición, HSTS con preload, TLS 1.2+ con intercambio de claves post-cuántico y security.txt (RFC 9116).",
          },
          {
            title: "Código abierto y saneado",
            body: "La configuración del servidor y el código de esta web son públicos en GitHub, sin IPs, secretos ni datos: compose de cada servicio, reglas del firewall, CrowdSec, scripts de copias y las dos aplicaciones. La seguridad está en las claves, no en esconder el código.",
          },
          {
            title: "Qué me ha enseñado",
            body: "A diseñar pensando primero en la seguridad, a automatizar el mantenimiento para que el sistema se cuide solo y a documentar paso a paso cómo recuperarlo todo desde cero.",
          },
        ],
      },
    },
  },
  contact: {
    title: "Hablemos",
    intro: "¿Tienes un proyecto, una oferta o una duda técnica? Escríbeme y te respondo lo antes posible.",
    copyEmail: "Copiar email",
    copied: "Copiado",
    elsewhere: "También en",
    form: {
      title: "Envíame un mensaje",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Cuéntame en qué estás trabajando…",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      errors: {
        name: "Escribe tu nombre (mínimo 2 caracteres).",
        email: "Revisa el email: el formato no es válido.",
        message: "El mensaje es demasiado corto (mínimo 10 caracteres).",
      },
    },
  },
  footer: {
    rights: "Todos los derechos reservados.",
    credits: "Diseñado y desarrollado con Next.js, Tailwind CSS y Framer Motion.",
    backToTop: "Volver arriba",
  },
  toast: {
    emailCopied: "Email copiado al portapapeles",
    commandCopied: "Comando copiado",
    copyFailed: "No se pudo copiar. Cópialo manualmente.",
    sent: "Mensaje enviado. ¡Gracias!",
    mailto: "Abriendo tu cliente de correo…",
    sendFailed: "No se pudo enviar. Inténtalo de nuevo o usa el email directo.",
  },
};
