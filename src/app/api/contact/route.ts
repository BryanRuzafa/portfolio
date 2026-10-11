import { NextResponse } from "next/server";

/**
 * POST /api/contact — reenvía el formulario de contacto a tu correo vía Resend (https://resend.com).
 *
 * Variables de entorno (.env.local en local, o en el panel de tu hosting):
 *   RESEND_API_KEY      clave de API de Resend (obligatoria)
 *   CONTACT_TO_EMAIL    dónde recibes los mensajes (por defecto bryan@bryanrg.dev)
 *   CONTACT_FROM_EMAIL  remitente verificado en Resend, p. ej. "Portfolio <contacto@bryanrg.dev>"
 *
 * Si falta RESEND_API_KEY responde 503 "not_configured" y el formulario usa mailto como alternativa.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 80, email: 120, message: 2000 } as const;

// Límite de envíos sencillo en memoria: 5 mensajes cada 10 minutos por IP.
// (En serverless cada instancia tiene su propio contador; suficiente para un portfolio.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: si viene relleno, fingimos éxito y no enviamos nada.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  const to = process.env.CONTACT_TO_EMAIL || "bryan@bryanrg.dev";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <contacto@bryanrg.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio · Mensaje de ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0b1220">
        <p style="white-space:pre-wrap;margin:0 0 16px">${escapeHtml(message)}</p>
        <p style="margin:0;color:#475569">— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      </div>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
