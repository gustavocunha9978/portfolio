import { HomeView } from "@/components/home/home-view";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { siteConfig } from "@/site.config";

export default async function HomePage({ params }: LocaleParams) {
  await resolveLocale(params);
  return <HomeView variant={siteConfig.heroVariant} />;
}
