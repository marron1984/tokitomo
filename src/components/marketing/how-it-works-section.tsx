"use client";

import { useTranslations } from "next-intl";
import { Package, Sparkles, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function HowItWorksSection() {
  const t = useTranslations("home");

  const steps = [
    { icon: Package, title: t("step1Title"), desc: t("step1Desc"), num: "01" },
    { icon: Sparkles, title: t("step2Title"), desc: t("step2Desc"), num: "02" },
    { icon: Heart, title: t("step3Title"), desc: t("step3Desc"), num: "03" },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-40">
      {/* Atmospheric ink blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[350px] w-[350px] rounded-full bg-sage/5 animate-ink-dissolve" />
        <div className="absolute -left-20 bottom-0 h-[250px] w-[250px] rounded-full bg-dustyrose/5 animate-ink-dissolve stagger-4" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <ScrollReveal>
          <div className="text-center">
            <div className="divider-ornament mx-auto mb-6 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-8">&#x2022;</div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-4xl">
              {t("howItWorks")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll cards. Desktop: 3-col grid */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:mt-20 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className="card-hover group relative min-w-[260px] snap-center rounded-xl border border-border/60 bg-card p-6 text-center md:min-w-0 md:rounded-2xl md:p-10">
                <span className="absolute right-4 top-4 font-serif text-3xl font-bold text-muted/40 md:right-6 md:top-6 md:text-4xl">
                  {step.num}
                </span>

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream transition-all duration-700 group-hover:scale-105 group-hover:shadow-md md:h-16 md:w-16">
                  <step.icon className="h-5 w-5 text-dustyrose/80 md:h-7 md:w-7" />
                </div>

                <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal md:mt-6 md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-warmgray md:mt-4 md:text-sm">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
