import { Download } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { getProjects } from "@/lib/content/loader";
import { cvHref } from "@/lib/cv";
import { employerAt } from "@/lib/employer";
import { formatPeriod } from "@/lib/format";
import { hasEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { roleAndOrg, visibleExperience } from "@/lib/experience";
import { skillGroups } from "@/data/skills";
import { PrintButton } from "@/components/cv/print-button";
import { buttonClass } from "@/components/ui/button";
import { Todo } from "@/components/ui/todo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "cv" });
  return pageMetadata({
    locale,
    href: "/cv",
    title: t("title"),
    description: t("summary", { employerAt: employerAt(locale) }),
  });
}

/** Currículo imprimível. Mesma fonte de dados de /experiencia: data/experience.ts e data/skills.ts. */
export default async function CvPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "cv" });
  const te = await getTranslations({ locale, namespace: "experience" });
  const home = await getTranslations({ locale, namespace: "home" });
  const featured = (await getProjects(locale)).map((p) => p.frontmatter).filter((p) => p.featured);
  const experience = visibleExperience(locale);
  const jobs = experience.filter((e) => e.kind !== "education");
  const education = experience.filter((e) => e.kind === "education");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 print:max-w-none print:p-0">
      <div className="mb-8 flex flex-wrap gap-3 print:hidden">
        <PrintButton label={t("print")} />
        {cvHref(locale) && (
          <a href={cvHref(locale)!} download className={buttonClass("secondary", "min-h-11")}>
            <Download className="size-4" aria-hidden="true" />
            {t("download")}
          </a>
        )}
      </div>

      <article className="rounded-2xl border border-line bg-surface-1 p-8 sm:p-12 print:rounded-none print:border-0 print:p-0">
        <header className="border-b border-line pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">{siteConfig.fullName}</h1>
          <p className="mt-1 text-lg text-fg-brand">{home("role")}</p>
          <p className="mt-3 font-mono text-xs text-ink-2">
            {siteConfig.location} · {hasEmail() && <>{siteConfig.email} · </>}
            {siteConfig.social.linkedin.replace("https://www.", "")} ·{" "}
            {siteConfig.social.github.replace("https://", "")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-1">
            {t("summary", { employerAt: employerAt(locale) })}
          </p>
        </header>

        <CvSection title={t("experience")}>
          {jobs.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  <Todo>{roleAndOrg(item.role[locale], item.org)}</Todo>
                </h3>
                <span className="font-mono text-xs text-ink-2">
                  <Todo>{formatPeriod(item.start, item.end, locale, te("present"))}</Todo>
                </span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-1 marker:text-ink-2">
                {item.achievements[locale].map((a) => (
                  <li key={a}>
                    <Todo>{a}</Todo>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-xs text-ink-2">{item.stack.join(" · ")}</p>
            </div>
          ))}
        </CvSection>

        <CvSection title={t("projects")}>
          {featured.map((p) => (
            <div key={p.slug} className="break-inside-avoid">
              <h3 className="font-semibold">
                {p.title}{" "}
                {p.period && (
                  <span className="font-normal text-ink-2">
                    · <Todo>{p.period}</Todo>
                  </span>
                )}
              </h3>
              <p className="mt-1 text-sm text-ink-1">{p.summary}</p>
            </div>
          ))}
        </CvSection>

        <CvSection title={t("education")}>
          {education.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  <Todo>{roleAndOrg(item.role[locale], item.org)}</Todo>
                </h3>
                <span className="font-mono text-xs text-ink-2">
                  <Todo>{formatPeriod(item.start, item.end, locale, te("present"))}</Todo>
                </span>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-ink-1">
                {item.achievements[locale].map((a) => (
                  <li key={a}>
                    <Todo>{a}</Todo>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CvSection>

        <CvSection title={t("skills")}>
          <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 print:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.id} className="break-inside-avoid">
                <dt className="font-semibold">{g.title[locale]}</dt>
                <dd className="text-ink-1">
                  {g.skills
                    .filter((s) => s.level !== "learning")
                    .map((s) => s.name)
                    .join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </CvSection>
      </article>
    </div>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 font-mono text-xs tracking-widest text-fg-brand uppercase">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
