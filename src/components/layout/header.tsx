import { Download } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cvHref } from "@/lib/cv";
import { siteConfig } from "@/site.config";
import { buttonClass } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const cv = cvHref(locale);

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-ink-0 bg-surface-0 print:hidden">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink-0 focus:px-3 focus:py-2 focus:text-surface-0"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-[-0.01em] whitespace-nowrap"
          aria-label={`${siteConfig.name} — ${t("home")}`}
        >
          Gustavo Cunha
          <span className="text-fg-brand" aria-hidden="true">
            .
          </span>
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <NavLinks className="flex items-center gap-7" />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          {cv && (
            <a
              href={cv}
              download
              className={buttonClass("secondary", "min-h-9 px-3.5 py-1.5 max-md:hidden")}
            >
              <Download className="size-4" aria-hidden="true" />
              {t("cv")}
            </a>
          )}
          <MobileMenu>
            <LocaleSwitcher />
            <ThemeToggle />
            {cv && (
              <a href={cv} download className={buttonClass("secondary")}>
                <Download className="size-4" aria-hidden="true" />
                {t("cv")}
              </a>
            )}
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
