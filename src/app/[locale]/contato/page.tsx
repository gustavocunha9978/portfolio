import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { resolveLocale, type LocaleParams } from "@/i18n/server";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { CalEmbed } from "@/components/contact/cal-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/brand";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({ locale, href: "/contato", title: t("title"), description: t("intro") });
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tl = await getTranslations({ locale, namespace: "labels" });

  const channels = [
    {
      href: whatsappUrl(locale),
      label: t("whatsapp"),
      detail: "wa.me",
      icon: <WhatsappIcon className="size-5" />,
    },
    {
      href: mailtoUrl(),
      label: "E-mail",
      detail: siteConfig.email,
      icon: <Mail className="size-5" aria-hidden="true" />,
    },
    {
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
      detail: "in/gustavo-cunha",
      icon: <LinkedinIcon className="size-5" />,
    },
    {
      href: siteConfig.social.github,
      label: "GitHub",
      detail: "gustavocunha9978",
      icon: <GithubIcon className="size-5" />,
    },
  ];

  return (
    <>
      <PageHeader path={tl("contact")} title={t("title")} intro={t("intro")} />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
        <section
          aria-labelledby="form-title"
          className="rounded-2xl border border-line bg-surface-1 p-6 sm:p-8"
        >
          <h2 id="form-title" className="mb-6 text-xl font-semibold tracking-tight">
            {t("formTitle")}
          </h2>
          <ContactForm />
        </section>

        <div className="space-y-6">
          <section aria-labelledby="schedule-title" className="rounded-2xl p-6 border-gradient">
            <h2 id="schedule-title" className="text-lg font-semibold tracking-tight">
              {t("scheduleTitle")}
            </h2>
            <p className="mt-2 mb-5 text-sm text-ink-1">{t("scheduleBody")}</p>
            <CalEmbed calLink={siteConfig.calLink} label={t("scheduleLoad")} />
          </section>

          <section
            aria-labelledby="other-title"
            className="rounded-2xl border border-line bg-surface-1 p-6"
          >
            <h2 id="other-title" className="text-lg font-semibold tracking-tight">
              {t("otherTitle")}
            </h2>
            <ul className="mt-4 space-y-2">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="flex min-h-12 items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-2"
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="text-fg-brand">{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{c.label}</span>
                      <span className="block truncate font-mono text-xs text-ink-2">
                        {c.detail}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
