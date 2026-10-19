import { z } from "zod";

export const contactTypes = ["vaga", "projeto", "outro"] as const;
export type ContactType = (typeof contactTypes)[number];

/**
 * Compartilhado entre o formulário (client) e a API (server).
 * As mensagens de erro são chaves de tradução em `contact.errors.*`.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(80, "nameMax"),
  email: z.email("email").trim().max(160, "email"),
  type: z.enum(contactTypes, "type"),
  message: z.string().trim().min(10, "messageMin").max(5000, "messageMax"),
  locale: z.enum(["pt", "en"]).default("pt"),
  /** Honeypot: campo invisível. Humano deixa vazio; bot preenche. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export type ContactErrorKey =
  "nameMin" | "nameMax" | "email" | "type" | "messageMin" | "messageMax";

/** Achata erros do Zod em { campo: chaveDeTradução } para o formulário. */
export function fieldErrors(
  error: z.ZodError,
): Partial<Record<keyof ContactData, ContactErrorKey>> {
  const out: Partial<Record<keyof ContactData, ContactErrorKey>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactData | undefined;
    if (field && !out[field]) out[field] = issue.message as ContactErrorKey;
  }
  return out;
}

/** Corpo do e-mail em texto puro — sem HTML, então nada do usuário é interpretado. */
export function formatContactEmail(data: ContactData): { subject: string; text: string } {
  const label: Record<ContactType, string> = { vaga: "Vaga", projeto: "Projeto", outro: "Outro" };
  return {
    subject: `[Portfólio · ${label[data.type]}] ${data.name}`,
    text: [
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Tipo: ${label[data.type]}`,
      `Idioma: ${data.locale}`,
      "",
      data.message,
    ].join("\n"),
  };
}
