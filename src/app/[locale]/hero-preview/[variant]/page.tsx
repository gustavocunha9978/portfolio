import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";
import { resolveLocale } from "@/i18n/server";

// TEMPORÁRIO (Checkpoint 3): /pt/hero-preview/network e /pt/hero-preview/console.
// Remover depois que a variação do hero for escolhida.
const variants = ["network", "console"] as const;

export const metadata: Metadata = { robots: { index: false } };

export function generateStaticParams() {
  return variants.map((variant) => ({ variant }));
}

export default async function HeroPreview({
  params,
}: {
  params: Promise<{ locale: string; variant: string }>;
}) {
  await resolveLocale(params);
  const { variant } = await params;
  if (!variants.includes(variant as (typeof variants)[number])) notFound();
  return <HomeView variant={variant as (typeof variants)[number]} />;
}
