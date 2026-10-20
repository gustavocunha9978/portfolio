import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/server";
import { getProject, getProjects } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { GithubIcon } from "@/components/icons/brand";
import { MdxContent } from "@/components/mdx/mdx-content";
import { DeployStatus } from "@/components/projects/deploy-status";
import { buttonClass } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const all = await Promise.all(
    routing.locales.map(async (locale) =>
      (await getProjects(locale)).map((p) => ({ locale, slug: p.frontmatter.slug })),
    ),
  );
  return all.flat();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = await getProject(locale, slug);
  if (!project) return {};
  const fm = project.frontmatter;
  return pageMetadata({
    locale,
    href: { pathname: "/projetos/[slug]", params: { slug } },
    title: fm.title,
    description: fm.summary,
  });
}

export default async function CasePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const projects = await getProjects(locale);
  const index = projects.findIndex((p) => p.frontmatter.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const fm = project.frontmatter;
  const prev = projects[index - 1]?.frontmatter;
  const next = projects[index + 1]?.frontmatter;
  const t = await getTranslations({ locale, namespace: "case" });
  const tp = await getTranslations({ locale, namespace: "project" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: fm.title,
    description: fm.summary,
    author: { "@type": "Person", name: siteConfig.fullName, url: siteConfig.url },
    keywords: fm.stack.join(", "),
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    ...(fm.liveUrl ? { url: fm.liveUrl } : {}),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="relative isolate overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink-0"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t("back")}
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <DeployStatus status={fm.status} />
            <span className="font-mono text-xs text-ink-2">
              {fm.category.map((c) => tp(`category.${c}`)).join(" · ")}
            </span>
            <span className="font-mono text-xs text-ink-2">
              {t("readTime", { minutes: project.readingMinutes })}
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-medium tracking-[-0.045em] text-balance sm:text-6xl">
            {fm.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-pretty text-ink-1">
            {fm.summary}
          </p>
          {fm.metrics.length > 0 && (
            <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {fm.metrics.map((m) => (
                <li
                  key={m}
                  className="border-b border-line py-3 pr-4 font-display text-lg tracking-[-0.01em] lg:border-r lg:border-b-0 lg:px-4 lg:first:pl-0 lg:last:border-r-0"
                >
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2">
          <Image
            src={fm.cover}
            alt=""
            fill
            priority
            unoptimized={fm.cover.endsWith(".svg")}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <MdxContent source={project.body} />

            {fm.gallery.length > 0 && (
              <section aria-label={t("gallery")} className="mt-12 grid gap-4 sm:grid-cols-2">
                {fm.gallery.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <dl className="divide-y divide-line rounded-2xl border border-line bg-surface-1 text-sm">
              <Fact label={t("role")}>{fm.role}</Fact>
              <Fact label={t("period")}>{fm.period}</Fact>
              <Fact label={t("status")}>
                <DeployStatus status={fm.status} />
              </Fact>
              <Fact label={t("stack")}>
                <ul className="flex flex-wrap gap-1.5">
                  {fm.stack.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </Fact>
              <Fact label={t("links")}>
                <div className="flex flex-col gap-2">
                  {fm.liveUrl && (
                    <a
                      href={fm.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-fg-accent hover:underline"
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      {t("live")}
                    </a>
                  )}
                  {fm.visibility === "privado" ? (
                    <span className="inline-flex items-start gap-2 text-ink-2">
                      <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {tp("private")}
                    </span>
                  ) : (
                    fm.repoUrl && (
                      <a
                        href={fm.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-fg-accent hover:underline"
                      >
                        <GithubIcon className="size-4" />
                        {t("repo")}
                      </a>
                    )
                  )}
                </div>
              </Fact>
            </dl>
            <div className="mt-4 rounded-2xl p-5 border-gradient">
              <p className="text-sm font-medium">{t("cta")}</p>
              <Link href="/contato" className={buttonClass("primary", "mt-4 w-full")}>
                {t("ctaButton")}
              </Link>
            </div>
          </aside>
        </div>

        <nav
          aria-label={t("back")}
          className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <PagerLink slug={prev.slug} title={prev.title} label={t("prev")} dir="prev" />
          ) : (
            <span />
          )}
          {next && <PagerLink slug={next.slug} title={next.title} label={t("next")} dir="next" />}
        </nav>
      </div>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-4">
      <dt className="mb-1.5 font-mono text-xs tracking-wider text-ink-2 uppercase">{label}</dt>
      <dd className="text-ink-0">{children}</dd>
    </div>
  );
}

function PagerLink({
  slug,
  title,
  label,
  dir,
}: {
  slug: string;
  title: string;
  label: string;
  dir: "prev" | "next";
}) {
  return (
    <Link
      href={{ pathname: "/projetos/[slug]", params: { slug } }}
      className={`group rounded-xl border border-line p-5 transition-colors hover:border-line-strong ${dir === "next" ? "sm:text-right" : ""}`}
    >
      <span
        className={`flex items-center gap-1.5 font-mono text-xs text-ink-2 ${dir === "next" ? "sm:justify-end" : ""}`}
      >
        {dir === "prev" && <ArrowLeft className="size-3.5" aria-hidden="true" />}
        {label}
        {dir === "next" && <ArrowRight className="size-3.5" aria-hidden="true" />}
      </span>
      <span className="mt-1 block font-medium group-hover:text-fg-accent">{title}</span>
    </Link>
  );
}
