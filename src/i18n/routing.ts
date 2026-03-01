import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "ja"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
