import { useTranslations } from "next-intl";
import type { ProjectStatus } from "@/lib/content/schema";
import { cn } from "@/lib/cn";

const styles: Record<ProjectStatus, { dot: string; text: string }> = {
  produção: { dot: "bg-fg-brand", text: "text-fg-brand" },
  concluído: { dot: "bg-fg-accent", text: "text-fg-accent" },
  "em andamento": { dot: "bg-fg-warn", text: "text-fg-warn" },
};

/** Status do projeto: quadradinho de cor + rótulo em caixa alta. */
export function DeployStatus({ status, className }: { status: ProjectStatus; className?: string }) {
  const t = useTranslations("project.status");
  const s = styles[status];
  return (
    <span className={cn("inline-flex items-center gap-2 label-caps", s.text, className)}>
      <span className={cn("size-1.5", s.dot)} aria-hidden="true" />
      {t(status)}
    </span>
  );
}
