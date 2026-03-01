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

      {/* What You Get — with box photo */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center">
              <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40">&#x2022;</div>
              <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
                {t("whatYouGet")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
            {/* Box photo */}
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/hero-box.png"
                  alt="TOKI & TOMO box contents"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            {/* Item grid */}
            <div className="grid grid-cols-2 gap-6">
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <div className="card-hover group rounded-2xl border border-border/60 bg-card p-7 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream transition-all duration-700 group-hover:scale-105 group-hover:shadow-md">
                      <item.icon className="h-6 w-6 text-dustyrose/80" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-charcoal/80">
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

      {/* FAQ on Home */}
      <section className="bg-cream py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="divider-ornament mx-auto mb-10 max-w-xs text-xs tracking-[0.3em] text-warmgray/40">&#x2022;</div>
            <h2 className="mb-12 text-center font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {faqT("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA — with lifestyle photo background */}
      <section className="relative overflow-hidden py-32 md:py-48">
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
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <div className="divider-ornament mx-auto mb-10 max-w-xs text-xs tracking-[0.3em] text-warmgray/40">&#x2022;</div>
            <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">
              {t("ctaSection")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-warmgray">
              {t("ctaSectionDesc")}
            </p>
            <Link href="/app/subscribe" className="mt-10 inline-block">
              <Button
                size="lg"
                className="btn-shimmer group bg-charcoal text-base text-cream hover:bg-charcoal/90"
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
