import { ArrowRight, Calendar } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/content/loader";
import { whatsappUrl } from "@/lib/links";
import { siteConfig } from "@/site.config";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/motion/reveal";
import { ProjectFeature } from "@/components/projects/project-feature";
import { ProjectRow } from "@/components/projects/project-row";
import { buttonClass } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { Hero } from "./hero";
import { VisionDemo } from "./vision-demo";

export async function HomeView() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const projects = (await getProjects(locale)).map((p) => p.frontmatter);
  const featured = projects.filter((p) => p.featured);
  const [lead, ...rest] = featured;

  const metrics = [
    { value: 100, suffix: "+", label: t("metrics.users") },
    {
      value: projects.filter((p) => p.status === "produção").length,
      label: t("metrics.production"),
    },
    { value: projects.length, label: t("metrics.cases") },
    { value: 194, label: t("metrics.tests") },
  ];

  return (
    <>
      <Hero metrics={metrics} />

      <Container>
        {/* 01 — Trabalhos selecionados */}
        <Section
          id="trabalhos"
          index="01"
          kicker={t("featured.kicker")}
          title={t("featured.title")}
          subtitle={t("featured.subtitle")}
          className="border-t-0"
        >
          {lead && (
            <Reveal>
              <ProjectFeature project={lead} label={t("featured.lead")} />
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-20">
              <p className="border-b border-ink-0 pb-3 label-caps text-ink-0">
                {t("featured.index")}
              </p>
              <ol>
                {rest.slice(0, 5).map((p, i) => (
                  <ProjectRow key={p.slug} project={p} index={i + 2} />
                ))}
              </ol>
            </div>
          )}

          <Link href="/projetos" className={buttonClass("secondary", "mt-10")}>
            {t("featured.all")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Section>

        {/* 02 — Visão computacional */}
        <Section id="visao" index="02" kicker={t("vision.kickerIndex")}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <h2 className="text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">
                {t("vision.title")}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-1">{t("vision.body")}</p>
              <Link
                href={{ pathname: "/projetos/[slug]", params: { slug: "contagem-pessoas-igreja" } }}
                className={buttonClass("ghost", "mt-6")}
              >
                {t("vision.cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <VisionDemo
                labels={{
                  entries: t("vision.counter"),
                  exits: t("vision.exits"),
                  camera: t("vision.camera"),
                  deadZone: t("vision.deadZone"),
                  label: t("vision.label"),
                }}
              />
            </Reveal>
          </div>
        </Section>

        {/* 03 — Ferramentas */}
        <Section id="ferramentas" index="03" kicker={t("stack.kicker")} title={t("stack.title")}>
          <Reveal>
            <dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((g) => {
                const used = g.skills.filter((s) => s.level === "production").map((s) => s.name);
                if (used.length === 0) return null;
                return (
                  <div key={g.id} className="border-b border-line py-6 pr-6">
                    <dt className="label-caps text-ink-2">{g.title[locale]}</dt>
                    <dd className="mt-3 space-y-1 text-[0.95rem] text-ink-0">
                      {used.map((s) => (
                        <span key={s} className="block">
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <Link
              href={{ pathname: "/experiencia", hash: "skills" }}
              className={buttonClass("ghost", "mt-8")}
            >
              {t("stack.more")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </Section>

        {/* 04 — Contato */}
        <Section id="contato" index="04" kicker={t("contact.kicker")}>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="text-4xl font-medium tracking-[-0.04em] text-balance sm:text-6xl">
                  {t("contact.title")}
                </h2>
                <p className="mt-4 max-w-md text-ink-1">{t("contact.body")}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <a href={siteConfig.social.cal} className={buttonClass("primary")}>
                  <Calendar className="size-4" aria-hidden="true" />
                  {t("contact.schedule")}
                </a>
                <a href={whatsappUrl(locale)} className={buttonClass("secondary")}>
                  {t("contact.whatsapp")}
                </a>
                <Link href="/contato" className={buttonClass("ghost", "w-full lg:w-auto")}>
                  {t("contact.form")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>
      </Container>
    </>
  );
}
