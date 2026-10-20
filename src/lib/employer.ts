import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/site.config";

const generic: Record<Locale, { name: string; at: string }> = {
  pt: { name: "Instituição financeira", at: "numa instituição financeira" },
  en: { name: "Financial institution", at: "at a financial institution" },
};

const prep: Record<Locale, string> = { pt: "no", en: "at" };

function show(override?: boolean) {
  return override ?? siteConfig.employer.showEmployerName;
}

/** Nome da empresa atual, ou o genérico quando showEmployerName = false. */
export function employerName(locale: Locale, showName?: boolean) {
  return show(showName) ? siteConfig.employer.name : generic[locale].name;
}

/** "no Sicredi" / "at Sicredi", ou "numa instituição financeira" / "at a financial institution". */
export function employerAt(locale: Locale, showName?: boolean) {
  return show(showName) ? `${prep[locale]} ${siteConfig.employer.name}` : generic[locale].at;
}

/** Troca {employerAt} em textos lidos com t.raw (sem interpolação ICU). */
export function withEmployer(text: string, locale: Locale) {
  return text.replaceAll("{employerAt}", employerAt(locale));
}
