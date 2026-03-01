import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

export default function JournalPage() {
  const t = useTranslations("journal");

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-center text-muted-foreground">
          {t("subtitle")}
        </p>

        <Card className="mt-12 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center justify-center bg-gradient-to-br from-pink-50 to-amber-50 p-8">
              <span className="text-6xl">✉️</span>
            </div>
            <CardContent className="flex flex-col justify-center p-8">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Featured Article
              </p>
              <h2 className="mt-2 text-2xl font-bold">{t("sampleTitle")}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("sampleExcerpt")}
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                {t("readMore")} →
              </p>
            </CardContent>
          </div>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t("comingSoon")}
        </p>
      </div>
    </div>
  );
}
