import { ArrowRight, ArrowUpRight, Calendar, Plus } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { getProjects } from "@/lib/content/loader";
import { whatsappUrl } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { services } from "@/data/services";
import { buttonClass } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({ locale, href: "/servicos", title: t("title"), description: t("intro") });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "services" });
  const tl = await getTranslations({ locale, namespace: "labels" });
  const projects = await getProjects(locale);
  const titleOf = (slug?: string) =>
    projects.find((p) => p.frontmatter.slug === slug)?.frontmatter.title;
  const steps = t.raw("process") as { title: string; body: string }[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <>
      <PageHeader path={tl("services")} title={t("title")} intro={t("intro")}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={siteConfig.social.cal} className={buttonClass("primary")}>
            <Calendar className="size-4" aria-hidden="true" />
            {t("ctaButton")}
          </a>
          <a href={whatsappUrl(locale)} className={buttonClass("secondary")}>
            WhatsApp
          </a>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Serviços como índice numerado: número | o quê e por quê | entregas | prazo */}
        <ol className="py-6">
          {services.map((s, i) => {
            const related = titleOf(s.relatedProject);
            return (
              <li
                key={s.id}
                className="grid gap-x-8 gap-y-5 border-b border-line py-10 md:grid-cols-12"
              >
                <span className="pt-2 label-caps text-fg-brand md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-5">
                  <h2 className="text-3xl font-medium tracking-[-0.035em] text-balance">
                    {s.title[locale]}
                  </h2>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-1">
                    <span className="text-emph text-ink-0">{t("problem")}: </span>
                    {s.problem[locale]}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <p className="label-caps text-ink-2">{t("deliverables")}</p>
                  <ul className="mt-3 border-t border-line text-sm text-ink-1">
                    {s.deliverables[locale].map((d) => (
                      <li key={d} className="border-b border-line py-2">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4 md:col-span-2">
                  <div>
                    <p className="label-caps text-ink-2">{t("timeline")}</p>
                    <p className="mt-2 font-display text-lg tracking-[-0.01em]">
                      {s.timeline[locale]}
                    </p>
                  </div>
                  {related && s.relatedProject && (
                    <Link
                      href={{ pathname: "/projetos/[slug]", params: { slug: s.relatedProject } }}
                      className="inline-flex items-start gap-1 text-sm text-ink-1 underline decoration-line-strong underline-offset-4 hover:text-ink-0 hover:decoration-fg-brand"
                    >
                      <span>
                        <span className="block label-caps text-ink-2 no-underline">
                          {t("related")}
                        </span>
                        {related}
                      </span>
                      <ArrowUpRight className="mt-5 size-3.5 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <Section id="processo" kicker={t("processKicker")} title={t("processTitle")}>
          <ol className="grid border-t border-line md:grid-cols-5">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="border-b border-line py-6 md:border-b-0 md:border-l md:px-5 md:first:border-l-0 md:first:pl-0"
              >
                <span className="font-display text-4xl font-medium tracking-[-0.05em] text-ink-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-1">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="faq" kicker={t("faqKicker")} title={t("faqTitle")}>
          <div className="border-t border-ink-0 md:ml-[25%]">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-4 py-5 font-display text-xl tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    className="size-5 shrink-0 text-ink-2 transition-transform duration-200 group-open:rotate-45 group-open:text-fg-brand"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-ink-1">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <section className="grid gap-8 border-t border-line py-16 sm:py-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl font-medium tracking-[-0.04em] text-balance sm:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-ink-1">{t("ctaBody")}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a href={siteConfig.social.cal} className={buttonClass("primary")}>
              <Calendar className="size-4" aria-hidden="true" />
              {t("ctaButton")}
            </a>
            <Link href="/contato" className={buttonClass("secondary")}>
              {t("ctaAlt")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
