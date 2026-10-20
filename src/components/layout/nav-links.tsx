"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/nav";

export function NavLinks({
  className,
  onNavigate,
  large,
}: {
  className?: string;
  onNavigate?: () => void;
  /** Versão do menu mobile: links grandes, numerados. */
  large?: boolean;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {mainNav.map(({ key, href }, i) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <li key={key}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "transition-colors",
                large
                  ? "flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl tracking-[-0.03em]"
                  : "relative py-2 text-sm",
                active ? "text-ink-0" : "text-ink-1 hover:text-ink-0",
                !large &&
                  "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-fg-brand after:transition-transform after:duration-200",
                !large &&
                  (active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"),
              )}
            >
              {large && (
                <span className="label-caps text-fg-brand">{String(i + 1).padStart(2, "0")}</span>
              )}
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
