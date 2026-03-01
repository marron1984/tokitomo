import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

export function SocialProof() {
  const t = useTranslations("home");

  const testimonials = [
    { quote: t("testimonial1"), author: t("testimonial1Author") },
    { quote: t("testimonial2"), author: t("testimonial2Author") },
    { quote: t("testimonial3"), author: t("testimonial3Author") },
  ];

  return (
    <section className="bg-secondary/20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          {t("socialProof")}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p className="text-sm italic text-muted-foreground">
                  {item.quote}
                </p>
                <p className="mt-3 text-xs font-medium">{item.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
