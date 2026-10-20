import type { Locale } from "@/i18n/routing";

const intlLocale: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

/** "2026-07" → "jul 2026" / "Jul 2026". Valores fora do padrão (ex.: "TODO") passam direto. */
export function formatMonth(value: string, locale: Locale) {
  const m = /^(\d{4})-(\d{2})$/.exec(value);
  if (!m) return value === "TODO" ? "[TODO]" : value;
  const date = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1));
  return new Intl.DateTimeFormat(intlLocale[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .replace(".", "")
    .replace(" de ", " ");
}

/**
 * Período de uma experiência. `end: null` = atual. Mesmo mês de início e fim = um mês só.
 * Datas vazias (TODO oculto em produção) são omitidas sem deixar traço solto.
 */
export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
) {
  const from = start ? formatMonth(start, locale) : "";
  const to = end === null ? presentLabel : end ? formatMonth(end, locale) : "";
  if (!from) return to;
  if (!to || from === to) return from;
  return `${from} – ${to}`;
}
