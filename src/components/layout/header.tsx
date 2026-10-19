import { Download } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/site.config";
import { buttonClass } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const cvHref = siteConfig.cv[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-surface-0/80 backdrop-blur-md print:hidden">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface-1 focus:px-3 focus:py-2"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${siteConfig.name} — ${t("home")}`}
        >
          <span
            className="grid size-8 place-items-center rounded-lg font-mono text-sm font-semibold border-gradient"
            aria-hidden="true"
          >
            gc
          </span>
          <span className="hidden font-mono text-sm text-ink-1 transition-colors group-hover:text-ink-0 sm:inline">
            gustavo.cunha
          </span>
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <NavLinks className="flex items-center gap-1" />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <a href={cvHref} download className={buttonClass("secondary", "px-3 py-2 max-md:hidden")}>
            <Download className="size-4" aria-hidden="true" />
            {t("cv")}
          </a>
          <Link href="/contato" className={buttonClass("primary", "px-3 py-2 max-sm:hidden")}>
            {t("cta")}
          </Link>
          <MobileMenu>
            <LocaleSwitcher />
            <ThemeToggle />
            <a href={cvHref} download className={buttonClass("secondary")}>
              <Download className="size-4" aria-hidden="true" />
              {t("cv")}
            </a>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
