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
                  ? "flex items-baseline gap-4 border-b-[1.5px] border-dashed border-line-strong py-4 font-display text-3xl"
                  : "relative py-2 text-[0.95rem]",
                active ? "text-ink-0" : "text-ink-1 hover:text-ink-0",
                !large &&
                  active &&
                  "underline decoration-fg-accent decoration-wavy decoration-[1.5px] underline-offset-[7px]",
              )}
            >
              {large && <span className="hand text-lg">{String(i + 1).padStart(2, "0")}</span>}
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
