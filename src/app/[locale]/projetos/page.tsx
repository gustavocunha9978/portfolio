import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { getProjects } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/metadata";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "projects" });
  return pageMetadata({ locale, href: "/projetos", title: t("title"), description: t("intro") });
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "projects" });
  const tl = await getTranslations({ locale, namespace: "labels" });
  const projects = (await getProjects(locale)).map((p) => p.frontmatter);
  const cards = Object.fromEntries(
    projects.map((p, i) => [
      p.slug,
      <ProjectCard key={p.slug} project={p} priority={i < 2} className="w-full" />,
    ]),
  );

  return (
    <>
      <PageHeader path={tl("projects")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <ProjectsExplorer projects={projects} cards={cards} />
      </div>
    </>
  );
}
