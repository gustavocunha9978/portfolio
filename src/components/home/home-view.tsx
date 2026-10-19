import { ArrowRight, Calendar, Mail } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/content/loader";
import { whatsappUrl } from "@/lib/links";
import { siteConfig } from "@/site.config";
import { skillGroups } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import { WhatsappIcon } from "@/components/icons/brand";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { buttonClass } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container, Section } from "@/components/ui/section";
import { CountUp } from "./count-up";
import { Hero, type HeroVariant } from "./hero";
import { VisionDemo } from "./vision-demo";

/** Placeholders (todo: true) só aparecem em desenvolvimento. */
const showTodos = process.env.NODE_ENV !== "production";

export async function HomeView({ variant }: { variant: HeroVariant }) {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const projects = (await getProjects(locale)).map((p) => p.frontmatter);
  const featured = projects.filter((p) => p.featured);

  const metrics = [
    { value: 100, suffix: "+", label: t("metrics.users") },
    {
      value: projects.filter((p) => p.status === "produção").length,
      label: t("metrics.production"),
    },
    { value: projects.length, label: t("metrics.cases") },
    { value: 194, label: t("metrics.tests") },
  ];

  const productionStack = skillGroups.flatMap((g) =>
    g.skills.filter((s) => s.level === "production").map((s) => s.name),
  );
  const testimonial = testimonials.find((x) => x.featured && (showTodos || !x.todo));

  return (
    <>
      <Hero variant={variant} projects={featured} />

      {/* Métricas */}
      <section aria-label={t("metrics.label")} className="border-y border-line bg-surface-1/50">
        <Container>
          <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse px-2 py-8 lg:px-8">
                <dt className="mt-1 text-sm text-ink-2">{m.label}</dt>
                <dd className="font-mono text-3xl font-semibold text-ink-0 sm:text-4xl">
                  <CountUp value={m.value} suffix={m.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container>
        {/* Projetos em destaque */}
        <Section id="destaques" title={t("featured.title")} subtitle={t("featured.subtitle")}>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/projetos" className={buttonClass("secondary")}>
              {t("featured.all")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>

        {/* Visão computacional */}
        <Section id="visao" className="border-t border-line">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <p className="mb-3 font-mono text-xs tracking-wider text-fg-brand uppercase">
                {t("vision.kicker")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {t("vision.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-1">{t("vision.body")}</p>
              <Link
                href={{ pathname: "/projetos/[slug]", params: { slug: "contagem-pessoas-igreja" } }}
                className={buttonClass("secondary", "mt-6")}
              >
                {t("vision.cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
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

        {/* Stack */}
        <Section id="stack" title={t("stack.title")} className="border-t border-line">
          <Reveal>
            <ul className="flex flex-wrap gap-2">
              {productionStack.map((s) => (
                <li key={s}>
                  <Chip className="px-2.5 py-1 text-xs">{s}</Chip>
                </li>
              ))}
            </ul>
            <Link
              href={{ pathname: "/experiencia", hash: "skills" }}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fg-accent hover:underline"
            >
              {t("stack.more")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </Section>

        {/* Depoimento em destaque */}
        {testimonial && (
          <Section id="depoimento" className="border-t border-line">
            <Reveal>
              <figure
                className={
                  testimonial.todo
                    ? "rounded-2xl border border-dashed border-fg-warn/60 p-8"
                    : "rounded-2xl border border-line bg-surface-1 p-8"
                }
              >
                <p className="mb-4 font-mono text-xs tracking-wider text-ink-2 uppercase">
                  {t("testimonial.title")}
                </p>
                <blockquote className="text-xl leading-relaxed text-balance">
                  “{testimonial.quote[locale]}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-ink-2">
                  <span className="font-medium text-ink-0">{testimonial.author}</span> ·{" "}
                  {testimonial.role[locale]}
                </figcaption>
              </figure>
            </Reveal>
          </Section>
        )}

        {/* CTA */}
        <Section id="contato" className="border-t border-line">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-8 border-gradient sm:p-12">
              <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--glow),transparent_60%)]"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {t("contact.title")}
              </h2>
              <p className="mt-3 max-w-xl text-ink-1">{t("contact.body")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={siteConfig.social.cal} className={buttonClass("primary")}>
                  <Calendar className="size-4" aria-hidden="true" />
                  {t("contact.schedule")}
                </a>
                <a href={whatsappUrl(locale)} className={buttonClass("secondary")}>
                  <WhatsappIcon className="size-4" />
                  {t("contact.whatsapp")}
                </a>
                <Link href="/contato" className={buttonClass("ghost")}>
                  <Mail className="size-4" aria-hidden="true" />
                  {t("contact.form")}
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>
      </Container>
    </>
  );
}
