"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, ArrowRight, Shield, RefreshCw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";

export default function SubscribePage() {
  const t = useTranslations("app.subscribe");
  const pt = useTranslations("pricing");
  const trust = useTranslations("trust");
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
    <div className="flex min-h-[70vh] items-start justify-center px-0 py-6 md:items-center md:px-6 md:py-20">
      <div className="w-full max-w-md animate-fade-up">
        {/* Card — edge-to-edge on mobile for immersive checkout */}
        <div className="overflow-hidden border-y border-border bg-card shadow-lg md:rounded-2xl md:border">
          {/* Header with logo */}
          <div className="bg-charcoal px-6 py-7 text-center md:p-8">
            <div className="mb-3 flex justify-center">
              <Image
                src="/logo.png"
                alt="TOKI & TOMO"
                width={44}
                height={44}
                className="rounded-sm brightness-110"
              />
            </div>
            <h1 className="font-serif text-xl font-semibold text-cream md:text-2xl">
              {t("title")}
            </h1>
            <p className="mt-1.5 text-sm text-cream/60">{t("subtitle")}</p>
          </div>

          <div className="space-y-5 px-5 py-6 md:space-y-6 md:p-8">
            {canceled && (
              <div className="flex items-center gap-2 rounded-lg bg-gold/10 p-3 text-sm text-charcoal">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {t("canceled")}
              </div>
            )}

            {/* Price — prominent */}
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-charcoal">{pt("totalPrice")}</p>
              <p className="mt-1 text-xs text-warmgray md:text-sm">
                {pt("membership")}: {pt("membershipPrice")} + {pt("shipping")}:{" "}
                {pt("shippingPrice")}
              </p>
            </div>

            {/* Features — compact */}
            <ul className="space-y-2 text-sm">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20">
                    <Check className="h-3 w-3 text-sage" />
                  </div>
                  <span className="text-warmgray">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA — large thumb target */}
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-shimmer group h-14 w-full bg-charcoal text-[15px] font-semibold text-cream hover:bg-charcoal/90"
              size="lg"
            >
              {loading ? "..." : t("cta")}
              {!loading && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] text-warmgray/50 md:text-xs">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {trust("cancelAnytime")}
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                {trust("replacementPolicy")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
