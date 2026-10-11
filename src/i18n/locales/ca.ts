import type { Dictionary } from "../types";

export const ca: Dictionary = {
  meta: {
    title: "Bryan Ruzafa Gonçalves · Full-Stack Developer",
    description:
      "Full-Stack Developer i estudiant de Ciberseguretat. Aplicacions web sòlides, eficients i segures, de la infraestructura a la interfície.",
  },
  nav: {
    skip: "Salta al contingut",
    about: "Sobre mi",
    journey: "Trajectòria",
    experience: "Experiència",
    stack: "Stack",
    projects: "Projectes",
    contact: "Contacte",
    openMenu: "Obre el menú",
    closeMenu: "Tanca el menú",
    toDark: "Canvia a mode fosc",
    toLight: "Canvia a mode clar",
    language: "Idioma",
    home: "Inici",
  },
  hero: {
    role: "Full-Stack Developer & Cybersecurity Student",
    tagline:
      "Construint aplicacions web sòlides, eficients i segures des de la base de la infraestructura fins a la interfície final.",
    ctaProjects: "Veure projectes",
    ctaCv: "Descarregar CV",
    photoAlt: "Bryan Ruzafa Gonçalves, Full-Stack Developer i estudiant de Ciberseguretat",
    social: "Xarxes i contacte",
    cvMenu: "Tria l'idioma del CV",
    badge: "Especialització en Ciberseguretat",
    scroll: "Desplaça't",
    availability: "Disponible · Barcelona · Presencial, híbrid o remot",
  },
  about: {
    title: "Sobre mi",
    paragraphs: [
      "La meva base tècnica no va començar picant codi, sinó administrant infraestructura a **Sistemes Microinformàtics i Xarxes (SMR)**: servidors Linux, xarxes, protocols i virtualització. Entendre primer la màquina i les comunicacions va canviar per complet la meva manera de programar: no escric codi a cegues, sé exactament quins recursos consumeix el servidor, com viatgen els paquets i com respon el sistema operatiu a cada petició.",
      "Per unir aquesta base amb el desenvolupament de software vaig cursar el Grau Superior en **Desenvolupament d'Aplicacions Web (DAW)**. Això em permet cobrir l'stack complet sense aïllar el codi de l'entorn on s'executa.",
      "Actualment curso l'**Especialització en Ciberseguretat** a l'Institut Esteve Terradas i Illa amb un objectiu clar: aplicar desenvolupament segur des del primer minut (bastionament, DevSecOps i prevenció de vulnerabilitats OWASP), evitant pedaços d'última hora.",
    ],
    path: [
      { label: "Infraestructura", detail: "SMR" },
      { label: "Software", detail: "DAW" },
      { label: "Seguretat", detail: "Ciberseguretat" },
    ],
    facts: [
      { label: "Ubicació", value: "Sant Sadurní d'Anoia (Barcelona)" },
      { label: "Idiomes", value: "Català i castellà natius · Anglès B2" },
      { label: "Permís", value: "A1, A2 i B, amb vehicle propi" },
    ],
  },
  journey: {
    title: "Trajectòria acadèmica",
    intro: "De la infraestructura al codi, i del codi a la seguretat.",
    current: "En curs",
    done: "Completat",
    focus: "Focus",
    items: [
      {
        title: "Especialització en Ciberseguretat en Entorns de les TI",
        center: "Institut Esteve Terradas i Illa",
        status: "current",
        period: "2026 – actualitat",
        description:
          "Formació especialitzada en protegir sistemes i aplicacions: des del bastionament de servidors i la seguretat integrada en el cicle DevSecOps fins a l'anàlisi forense i el hacking ètic per detectar vulnerabilitats abans que un atacant.",
        focus: [
          "Bastionament de servidors",
          "DevSecOps",
          "Auditories",
          "Prevenció de vulnerabilitats OWASP",
          "Anàlisi forense",
          "Hacking ètic",
        ],
      },
      {
        title: "CFGS Desenvolupament d'Aplicacions Web (DAW)",
        center: "INS Pedralbes",
        status: "done",
        period: "2024 – 2026",
        description:
          "Desenvolupament d'aplicacions web completes: disseny d'APIs REST, interfícies reactives amb frameworks moderns, bases de dades relacionals i desplegament en contenidors Docker.",
        focus: ["Arquitectura full-stack", "APIs REST", "Aplicacions reactives", "Desplegament en contenidors"],
      },
      {
        title: "CFGM Sistemes Microinformàtics i Xarxes (SMR)",
        center: "Institut Eugeni d'Ors",
        status: "done",
        period: "2022 – 2024",
        note: "Nota mitjana: 8,47",
        description:
          "La base tècnica: muntatge i manteniment d'equips, configuració de xarxes locals, administració de sistemes Linux i Windows i virtualització de servidors.",
        focus: ["Infraestructura de xarxes", "Administració Linux / Windows", "Virtualització", "Maquinari"],
      },
    ],
  },
  experience: {
    title: "Experiència",
    intro: "Suport IT en un entorn corporatiu real: usuaris, sistemes i xarxes.",
    items: [
      {
        role: "Tècnic de Suport IT (Pràctiques)",
        company: "Raventós Codorníu",
        period: "Octubre 2023 – Juny 2024",
        tag: "IT",
        bullets: [
          "Suport IT de nivell 1 i 2 a usuaris interns a la seu corporativa.",
          "Resolució de 20-30 incidències setmanals de maquinari, programari i connectivitat amb l'eina de ticketing interna.",
          "Preparació, maquetació i desplegament de 5-10 portàtils per setmana amb Windows i Linux.",
          "Gestió bàsica d'usuaris i permisos a Active Directory i diagnòstic de problemes de xarxa local.",
          "Documentació de procediments tècnics i manteniment preventiu d'equips.",
        ],
      },
    ],
  },
  stack: {
    title: "Stack tècnic",
    intro: "Eines amb què construeixo, desplego i asseguro aplicacions.",
    groups: [
      { key: "frontend", title: "Frontend", items: ["Vue 3", "Nuxt", "Pinia", "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
      { key: "backend", title: "Backend & APIs", items: ["NestJS", "Laravel", "Node.js", "Express", "Socket.IO", "PHP", "Java (POO)", "REST APIs", "WebSockets"] },
      { key: "data", title: "Bases de dades", items: ["PostgreSQL", "MariaDB / MySQL", "Prisma", "TypeORM", "Optimització relacional"] },
      {
        key: "devops",
        title: "DevOps, Sistemes & Seguretat",
        items: ["Docker", "Docker Compose", "Linux", "Windows", "Xarxes LAN", "Git", "GitHub", "Scrum", "OWASP", "Hardening", "Nginx", "nftables", "CrowdSec", "WireGuard / Tailscale", "Cloudflare", "Còpies xifrades (restic)", "Monitorització (Uptime Kuma)", "Automatització (n8n)"],
      },
    ],
    certsTitle: "Certificacions",
    certs: [
      { name: "CCNA Routing and Switching: Introducció a les xarxes", issuer: "Cisco Networking Academy" },
      { name: "CCNA Routing and Switching: Principis bàsics de routing i switching", issuer: "Cisco Networking Academy" },
    ],
  },
  projects: {
    title: "Projectes destacats",
    intro: "Feina real, en equip i en solitari, amb l'arquitectura explicada.",
    role: "El meu rol",
    stack: "Stack",
    code: "Codi",
    demo: "Demo",
    details: "Veure detalls",
    close: "Tanca",
    runLocal: "Executar en local",
    copyCommand: "Copia la comanda",
    requires: {
      docker: "Cal tenir Git i Docker. Copia i enganxa aquestes dues línies:",
      node: "Cal tenir Node.js 18+, MySQL i un server/.env amb les teves claus de Spotify i Gemini (vegeu el README). Executa les línies 2 i 3 en terminals diferents:",
    },
    openAt: "Després obre",
    preview: "Vista prèvia",
    items: {
      adsum: {
        tag: "Projecte final DAW · Equip",
        period: "febr. – maig 2026",
        description:
          "Plataforma web i PWA per al control d'assistència automatitzat mitjançant verificació de QR dinàmic i mòdul integral de gestió d'incidències escolars.",
        role: "Disseny i implementació de l'arquitectura backend amb NestJS, endpoints segurs per a l'autenticació i el QR, i orquestració amb Docker. Projecte en equip de DAW.",
      },
      kairos: {
        tag: "Equip DAW · Scrum",
        description:
          "Plataforma per al Programa ENGINY del Consorci d'Educació de Barcelona: connecta centres educatius amb tallers vocacionals i gestiona tot el cicle, de la sol·licitud i l'assignació de places a la calendarització i el feedback.",
        role: "Catàleg de tallers amb el seu CRUD complet, sistema d'assignació de tallers a centres (API en PHP i interfície en Vue) i frontend de la pàgina d'inici i del feedback de l'alumnat. Equip de 4 amb Scrum (Taiga).",
      },
      sonaris: {
        tag: "Projecte individual DAW",
        description:
          "Aplicació full-stack connectada al teu compte de Spotify: estadístiques d'escolta, un diari emocional que recomana la cançó del moment amb IA (Gemini), sales en temps real per descobrir música en parella, un radar setmanal que crea playlists d'artistes emergents i un generador de cartells de festival.",
        role: "Projecte individual de principi a fi: API REST amb Express i Prisma sobre MySQL, OAuth 2.0 amb Spotify, WebSockets amb Socket.io per a les sales, tasques programades amb node-cron i integració de Gemini, Ticketmaster i OpenWeather.",
      },
      regalia: {
        tag: "Treball de recerca DAW",
        description:
          "Plataforma de venda d'entrades que resol un problema real de concurrència: dos usuaris mai no poden reservar ni comprar la mateixa butaca alhora. Les butaques es bloquegen i se sincronitzen en temps real entre tots els usuaris connectats.",
        role: "Projecte individual de principi a fi: API REST en Laravel 12 amb tests de funcionalitat, servidor de temps real independent en Node.js + Socket.IO i frontend en Nuxt 4 + Pinia.",
      },
      homelab: {
        tag: "Projecte personal",
        period: "ag. 2026 – act.",
        description:
          "El meu propi servidor al núvol, muntat i protegit per mi. Allotja aquesta web i, en privat, les eines que faig servir cada dia: gestor de contrasenyes, documents xifrats, una agenda amb assistent de WhatsApp i automatitzacions.",
        role: "Tot de principi a fi: administració del servidor Linux, contenidors Docker, xarxa privada, tallafoc, detecció d'intrusions, còpies xifrades i monitorització, a més de dues aplicacions pròpies: una caixa forta de documents amb xifratge d'extrem a extrem i una agenda amb assistent.",
        details: [
          {
            title: "Accés només des dels meus dispositius",
            body: "Les eines personals no estan obertes a Internet. Només s'hi pot arribar des dels meus propis dispositius (portàtil, mòbil…) a través d'una xarxa privada xifrada amb WireGuard. Per a qualsevol altra persona, simplement no existeixen.",
          },
          {
            title: "Seguretat per capes",
            body: "Un tallafoc que ho bloqueja tot per defecte, la web accessible només a través de Cloudflare per amagar l'adreça real del servidor, detecció d'intrusions amb CrowdSec i una llista col·laborativa de milers d'IPs malicioses, i administració únicament amb clau criptogràfica.",
          },
          {
            title: "Dades xifrades de veritat",
            body: "He programat una caixa forta de documents que xifra cada arxiu al navegador (AES-256) abans de pujar-lo. El servidor només guarda dades il·legibles: sense la contrasenya, ningú les pot obrir, ni tan sols jo des del servidor.",
          },
          {
            title: "Un assistent per WhatsApp",
            body: "Li escric o li envio una nota de veu i ho apunta: cites que se sincronitzen amb Google Calendar, entregues de classe, tasques, idees i despeses. La veu es transcriu al mateix servidor i les automatitzacions estan construïdes amb n8n.",
          },
          {
            title: "Còpies i manteniment automàtic",
            body: "Còpies de seguretat diàries, xifrades i incrementals guardades fora del servidor; actualitzacions automàtiques amb còpia prèvia; i vigilància de cada servei amb avisos al mòbil si alguna cosa falla.",
          },
          {
            title: "Aquesta web, blindada",
            body: "A+ a SSL Labs i securityheaders.com: CSP estricta amb nonce per petició, HSTS amb preload, TLS 1.2+ amb intercanvi de claus postquàntic i security.txt (RFC 9116).",
          },
          {
            title: "Què m'ha ensenyat",
            body: "A dissenyar pensant primer en la seguretat, a automatitzar el manteniment perquè el sistema es cuidi sol i a documentar pas a pas com recuperar-ho tot des de zero.",
          },
        ],
      },
    },
  },
  contact: {
    title: "Parlem",
    intro: "Tens un projecte, una oferta o un dubte tècnic? Escriu-me i et respondré tan aviat com pugui.",
    copyEmail: "Copia l'email",
    copied: "Copiat",
    elsewhere: "També a",
    form: {
      title: "Envia'm un missatge",
      name: "Nom",
      email: "Email",
      message: "Missatge",
      namePlaceholder: "El teu nom",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Explica'm en què estàs treballant…",
      submit: "Envia el missatge",
      sending: "Enviant…",
      errors: {
        name: "Escriu el teu nom (mínim 2 caràcters).",
        email: "Revisa l'email: el format no és vàlid.",
        message: "El missatge és massa curt (mínim 10 caràcters).",
      },
    },
  },
  footer: {
    rights: "Tots els drets reservats.",
    credits: "Dissenyat i desenvolupat amb Next.js, Tailwind CSS i Framer Motion.",
    backToTop: "Torna a dalt",
  },
  toast: {
    emailCopied: "Email copiat al porta-retalls",
    commandCopied: "Comanda copiada",
    copyFailed: "No s'ha pogut copiar. Copia-ho manualment.",
    sent: "Missatge enviat. Gràcies!",
    mailto: "Obrint el teu client de correu…",
    sendFailed: "No s'ha pogut enviar. Torna-ho a provar o fes servir l'email directe.",
  },
};
