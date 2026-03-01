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
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Atmospheric ink blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[350px] w-[350px] rounded-full bg-sage/5 animate-ink-dissolve" />
        <div className="absolute -left-20 bottom-0 h-[250px] w-[250px] rounded-full bg-dustyrose/5 animate-ink-dissolve stagger-4" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40">&#x2022;</div>
            <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {t("howItWorks")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className="card-hover group relative rounded-2xl border border-border/60 bg-card p-10 text-center">
                {/* Step number — faint, contemplative */}
                <span className="absolute right-6 top-6 font-serif text-4xl font-bold text-muted/40">
                  {step.num}
                </span>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream transition-all duration-700 group-hover:scale-105 group-hover:shadow-md">
                  <step.icon className="h-7 w-7 text-dustyrose/80" />
                </div>

                <h3 className="mt-6 font-serif text-xl font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-warmgray">
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
