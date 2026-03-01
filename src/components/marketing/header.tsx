"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">
            TOKI <span className="text-primary">&</span> TOMO
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-3 md:flex">
          <div className="flex items-center space-x-1 text-xs">
            {(["en", "fr", "ja"] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`rounded px-1.5 py-0.5 transition-colors ${
                  locale === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm">
              {t("signIn")}
            </Button>
          </Link>
          <Link href="/app/subscribe">
            <Button size="sm">{t("subscribe")}</Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 pt-2">
              {(["en", "fr", "ja"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    switchLocale(l);
                    setMobileOpen(false);
                  }}
                  className={`rounded px-2 py-1 text-xs ${
                    locale === l
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/auth/signin" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {t("signIn")}
              </Button>
            </Link>
            <Link href="/app/subscribe" onClick={() => setMobileOpen(false)}>
              <Button className="w-full">{t("subscribe")}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
