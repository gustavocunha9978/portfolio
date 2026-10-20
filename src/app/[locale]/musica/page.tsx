import { SHOW_TODOS } from "@/lib/todo";
import { Drum } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { music } from "@/data/music";
import { YoutubeLite } from "@/components/music/youtube-lite";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "music" });
  return pageMetadata({ locale, href: "/musica", title: t("title"), description: t("intro") });
}

export default async function MusicPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "music" });
  const tl = await getTranslations({ locale, namespace: "labels" });
  const showTodos = SHOW_TODOS;

  return (
    <>
      <PageHeader path={tl("music")} title={t("title")} intro={t("intro")}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {music.roles[locale].map((role) => (
            <li
              key={role}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-1 px-3.5 py-1.5 text-sm"
            >
              <Drum className="size-4 text-fg-brand" aria-hidden="true" />
              {role}
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {(music.videos.length > 0 || showTodos) && (
          <section aria-labelledby="videos-title">
            <h2 id="videos-title" className="text-2xl font-semibold tracking-tight">
              {t("videos")}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {music.videos.length > 0
                ? music.videos.map((v) => (
                    <YoutubeLite
                      key={v.youtubeId}
                      id={v.youtubeId}
                      title={v.title[locale]}
                      playLabel={t("play", { title: v.title[locale] })}
                    />
                  ))
                : [1, 2].map((i) => (
                    <Placeholder key={i} label={t("videoTodo")} ratio="aspect-video" />
                  ))}
            </div>
          </section>
        )}

        {(music.photos.length > 0 || showTodos) && (
          <section aria-labelledby="photos-title">
            <h2 id="photos-title" className="text-2xl font-semibold tracking-tight">
              {t("photos")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {music.photos.length > 0
                ? music.photos.map((p) => (
                    <div
                      key={p.src}
                      className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt[locale]}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))
                : [1, 2, 3].map((i) => (
                    <Placeholder key={i} label={t("photoTodo")} ratio="aspect-[3/2]" />
                  ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function Placeholder({ label, ratio }: { label: string; ratio: string }) {
  return (
    <div
      className={`${ratio} grid place-items-center rounded-xl border border-dashed border-line-strong bg-surface-1 font-mono text-xs text-ink-2`}
    >
      {label}
    </div>
  );
}
