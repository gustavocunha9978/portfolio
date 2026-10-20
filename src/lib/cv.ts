import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/site.config";

/**
 * Link do PDF do CV no idioma, ou `null` se o arquivo ainda não existe em public/.
 * Evita botão "Baixar CV" levando a um 404.
 */
export function cvHref(locale: Locale): string | null {
  const href = siteConfig.cv[locale];
  return fs.existsSync(path.join(process.cwd(), "public", href)) ? href : null;
}
