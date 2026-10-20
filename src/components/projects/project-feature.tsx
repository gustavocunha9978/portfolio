import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { HandArrow, Note, Taped } from "@/components/sketch/sketch";
import { StackLine } from "@/components/ui/chip";
import { DeployStatus } from "./deploy-status";

/** Projeto principal: print grande colado na página, com anotação à caneta ao lado. */
export function ProjectFeature({
  project,
  label,
  note,
}: {
  project: ProjectFrontmatter;
  label: string;
  /** Anotação à caneta apontando para o print. */
  note?: string;
}) {
  const t = useTranslations("project");
  const href = { pathname: "/projetos/[slug]" as const, params: { slug: project.slug } };

  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div className="relative lg:col-span-7">
        <Taped tilt={-1}>
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="relative block aspect-[16/10] overflow-hidden"
          >
            <Image
              src={project.cover}
              alt=""
              fill
              unoptimized={project.cover.endsWith(".svg")}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </Link>
        </Taped>
        {note && (
          <Note className="mt-5 flex items-start gap-2 lg:absolute lg:-bottom-14 lg:left-6 lg:mt-0">
            <HandArrow variant="up-right" className="w-9 shrink-0 -scale-x-100" />
            {note}
          </Note>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hand text-lg">{label}</span>
          <DeployStatus status={project.status} />
        </div>
        <h3 className="mt-3 text-4xl font-medium tracking-[-0.025em] sm:text-5xl">
          <Link href={href} className="hover:text-fg-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-1">{project.summary}</p>

        {project.metrics.length > 0 && (
          <ul className="mt-6 space-y-2">
            {project.metrics.map((m) => (
              <li key={m} className="flex items-baseline gap-2 font-display text-lg">
                <span className="text-fg-brand" aria-hidden="true">
                  ✓
                </span>
                {m}
              </li>
            ))}
          </ul>
        )}

        <StackLine items={project.stack.slice(0, 8)} className="mt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={href}
            className="group inline-flex items-center gap-2 font-medium underline decoration-fg-accent decoration-wavy decoration-[1.5px] underline-offset-[6px] hover:text-fg-accent"
          >
            {t("readCase")}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          {project.visibility === "privado" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-2">
              <Lock className="size-3.5" aria-hidden="true" />
              {t("privateShort")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
