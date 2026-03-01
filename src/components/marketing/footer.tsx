"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t bg-charcoal text-cream/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="TOKI & TOMO"
                width={36}
                height={36}
                className="rounded-sm brightness-110"
              />
              <span className="font-serif text-lg font-semibold text-cream">
                TOKI & TOMO
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/60">
              {t("tagline")}
            </p>
            <p className="text-xs text-cream/40">
              {t("madeWith")}
            </p>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-widest text-cream/40">
              {t("company")}
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/how-it-works" className="transition-colors hover:text-cream">
                {nav("howItWorks")}
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-cream">
                {nav("pricing")}
              </Link>
              <Link href="/faq" className="transition-colors hover:text-cream">
                {nav("faq")}
              </Link>
              <Link href="/contact" className="transition-colors hover:text-cream">
                {nav("contact")}
              </Link>
            </nav>
          </div>

          {/* Legal links */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-widest text-cream/40">
              {t("legal")}
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/legal/terms" className="transition-colors hover:text-cream">
                {t("terms")}
              </Link>
              <Link href="/legal/privacy" className="transition-colors hover:text-cream">
                {t("privacy")}
              </Link>
              <Link href="/legal/replacement-policy" className="transition-colors hover:text-cream">
                {t("replacementPolicy")}
              </Link>
              <Link href="/shipping-and-customs" className="transition-colors hover:text-cream">
                {nav("shipping")}
              </Link>
            </nav>
          </div>

          {/* Explore links */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-widest text-cream/40">
              {nav("journal")}
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/journal" className="transition-colors hover:text-cream">
                {nav("journal")}
              </Link>
              <Link href="/past-boxes" className="transition-colors hover:text-cream">
                {nav("pastBoxes")}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-cream/10 pt-8 text-center text-xs text-cream/40">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
