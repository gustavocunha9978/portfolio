import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, type Locale } from "./routing";

export type LocaleParams = { params: Promise<{ locale: string }> };

/**
 * Next 15: `params` é assíncrono. Valida o locale (404 se inválido) e habilita
 * renderização estática do next-intl. Use no topo de toda page/layout.
 */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
