"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminFulfillmentForm() {
  const t = useTranslations("admin");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const body = {
      orderId: form.get("orderId"),
      carrier: form.get("carrier") || null,
      service: form.get("service") || null,
      actualShippingCostUSD: Number(form.get("actualCost")),
    };

    const res = await fetch("/api/admin/fulfillment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-5">
      <div>
        <Label htmlFor="orderId">{t("orderId")}</Label>
        <Input id="orderId" name="orderId" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="carrier">{t("carrier")}</Label>
        <Input id="carrier" name="carrier" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="service">{t("service")}</Label>
        <Input id="service" name="service" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="actualCost">{t("actualCost")}</Label>
        <Input
          id="actualCost"
          name="actualCost"
          type="number"
          step="0.01"
          min="0"
          required
          className="mt-1"
        />
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={loading} className="w-full">
          {success ? "Saved!" : loading ? "..." : t("save")}
        </Button>
      </div>
    </form>
  );
}
