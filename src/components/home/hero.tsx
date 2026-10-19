import { ArrowRight, Briefcase, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ProjectFrontmatter } from "@/lib/content/schema";
import { siteConfig } from "@/site.config";
import { StatusBadge } from "@/components/ui/status-badge";
import { HeroConsole, type ConsoleService } from "./hero-console";
import { HeroNetwork } from "./hero-network";

export type HeroVariant = "network" | "console";

type Props = { variant: HeroVariant; projects: ProjectFrontmatter[] };

export async function Hero({ variant, projects }: Props) {
  const t = await getTranslations("home");
  const ts = await getTranslations("status");
  const tp = await getTranslations("project");

  const tone = { produção: "ok", concluído: "info", "em andamento": "warn" } as const;
  const services: ConsoleService[] = projects.slice(0, 5).map((p) => ({
    name: p.slug,
    status: tp(`status.${p.status}`),
    detail: p.metrics[0] ?? p.stack.slice(0, 2).join(" · "),
    tone: tone[p.status],
  }));

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-grid opacity-60 motion-safe:animate-grid-pan"
        aria-hidden="true"
      />
      <div
        className="absolute top-[-20%] left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 *:min-w-0 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div>
          {siteConfig.availableForWork && <StatusBadge>{ts("available")}</StatusBadge>}

          <p className="mt-8 font-mono text-xs tracking-wider text-ink-2 uppercase">
            ~/{t("eyebrow")}
          </p>
          <h1
            id="hero-title"
            className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-balance sm:text-xl">
            <span className="text-gradient">{t("role")}</span>
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-pretty text-ink-1">{t("value")}</p>

          <nav aria-label={t("paths.label")} className="mt-9 grid gap-3 sm:grid-cols-2">
            <PathCard
              href="/experiencia"
              icon={<Briefcase className="size-4" aria-hidden="true" />}
              title={t("paths.recruiter.title")}
              desc={t("paths.recruiter.desc")}
            />
            <PathCard
              href="/servicos"
              icon={<Wrench className="size-4" aria-hidden="true" />}
              title={t("paths.client.title")}
              desc={t("paths.client.desc")}
            />
          </nav>
        </div>

        <div className="relative">
          {variant === "network" ? (
            <HeroNetwork label={t("network.label")} />
          ) : (
            <HeroConsole
              title={t("console.title")}
              label={t("console.label")}
              servicesLabel={t("console.services")}
              logLabel={t("console.log")}
              services={services}
              lines={t.raw("console.lines") as string[]}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function PathCard({
  href,
  icon,
  title,
  desc,
}: {
  href: "/experiencia" | "/servicos";
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-line bg-surface-1/80 p-4 backdrop-blur transition-colors hover:border-gradient"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-fg-brand">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{title}</span>
        <span className="block text-sm text-ink-2">{desc}</span>
      </span>
      <ArrowRight
        className="size-4 text-ink-2 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-0"
        aria-hidden="true"
      />
    </Link>
  );
}
