import { defineRouting } from "next-intl/routing";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

/**
 * Rotas traduzidas: /pt/projetos ↔ /en/projects. A chave interna é sempre a versão em PT.
 */
export const routing = defineRouting({
  locales,
  defaultLocale: "pt",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/projetos": { pt: "/projetos", en: "/projects" },
    "/projetos/[slug]": { pt: "/projetos/[slug]", en: "/projects/[slug]" },
    "/sobre": { pt: "/sobre", en: "/about" },
    "/experiencia": { pt: "/experiencia", en: "/experience" },
    "/servicos": { pt: "/servicos", en: "/services" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/musica": { pt: "/musica", en: "/music" },
    "/contato": { pt: "/contato", en: "/contact" },
    "/cv": "/cv",
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
