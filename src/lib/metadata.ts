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
    // Sem título explícito, herda o padrão do layout (definir `title: undefined` apagaria o <title>).
    ...(title ? { title } : {}),
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
      // O bloco openGraph da página substitui o do layout; sem isto a imagem padrão se perderia.
      // Páginas com opengraph-image próprio (os cases) têm prioridade sobre este valor.
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
      images: [`/${locale}/opengraph-image`],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
