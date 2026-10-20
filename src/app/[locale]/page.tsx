import { HomeView } from "@/components/home/home-view";
import { resolveLocale, type LocaleParams } from "@/i18n/server";

export default async function HomePage({ params }: LocaleParams) {
  await resolveLocale(params);
  return <HomeView />;
}
