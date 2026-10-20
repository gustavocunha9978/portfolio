import { getTranslations } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Gustavo Cunha — Fullstack Developer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** OG padrão de todas as páginas do idioma (os cases têm a própria). */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "home" });

  return renderOg({
    kicker: t("available"),
    title: t("role"),
    subtitle: t.markup("value", { em: (chunks) => chunks }),
    meta: "Node.js · React · TypeScript · Python · PHP · PostgreSQL · Power BI · RPA",
  });
}
