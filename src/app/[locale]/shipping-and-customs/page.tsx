"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ShippingPage() {
  const t = useTranslations("shipping");

  const sections = [
    { title: t("flatRate"), content: t("flatRateDesc") },
    { title: t("delivery"), content: t("deliveryDesc") },
    { title: t("customs"), content: t("customsDesc") },
    { title: t("coverage"), content: t("coverageDesc") },
    { title: t("weight"), content: t("weightDesc") },
  ];

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

        <div className="mt-12 space-y-6">
          {sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="font-serif text-lg font-semibold text-charcoal">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-warmgray text-sm">
                  {section.content}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
