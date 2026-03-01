"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ScrollReveal } from "@/components/scroll-reveal";

export function PricingSection() {
  const t = useTranslations("pricing");

  const features = [
    t("includes.items"),
    t("includes.shipping"),
    t("includes.ritual"),
    t("includes.vault"),
    t("includes.referral"),
    t("includes.cancel"),
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-6">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-warmgray md:mt-3 md:text-base">{t("subtitle")}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* Card — edge-to-edge on mobile */}
          <div className="-mx-5 mt-10 overflow-hidden border-y-2 border-charcoal/10 bg-card shadow-lg md:mx-auto md:mt-12 md:max-w-md md:rounded-2xl md:border-2">
            <div className="bg-charcoal px-6 py-5 text-center md:px-8 md:py-6">
              <p className="text-[10px] font-medium uppercase tracking-widest text-cream/60 md:text-xs">
                {t("planName")}
              </p>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-serif text-4xl font-bold text-cream md:text-5xl">
                  {t("totalPrice")}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-cream/60 md:mt-2 md:text-sm">
                {t("membership")}: {t("membershipPrice")} + {t("shipping")}:{" "}
                {t("shippingPrice")}
              </p>
            </div>

            <div className="p-6 md:p-8">
              <ul className="space-y-2.5 text-left text-sm">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20">
                      <Check className="h-3 w-3 text-sage" />
                    </div>
                    <span className="text-warmgray">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/app/subscribe"
                className="mt-7 block md:mt-8"
                onClick={() =>
                  trackEvent("cta_click", { location: "pricing_section" })
                }
              >
                <Button
                  size="lg"
                  className="btn-shimmer group h-14 w-full bg-charcoal text-base font-semibold text-cream hover:bg-charcoal/90 md:h-12"
                >
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <p className="mt-3 text-xs text-warmgray md:mt-4">{t("guarantee")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
