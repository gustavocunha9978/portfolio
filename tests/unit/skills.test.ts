import { describe, expect, it } from "vitest";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { getProjects } from "@/lib/content/loader";
import { resolveSkills } from "@/lib/skills";

describe("habilidades", () => {
  const all = skillGroups.flatMap((g) => g.skills);

  it("todo 'where' aponta para um case ou experiência que existe", async () => {
    const slugs = new Set((await getProjects("pt")).map((p) => p.frontmatter.slug));
    const ids = new Set(experience.map((e) => e.id));
    const broken = all.flatMap((s) =>
      (s.where ?? []).filter((w) => !slugs.has(w) && !ids.has(w)).map((w) => `${s.name} → ${w}`),
    );
    expect(broken).toEqual([]);
  });

  it("toda habilidade 'uso em produção' diz onde foi usada", () => {
    const missing = all.filter((s) => s.level === "production" && !s.where?.length);
    expect(missing.map((s) => s.name)).toEqual([]);
  });

  it("nenhuma habilidade aparece em dois grupos", () => {
    const names = all.map((s) => s.name);
    expect(names.length).toBe(new Set(names).size);
  });

  it("produção: some o que está a confirmar e nada fica 'em produção' sem prova", async () => {
    const groups = await resolveSkills("pt", false);
    const skills = groups.flatMap((g) => g.skills);
    expect(skills.some((s) => s.confirm)).toBe(false);
    expect(skills.filter((s) => s.level === "production" && !s.evidence.length)).toEqual([]);
  });
});
