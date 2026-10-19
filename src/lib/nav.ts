import type { AppPathname } from "@/i18n/routing";

/** Rotas sem segmento dinâmico ([slug]) — as únicas que cabem num link de menu. */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;

export type NavKey = "projects" | "experience" | "services" | "about" | "contact";

export const mainNav: { key: NavKey; href: StaticPathname }[] = [
  { key: "projects", href: "/projetos" },
  { key: "experience", href: "/experiencia" },
  { key: "services", href: "/servicos" },
  { key: "about", href: "/sobre" },
  { key: "contact", href: "/contato" },
];
