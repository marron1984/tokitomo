import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

export function ThemeSpotlight() {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          {t("themeSpotlight")}
        </h2>

        <Card className="mx-auto mt-10 max-w-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 p-8">
              <div className="text-center">
                <div className="text-6xl">🌸</div>
                <p className="mt-2 text-sm font-medium text-pink-700">
                  {t("themeTitle")}
                </p>
              </div>
            </div>
            <CardContent className="flex flex-col justify-center p-8">
              <h3 className="text-2xl font-bold">{t("themeTitle")}</h3>
              <p className="mt-3 text-muted-foreground">{t("themeDesc")}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
