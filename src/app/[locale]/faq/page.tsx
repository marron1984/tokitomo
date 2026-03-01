"use client";

import { useTranslations } from "next-intl";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function FaqPage() {
  const t = useTranslations("faq");

  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h1 className="text-center font-serif text-4xl font-semibold text-charcoal">
            {t("title")}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-12">
            <FaqAccordion />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
