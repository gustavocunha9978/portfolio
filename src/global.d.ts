import type { routing } from "@/i18n/routing";
import type messages from "../messages/pt.json";

// Tipagem forte de chaves de tradução e de locales do next-intl.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
