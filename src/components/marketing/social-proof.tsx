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
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Atmospheric ink blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-[300px] w-[300px] rounded-full bg-gold/4 animate-ink-dissolve stagger-2" />
        <div className="absolute -right-20 bottom-10 h-[250px] w-[250px] rounded-full bg-sage/5 animate-ink-dissolve stagger-5" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40">&#x2022;</div>
            <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {t("socialProof")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className="card-hover rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-10">
                {/* Quote mark — ink-like */}
                <span className="font-serif text-5xl leading-none text-dustyrose/20">
                  &ldquo;
                </span>
                <p className="mt-3 text-sm leading-relaxed text-warmgray italic">
                  {item.quote}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-dustyrose/20 to-sage/20" />
                  <p className="text-xs font-medium text-charcoal/80">{item.author}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
