import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PastBoxesPage() {
  const t = useTranslations("pastBoxes");

  const teaserItems = [
    { emoji: "🌸", title: "Sakura Letters", month: "April 2025" },
    { emoji: "🎋", title: "Tanabata Dreams", month: "July 2025" },
    { emoji: "🍂", title: "Autumn Brush", month: "October 2025" },
    { emoji: "❄️", title: "Winter Calm", month: "January 2026" },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-center text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teaserItems.map((item, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
                <span className="text-5xl">{item.emoji}</span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.month}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/app/subscribe">
            <Button size="lg">{t("cta")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
