import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import { isLocale, routing } from "@/i18n/routing";

function keys(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe("i18n", () => {
  it("pt e en têm exatamente as mesmas chaves", () => {
    expect(keys(en).sort()).toEqual(keys(pt).sort());
  });

  it("nenhuma tradução está vazia", () => {
    for (const msgs of [pt, en]) {
      for (const k of keys(msgs)) {
        const value = k
          .split(".")
          .reduce<unknown>((o, part) => (o as Record<string, unknown>)[part], msgs);
        expect(value, k).not.toBe("");
      }
    }
  });

  it("toda rota tem versão nos dois idiomas", () => {
    for (const [key, value] of Object.entries(routing.pathnames)) {
      if (typeof value === "string") continue;
      expect(Object.keys(value).sort(), key).toEqual([...routing.locales].sort());
    }
  });

  it("isLocale valida só os idiomas suportados", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
