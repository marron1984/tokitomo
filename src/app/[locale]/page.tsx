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
import Image from "next/image";

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

      {/* What You Get — compact on mobile */}
      <section className="py-16 md:py-40">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center">
              <div className="divider-ornament mx-auto mb-6 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-8">&#x2022;</div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-4xl">
                {t("whatYouGet")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
            {/* Box photo — smaller aspect ratio on mobile */}
            <ScrollReveal delay={0.1}>
              <div className="relative mx-auto aspect-[4/3] max-w-xs overflow-hidden rounded-2xl md:aspect-square md:max-w-none">
                <Image
                  src="/hero-box.png"
                  alt="TOKI & TOMO box contents"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 50vw"
                />
              </div>
            </ScrollReveal>

            {/* Item grid — tighter on mobile */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <div className="card-hover group rounded-xl border border-border/60 bg-card p-5 text-center md:rounded-2xl md:p-7">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-cream transition-all duration-700 group-hover:scale-105 group-hover:shadow-md md:h-14 md:w-14">
                      <item.icon className="h-5 w-5 text-dustyrose/80 md:h-6 md:w-6" />
                    </div>
                    <p className="mt-3 text-xs font-medium text-charcoal/80 md:mt-4 md:text-sm">
                      {item.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <ThemeSpotlight />
      <SocialProof />
      <PricingSection />

      {/* FAQ on Home — tighter mobile spacing */}
      <section className="bg-cream py-16 md:py-40">
        <div className="mx-auto max-w-3xl px-5 md:px-6">
          <ScrollReveal>
            <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-10">&#x2022;</div>
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-charcoal md:mb-12 md:text-4xl">
              {faqT("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA — full-width button on mobile */}
      <section className="relative overflow-hidden py-20 md:py-48">
        <div className="absolute inset-0">
          <Image
            src="/hero-flatlay.png"
            alt="Stationery collection"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-cream/85 backdrop-blur-sm" />
        </div>
        <div className="relative mx-auto max-w-2xl px-5 text-center md:px-6">
          <ScrollReveal>
            <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-10">&#x2022;</div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-5xl">
              {t("ctaSection")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warmgray md:mt-6 md:text-lg">
              {t("ctaSectionDesc")}
            </p>
            <Link href="/app/subscribe" className="mt-8 block md:mt-10 md:inline-block">
              <Button
                size="lg"
                className="btn-shimmer group h-14 w-full bg-charcoal text-base font-semibold text-cream hover:bg-charcoal/90 md:h-12 md:w-auto"
              >
                {t("ctaSectionButton")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
