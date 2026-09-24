import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

// Same languages as app.dex223.io so a visitor keeps their language between the two.
export const locales = ["en", "es", "zh", "ko", "fr", "pt", "ru"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // English stays at the bare paths (/, /development, /#tokenomics) so every existing
  // dex223.io link keeps working; other languages get a prefix such as /es.
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
