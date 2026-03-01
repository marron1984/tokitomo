"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Package, Sparkles, Heart, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import Image from "next/image";

export default function HowItWorksPage() {
  const t = useTranslations("howItWorks");

  const steps = [
    { icon: Package, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Sparkles, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Heart, title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h1 className="text-center font-serif text-4xl font-semibold text-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-center text-lg text-warmgray">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        {/* Hero photo */}
        <ScrollReveal delay={0.1}>
          <div className="relative mt-14 h-[280px] overflow-hidden rounded-2xl md:h-[380px]">
            <Image
              src="/hero-flatlay.png"
              alt="TOKI & TOMO stationery collection at a cherry blossom hanami"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </ScrollReveal>

        <div className="mt-20 space-y-16">
          {steps.map((step, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-cream shadow-sm">
                  <step.icon className="h-10 w-10 text-dustyrose" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-charcoal">
                    {step.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-warmgray">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-20 text-center">
            <Link href="/app/subscribe">
              <Button
                size="lg"
                className="btn-shimmer group bg-charcoal text-cream hover:bg-charcoal/90"
              >
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
