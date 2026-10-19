import {
  AppWindow,
  ArrowUpRight,
  BarChart3,
  Bot,
  Calendar,
  Globe,
  Plus,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { getProjects } from "@/lib/content/loader";
import { whatsappUrl } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { services, type Service } from "@/data/services";
import { WhatsappIcon } from "@/components/icons/brand";
import { buttonClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

const icons: Record<Service["icon"], typeof AppWindow> = {
  "app-window": AppWindow,
  smartphone: Smartphone,
  globe: Globe,
  bot: Bot,
  "bar-chart-3": BarChart3,
  sparkles: Sparkles,
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({ locale, href: "/servicos", title: t("title"), description: t("intro") });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "services" });
  const projects = await getProjects(locale);
  const titleOf = (slug?: string) =>
    projects.find((p) => p.frontmatter.slug === slug)?.frontmatter.title;
  const steps = t.raw("process") as { title: string; body: string }[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <>
      <PageHeader
        path={locale === "pt" ? "/servicos" : "/services"}
        title={t("title")}
        intro={t("intro")}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={siteConfig.social.cal} className={buttonClass("primary")}>
            <Calendar className="size-4" aria-hidden="true" />
            {t("ctaButton")}
          </a>
          <a href={whatsappUrl(locale)} className={buttonClass("secondary")}>
            <WhatsappIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            const related = titleOf(s.relatedProject);
            return (
              <li
                key={s.id}
                className="flex flex-col rounded-2xl border border-line bg-surface-1 p-6"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-fg-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">{s.title[locale]}</h2>

                <p className="mt-4 font-mono text-[0.7rem] tracking-wider text-ink-2 uppercase">
                  {t("problem")}
                </p>
                <p className="mt-1.5 text-sm text-ink-1">{s.problem[locale]}</p>

                <p className="mt-4 font-mono text-[0.7rem] tracking-wider text-ink-2 uppercase">
                  {t("deliverables")}
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-1">
                  {s.deliverables[locale].map((d) => (
                    <li key={d} className="relative pl-4">
                      <span className="absolute left-0 font-mono text-fg-brand" aria-hidden="true">
                        ›
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4 text-sm">
                  <div>
                    <p className="font-mono text-[0.7rem] tracking-wider text-ink-2 uppercase">
                      {t("timeline")}
                    </p>
                    <p className="mt-1 font-mono text-ink-0">{s.timeline[locale]}</p>
                  </div>
                  {related && s.relatedProject && (
                    <Link
                      href={{ pathname: "/projetos/[slug]", params: { slug: s.relatedProject } }}
                      className="inline-flex items-center gap-1 text-right font-medium text-fg-accent hover:underline"
                      aria-label={`${t("related")}: ${related}`}
                    >
                      {t("related")}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <section aria-labelledby="process-title" className="mt-24 border-t border-line pt-16">
          <h2 id="process-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("processTitle")}
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-line bg-surface-1 p-5"
              >
                <span className="font-mono text-sm text-fg-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-medium">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-1">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-title" className="mt-24 border-t border-line pt-16">
          <h2 id="faq-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("faqTitle")}
          </h2>
          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface-1">
            {faq.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    className="size-4 shrink-0 text-ink-2 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-ink-1">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl p-8 text-center border-gradient sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-ink-1">{t("ctaBody")}</p>
          <a href={siteConfig.social.cal} className={buttonClass("primary", "mt-8")}>
            <Calendar className="size-4" aria-hidden="true" />
            {t("ctaButton")}
          </a>
        </section>
      </div>
    </>
  );
}
