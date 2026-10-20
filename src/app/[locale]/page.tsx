import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeView } from "@/components/home/home-view";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { employerName } from "@/lib/employer";
import { hasEmail } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { resolveSkills } from "@/lib/skills";
import { siteConfig } from "@/site.config";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/", description: t("description") });
}

export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  const home = await getTranslations({ locale, namespace: "home" });
  const skillGroups = await resolveSkills(locale);

  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    jobTitle: home("role"),
    description: t("description"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toledo",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    worksFor: { "@type": "Organization", name: employerName(locale) },
    knowsAbout: [...new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name)))],
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    ...(hasEmail() ? { email: `mailto:${siteConfig.email}` } : {}),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeView />
    </>
  );
}
