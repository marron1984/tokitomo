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
    <section className="relative overflow-hidden py-28 md:py-40">
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

        {/* Lifestyle photo band below testimonials */}
        <ScrollReveal delay={0.3}>
          <div className="relative mt-20 h-[280px] overflow-hidden rounded-2xl md:h-[360px]">
            <Image
              src="/hero-lifestyle.png"
              alt="A woman journaling under cherry blossoms with TOKI & TOMO stationery"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <p className="font-serif text-xl font-semibold text-cream md:text-2xl">
                {t("lifestyleTagline")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
