"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import Image from "next/image";

export function SocialProof() {
  const t = useTranslations("home");
  const locale = useLocale();

  const isJa = locale === "ja";
  const isFr = locale === "fr";
  const isEs = locale === "es";

  const openQuote = isFr ? "\u00AB" : isJa ? "\u300C" : isEs ? "\u00AB" : "\u201C";

  const testimonials = [
    { quote: t("testimonial1"), author: t("testimonial1Author") },
    { quote: t("testimonial2"), author: t("testimonial2Author") },
    { quote: t("testimonial3"), author: t("testimonial3Author") },
  ];

  return (
    <section className={`relative overflow-hidden ${isJa ? "py-20 md:py-48" : "py-16 md:py-40"}`}>
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <ScrollReveal>
          <div className="text-center">
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
              {t("socialProof")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:mt-20 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className={`card-hover min-w-[280px] snap-center border bg-card/80 backdrop-blur-sm md:min-w-0 ${
                isFr
                  ? "rounded-none border-charcoal/8 p-7 md:p-10"
                  : isJa
                  ? "rounded-2xl border-border/40 p-7 md:rounded-3xl md:p-10"
                  : isEs
                  ? "rounded-2xl border-border/60 p-6 shadow-md md:p-10"
                  : "rounded-xl border-border/60 p-6 md:rounded-2xl md:p-10"
              }`}>
                <span className={`font-serif leading-none ${
                  isFr
                    ? "text-3xl text-[hsl(340_18%_58%/0.25)] md:text-4xl"
                    : isJa
                    ? "text-2xl text-dustyrose/15 md:text-3xl"
                    : isEs
                    ? "text-4xl text-[hsl(12_42%_58%/0.25)] md:text-5xl"
                    : "text-4xl text-dustyrose/20 md:text-5xl"
                }`}>
                  {openQuote}
                </span>
                <p className={`text-warmgray italic ${
                  isJa ? "mt-3 text-xs leading-loose md:text-sm" :
                  "mt-2 text-xs leading-relaxed md:mt-3 md:text-sm"
                }`}>
                  {item.quote}
                </p>
                <div className="mt-5 flex items-center gap-2.5 md:mt-8 md:gap-3">
                  <div className={`rounded-full bg-gradient-to-br ${
                    isEs ? "h-9 w-9 from-[hsl(12_42%_58%/0.2)] to-[hsl(130_16%_62%/0.2)] md:h-10 md:w-10" :
                    isFr ? "h-8 w-8 from-[hsl(340_18%_58%/0.15)] to-[hsl(165_10%_68%/0.15)] md:h-10 md:w-10" :
                    "h-8 w-8 from-dustyrose/20 to-sage/20 md:h-10 md:w-10"
                  }`} />
                  <p className="text-[10px] font-medium text-charcoal/80 md:text-xs">{item.author}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className={`relative mt-10 overflow-hidden md:mt-20 ${
            isFr ? "h-[200px] rounded-none md:h-[360px]" :
            "h-[200px] rounded-xl md:h-[360px] md:rounded-2xl"
          }`}>
            <Image
              src="/hero-lifestyle.png"
              alt="A woman journaling under cherry blossoms"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-center md:bottom-8 md:left-8 md:right-8">
              <p className={`font-serif font-semibold text-cream ${
                isJa ? "text-base md:text-xl" : "text-lg md:text-2xl"
              }`}>
                {t("lifestyleTagline")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
