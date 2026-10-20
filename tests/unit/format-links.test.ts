import { describe, expect, it } from "vitest";
import { formatMonth, formatPeriod } from "@/lib/format";
import { whatsappUrl } from "@/lib/links";
import { remarkMermaid } from "@/lib/mdx/remark-mermaid";

describe("formatMonth / formatPeriod", () => {
  it("formata mês curto nos dois idiomas", () => {
    expect(formatMonth("2026-07", "pt")).toBe("jul 2026");
    expect(formatMonth("2026-07", "en")).toBe("Jul 2026");
  });

  it("deixa placeholders visíveis", () => {
    expect(formatMonth("TODO", "pt")).toBe("[TODO]");
  });

  it("período atual, intervalo e mês único", () => {
    expect(formatPeriod("2026-07", null, "pt", "atual")).toBe("jul 2026 – atual");
    expect(formatPeriod("2024-01", "2025-03", "en", "present")).toBe("Jan 2024 – Mar 2025");
    expect(formatPeriod("2025-05", "2025-05", "pt", "atual")).toBe("mai 2025");
  });
});

describe("whatsappUrl", () => {
  it("usa só dígitos e mensagem no idioma atual", () => {
    const pt = whatsappUrl("pt", "+55 (45) 99999-0000");
    expect(pt.startsWith("https://wa.me/5545999990000?text=")).toBe(true);
    expect(decodeURIComponent(pt.split("text=")[1]!)).toContain("Olá, Gustavo!");
    expect(decodeURIComponent(whatsappUrl("en", "1").split("text=")[1]!)).toContain("Hi Gustavo!");
  });
});

describe("remarkMermaid", () => {
  it("troca blocos ```mermaid por <Mermaid chart>, inclusive aninhados", () => {
    const tree = {
      type: "root",
      children: [
        { type: "code", lang: "ts", value: "x" },
        {
          type: "blockquote",
          children: [{ type: "code", lang: "mermaid", value: "flowchart LR\n A-->B" }],
        },
      ],
    };
    remarkMermaid()(tree);
    expect(tree.children[0]).toMatchObject({ type: "code", lang: "ts" });
    expect(tree.children[1]!.children![0]).toMatchObject({
      type: "mdxJsxFlowElement",
      name: "Mermaid",
      attributes: [{ name: "chart", value: "flowchart LR\n A-->B" }],
    });
  });
});
