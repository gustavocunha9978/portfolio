"use client";

import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";

// O embed do Cal.com é pesado: só baixa quando a pessoa pede para ver a agenda.
const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => <div className="h-[560px] animate-pulse rounded-xl bg-surface-2" />,
});

export function CalEmbed({ calLink, label }: { calLink: string; label: string }) {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClass("secondary", "min-h-11")}
      >
        <Calendar className="size-4" aria-hidden="true" />
        {label}
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: 560, overflow: "auto" }}
        config={{ layout: "month_view", theme: resolvedTheme === "light" ? "light" : "dark" }}
      />
    </div>
  );
}
