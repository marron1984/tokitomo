"use client";

import { useTranslations, useLocale } from "next-intl";
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
  const locale = useLocale();

  const isJa = locale === "ja";
  const isFr = locale === "fr";
  const isEs = locale === "es";

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
      <section className={isJa ? "py-20 md:py-48" : "py-16 md:py-40"}>
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center">
              {isFr ? (
                <div className="mx-auto mb-6 flex items-center justify-center gap-6 md:mb-8">
                  <div className="h-px w-12 bg-charcoal/15" />
                  <div className="h-px w-12 bg-charcoal/15" />
                </div>
              ) : (
                <div className="divider-ornament mx-auto mb-6 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-8">&#x2022;</div>
              )}
              <h2 className={`font-serif text-charcoal ${
                isJa ? "text-2xl md:text-3xl" : "text-2xl font-semibold md:text-4xl"
              }`}>
                {t("whatYouGet")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
            <ScrollReveal delay={0.1}>
              <div className={`relative mx-auto aspect-[4/3] max-w-xs overflow-hidden md:aspect-square md:max-w-none ${
                isFr ? "rounded-none" : "rounded-2xl"
              }`}>
                <Image
                  src="/hero-box.png"
                  alt="TOKI & TOMO box contents"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 50vw"
                />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 md:gap-6">
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <div className={`card-hover group border bg-card text-center ${
                    isFr
                      ? "rounded-none border-charcoal/8 p-5 md:p-7"
                      : isJa
                      ? "rounded-2xl border-border/40 p-5 md:rounded-3xl md:p-7"
                      : isEs
                      ? "rounded-xl border-border/60 p-5 shadow-sm md:rounded-2xl md:p-7"
                      : "rounded-xl border-border/60 p-5 md:rounded-2xl md:p-7"
                  }`}>
                    <div className={`mx-auto flex items-center justify-center transition-all duration-700 group-hover:scale-105 group-hover:shadow-md ${
                      isFr
                        ? "h-11 w-11 rounded-none border border-charcoal/10 bg-cream md:h-14 md:w-14"
                        : "h-11 w-11 rounded-full bg-cream md:h-14 md:w-14"
                    }`}>
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

      {/* FAQ */}
      <section className={`bg-cream ${isJa ? "py-20 md:py-48" : "py-16 md:py-40"}`}>
        <div className="mx-auto max-w-3xl px-5 md:px-6">
          <ScrollReveal>
            {isFr ? (
              <div className="mx-auto mb-6 flex items-center justify-center gap-6 md:mb-8">
                <div className="h-px w-12 bg-charcoal/15" />
                <div className="h-px w-12 bg-charcoal/15" />
              </div>
            ) : (
              <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-10">&#x2022;</div>
            )}
            <h2 className={`mb-8 text-center font-serif text-charcoal md:mb-12 ${
              isJa ? "text-2xl md:text-3xl" : "text-2xl font-semibold md:text-4xl"
            }`}>
              {faqT("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`relative overflow-hidden ${isJa ? "py-24 md:py-52" : "py-20 md:py-48"}`}>
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
            {isFr ? (
              <div className="mx-auto mb-8 flex items-center justify-center gap-6 md:mb-10">
                <div className="h-px w-12 bg-charcoal/15" />
                <div className="h-px w-12 bg-charcoal/15" />
              </div>
            ) : (
              <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-10">&#x2022;</div>
            )}
            <h2 className={`font-serif text-charcoal ${
              isJa ? "text-2xl md:text-4xl" : "text-2xl font-semibold md:text-5xl"
            }`}>
              {t("ctaSection")}
            </h2>
            <p className={`text-warmgray ${
              isJa ? "mt-5 text-sm leading-loose md:mt-8 md:text-base" :
              "mt-4 text-base leading-relaxed md:mt-6 md:text-lg"
            }`}>
              {t("ctaSectionDesc")}
            </p>
            <Link href="/app/subscribe" className="mt-8 block md:mt-10 md:inline-block">
              <Button
                size="lg"
                className={`group h-14 w-full text-base font-semibold md:h-12 md:w-auto ${
                  isFr
                    ? "rounded-none border-2 border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-cream"
                    : isJa
                    ? "rounded-full bg-charcoal/90 text-cream hover:bg-charcoal"
                    : isEs
                    ? "btn-shimmer rounded-xl bg-[hsl(12_42%_58%)] text-cream hover:bg-[hsl(12_42%_52%)]"
                    : "btn-shimmer bg-charcoal text-cream hover:bg-charcoal/90"
                }`}
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
