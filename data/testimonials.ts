import type { Localized } from "./types";

export type Testimonial = {
  id: string;
  quote: Localized;
  author: string;
  role: Localized;
  /** Foto em /public/images/testimonials/ (opcional). */
  avatar?: string;
  featured?: boolean;
  /** true enquanto for placeholder — não aparece em produção. */
  todo?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "academia",
    todo: true,
    featured: true,
    quote: {
      pt: "[TODO: depoimento do cliente da academia sobre o Personal Manager]",
      en: "[TODO: gym client testimonial about Personal Manager]",
    },
    author: "[TODO: nome]",
    role: { pt: "[TODO: cargo · empresa]", en: "[TODO: role · company]" },
  },
  {
    id: "escritorio",
    todo: true,
    quote: {
      pt: "[TODO: depoimento do escritório Maschio & Soares]",
      en: "[TODO: testimonial from Maschio & Soares law firm]",
    },
    author: "[TODO: nome]",
    role: { pt: "[TODO: cargo · empresa]", en: "[TODO: role · company]" },
  },
  {
    id: "colega",
    todo: true,
    quote: {
      pt: "[TODO: depoimento de colega ou gestor]",
      en: "[TODO: testimonial from a colleague or manager]",
    },
    author: "[TODO: nome]",
    role: { pt: "[TODO: cargo · empresa]", en: "[TODO: role · company]" },
  },
];
