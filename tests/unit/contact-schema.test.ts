import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors, formatContactEmail } from "@/lib/contact/schema";

const valid = {
  name: "Maria Silva",
  email: "maria@empresa.com",
  type: "projeto",
  message: "Preciso de um sistema para controlar estoque.",
  locale: "pt",
};

describe("contactSchema", () => {
  it("aceita uma mensagem válida e faz trim", () => {
    const r = contactSchema.safeParse({ ...valid, name: "  Maria Silva  " });
    expect(r.success).toBe(true);
    expect(r.success && r.data.name).toBe("Maria Silva");
  });

  it("retorna chaves de tradução por campo", () => {
    const r = contactSchema.safeParse({ ...valid, name: "M", email: "x", message: "curta" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(fieldErrors(r.error)).toEqual({
        name: "nameMin",
        email: "email",
        message: "messageMin",
      });
    }
  });

  it("rejeita tipo desconhecido", () => {
    expect(contactSchema.safeParse({ ...valid, type: "spam" }).success).toBe(false);
  });

  it("rejeita honeypot preenchido", () => {
    expect(contactSchema.safeParse({ ...valid, website: "http://bot.example" }).success).toBe(
      false,
    );
  });

  it("usa pt como idioma padrão", () => {
    const { locale: _l, ...noLocale } = valid;
    const r = contactSchema.parse(noLocale);
    expect(r.locale).toBe("pt");
  });
});

describe("formatContactEmail", () => {
  it("gera assunto e corpo em texto puro", () => {
    const { subject, text } = formatContactEmail(contactSchema.parse(valid));
    expect(subject).toBe("[Portfólio · Projeto] Maria Silva");
    expect(text).toContain("E-mail: maria@empresa.com");
    expect(text.endsWith(valid.message)).toBe(true);
  });
});
