"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";

/** 404 no tema "deploy falhou". */
export function NotFoundView() {
  const t = useTranslations("notFound");
  const pathname = usePathname();
  const lines = (t.raw("log") as string[]).map((l) => l.replace("{path}", pathname));

  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="inline-flex -rotate-3 items-center rounded-sm border-2 border-current px-2.5 py-1 text-sm font-semibold tracking-[0.12em] text-red-700 uppercase dark:text-red-400">
          404
        </p>
        <h1 className="mt-6 text-5xl font-medium tracking-[-0.03em] sm:text-7xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-1">{t("body")}</p>

        <pre
          aria-hidden="true"
          className="mt-10 -rotate-[0.6deg] overflow-x-auto rounded-md border-[1.5px] border-ink-0 bg-surface-1 p-5 font-mono text-sm leading-7 shadow-paper"
        >
          {lines.map((line) => (
            <span
              key={line}
              className={
                "block " +
                (line.includes("404")
                  ? "text-red-700 dark:text-red-400"
                  : line.includes("✓")
                    ? "text-fg-brand"
                    : "text-ink-1")
              }
            >
              {line}
            </span>
          ))}
        </pre>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass("primary", "min-h-11")}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t("home")}
          </Link>
          <Link href="/projetos" className={buttonClass("secondary", "min-h-11")}>
            {t("projects")}
          </Link>
        </div>
      </div>
    </section>
  );
}
