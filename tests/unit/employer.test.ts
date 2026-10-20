import { describe, expect, it } from "vitest";
import { employerAt, employerName, withEmployer } from "@/lib/employer";
import pt from "@/messages/pt.json";
import en from "@/messages/en.json";
import { siteConfig } from "@/site.config";

describe("empresa atual", () => {
  it("mostra o nome por padrão", () => {
    expect(employerAt("pt", true)).toBe(`no ${siteConfig.employer.name}`);
    expect(employerAt("en", true)).toBe(`at ${siteConfig.employer.name}`);
  });

  it("anonimiza quando showEmployerName = false", () => {
    expect(employerName("pt", false)).toBe("Instituição financeira");
    expect(employerAt("en", false)).toBe("at a financial institution");
  });

  it("withEmployer troca o placeholder em textos crus", () => {
    expect(withEmployer("Trabalho {employerAt}.", "pt")).not.toContain("{employerAt}");
  });

  it("o nome da empresa não aparece fixo nas mensagens", () => {
    const name = siteConfig.employer.name;
    expect(JSON.stringify(pt)).not.toContain(name);
    expect(JSON.stringify(en)).not.toContain(name);
  });
});
