"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import {
  contactSchema,
  contactTypes,
  fieldErrors,
  type ContactErrorKey,
  type ContactInput,
} from "@/lib/contact/schema";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/button";

type Field = "name" | "email" | "type" | "message";
type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-lg border bg-surface-0 px-3.5 py-2.5 text-base text-ink-0 placeholder:text-ink-2 transition-colors focus:border-fg-accent focus:outline-none sm:text-sm";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const id = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, ContactErrorKey>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<"rateLimited" | "generic" | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as unknown as ContactInput;
    const payload = { ...data, locale };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = fieldErrors(parsed.error) as Partial<Record<Field, ContactErrorKey>>;
      setErrors(fe);
      const first = (["name", "email", "type", "message"] as Field[]).find((f) => fe[f]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: typeof errors;
      };
      if (body.fields) setErrors(body.fields);
      setServerError(res.status === 429 ? "rateLimited" : "generic");
      setStatus("error");
    } catch {
      setServerError("generic");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-fg-brand/40 bg-surface-1 p-6"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-fg-brand" aria-hidden="true" />
        <p className="text-ink-0">{t("success")}</p>
      </div>
    );
  }

  const fieldProps = (name: Field) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    className: cn(inputClass, errors[name] ? "border-red-400" : "border-line"),
  });

  const errorText = (name: Field) =>
    errors[name] && (
      <p id={`${id}-${name}-error`} className="mt-1.5 text-sm text-red-500 light:text-red-700">
        {t(`errors.${errors[name]}`)}
      </p>
    );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      aria-describedby={serverError ? `${id}-server` : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium">
            {t("name")}
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={80} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium">
            {t("email")}
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-type`} className="text-sm font-medium">
          {t("type")}
        </label>
        <select {...fieldProps("type")} defaultValue="projeto" required>
          {contactTypes.map((type) => (
            <option key={type} value={type}>
              {t(`types.${type}`)}
            </option>
          ))}
        </select>
        {errorText("type")}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          {...fieldProps("message")}
          rows={6}
          required
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
        />
        {errorText("message")}
      </div>

      {/* Honeypot: invisível para pessoas, tentador para bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {serverError && (
        <p
          id={`${id}-server`}
          role="alert"
          className="rounded-lg border border-red-400/50 px-4 py-3 text-sm text-red-500 light:text-red-700"
        >
          {t(`errors.${serverError}`)}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={buttonClass("primary", "min-h-11 w-full sm:w-auto")}
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
