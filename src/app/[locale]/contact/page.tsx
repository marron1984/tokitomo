"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto max-w-lg px-6">
        <ScrollReveal>
          <h1 className="text-center font-serif text-4xl font-semibold text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-4 text-center text-warmgray">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                  <span className="text-2xl">&#x2714;&#xFE0F;</span>
                </div>
                <p className="font-serif text-lg font-medium text-charcoal">
                  {t("success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-charcoal">
                    {t("nameLabel")}
                  </Label>
                  <Input
                    id="name"
                    required
                    className="mt-1.5 border-border bg-cream/50 focus:border-dustyrose focus:ring-dustyrose/20"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-charcoal">
                    {t("emailLabel")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="mt-1.5 border-border bg-cream/50 focus:border-dustyrose focus:ring-dustyrose/20"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-charcoal">
                    {t("messageLabel")}
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="mt-1.5 border-border bg-cream/50 focus:border-dustyrose focus:ring-dustyrose/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-charcoal text-cream hover:bg-charcoal/90"
                >
                  {t("submit")}
                </Button>
              </form>
            )}
          </div>
        </ScrollReveal>

        <p className="mt-8 text-center text-sm text-warmgray">
          {t("emailDirect")}
        </p>
      </div>
    </div>
  );
}
