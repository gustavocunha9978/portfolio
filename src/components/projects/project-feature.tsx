import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { StackLine } from "@/components/ui/chip";
import { DeployStatus } from "./deploy-status";

/** Projeto principal: imagem grande à esquerda, texto numa coluna estreita à direita. */
export function ProjectFeature({ project, label }: { project: ProjectFrontmatter; label: string }) {
  const t = useTranslations("project");
  const href = { pathname: "/projetos/[slug]" as const, params: { slug: project.slug } };

  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="group relative block aspect-[16/10] overflow-hidden border border-line bg-surface-1 lg:col-span-8"
      >
        <Image
          src={project.cover}
          alt=""
          fill
          unoptimized={project.cover.endsWith(".svg")}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </Link>

      <div className="flex flex-col lg:col-span-4">
        <p className="label-caps text-ink-2">
          <span className="text-fg-brand">01</span> — {label}
        </p>
        <h3 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
          <Link href={href} className="hover:text-fg-brand">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 leading-relaxed text-ink-1">{project.summary}</p>

        {project.metrics.length > 0 && (
          <ul className="mt-6 border-t border-line">
            {project.metrics.map((m) => (
              <li
                key={m}
                className="border-b border-line py-2.5 font-display text-lg tracking-[-0.01em]"
              >
                {m}
              </li>
            ))}
          </ul>
        )}

        <StackLine items={project.stack.slice(0, 8)} className="mt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-8">
          <Link
            href={href}
            className="group inline-flex items-center gap-2 font-medium underline decoration-line-strong underline-offset-[6px] hover:decoration-fg-brand"
          >
            {t("readCase")}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <DeployStatus status={project.status} />
          {project.visibility === "privado" && (
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-2">
              <Lock className="size-3.5" aria-hidden="true" />
              {t("privateShort")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
