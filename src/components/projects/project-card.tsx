import { ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/chip";
import { DeployStatus } from "./deploy-status";

type Props = {
  project: ProjectFrontmatter;
  /** Cards da Home mostram capa maior. */
  priority?: boolean;
  className?: string;
};

export function ProjectCard({ project, priority, className }: Props) {
  const t = useTranslations("project");
  const visibleStack = project.stack.slice(0, 5);
  const extra = project.stack.length - visibleStack.length;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-colors hover:border-line-strong",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={project.cover}
          alt=""
          fill
          priority={priority}
          unoptimized={project.cover.endsWith(".svg")}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DeployStatus status={project.status} />
          <span className="font-mono text-xs text-ink-2">
            {project.category.map((c) => t(`category.${c}`)).join(" · ")}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            <Link
              href={{ pathname: "/projetos/[slug]", params: { slug: project.slug } }}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-1">{project.summary}</p>
        </div>

        {project.metrics.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink-0">
            {project.metrics.slice(0, 2).map((m) => (
              <li key={m}>
                <span className="text-fg-brand" aria-hidden="true">
                  ▲{" "}
                </span>
                {m}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
          {visibleStack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          {extra > 0 && <Chip>+{extra}</Chip>}
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4 text-xs">
          {project.visibility === "privado" ? (
            <span className="inline-flex items-center gap-1.5 text-ink-2">
              <Lock className="size-3.5" aria-hidden="true" />
              {t("privateShort")}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 font-medium text-fg-accent">
            {t("readCase")}
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
