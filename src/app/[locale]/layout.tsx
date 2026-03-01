import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { StickyCta } from "@/components/marketing/sticky-cta";
import { AnalyticsProvider } from "@/components/analytics-provider";

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

  if (!routing.locales.includes(locale as "en" | "fr" | "ja")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider>
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
