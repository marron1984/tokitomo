"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function SubscribePage() {
  const t = useTranslations("app.subscribe");
  const pt = useTranslations("pricing");
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const canceled = searchParams.get("canceled") === "true";
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    trackEvent("start_checkout");

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
    }
  };

  const features = [
    pt("includes.items"),
    pt("includes.shipping"),
    pt("includes.ritual"),
    pt("includes.vault"),
    pt("includes.referral"),
    pt("includes.cancel"),
  ];

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="w-full max-w-md animate-fade-up">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="bg-charcoal p-8 text-center">
            <h1 className="font-serif text-2xl font-semibold text-cream">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-cream/60">{t("subtitle")}</p>
          </div>

          <div className="p-8 space-y-6">
            {canceled && (
              <div className="flex items-center gap-2 rounded-lg bg-gold/10 p-3 text-sm text-charcoal">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {t("canceled")}
              </div>
            )}

            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-charcoal">{pt("totalPrice")}</p>
              <p className="mt-1 text-sm text-warmgray">
                {pt("membership")}: {pt("membershipPrice")} + {pt("shipping")}:{" "}
                {pt("shippingPrice")}
              </p>
            </div>

            <ul className="space-y-2.5 text-sm">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20">
                    <Check className="h-3 w-3 text-sage" />
                  </div>
                  <span className="text-warmgray">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-shimmer group w-full bg-charcoal text-cream hover:bg-charcoal/90"
              size="lg"
            >
              {loading ? "..." : t("cta")}
              {!loading && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
