import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/site.config";
import { StatusBadge } from "@/components/ui/status-badge";
import { CountUp } from "./count-up";
import { HeroNetwork } from "./hero-network";

type Metric = { value: number; suffix?: string; label: string };

export async function Hero({ metrics }: { metrics: Metric[] }) {
  const t = await getTranslations("home");

  const paths = [
    {
      href: "/experiencia" as const,
      title: t("paths.recruiter.title"),
      desc: t("paths.recruiter.desc"),
    },
    { href: "/servicos" as const, title: t("paths.client.title"), desc: t("paths.client.desc") },
  ];
  const meta = [
    { k: t("meta.base"), v: t("meta.baseValue") },
    { k: t("meta.now"), v: t("meta.nowValue") },
    { k: t("meta.lang"), v: t("meta.langValue") },
  ];

  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-12 px-4 pt-12 pb-14 *:min-w-0 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-7">
          {siteConfig.availableForWork && <StatusBadge>{t("available")}</StatusBadge>}

          <h1
            id="hero-title"
            className="mt-8 text-[clamp(3.4rem,10.5vw,7.25rem)] leading-[0.9] font-medium tracking-[-0.055em]"
          >
            Gustavo
            <br />
            Cunha<span className="text-fg-brand">.</span>
          </h1>
          <p className="mt-6 font-display text-lg font-medium tracking-[-0.01em] text-ink-1 sm:text-xl">
            {t("role")}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-1">
            {t.rich("value", {
              em: (chunks) => <em className="text-emph text-[1.12em] text-ink-0">{chunks}</em>,
            })}
          </p>

          <nav aria-label={t("paths.label")} className="mt-10 max-w-xl border-t border-line">
            {paths.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex min-h-16 items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:bg-surface-1"
              >
                <span>
                  <span className="block font-display text-xl font-medium tracking-[-0.02em]">
                    {p.title}
                  </span>
                  <span className="block text-sm text-ink-2">{p.desc}</span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg-brand"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-5 lg:pt-10">
          <HeroNetwork label={t("network.label")} />
        </div>
      </div>

      {/* Faixa de metadados, como a ficha técnica de uma publicação */}
      <dl className="mx-auto grid max-w-6xl border-t border-line px-4 sm:grid-cols-3 sm:px-6">
        {meta.map((m) => (
          <div key={m.k} className="flex gap-3 border-b border-line py-4 sm:border-b-0 sm:py-5">
            <dt className="w-24 shrink-0 pt-0.5 label-caps text-ink-2">{m.k}</dt>
            <dd className="text-sm text-ink-0">{m.v}</dd>
          </div>
        ))}
      </dl>

      <div className="border-y border-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col-reverse px-4 py-8 sm:px-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="mt-2 max-w-[16rem] text-sm text-ink-2">{m.label}</dt>
              <dd className="font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
                <CountUp value={m.value} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
