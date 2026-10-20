import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, Kalam } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/server";
import { siteConfig } from "@/site.config";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "../globals.css";

// Fraunces (serifa com personalidade) nos títulos, Plex no texto, Kalam nas anotações à caneta.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "optional",
});
const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

const clientNamespaces = [
  "nav",
  "theme",
  "projects",
  "project",
  "case",
  "contact",
  "notFound",
] as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: `%s · ${siteConfig.name}` },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  // Só as traduções que componentes de cliente usam vão para o navegador.
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    clientNamespaces.map((ns) => [ns, messages[ns]]),
  ) as Partial<typeof messages>;

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      className={`${fraunces.variable} ${plex.variable} ${kalam.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={clientMessages}>
            <Header />
            <main id="conteudo" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* Os scripts só existem na Vercel; fora dela dariam 404 no console. */}
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
