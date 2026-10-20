import type { Locale } from "@/i18n/routing";
import { isTodo } from "@/lib/todo";
import { siteConfig } from "@/site.config";

const whatsappGreeting: Record<Locale, string> = {
  pt: "Olá, Gustavo! Vi seu portfólio e gostaria de conversar sobre",
  en: "Hi Gustavo! I saw your portfolio and would like to talk about",
};

/** O canal só aparece no site quando o valor é real (não vazio, não TODO, não 000…). */
export function hasEmail(email: string = siteConfig.email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !isTodo(email);
}

export function hasWhatsapp(phone: string = siteConfig.whatsapp) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && !/^0+$/.test(digits.slice(2));
}

/** Link wa.me com mensagem pré-preenchida no idioma atual. */
export function whatsappUrl(locale: Locale, phone: string = siteConfig.whatsapp) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(whatsappGreeting[locale] + " ")}`;
}

export function mailtoUrl(email: string = siteConfig.email) {
  return `mailto:${email}`;
}
