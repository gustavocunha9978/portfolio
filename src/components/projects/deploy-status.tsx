import { useTranslations } from "next-intl";
import type { ProjectStatus } from "@/lib/content/schema";
import { cn } from "@/lib/cn";

const styles: Record<ProjectStatus, { dot: string; text: string; pulse: boolean }> = {
  produção: { dot: "bg-fg-brand", text: "text-fg-brand", pulse: true },
  concluído: { dot: "bg-fg-accent", text: "text-fg-accent", pulse: false },
  "em andamento": { dot: "bg-fg-warn", text: "text-fg-warn", pulse: false },
};

/** Status no formato de painel de deploy: "● produção". */
export function DeployStatus({ status, className }: { status: ProjectStatus; className?: string }) {
  const t = useTranslations("project.status");
  const s = styles[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs", s.text, className)}>
      <span
        className={cn("size-1.5 rounded-full", s.dot, s.pulse && "motion-safe:animate-pulse-dot")}
        aria-hidden="true"
      />
      {t(status)}
    </span>
  );
}
