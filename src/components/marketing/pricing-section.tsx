"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-warmgray">{t("subtitle")}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-2xl border-2 border-charcoal/10 bg-card shadow-lg">
            <div className="bg-charcoal px-8 py-6 text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-cream/60">
                {t("planName")}
              </p>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-serif text-5xl font-bold text-cream">
                  {t("totalPrice")}
                </span>
              </div>
              <p className="mt-2 text-sm text-cream/60">
                {t("membership")}: {t("membershipPrice")} + {t("shipping")}:{" "}
                {t("shippingPrice")}
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-3 text-left text-sm">
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
                className="mt-8 block"
                onClick={() =>
                  trackEvent("cta_click", { location: "pricing_section" })
                }
              >
                <Button
                  size="lg"
                  className="btn-shimmer w-full bg-charcoal text-cream hover:bg-charcoal/90"
                >
                  {t("cta")}
                </Button>
              </Link>

              <p className="mt-4 text-xs text-warmgray">{t("guarantee")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
