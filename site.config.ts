/**
 * Configuração central do site. Edite aqui nome, links e contatos —
 * nenhum componente tem esses valores hardcoded.
 */
export const siteConfig = {
  name: "Gustavo Cunha",
  fullName: "Gustavo Cunha Soares dos Santos",
  location: "Toledo · PR · Brasil",
  /**
   * URL pública: NEXT_PUBLIC_SITE_URL; senão o domínio de produção da Vercel
   * (que já vira o domínio próprio quando ele for configurado); senão localhost.
   * Controla canonical, hreflang, sitemap, robots e Open Graph.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),

  /** Pode ser sobrescrito por NEXT_PUBLIC_CONTACT_EMAIL. Vazio = canal some do site. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "gustavocunhasoares@hotmail.com",
  /** Só dígitos, com DDI e DDD (ex.: 5545999999999). Pode vir de NEXT_PUBLIC_WHATSAPP. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5545998483474",

  calLink: "gustavo-cunha",
  social: {
    github: "https://github.com/gustavocunha9978",
    linkedin: "https://www.linkedin.com/in/gustavo-cunha-934385184",
    cal: "https://cal.com/gustavo-cunha",
  },
  repoUrl: "https://github.com/gustavocunha9978/portfolio",

  /** Empresa atual. Com showEmployerName = false, o site troca o nome por "instituição financeira". */
  employer: {
    name: "Sicredi",
    showEmployerName: false,
  },

  languages: {
    pt: "Português (nativo) · Inglês (intermediário)",
    en: "Portuguese (native) · English (intermediate)",
  },

  /** Badge de status no hero e no header. */
  availableForWork: true,

  /** Projetos em destaque no CV (slugs de content/projects), na ordem em que aparecem. */
  cvProjects: ["personal-manager", "previsao-atoleiros"],

  cv: {
    pt: "/cv/gustavo-cunha-cv-pt.pdf",
    en: "/cv/gustavo-cunha-cv-en.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
