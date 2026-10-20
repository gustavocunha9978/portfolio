import "server-only";
import { skillGroups, type SkillGroup, type SkillLevel } from "@/data/skills";
import type { Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/content/loader";
import { visibleExperience } from "@/lib/experience";
import { SHOW_TODOS } from "@/lib/todo";

export type Evidence =
  | { kind: "project"; slug: string; label: string }
  | { kind: "experience"; id: string; label: string };

export type ResolvedSkill = {
  name: string;
  level: SkillLevel;
  evidence: Evidence[];
  /** Nível ainda não confirmado (só aparece em dev). */
  confirm: boolean;
};

export type ResolvedGroup = Omit<SkillGroup, "skills"> & { skills: ResolvedSkill[] };

/**
 * Habilidades prontas para exibir, com o "onde usei" resolvido para cases e
 * experiências visíveis. Em produção: some o que está a confirmar, e "uso em
 * produção" sem nenhuma prova visível no site cai para "uso com frequência".
 */
export async function resolveSkills(locale: Locale, show = SHOW_TODOS): Promise<ResolvedGroup[]> {
  const projects = await getProjects(locale, { showTodos: show });
  const experience = visibleExperience(locale, show);
  const projectBySlug = new Map(projects.map((p) => [p.frontmatter.slug, p.frontmatter.title]));
  const expById = new Map(
    experience.map((e) => [e.id, [e.role[locale], e.org].filter(Boolean).join(" · ")]),
  );

  return skillGroups.map((group) => ({
    ...group,
    skills: group.skills
      .filter((s) => show || !s.confirm)
      .map((s) => {
        const evidence: Evidence[] = (s.where ?? []).flatMap((ref): Evidence[] => {
          const title = projectBySlug.get(ref);
          if (title) return [{ kind: "project", slug: ref, label: title }];
          const exp = expById.get(ref);
          if (exp) return [{ kind: "experience", id: ref, label: exp }];
          return [];
        });
        const level: SkillLevel =
          s.level === "production" && evidence.length === 0 ? "frequent" : s.level;
        return { name: s.name, level, evidence, confirm: Boolean(s.confirm) };
      }),
  }));
}
