import {
  ArrowUpRight,
  Briefcase,
  Download,
  GraduationCap,
  Laptop,
  Printer,
  Trophy,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { cvHref } from "@/lib/cv";
import { formatPeriod } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import type { ExperienceKind } from "@/data/experience";
import { visibleExperience } from "@/lib/experience";
import { skillGroups, skillLevelLabel, type SkillLevel } from "@/data/skills";
import { buttonClass } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Todo } from "@/components/ui/todo";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/cn";

const kindIcon: Record<ExperienceKind, typeof Briefcase> = {
  work: Briefcase,
  freelance: Laptop,
  hackathon: Trophy,
  education: GraduationCap,
};

const levelStyle: Record<SkillLevel, string> = {
  production: "border-fg-brand/40 text-ink-0",
  frequent: "border-line-strong text-ink-1",
  learning: "border-dashed border-line-strong text-ink-2",
};
const levelDot: Record<SkillLevel, string> = {
  production: "bg-fg-brand",
  frequent: "bg-fg-accent",
  learning: "bg-ink-2",
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "experience" });
  return pageMetadata({ locale, href: "/experiencia", title: t("title"), description: t("intro") });
}

export default async function ExperiencePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "experience" });
  const tl = await getTranslations({ locale, namespace: "labels" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageHeader path={tl("experience")} title={t("title")} intro={t("intro")}>
        <div className="mt-8 flex flex-wrap gap-3">
          {cvHref(locale) && (
            <a href={cvHref(locale)!} download className={buttonClass("primary")}>
              <Download className="size-4" aria-hidden="true" />
              {nav("cv")}
            </a>
          )}
          <Link href="/cv" className={buttonClass("secondary")}>
            <Printer className="size-4" aria-hidden="true" />
            {t("printable")}
          </Link>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <ol className="relative ml-4 border-l border-line sm:ml-5">
          {visibleExperience().map((item) => {
            const Icon = kindIcon[item.kind];
            const period = formatPeriod(item.start, item.end, locale, t("present"));
            return (
              <li key={item.id} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
                <span
                  className={cn(
                    "absolute top-0 -left-4 grid size-8 place-items-center rounded-full border bg-surface-0 sm:-left-5 sm:size-10",
                    item.end === null
                      ? "border-fg-brand text-fg-brand"
                      : "border-line-strong text-ink-2",
                  )}
                  aria-hidden="true"
                >
                  <Icon className="size-4" />
                </span>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-2">
                  {period && (
                    <>
                      <span>
                        <Todo>{period}</Todo>
                      </span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <span>{t(`kind.${item.kind}`)}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  <Todo>{item.role[locale]}</Todo>
                  {item.role[locale] && item.org && <span className="text-ink-2"> · </span>}
                  <span className="text-gradient">
                    <Todo>{item.org}</Todo>
                  </span>
                </h2>

                <ul className="mt-4 max-w-3xl space-y-2 text-ink-1">
                  {item.achievements[locale].map((a) => (
                    <li key={a} className="relative pl-5">
                      <span className="absolute left-0 font-mono text-fg-brand" aria-hidden="true">
                        ›
                      </span>
                      <Todo>{a}</Todo>
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <li key={s}>
                      <Chip>
                        <Todo>{s}</Todo>
                      </Chip>
                    </li>
                  ))}
                </ul>

                {item.projectSlug && (
                  <Link
                    href={{ pathname: "/projetos/[slug]", params: { slug: item.projectSlug } }}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fg-accent hover:underline"
                  >
                    {t("seeCase")}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        <section
          id="skills"
          aria-labelledby="skills-title"
          className="mt-24 scroll-mt-24 border-t border-line pt-16"
        >
          <h2 id="skills-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("skillsTitle")}
          </h2>
          <p className="mt-3 text-ink-1">{t("skillsIntro")}</p>

          <ul className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-ink-2">
            {(Object.keys(skillLevelLabel) as SkillLevel[]).map((level) => (
              <li key={level} className="inline-flex items-center gap-2">
                <span className={cn("size-2 rounded-full", levelDot[level])} aria-hidden="true" />
                {skillLevelLabel[level][locale]}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <section
                key={group.id}
                aria-label={group.title[locale]}
                className={cn(
                  "rounded-2xl border bg-surface-1 p-5",
                  group.highlight ? "border-gradient" : "border-line",
                )}
              >
                <h3 className="font-medium">{group.title[locale]}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <li
                      key={s.name}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[0.72rem]",
                        levelStyle[s.level],
                      )}
                    >
                      <span
                        className={cn("size-1.5 rounded-full", levelDot[s.level])}
                        aria-hidden="true"
                      />
                      {s.name}
                      <span className="sr-only">({skillLevelLabel[s.level][locale]})</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
