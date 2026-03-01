"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/marketing/hero";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { ThemeSpotlight } from "@/components/marketing/theme-spotlight";
import { SocialProof } from "@/components/marketing/social-proof";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Pen, Gift, Palette, BookOpen, ArrowRight } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");
  const faqT = useTranslations("faq");

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
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {t("whatYouGet")}
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card-hover group rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream transition-transform duration-500 group-hover:scale-110">
                    <item.icon className="h-6 w-6 text-dustyrose" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-charcoal">
                    {item.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <ThemeSpotlight />
      <SocialProof />
      <PricingSection />

      {/* FAQ on Home */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {faqT("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-dustyrose/10 animate-drift" />
          <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-sage/10 animate-drift stagger-3" />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">
              {t("ctaSection")}
            </h2>
            <p className="mt-4 text-lg text-warmgray">
              {t("ctaSectionDesc")}
            </p>
            <Link href="/app/subscribe" className="mt-8 inline-block">
              <Button
                size="lg"
                className="btn-shimmer group bg-charcoal text-base text-cream hover:bg-charcoal/90"
              >
                {t("ctaSectionButton")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
