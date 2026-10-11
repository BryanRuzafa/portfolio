"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, LoaderCircle, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { GlowCard } from "@/components/ui/GlowCard";
import { Section } from "@/components/ui/Section";
import { socialLinks } from "@/components/ui/SocialLinks";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { siteConfig } from "@/config/site";
import { fadeUp, pressable, stagger, viewportOnce } from "@/lib/motion";
import { cn, copyToClipboard } from "@/lib/utils";

type Field = "name" | "email" | "message";
type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY: FormValues = { name: "", email: "", message: "" };

export function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contacto" title={t.contact.title} intro={t.contact.intro}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-16">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-10"
        >
          <motion.div variants={fadeUp}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-xl font-medium tracking-[-0.02em] break-all text-fg decoration-accent/50 hover:underline sm:text-2xl"
            >
              {siteConfig.email}
            </a>
            <CopyEmailButton />
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-sm text-subtle">{t.contact.elsewhere}</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {socialLinks
                .filter((s) => s.external)
                .map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 text-fg transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <link.Icon className="size-[18px] text-muted transition-colors group-hover:text-accent-text" strokeWidth={1.75} />
                        {link.label}
                        {"detail" in link ? (
                          <span className="font-mono text-sm text-subtle tabular-nums">{link.detail}</span>
                        ) : null}
                      </span>
                      <ArrowUpRight
                        className="size-4 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <GlowCard lift={false} innerClassName="p-6 sm:p-8">
            <ContactForm />
          </GlowCard>
        </motion.div>
      </div>
    </Section>
  );
}

function CopyEmailButton() {
  const { t } = useLanguage();
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(siteConfig.email);
    if (!ok) {
      toast(t.toast.copyFailed, "error");
      return;
    }
    setCopied(true);
    toast(t.toast.emailCopied);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button type="button" onClick={handleCopy} {...pressable} className={cn(buttonStyles.secondary, "mt-5")}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          {copied ? (
            <Check className="size-4 text-success" strokeWidth={2} aria-hidden />
          ) : (
            <Copy className="size-4 text-accent-text" strokeWidth={1.75} aria-hidden />
          )}
          {copied ? t.contact.copied : t.contact.copyEmail}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function ContactForm() {
  const { t } = useLanguage();
  const toast = useToast();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const f = t.contact.form;

  const validate = (v: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (v.name.trim().length < 2) next.name = f.errors.name;
    if (!EMAIL_RE.test(v.email.trim())) next.email = f.errors.email;
    if (v.message.trim().length < 10) next.message = f.errors.message;
    return next;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field;
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot anti-spam: los bots rellenan el campo oculto.
    if ((form.elements.namedItem("company") as HTMLInputElement | null)?.value) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = (["name", "email", "message"] as const).find((k) => found[k]);
      if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    // Alternativa si el servidor aún no tiene Resend configurado: abre el cliente de correo con el mensaje redactado.
    const openMailto = () => {
      const subject = encodeURIComponent(`Portfolio · ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} <${payload.email}>`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      toast(t.toast.mailto, "info");
    };

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 503 || res.status === 404) {
        openMailto();
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast(t.toast.sent);
      setValues(EMPTY);
    } catch {
      toast(t.toast.sendFailed, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-fg">{f.title}</h3>

      {/* Honeypot: invisible para personas y lectores de pantalla */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="name"
          label={f.name}
          error={errors.name}
          input={
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              placeholder={f.namePlaceholder}
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass(Boolean(errors.name))}
            />
          }
        />
        <FormField
          id="email"
          label={f.email}
          error={errors.email}
          input={
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={120}
              placeholder={f.emailPlaceholder}
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(Boolean(errors.email))}
            />
          }
        />
      </div>

      <FormField
        id="message"
        label={f.message}
        error={errors.message}
        input={
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            placeholder={f.messagePlaceholder}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass(Boolean(errors.message)), "min-h-36 resize-y")}
          />
        }
      />

      <motion.button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        {...pressable}
        className={cn(buttonStyles.primary, "w-full sm:w-auto")}
      >
        {sending ? (
          <LoaderCircle className="size-4 animate-spin" strokeWidth={1.75} aria-hidden />
        ) : (
          <Send className="size-4" strokeWidth={1.75} aria-hidden />
        )}
        {sending ? f.sending : f.submit}
      </motion.button>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block w-full rounded-xl border bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-subtle",
    "transition-[border-color,box-shadow] duration-300 outline-none",
    "focus:border-accent focus:ring-4 focus:ring-accent/15",
    invalid ? "border-danger/70" : "border-line hover:border-line-strong",
  );
}

function FormField({
  id,
  label,
  error,
  input,
}: {
  id: Field;
  label: string;
  error?: string;
  input: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {input}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 text-sm text-danger"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
