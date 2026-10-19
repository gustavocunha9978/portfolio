import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/site.config";

type Href = Parameters<typeof getPathname>[0]["href"];

/** URL relativa da rota no idioma pedido: "/projetos" → "/en/projects". */
export function localizedPath(href: Href, locale: Locale) {
  return getPathname({ href, locale });
}

/**
 * Metadata padrão de página: título, descrição, canonical e hreflang
 * (pt-BR, en e x-default apontando para PT).
 */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  noIndex,
}: {
  locale: Locale;
  href: Href;
  title?: string;
  description?: string;
  noIndex?: boolean;
}): Metadata {
  const languages = Object.fromEntries(
    locales.map((l) => [l === "pt" ? "pt-BR" : l, localizedPath(href, l)]),
  );
  const canonical = localizedPath(href, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": localizedPath(href, "pt") },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      url: canonical,
      title: title ?? siteConfig.name,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
