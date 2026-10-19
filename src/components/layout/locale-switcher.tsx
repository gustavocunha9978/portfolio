"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const labels: Record<Locale, { short: string; long: string }> = {
  pt: { short: "PT", long: "Português" },
  en: { short: "EN", long: "English" },
};

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const current = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    startTransition(() => {
      // Mantém a página atual (e o slug) ao trocar o idioma: /pt/projetos/x → /en/projects/x
      router.replace(
        // @ts-expect-error -- pathname e params são sempre compatíveis para a rota atual
        { pathname, params },
        { locale, scroll: false },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex rounded-lg border border-line p-0.5 font-mono text-xs"
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale === "pt" ? "pt-BR" : "en"}
          aria-pressed={locale === current}
          aria-label={labels[locale].long}
          disabled={pending}
          onClick={() => locale !== current && switchTo(locale)}
          className={cn(
            "min-h-10 min-w-10 rounded-md px-2 py-1 transition-colors sm:min-h-0 sm:min-w-0",
            locale === current ? "bg-surface-2 text-ink-0" : "text-ink-2 hover:text-ink-0",
          )}
        >
          {labels[locale].short}
        </button>
      ))}
    </div>
  );
}
