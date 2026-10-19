import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/site.config";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-[1.5fr_1fr_auto] sm:px-6">
        <div>
          <p className="font-mono text-sm text-ink-0">gustavo.cunha</p>
          <p className="mt-2 text-sm text-ink-2">{t("tagline")}</p>
          <p className="mt-1 text-sm text-ink-2">{siteConfig.location}</p>
        </div>
        <nav aria-label={nav("primary")}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {mainNav.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className="text-ink-1 hover:text-ink-0">
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-start gap-3">
          <a
            href={siteConfig.social.github}
            aria-label="GitHub"
            rel="me"
            className="text-ink-1 hover:text-ink-0"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            aria-label="LinkedIn"
            rel="me"
            className="text-ink-1 hover:text-ink-0"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-xs text-ink-2 sm:px-6">
          © {new Date().getFullYear()} {siteConfig.fullName} · {t("built")} ·{" "}
          <a
            href={siteConfig.repoUrl}
            className="underline decoration-line-strong underline-offset-4 hover:text-ink-0"
          >
            {t("source")}
          </a>
        </p>
      </div>
    </footer>
  );
}
