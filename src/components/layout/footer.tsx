import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hasEmail, mailtoUrl } from "@/lib/links";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/site.config";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const social = [
    { label: "GitHub", href: siteConfig.social.github },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "Cal.com", href: siteConfig.social.cal },
  ];

  return (
    <footer className="border-t-[1.5px] border-ink-0 print:hidden">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
        {hasEmail() && (
          <>
            <p className="hand text-2xl">{t("lead")}</p>
            <a
              href={mailtoUrl()}
              className="group mt-4 inline-flex max-w-full items-start gap-2 font-display text-[clamp(1.9rem,6.5vw,4.75rem)] leading-[1.05] font-medium tracking-[-0.03em] break-all"
            >
              <span className="bg-transparent mark">{siteConfig.email}</span>
              <ArrowUpRight
                className="mt-[0.15em] size-[0.6em] shrink-0 text-fg-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </a>
          </>
        )}

        <div className="mt-16 grid gap-10 border-t-[1.5px] border-dashed border-line-strong pt-10 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <p className="font-display font-semibold">
              Gustavo Cunha<span className="text-fg-brand">.</span>
            </p>
            <p className="mt-2 text-sm text-ink-2">{t("tagline")}</p>
            <p className="mt-1 text-sm text-ink-2">{siteConfig.location}</p>
          </div>
          <nav aria-label={nav("primary")} className="sm:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {mainNav.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="text-ink-1 hover:text-ink-0">
                    {nav(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/musica" className="text-ink-1 hover:text-ink-0">
                  {nav("music")}
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-ink-1 hover:text-ink-0">
                  CV
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="space-y-2.5 text-sm sm:col-span-4 sm:text-right">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-ink-1 hover:text-ink-0"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 flex flex-wrap justify-between gap-2 font-mono text-xs text-ink-2">
          <span>
            © {new Date().getFullYear()} {siteConfig.fullName}
          </span>
          <span>
            {t("built")} ·{" "}
            <a
              href={siteConfig.repoUrl}
              className="underline decoration-line-strong underline-offset-4 hover:text-ink-0"
            >
              {t("source")}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
