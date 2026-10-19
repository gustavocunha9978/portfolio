"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { NavLinks } from "./nav-links";

export function MobileMenu({ children }: { children?: React.ReactNode }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("close") : t("menu")}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-ink-1"
      >
        {open ? (
          <X className="size-4" aria-hidden="true" />
        ) : (
          <Menu className="size-4" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-surface-0/95 px-4 py-6 backdrop-blur"
        >
          <nav aria-label={t("primary")}>
            <NavLinks className="flex flex-col gap-1 text-base" onNavigate={() => setOpen(false)} />
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
