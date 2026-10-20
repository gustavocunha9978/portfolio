import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { employerAt } from "@/lib/employer";
import { siteConfig } from "@/site.config";
import { Circled, HandArrow, Note } from "@/components/sketch/sketch";
import { StatusBadge } from "@/components/ui/status-badge";
import { CountUp } from "./count-up";
import { HeroNetwork } from "./hero-network";

type Metric = { value: number; suffix?: string; label: string };

export async function Hero({ metrics }: { metrics: Metric[] }) {
  const t = await getTranslations("home");
  const locale = await getLocale();

  const paths = [
    {
      href: "/experiencia" as const,
      title: t("paths.recruiter.title"),
      desc: t("paths.recruiter.desc"),
    },
    { href: "/servicos" as const, title: t("paths.client.title"), desc: t("paths.client.desc") },
  ];

  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-4 pt-10 pb-14 *:min-w-0 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-7">
          {siteConfig.availableForWork && <StatusBadge>{t("available")}</StatusBadge>}

          <p className="mt-10 -rotate-2 hand text-2xl sm:text-3xl">{t("hello")}</p>
          <h1
            id="hero-title"
            className="mt-1 text-[clamp(3.6rem,11vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.04em]"
          >
            Gustavo Cunha
          </h1>
          <p className="mt-5 text-lg font-medium text-ink-1 sm:text-xl">{t("role")}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-1">
            {t.rich("value", {
              employerAt: employerAt(locale),
              em: (chunks) => <mark className="bg-transparent mark text-ink-0">{chunks}</mark>,
            })}
          </p>

          <div className="mt-10 max-w-xl">
            <Note className="flex items-end gap-1">
              {t("pathsNote")}
              <HandArrow variant="down-right" className="w-9 translate-y-2" />
            </Note>
            <nav aria-label={t("paths.label")} className="mt-3 grid gap-3 sm:grid-cols-2">
              {paths.map((p, i) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`group flex min-h-20 items-center justify-between gap-3 rounded-md border-[1.5px] border-ink-0 bg-surface-1 px-4 py-3 shadow-paper transition-transform duration-150 hover:-translate-y-0.5 ${i ? "sm:rotate-[0.6deg]" : "sm:-rotate-[0.6deg]"}`}
                >
                  <span>
                    <span className="block font-display text-xl font-medium">{p.title}</span>
                    <span className="block text-sm text-ink-2">{p.desc}</span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:pt-6">
          <Note className="absolute top-0 right-2 rotate-3 sm:right-8">
            {t("networkNote")}
            <HandArrow variant="down-left" className="ml-auto block w-12" />
          </Note>
          <div className="pt-14">
            <HeroNetwork label={t("network.label")} me={t("me")} />
          </div>
        </div>
      </div>

      {/* Números, circulados à caneta como num rascunho de reunião. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y-[1.5px] border-dashed border-line-strong py-10 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="flex flex-col-reverse">
              <dt className="mt-3 max-w-[15rem] text-sm leading-snug text-ink-1">{m.label}</dt>
              <dd className="font-display text-5xl font-medium tracking-[-0.03em] sm:text-6xl">
                {i === 0 ? (
                  <Circled>
                    <CountUp value={m.value} suffix={m.suffix} />
                  </Circled>
                ) : (
                  <CountUp value={m.value} suffix={m.suffix} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
