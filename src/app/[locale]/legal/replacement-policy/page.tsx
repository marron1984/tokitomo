"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ReplacementPolicyPage() {
  const t = useTranslations("legal.replacement");

  const sections = [
    { title: t("damaged"), text: t("damagedText") },
    { title: t("missing"), text: t("missingText") },
    { title: t("refunds"), text: t("refundsText") },
    { title: t("cancel"), text: t("cancelText") },
  ];

  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h1 className="font-serif text-4xl font-semibold text-charcoal">{t("title")}</h1>
          <p className="mt-4 text-warmgray">{t("intro")}</p>
        </ScrollReveal>
        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-warmgray text-sm">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
