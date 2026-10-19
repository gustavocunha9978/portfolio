import type { Locale } from "@/i18n/routing";

/** Texto nos dois idiomas. Escreva cada versão de forma natural, não traduza ao pé da letra. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
