"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";
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
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {canceled && (
            <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              {t("canceled")}
            </div>
          )}

          <div className="text-center">
            <p className="text-3xl font-bold">{pt("totalPrice")}</p>
            <p className="text-sm text-muted-foreground">
              {pt("membership")}: {pt("membershipPrice")} + {pt("shipping")}:{" "}
              {pt("shippingPrice")}
            </p>
          </div>

          <ul className="space-y-2 text-sm">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "..." : t("cta")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
