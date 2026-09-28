import type { MetadataRoute } from "next";

import { locales } from "@/i18n/routing";

const SITE_URL = "https://www.dex223.io";

// English stays unprefixed (localePrefix: "as-needed"). Email opt-in pages are
// private and omitted.
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "token-description", priority: 0.9, changeFrequency: "monthly" },
  { path: "development", priority: 0.8, changeFrequency: "weekly" },
  { path: "upgrade", priority: 0.7, changeFrequency: "monthly" },
  { path: "airdrops", priority: 0.6, changeFrequency: "weekly" },
  { path: "privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "trademark-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "defi-agreement", priority: 0.3, changeFrequency: "yearly" },
  { path: "operating-agreement", priority: 0.3, changeFrequency: "yearly" },
];

function pageUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  if (!path) return `${SITE_URL}${prefix || "/"}`;
  return `${SITE_URL}${prefix}/${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, priority, changeFrequency }) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, pageUrl(locale, path)]));

    return locales.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...languages,
          "x-default": pageUrl("en", path),
        },
      },
    }));
  });
}
