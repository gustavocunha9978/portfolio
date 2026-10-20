import { useTranslations } from "next-intl";
import type { ProjectStatus } from "@/lib/content/schema";
import { Stamp } from "@/components/sketch/sketch";

const tone = { produção: "brand", concluído: "accent", "em andamento": "warn" } as const;

/** Status do projeto como carimbo batido na folha. */
export function DeployStatus({ status, className }: { status: ProjectStatus; className?: string }) {
  const t = useTranslations("project.status");
  return (
    <Stamp tone={tone[status]} className={className}>
      {t(status)}
    </Stamp>
  );
}
