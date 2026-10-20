import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { StackLine } from "@/components/ui/chip";
import { DeployStatus } from "./deploy-status";

/** Linha da lista "também fiz": título em serifa, carimbo, resumo e stack. */
export function ProjectRow({ project }: { project: ProjectFrontmatter; index?: number }) {
  const t = useTranslations("project");

  return (
    <li className="border-b-[1.5px] border-dashed border-line-strong">
      <Link
        href={{ pathname: "/projetos/[slug]", params: { slug: project.slug } }}
        className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-12 md:items-baseline"
      >
        <span className="md:col-span-7">
          <span className="flex items-start justify-between gap-4">
            <span className="font-display text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-fg-accent sm:text-3xl">
              {project.title}
            </span>
            <ArrowUpRight
              className="mt-1.5 size-5 shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg-accent md:hidden"
              aria-hidden="true"
            />
          </span>
          <span className="mt-2 block max-w-xl leading-relaxed text-ink-1">{project.summary}</span>
          <StackLine items={project.stack.slice(0, 6)} className="mt-3" />
        </span>
        <span className="label-caps text-ink-2 md:col-span-3">
          {project.category.map((c) => t(`category.${c}`)).join(" · ")}
        </span>
        <span className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
          <DeployStatus status={project.status} />
          <ArrowUpRight
            className="hidden size-5 shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg-accent md:block"
            aria-hidden="true"
          />
        </span>
      </Link>
    </li>
  );
}
