import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Bryan Ruzafa Gonçalves · Full-Stack Developer",
    description:
      "Full-Stack Developer and Cybersecurity student. Solid, efficient and secure web applications, from infrastructure to interface.",
  },
  nav: {
    skip: "Skip to content",
    about: "About",
    journey: "Journey",
    experience: "Experience",
    stack: "Stack",
    projects: "Projects",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    language: "Language",
    home: "Home",
  },
  hero: {
    role: "Full-Stack Developer & Cybersecurity Student",
    tagline:
      "Building solid, efficient and secure web applications, from the infrastructure foundation all the way to the final interface.",
    ctaProjects: "View projects",
    ctaCv: "Download CV",
    photoAlt: "Bryan Ruzafa Gonçalves, Full-Stack Developer and Cybersecurity student",
    social: "Social and contact",
    cvMenu: "Choose the CV language",
    badge: "Cybersecurity Specialization",
    scroll: "Scroll",
    availability: "Available · Barcelona · On-site, hybrid or remote",
  },
  about: {
    title: "About me",
    paragraphs: [
      "My technical foundation didn't start with writing code, but with running infrastructure in **Microcomputer Systems and Networks (SMR)**: Linux servers, networking, protocols and virtualization. Understanding the machine and its communications first completely changed the way I program: I don't write code blindly. I know exactly what resources the server consumes, how packets travel and how the operating system responds to every request.",
      "To bridge that foundation with software development, I completed the Higher Technical Degree in **Web Application Development (DAW)**. That lets me cover the full stack without isolating the code from the environment it runs in.",
      "I'm currently taking the **Cybersecurity Specialization** at Institut Esteve Terradas i Illa with a clear goal: applying secure development from minute one (hardening, DevSecOps and OWASP vulnerability prevention) instead of last-minute patches.",
    ],
    path: [
      { label: "Infrastructure", detail: "SMR" },
      { label: "Software", detail: "DAW" },
      { label: "Security", detail: "Cybersecurity" },
    ],
    facts: [
      { label: "Location", value: "Sant Sadurní d'Anoia (Barcelona, Spain)" },
      { label: "Languages", value: "Spanish and Catalan (native) · English B2" },
      { label: "Driving licence", value: "A1, A2 and B, own vehicle" },
    ],
  },
  journey: {
    title: "Academic journey",
    intro: "From infrastructure to code, and from code to security.",
    current: "In progress",
    done: "Completed",
    focus: "Focus",
    items: [
      {
        title: "Specialization in Cybersecurity in IT Environments",
        center: "Institut Esteve Terradas i Illa",
        status: "current",
        period: "2026 – present",
        description:
          "Specialized training in protecting systems and applications: from server hardening and security built into the DevSecOps cycle to digital forensics and ethical hacking, finding vulnerabilities before an attacker does.",
        focus: [
          "Server hardening",
          "DevSecOps",
          "Security audits",
          "OWASP vulnerability prevention",
          "Digital forensics",
          "Ethical hacking",
        ],
      },
      {
        title: "Higher Technical Degree in Web Application Development (DAW)",
        center: "INS Pedralbes",
        status: "done",
        period: "2024 – 2026",
        description:
          "Building complete web applications: REST API design, reactive interfaces with modern frameworks, relational databases and deployment with Docker containers.",
        focus: ["Full-stack architecture", "REST APIs", "Reactive applications", "Container deployment"],
      },
      {
        title: "Technical Degree in Microcomputer Systems and Networks (SMR)",
        center: "Institut Eugeni d'Ors",
        status: "done",
        period: "2022 – 2024",
        note: "Average grade: 8.47 / 10",
        description:
          "The technical foundation: assembling and maintaining hardware, configuring local networks, administering Linux and Windows systems and virtualizing servers.",
        focus: ["Network infrastructure", "Linux / Windows administration", "Virtualization", "Hardware"],
      },
    ],
  },
  experience: {
    title: "Experience",
    intro: "IT support in a real corporate environment: users, systems and networks.",
    items: [
      {
        role: "IT Support Technician (Internship)",
        company: "Raventós Codorníu",
        period: "Oct 2023 – Jun 2024",
        tag: "IT",
        bullets: [
          "Level 1 and 2 IT support for internal users at the corporate headquarters.",
          "Resolved 20-30 hardware, software and connectivity incidents a week through the internal ticketing tool.",
          "Prepared, imaged and deployed 5-10 laptops a week on Windows and Linux.",
          "Basic user and permission management in Active Directory, and troubleshooting of local network issues.",
          "Documented technical procedures and carried out preventive maintenance of equipment.",
        ],
      },
    ],
  },
  stack: {
    title: "Tech stack",
    intro: "The tools I use to build, ship and secure applications.",
    groups: [
      { key: "frontend", title: "Frontend", items: ["Vue 3", "Nuxt", "Pinia", "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
      { key: "backend", title: "Backend & APIs", items: ["NestJS", "Laravel", "Node.js", "Express", "Socket.IO", "PHP", "Java (OOP)", "REST APIs", "WebSockets"] },
      { key: "data", title: "Databases", items: ["PostgreSQL", "MariaDB / MySQL", "Prisma", "TypeORM", "Relational optimization"] },
      {
        key: "devops",
        title: "DevOps, Systems & Security",
        items: ["Docker", "Docker Compose", "Linux", "Windows", "LAN networking", "Git", "GitHub", "Scrum", "OWASP", "Hardening", "Nginx", "nftables", "CrowdSec", "WireGuard / Tailscale", "Cloudflare", "Encrypted backups (restic)", "Monitoring (Uptime Kuma)", "Automation (n8n)"],
      },
    ],
    certsTitle: "Certifications",
    certs: [
      { name: "CCNA Routing and Switching: Introduction to Networks", issuer: "Cisco Networking Academy" },
      { name: "CCNA Routing and Switching: Routing and Switching Essentials", issuer: "Cisco Networking Academy" },
    ],
  },
  projects: {
    title: "Featured projects",
    intro: "Real work, in teams and solo, with the architecture explained.",
    role: "My role",
    stack: "Stack",
    code: "Code",
    demo: "Demo",
    details: "View details",
    close: "Close",
    runLocal: "Run locally",
    copyCommand: "Copy command",
    requires: {
      docker: "Requires Git and Docker. Copy and paste these two lines:",
      node: "Requires Node.js 18+, MySQL and a server/.env with your Spotify and Gemini keys (see the README). Run lines 2 and 3 in separate terminals:",
    },
    openAt: "Then open",
    preview: "Preview",
    items: {
      adsum: {
        tag: "DAW final project · Team",
        period: "Feb – May 2026",
        description:
          "Web platform and PWA for automated attendance tracking through dynamic QR verification, with a complete module for managing school incidents.",
        role: "Designed and built the backend architecture with NestJS, secure endpoints for authentication and QR, and Docker orchestration. DAW team project.",
      },
      kairos: {
        tag: "DAW team · Scrum",
        description:
          "Platform for the ENGINY Programme of the Barcelona Education Consortium (Consorci d'Educació de Barcelona): it connects schools with vocational workshops and manages the whole cycle, from applications and seat allocation to scheduling and feedback.",
        role: "Workshop catalogue with full CRUD, the system that assigns workshops to schools (PHP API and Vue interface), and the frontend for the home page and student feedback. Team of 4 working in Scrum (Taiga).",
      },
      sonaris: {
        tag: "DAW individual project",
        description:
          "Full-stack app connected to your Spotify account: listening stats, an emotional journal that recommends the right song with AI (Gemini), real-time rooms to discover music with a friend, a weekly radar that builds playlists of emerging artists, and a festival poster generator.",
        role: "Solo project end to end: REST API with Express and Prisma on MySQL, Spotify OAuth 2.0, Socket.io WebSockets for the rooms, scheduled jobs with node-cron, and Gemini, Ticketmaster and OpenWeather integrations.",
      },
      regalia: {
        tag: "DAW research project",
        description:
          "A ticketing platform that solves a real concurrency problem: two users can never book or buy the same seat at the same time. Seats are locked and synchronised in real time across every connected user.",
        role: "Individual project end to end: Laravel 12 REST API with feature tests, a standalone real-time server in Node.js + Socket.IO, and a Nuxt 4 + Pinia frontend.",
      },
      homelab: {
        tag: "Personal project",
        period: "Aug 2026 – present",
        description:
          "My own cloud server, set up and secured by me. It hosts this website and, privately, the tools I use every day: a password manager, encrypted documents, a planner with a WhatsApp assistant, and automations.",
        role: "Everything end to end: Linux server administration, Docker containers, private networking, firewall, intrusion detection, encrypted backups and monitoring, plus two apps of my own: an end-to-end encrypted document vault and a planner with an assistant.",
        details: [
          {
            title: "Reachable only from my own devices",
            body: "The personal tools aren't open to the internet. They can only be reached from my own devices (laptop, phone…) over a private network encrypted with WireGuard. To anyone else, they simply don't exist.",
          },
          {
            title: "Layered security",
            body: "A firewall that blocks everything by default, the website reachable only through Cloudflare so the server's real address stays hidden, intrusion detection with CrowdSec and a community list of thousands of malicious IPs, and admin access by cryptographic key only.",
          },
          {
            title: "Data that's actually encrypted",
            body: "I built a document vault that encrypts every file in the browser (AES-256) before uploading it. The server only stores unreadable data: without the password nobody can open it, not even me from the server.",
          },
          {
            title: "A WhatsApp assistant",
            body: "I text it or send a voice note and it gets logged: appointments that sync with Google Calendar, coursework deadlines, tasks, ideas and expenses. Voice is transcribed on the server itself, and the automations are built with n8n.",
          },
          {
            title: "Backups and hands-off maintenance",
            body: "Daily encrypted, incremental backups stored off the server; automatic updates with a backup first; and monitoring of every service with alerts to my phone if something fails.",
          },
          {
            title: "This site, hardened",
            body: "A+ on SSL Labs and securityheaders.com: strict CSP with a per-request nonce, HSTS with preload, TLS 1.2+ with post-quantum key exchange, and security.txt (RFC 9116).",
          },
          {
            title: "What it taught me",
            body: "To design with security first, to automate maintenance so the system looks after itself, and to document step by step how to rebuild everything from scratch.",
          },
        ],
      },
    },
  },
  contact: {
    title: "Let's talk",
    intro: "Have a project, an offer or a technical question? Write to me and I'll get back to you as soon as I can.",
    copyEmail: "Copy email",
    copied: "Copied",
    elsewhere: "Also on",
    form: {
      title: "Send me a message",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me what you're working on…",
      submit: "Send message",
      sending: "Sending…",
      errors: {
        name: "Enter your name (at least 2 characters).",
        email: "Check the email: the format isn't valid.",
        message: "The message is too short (at least 10 characters).",
      },
    },
  },
  footer: {
    rights: "All rights reserved.",
    credits: "Designed and built with Next.js, Tailwind CSS and Framer Motion.",
    backToTop: "Back to top",
  },
  toast: {
    emailCopied: "Email copied to clipboard",
    commandCopied: "Command copied",
    copyFailed: "Couldn't copy. Please copy it manually.",
    sent: "Message sent. Thank you!",
    mailto: "Opening your email client…",
    sendFailed: "Couldn't send it. Try again or use the email directly.",
  },
};
