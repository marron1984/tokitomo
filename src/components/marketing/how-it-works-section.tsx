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
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="text-center font-serif text-3xl font-semibold text-charcoal md:text-4xl">
            {t("howItWorks")}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="card-hover group relative rounded-2xl border border-border bg-card p-8 text-center">
                {/* Step number */}
                <span className="absolute right-6 top-6 font-serif text-4xl font-bold text-muted/60">
                  {step.num}
                </span>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream transition-transform duration-500 group-hover:scale-110">
                  <step.icon className="h-7 w-7 text-dustyrose" />
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warmgray">
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
