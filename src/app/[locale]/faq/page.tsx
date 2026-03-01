import { useTranslations } from "next-intl";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

export default function FaqPage() {
  const t = useTranslations("faq");

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
