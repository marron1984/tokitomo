"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";

export default function SignInPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    trackEvent("login_start", { method: "email" });

    await signIn("resend", {
      email,
      callbackUrl: `/${locale}/app/account`,
      redirect: false,
    });

    window.location.href = `/${locale}/auth/verify-request`;
  };

  return (
    <div className="flex min-h-[60vh] items-start justify-center px-0 py-8 md:items-center md:px-6 md:py-20">
      <div className="w-full max-w-md animate-fade-up">
        {/* Edge-to-edge on mobile */}
        <div className="border-y border-border bg-card px-5 py-8 shadow-lg md:rounded-2xl md:border md:p-8">
          <div className="mb-5 flex justify-center md:mb-6">
            <Image src="/logo.png" alt="TOKI & TOMO" width={52} height={52} className="rounded-sm md:h-[60px] md:w-[60px]" />
          </div>
          <h1 className="text-center font-serif text-xl font-semibold text-charcoal md:text-2xl">
            {t("signInTitle")}
          </h1>
          <p className="mt-1.5 text-center text-sm text-warmgray">
            {t("signInSubtitle")}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 md:mt-8 md:space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-charcoal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                autoComplete="email"
                inputMode="email"
                className="mt-1.5 h-12 border-border bg-cream/50 text-base focus:border-dustyrose md:h-10 md:text-sm"
              />
            </div>
            <Button
              type="submit"
              className="h-14 w-full bg-charcoal text-[15px] font-semibold text-cream hover:bg-charcoal/90 md:h-10 md:text-sm md:font-medium"
              disabled={loading}
            >
              {loading ? "..." : t("sendLink")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
