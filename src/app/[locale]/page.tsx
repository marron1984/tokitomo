import { useTranslations } from "next-intl";
import { Hero } from "@/components/marketing/hero";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { ThemeSpotlight } from "@/components/marketing/theme-spotlight";
import { SocialProof } from "@/components/marketing/social-proof";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Pen, Gift, Palette, BookOpen } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");

  const items = [
    { icon: Pen, label: t("whatYouGetItems.stationery") },
    { icon: Gift, label: t("whatYouGetItems.exclusive") },
    { icon: Palette, label: t("whatYouGetItems.theme") },
    { icon: BookOpen, label: t("whatYouGetItems.guide") },
  ];

  return (
    <>
      <Hero />

      {/* What You Get */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            {t("whatYouGet")}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {items.map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="mt-3 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <ThemeSpotlight />
      <SocialProof />
      <PricingSection />

      {/* FAQ on Home */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            {useTranslations("faq")("title")}
          </h2>
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
