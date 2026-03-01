"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccountActions({
  locale,
  hasStripeCustomer,
}: {
  locale: string;
  hasStripeCustomer: boolean;
}) {
  const t = useTranslations("app.account");
  const [loading, setLoading] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const handleManage = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  };

  if (!hasStripeCustomer) return null;

  return (
    <div className="space-y-4">
      <Button
        onClick={handleManage}
        disabled={loading}
        variant="outline"
        className="border-charcoal/20 text-charcoal hover:bg-charcoal/5"
      >
        {loading ? "..." : t("manageSubscription")}
      </Button>

      {!showCancel ? (
        <button
          onClick={() => setShowCancel(true)}
          className="block text-sm text-warmgray underline transition-colors hover:text-charcoal"
        >
          {t("cancelNote")}
        </button>
      ) : (
        <div className="space-y-3 rounded-xl border border-border bg-cream/50 p-5 animate-fade-up">
          <h4 className="font-serif font-medium text-charcoal">{t("cancelNote")}</h4>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1" className="border-b border-border/50">
              <AccordionTrigger className="text-sm text-charcoal">
                {t("cancelFaq1")}
              </AccordionTrigger>
              <AccordionContent className="text-warmgray">{t("cancelFaq1Answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-b border-border/50">
              <AccordionTrigger className="text-sm text-charcoal">
                {t("cancelFaq2")}
              </AccordionTrigger>
              <AccordionContent className="text-warmgray">{t("cancelFaq2Answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-b border-border/50">
              <AccordionTrigger className="text-sm text-charcoal">
                {t("cancelFaq3")}
              </AccordionTrigger>
              <AccordionContent className="text-warmgray">{t("cancelFaq3Answer")}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button onClick={handleManage} variant="destructive" size="sm">
            {t("proceedToCancel")}
          </Button>
        </div>
      )}
    </div>
  );
}
