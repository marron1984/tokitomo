"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>

        <Card className="mx-auto mt-10 max-w-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{t("planName")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">{t("totalPrice")}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>
                  {t("membership")}: {t("membershipPrice")} + {t("shipping")}:{" "}
                  {t("shippingPrice")}
                </span>
              </div>
            </div>

            <ul className="space-y-2 text-left text-sm">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/app/subscribe"
              className="block"
              onClick={() =>
                trackEvent("cta_click", { location: "pricing_section" })
              }
            >
              <Button size="lg" className="w-full">
                {t("cta")}
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground">{t("guarantee")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
