import { describe, expect, it } from "vitest";
import { getProjects } from "@/lib/content/loader";
import { projectFrontmatterSchema } from "@/lib/content/schema";
import { experience } from "@/data/experience";

const base = {
  title: "X",
  slug: "x",
  summary: "y",
  category: ["web"],
  stack: ["Next.js"],
  role: "Dev",
  period: "2026",
  status: "concluído",
  visibility: "público",
  cover: "/images/x.png",
};

describe("projectFrontmatterSchema", () => {
  it("projeto privado não pode ter repoUrl", () => {
    const r = projectFrontmatterSchema.safeParse({
      ...base,
      visibility: "privado",
      repoUrl: "https://github.com/a/b",
    });
    expect(r.success).toBe(false);
  });

  it("rejeita slug fora de kebab-case", () => {
    expect(projectFrontmatterSchema.safeParse({ ...base, slug: "Meu Projeto" }).success).toBe(
      false,
    );
  });
});

describe("conteúdo real", () => {
  it("todo projeto existe nos dois idiomas com o mesmo slug, ordem e visibilidade", async () => {
    const [pt, en] = await Promise.all([getProjects("pt"), getProjects("en")]);
    const summary = (list: typeof pt) =>
      list.map((p) =>
        [p.frontmatter.slug, p.frontmatter.order, p.frontmatter.visibility].join("|"),
      );
    expect(summary(en)).toEqual(summary(pt));
    expect(pt.length).toBeGreaterThan(0);
  });

  it("experiências que apontam para um case apontam para um case que existe", async () => {
    const slugs = new Set((await getProjects("pt")).map((p) => p.frontmatter.slug));
    const missing = experience.filter((e) => e.projectSlug && !slugs.has(e.projectSlug));
    expect(missing.map((e) => e.projectSlug)).toEqual([]);
  });
});

describe("rascunhos e TODOs no conteúdo (produção)", () => {
  it("rascunhos não saem em produção", async () => {
    const prod = await getProjects("pt", { showTodos: false });
    expect(prod.some((p) => p.frontmatter.draft)).toBe(false);
  });

  it("frontmatter sem TODO em produção", async () => {
    const prod = await getProjects("en", { showTodos: false });
    expect(JSON.stringify(prod.map((p) => p.frontmatter))).not.toMatch(/TODO/);
  });
});
