import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { StickyCta } from "@/components/marketing/sticky-cta";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { AmbientPetals } from "@/components/ambient-petals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
        ja: "/ja",
        es: "/es",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "TOKI & TOMO",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "ja" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} data-locale={locale} className="antialiased">
      <body className="font-sans text-foreground">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider>
            <div className="grain-overlay" />
            <AmbientPetals />
            <Header locale={locale} />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <StickyCta />
          </AnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
