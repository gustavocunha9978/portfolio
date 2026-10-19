"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type ConsoleService = {
  name: string;
  status: string;
  detail: string;
  tone: "ok" | "info" | "warn";
};

type Props = {
  title: string;
  label: string;
  servicesLabel: string;
  logLabel: string;
  services: ConsoleService[];
  lines: string[];
};

const toneDot = { ok: "bg-fg-brand", info: "bg-fg-accent", warn: "bg-fg-warn" } as const;
const toneText = { ok: "text-fg-brand", info: "text-fg-accent", warn: "text-fg-warn" } as const;

/**
 * Variação B do hero: um painel de status "de produção" com log rodando.
 * Os eventos são ilustrativos, mas cada um corresponde a algo real dos projetos.
 */
export function HeroConsole({ title, label, servicesLabel, logLabel, services, lines }: Props) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(lines.length);

  useEffect(() => {
    if (reduced) {
      setVisible(lines.length);
      return;
    }
    setVisible(1);
    let n = 1;
    const id = window.setInterval(() => {
      n = n >= lines.length + 2 ? 1 : n + 1; // pausa de 2 ticks no fim, depois recomeça
      setVisible(Math.min(n, lines.length));
    }, 1400);
    return () => window.clearInterval(id);
  }, [reduced, lines.length]);

  return (
    <div
      role="img"
      aria-label={label}
      className="overflow-hidden rounded-2xl border border-line bg-surface-1/90 font-mono text-[0.78rem] shadow-[0_0_80px_-20px_var(--glow)] backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-line-strong" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line-strong" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line-strong" aria-hidden="true" />
        <span className="ml-2 text-ink-2">{title}</span>
      </div>

      <div className="px-4 pt-4 pb-2">
        <p className="mb-2 text-[0.68rem] tracking-wider text-ink-2 uppercase">{servicesLabel}</p>
        <ul className="divide-y divide-line/70">
          {services.map((s) => (
            <li
              key={s.name}
              className="grid grid-cols-[1fr_auto] items-center gap-3 py-2 sm:grid-cols-[1.3fr_auto_1fr]"
            >
              <span className="truncate text-ink-0">{s.name}</span>
              <span className={cn("inline-flex items-center gap-1.5", toneText[s.tone])}>
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    toneDot[s.tone],
                    s.tone === "ok" && "motion-safe:animate-pulse-dot",
                  )}
                  aria-hidden="true"
                />
                {s.status}
              </span>
              <span className="hidden truncate text-right text-ink-2 sm:block">{s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line bg-surface-0/40 px-4 py-4">
        <p className="mb-2 text-[0.68rem] tracking-wider text-ink-2 uppercase">{logLabel}</p>
        <ol className="min-h-[9.5rem] space-y-1.5" aria-hidden="true">
          {lines.slice(0, visible).map((line, i) => (
            <li
              key={`${i}-${line}`}
              className={cn("truncate", line.startsWith("$") ? "text-ink-0" : "text-ink-1")}
            >
              <span className="mr-2 text-ink-2">{String(i + 1).padStart(2, "0")}</span>
              {line}
            </li>
          ))}
          {!reduced && (
            <li className="text-fg-brand">
              <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-fg-brand motion-safe:animate-pulse" />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}
