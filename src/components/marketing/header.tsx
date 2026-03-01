"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/how-it-works" as const, label: t("howItWorks") },
    { href: "/pricing" as const, label: t("pricing") },
    { href: "/past-boxes" as const, label: t("pastBoxes") },
    { href: "/faq" as const, label: t("faq") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "glass border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        {/* Logo — compact on mobile */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 md:gap-3">
          <Image
            src="/logo.png"
            alt="TOKI & TOMO"
            width={40}
            height={40}
            className="rounded-sm md:h-[52px] md:w-[52px]"
          />
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-semibold tracking-wide text-charcoal">
              TOKI & TOMO
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-warmgray transition-colors duration-300 hover:text-charcoal after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-charcoal after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-1 text-xs text-warmgray">
            {(["en", "fr", "ja", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`rounded-sm px-2 py-1 transition-all duration-300 ${
                  locale === l
                    ? "bg-charcoal font-medium text-cream"
                    : "hover:bg-muted"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm" className="text-warmgray hover:text-charcoal">
              {t("signIn")}
            </Button>
          </Link>
          <Link href="/app/subscribe">
            <Button size="sm" className="btn-shimmer bg-charcoal text-cream hover:bg-charcoal/90">
              {t("subscribe")}
            </Button>
          </Link>
        </div>

        {/* Mobile: Subscribe button + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/app/subscribe">
            <Button size="sm" className="btn-shimmer h-9 bg-charcoal px-4 text-xs font-semibold text-cream hover:bg-charcoal/90">
              {t("subscribe")}
            </Button>
          </Link>
          <button
            className="text-charcoal p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative h-6 w-6">
              <Menu
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t bg-background transition-all duration-500 ease-out md:hidden ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-0.5 px-4 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-sm font-medium text-warmgray transition-colors hover:bg-muted hover:text-charcoal active:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-border" />

          <div className="flex items-center gap-1.5 px-3 py-2">
            {(["en", "fr", "ja", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  switchLocale(l);
                  setMobileOpen(false);
                }}
                className={`rounded-md px-2.5 py-1.5 text-xs transition-all ${
                  locale === l
                    ? "bg-charcoal font-medium text-cream"
                    : "text-warmgray hover:bg-muted"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Link href="/auth/signin" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-warmgray">
              {t("signIn")}
            </Button>
          </Link>
          <Link href="/app/subscribe" onClick={() => setMobileOpen(false)}>
            <Button className="h-12 w-full bg-charcoal text-sm font-semibold text-cream hover:bg-charcoal/90">
              {t("subscribe")}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
