"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  projectCategories,
  type ProjectCategory,
  type ProjectFrontmatter,
} from "@/lib/content/schema";
import { cn } from "@/lib/cn";

type Props = {
  projects: ProjectFrontmatter[];
  /** Cards já renderizados no servidor, indexados por slug (mantém o card como Server Component). */
  cards: Record<string, React.ReactNode>;
};

/** Tecnologias que aparecem em pelo menos 2 projetos, mais usadas primeiro. */
function topTechs(projects: ProjectFrontmatter[]) {
  const count = new Map<string, number>();
  for (const p of projects) for (const s of p.stack) count.set(s, (count.get(s) ?? 0) + 1);
  return [...count.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([s]) => s);
}

export function ProjectsExplorer({ projects, cards }: Props) {
  const t = useTranslations("projects");
  const tc = useTranslations("project.category");
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [tech, setTech] = useState<string>("");

  const techs = useMemo(() => topTechs(projects), [projects]);
  const available = projectCategories.filter((c) => projects.some((p) => p.category.includes(c)));
  const filtered = projects.filter(
    (p) => (!category || p.category.includes(category)) && (!tech || p.stack.includes(tech)),
  );

  const chip = (active: boolean) =>
    cn(
      "label-caps min-h-11 px-0.5 transition-colors sm:min-h-9",
      active
        ? "text-ink-0 underline decoration-fg-brand decoration-2 underline-offset-[7px]"
        : "text-ink-2 hover:text-ink-0",
    );

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label={t("filterCategory")}
          className="flex flex-wrap gap-x-6 gap-y-1"
        >
          <button
            type="button"
            aria-pressed={!category}
            onClick={() => setCategory(null)}
            className={chip(!category)}
          >
            {t("all")}
          </button>
          {available.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(category === c ? null : c)}
              className={chip(category === c)}
            >
              {tc(c)}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm text-ink-2">
          <span className="font-mono text-xs">{t("filterTech")}</span>
          <select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="min-h-11 border border-line-strong bg-surface-0 px-3 py-2 text-sm text-ink-0"
          >
            <option value="">{t("anyTech")}</option>
            {techs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 font-mono text-xs text-ink-2" aria-live="polite">
        {t("count", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-8 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.slug} className="flex">
              {cards[p.slug]}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-ink-1">{t("empty")}</p>
          <button
            type="button"
            onClick={() => {
              setCategory(null);
              setTech("");
            }}
            className="mt-4 text-sm font-medium text-fg-accent hover:underline"
          >
            {t("clear")}
          </button>
        </div>
      )}
    </div>
  );
}
