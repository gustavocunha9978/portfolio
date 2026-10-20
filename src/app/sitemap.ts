import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getProjects } from "@/lib/content/loader";
import { localizedPath } from "@/lib/metadata";
import { type StaticPathname } from "@/lib/nav";
import { siteConfig } from "@/site.config";

type Href = Parameters<typeof localizedPath>[0];

const staticPages: { href: StaticPathname; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/projetos", priority: 0.9 },
  { href: "/experiencia", priority: 0.9 },
  { href: "/servicos", priority: 0.8 },
  { href: "/sobre", priority: 0.7 },
  { href: "/contato", priority: 0.7 },
  { href: "/cv", priority: 0.6 },
  { href: "/musica", priority: 0.3 },
];

/** Uma entrada por idioma, cada uma com as alternativas hreflang. */
function entries(href: Href, priority: number, lastModified?: Date): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l === "pt" ? "pt-BR" : l, siteConfig.url + localizedPath(href, l)]),
  );
  return locales.map((locale) => ({
    url: siteConfig.url + localizedPath(href, locale),
    lastModified,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("pt");
  return [
    ...staticPages.flatMap((p) => entries(p.href, p.priority)),
    ...projects.flatMap((p) =>
      entries(
        { pathname: "/projetos/[slug]", params: { slug: p.frontmatter.slug } },
        p.frontmatter.featured ? 0.8 : 0.6,
      ),
    ),
  ];
}
