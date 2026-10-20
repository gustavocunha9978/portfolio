import { ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { cn } from "@/lib/cn";
import { StackLine } from "@/components/ui/chip";
import { DeployStatus } from "./deploy-status";

type Props = {
  project: ProjectFrontmatter;
  priority?: boolean;
  className?: string;
};

/** Card editorial: imagem com filete, ficha em uma linha, título grande, stack em barras. */
export function ProjectCard({ project, priority, className }: Props) {
  const t = useTranslations("project");

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface-1">
        <Image
          src={project.cover}
          alt=""
          fill
          priority={priority}
          unoptimized={project.cover.endsWith(".svg")}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line pb-3">
          <span className="label-caps text-ink-2">
            {project.category.map((c) => t(`category.${c}`)).join(" · ")}
          </span>
          <DeployStatus status={project.status} />
        </div>

        <h3 className="mt-4 flex items-start justify-between gap-4 text-2xl font-medium tracking-[-0.03em]">
          <Link
            href={{ pathname: "/projetos/[slug]", params: { slug: project.slug } }}
            className="group-hover:text-fg-brand after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg-brand"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-1">{project.summary}</p>

        <div className="mt-auto pt-5">
          <StackLine items={project.stack.slice(0, 6)} />
          {project.visibility === "privado" && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-2">
              <Lock className="size-3.5" aria-hidden="true" />
              {t("privateShort")}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
