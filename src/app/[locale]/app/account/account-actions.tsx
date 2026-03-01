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
      <Button onClick={handleManage} disabled={loading} variant="outline">
        {loading ? "..." : t("manageSubscription")}
      </Button>

      {!showCancel ? (
        <button
          onClick={() => setShowCancel(true)}
          className="block text-sm text-muted-foreground underline"
        >
          {t("cancelNote")}
        </button>
      ) : (
        <div className="space-y-3 rounded-lg border bg-secondary/30 p-4">
          <h4 className="font-medium">{t("cancelNote")}</h4>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger className="text-sm">
                {t("cancelFaq1")}
              </AccordionTrigger>
              <AccordionContent>{t("cancelFaq1Answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-sm">
                {t("cancelFaq2")}
              </AccordionTrigger>
              <AccordionContent>{t("cancelFaq2Answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-sm">
                {t("cancelFaq3")}
              </AccordionTrigger>
              <AccordionContent>{t("cancelFaq3Answer")}</AccordionContent>
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
