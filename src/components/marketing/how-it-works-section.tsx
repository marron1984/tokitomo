"use client";

import { useTranslations, useLocale } from "next-intl";
import { Package, Sparkles, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function HowItWorksSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  const isJa = locale === "ja";
  const isFr = locale === "fr";
  const isEs = locale === "es";

  // JA: kanji numerals. FR: stylized. EN/ES: default
  const nums = isJa ? ["一", "二", "三"] : ["01", "02", "03"];

  const steps = [
    { icon: Package, title: t("step1Title"), desc: t("step1Desc"), num: nums[0] },
    { icon: Sparkles, title: t("step2Title"), desc: t("step2Desc"), num: nums[1] },
    { icon: Heart, title: t("step3Title"), desc: t("step3Desc"), num: nums[2] },
  ];

  return (
    <section className={`relative overflow-hidden ${isJa ? "py-20 md:py-48" : "py-16 md:py-40"}`}>
      {/* Atmospheric ink blobs — hidden for FR (clean editorial) */}
      {!isFr && (
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute -right-40 top-20 h-[350px] w-[350px] rounded-full animate-ink-dissolve ${
            isEs ? "bg-[hsl(12_42%_58%/0.04)]" : "bg-sage/5"
          }`} />
          <div className={`absolute -left-20 bottom-0 h-[250px] w-[250px] rounded-full animate-ink-dissolve stagger-4 ${
            isEs ? "bg-[hsl(32_58%_60%/0.04)]" : "bg-dustyrose/5"
          }`} />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <ScrollReveal>
          <div className="text-center">
            {/* FR: thin rule ornament instead of dot */}
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
              {t("howItWorks")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:mt-20 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className={`card-hover group relative min-w-[260px] snap-center border bg-card text-center md:min-w-0 ${
                isFr
                  ? "rounded-none border-charcoal/8 p-8 md:p-12"
                  : isJa
                  ? "rounded-2xl border-border/40 p-8 md:rounded-3xl md:p-12"
                  : isEs
                  ? "rounded-2xl border-border/60 p-6 shadow-md md:p-10"
                  : "rounded-xl border-border/60 p-6 md:rounded-2xl md:p-10"
              }`}>
                {/* Step number */}
                <span className={`absolute font-bold text-muted/40 ${
                  isJa
                    ? "right-5 top-5 font-serif text-3xl md:right-8 md:top-8 md:text-5xl"
                    : isFr
                    ? "left-8 top-8 font-serif text-5xl text-muted/20 md:text-6xl"
                    : "right-4 top-4 font-serif text-3xl md:right-6 md:top-6 md:text-4xl"
                }`}>
                  {step.num}
                </span>

                <div className={`mx-auto flex items-center justify-center transition-all duration-700 group-hover:scale-105 group-hover:shadow-md ${
                  isFr
                    ? "h-14 w-14 rounded-none border border-charcoal/10 bg-cream md:h-16 md:w-16"
                    : isJa
                    ? "h-14 w-14 rounded-full bg-cream/80 md:h-18 md:w-18"
                    : "h-12 w-12 rounded-full bg-cream md:h-16 md:w-16"
                }`}>
                  <step.icon className={`text-dustyrose/80 ${
                    isJa ? "h-6 w-6 md:h-7 md:w-7" : "h-5 w-5 md:h-7 md:w-7"
                  }`} />
                </div>

                <h3 className={`font-serif text-charcoal ${
                  isJa ? "mt-6 text-lg md:mt-8 md:text-xl" :
                  isFr ? "mt-5 text-lg font-medium md:mt-6 md:text-xl" :
                  "mt-4 text-lg font-semibold md:mt-6 md:text-xl"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-warmgray ${
                  isJa ? "mt-3 text-xs leading-loose md:mt-5 md:text-sm" :
                  "mt-2 text-xs leading-relaxed md:mt-4 md:text-sm"
                }`}>
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
