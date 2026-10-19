import { getTranslations } from "next-intl/server";
import { resolveLocale, type LocaleParams } from "@/i18n/server";

// Placeholder da Fase 2 — a Home de verdade entra na Fase 3.
export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-4 text-ink-1">{t("description")}</p>
    </main>
  );
}
