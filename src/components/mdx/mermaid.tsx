"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

const palette = {
  dark: {
    background: "#101a2c",
    primaryColor: "#16233a",
    primaryBorderColor: "#2e4366",
    primaryTextColor: "#e8eef7",
    lineColor: "#34d399",
    secondaryColor: "#16233a",
    tertiaryColor: "#101a2c",
  },
  light: {
    background: "#ffffff",
    primaryColor: "#edf2f7",
    primaryBorderColor: "#b9c6d6",
    primaryTextColor: "#0b1220",
    lineColor: "#047857",
    secondaryColor: "#edf2f7",
    tertiaryColor: "#ffffff",
  },
};

/** Diagrama Mermaid renderizado no cliente; a lib (pesada) só carrega quando a página tem diagrama. */
export function Mermaid({ chart }: { chart: string }) {
  const t = useTranslations("case");
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const theme = resolvedTheme === "light" ? "light" : "dark";
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          themeVariables: { ...palette[theme], fontSize: "14px" },
          flowchart: { curve: "basis", htmlLabels: false },
        });
        const { svg } = await mermaid.render(`mmd-${id}-${theme}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, id]);

  return (
    <figure className="not-prose my-8 overflow-x-auto rounded-2xl border border-line bg-surface-1 p-4 sm:p-6">
      <figcaption className="mb-4 font-mono text-xs tracking-wider text-ink-2 uppercase">
        {t("diagram")}
      </figcaption>
      {failed ? (
        <pre className="font-mono text-xs whitespace-pre-wrap text-ink-1">{chart}</pre>
      ) : (
        <div
          ref={ref}
          role="img"
          aria-label={t("diagram")}
          className="flex min-h-48 justify-center [&_svg]:h-auto [&_svg]:max-w-full"
        />
      )}
    </figure>
  );
}
