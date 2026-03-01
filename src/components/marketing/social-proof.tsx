"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function SocialProof() {
  const t = useTranslations("home");

  const testimonials = [
    { quote: t("testimonial1"), author: t("testimonial1Author") },
    { quote: t("testimonial2"), author: t("testimonial2Author") },
    { quote: t("testimonial3"), author: t("testimonial3Author") },
  ];

  return (
    <section className="bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="text-center font-serif text-3xl font-semibold text-charcoal md:text-4xl">
            {t("socialProof")}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="card-hover rounded-2xl border border-border bg-card p-8">
                {/* Quote mark */}
                <span className="font-serif text-5xl leading-none text-dustyrose/30">
                  &ldquo;
                </span>
                <p className="mt-2 text-sm leading-relaxed text-warmgray italic">
                  {item.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-dustyrose/30 to-sage/30" />
                  <p className="text-xs font-medium text-charcoal">{item.author}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
