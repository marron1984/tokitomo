import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingPage() {
  const t = useTranslations("shipping");

  const sections = [
    { title: t("flatRate"), content: t("flatRateDesc") },
    { title: t("delivery"), content: t("deliveryDesc") },
    { title: t("customs"), content: t("customsDesc") },
    { title: t("coverage"), content: t("coverageDesc") },
    { title: t("weight"), content: t("weightDesc") },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-center text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-10 space-y-6">
          {sections.map((section, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
