/**
 * Configuração central do site. Edite aqui nome, links e contatos —
 * nenhum componente tem esses valores hardcoded.
 */
export const siteConfig = {
  name: "Gustavo Cunha",
  fullName: "Gustavo Cunha Soares dos Santos",
  location: "Toledo · PR · Brasil",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  email: "gustavocunhasoares@hotmail.com",
  /** Só dígitos, com DDI e DDD. Ex.: 5545999999999 */
  whatsapp: "5545998483474",

  calLink: "gustavo-cunha",
  social: {
    github: "https://github.com/gustavocunha9978",
    linkedin: "https://www.linkedin.com/in/gustavo-cunha-934385184",
    cal: "https://cal.com/gustavo-cunha",
  },
  repoUrl: "https://github.com/gustavocunha9978/portfolio",

  /** Badge de status no hero e no header. */
  availableForWork: true,

  cv: {
    pt: "/cv/gustavo-cunha-cv-pt.pdf",
    en: "/cv/gustavo-cunha-cv-en.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
