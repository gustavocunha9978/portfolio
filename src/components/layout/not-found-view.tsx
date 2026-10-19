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
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-red-400/40 px-3 py-1 font-mono text-xs text-red-500 light:text-red-700">
          <span className="size-2 rounded-full bg-red-500" aria-hidden="true" />
          status 404
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-1">{t("body")}</p>

        <pre
          aria-hidden="true"
          className="mt-10 overflow-x-auto rounded-2xl border border-line bg-surface-1 p-5 font-mono text-sm leading-7"
        >
          {lines.map((line) => (
            <span
              key={line}
              className={
                "block " +
                (line.includes("404")
                  ? "text-red-500 light:text-red-700"
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
