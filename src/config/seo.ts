import type { Metadata } from "next";

import { type Locale, locales, routing } from "@/i18n/routing";

export const SITE_URL = "https://www.dex223.io";
export const SITE_NAME = "DEX223";

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  zh: "zh_CN",
  ko: "ko_KR",
  fr: "fr_FR",
  pt: "pt_BR",
  ru: "ru_RU",
};

// Pages translated into every locale. Their titles and descriptions live under "Seo" in messages.
export const LOCALIZED_PAGES = ["", "development", "upgrade", "airdrops"] as const;
export type LocalizedPage = (typeof LOCALIZED_PAGES)[number];

// Documents published in English only. Every locale shows the same English text, so each
// localized URL points its canonical at the English page and only that page is in the sitemap.
export const ENGLISH_ONLY_PAGES = {
  "token-description": {
    title: "D223 Token Description",
    description:
      "The D223 utility and governance token: how holders lock D223 to take part in DEX223 governance and share in listing, trading and liquidity fees.",
  },
  "defi-agreement": {
    title: "DeFi Protocol User Agreement",
    description:
      "Terms for using the DEX223 decentralized protocol: definitions, protocol usage, risks and limitations, liability restrictions and indemnification.",
  },
  "operating-agreement": {
    title: "DEX223 DAO LLC Operating Agreement",
    description:
      "The operating agreement of DEX223 DAO LLC: membership criteria and rights, governance structure, roles and responsibilities, and transfer restrictions.",
  },
  "trademark-policy": {
    title: "Trademark Guidelines",
    description:
      "How you may use the DEX223 name and logos: scope of the policy, authorized uses, usage guidelines and restrictions set by DEX223 DAO LLC.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "How DEX223 collects, uses and shares information, and the rights and responsibilities of people who use the DEX223 website and protocol.",
  },
} as const;
export type EnglishOnlyPage = keyof typeof ENGLISH_ONLY_PAGES;

// English stays unprefixed (localePrefix: "as-needed").
export function pageUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  if (!path) return `${SITE_URL}${prefix || "/"}`;
  return `${SITE_URL}${prefix}/${path}`;
}

export function localizedAlternates(path: string, locale: string): Metadata["alternates"] {
  return {
    canonical: pageUrl(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, pageUrl(l, path)])),
      "x-default": pageUrl(routing.defaultLocale, path),
    },
  };
}

const SHARE_IMAGE = {
  url: `${SITE_URL}/social-link.png`,
  width: 1600,
  height: 900,
  alt: "DEX223: decentralized exchange for ERC-223 and ERC-20 tokens",
};

// Title, description, canonical, hreflang and share cards for one page.
export function pageMetadata({
  locale,
  path,
  title,
  description,
  englishOnly = false,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  englishOnly?: boolean;
}): Metadata {
  const url = englishOnly ? pageUrl(routing.defaultLocale, path) : pageUrl(locale, path);
  const ogLocale = englishOnly ? ogLocales.en : (ogLocales[locale as Locale] ?? ogLocales.en);

  return {
    title,
    description,
    alternates: englishOnly ? { canonical: url } : localizedAlternates(path, locale),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: ogLocale,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Dex_223",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

// One DEX223 entity across www.dex223.io and app.dex223.io, so search engines and AI assistants
// connect the site, the app and the social accounts.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function siteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        legalName: "DEX223 DAO LLC",
        url: SITE_URL,
        logo: `${SITE_URL}/dex.png`,
        description:
          "DEX223 is a decentralized exchange for ERC-223 and ERC-20 tokens, with a 1:1 converter between the two standards and permissionless token listing.",
        sameAs: [
          "https://x.com/Dex_223",
          "https://t.me/Dex223_defi",
          "https://t.me/Dex_223",
          "https://discord.gg/t5bdeGC5Jk",
          "https://github.com/EthereumCommonwealth",
          "https://blog.dex223.io",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: locale,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "WebApplication",
        "@id": "https://app.dex223.io/#app",
        name: "DEX223 Exchange",
        url: "https://app.dex223.io",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires a Web3 wallet such as MetaMask or WalletConnect",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

// HTML meta verification for Google Search Console, Yandex Webmaster, Bing Webmaster Tools,
// Naver Search Advisor, Seznam Webmaster and Baidu Ziyuan. Each env var takes one token or a
// comma-separated list; unset ones emit nothing.
export function siteVerification(): Metadata["verification"] {
  const read = (name: string) => {
    const tokens = (process.env[name] || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return tokens.length === 0 ? undefined : tokens.length === 1 ? tokens[0] : tokens;
  };
  const google = read("GOOGLE_SITE_VERIFICATION");
  const yandex = read("YANDEX_SITE_VERIFICATION");
  const other: Record<string, string | string[]> = {};
  const bing = read("BING_SITE_VERIFICATION");
  const naver = read("NAVER_SITE_VERIFICATION");
  const seznam = read("SEZNAM_SITE_VERIFICATION");
  const baidu = read("BAIDU_SITE_VERIFICATION");
  if (bing) other["msvalidate.01"] = bing;
  if (naver) other["naver-site-verification"] = naver;
  if (seznam) other["seznam-wmt"] = seznam;
  if (baidu) other["baidu-site-verification"] = baidu;
  if (!google && !yandex && Object.keys(other).length === 0) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  };
}
