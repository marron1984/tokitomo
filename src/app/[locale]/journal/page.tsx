"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function JournalPage() {
  const t = useTranslations("journal");

  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h1 className="text-center font-serif text-4xl font-semibold text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-4 text-center text-warmgray">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-dustyrose/15 to-gold/15 p-10">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-sage/10 animate-drift" />
                <span className="relative text-7xl">&#x2709;&#xFE0F;</span>
              </div>
              <div className="flex flex-col justify-center p-10">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warmgray">
                  Featured Article
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-charcoal">
                  {t("sampleTitle")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-warmgray">
                  {t("sampleExcerpt")}
                </p>
                <p className="mt-6 text-sm font-medium text-dustyrose transition-colors hover:text-charcoal cursor-pointer">
                  {t("readMore")} &rarr;
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <p className="mt-10 text-center text-sm text-warmgray">
          {t("comingSoon")}
        </p>
      </div>
    </div>
  );
}
