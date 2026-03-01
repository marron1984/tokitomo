"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-center text-muted-foreground">
          {t("subtitle")}
        </p>

        <Card className="mt-10">
          <CardContent className="p-6">
            {submitted ? (
              <div className="py-8 text-center">
                <p className="text-lg font-medium text-primary">
                  {t("success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("nameLabel")}</Label>
                  <Input id="name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">{t("messageLabel")}</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("submit")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("emailDirect")}
        </p>
      </div>
    </div>
  );
}
