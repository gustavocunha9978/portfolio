import { ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { cn } from "@/lib/cn";
import { Taped } from "@/components/sketch/sketch";
import { StackLine } from "@/components/ui/chip";
import { DeployStatus } from "./deploy-status";

type Props = {
  project: ProjectFrontmatter;
  priority?: boolean;
  /** Inclinação do print colado (pequena, alterna entre os cards). */
  tilt?: number;
  className?: string;
};

/** Print colado com fita + legenda: título em serifa, carimbo de status, stack. */
export function ProjectCard({ project, priority, tilt = 0, className }: Props) {
  const t = useTranslations("project");

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Taped tilt={tilt} className="transition-transform duration-200 group-hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.cover}
            alt=""
            fill
            priority={priority}
            unoptimized={project.cover.endsWith(".svg")}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
        </div>
      </Taped>

      <div className="flex flex-1 flex-col pt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="label-caps text-ink-2">
            {project.category.map((c) => t(`category.${c}`)).join(" · ")}
          </span>
          <DeployStatus status={project.status} />
        </div>

        <h2 className="mt-3 flex items-start justify-between gap-4 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
          <Link
            href={{ pathname: "/projetos/[slug]", params: { slug: project.slug } }}
            className="group-hover:text-fg-accent after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg-accent"
            aria-hidden="true"
          />
        </h2>
        <p className="mt-2 leading-relaxed text-ink-1">{project.summary}</p>

        <div className="mt-auto pt-5">
          <StackLine items={project.stack.slice(0, 6)} />
          {project.visibility === "privado" && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-2">
              <Lock className="size-3.5" aria-hidden="true" />
              {t("privateShort")}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
