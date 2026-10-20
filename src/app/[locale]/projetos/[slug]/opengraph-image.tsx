import { getTranslations } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { getProject, getProjects } from "@/lib/content/loader";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";

export async function generateStaticParams() {
  const all = await Promise.all(
    routing.locales.map(async (locale) =>
      (await getProjects(locale)).map((p) => ({ locale, slug: p.frontmatter.slug })),
    ),
  );
  return all.flat();
}

/** OG de cada case: título, resumo e a stack principal. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const project = await getProject(locale, slug);
  const tp = await getTranslations({ locale, namespace: "project" });
  if (!project) return renderOg({ kicker: "404", title: slug });

  const fm = project.frontmatter;
  return renderOg({
    kicker: `${fm.category.map((c) => tp(`category.${c}`)).join(" · ")} — ${tp(`status.${fm.status}`)}`,
    title: fm.title,
    subtitle: fm.summary,
    meta: fm.stack.slice(0, 7).join(" · "),
  });
}
