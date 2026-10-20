"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

const palette = {
  dark: {
    background: "#1b1e23",
    primaryColor: "#23272e",
    primaryBorderColor: "#ede8dd",
    primaryTextColor: "#ede8dd",
    lineColor: "#8ab0ff",
    secondaryColor: "#23272e",
    tertiaryColor: "#1b1e23",
  },
  light: {
    background: "#fbf9f4",
    primaryColor: "#fbf9f4",
    primaryBorderColor: "#1b1a17",
    primaryTextColor: "#1b1a17",
    lineColor: "#1f4fbf",
    secondaryColor: "#ebe6da",
    tertiaryColor: "#fbf9f4",
  },
};

/** Diagrama Mermaid renderizado no cliente; a lib (pesada) só carrega quando a página tem diagrama. */
export function Mermaid({ chart }: { chart: string }) {
  const t = useTranslations("case");
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const [visible, setVisible] = useState(false);

  // A lib do Mermaid é pesada: só baixa e renderiza quando o diagrama chega perto da tela.
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const theme = resolvedTheme === "light" ? "light" : "dark";
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-plex), sans-serif",
          themeVariables: { ...palette[theme], fontSize: "14px" },
          flowchart: { curve: "basis", htmlLabels: false, useMaxWidth: false },
        });
        const { svg } = await mermaid.render(`mmd-${id}-${theme}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, id, visible]);

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
          className="flex min-h-48 justify-start lg:justify-center [&_svg]:h-auto [&_svg]:max-w-none"
        />
      )}
    </figure>
  );
}
