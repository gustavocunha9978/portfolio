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
    <div role="group" aria-label={t("language")} className="flex items-center label-caps">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale === "pt" ? "pt-BR" : "en"}
          aria-pressed={locale === current}
          disabled={pending}
          onClick={() => locale !== current && switchTo(locale)}
          className={cn(
            "min-h-11 min-w-11 px-1.5 transition-colors sm:min-h-9 sm:min-w-8",
            locale === current
              ? "text-ink-0 underline decoration-fg-brand decoration-2 underline-offset-[6px]"
              : "text-ink-2 hover:text-ink-0",
          )}
        >
          {/* Nome acessível "PT · Português": contém o texto visível (WCAG 2.5.3). */}
          {labels[locale].short}
          <span className="sr-only"> · {labels[locale].long}</span>
        </button>
      ))}
    </div>
  );
}
