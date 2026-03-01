"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden border-t bg-charcoal pb-24 text-cream/80 md:pb-0">
      {/* Subtle atmospheric glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-[200px] w-[200px] rounded-full bg-dustyrose/3 animate-ink-dissolve" />
        <div className="absolute -right-16 bottom-0 h-[150px] w-[150px] rounded-full bg-sage/3 animate-ink-dissolve stagger-4" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="TOKI & TOMO"
                width={40}
                height={40}
                className="rounded-sm brightness-110"
              />
              <span className="font-serif text-lg font-semibold text-cream">
                TOKI & TOMO
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/50">
              {t("tagline")}
            </p>
            <p className="text-xs text-cream/30">
              {t("madeWith")}
            </p>
          </div>

          {/* Company links */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-cream/30">
              {t("company")}
            </h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/how-it-works" className="transition-colors duration-500 hover:text-cream">
                {nav("howItWorks")}
              </Link>
              <Link href="/pricing" className="transition-colors duration-500 hover:text-cream">
                {nav("pricing")}
              </Link>
              <Link href="/faq" className="transition-colors duration-500 hover:text-cream">
                {nav("faq")}
              </Link>
              <Link href="/contact" className="transition-colors duration-500 hover:text-cream">
                {nav("contact")}
              </Link>
            </nav>
          </div>

          {/* Legal links */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-cream/30">
              {t("legal")}
            </h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/legal/terms" className="transition-colors duration-500 hover:text-cream">
                {t("terms")}
              </Link>
              <Link href="/legal/privacy" className="transition-colors duration-500 hover:text-cream">
                {t("privacy")}
              </Link>
              <Link href="/legal/replacement-policy" className="transition-colors duration-500 hover:text-cream">
                {t("replacementPolicy")}
              </Link>
              <Link href="/shipping-and-customs" className="transition-colors duration-500 hover:text-cream">
                {nav("shipping")}
              </Link>
            </nav>
          </div>

          {/* Explore links */}
          <div className="space-y-5">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-cream/30">
              {nav("journal")}
            </h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/journal" className="transition-colors duration-500 hover:text-cream">
                {nav("journal")}
              </Link>
              <Link href="/past-boxes" className="transition-colors duration-500 hover:text-cream">
                {nav("pastBoxes")}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom — quiet, with ornament */}
        <div className="mt-16 border-t border-cream/8 pt-10 text-center">
          <div className="mx-auto mb-4 text-xs tracking-[0.3em] text-cream/20">&#x2022;</div>
          <p className="text-xs text-cream/30">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
