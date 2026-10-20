import { ArrowRight, Calendar } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/content/loader";
import { hasWhatsapp, whatsappUrl } from "@/lib/links";
import { siteConfig } from "@/site.config";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFeature } from "@/components/projects/project-feature";
import { ProjectRow } from "@/components/projects/project-row";
import { HandArrow, HandCheck, Note, Taped } from "@/components/sketch/sketch";
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
  const grid = rest.slice(0, 4);
  const more = rest.slice(4);

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
        {/* Trabalhos: o principal grande, depois prints colados, depois uma lista. */}
        <Section
          id="trabalhos"
          kicker={t("featured.kicker")}
          title={t("featured.title")}
          subtitle={t("featured.subtitle")}
        >
          {lead && (
            <Reveal>
              <ProjectFeature
                project={lead}
                label={t("featured.lead")}
                note={t("featured.leadNote")}
              />
            </Reveal>
          )}

          {grid.length > 0 && (
            <ul className="mt-28 grid gap-x-12 gap-y-20 md:grid-cols-2">
              {grid.map((p, i) => (
                <li key={p.slug} className={i % 2 ? "md:mt-16" : ""}>
                  <Reveal delay={(i % 2) * 0.08}>
                    <ProjectCard project={p} tilt={i % 2 ? 0.8 : -0.8} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}

          {more.length > 0 && (
            <div className="mt-24">
              <Note>{t("featured.index")}:</Note>
              <ul className="mt-2 border-t-[1.5px] border-dashed border-line-strong">
                {more.map((p) => (
                  <ProjectRow key={p.slug} project={p} />
                ))}
              </ul>
            </div>
          )}

          <Link href="/projetos" className={buttonClass("secondary", "mt-12")}>
            {t("featured.all")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Section>

        {/* Um exemplo técnico, contado como num caderno. */}
        <Section id="visao" kicker={t("vision.kickerIndex")}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <h2 className="text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl">
                {t("vision.title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-1">{t("vision.body")}</p>
              <Link
                href={{ pathname: "/projetos/[slug]", params: { slug: "contagem-pessoas-igreja" } }}
                className={buttonClass("ghost", "mt-6")}
              >
                {t("vision.cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="relative lg:col-span-7">
              <Taped tilt={0.8}>
                <VisionDemo
                  labels={{
                    entries: t("vision.counter"),
                    exits: t("vision.exits"),
                    camera: t("vision.camera"),
                    deadZone: t("vision.deadZone"),
                    label: t("vision.label"),
                  }}
                />
              </Taped>
              <Note className="mt-6 flex items-start gap-2 sm:ml-[40%]">
                <HandArrow variant="up-right" className="w-9 shrink-0 -scale-x-100" />
                {t("vision.deadZoneNote")}
              </Note>
            </Reveal>
          </div>
        </Section>

        {/* Ferramentas: lista de conferência, ticada à mão. */}
        <Section id="ferramentas" kicker={t("stack.kicker")} title={t("stack.title")}>
          <Reveal>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((g) => {
                const used = g.skills.filter((s) => s.level === "production").map((s) => s.name);
                if (used.length === 0) return null;
                return (
                  <div key={g.id}>
                    <h3 className="border-b-[1.5px] border-ink-0 pb-2 text-xl font-medium">
                      {g.title[locale]}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {used.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-ink-1">
                          <HandCheck />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <Link
              href={{ pathname: "/experiencia", hash: "skills" }}
              className={buttonClass("ghost", "mt-10")}
            >
              {t("stack.more")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </Section>

        {/* Contato: um bilhete colado na página. */}
        <section id="contato" aria-labelledby="contato-title" className="py-16 sm:py-24">
          <Reveal>
            <div className="relative mx-auto max-w-3xl">
              <Taped tilt={-0.8} className="px-6 py-10 sm:px-12 sm:py-14">
                <p className="hand text-xl">{t("contact.kicker")}</p>
                <h2
                  id="contato-title"
                  className="mt-2 text-4xl font-medium tracking-[-0.025em] text-balance sm:text-5xl"
                >
                  {t("contact.title")}
                </h2>
                <p className="mt-4 max-w-md text-lg text-ink-1">{t("contact.body")}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href={siteConfig.social.cal} className={buttonClass("primary")}>
                    <Calendar className="size-4" aria-hidden="true" />
                    {t("contact.schedule")}
                  </a>
                  {hasWhatsapp() && (
                    <a href={whatsappUrl(locale)} className={buttonClass("secondary")}>
                      {t("contact.whatsapp")}
                    </a>
                  )}
                  <Link href="/contato" className={buttonClass("ghost")}>
                    {t("contact.form")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </Taped>
              <Note className="absolute -right-2 -bottom-10 rotate-[-4deg] sm:-right-10">
                {t("contact.note")} :)
              </Note>
            </div>
          </Reveal>
        </section>
      </Container>
    </>
  );
}
