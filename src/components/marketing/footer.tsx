import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">
              TOKI <span className="text-primary">&</span> TOMO
            </h3>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("company")}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/how-it-works" className="hover:text-foreground">
                {nav("howItWorks")}
              </Link>
              <Link href="/pricing" className="hover:text-foreground">
                {nav("pricing")}
              </Link>
              <Link href="/faq" className="hover:text-foreground">
                {nav("faq")}
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                {nav("contact")}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("legal")}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/legal/terms" className="hover:text-foreground">
                {t("terms")}
              </Link>
              <Link href="/legal/privacy" className="hover:text-foreground">
                {t("privacy")}
              </Link>
              <Link
                href="/legal/replacement-policy"
                className="hover:text-foreground"
              >
                {t("replacementPolicy")}
              </Link>
              <Link
                href="/shipping-and-customs"
                className="hover:text-foreground"
              >
                {nav("shipping")}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{nav("journal")}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/journal" className="hover:text-foreground">
                {nav("journal")}
              </Link>
              <Link href="/past-boxes" className="hover:text-foreground">
                {nav("pastBoxes")}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-xs text-muted-foreground">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
