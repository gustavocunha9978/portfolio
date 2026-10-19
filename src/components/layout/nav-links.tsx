"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/nav";

export function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {mainNav.map(({ key, href }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <li key={key}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                active ? "text-ink-0" : "text-ink-1 hover:text-ink-0",
              )}
            >
              {active && (
                <span className="mr-1.5 font-mono text-fg-brand" aria-hidden="true">
                  ›
                </span>
              )}
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
