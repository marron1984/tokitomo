import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("legal.terms");

  const sections = [
    { title: t("subscription"), content: t("subscriptionText") },
    { title: t("shipping"), content: t("shippingText") },
    { title: t("liability"), content: t("liabilityText") },
    { title: t("changes"), content: t("changesText") },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("intro")}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
