import fs from "node:fs";
import path from "node:path";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "about" });
  const story = t.raw("story") as string[];
  return pageMetadata({ locale, href: "/sobre", title: t("title"), description: story[0] });
}

/** Primeira foto de perfil encontrada em public/images, se houver. */
const profilePhoto = ["profile.webp", "profile.jpg"]
  .map((f) => `/images/${f}`)
  .find((src) => fs.existsSync(path.join(process.cwd(), "public", src)));

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "about" });
  const tl = await getTranslations({ locale, namespace: "labels" });
  const story = t.raw("story") as string[];
  const how = t.raw("how") as { title: string; body: string }[];

  return (
    <>
      <PageHeader path={tl("about")} title={t("title")} />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          <div>
            {profilePhoto ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={profilePhoto}
                  alt={t("photoAlt")}
                  fill
                  priority
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ) : (
              // Sem foto ainda (public/images/profile.webp ou .jpg): monograma no gradiente da marca.
              <div
                role="img"
                aria-label={t("photoAlt")}
                className="grid aspect-[4/5] place-items-center rounded-2xl border border-line bg-gradient-to-br from-fg-brand to-fg-accent"
              >
                <span className="font-display text-7xl font-medium tracking-[-0.04em] text-surface-0">
                  GC
                </span>
              </div>
            )}
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-2">
              <MapPin className="size-4" aria-hidden="true" />
              {siteConfig.location}
            </p>
            <div className="mt-3 flex gap-2">
              <a
                href={siteConfig.social.github}
                aria-label="GitHub"
                rel="me"
                className="grid size-11 place-items-center rounded-lg border border-line text-ink-1 hover:text-ink-0"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                rel="me"
                className="grid size-11 place-items-center rounded-lg border border-line text-ink-1 hover:text-ink-0"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>

          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-1">
            {story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link
              href="/musica"
              className="inline-flex items-center gap-1 text-base font-medium text-fg-accent hover:underline"
            >
              {t("musicLink")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <section aria-labelledby="how-title" className="mt-24 border-t border-line pt-16">
          <h2 id="how-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("howTitle")}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {how.map((item, i) => (
              <li key={item.title} className="rounded-2xl border border-line bg-surface-1 p-6">
                <span className="font-mono text-xs text-fg-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-ink-1">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
