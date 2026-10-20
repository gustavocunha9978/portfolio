import { describe, expect, it } from "vitest";
import { experience } from "@/data/experience";
import { roleAndOrg, visibleExperience } from "@/lib/experience";
import { formatPeriod } from "@/lib/format";
import { hasEmail, hasWhatsapp } from "@/lib/links";
import { remarkTodo } from "@/lib/mdx/remark-todo";
import { isTodo, keep, keepAll } from "@/lib/todo";

type Node = { type: string; value?: string; depth?: number; children?: Node[]; name?: string };
const text = (value: string): Node => ({ type: "text", value });
const p = (value: string): Node => ({ type: "paragraph", children: [text(value)] });
const h = (depth: number, value: string): Node => ({
  type: "heading",
  depth,
  children: [text(value)],
});

describe("isTodo / keep / keepAll", () => {
  it("reconhece placeholders", () => {
    expect(isTodo("[TODO: cargo]")).toBe(true);
    expect(isTodo("TODO")).toBe(true);
    expect(isTodo("Todos os dias")).toBe(false);
    expect(isTodo(undefined)).toBe(false);
  });

  it("oculta só quando pedido", () => {
    expect(keep("[TODO]", false)).toBeUndefined();
    expect(keep("[TODO]", true)).toBe("[TODO]");
    expect(keepAll(["a", "[TODO: b]"], false)).toEqual(["a"]);
  });
});

describe("remarkTodo", () => {
  it("produção: remove o trecho, o parágrafo vazio e o título sem conteúdo", () => {
    const tree: Node = {
      type: "root",
      children: [
        h(2, "Resultado"),
        p("Funciona. [TODO: métrica\nconfirmada]"),
        { type: "list", children: [{ type: "listItem", children: [p("[TODO: x]")] }] },
        h(2, "Impacto"),
        p("[TODO: impacto]"),
        h(2, "Aprendizados"),
        p("Ok"),
      ],
    };
    remarkTodo({ show: false })(tree);
    expect(tree.children!.map((n) => n.children?.[0]?.value ?? n.type)).toEqual([
      "Resultado",
      "Funciona.",
      "Aprendizados",
      "Ok",
    ]);
  });

  it("dev: troca o trecho por <mark class=todo-mark>", () => {
    const tree: Node = { type: "root", children: [p("Antes [TODO: x] depois")] };
    remarkTodo({ show: true })(tree);
    const kids = tree.children![0]!.children!;
    expect(kids.map((k) => k.name ?? k.value)).toEqual(["Antes", "mark", " depois"]);
  });
});

describe("visibleExperience (produção)", () => {
  const items = visibleExperience(false);

  it("nenhum texto TODO sobra", () => {
    expect(JSON.stringify(items)).not.toMatch(/TODO/);
  });

  it("some item sem cargo e sem data; mantém os completos", () => {
    const hidden = experience.filter((e) => isTodo(e.role.pt) && isTodo(e.start));
    for (const e of hidden) expect(items.find((i) => i.id === e.id)).toBeUndefined();
    expect(items.find((i) => i.id === "personal-manager")).toBeDefined();
  });
});

describe("formatPeriod com datas faltando", () => {
  it("não deixa traço solto", () => {
    expect(formatPeriod("", null, "pt", "atual")).toBe("atual");
    expect(formatPeriod("", "2025-10", "pt", "atual")).toBe("out 2025");
    expect(formatPeriod("2024-01", "", "pt", "atual")).toBe("jan 2024");
    expect(formatPeriod("", "", "pt", "atual")).toBe("");
  });

  it("roleAndOrg sem separador sobrando", () => {
    expect(roleAndOrg("Dev", "")).toBe("Dev");
    expect(roleAndOrg("", "Org")).toBe("Org");
    expect(roleAndOrg("Dev", "Org")).toBe("Dev · Org");
  });
});

describe("canais de contato", () => {
  it("só valores reais contam", () => {
    expect(hasEmail("TODO@seu-email.com")).toBe(false);
    expect(hasEmail("")).toBe(false);
    expect(hasEmail("a@b.com")).toBe(true);
    expect(hasWhatsapp("5500000000000")).toBe(false);
    expect(hasWhatsapp("")).toBe(false);
    expect(hasWhatsapp("5545998483474")).toBe(true);
  });
});
