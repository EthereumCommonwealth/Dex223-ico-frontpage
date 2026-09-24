import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

type Messages = Record<string, any>;

/**
 * Overlays a locale's messages on top of English, key by key, so a string that has not
 * been translated yet shows in English instead of as its key path. Mirrors the app.
 */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (typeof value === "object" && !Array.isArray(value) && typeof base[key] === "object") {
      out[key] = deepMerge(base[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const fallback = (await import(`../../messages/${routing.defaultLocale}.json`)).default;

  if (locale === routing.defaultLocale) {
    return { locale, messages: fallback };
  }

  let translated: Messages = {};
  try {
    translated = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    translated = {};
  }

  return { locale, messages: deepMerge(fallback, translated) };
});
