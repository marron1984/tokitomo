"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import Image from "next/image";

export function SocialProof() {
  const t = useTranslations("home");

  const testimonials = [
    { quote: t("testimonial1"), author: t("testimonial1Author") },
    { quote: t("testimonial2"), author: t("testimonial2Author") },
    { quote: t("testimonial3"), author: t("testimonial3Author") },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-40">
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <ScrollReveal>
          <div className="text-center">
            <div className="divider-ornament mx-auto mb-6 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-8">&#x2022;</div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-4xl">
              {t("socialProof")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll cards. Desktop: 3-col grid */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:mt-20 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className="card-hover min-w-[280px] snap-center rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 md:min-w-0 md:rounded-2xl md:p-10">
                <span className="font-serif text-4xl leading-none text-dustyrose/20 md:text-5xl">
                  &ldquo;
                </span>
                <p className="mt-2 text-xs leading-relaxed text-warmgray italic md:mt-3 md:text-sm">
                  {item.quote}
                </p>
                <div className="mt-5 flex items-center gap-2.5 md:mt-8 md:gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-dustyrose/20 to-sage/20 md:h-10 md:w-10" />
                  <p className="text-[10px] font-medium text-charcoal/80 md:text-xs">{item.author}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lifestyle photo band — shorter on mobile */}
        <ScrollReveal delay={0.3}>
          <div className="relative mt-10 h-[200px] overflow-hidden rounded-xl md:mt-20 md:h-[360px] md:rounded-2xl">
            <Image
              src="/hero-lifestyle.png"
              alt="A woman journaling under cherry blossoms with TOKI & TOMO stationery"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-center md:bottom-8 md:left-8 md:right-8">
              <p className="font-serif text-lg font-semibold text-cream md:text-2xl">
                {t("lifestyleTagline")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
