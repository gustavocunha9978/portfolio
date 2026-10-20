import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Newsreader, Space_Grotesk } from "next/font/google";
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

// Grotesca para títulos, Plex para texto, serifa itálica para ênfase, mono para rótulos.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "optional",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "optional",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-newsreader",
  display: "optional",
  preload: false, // só aparece em ênfases: não disputa banda com as fontes principais
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "optional",
  preload: false,
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
      className={`${grotesk.variable} ${plex.variable} ${newsreader.variable} ${jetbrains.variable}`}
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
