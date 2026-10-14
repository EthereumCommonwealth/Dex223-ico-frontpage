import type { MetadataRoute } from "next";

import { ENGLISH_ONLY_PAGES, pageUrl } from "@/config/seo";
import { locales } from "@/i18n/routing";

type Frequency = MetadataRoute.Sitemap[number]["changeFrequency"];

// Translated pages: one entry per locale, each listing every language version. Email opt-in
// pages are private and omitted.
const LOCALIZED_ROUTES: { path: string; priority: number; changeFrequency: Frequency }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "development", priority: 0.8, changeFrequency: "weekly" },
  { path: "upgrade", priority: 0.7, changeFrequency: "monthly" },
  { path: "airdrops", priority: 0.6, changeFrequency: "weekly" },
];

// English-only documents: localized URLs canonicalize to English, so only English is listed.
const ENGLISH_ONLY_ROUTES: { path: keyof typeof ENGLISH_ONLY_PAGES; priority: number }[] = [
  { path: "token-description", priority: 0.9 },
  { path: "privacy-policy", priority: 0.3 },
  { path: "trademark-policy", priority: 0.3 },
  { path: "defi-agreement", priority: 0.3 },
  { path: "operating-agreement", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localized = LOCALIZED_ROUTES.flatMap(({ path, priority, changeFrequency }) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, pageUrl(locale, path)]));

    return locales.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { ...languages, "x-default": pageUrl("en", path) } },
    }));
  });

  const englishOnly = ENGLISH_ONLY_ROUTES.map(({ path, priority }) => ({
    url: pageUrl("en", path),
    lastModified,
    changeFrequency: "yearly" as const,
    priority,
  }));

  return [...localized, ...englishOnly];
}
